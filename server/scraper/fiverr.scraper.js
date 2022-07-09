// import puppeteer from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";

async function scrapeFiverr() {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.fiverr.com/jobs/teams?location=tlv", {
    waitUntil: "networkidle0",
  });

  const deps = await page.$$eval("div.vlbNOzf", (departments) =>
    departments.map((department) => {
      const departmentName = department.querySelector("a > h2").textContent;
      const company = "Fiverr";
      const location = "Tel Aviv";
      const depJobs = Array.from(department.querySelectorAll("div a.OuRgckW"));
      return depJobs.map((job) => ({
        jobPageLink: job.href,
        title: job.querySelector("div > h6").textContent,
        company,
        location,
        departmentName,
      }));
    })
  );
  const jobs = deps.flat();

  for (let i = 0; i < jobs.length; i++) {
    await Promise.all([
      page.waitForNavigation(),
      page.goto(jobs[i].jobPageLink),
    ]);

    const description = await page.$$eval(
      "div.page-container > div.details-section > div:nth-child(1) > div > p",
      (ps) => ps.map((p) => p.textContent)
    );

    const responsibilities = await page.$$eval(
      "div.page-container > div.details-section > div:nth-child(2) > div > ul > li",
      (lis) => lis.map((li) => li.textContent)
    );

    const requirements = await page.$$eval(
      "div.page-container > div.details-section > div:nth-child(3) > div > ul > li",
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

scrapeFiverr();
