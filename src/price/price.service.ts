import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class PriceService {
  async getPrice(kod: string, alt: string): Promise<any> {
    const tobb = await fetch(
      `https://borsa.tobb.org.tr/fiyat_urun3_detayli.php?ana_kod=${kod}&alt_kod=${alt}`,
    );
    const tobb_html = await tobb.text();
    const $ = cheerio.load(tobb_html);
    const tables = $('table[width=760]');
    const header = [
      'Borsa Adı',
      'X',
      'Son İşlem Tarihi',
      'Önceki İşlem Tarihi',
      'En Az',
      'Önceki En Az',
      'En Çok',
      'Önceki En Çok',
      'Ortalama',
      'Önceki Ortalama',
      'İşlem Miktarı',
      'Önceki İşlem Miktarı',
      'İşlem Adedi',
      'Önceki İşlem Adedi',
      'İşlem Tutarı',
      'Önceki İşlem Tutarı',
    ];
    const data = [];

    tables.each((i, result) => {
      $(result)
        .find('font[size=-2]')
        .each((x, col) => {
          const txt = $(col).text().trim();
          data.push({
            name: header[x < header.length ? x : x % header.length],
            data: txt,
          });
        });
    });

    return data.filter((x) => x.name != 'X');
  }
}
