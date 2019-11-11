/**
 * Dependency Modules
 */
var assert = require("assert").strict;
var webdriver = require("selenium-webdriver");
require("geckodriver");
const serverUri = "https://www.google.com/";
const appTitle = "Google";

function buildCapabilities() {
  switch ("chrome") {
    case "ie": {
      process.env.PATH = `${process.env.PATH};${__dirname}/Selenium.WebDriver.IEDriver.3.150.0/driver/;`;
      const capabilities = webdriver.Capabilities.ie();
      capabilities.set("ignoreProtectedModeSettings", true);
      capabilities.set("ignoreZoomSetting", true);
      return capabilities;
    }
    case "safari": {
      return webdriver.Capabilities.safari();
    }
    default: {
      return;
    }
  }
}

async function logTitle(browser) {
  await browser.get(serverUri);
  const title = await browser.getTitle();
  console.log(title)
  return title;
}


describe("Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe("Home Page", function() {
  let browser;
  it("Get title", async function() {
    const title = await logTitle(browser);
    assert.strictEqual(title, appTitle);
    browser.quit();
  });


  before(async () => {
    const capabilities = await buildCapabilities();
    browser = await new webdriver.Builder()
      .usingServer()
      .withCapabilities(capabilities)
      .build();
  })
});
