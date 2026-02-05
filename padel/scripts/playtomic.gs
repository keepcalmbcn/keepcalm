  /**
   * PlaytomicManager Class
   * Comprehensive Google Apps Script class for managing Playtomic padel matches
   */
  class PlaytomicManager {
    constructor() {
      this.apiBaseUrl = 'https://api.playtomic.io/v1';
    }

    // ============================================================================
    // PHASE 1: HELP THE ORGANISERS
    // ============================================================================

    /**
     * 1. Convert match_id to short link
     * @param {string} matchId - The match ID (UUID format)
     * @returns {string} Short URL or error message
     */
    createShortLink(matchId) {
      try {
        const fullUrl = `https://playtomic.io/matches/${matchId}`;
        
        const options = {
          method: 'post',
          contentType: 'application/json',
          payload: JSON.stringify({ full_url: fullUrl }),
          muteHttpExceptions: true
        };
        
        const response = UrlFetchApp.fetch(`${this.apiBaseUrl}/short_urls`, options);
        const data = JSON.parse(response.getContentText());
        
        if (data.short_id) {
          return `https://app.playtomic.io/t/${data.short_id}`;
        }
        
        return 'Error: Could not create short link';
      } catch (error) {
        return `Error creating short link: ${error.toString()}`;
      }
    }

    /**
     * 2. Sanity Check Venue
     * @param {string} url - Playtomic URL (short or full)
     * @returns {object} Venue information and validation status
     */
    sanityCheckVenue(url) {
      try {
        const matchData = this._getMatchData(url);
        
        let venueName = 'Unknown';
        let courtName = 'Unknown';
        let venueId = 'Unknown';
        let address = 'Not specified';
        
        // Get venue name
        if (matchData.location) {
          venueName = matchData.location;
        } else if (matchData.tenant && matchData.tenant.tenant_name) {
          venueName = matchData.tenant.tenant_name;
        }
        
        // Get court name
        if (matchData.resource_name) {
          courtName = matchData.resource_name;
        }
        
        // Get venue ID
        if (matchData.resource_id) {
          venueId = matchData.resource_id;
        } else if (matchData.tenant && matchData.tenant.tenant_id) {
          venueId = matchData.tenant.tenant_id;
        }
        
        // Get address
        if (matchData.tenant && matchData.tenant.address) {
          const addr = matchData.tenant.address;
          const parts = [];
          if (addr.street) parts.push(addr.street);
          if (addr.city) parts.push(addr.city);
          if (addr.country) parts.push(addr.country);
          address = parts.join(', ');
        } else if (matchData.location_info && matchData.location_info.address) {
          const addr = matchData.location_info.address;
          const parts = [];
          if (addr.street) parts.push(addr.street);
          if (addr.city) parts.push(addr.city);
          if (addr.country) parts.push(addr.country);
          address = parts.join(', ');
        }
        
        return {
          status: 'OK',
          venueName: venueName,
          venueId: venueId,
          address: address,
          courtName: courtName,
          isValid: true
        };
      } catch (error) {
        return {
          status: 'ERROR',
          message: error.toString()
        };
      }
    }

    /**
     * 3. Sanity Check Players
     * @param {string} url - Playtomic URL (short or full)
     * @returns {object} Player information and validation status
     */
    sanityCheckPlayers(url) {
      try {
        const matchData = this._getMatchData(url);
        
        if (!matchData.teams || matchData.teams.length !== 2) {
          return {
            status: 'ERROR',
            message: 'Invalid match data - expected 2 teams'
          };
        }

        let totalPlayers = 0;
        let totalMissingPlayers = 0;
        const playerDetails = [];

        matchData.teams.forEach((team, teamIndex) => {
          const teamPlayers = team.players || [];
          totalPlayers += teamPlayers.length;
          
          teamPlayers.forEach(player => {
            playerDetails.push({
              team: teamIndex + 1,
              name: player.name || 'Unknown',
              userId: player.user_id || 'Unknown'
            });
          });
          
          if (teamPlayers.length < 2) {
            totalMissingPlayers += 2 - teamPlayers.length;
          }
        });

        return {
          status: totalMissingPlayers === 0 ? 'COMPLETE' : 'INCOMPLETE',
          totalPlayers: totalPlayers,
          missingPlayers: totalMissingPlayers,
          players: playerDetails,
          message: totalMissingPlayers === 0 ? 
            'All players assigned' : 
            `Missing ${totalMissingPlayers} player(s)`
        };
      } catch (error) {
        return {
          status: 'ERROR',
          message: error.toString()
        };
      }
    }

    /**
     * 4. Sanity Check Date
     * @param {string} url - Playtomic URL (short or full)
     * @returns {object} Date information and validation status
     */
    sanityCheckDate(url) {
      try {
        const matchData = this._getMatchData(url);
        
        if (!matchData.start_date) {
          return {
            status: 'ERROR',
            message: 'No date information found'
          };
        }

        const matchDate = new Date(matchData.start_date);
        const now = new Date();
        const isInPast = matchDate < now;
        const daysUntilMatch = Math.ceil((matchDate - now) / (1000 * 60 * 60 * 24));

        return {
          status: isInPast ? 'PAST' : 'OK',
          date: Utilities.formatDate(matchDate, Session.getScriptTimeZone(), 'yyyy-MM-dd'),
          dayOfWeek: Utilities.formatDate(matchDate, Session.getScriptTimeZone(), 'EEEE'),
          daysUntilMatch: daysUntilMatch,
          isPast: isInPast,
          message: isInPast ? 
            'Match is in the past' : 
            `Match in ${daysUntilMatch} day(s)`
        };
      } catch (error) {
        return {
          status: 'ERROR',
          message: error.toString()
        };
      }
    }

    /**
     * 5. Sanity Check Time
     * @param {string} url - Playtomic URL (short or full)
     * @returns {object} Time information and validation status
     */
    sanityCheckTime(url) {
      try {
        const matchData = this._getMatchData(url);
        
        if (!matchData.start_date) {
          return {
            status: 'ERROR',
            message: 'No time information found'
          };
        }

        // Parse the start date and add 2 hours for timezone adjustment
        let startTime = new Date(matchData.start_date);
        startTime = new Date(startTime.getTime() + (2 * 60 * 60 * 1000)); // Add 2 hours
        
        let endTime, duration;
        
        if (matchData.end_date) {
          endTime = new Date(matchData.end_date);
          endTime = new Date(endTime.getTime() + (2 * 60 * 60 * 1000)); // Add 2 hours
          duration = Math.round((endTime.getTime() - startTime.getTime()) / 60000); // Calculate duration in minutes
        } else if (matchData.duration) {
          duration = matchData.duration;
          endTime = new Date(startTime.getTime() + duration * 60000);
        } else {
          // Default to 90 minutes if no end time or duration
          duration = 90;
          endTime = new Date(startTime.getTime() + duration * 60000);
        }

        return {
          status: 'OK',
          startTime: Utilities.formatDate(startTime, Session.getScriptTimeZone(), 'HH:mm'),
          endTime: Utilities.formatDate(endTime, Session.getScriptTimeZone(), 'HH:mm'),
          duration: duration,
          fullDateTime: Utilities.formatDate(startTime, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm'),
          message: `${duration} minute match`
        };
      } catch (error) {
        return {
          status: 'ERROR',
          message: error.toString()
        };
      }
    }

    /**
     * 6. Sanity Check Competitive
     * @param {string} url - Playtomic URL (short or full)
     * @returns {object} Competitive level information
     */
    sanityCheckCompetitive(url) {
      try {
        const matchData = this._getMatchData(url);
        
        const matchType = matchData.match_type || 'FRIENDLY';
        const isCompetitive = matchType.toUpperCase() !== 'FRIENDLY';
        
        return {
          status: 'OK',
          matchType: matchType,
          isCompetitive: isCompetitive,
          level: matchData.level || 'Not specified',
          message: isCompetitive ? 
            `Competitive match (${matchType})` : 
            'Friendly match'
        };
      } catch (error) {
        return {
          status: 'ERROR',
          message: error.toString()
        };
      }
    }

    /**
     * 7. Sanity Check Payment Split
     * @param {string} url - Playtomic URL (short or full)
     * @returns {object} Payment split information and validation
     */
    sanityCheckPaymentSplit(url) {
      try {
        const matchData = this._getMatchData(url);
        
        let price = 0;
        let currency = 'EUR';
        
        // Parse price string (e.g., "6.79 EUR" or "26.00 EUR")
        if (matchData.price && typeof matchData.price === 'string') {
          const priceMatch = matchData.price.match(/([0-9.]+)\s*([A-Z]+)/);
          if (priceMatch) {
            price = parseFloat(priceMatch[1]);
            currency = priceMatch[2];
          }
        } else if (typeof matchData.price === 'number') {
          price = matchData.price;
        }
        
        const expectedPlayers = 4;
        const pricePerPlayer = price / expectedPlayers;

        // Check if price is evenly divisible (within 0.01 tolerance)
        const remainder = price % expectedPlayers;
        const isEvenSplit = remainder < 0.01;

        return {
          status: 'OK',
          totalPrice: price.toFixed(2),
          currency: currency,
          pricePerPlayer: pricePerPlayer.toFixed(2),
          isEvenSplit: isEvenSplit,
          message: isEvenSplit ? 
            `${pricePerPlayer.toFixed(2)} ${currency} per player` : 
            `${pricePerPlayer.toFixed(2)} ${currency} per player (uneven split)`
        };
      } catch (error) {
        return {
          status: 'ERROR',
          message: error.toString()
        };
      }
    }

    /**
     * Run all Phase 1 sanity checks
     * @param {string} url - Playtomic URL (short or full)
     * @returns {object} Complete sanity check report
     */
    runAllSanityChecks(url) {
      return {
        venue: this.sanityCheckVenue(url),
        players: this.sanityCheckPlayers(url),
        date: this.sanityCheckDate(url),
        time: this.sanityCheckTime(url),
        competitive: this.sanityCheckCompetitive(url),
        paymentSplit: this.sanityCheckPaymentSplit(url)
      };
    }

    /**
     * Get all match data as JSON object
     * @param {string} url - Playtomic URL (short or full)
     * @returns {object} Complete match data from Playtomic API
     */
    getMatchDataAsJson(url) {
      try {
        const matchData = this._getMatchData(url);
        return {
          status: 'OK',
          data: matchData
        };
      } catch (error) {
        return {
          status: 'ERROR',
          message: error.toString()
        };
      }
    }

    /**
     * Get specific player by position (1-4)
     * @param {string} url - Playtomic URL (short or full)
     * @param {number} playerNumber - Player position (1, 2, 3, or 4)
     * @returns {object} Player information or error
     */
    getPlayer(url, playerNumber) {
      try {
        if (playerNumber < 1 || playerNumber > 4) {
          return {
            status: 'ERROR',
            message: 'Player number must be between 1 and 4'
          };
        }

        const matchData = this._getMatchData(url);
        
        if (!matchData.teams || matchData.teams.length !== 2) {
          return {
            status: 'ERROR',
            message: 'Invalid match data'
          };
        }

        // Players are organized as: Team 1 Player 1, Team 1 Player 2, Team 2 Player 1, Team 2 Player 2
        // So positions are: 1, 2, 3, 4
        let currentPosition = 0;
        
        for (let teamIndex = 0; teamIndex < matchData.teams.length; teamIndex++) {
          const team = matchData.teams[teamIndex];
          const teamPlayers = team.players || [];
          
          for (let playerIndex = 0; playerIndex < 2; playerIndex++) {
            currentPosition++;
            
            if (currentPosition === playerNumber) {
              if (playerIndex < teamPlayers.length) {
                const player = teamPlayers[playerIndex];
                return {
                  status: 'OK',
                  playerNumber: playerNumber,
                  team: teamIndex + 1,
                  name: player.name || 'Unknown',
                  userId: player.user_id || '',
                  level: player.level_value || player.level || 'Not specified',
                  exists: true
                };
              } else {
                return {
                  status: 'EMPTY',
                  playerNumber: playerNumber,
                  team: teamIndex + 1,
                  name: '',
                  userId: '',
                  message: 'Player slot empty',
                  exists: false
                };
              }
            }
          }
        }

        return {
          status: 'ERROR',
          message: 'Player not found'
        };
      } catch (error) {
        return {
          status: 'ERROR',
          message: error.toString()
        };
      }
    }

    // ============================================================================
    // PHASE 2: DATABASE OUR PLAYERS
    // ============================================================================

    /**
     * Load previous Playtomic games from user's history
     * Note: This requires authentication which may not be available via public API
     * @param {string} userId - User ID (if available)
     * @returns {object} List of previous games
     */
    loadPreviousGames(userId) {
      // TODO: This may require authentication or screen scraping
      return {
        status: 'TODO',
        message: 'This feature requires authentication. Consider using Playtomic export or manual data entry.'
      };
    }

    /**
     * Scrape player names and IDs from a match
     * @param {string} url - Playtomic URL
     * @returns {array} Array of player objects
     */
    scrapePlayersFromMatch(url) {
      try {
        const matchData = this._getMatchData(url);
        const players = [];

        if (matchData.teams) {
          matchData.teams.forEach(team => {
            if (team.players) {
              team.players.forEach(player => {
                players.push({
                  userId: player.user_id,
                  name: player.name,
                  level: player.level || 'Unknown'
                });
              });
            }
          });
        }

        return players;
      } catch (error) {
        return {
          status: 'ERROR',
          message: error.toString()
        };
      }
    }

    /**
     * Add player data to a sheet
     * @param {string} sheetName - Name of the sheet
     * @param {array} players - Array of player objects
     */
    addPlayersToSheet(sheetName, players) {
      try {
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        let sheet = ss.getSheetByName(sheetName);
        
        // Create sheet if it doesn't exist
        if (!sheet) {
          sheet = ss.insertSheet(sheetName);
          // Add headers
          sheet.getRange(1, 1, 1, 4).setValues([['User ID', 'Name', 'Level', 'Games Count']]);
          sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
        }

        // Add players
        const lastRow = sheet.getLastRow();
        players.forEach((player, index) => {
          sheet.getRange(lastRow + index + 1, 1, 1, 3).setValues([[
            player.userId,
            player.name,
            player.level
          ]]);
        });

        return {
          status: 'OK',
          message: `Added ${players.length} player(s) to ${sheetName}`
        };
      } catch (error) {
        return {
          status: 'ERROR',
          message: error.toString()
        };
      }
    }

    // ============================================================================
    // PHASE 3: ORGANISING MATCHES
    // ============================================================================

    /**
     * Create a form for collecting player information
     * @returns {string} Form URL
     */
    createPlayerCollectionForm() {
      try {
        const form = FormApp.create('Padel Player Registration');
        
        form.addTextItem().setTitle('Player Name').setRequired(true);
        form.addTextItem().setTitle('Playtomic User ID (if known)');
        form.addTextItem().setTitle('Email').setRequired(true);
        form.addTextItem().setTitle('Phone Number');
        
        const levelItem = form.addMultipleChoiceItem();
        levelItem.setTitle('Level');
        levelItem.setChoices([
          levelItem.createChoice('Beginner'),
          levelItem.createChoice('Intermediate'),
          levelItem.createChoice('Advanced'),
          levelItem.createChoice('Expert')
        ]);
        
        return form.getPublishedUrl();
      } catch (error) {
        return `Error creating form: ${error.toString()}`;
      }
    }

    /**
     * Create a sheet for weekly games
     * @param {string} weekIdentifier - e.g., "2025-W03" or "Sunday"
     */
    createWeeklyGameSheet(weekIdentifier) {
      try {
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        const sheetName = `Games_${weekIdentifier}`;
        
        let sheet = ss.getSheetByName(sheetName);
        if (!sheet) {
          sheet = ss.insertSheet(sheetName);
          
          // Add headers
          const headers = [
            'Date', 'Time', 'Venue', 'Court', 
            'Player 1', 'Player 2', 'Player 3', 'Player 4',
            'Price', 'Status', 'Match URL', 'Short URL'
          ];
          sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
          sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
          sheet.setFrozenRows(1);
        }

        return {
          status: 'OK',
          sheetName: sheetName,
          message: `Sheet ${sheetName} ready`
        };
      } catch (error) {
        return {
          status: 'ERROR',
          message: error.toString()
        };
      }
    }

    // ============================================================================
    // HELPER METHODS
    // ============================================================================

    /**
     * Internal helper to get match data from any URL format
     * @param {string} url - Playtomic URL (short or full)
     * @returns {object} Match data
     * @private
     */
    _getMatchData(url) {
      let matchId = '';

      if (url.includes('/t/')) {
        // Short URL format
        const shortIdMatch = url.match(/\/t\/([^/?&#]+)/);
        if (!shortIdMatch) throw new Error('Invalid short URL format');
        const shortId = shortIdMatch[1];

        const shortUrlResponse = UrlFetchApp.fetch(
          `${this.apiBaseUrl}/short_urls/${shortId}`
        );
        const shortUrlData = JSON.parse(shortUrlResponse.getContentText());

        const fullUrl = shortUrlData.full_url;
        const matchIdMatch = fullUrl.match(/\/matches\/([a-f0-9-]+)/);
        if (matchIdMatch) {
          matchId = matchIdMatch[1];
        }
      } else if (url.includes('/matches/')) {
        // Full URL format
        const matchIdMatch = url.match(/\/matches\/([a-f0-9-]+)/);
        if (matchIdMatch) {
          matchId = matchIdMatch[1];
        }
      }

      if (!matchId) {
        throw new Error('Invalid URL format - could not extract match ID');
      }

      const matchResponse = UrlFetchApp.fetch(
        `${this.apiBaseUrl}/matches/${matchId}`
      );
      return JSON.parse(matchResponse.getContentText());
    }
  }

  // ============================================================================
  // GOOGLE SHEETS CUSTOM FUNCTIONS
  // ============================================================================

  /**
   * Check if match has all players assigned
   * @param {string} playtomicUrl - Playtomic URL (short or full format)
   * @returns {boolean} true if all 4 players are assigned, false otherwise
   * @customfunction
   */
  function PLAYTOMIC_MATCH_CHECK(playtomicUrl) {
    const manager = new PlaytomicManager();
    const result = manager.sanityCheckPlayers(playtomicUrl);
    
    // Return true if all players are assigned (no missing players)
    return result.status === 'COMPLETE' && result.missingPlayers === 0;
  }

  /**
   * Get short link from match URL
   * @param {string} url - Playtomic URL (short or full format)
   * @returns {string} Short URL
   * @customfunction
   */
  function PLAYTOMIC_MATCH_GET_SHORT_LINK(url) {
    const manager = new PlaytomicManager();
    
    // If already a short link, return it
    if (url.includes('/t/')) {
      return url;
    }
    
    // If full URL, extract match ID and create short link
    if (url.includes('/matches/')) {
      const matchIdMatch = url.match(/\/matches\/([a-f0-9-]+)/);
      if (matchIdMatch) {
        return manager.createShortLink(matchIdMatch[1]);
      }
    }
    
    // If just a match ID is provided
    return manager.createShortLink(url);
  }

  /**
   * Check venue information
   * @param {string} url - Playtomic URL (short or full format)
   * @returns {string} Venue name
   * @customfunction
   */
  function PLAYTOMIC_MATCH_GET_VENUE(url) {
    const manager = new PlaytomicManager();
    const result = manager.sanityCheckVenue(url);
    return result.venueName || result.message;
  }

  /**
   * Check match date
   * @param {string} url - Playtomic URL (short or full format)
   * @returns {string} Match date
   * @customfunction
   */
  function PLAYTOMIC_MATCH_GET_DATE(url) {
    const manager = new PlaytomicManager();
    const result = manager.sanityCheckDate(url);
    return result.date || result.message;
  }

  /**
   * Check match time
   * @param {string} url - Playtomic URL (short or full format)
   * @returns {string} Start time
   * @customfunction
   */
  function PLAYTOMIC_MATCH_GET_TIME(url) {
    const manager = new PlaytomicManager();
    const result = manager.sanityCheckTime(url);
    return result.startTime || result.message;
  }

  /**
   * Check payment split
   * @param {string} url - Playtomic URL
   * @returns {string} Price per player
   * @customfunction
   */
  function PLAYTOMIC_PRICE_PER_PLAYER(url) {
    const manager = new PlaytomicManager();
    const result = manager.sanityCheckPaymentSplit(url);
    return result.message || 'N/A';
  }

  /**
   * Run all sanity checks and return formatted report
   * @param {string} url - Playtomic URL (short or full format)
   * @returns {string} Complete report
   * @customfunction
   */
  function PLAYTOMIC_MATCH_FULL_CHECK(url) {
    const manager = new PlaytomicManager();
    const results = manager.runAllSanityChecks(url);
    
    let report = [];
    report.push(`Venue: ${results.venue.venueName || results.venue.message}`);
    report.push(`Players: ${results.players.message}`);
    report.push(`Date: ${results.date.message}`);
    report.push(`Time: ${results.time.message}`);
    report.push(`Type: ${results.competitive.message}`);
    report.push(`Payment: ${results.paymentSplit.message}`);
    
    return report.join(' | ');
  }

  /**
   * Get player 1 name from match
   * @param {string} url - Playtomic URL (short or full format)
   * @returns {string} Player 1 name
   * @customfunction
   */
  function PLAYTOMIC_MATCH_GET_PLAYER_1(url) {
    const manager = new PlaytomicManager();
    const result = manager.getPlayer(url, 1);
    return result.name || result.message || '';
  }

  /**
   * Get player 2 name from match
   * @param {string} url - Playtomic URL (short or full format)
   * @returns {string} Player 2 name
   * @customfunction
   */
  function PLAYTOMIC_MATCH_GET_PLAYER_2(url) {
    const manager = new PlaytomicManager();
    const result = manager.getPlayer(url, 2);
    return result.name || result.message || '';
  }

  /**
   * Get player 3 name from match
   * @param {string} url - Playtomic URL (short or full format)
   * @returns {string} Player 3 name
   * @customfunction
   */
  function PLAYTOMIC_MATCH_GET_PLAYER_3(url) {
    const manager = new PlaytomicManager();
    const result = manager.getPlayer(url, 3);
    return result.name || result.message || '';
  }

  /**
   * Get player 4 name from match
   * @param {string} url - Playtomic URL (short or full format)
   * @returns {string} Player 4 name
   * @customfunction
   */
  function PLAYTOMIC_MATCH_GET_PLAYER_4(url) {
    const manager = new PlaytomicManager();
    const result = manager.getPlayer(url, 4);
    return result.name || result.message || '';
  }

  /**
   * Get player 1 ID from match
   * @param {string} url - Playtomic URL (short or full format)
   * @returns {string} Player 1 ID
   * @customfunction
   */
  function PLAYTOMIC_MATCH_GET_PLAYER_1_ID(url) {
    const manager = new PlaytomicManager();
    const result = manager.getPlayer(url, 1);
    return result.userId || '';
  }

  /**
   * Get player 2 ID from match
   * @param {string} url - Playtomic URL (short or full format)
   * @returns {string} Player 2 ID
   * @customfunction
   */
  function PLAYTOMIC_MATCH_GET_PLAYER_2_ID(url) {
    const manager = new PlaytomicManager();
    const result = manager.getPlayer(url, 2);
    return result.userId || '';
  }

  /**
   * Get player 3 ID from match
   * @param {string} url - Playtomic URL (short or full format)
   * @returns {string} Player 3 ID
   * @customfunction
   */
  function PLAYTOMIC_MATCH_GET_PLAYER_3_ID(url) {
    const manager = new PlaytomicManager();
    const result = manager.getPlayer(url, 3);
    return result.userId || '';
  }

  /**
   * Get player 4 ID from match
   * @param {string} url - Playtomic URL (short or full format)
   * @returns {string} Player 4 ID
   * @customfunction
   */
  function PLAYTOMIC_MATCH_GET_PLAYER_4_ID(url) {
    const manager = new PlaytomicManager();
    const result = manager.getPlayer(url, 4);
    return result.userId || '';
  }

/**
 * Check if match is paid
 * @param {string} url - Playtomic URL (short or full format)
 * @returns {boolean} true if match is fully paid, false otherwise
 * @customfunction
 */
function PLAYTOMIC_MATCH_IS_PAID(url) {
  try {
    const manager = new PlaytomicManager();
    const result = manager.getMatchDataAsJson(url);
    
    if (result.status !== 'OK') {
      return false;
    }
    
    const matchData = result.data;
    
    // Check registration_info.payments_status
    if (matchData.registration_info && matchData.registration_info.payments_status) {
      return matchData.registration_info.payments_status === 'PAID';
    }
    
    // Alternative: check if payment_required is false or if all registrations have payments
    if (matchData.payment_required === false) {
      return true;
    }
    
    return false;
  } catch (error) {
    return false;
  }
}

/**
 * Check if match is competitive
 * @param {string} url - Playtomic URL (short or full format)
 * @returns {boolean} true if match is competitive, false if friendly
 * @customfunction
 */
function PLAYTOMIC_MATCH_IS_COMPETITIVE(url) {
  try {
    const manager = new PlaytomicManager();
    const result = manager.getMatchDataAsJson(url);
    
    if (result.status !== 'OK') {
      return false;
    }
    
    const matchData = result.data;

    // Check competition_mode field - this is the most reliable indicator
    if (matchData.competition_mode && matchData.competition_mode === 'COMPETITIVE') {
      // return matchData.competition_mode
      return true;
    }
    
    // If competition_mode is explicitly FRIENDLY, return false
    if (matchData.competition_mode && matchData.competition_mode === 'FRIENDLY') {
      // return matchData.competition_mode
      return false;
    }
    
    // Fallback to match_type check if competition_mode not available
    if (matchData.match_type) {
      const matchType = String(matchData.match_type).toUpperCase();
      // BOOKING is typically competitive, FRIENDLY is not
      return matchType === 'COMPETITIVE' || matchType === 'BOOKING';
    }
    // return matchData.competition_mode
    // Default to false if we can't determine
    return false;
  } catch (error) {
    return false;
  }
}

/**
 * Get specific player by position (1-4)
 * @param {string} url - Playtomic URL
 * @param {number} playerNumber - Player position (1, 2, 3, or 4)
 * @returns {string} Player name
 * @customfunction
 */
function PLAYTOMIC_PLAYER(url, playerNumber) {
  const manager = new PlaytomicManager();
  const result = manager.getPlayer(url, playerNumber);
  return result.name || result.message || '';
}

  /**
   * Get all match data as JSON string (useful for debugging or custom processing)
   * Note: This returns raw JSON data from Playtomic API
   * @param {string} url - Playtomic URL (short or full format)
   * @returns {string} JSON string of complete match data
   * @customfunction
   */
  function PLAYTOMIC_MATCH_GET_JSON(url) {
    const manager = new PlaytomicManager();
    const result = manager.getMatchDataAsJson(url);
    
    if (result.status === 'OK') {
      return JSON.stringify(result.data, null, 2);
    } else {
      return result.message || 'Error retrieving match data';
    }
  }

  /**
   * Get raw match data as object (for use in Apps Script, not spreadsheet cells)
   * @param {string} url - Playtomic URL
   * @returns {object} Complete match data object
   */
  function getMatchDataObject(url) {
    const manager = new PlaytomicManager();
    const result = manager.getMatchDataAsJson(url);
    return result.status === 'OK' ? result.data : null;
  }
