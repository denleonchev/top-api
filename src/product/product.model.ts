import { Prop, SchemaFactory } from '@nestjs/mongoose';
import {
  ProductCharacteristic,
  ProductCharacteristicSchema,
} from './productCharacteristic.model';

export class Product {
  @Prop()
  image: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  prevPrice: number;

  @Prop()
  credit: number;

  @Prop()
  calculatedRating: number;

  @Prop()
  description: string;

  @Prop()
  advantages: string;

  @Prop()
  disadvantages: string;

  @Prop([String])
  categories: string[];

  @Prop()
  tags: string;

  @Prop([ProductCharacteristicSchema])
  productCharacteristics: ProductCharacteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
