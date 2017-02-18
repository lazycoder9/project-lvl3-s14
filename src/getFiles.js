import fs from 'mz/fs';
import path from 'path';
import chalk from 'chalk';
import Multispinner from 'multispinner';
import ora from 'ora';
import figures from 'figures';
import axios from './lib/axios';
import getUrls from './getUrls';
import generateName from './nameGenerators';

const successMark = chalk.green(String.fromCharCode(0x2713));
const failMark = chalk.red(String.fromCharCode(0x2718));

const opts = {
  interval: 150,
  preText: 'Completing',
  frames: [
    '|',
    '/',
    '-',
    '\\',
  ],
  symbol: {
    success: figures.check,
    error: figures.cross,
  },
  color: {
    incomplete: 'yellow',
    succes: 'green',
    error: 'red',
  },
};

const errors = [];

const downloadFile = async (link, pathToFile) => {
  try {
    const res = await axios.get(link, {
      responseType: 'arraybuffer',
    });
    await fs.writeFile(pathToFile, res.data, 'binary');
    console.log(`${successMark} ${link}`);
  } catch (error) {
    console.log(`${failMark} ${link}`);
    errors.push(`\nIt seems there was error.
${chalk.red(`Error: ${error.message}`)}
${chalk.red(`URL: ${link}`)}\n`);
  }
};

export default async (data, link, pathToDir = './') => {
  try {
    const urls = getUrls(data, link);
    // const spinners = new Multispinner(urls, opts);
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
    return { data, errors };
  } catch (error) {
    return Promise.reject(error);
  }
};
