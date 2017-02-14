import path from 'path';
import fs from 'fs';
import nock from 'nock';
import loader from '../src/loader';

const data = `<!DOCTYPE html>
<html>
  <head>
    <title>Test Page</title>
  </head>
  <body>
    <h1>Test heade</h1>
    <p>Test data</p>
  </body>
</html>`;

nock('http://lazycoder.com')
  .get('/test')
  .reply(200, data);

test('Loader test', (done) => {
  loader('http://lazycoder.com/test')
    .then((fileName) => {
      const files = fs.readdirSync('./');
      const fileData = fs.readFileSync(fileName, 'utf-8');
      expect(fileName).toBe('lazycoder-com-test.html');
      expect(files.includes(fileName)).toBe(true);
      expect(fileData).toBe(data);
      done();
    })
    .catch(done);
});
