import cheerio from 'cheerio';

export default (html) => {
  const $ = cheerio.load(html);
  return $('ul.adPage__content__price-feature__prices')
    .first()
    .find('span.adPage__content__price-feature__prices__price__value')
    .first()
    .text()
    .trim()
    .replace(/\s/g, '');
};
