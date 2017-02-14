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

const tempPath = './temp/';

nock('http://lazycoder.com')
  .get('/test')
  .reply(200, data);

test('Loader test', (done) => {
  loader('http://lazycoder.com/test', tempPath)
    .then((filePath) => {
      const files = fs.readdirSync(tempPath);
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const fileName = path.basename(filePath);
      expect(fileName).toBe('lazycoder-com-test.html');
      expect(files.includes(fileName)).toBe(true);
      expect(fileData).toBe(data);
      done();
    })
    .catch(done);
});
