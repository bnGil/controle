import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export async function scrapeFiverr() {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto("https://www.fiverr.com/jobs/teams?location=tlv", {
      waitUntil: "networkidle0",
    });

    const deps = await page.$$eval("div.vlbNOzf", (departments) =>
      departments.map((department) => {
        const departmentStr = department.querySelector("a > h2").textContent;
        const departmentArr = departmentStr.split(" ");
        departmentArr.pop();
        const departmentName = departmentArr.join(" ");
        const company = "Fiverr";
        const companyImg =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEUdv3P///8TvnAGvW2O3LSi4cFhz5l11KRazpUAvGoAumV91qgzxH/2/fq+6tTP8eCF1qqX3bmx58wownna9OhJyInj9u33/foxw33v+vXV8uRSy4+S3LVp0Zyn48TM7dq46dAAt11Scv6vAAACKElEQVR4nO3d2VLCMBSA4XoOSCMFLIsbLvD+L6nojVMlaVLG0+P8/31m+k2XhLZTqoqIiIiIiIiIiIiIiIiIiIiIiOiiiahqOJdab97ATrLm+radrpdnah0TP3bdZrbeXsV7CtbbWZrqrk3pTq2cCkN124fnVqgyXfTz+RSKTvryfApDfZcB9CeU8Jrj8yeUapUH9CbU5jET6EwozX0u0JdQ8vegL6E8FABdCfWpAOhJmDtNuBPKvgjoSZi1knEo1OcyoB/hpuQ66kmY9XPCp7B0F3oRyksp0IswLP+7UIuBToQyKxf6uJuo/RZsi+2b1zvCoc+dw/W++u3evgtgn+l+KUGsN7M82SWBkxvrjRxUejZsXVxOzqfzBNDH9TJSclFaOz4FP9M2DrzzfRJ+pNO48OD9IE0KJz7mvEgp4Qzh6EOIcHxJp5AShu6IjCyAm+tO9SEubOvuiP41BkRp4p7L9mxwhEvT+02SC2SxWkCIECFChAgRIkSIECFChAgRIkSIEOGlhH8ItHn2KDedjomn3C/H7ohvJd5UGcfT1SFPZqRG+HeO8yFEiNA+hAgR2ocQIUL7ECJEaB9ChAjtQ4gQoX0IESK0DyFChPYhRIjQPoQIEdqHECFC+xAiRGgfQoQI7UOIEKF9CBEitA8hQoT2pf44YD5AaPHdxJ/Jro7WxAY382i7cXwKfNAnSDXaOIBERERERERERERERERERERERERERF+9A0lXQi2P5w0/AAAAAElFTkSuQmCC";
        const location = "Tel Aviv";
        const depJobs = Array.from(
          department.querySelectorAll("div a.OuRgckW")
        );
        return depJobs.map((job) => ({
          jobPageLink: job.href,
          title: job.querySelector("div > h6").textContent,
          company,
          location,
          department: departmentName,
          companyImg,
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

      jobs[i].jobId = getFiverrJobIdFromURL(jobs[i].jobPageLink);
    }

    browser.close();
    console.log(jobs);
    return jobs;
  } catch (err) {
    console.log(err.message);
  }
}

function getFiverrJobIdFromURL(url) {
  return url.split("/")[4];
}
