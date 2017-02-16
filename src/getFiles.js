import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import axios from './lib/axios';
import getUrls from './getUrls';
import generateName from './nameGenerators';

const successMark = chalk.green(String.fromCharCode(0x2713));
const failMark = chalk.red(String.fromCharCode(0x2718));

const downloadFile = (link, pathToFile) => axios.get(link, {
  responseType: 'arraybuffer',
}).then((res) => {
  fs.writeFileSync(pathToFile, res.data, 'binary');
  console.log(`${successMark} ${link}`);
}).catch(() => console.log(`${failMark} ${link}`));

export default (data, link, pathToDir = './') => {
  const urls = getUrls(data, link);
  const dir = path.resolve(pathToDir, generateName(link, 'folder'));
  if (!fs.existsSync(pathToDir)) {
    fs.mkdirSync(pathToDir);
  }
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return Promise.all(urls.map((url) => {
    const pathToFile = path.resolve(dir, generateName(url, 'file'));
    return downloadFile(url, pathToFile);
  })).then(() => data);
};
