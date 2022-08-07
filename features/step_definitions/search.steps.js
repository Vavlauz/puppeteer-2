const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, putText, getText } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

// Given("user is on {string} page", async function (string) {
//   return await this.page.goto(`https://netology.ru${string}`, {
//     setTimeout: 30000,
//   });
// });

// When("user search by {string}", async function (string) {
//   return await putText(this.page, "input", string);
// });

// Then("user sees the course suggested {string}", async function (string) {
//   const actual = await getText(this.page, "a[data-name]");
//   const expected = await string;
//   expect(actual).contains(expected);
// });

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`${string}`, {
    setTimeout: 20000,
  });
});

When("user choose day {string}", async function (string) {
  await clickElement(this.page, `${string}`);
});
When("user choose time {string}", async function (string) {
  await clickElement(this.page, `${string}`);
});
When("user choose chair {string}", async function (string) {
  await clickElement(this.page, `${string}`, { setTimeout: 20000 });
});
When("user click booking {string}", async function (string) {
  await clickElement(this.page, `${string}`, { setTimeout: 20000 });
});
When("user click for qr! {string}", async function (string) {
  await clickElement(this.page, `${string}`, { setTimeout: 20000 });
});

When("user sees the qr text first time {string}", async function (string) {
  const actual = await getText(this.page, "p.ticket__hint");
  const expected = await string;
  expect(actual).contains(expected);
});

When("user go on {string} page", async function (string) {
  return await this.page.goto(`${string}`, {
    setTimeout: 20000,
  });
});

Then("user sees the qr text {string}", async function (string) {
  const actual = await getText(this.page, "p.ticket__hint");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("booking button disabled {string}", async function (string) {
  const actual = String(
    await this.page.$eval("button", (button) => {
      return button.disabled;
    })
  );
  const expected = await string;
  expect(actual).contains(expected);
});
