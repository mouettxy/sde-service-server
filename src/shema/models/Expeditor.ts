import { ObjectType, Field, Int } from 'type-graphql';
import { prop as Prop, getModelForClass } from '@typegoose/typegoose';

import IMongoDocument from '../interfaces/IMongoDocument';
import { expeditorTransportEnum, expeditorConfidenceEnum } from '../enums';

@ObjectType()
export class ExpeditorState {
  @Field((type) => Int)
  @Prop({ required: true })
  order!: number;

  @Field()
  @Prop({ required: true })
  address!: string;

  @Field()
  @Prop({ required: true })
  started!: string;

  @Field({ nullable: true })
  @Prop({ default: '' })
  ended?: string;

  @Field({ nullable: true })
  @Prop({ default: '' })
  plannedEndTime?: string;
}

@ObjectType({ implements: IMongoDocument })
export class Expeditor extends IMongoDocument {
  @Field({ nullable: true, defaultValue: false })
  @Prop({ default: false })
  onBreak?: boolean;

  @Field({
    nullable: true,
    defaultValue: true,
    description: 'Определяет принадлежность транспорта. true - принадлежит sde, false - свой транспорт.',
  })
  @Prop({ default: true })
  transportBelongs?: boolean;

  @Field({ nullable: true, defaultValue: '' })
  @Prop({ default: '' })
  firstTake?: string;

  @Field()
  @Prop({ required: true, enum: expeditorTransportEnum })
  transport!: string;

  @Field()
  @Prop({ required: true, enum: expeditorConfidenceEnum })
  confidence!: number;

  @Field()
  @Prop({ required: true })
  fullName!: string;

  @Field({ nullable: true, defaultValue: '' })
  @Prop({ default: '' })
  phone?: string;

  @Field((type) => [ExpeditorState], { nullable: true })
  @Prop({ default: [] })
  state?: [ExpeditorState];
}

export const Model = getModelForClass(Expeditor);
