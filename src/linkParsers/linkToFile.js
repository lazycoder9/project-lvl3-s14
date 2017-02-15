import path from 'path';

const linkToArr = link => link.split(/[^A-Z, a-z, 0-9]/g).filter(e => e).slice(1, -1).join('-');

export default (link) => {
  const extension = path.extname(link);
  return `${linkToArr(link)}${extension}`;
};
