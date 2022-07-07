import puppeteer from "puppeteer";
import fs from "fs";

async function scrapeNaturalInt() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.naturalint.com/jobs/");

  const jobs = await page.$$eval("div.job-items a", (jobItems) =>
    jobItems.map((jobItem) => {
      return {
        title: jobItem.querySelector("h2.item-title").textContent,
        department: jobItem.querySelector("h3.item-cat").textContent,
      };
    })
  );

  console.log(jobs[0]);

  browser.close();
}

scrapeNaturalInt();
