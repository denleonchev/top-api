import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Review } from './review.model';

describe('ReviewService', () => {
  let service: ReviewService;

  const mockModel = {
    find: jest.fn(),
  };

  const reviewRepositoryFactory = () => mockModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          useFactory: reviewRepositoryFactory,
          provide: getModelToken(Review.name),
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('findByProductId', async () => {
    const id = new Types.ObjectId().toHexString();
    mockModel.find.mockReturnValueOnce([{ productId: id }]);
    const reviews = await service.findByProductId(id);
    expect(reviews[0].productId).toBe(id);
  });
});
