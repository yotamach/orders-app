import {
  AppPage
} from './app.po';

describe('angular-jumpstart App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo('http://localhost:8080/customers');
    expect(page.getParagraphText()).toEqual('Customer Manager');
  });

  it('should login', () => {
    page.navigateTo('http://localhost:8080/orders/create');
    let currentPage = page.login();
    expect(currentPage).toEqual('http://localhost:8080/orders/create');
  });

  it('should add order', () => {
    page.navigateTo('http://localhost:8080/orders/create');
    page.login();
    const {productName,itemCost} = page.addOrder();
    expect(productName).toEqual('Test item');
    expect(itemCost).toEqual('123');
  });
});
