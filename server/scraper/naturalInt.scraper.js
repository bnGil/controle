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
        const companyImg =
          "data:image/jpeg;base64,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";
        return {
          title,
          department,
          jobPageLink,
          location,
          company,
          companyImg,
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
