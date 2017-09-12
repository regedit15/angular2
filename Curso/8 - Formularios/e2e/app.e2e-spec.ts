import { FormulariosPage } from './app.po';

describe('formularios App', () => {
  let page: FormulariosPage;

  beforeEach(() => {
    page = new FormulariosPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
