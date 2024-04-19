const ChallengeLinkPromise = (browser, link) =>
  new Promise(async (resolve, reject) => {
    const newPage = await browser.newPage();
    await newPage.goto(link);

    const dataObj = {
      title: await newPage.$eval("h1", (text) => text.textContent),
      authors: await newPage.$$eval("ul.entry-meta.mb-3 a", (options) =>
        options.map(({ title, href }) => {return {'title': title, 'href': href}})
      ),
      type: await newPage.$eval(
        ".place__breadcrumbs.breadcrumbs",
        (options) => options.lastElementChild.textContent
      ),
      img: await newPage.$eval(".inn-img > img", ({ src, alt }) => {return {"src": src, "alt": alt}}),
      basicInfo: await newPage.$$eval("div.place__box.place__brbtt", (info) =>
        [
          ...[...info].find((div) => div.textContent.includes("Premios:"))
            .children,
        ].map((p) => { return {
          [`${p.firstElementChild.textContent.trim().slice(0, -1)}`]:
          `${p.lastElementChild.textContent.trim()}`,
      }})
      ),
      link: await newPage.url(),
    };

    resolve(dataObj);
    await newPage.close();
  });

module.exports = ChallengeLinkPromise;
