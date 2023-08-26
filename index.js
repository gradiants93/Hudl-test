import {Builder, By, until} from "selenium-webdriver";
import {suite} from "selenium-webdriver/testing";
import config from "./config";

suite(function (){
    describe('Login verification', function () {
        let driver;

        beforeEach(async () => {
            driver = await new Builder().forBrowser('chrome').build();
            await driver.manage().deleteAllCookies();
        });

        afterEach(async () => {
            await driver.manage().deleteAllCookies();
            await driver.quit();
        });

        it('should load home page', async () => {
            await driver.get('https://hudl.com/');

            let title = await driver.getTitle();
            console.assert("Hudl • Tools to help every team, coach and athlete improve" === title);

            await driver.manage().setTimeouts({implicit: 500});
        });
        it('should successfully login with correct credentials', async () => {
            await driver.get('https://hudl.com/');

            let loginButton = await driver.findElement(By.xpath("//a[@data-qa-id='login-select']"));
            await loginButton.click();
            let subNav = await driver.findElement(By.xpath("//a[@data-qa-id='login-hudl']"));
            await subNav.click();

            driver.findElement(By.xpath("//input[@id='email']")).sendKeys(config.username);
            driver.findElement(By.xpath("//input[@id='password']")).sendKeys(config.password);
            await driver.findElement(By.xpath("//button[@id='logIn']")).click();

            await driver.wait(until.urlIs("https://www.hudl.com/home"), 500);

            let expectedUrl = 'https://www.hudl.com/home';
            let title = await driver.getTitle();
            let currentUrl = await driver.getCurrentUrl();

            console.assert(expectedUrl === currentUrl);
            console.assert("Home - Hudl" === title);
        });
        it('should successfully fail with incorrect credentials', async () => {
            await driver.get('https://hudl.com/');

            let loginButton = await driver.findElement(By.xpath("//a[@data-qa-id='login-select']"));
            await loginButton.click();
            let subNav = await driver.findElement(By.xpath("//a[@data-qa-id='login-hudl']"));
            await subNav.click();

            driver.findElement(By.xpath("//input[@id='email']")).sendKeys(config.username);
            driver.findElement(By.xpath("//input[@id='password']")).sendKeys(config.password.slice(-1));
            await driver.findElement(By.xpath("//button[@id='logIn']")).click();

            let errorBox = await driver.findElement(By.id("login-box")).findElement(By.xpath("//p[@data-qa-id='undefined-text']"));
            await driver.wait(until.elementTextMatches(errorBox, /./), 5000)
            let errorText = await errorBox.getText();

            let expectedUrl = await driver.getCurrentUrl();
            let currentUrl = await driver.getCurrentUrl();

            console.assert(errorText === "We don't recognize that email and/or password");
            console.assert(expectedUrl === currentUrl);
        });
        it('should successfully fail with empty fields', async () => {
            await driver.get('https://hudl.com/');

            let loginButton = await driver.findElement(By.xpath("//a[@data-qa-id='login-select']"));
            await loginButton.click();
            let subNav = await driver.findElement(By.xpath("//a[@data-qa-id='login-hudl']"));
            await subNav.click();

            driver.findElement(By.xpath("//input[@id='email']")).sendKeys("");
            driver.findElement(By.xpath("//input[@id='password']")).sendKeys("");
            await driver.findElement(By.xpath("//button[@id='logIn']")).click();

            let errorBox = await driver.findElement(By.id("login-box")).findElement(By.xpath("//p[@data-qa-id='undefined-text']"));
            await driver.wait(until.elementTextMatches(errorBox, /./), 5000)
            let errorText = await errorBox.getText();

            let expectedUrl = await driver.getCurrentUrl();
            let currentUrl = await driver.getCurrentUrl();

            console.assert(errorText === "Please fill in all of the required fields");
            console.assert(expectedUrl === currentUrl);
        });
        it('should successfully fail with incorrect credentials and NOT CRASH', async () => {
            await driver.get('https://hudl.com/');

            let loginButton = await driver.findElement(By.xpath("//a[@data-qa-id='login-select']"));
            await loginButton.click();
            let subNav = await driver.findElement(By.xpath("//a[@data-qa-id='login-hudl']"));
            await subNav.click();

            driver.findElement(By.xpath("//input[@id='email']")).sendKeys(config.username);
            driver.findElement(By.xpath("//input[@id='password']")).sendKeys("x".padEnd(420, "lol"));
            await driver.findElement(By.xpath("//button[@id='logIn']")).click();

            let errorBox = await driver.findElement(By.id("login-box")).findElement(By.xpath("//p[@data-qa-id='undefined-text']"));
            await driver.wait(until.elementTextMatches(errorBox, /./), 5000)
            let errorText = await errorBox.getText();

            let expectedUrl = await driver.getCurrentUrl();
            let currentUrl = await driver.getCurrentUrl();

            console.assert(errorText === "We don't recognize that email and/or password");
            console.assert(expectedUrl === currentUrl);
        });
        it('should successfully fail with added whitespace to password', async () => {
            await driver.get('https://hudl.com/');

            let loginButton = await driver.findElement(By.xpath("//a[@data-qa-id='login-select']"));
            await loginButton.click();
            let subNav = await driver.findElement(By.xpath("//a[@data-qa-id='login-hudl']"));
            await subNav.click();

            driver.findElement(By.xpath("//input[@id='email']")).sendKeys(config.username);
            driver.findElement(By.xpath("//input[@id='password']")).sendKeys(config.password + " ");
            await driver.findElement(By.xpath("//button[@id='logIn']")).click();

            let errorBox = await driver.findElement(By.id("login-box")).findElement(By.xpath("//p[@data-qa-id='undefined-text']"));
            await driver.wait(until.elementTextMatches(errorBox, /./), 5000)
            let errorText = await errorBox.getText();

            let expectedUrl = await driver.getCurrentUrl();
            let currentUrl = await driver.getCurrentUrl();

            console.assert(errorText === "We don't recognize that email and/or password");
            console.assert(expectedUrl === currentUrl);
        });
    });
})
