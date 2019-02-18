const config=require('../config.js');

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(config.testenv_itl,{waitUntil: 'load', timeout: 0});                                          //域名
    await page.waitForSelector('#textInput');
    await page.type('#textInput',config.rc_username);                             //RC账号
    await page.type('#password',config.rc_password);                              //RC密码
    await page.click('button[class="btn btn-primary"]');

    await page.waitForSelector('button[aria-label="Dropbox Connect"]');
    await page.click('button[aria-label="Dropbox Connect"]');

    await page.waitFor(3000);
    const newPage = (await browser.pages())[2];
    await newPage.waitFor(10*1000);
    await newPage.waitForSelector('input[type="email"]');

    await newPage.type('input[type="email"]',config.dropbox_username);             //云盘账号
    await newPage.type('input[type="password"]',config.dropbox_password);          //云盘密码
    await newPage.click('button[type="submit"]');
    await newPage.waitFor(5000);
    await page.screenshot({path:'resultScreenShot/DropboxConnected02.png'});


})();


