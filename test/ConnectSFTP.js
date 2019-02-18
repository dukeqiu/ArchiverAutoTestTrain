const config=require('../config.js');

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(config.testenv_itl,{waitUntil: 'load', timeout: 0});                                            //域名
    await page.waitForSelector('#textInput');
    await page.type('#textInput',config.rc_username);                               //RC账号
    await page.type('#password',config.rc_password);                                //RC密码
    await page.click('button[class="btn btn-primary"]');

    await page.waitForSelector('button[aria-label="SFTP Connect"]');

    await page.click('button[aria-label="SFTP Connect"]');
    await page.waitForSelector('#host');
    await page.type('#host',config.sftp_host);                                      //host
    await page.type('#port',config.sftp_port);                                      //port
    await page.type('#username',config.sftp_username);                              //username
    await page.type('#password',config.sftp_password);                              //password
    await page.click('button[data-test-automation-id="buttonYes"]');
    await page.waitFor(3000);
    await page.screenshot({path:'resultScreenShot/SFTPConnected.png'})

    //await browser.close();


})();
