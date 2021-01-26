'use strict';

(async () => {
    module.paths.push(process.argv[4]);
    const puppeteer = require('puppeteer');
    let browser;
    try {
        browser = await puppeteer.launch({
          ignoreHTTPSErrors: true,
          args: [
            '--allow-running-insecure-content',
            '--autoplay-policy=user-gesture-required',
            '--disable-background-networking',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-breakpad',
            '--disable-client-side-phishing-detection',
            '--disable-component-update',
            '--disable-default-apps',
            '--disable-dev-shm-usage',
            '--disable-domain-reliability',
            '--disable-extensions',
            '--disable-features=AudioServiceOutOfProcess',
            '--disable-hang-monitor',
            '--disable-ipc-flooding-protection',
            '--disable-notifications',
            '--disable-offer-store-unmasked-wallet-cards',
            '--disable-popup-blocking',
            '--disable-print-preview',
            '--disable-prompt-on-repost',
            '--disable-renderer-backgrounding',
            '--disable-setuid-sandbox',
            '--disable-speech-api',
            '--disable-sync',
            '--disable-web-security',
            '--disk-cache-size=33554432',
            '--hide-scrollbars',
            '--ignore-gpu-blacklist',
            '--ignore-resource-errors',
            '--metrics-recording-only',
            '--mute-audio',
            '--no-default-browser-check',
            '--no-first-run',
            '--no-pings',
            '--no-sandbox',
            '--no-zygote',
            '--password-store=basic',
//             '--single-process',
            '--use-gl=swiftshader',
            '--use-mock-keychain',
            ]});

        const page = await browser.newPage();
        const version = await page.browser().version();
        console.log(version);

        // screen use here absolutely required!
        await page.emulateMediaType('screen') // puppeteer 2 feature??
        await page.goto(process.argv[2], {timeout: 30000, waitUntil: 'networkidle2'});
//         await page.waitFor(250);
        await page.pdf({
          path: process.argv[3],
          format: 'A4',
          margin: { top: 35, right: 35, bottom: 35, left: 35 },
          // printBackground: true
        });
    } catch (err) {
        console.log(err.message);
        console.log(err);
    } finally {
        if (browser) {
            await browser.close();
        }
        process.exit();
    }
})();
// createPdf();