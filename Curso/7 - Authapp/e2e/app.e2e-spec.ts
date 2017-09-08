import { AuthappPage } from './app.po';

describe('authapp App', () => {
  let page: AuthappPage;

  beforeEach(() => {
    page = new AuthappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
