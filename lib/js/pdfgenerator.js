'use strict';

const createPdf = async() => {
    module.paths.push(process.argv[4]);
    const puppeteer = require('puppeteer');
    let browser;
    try {
        browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.emulateMediaType('screen')
        await page.goto(process.argv[2], {timeout: 30000, waitUntil: 'networkidle2'});
        await page.waitFor(250);
        await page.pdf({
            path: process.argv[3],
            format: 'A4',
            margin: { top: 35, right: 35, bottom: 35, left: 35 },
            // printBackground: true
        });
    } catch (err) {
        console.log(err.message);
    } finally {
        if (browser) {
            browser.close();
        }
        process.exit();
    }
};
createPdf();
