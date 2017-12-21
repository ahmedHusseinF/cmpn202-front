import { AgentWebPage } from './app.po';

describe('agent-web App', () => {
  let page: AgentWebPage;

  beforeEach(() => {
    page = new AgentWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
