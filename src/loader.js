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
  if (!(await fs.exists(pathToSave))) {
    return Promise.reject(chalk.red(`\nThere is no such directory '${pathToSave}'. Please, create it before downloading page.\n`));
  }
  try {
    const tempDir = fs.mkdtempSync(`${os.tmpdir()}/`);
    const fileName = generateName(urlLink, 'html');
    const filePath = path.resolve(tempDir, fileName);
    const successMsg = `\nPage was downloaded as ${chalk.green(fileName)}`;
    const response = await axios.get(urlLink);
    const { data, errors } = await downloadFiles(response.data, urlLink, tempDir);
    const newData = replaceUrls(data, urlLink);
    await fs.writeFile(filePath, newData);
    await moveFiles(tempDir, pathToSave);
    console.log(errors.join(''));
    return successMsg;
  } catch (error) {
    if (error.response) {
      return Promise.reject(`\nIt seems there was error.
${chalk.red(`Error: ${error.message}`)}
${chalk.red(`URL: ${urlLink}`)}\n`);
    }
    return Promise.reject(error);
  }
};
