import fs from 'mz/fs';
import nock from 'nock';
import chalk from 'chalk';
import loader from '../src';

const data = `<!DOCTYPE html>
<html>
  <head>
    <title>Test Page</title>
    <link rel="shortcut icon" type="image/x-icon" href="https://cdn2.hexlet.io/assets/icons/default/favicon-8fa102c058afb01de5016a155d7db433283dc7e08ddc3c4d1aef527c1b8502b6.ico" />
  </head>
  <body>
    <h1>Test heade</h1>
    <p>Test data</p>
  </body>
</html>`;

const expectedData = `<!DOCTYPE html>
<html>
  <head>
    <title>Test Page</title>
    <link rel="shortcut icon" type="image/x-icon" href="lazycoder-com-test_files/cdn2-hexlet-io-assets-icons-default-favicon-8fa102c058afb01de5016a155d7db433283dc7e08ddc3c4d1aef527c1b8502b6.ico">
  </head>
  <body>
    <h1>Test heade</h1>
    <p>Test data</p>
  </body>
</html>`;

describe('Loader test', () => {
  beforeEach(() => {
    nock('http://lazycoder.com')
      .get('/test')
      .reply(200, data);

    nock('http://lazycoder.com')
      .get('/notExist')
      .reply(404, 'Not Exist');
  });

  test('Test lazycoder.com', async () => {
    const msg = await loader('http://lazycoder.com/test', './');
    expect(msg).toBe(`\nPage was downloaded as ${chalk.green('lazycoder-com-test.html')}`);
    const files = await fs.readdir('./');
    expect(files.includes('lazycoder-com-test.html')).toBeTruthy();
    const html = await fs.readFile('./lazycoder-com-test.html', 'utf-8');
    expect(html).toBe(expectedData);
  });

  test('Test not exist page', async () => {
    try {
      await loader('http://lazycoder.com/notExist', './');
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });
});
