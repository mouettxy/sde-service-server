import { ObjectType, Field, Int, Float } from 'type-graphql';
import { prop as Prop, getModelForClass } from '@typegoose/typegoose';

import { OrderInfo, OrderRoutes } from './Order';
import IMongoDocument from '../interfaces/IMongoDocument';

@ObjectType()
export class Payment {
  @Field({ nullable: true })
  @Prop({ default: '' })
  form?: string;

  @Field({ nullable: true })
  @Prop({ default: '' })
  type?: string;

  @Field({ nullable: true })
  @Prop({ default: '' })
  pays?: string;
}

@ObjectType()
export class Free {
  @Field({ nullable: true })
  @Prop({ default: false })
  in?: boolean;

  @Field({ nullable: true })
  @Prop({ default: false })
  out?: boolean;

  @Field({ nullable: true })
  @Prop({ default: false })
  buyin?: boolean;

  @Field({ nullable: true })
  @Prop({ default: false })
  buyout?: boolean;

  @Field({ nullable: true })
  @Prop({ default: false })
  extraPoint?: boolean;
}

@ObjectType()
export class Automated {
  @Field({ nullable: true })
  @Prop({ default: false })
  alwaysIn?: boolean;

  @Field({ nullable: true })
  @Prop({ default: false })
  alwaysOut?: boolean;
}

@ObjectType()
export class AddressFields {
  @Field({ nullable: true })
  @Prop({ default: false })
  bus?: boolean;

  @Field({ nullable: true })
  @Prop({ default: false })
  takeIn?: boolean;

  @Field({ nullable: true })
  @Prop({ default: false })
  takeOut?: boolean;

  @Field((type) => Int, { nullable: true })
  @Prop({ default: 0 })
  buyin?: number;

  @Field((type) => Int, { nullable: true })
  @Prop({ default: 0 })
  buyout?: number;

  @Field((type) => Int, { nullable: true })
  @Prop({ default: 0 })
  bundles?: number;

  @Field()
  @Prop({ default: '' })
  datetime!: string;

  @Field({ nullable: true })
  @Prop({ default: '' })
  phone?: string;

  @Field({ nullable: true })
  @Prop({ default: '' })
  comment?: string;
}

@ObjectType()
export class ClientAddress {
  @Field()
  @Prop({ required: true })
  name!: string;

  @Field()
  @Prop({ required: true })
  address!: string;

  @Field((type) => Float)
  @Prop({ required: true })
  lat!: number;

  @Field((type) => Float)
  @Prop({ required: true })
  lng!: number;

  @Field((type) => AddressFields)
  @Prop()
  fields: AddressFields;
}

@ObjectType()
export class ClientOrder {
  @Field({ nullable: true })
  @Prop({ required: true })
  name: string;

  @Field((type) => OrderRoutes)
  @Prop()
  route: OrderRoutes;

  @Field((type) => [OrderAddress])
  @Prop()
  addresses: [OrderAddress];

  @Field((type) => OrderInfo)
  @Prop()
  info: OrderInfo;
}

@ObjectType()
export class OrderAddress extends ClientAddress {
  @Field((type) => Int)
  @Prop({ required: true })
  id!: number;

  @Field({ nullable: true })
  @Prop({ default: false })
  isAlias?: boolean;

  @Field({ nullable: true })
  @Prop({ default: false })
  completed?: boolean;
}

@ObjectType({ implements: IMongoDocument })
export class Client extends IMongoDocument {
  @Field((type) => Payment)
  @Prop()
  payment: Payment;

  @Field((type) => Free)
  @Prop()
  free: Free;

  @Field((type) => Automated)
  @Prop()
  automated: Automated;

  @Field((type) => Int)
  @Prop({ required: true })
  identifier!: number;

  @Field((type) => Int, { nullable: true, defaultValue: 0 })
  @Prop({ default: 0 })
  discount?: number;

  @Field((type) => Int, { nullable: true, defaultValue: 0 })
  @Prop({ default: 0 })
  rate?: number;

  @Field()
  @Prop({ default: '' })
  name!: string;

  @Field({ nullable: true, defaultValue: '' })
  @Prop({ default: '' })
  phone?: string;

  @Field({ nullable: true, defaultValue: '' })
  @Prop({ default: '' })
  email?: string;

  @Field({ nullable: true, defaultValue: '' })
  @Prop({ default: '' })
  attracted?: string;

  @Field({ nullable: true, defaultValue: false })
  @Prop({ default: false })
  food?: boolean;

  @Field({ nullable: true, defaultValue: false })
  @Prop({ default: false })
  isPriorityDelivery?: boolean;

  @Field({ nullable: true, defaultValue: false })
  @Prop({ default: false })
  isStoppedDelivery?: boolean;

  @Field((type) => [ClientOrder], { nullable: true })
  @Prop({ type: () => ClientOrder, default: [] })
  orders?: ClientOrder[];

  @Field((type) => [ClientAddress], { nullable: true })
  @Prop({ type: () => ClientAddress, default: [] })
  addresses?: ClientAddress[];
}

export const Model = getModelForClass(Client);
