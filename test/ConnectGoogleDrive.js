const config=require('../config');

const  puppeteer = require('puppeteer');

(async ()=>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(config.testenv_itl);                                             //域名
    await page.waitForSelector('#textInput');
    await page.type('#textInput',config.rc_username);                                //RC账号
    await page.type('#password',config.rc_password);                                 //RC密码
    await page.click('button[class="btn btn-primary"]');

    await page.waitForSelector('button[aria-label="Google Drive Connect"]');
    await page.click('button[aria-label="Google Drive Connect"]');

    await page.waitFor(3000);
    const newPage = (await browser.pages())[2];
    await newPage.waitForSelector('input[type="email"]');
    await newPage.type('input[type="email"]',config.googledrive_username);            //云盘账号
    await newPage.click('span[class="RveJvd snByac"]');

    await newPage.waitFor(5000);
    await newPage.type('input[type="password"]',config.googledrive_password);         //云盘密码
    await newPage.click('span[class="RveJvd snByac"]');

    await newPage.waitFor(5000);
    await newPage.click('span[class="RveJvd snByac"]');

    await newPage.waitFor(3000);
    await page.screenshot({path:'resultScreenShot/GoogleDriveConnected.png'});


}
)();
