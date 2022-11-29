import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class ItemListService {
  async getItemGroupList(): Promise<any> {
    const tobb = await fetch('https://borsa.tobb.org.tr/fiyat_urun_2.php');
    const tobb_html = await tobb.text();
    const $ = cheerio.load(tobb_html);
    const tables = $('table[width=760]');
    const data = [];
    tables.each((i, result) => {
      $(result)
        .find('tr > td > a')
        .each((x, col) => {
          data.push({
            link: `/item-list/${col.attribs['href'].split('=')[1]}`,
            name: $(col).text(),
          });
        });
    });
    return data;
  }

  async getItemList(id: string): Promise<any> {
    const tobb = await fetch(
      `https://borsa.tobb.org.tr/fiyat_urun_2.php?ana_kod=${id}`,
    );
    const tobb_html = await tobb.text();
    const $ = cheerio.load(tobb_html);
    const tables = $('table[width=760]');
    const data = [];

    tables.each((i, result) => {
      $(result)
        .find('tr > td > a')
        .each((x, col) => {
          if (col.attribs['href'].includes('alt_kod')) {
            data.push({
              link: `/price/${id}/${
                col.attribs['href'].split('&')[1].split('=')[1]
              }`,
              name: $(col).text(),
            });
          }
        });
    });

    return data;
  }
}
