import { Injectable } from '@nestjs/common';
import axios from 'axios';
import parseAnnounceFromHtml from './outils/parseAnnounceFromHtml';
import parseLinksFromHtml from './outils/parseLinksFromHtml';
import datasetLinks from './results/datasetLinks';

@Injectable()
export class DwellingService {
  async getAnnounce(url) {
    const result = await axios.get(url, {
      responseEncoding: 'utf8',
      validateStatus: () => true,
    });
    if (result.status === 200) {
      return parseAnnounceFromHtml(result.data, url);
    } else {
      return {};
    }
  }

  async getAnnouncesLinks(nr) {
    let result = [];

    for (let i = 0; i < 4; i++) {
      const promises = [];

      for (let j = i * 59 + 1; j <= (i + 1) * 59; j++) {
        promises.push(
          axios.get(
            `https://999.md/ru/list/real-estate/apartments-and-rooms?applied=1&hide_duplicates=no&ef=32%2C33&eo=12900%2C13859%2C12912%2C12885&cadastral_number=no&o_33_1=776&show_all_checked_childrens=no&o_32_8_12900=13859&page=${j}`,
          ),
        );
      }

      const pages = (await Promise.all(promises)).map((e) => e.data);
      result = result.concat(parseLinksFromHtml(pages.join()));
    }

    return [...new Set(result)];
  }

  async getDataset(min, max) {
    let cursor = min;
    let result = [];

    while (cursor <= max) {
      const promises = [];

      for (
        let i = cursor;
        i <= Math.min(cursor + 50, max - 1, datasetLinks.length - 1);
        i++
      ) {
        console.log(
          `cursor: ${cursor}, i: ${i}, url: http://localhost:3000/dwelling/announce?url=${datasetLinks[i]}`,
        );
        promises.push(
          axios.get(
            `http://localhost:3000/dwelling/announce?url=${datasetLinks[i]}`,
          ),
        );
      }

      cursor += 50;
      const announces = (await Promise.all(promises)).map((e) => e.data);

      result = result.concat(announces);
    }

    return result;
  }

  filterDuplicates(announces) {
    return announces.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.price === value.price &&
            t.nbRooms === value.nbRooms &&
            t.level === value.level &&
            t.nbLevels === value.nbLevels &&
            t.buildingType === value.buildingType &&
            t.totalSurface === value.totalSurface &&
            t.livingSurface === value.livingSurface &&
            t.dwellingsState === value.dwellingsState &&
            t.nbBalconies === value.nbBalconies &&
            t.nbBathrooms === value.nbBathrooms &&
            t.parking === value.parking &&
            t.announceAuthor === value.announceAuthor &&
            t.housingStock === value.housingStock &&
            t.planning === value.planning &&
            t.kitchenSurface === value.kitchenSurface &&
            t.ceilingHeight === value.ceilingHeight &&
            t.region === value.region &&
            t.authorsNick === value.authorsNick,
        ),
    );
  }
}
