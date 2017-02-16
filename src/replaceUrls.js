import cheerio from 'cheerio';
import { getUrl } from './getUrls';
import generateName from './nameGenerators';

const replaceLinkUrl = (link, url) => link.attr('href', url);
const replaceScriptUrl = (script, url) => {
  if (script.attr('src')) {
    return script.attr('src', url);
  }
};
const replaceImgUrl = (img, url) => img.attr('src', url);

const replaceUrlTypes = {
  link: replaceLinkUrl,
  script: replaceScriptUrl,
  img: replaceImgUrl,
};

const replaceUrl = type => replaceUrlTypes[type];

export default (data, link) => {
  const $ = cheerio.load(data);
  ['link', 'script', 'img'].forEach((item) => {
    $(item).each(function () {
      const dir = generateName(link, 'folder');
      const file = generateName(getUrl(item)($(this)), 'file');
      replaceUrl(item)($(this), `${dir}/${file}`);
    });
  });
  return $.html();
};
