import fs from 'mz/fs';
import path from 'path';
import chalk from 'chalk';
import axios from './lib/axios';
import getUrls from './getUrls';
import generateName from './nameGenerators';

const successMark = chalk.green(String.fromCharCode(0x2713));
const failMark = chalk.red(String.fromCharCode(0x2718));

const downloadFile = async (link, pathToFile) => {
  try {
    const res = await axios.get(link, {
      responseType: 'arraybuffer',
    });
    await fs.writeFile(pathToFile, res.data, 'binary');
    console.log(`${successMark} ${link}`);
  } catch (error) {
    console.log(`${failMark} ${link}`);
    console.log(`\nOohhhhh... It seems there was error :(
" ${chalk.red(error.message)} "\n`);
  }
};

export default async (data, link, pathToDir = './') => {
  const urls = getUrls(data, link);
  const dir = path.resolve(pathToDir, generateName(link, 'folder'));
  const isPathExists = await fs.exists(pathToDir);
  const isDirExists = await fs.exists(dir);
  if (!isPathExists) {
    await fs.mkdir(pathToDir);
  }
  if (!isDirExists) {
    await fs.mkdir(dir);
  }
  await Promise.all(urls.map((url) => {
    const pathToFile = path.resolve(dir, generateName(url, 'file'));
    return downloadFile(url, pathToFile);
  }));
  return data;
};
