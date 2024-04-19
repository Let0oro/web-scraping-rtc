const mongoose = require("mongoose");
const Challenge = require("../models/Challenge");
const ChallengeLinkPromise = require("../linkScrape");

const saveDb = async (arrayInfo) => {

    arrayInfo.map( async (data) => {
        const dataDoc = new Challenge(data);
        try {
            await dataDoc.save();
            console.log(`Succesfully saved ${dataDoc.title} to DB`);
        } catch (error) {
            console.log(`Failed to save ${dataDoc.title} to DB, Error: ${error}`);
        }
    } )

}

module.exports = saveDb;