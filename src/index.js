const connect = require("./utils/db.js");
const scrapPage = require("./scrape");
const saveDb = require("./utils/saveDb.js");

const main = async () => {

  try {
    await connect()
    const data = await scrapPage("https://www.mundoarti.com/concursos/");
    await saveDb(data)
    
  } catch (error) {
    console.log("An error ocurred: ", error);
  }
}

main();