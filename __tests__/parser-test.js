import parseLink from '../src/linkParsers/index';

const link = 'http://ru.hexlet.io/courses';
const linkToFile = 'https://cdn2.hexlet.io/assets/icons/default/favicon.ico'

test('Link to html', () => {
  const expected = 'ru-hexlet-io-courses.html';
  const actual = parseLink(link, 'html');
  expect(actual).toBe(expected);
});

test('Link to folder', () => {
  const expected = 'ru-hexlet-io-courses_files';
  const actual = parseLink(link, 'folder');
  expect(actual).toBe(expected);
});

test('Link to file', () => {
  const expected = 'cdn2-hexlet-io-assets-icons-default-favicon.ico';
  const actual = parseLink(linkToFile, 'file');
  expect(actual).toBe(expected);
});
