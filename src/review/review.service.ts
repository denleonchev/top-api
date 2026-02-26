import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './review.model';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  create(dto: CreateReviewDto) {
    return this.reviewModel.create(dto);
  }

  findByProductId(productId: string) {
    return this.reviewModel.find({ productId });
  }

  delete(id: string) {
    return this.reviewModel.findByIdAndDelete(id);
  }
}
