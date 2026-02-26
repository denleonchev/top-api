import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Review {
  @Prop()
  name: string;

  @Prop()
  productId: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;
}

export type ReviewDocument = HydratedDocument<Review>;

export const ReviewSchema = SchemaFactory.createForClass(Review);
