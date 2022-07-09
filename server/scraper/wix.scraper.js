import puppeteer from "puppeteer";

export async function scrapeWix() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.wix.com/jobs/locations/tel-aviv", {
    waitUntil: "networkidle0",
  });

  await page.waitForSelector("li.hover");
  const deps = await page.$$eval("div._1ozXL", (departments) =>
    departments.map((department) => {
      const departmentName = department.querySelector(
        "h2.font_2 > span > span > span"
      ).textContent;
      const depJobs = Array.from(department.querySelectorAll("li.hover a"));
      return depJobs.map((job) => ({
        jobPageLink: job.href,
        title: job.textContent,
        departmentName,
      }));
    })
  );
  const jobs = deps.flat();
  for (let i = 0; i < jobs.length; i++) {
    await Promise.all([
      page.waitForNavigation(),
      page.goto(jobs[i].jobPageLink),
      page.waitForSelector("ul.font_8 li"),
    ]);

    const weAre = await page.$eval(
      "#comp-jnys3y7w > p:nth-child(2)",
      (p) => p.textContent
    );
    const youAre = await page.$eval(
      "#comp-jnys3y7w > p:nth-child(4)",
      (p) => p.textContent
    );

    const youWillHeader = await page.$eval(
      "#comp-jnys3y7w > h2:nth-child(5)",
      (h2) => h2.textContent
    );

    const youWillList = await page.$$eval("#comp-jnys3y7w > ul li", (lis) =>
      lis.map((li) => li.textContent)
    );

    jobs[i].jobDescription = {
      weAre,
      youAre,
      youWillHeader,
      youWillList,
    };
  }

  browser.close();
  return jobs;
}
