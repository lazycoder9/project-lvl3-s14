import cheerio from 'cheerio';
import parseLink from './linkParsers/index';

export default (data, link) => {
  const $ = cheerio.load(data);
  $('link').each(function () {
    const dir = parseLink(link, 'folder');
    const file = parseLink($(this).attr('href'), 'file');
    $(this).attr('href', `/${dir}/${file}`);
  });
  return $.html();
};
