const config =require( '../config.js');

const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(config.testenv_itl,{waitUntil: 'load', timeout: 0});                                             //域名

    await page.waitForSelector('#textInput');
    await page.type('#textInput',config.rc_username);                                //RC账号
    await page.type('#password',config.rc_password);                                 //RC密码
    await page.click('button[class="btn btn-primary"]');

    await page.waitForSelector('button[aria-label="Box Connect"]');
    await page.click('button[aria-label="Box Connect"]');
    await page.waitFor(3000);

    const newPage = (await browser.pages())[2];
    await newPage.waitForSelector('input[name="login"]');
    await newPage.type('input[name="login"]',config.box_username);                   //云盘账号
    await newPage.type('input[name="password"]',config.box_password);                //云盘密码
    await newPage.click('input[title="Authorize"]');

    await newPage.waitForSelector('span[class="inset_text submit"]');
    await newPage.click('span[class="inset_text submit"]');

    await newPage.waitFor(5000);
    await page.screenshot({path:'views/BoxConnected.png'});



})();
