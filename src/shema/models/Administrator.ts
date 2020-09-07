import { ObjectType, Field } from 'type-graphql';
import { prop as Prop, getModelForClass } from '@typegoose/typegoose';
import IMongoDocument from '../interfaces/IMongoDocument';

@ObjectType({ implements: IMongoDocument })
export class Administrator extends IMongoDocument {
  @Field()
  @Prop({ required: true })
  fullName!: string;
}

export const Model = getModelForClass(Administrator);
