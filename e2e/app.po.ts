import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(url) {
    return browser.get(url);
  }

  getParagraphText() {
    return element(by.className('app-title')).getText();
  }
  login() {
    var loginEmail = element(by.css('input[name=email]'));
    var loginPassword = element(by.css('input[name=password]'));
    var loginForm = element(by.css('.login-form'));
    loginEmail.clear();
    loginPassword.clear();
    loginEmail.sendKeys('test@test.com');
    loginPassword.sendKeys('123456');
    loginForm.submit();
    return browser.getCurrentUrl();
  }

  checkOrdersTab() {
    return element(by.css('li>.active'));
  }

  addOrder() {
    var customer = element(by.css("select[name=customer]>[value='0: 1"));
    var productName = element(by.css('input[name=productName]'));
    var itemCost = element(by.css('input[name=itemCost]'));
    var submitBtn = element(by.css('#add-order'));
    customer.click();
    productName.sendKeys('Test item');
    itemCost.sendKeys('123');
    submitBtn.click();
    return {
      productName: element(by.css('table>tbody>tr:nth-last-child(2)>td:nth-last-child(2)')).getText(),
      itemCost: element(by.css('table>tbody>tr:nth-last-child(2)>td:nth-last-child(1)')).getText()
    };
  }
}
