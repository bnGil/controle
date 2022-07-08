import puppeteer from "puppeteer";
import fs from "fs";

async function scrapeNaturalInt() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.naturalint.com/jobs/");

  const jobs = await page.$$eval("div.job-items a", (jobItems) =>
    jobItems.map((jobItem) => {
      const jobPageLink = jobItem.href;
      const title = jobItem.querySelector("h2.item-title").textContent;
      const department = jobItem.querySelector("h3.item-cat").textContent;
      return {
        title,
        department,
        jobPageLink,
      };
    })
  );

  for (let i = 0; i < jobs.length; i++) {
    await Promise.all([
      page.waitForNavigation(),
      page.goto(jobs[i].jobPageLink),
      page.waitForSelector(".jobs-position-info"),
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

    jobs[i].jobDescription = {
      description,
      responsibilities,
      requirements,
    };
  }

  browser.close();
}

scrapeNaturalInt();
