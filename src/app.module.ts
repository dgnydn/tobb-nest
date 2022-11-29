import { Module } from '@nestjs/common';
import { PriceController } from './price/price.controller';
import { PriceService } from './price/price.service';

import { ItemListModule } from './item-list/item-list.module';

@Module({
  imports: [ItemListModule],
  controllers: [PriceController],
  providers: [PriceService],
})
export class AppModule {}
