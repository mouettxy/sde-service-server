import { InterfaceType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';

@InterfaceType()
export abstract class IMongoDocument {
  @Field()
  readonly _id: ObjectId;
}

export default IMongoDocument;
