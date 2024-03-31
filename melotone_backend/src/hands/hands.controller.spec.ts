import { Test, TestingModule } from '@nestjs/testing';
import { HandsController } from './hands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hands } from './hands.entity';
import { HandsService } from './hands.service';

describe('HandsController', () => {
  let controller: HandsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Hands])],
      providers: [HandsService],
      controllers: [HandsController],
    }).compile();

    controller = module.get<HandsController>(HandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should return all hands', async () => {
  //   expect(await controller.getHands()).toEqual({ hands: [] });
  // });
  
});
