import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return (
      'http://localhost:3000/dwelling/' +
      '<br>' +
      '<br>' +
      'http://localhost:3000/dwelling/announce?url=https://999.md/ru/80029003' +
      '<br>' +
      '<br>' +
      'http://localhost:3000/dwelling/dataset?min=0&max=10' +
      '<br>' +
      '<br>' +
      'http://localhost:3000/dwelling/no_duplicates' +
      '<br>' +
      '<br>' +
      'https://999.md/ru/list/real-estate/apartments-and-rooms?applied=1&hide_duplicates=no&ef=32%2C33&eo=12900%2C13859%2C12912%2C12885&cadastral_number=no&o_33_1=776&show_all_checked_childrens=no&o_32_8_12900=13859&page=236'
    );
  }
}
