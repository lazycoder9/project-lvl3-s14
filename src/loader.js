import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import os from 'os';
import axios from './lib/axios';
import generateName from './nameGenerators';
import downloadFiles from './getFiles';
import replaceUrls from './replaceUrls';

const moveFiles = (src, dest) => {
  const files = fs.readdirSync(src);
  files.forEach((e) => {
    const fileSrc = path.resolve(src, e);
    const fileDest = path.resolve(dest, e);
    if (fs.lstatSync(fileSrc).isDirectory()) {
      moveFiles(fileSrc, fileDest);
    } else {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
      }
      const source = fs.createReadStream(fileSrc);
      const desti = fs.createWriteStream(fileDest);

      source.pipe(desti);
      source.on('end', () => {
        fs.unlink(fileSrc, (err) => {
          if (err) throw err;
        });
      });
    }
  });
};

export default (urlLink, pathToSave = './') => {
  const fileName = generateName(urlLink, 'html');
  const tempDir = fs.mkdtempSync(`${os.tmpdir()}/`);
  const filePath = path.resolve(tempDir, fileName);
  return axios.get(urlLink)
    .then(res => downloadFiles(res.data, urlLink, tempDir))
    .then((data) => {
      const newData = replaceUrls(data, urlLink);
      fs.writeFileSync(filePath, newData);
      return `\nPage was downloaded as ${chalk.green(fileName)}`;
    })
    .then((msg) => {
      moveFiles(tempDir, pathToSave);
      return msg;
    });
};
