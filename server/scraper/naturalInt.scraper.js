import puppeteer from "puppeteer";

import { pascalCaseStr } from "../utils/utilFunctions.js";

export async function scrapeNaturalInt() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto("https://www.naturalint.com/jobs/");

    const jobs = await page.$$eval("div.job-items a", (jobItems) =>
      jobItems.map((jobItem) => {
        const jobPageLink = jobItem.href;
        const title = jobItem.querySelector("h2.item-title").textContent;
        const department = jobItem.querySelector("h3.item-cat").textContent;
        const location = "Tel Aviv";
        const company = "Natural Intelligence";
        return {
          title,
          department,
          jobPageLink,
          location,
          company,
        };
      })
    );

    for (let i = 0; i < jobs.length; i++) {
      await Promise.all([
        page.waitForNavigation(),
        page.goto(jobs[i].jobPageLink, {
          waitUntil: "networkidle0",
        }),
      ]);

      const description = await page.$$eval(
        "div.jobs-position-section.comeet-position-description p",
        (ps) => ps.map((p) => p.textContent)
      );
      description.pop();

      const responsibilities = await page.$$eval(
        "div.jobs-position-section.comeet-position-description > ul li",
        (lis) => lis.map((li) => li.textContent)
      );

      const requirements = await page.$$eval(
        "div.jobs-position-section.comeet-position-requirements > ul li",
        (lis) => lis.map((li) => li.textContent)
      );

      jobs[i].department = pascalCaseStr(jobs[i].department);
      jobs[i].title = pascalCaseStr(jobs[i].title);

      jobs[i].jobDescription = {
        description,
        responsibilities,
        requirements,
      };

      jobs[i].jobId = getNaturalJobIdFromURL(jobs[i].jobPageLink);
    }

    browser.close();
    return jobs;
  } catch (err) {
    console.log(err.message);
  }
}

function getNaturalJobIdFromURL(url) {
  return url.split("/")[6];
}
