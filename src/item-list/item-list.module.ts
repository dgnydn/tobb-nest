import { Module } from '@nestjs/common';
import { ItemListService } from './item-list.service';
import { ItemListController } from './item-list.controller';

@Module({
  controllers: [ItemListController],
  providers: [ItemListService]
})
export class ItemListModule {}
