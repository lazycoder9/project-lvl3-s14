import fs from 'fs';
import path from 'path';
import axios from './lib/axios';

const generateFileName = (urlLink) => {
  const name = urlLink.split(/[^A-Z, a-z]/g).filter(e => e).slice(1).join('-');
  return `${name}.html`;
};

export default (urlLink, pathToSave = './') => {
  const fileName = generateFileName(urlLink);
  return axios.get(urlLink)
    .then((res) => {
      const filePath = path.resolve(pathToSave, fileName);
      fs.writeFileSync(filePath, res.data);
      return filePath;
    });
};
