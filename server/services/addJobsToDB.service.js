import cron from "node-cron";

import { scrapeFiverr } from "../scraper/fiverr.scraper.js";
import { scrapeNaturalInt } from "../scraper/naturalInt.scraper.js";
import { Job } from "../models/job/job.model.js";

export async function addJobsToDB() {
  try {
    const dbJobs = await Job.find({});
    const fiverrJobs = await scrapeFiverr();
    const naturalJobs = await scrapeNaturalInt();
    const scrapedJobs = fiverrJobs.concat(naturalJobs);

    if (dbJobs.length === 0) {
      return await Job.insertMany(scrapedJobs);
    }

    for (let scrJob of scrapedJobs) {
      const idx = dbJobs.findIndex((dbJob) => dbJob.jobId === scrJob.jobId);
      if (idx === -1) {
        const newJob = new Job(scrJob);
        await newJob.save();
      }
    }

    const jobsToRemove = [];
    dbJobs.forEach((dbJob) => {
      const idx = scrapedJobs.findIndex(
        (scrJob) => scrJob.jobId === dbJob.jobId
      );
      if (idx === -1) {
        jobsToRemove.push(dbJob);
      }
    });

    //! send mail to users who liked jobs that are in the jobsToRemove array telling them that the job is not relevant.

    for (let jobToRemove of jobsToRemove) {
      await Job.deleteOne({ _id: jobToRemove._id });
    }
  } catch (err) {
    console.log(err.message);
  }
}

cron.schedule("0 0 * * *", addJobsToDB);
