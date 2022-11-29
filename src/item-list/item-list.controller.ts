import { Controller, Get, Param } from '@nestjs/common';
import { ItemListService } from './item-list.service';

@Controller('item-list')
export class ItemListController {
  constructor(private readonly itemListService: ItemListService) {}

  @Get('/')
  async getItemGroupList() {
    return await this.itemListService.getItemGroupList();
  }

  @Get('/:id')
  async getItemList(@Param('id') id: string) {
    return await this.itemListService.getItemList(id);
  }
}
