import { TuduAppPage } from './app.po';

describe('tudu-app App', () => {
  let page: TuduAppPage;

  beforeEach(() => {
    page = new TuduAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
