import { Resolver, FieldResolver, Root, Query, Arg, Mutation, InputType, Field, ObjectType } from 'type-graphql';
import { Error, Types } from 'mongoose';
import Models from '../models/';
import { UserModel } from '../models/';
import bcrypt from 'bcryptjs';
import { isNull, isUndefined } from 'util';
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';

@InputType({ description: 'Данные пользователя для авторизации' })
class AuthInput {
  @Field()
  login: string;

  @Field()
  password: string;
}

@ObjectType()
class AuthPayload {
  @Field({ description: 'Описывает успешность авторизации' })
  success!: boolean;

  @Field({ nullable: true, description: 'Токен авторизации пользователя' })
  token?: string;

  @Field({ description: 'Поле для сохранении ошибки, если таковая была', nullable: true })
  error?: string;
}

@Resolver((of) => UserModel.User)
export class UserResolver {
  @Query((returns) => [UserModel.User])
  async users(): Promise<UserModel.User[]> {
    return await UserModel.Model.find({}).exec();
  }

  @FieldResolver()
  async linked(@Root() user: UserModel.User) {
    let role = user.roleModel;
    let roleLinked = user.linked;

    //@ts-ignore
    return await Models[`${role}Model`].Model.findById(roleLinked).exec();
  }

  @Query((returns) => UserModel.User, { nullable: true, description: 'ObjectID или login пользователя' })
  async user(@Arg('id') id: string): Promise<UserModel.User> {
    let publicKey = readFileSync('src/config/jwtRS256.key.pub');
    let isObjectID = Types.ObjectId.isValid(id);
    let isJwtToken;
    try {
      isJwtToken = !!jwt.verify(id, publicKey);
    } catch (e) {
      isJwtToken = false;
    }

    let user;
    if (isObjectID) {
      user = await UserModel.Model.findById(id);
    } else if (isJwtToken) {
      user = await UserModel.Model.findOne({ jwt: id });
    } else {
      // maybe username
      user = await UserModel.Model.findOne({ login: id });
    }

    if (!isNull(user) && !isUndefined(user) && user) {
      return user as UserModel.User;
    } else {
      throw new Error('Не удалось найти пользователя.');
    }
  }

  @Mutation((returns) => AuthPayload)
  async login(@Arg('data') data: AuthInput) {
    const user = await UserModel.Model.findOne({ login: data.login });

    if (!isNull(user)) {
      if (isNull(user.password) || isUndefined(user.password) || !user.password) {
        let passwordsMatch = user.defaultPassword === data.password;
        if (passwordsMatch) {
          return {
            success: true,
            token: user.jwt,
          };
        }
      } else {
        let passwordsMatch = await bcrypt.compare(data.password, user.password);
        if (passwordsMatch) {
          return {
            success: true,
            token: user.jwt,
          };
        }
      }
    } else {
      return {
        success: false,
        error: `Не удалось найти пользователя с логином: <${data.login}>`,
      };
    }

    return {
      success: false,
      error: 'Неверный пароль.',
    };
  }
}
