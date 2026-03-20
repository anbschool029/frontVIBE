import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    
    const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML?.substring(0, 100));
    console.log("Root HTML:", rootHtml);
    
    await browser.close();
  } catch (err) {
    console.error("Puppeteer Script Error:", err);
  }
})();
