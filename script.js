require("dotenv").config();
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const proxy = require("selenium-webdriver/proxy");

async function generateRandomUserAgent() {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1",
  ];

  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

async function createDriver() {
  const proxyUrl = process.env.PROXY_URL_HTTP;
  const options = new chrome.Options();
  const proxyOptions = proxy.manual({
    http: process.env.PROXY_URL_HTTP,
    https: process.env.PROXY_URL_HTTPS,
  });
  options.setProxy(proxyOptions);
  options.addArguments(`--proxy-server=${proxyUrl}`);
  options.addArguments(`--user-agent=${await generateRandomUserAgent()}`);
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions({
      options,
      // proxyType: "manual",
      // httpProxy: proxyUrl,
      // sslProxy: proxyUrl,
    })
    .build();

  return driver;
}

async function twitterDataFetching() {
  let browser = await createDriver();
  try {
    //Visit the website
    await browser.get("https://x.com");
    await browser.manage().window().maximize();
    await browser.sleep(2000);

    // cancel x button
    await browser
      .findElement(
        By.css(
          ".r-4qtqp9.r-yyyyoo.r-1xvli5t.r-dnmrzs.r-bnwqim.r-lrvibr.r-m6rgpd"
        )
      )
      .click();

    // click on the sign in button
    await browser.findElement(By.xpath("//span[text()='Sign in']")).click();

    // //Enter the email
    await browser.sleep(4000);
    await browser
      .findElement(By.xpath("//input"))
      .sendKeys(process.env.TWITTER_EMAIL);

    // click on the next button
    await browser.findElement(By.xpath("//span[text()='Next']")).click();

    // pass unusual activity detector
    await browser.sleep(2000);
    await browser
      .findElement(By.xpath("//input"))
      .sendKeys(process.env.TWITTER_USERNAME);

    // click on the next button
    await browser.findElement(By.xpath("//span[text()='Next']")).click();

    // enter the password
    await browser.sleep(2000);
    await browser
      .findElement(By.xpath("//input[@name='password']"))
      .sendKeys(process.env.TWITTER_PASSWORD);

    // click on the next button
    await browser.findElement(By.xpath("//span[text()='Log in']")).click();

    // click on show more trending
    await browser.sleep(6000);
    await browser.findElement(By.xpath("//span[text()='Show more']")).click();

    // get the 5 trending topics
    await browser.sleep(4000);
    let trendingTopics = await browser.findElements(
      By.xpath("//div[@data-testid='trend']")
    );

    const result = [];
    for (let i = 0; i < 5; i++) {
      result.push(await trendingTopics[i].getText());
    }

    //visit to get ip
    await browser.get("https://api.ipify.org?format=text");

    // Wait for the page to load
    await browser.sleep(2000); // Sleep for 2 seconds

    // Extract the IP address from the page
    const ipAddress = await browser.findElement(By.tagName("body")).getText();

    // Log the IP address to the console
    return {
      trendingTopics: result,
      ipAddress: ipAddress,
      dateTime: new Date().toLocaleString(),
    };
  } finally {
    await browser.executeScript("window.localStorage.clear();");
    await browser.executeScript("window.sessionStorage.clear();");
    await browser.manage().deleteAllCookies();
    await browser.quit();
  }
}

module.exports = twitterDataFetching;
