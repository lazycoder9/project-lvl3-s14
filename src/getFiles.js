import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import axios from './lib/axios';
import getUrls from './getUrls';
import parseLink from './linkParsers/index';

const successMark = chalk.green(String.fromCharCode(0x2713));
const failMark = chalk.red(String.fromCharCode(0x2718));

const downloadFile = (link, pathToFile) => {
  return axios.get(link, {
    responseType: 'arraybuffer',
  }).then((res) => {
    fs.writeFileSync(pathToFile, res.data, 'binary');
    console.log(`${successMark} ${link}`);
  }).catch(() => console.log(`${failMark} ${link}`));
};

export default (data, link, pathToDir = './') => {
  const urls = getUrls(data);
  const dir = path.resolve(pathToDir, parseLink(link, 'folder'));
  if (!fs.existsSync(pathToDir)) {
    fs.mkdirSync(pathToDir);
  }
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return Promise.all(urls.map((url) => {
    const pathToFile = path.resolve(dir, parseLink(url, 'file'));
    return downloadFile(url, pathToFile);
  })).then(() => data);
};
