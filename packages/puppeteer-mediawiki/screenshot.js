const { toFilepath } = require("./Util");

module.exports = async (page, testname, outputDir, before = true) => {
  const prefix = before ? "before-" : "after-";
  const screenshotPath = toFilepath(prefix + testname, outputDir, "png");
  await page.screenshot({
    path: screenshotPath,
  });
};
