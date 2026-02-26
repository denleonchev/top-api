import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post('create')
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Get('byProduct/:productId')
  getByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}
