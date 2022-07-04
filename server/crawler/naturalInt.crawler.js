import puppeteer from "puppeteer";
import fs from "fs";

async function scrapeNaturalInt() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.naturalint.com/jobs/");

  const jobTitles = await page.$$eval("h2.item-title", (titles) =>
    titles.map((title) => {
      return title.textContent;
    })
  );

  const jobDepartments = await page.$$eval("h3.item-cat", (departments) =>
    departments.map((department) => {
      return department.textContent;
    })
  );

  browser.close();
}

scrapeNaturalInt();
