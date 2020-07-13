const querystring = require("querystring");

class Page {
  /**
   * Navigate the browser to a given page.
   *
   * @param {Object} page Puppeteer page
   * @param {string} title Page title
   * @param {Object} [query] Query parameter
   * @param {string} [fragment] Fragment parameter
   * @return {void} This method runs a browser command.
   */
  async openTitle(page, title, query = {}, fragment = "") {
    query.title = title;
    await page.goto(
      (global.baseUrl || "http://localhost:8080") +
        "/index.php?" +
        querystring.stringify(query) +
        (fragment ? "#" + fragment : "")
    );
  }
}

module.exports = Page;
