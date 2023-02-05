import cheerio from 'cheerio';

export default (html) => {
  const $ = cheerio.load(html);
  const result = [];
  $('li.ads-list-photo-item')
    .not('.js-booster-inline')
    .each(function () {
      if (!$(this).find('span.booster-label').length) {
        result.push('https://999.md' + $(this).find('a').attr('href'));
      }
    });
  return result;
};
