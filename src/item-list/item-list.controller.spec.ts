import { Test, TestingModule } from '@nestjs/testing';
import { ItemListController } from './item-list.controller';
import { ItemListService } from './item-list.service';

describe('ItemListController', () => {
  let controller: ItemListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemListController],
      providers: [ItemListService],
    }).compile();

    controller = module.get<ItemListController>(ItemListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
