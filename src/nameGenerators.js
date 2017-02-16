const linkToArray = link => link.split(/[^A-Z, a-z, 0-9]/g).filter(e => e).slice(1);

const fileNameGenerator = (arrLink) => {
  const extension = arrLink[arrLink.length - 1];
  const withoutExt = arrLink.slice(-1);
  return `${withoutExt.join('-')}${extension}`;
};

const folderNameGenerator = arrLink => `${arrLink.join('-')}_files`;

const htmlNameGenerator = arrLink => `${arrLink.join('-')}.html`;

const types = {
  file: fileNameGenerator,
  folder: folderNameGenerator,
  html: htmlNameGenerator,
};

export default (link, type) => {
  const arrLink = linkToArray(link);
  return types[type](arrLink);
};
