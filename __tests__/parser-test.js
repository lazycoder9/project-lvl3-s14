import generateName from '../src/nameGenerators';

const link = 'http://ru.hexlet.io/courses';
const linkToFile = 'https://cdn2.hexlet.io/assets/icons/default/favicon.ico'

test('Link to html', () => {
  const expected = 'ru-hexlet-io-courses.html';
  const actual = generateName(link, 'html');
  expect(actual).toBe(expected);
});

test('Link to folder', () => {
  const expected = 'ru-hexlet-io-courses_files';
  const actual = generateName(link, 'folder');
  expect(actual).toBe(expected);
});

test('Link to file', () => {
  const expected = 'cdn2-hexlet-io-assets-icons-default-favicon.ico';
  const actual = generateName(linkToFile, 'file');
  expect(actual).toBe(expected);
});
