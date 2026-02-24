import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class ProductCharacteristic {
  @Prop()
  name: string;

  @Prop()
  value: string;
}

export const ProductCharacteristicSchema = SchemaFactory.createForClass(
  ProductCharacteristic,
);
