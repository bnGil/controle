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
      page.waitForSelector("#comp-jnys3y7w > ul"),
    ]);

    const weAre = [],
      youAre = [];
    let youWillHeader = "";

    const siblingsNodes = await page.$$("#comp-jnys3y7w > *");
    const siblings = Array.from(siblingsNodes);
    siblings.shift();

    let toWeAre = true;

    for (let i = 0; i < siblings.length; i++) {
      if (siblings[i].localName === "p") {
        if (toWeAre) {
          weAre.push(siblings[i].textContent);
        } else {
          youAre.push(siblings[i].textContent);
        }
      } else if (siblings[i].localName === "h2") {
        if (siblings[i].textContent === "About Wix") {
          break;
        }
        toWeAre = false;
        youWillHeader = siblings[i].textContent;
      }
    }

    // const weAre = await page.$eval(
    //   "#comp-jnys3y7w > p:nth-child(2)",
    //   (p) => p.textContent
    // );
    // const youAre = await page.$eval(
    //   "#comp-jnys3y7w > p:nth-child(4)",
    //   (p) => p.textContent
    // );

    // const youWillHeader = await page.$eval(
    //   "#comp-jnys3y7w > h2:nth-child(5)",
    //   (h2) => h2.textContent
    // );

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
  console.log(jobs[1].weAre);
  return jobs;
}

scrapeWix();
