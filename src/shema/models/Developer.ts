import { ObjectType, Field } from 'type-graphql';
import { prop as Prop, getModelForClass } from '@typegoose/typegoose';
import IMongoDocument from '../interfaces/IMongoDocument';

@ObjectType({ implements: IMongoDocument })
export class Developer extends IMongoDocument {
  @Field()
  @Prop({ required: true })
  fullName!: string;
}

export const Model = getModelForClass(Developer);
