import file from './linkToFile';
import folder from './linkToFolder';
import html from './linkToHtml';

const types = { file, folder, html };

export default (link, type) => types[type](link);
