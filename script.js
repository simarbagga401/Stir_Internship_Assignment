const { Builder, By, until } = require("selenium-webdriver");

const assert = require("assert");

async function twitterDataFetching() {
  let browser = await new Builder().forBrowser("chrome").build();

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
      result.push( await trendingTopics[i].getText());
    }
    console.log(result);
  } finally {
    await browser.quit();
  }
}
