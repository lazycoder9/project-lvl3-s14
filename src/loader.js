import fs from 'mz/fs';
import path from 'path';
import chalk from 'chalk';
import ncp from 'ncp';
import os from 'os';
import axios from './lib/axios';
import generateName from './nameGenerators';
import downloadFiles from './getFiles';
import replaceUrls from './replaceUrls';

const moveFiles = async (src, dest) =>
  new Promise((resolve, reject) => {
    ncp(src, dest, err => (err ? reject(err) : resolve()));
  });

export default async (urlLink, pathToSave = './') => {
  const tempDir = fs.mkdtempSync(`${os.tmpdir()}/`);
  const fileName = generateName(urlLink, 'html');
  const filePath = path.resolve(tempDir, fileName);
  const response = await axios.get(urlLink);
  const data = await downloadFiles(response.data, urlLink, tempDir);
  const newData = replaceUrls(data, urlLink);
  await fs.writeFile(filePath, newData);
  await moveFiles(tempDir, pathToSave);
  return `\nPage was downloaded as ${chalk.green(fileName)}`;
};
