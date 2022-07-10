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
    const indicesToRemoveFromScraped = [];

    await Promise.all(
      scrapedJobs.map(async (job, idx) => {
        const isExist = await Job.findOne({ jobId: job.jobId });
        if (isExist) {
          //delete from currentJobs and from scrapedJobs
          const idxOfJobAtCurr = currentJobs.findIndex(
            (jobObj) => jobObj.jobId === job.jobId
          );
          currentJobs.splice(idxOfJobAtCurr, 1);
          indicesToRemoveFromScraped.push(idx);
        }
      })
    );

    // At this point, what is left from currentJobs needs to be removed from DB and notify with emails
    // and what is left from scrapedJobs needs to be added to DB
  } catch (err) {
    console.log(err.message);
  }
}

await addJobsToDB();
