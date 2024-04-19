const puppeteer = require("puppeteer");
const scrapeCurrentNumberPage = require("./scrapeCurrentPage");


const scrapPage = async (url) => {
  let challengesArray = [];
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  try {
    await page.setViewport({ height: 900, width: 1080 });
    await page.goto(url);

    await page?.waitForSelector('li.option[data-value="categoria1"]');
    await page.$eval('li.option[data-value="categoria1"]', async (el) => el.click());
    await page.click('li.option[data-value="categoria1"]');

    await scrapeCurrentNumberPage(browser, page, challengesArray);
  } catch (err) {
    console.log("\nError", err);
  } finally {
    console.log(challengesArray);
    console.log(challengesArray.length);
    return challengesArray;
  }
};

module.exports = scrapPage;