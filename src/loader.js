import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import axios from './lib/axios';
import parseLink from './linkParsers/index';
import downloadFiles from './getFiles';
import replaceLinks from './replaceLinks';

export default (urlLink, pathToSave = './') => {
  const fileName = parseLink(urlLink, 'html');
  const filePath = path.resolve(pathToSave, fileName);
  return axios.get(urlLink)
    .then(res => downloadFiles(res.data, urlLink, pathToSave))
    .then((data) => {
      const newData = replaceLinks(data, urlLink);
      fs.writeFileSync(filePath, newData);
      return `\nPage was downloaded as ${chalk.green(fileName)}`;
    });
};
