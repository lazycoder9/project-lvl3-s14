import cheerio from 'cheerio';
import _ from 'lodash';

const getLinkUrl = link => link.attr('href');
const getScriptUrl = script => script.attr('src');
const getImgUrl = img => img.attr('src');

const getUrlTypes = {
  link: getLinkUrl,
  script: getScriptUrl,
  img: getImgUrl,
};

export const getUrl = type => getUrlTypes[type];

export default (data, link) => {
  const $ = cheerio.load(data);
  const urls = _.flatMap(['link', 'script', 'img'], (item) => {
    return $(item).map(function () {
      const current = getUrl(item)($(this));
      if (current) {
        if (current.includes('http')) {
          return current;
        }
        return `${link}${current}`;
      }
    }).get();
  });
  return urls;
};
