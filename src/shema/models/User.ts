import { prop as Property, pre as Pre, post as Post, getModelForClass } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { genSalt, hash } from 'bcryptjs';
import { userLinkedType } from '../unions';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

import IMongoDocument from '../interfaces/IMongoDocument';

// @ts-ignore
import readablePwd from 'readable-password';

import { permissionsRoleEnum } from '../enums';
import { readFileSync } from 'fs';

interface IPasswordGenerated {
  password: string;
  salt: string;
}

export const generatePassword = async (password: string): Promise<IPasswordGenerated> => {
  let salt = await genSalt(12);
  let hashedPassword = await hash(password, salt);

  return { password: hashedPassword, salt };
};

@ObjectType()
export class Permissions {
  @Field({ nullable: true })
  @Property({ default: false })
  isAdmin: boolean;

  @Field()
  @Property({ required: true, enum: permissionsRoleEnum })
  role: string;

  @Field({ nullable: true })
  @Property({ default: false })
  active: boolean;
}

@Pre<User>('save', async function (next) {
  const modifiedFields: Array<string> = this.modifiedPaths();

  // * Processing user role based on input
  if (modifiedFields.includes('permissions')) {
    if (this.permissions.role === 'Экспедитор') {
      this.roleModel = 'Expeditor';
    } else if (this.permissions.role === 'Логист') {
      this.roleModel = 'Logist';
    } else if (this.permissions.role === 'Клиент') {
      this.roleModel = 'Client';
    } else if (this.permissions.role === 'Менеджер') {
      this.roleModel = 'Manager';
    } else if (this.permissions.role === 'Разработчик') {
      this.roleModel = 'Developer';
      this.permissions.isAdmin = true;
    } else if (this.permissions.role === 'Администратор') {
      this.roleModel = 'Administrator';
      this.permissions.isAdmin = true;
    } else {
      throw new Error('Не указана роль');
    }
  }

  if (modifiedFields.includes('password')) {
    if (this.password !== null && this.password !== undefined) {
      await generatePassword(this.password)
        .then((generated) => {
          this.password = generated.password;
          this.salt = generated.salt;
        })
        .catch((err) => {
          console.log('Error when generating password', err);
        });
    }
  }

  if (!this.defaultPassword) {
    this.defaultPassword = readablePwd.randomString(8, 3);
  }

  if (this.isModified()) {
    let secret = readFileSync('src/config/jwtRS256.key');
    this.jwt = jwt.sign(
      {
        login: this.login,
        region: this.region,
      },
      secret,
      { algorithm: 'RS256' }
    );
  }

  next();
})
@Post<User>('save', function (user) {
  //
})
@ObjectType({ implements: IMongoDocument })
export class User extends IMongoDocument {
  @Field({ description: 'Уникальный идентификатор пользователя.' })
  @Property({ required: true, unique: true })
  login!: string;

  @Field({
    nullable: true,
    defaultValue: null,
    description: 'Пароль выставленный пользователем. Если null то используется defaultPassword для авторизации.',
  })
  @Property({ default: null })
  password?: string;

  @Field({
    nullable: true,
  })
  @Property({ default: '' })
  salt?: string;

  @Field({
    nullable: true,
    description:
      'Уникальный пароль сгенерированный системой, который используется как пароль по умолчанию при сбросе пароля, может менять своё значение.',
  })
  @Property()
  defaultPassword?: string;

  @Field({
    description: 'Область работы пользователя, имеет эффект как для экспедиторов, так и для логистов и клиентов.',
  })
  @Property({ required: true })
  region!: string;

  @Field({
    nullable: true,
    description: 'JWT токен не включающий пароли. Используется для верификации и идентификации пользователя.',
  })
  @Property()
  jwt?: string;

  @Field({
    nullable: true,
    description:
      'Модель linked поля, может так же использоваться как идентификатор должности на английском. Присваивается автоматически на основе permissions.role.',
  })
  @Property()
  roleModel!: string;

  @Field()
  @Property()
  permissions: Permissions;

  @Field((type) => userLinkedType || ObjectId, { nullable: true })
  @Property({ refPath: 'roleModel' })
  linked?: typeof userLinkedType | ObjectId;
}

export const Model = getModelForClass(User);
