const MWBot = require("mwbot");

module.exports = {
  /**
   * Get a logged-in instance of `MWBot` with edit token already set up.
   * Default username, password and base URL is used unless specified.
   *
   * @param {string} username - Optional
   * @param {string} password - Optional
   * @param {string} baseUrl - Optional
   * @return {Object} Promise for MWBot
   */
  async bot(
    username = global.mwUser || "Admin",
    password = global.mwPwd || "vagrant",
    baseUrl = global.baseUrl || "http://localhost:8080"
  ) {
    const bot = new MWBot();

    await bot.loginGetEditToken({
      apiUrl: `${baseUrl}/api.php`,
      username: username,
      password: password,
    });
    return bot;
  },

  /**
   * Shortcut for `MWBot#request( { acount: 'createaccount', .. } )`.
   *
   * @since 0.1.0
   * @see <https://www.mediawiki.org/wiki/API:Account_creation>
   * @param {MWBot} adminBot
   * @param {string} username New user name
   * @param {string} password New user password
   * @return {Object} Promise for API action=createaccount response data.
   */
  async createAccount(adminBot, username, password) {
    await adminBot.getCreateaccountToken();

    // Create the new account
    return await adminBot.request({
      action: "createaccount",
      createreturnurl: global.baseUrl || "http://localhost:8080",
      createtoken: adminBot.createaccountToken,
      username: username,
      password: password,
      retype: password,
    });
  },

  /**
	 * Shortcut for `MWBot#request( { action: 'block', .. } )`.
	 *
	 * @since 0.3.0
	 * @see <https://www.mediawiki.org/wiki/API:Block>
	 * @param {MWBot} adminBot
	 * @param {string} [username] defaults to blocking the admin user
	 * @param {string} [expiry] default is not set. For format see API docs
	 * @return {Object} Promise for API action=block response data.
	 */
	async blockUser( adminBot, username, expiry ) {
		return await adminBot.request( {
			action: 'block',
			user: username || global.mwUser,
			reason: 'browser test',
			token: adminBot.editToken,
			expiry
		} );
  },
  
  /**
	 * Shortcut for `MWBot#request( { action: 'unblock', .. } )`.
	 *
	 * @since 0.3.0
	 * @see <https://www.mediawiki.org/wiki/API:Block>
	 * @param {MWBot} adminBot
	 * @param {string} [username] defaults to unblocking the admin user
	 * @return {Object} Promise for API action=unblock response data.
	 */
	async unblockUser( adminBot, username ) {
		return await adminBot.request( {
			action: 'unblock',
			user: username || global.mwUser,
			reason: 'browser test done',
			token: adminBot.editToken
		} );
	}
};
