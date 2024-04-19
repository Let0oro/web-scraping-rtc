const ChallengeLinkPromise = require("./linkScrape.js");

const scrapeCurrentNumberPage = async (browser, page, challengesArray) => {
  try {
    await page?.waitForSelector(".main-primary");
    await page?.waitForSelector(".area-places.layout-3col.container-convocatorias");
    await page?.waitForSelector(".place-inner > .entry-detail > .place-title > a");

    const urls = await page.$$eval(".place-inner > .entry-detail", async (links) => {
      links = await links.filter((link) =>
        link
          .querySelector(".close-now.gris")
          .lastElementChild.textContent.includes("ABIERTO")
      );

      links = await links.map((link) => link.querySelector(".entry-detail > .place-title > a").href);
      return links;
    });

    for (link in urls) {
      const currentPageData = await ChallengeLinkPromise(browser, urls[link]);
      await challengesArray.push(currentPageData);
    }

    let nextButtonExist = false;
    try {
      const nextButton = await page.$eval(
        "a.ma-right.pageMe.pointer",
        (a) => a.textContent
      );
      nextButtonExist = true;
    } catch (err) {
      nextButtonExist = false;
      console.log("Error clicking next page, may be don´t exist");
    }
  
    if (!!nextButtonExist) {
      await page.click("a.ma-right.pageMe.pointer");
      await scrapeCurrentNumberPage(browser, page, challengesArray);
    } else {
      await browser.close();
    }
  } catch (error) {
    console.log("Error scrapping current page", error);
  }
};

module.exports = scrapeCurrentNumberPage;
