import { ObjectType, Field, Int, Float } from 'type-graphql';
import { prop as Prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';

import { OrderAddress, Client } from './Client';
import IMongoDocument from '../interfaces/IMongoDocument';

@ObjectType()
export class OrderRoute {
  @Field({ nullable: true })
  @Prop({ default: '' })
  to?: string;

  @Field({ nullable: true })
  @Prop({ default: '' })
  from?: string;

  @Field({ nullable: true })
  @Prop({ default: '' })
  distance?: string;

  @Field({ nullable: true })
  @Prop({ default: '' })
  timeString?: string;

  @Field((type) => Float, { nullable: true })
  @Prop({ default: 0 })
  time?: number;
}

@ObjectType()
export class OrderRoutes {
  @Field((type) => [OrderRoute])
  @Prop()
  routes: [OrderRoute];

  @Field((type) => Float)
  @Prop({ required: true })
  overallTime: number;

  @Field((type) => Float)
  @Prop({ required: true })
  overallDistance: number;

  @Field()
  @Prop({ required: true })
  overallTimeString: string;
}

@ObjectType()
export class OrderInfo {
  @Field({ nullable: true })
  @Prop({ default: false })
  car?: boolean;

  @Field({ nullable: true })
  @Prop({ default: false })
  quick?: boolean;

  @Field({ nullable: true })
  @Prop({ default: '' })
  comment: string;

  @Field({ nullable: true })
  @Prop({ default: '' })
  whoPays: string;
}

@ObjectType()
export class OrderPay {
  @Field({ nullable: true })
  @Prop({ default: '' })
  form?: string;

  @Field({ nullable: true })
  @Prop({ default: '' })
  pays?: string;

  @Field({ nullable: true })
  @Prop({ default: '' })
  type?: string;

  @Field((type) => Int, { nullable: true })
  @Prop({ default: 0 })
  price?: number;

  @Field((type) => Int, { nullable: true })
  @Prop({ default: 0 })
  priceDiscounted?: number;

  @Field((type) => Int, { nullable: true })
  @Prop({ default: 0 })
  buyin?: number;

  @Field((type) => Int, { nullable: true })
  @Prop({ default: 0 })
  priceAdditionals?: number;
}

@ObjectType()
export class OrderOrder {
  @Field((type) => OrderRoute)
  @Prop()
  route!: OrderRoute;

  @Field((type) => [OrderAddress])
  @Prop()
  addresses!: [OrderAddress];

  @Field((type) => OrderInfo)
  @Prop()
  info!: OrderInfo;
}

@ObjectType()
export class OrderTime {
  @Field()
  @Prop({ required: true })
  deliveryFrom!: string;

  @Field()
  @Prop({ required: true })
  deliveryTo!: string;

  @Field()
  @Prop({ required: true })
  date!: string;

  @Field()
  @Prop({ required: true })
  time!: string;

  @Field()
  @Prop({ required: true })
  month!: string;
}

@ObjectType({ implements: IMongoDocument })
export class Order extends IMongoDocument {
  @Field((type) => Int)
  @Prop({ required: true })
  identifier!: number;

  @Field()
  @Prop({ default: 'Новая' })
  status?: string;

  @Field((type) => Client || ObjectId)
  @Prop({ ref: 'Client' })
  client: Ref<Client>;

  @Field((type) => OrderPay)
  @Prop()
  pay: OrderPay;

  @Field((type) => OrderOrder)
  @Prop()
  order: OrderOrder;

  @Field((type) => OrderTime)
  time: OrderTime;
}

export const Model = getModelForClass(Order);
