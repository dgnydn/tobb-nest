import { Controller, Get, Param } from '@nestjs/common';
import { PriceService } from './price.service';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get('/:kod/:alt')
  async getPrice(@Param('kod') kod: string, @Param('alt') alt: string) {
    return await this.priceService.getPrice(kod, alt);
  }
}
