import { MiscelaneosPage } from './app.po';

describe('miscelaneos App', () => {
  let page: MiscelaneosPage;

  beforeEach(() => {
    page = new MiscelaneosPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
