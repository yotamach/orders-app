const puppeteer = require('puppeteer')
let browser
let page

let login = async () => {
  await page.type('input[name=email]', 'Testuser@gmail.ocm');
  await page.type('input[name=password]', 'test123456');
  await page.click('button[type=submit]');
  await page.screenshot({
    path: "./test-login.jpg",
    type: "jpeg",
    fullPage: true
  });
}
describe('OrderCreateComponent', () => {
  it('should add oreder"', async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.setViewport({
      width: 1280,
      height: 800
    })
    await page.goto('http://localhost:8080/orders/create', {
      waitUntil: 'networkidle0'
    })
    await login();
    await page.screenshot({
      path: "./test-orders.jpg",
      type: "jpeg",
      fullPage: true
    });
    await page.select('select', "2");
    await page.type('input[name=productName]', 'Test product');
    await page.type('input[name=itemCost]', "150");
    await page.click('button[type=submit]');
    const productName = await page.$("table > tbody > tr:last-child > td");
    const itemCost = await page.$("table > tbody > tr > td");
    console.log(productName);
    await browser.close();
    await expect(page.title()).resolves.toMatch('Google');
  });
});
