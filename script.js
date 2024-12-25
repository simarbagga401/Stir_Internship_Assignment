const { Builder, By, until } = require("selenium-webdriver");
const { v4: uuidv4 } = require("uuid");
const chrome = require("selenium-webdriver/chrome");

(async function twitterDataFetching() {
  const proxyUrl = "http://prayingmantics401a:yeleyrbc@us.proxymesh.com:31280";
  const options = new chrome.Options();
  options.addArguments(`--proxy-server=${proxyUrl}`);
  let browser = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

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
      .sendKeys("prayingmantics@gmail.com");

    // click on the next button
    await browser.findElement(By.xpath("//span[text()='Next']")).click();

    // pass unusual activity detector
    await browser.sleep(2000);
    await browser.findElement(By.xpath("//input")).sendKeys("Mantis563193664");

    // click on the next button
    await browser.findElement(By.xpath("//span[text()='Next']")).click();

    // enter the password
    await browser.sleep(2000);
    await browser
      .findElement(By.xpath("//input[@name='password']"))
      .sendKeys("yeleyrbc");

    // click on the next button
    await browser.findElement(By.xpath("//span[text()='Log in']")).click();

    // click on show more trending
    await browser.sleep(4000);
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
    await driver.get("https://api.ipify.org?format=text");

    // Wait for the page to load
    await driver.sleep(2000); // Sleep for 2 seconds

    // Extract the IP address from the page
    const ipAddress = await driver.findElement(By.tagName("body")).getText();

    // Log the IP address to the console
    console.log("IP Address: ", ipAddress);
    console.log(result);
    return result;
  } finally {
    await browser.quit();
  }
})();
