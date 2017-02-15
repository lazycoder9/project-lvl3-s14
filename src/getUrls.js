import cheerio from 'cheerio';

const getLinkUrl = link => link.attr('href');
const getScriptUrl = script => script.attr('src');
const getImgUrl = img => img.attr('src');

const urlTypes = {
  link: getLinkUrl,
  script: getScriptUrl,
  img: getImgUrl,
};

const getUrl = type => urlTypes[type];

export default (data) => {
  const $ = cheerio.load(data);
  const urls = ['link', 'script', 'img'].reduce((acc, item) => {
    const links = $(item).map(function () {
      const current = getUrl(item)($(this));
      if (current) {
        if (current.includes('http')) {
          return current;
        }
        return `${link}${current}`;
      }
    }).get();

    const newAcc = [...acc, ...links];
    return newAcc;
  }, []);

  return urls;
}
