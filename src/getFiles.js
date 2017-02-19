import fs from 'mz/fs';
import path from 'path';
import chalk from 'chalk';
import Multispinner from 'multispinner';
import figures from 'figures';
import axios from './lib/axios';
import getUrls from './getUrls';
import generateName from './nameGenerators';

const opts = {
  symbol: {
    success: figures.tick,
    error: figures.cross,
  },
  color: {
    incomplete: 'yellow',
    succes: 'green',
    error: 'red',
  },
};

const downloadFile = async (link, spinnerID, pathToFile, spinners) => {
  try {
    const res = await axios.get(link, {
      responseType: 'arraybuffer',
    });
    await fs.writeFile(pathToFile, res.data, 'binary');
    spinners.success(spinnerID);
  } catch (error) {
    spinners.error(spinnerID);
    return `\nIt seems there was error.
${chalk.red(`Error: ${error.message}`)}
${chalk.red(`URL: ${link}`)}\n`;
  }
};

export default async (data, link, pathToDir = './') => {
  try {
    const urls = getUrls(data, link);
    const spinners = new Multispinner(urls, opts);
    const dir = path.resolve(pathToDir, generateName(link, 'folder'));
    const isPathExists = await fs.exists(pathToDir);
    const isDirExists = await fs.exists(dir);
    if (!isPathExists) {
      await fs.mkdir(pathToDir);
    }
    if (!isDirExists) {
      await fs.mkdir(dir);
    }
    const errors = await Promise.all(urls.map((url) => {
      const pathToFile = path.resolve(dir, generateName(url, 'file'));
      return downloadFile(url, url, pathToFile, spinners);
    }));
    return { data, errors };
  } catch (error) {
    return Promise.reject(error);
  }
};
