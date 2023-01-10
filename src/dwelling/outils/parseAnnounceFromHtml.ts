import cheerio from 'cheerio';

let $ = null;

function getCharacteristicByText(text) {
  return $(`span:contains("${text}")`)
    .parent()
    .find('.adPage__content__features__value')
    .text()
    .trim();
}

export default (html, url) => {
  $ = cheerio.load(html);

  const $price = $('ul.adPage__content__price-feature__prices').first();

  const priceOrig = $price
    .find('span.adPage__content__price-feature__prices__price__value')
    .first()
    .text()
    .trim()
    .replace(/\s/g, '');

  const currency = $price
    .find('span.adPage__content__price-feature__prices__price__currency')
    .first()
    .text()
    .trim()
    .replace(/\s/g, '');

  let price = priceOrig;

  if (currency === '$') {
    price = priceOrig * 0.93;
  }

  if (currency === 'лей') {
    price = priceOrig * 0.049;
  }

  const surface = getCharacteristicByText('Общая площадь').replace(/\D/g, '');

  return {
    price: price,
    initialPriceCurrency: priceOrig + ' ' + currency,
    pricePerM2: (price / surface).toFixed(2),
    nbRooms: getCharacteristicByText('Количество комнат').replace(/\D/g, ''),
    level: getCharacteristicByText('Этаж'),
    nbLevels: getCharacteristicByText('Количество этажей'),
    buildingType: getCharacteristicByText('Тип здания'),
    totalSurface: surface,
    livingSurface: getCharacteristicByText('Жилая площадь'),
    dwellingsState: getCharacteristicByText('Состояние квартиры'),
    nbBalconies: getCharacteristicByText('Балкон / лоджия'),
    nbBathrooms: getCharacteristicByText('Санузел'),
    parking: getCharacteristicByText('Парковочное место'),
    announceAuthor: getCharacteristicByText('Автор объявления'),
    housingStock: getCharacteristicByText('Жилой фонд'),
    planning: getCharacteristicByText('Планировка'),
    kitchenSurface: getCharacteristicByText('Площадь кухни').replace(/\D/g, ''),
    ceilingHeight: getCharacteristicByText('Высота потолков').replace(
      /\D/g,
      '',
    ),
    region: $('.adPage__content__region dd')
      .eq(3)
      .text()
      .replace(/,/g, '')
      .trim(),
    authorsNick: $('.adPage__aside__stats__owner__login').text().trim(),
    url: url,
  };
};
