import fs from 'fs';
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
    <link rel="shortcut icon" type="image/x-icon" href="/lazycoder-com-test_files/cdn2-hexlet-io-assets-icons-default-favicon-8fa102c058afb01de5016a155d7db433283dc7e08ddc3c4d1aef527c1b8502b6.ico">
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
  });

  test('Test lazycoder.com', (done) => {
    loader('http://lazycoder.com/test')
      .then((msg) => {
        const files = fs.readdirSync('./');
        const fileData = fs.readFileSync('/lazycoder-com-test.html', 'utf-8');
        expect(files.includes('lazycoder-com-test.html')).toBe(true);
        expect(msg).toBe(`\nPage was downloaded as ${chalk.green('lazycoder-com-test.html')}`);
        expect(fileData).toBe(expectedData);
        done();
      })
      .catch(e => done.fail(e));
  });

  afterAll(() => {
    nock.cleanAll();
  });
});
