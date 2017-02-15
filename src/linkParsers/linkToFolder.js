const linkToArr = link => link.split(/[^A-Z, a-z, 0-9]/g).filter(e => e).slice(1).join('-');

export default link => `${linkToArr(link)}_files`;
