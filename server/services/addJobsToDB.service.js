import { scrapeFiverr } from "../scraper/fiverr.scraper.js";
import { scrapeNaturalInt } from "../scraper/naturalInt.scraper.js";
import { Job } from "../models/job/job.model.js";

import "../db/mongoose.js";

async function addJobsToDB() {
  try {
    const currentJobs = await Job.find({});
    //   const fiverrJobs = await scrapeFiverr();
    // const naturalJobs = await scrapeNaturalInt();
    //   const scrapedJobs = fiverrJobs.concat(naturalJobs);
    // const scrapedJobs = naturalJobs;

    if (currentJobs.length === 0) {
      return await Job.insertMany(scrapedJobs);
    }

    //! If there are jobs in the scraped jobs that are not in the current jobs --> insertMany only them
    //! If there are jobs in the CURRENT jobs that are not in the SCRAPED jobs -->
    //! get an array of them, send email to users that had them on wishlist, delete from DB
  } catch (err) {
    console.log(err.message);
  }
}

await addJobsToDB();
