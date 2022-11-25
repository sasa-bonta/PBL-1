import cheerio from 'cheerio';

let $ = null;

function getCharacteristicByText(text) {
  return $(`span:contains("${text}")`)
    .parent()
    .find('.adPage__content__features__value')
    .text()
    .trim();
}

export default (html) => {
  $ = cheerio.load(html);

  const price = $('ul.adPage__content__price-feature__prices')
    .first()
    .find('span.adPage__content__price-feature__prices__price__value')
    .first()
    .text()
    .trim()
    .replace(/\s/g, '');

  const surface = getCharacteristicByText('Общая площадь').replace(/\D/g, '');

  return {
    price: price,
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
    kitchenSurface: getCharacteristicByText('Площадь кухни'),
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
  };
};
