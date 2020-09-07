import Models from '../shema/models/';
import axios from 'axios';
import { Administrator } from '../shema/models/Administrator';
import { User } from '../shema/models/User';
import { Expeditor } from '../shema/models/Expeditor';
import { Logist } from '../shema/models/Logist';
import { Developer } from 'shema/models/Developer';
import { Client, Free, Automated, Payment, ClientOrder, OrderAddress } from '../shema/models/Client';
import dJSON from 'dirty-json';
import { isArray } from 'util';

const formatPhoneNumber = (number: string): string => {
  let trimmed = number.replace(/[^0-9]/g, '');
  if (trimmed[0] === '7') {
    trimmed = '8' + trimmed.slice(1);
  }
  return trimmed;
};

export async function seedDatabase(): Promise<any> {
  const users = await axios.get('https://api.sde.ru.com/api/v2/user/');
  const clients = await axios.get('https://api.sde.ru.com/api/v2/client/');

  let expeditorsCreated = 0;
  let logistsCreated = 0;
  let developersCreated = 0;
  let adminsCreated = 0;
  let clientsCreated = 0;

  // Expeditors Logists Developers Administrators seed
  users.data.forEach(async (e: any) => {
    let post;
    if (e.post === 'expeditor') {
      post = 'Экспедитор';
    } else if (e.post === 'logist') {
      post = 'Логист';
    } else if (e.username === 'dev') {
      post = 'Разработчик';
    } else {
      post = 'Администратор';
    }

    if (post === 'Экспедитор') {
      const expeditor = new Models.ExpeditorModel.Model({
        confidence: e.post_permissions || 3,
        transport: e.transport || 'moto',
        fullName: e.full_name || 'Dev',
        phone: formatPhoneNumber(e.phone),
        transportBelongs: !!parseInt(e.transport_belongs),
      } as Expeditor);
      await expeditor.save();

      let linkedId = expeditor._id;

      const user = new Models.UserModel.Model({
        login: e.username,
        password: 'qwerty',
        region: e.region,
        permissions: {
          role: post,
        },
        linked: linkedId,
      } as User);
      user.save();

      expeditorsCreated++;
    } else if (post === 'Логист') {
      const logist = new Models.LogistModel.Model({
        fullName: e.full_name || 'Dev',
      } as Logist);
      await logist.save();

      const linkedId = logist._id;

      const user = new Models.UserModel.Model({
        login: e.username,
        password: 'qwerty',
        region: e.region,
        permissions: {
          role: post,
        },
        linked: linkedId,
      } as User);
      user.save();

      logistsCreated++;
    } else if (post === 'Разработчик') {
      const developer = new Models.DeveloperModel.Model({
        fullName: e.full_name || 'Dev',
      } as Developer);
      await developer.save();

      const linkedId = developer._id;
      const user = new Models.UserModel.Model({
        login: e.username,
        password: 'qwerty',
        region: e.region,
        permissions: {
          role: post,
        },
        linked: linkedId,
      } as User);
      user.save();

      developersCreated++;
    } else if (post === 'Администратор') {
      const admin = new Models.AdministratorModel.Model({
        fullName: e.full_name || 'Dev',
      } as Administrator);
      await admin.save();

      const linkedId = admin._id;
      const user = new Models.UserModel.Model({
        login: e.username,
        password: 'qwerty',
        region: e.region,
        permissions: {
          role: post,
        },
        linked: linkedId,
      } as User);
      user.save();

      adminsCreated++;
    } else {
      console.log(e);
    }
  });

  clients.data.forEach(async (e: any) => {
    let payment = {
      form: e.payment_form,
      type: e.payment_type,
      who: e.payment_who,
    } as Payment;

    let free = {
      in: !!Number(e.free_in),
      out: !!Number(e.free_out),
      buyin: !!Number(e.free_cash),
      buyout: !!Number(e.free_pay),
      extraPoint: !!Number(e.free_extra_point),
    } as Free;

    let automated = {
      alwaysIn: !!Number(e.always_in),
      alwaysOut: !!Number(e.always_out),
    } as Automated;

    let orders: Array<any> = [];
    let addresses: Array<any> = [];
    if (e.aliases !== null) {
      dJSON.parse(e.aliases).forEach((e: any) => {
        addresses.push({
          name: e.name,
          lat: e.lat,
          lng: e.lon,
          fields: e.fields,
          address: e.address,
        });
      });
    }

    if (e.saved_orders !== null) {
      let o = dJSON.parse(e.saved_orders);
      if (isArray(o)) {
        o.forEach((e: any) => {
          let addresses_: any = [];
          e.addressList.forEach((a: any) => {
            addresses_.push({
              id: a.id,
              lat: a.lat,
              lng: a.lon,
              fields: a.fields,
              completed: a.completed,
              isAlias: a.isAlias,
            } as OrderAddress);
          });

          orders.push({
            name: e.name,
            route: e.route,
            addresses: addresses_,
            info: e.addressInfo,
          } as ClientOrder);
        });
      }
    }

    //@ts-ignore
    const client = new Models.ClientModel.Model({
      payment,
      free,
      automated,
      name: e.customer_name,
      email: '',
      identifier: Number(e.CLIENT),
      discount: Number(e.discount) || 0,
      rate: Number(e.Input) || 0,
      phone: formatPhoneNumber(e.customer_phone),
      attracted: e.who_attracted,
      food: !!parseInt(e.customer_food),
      isPriorityDelivery: !!parseInt(e.priority_delivery),
      isStoppedDelivery: !!parseInt(e.stop_delivery),
    } as Client);

    await client.save();

    //@ts-ignore
    client.addresses = addresses;
    //@ts-ignore
    client.orders = orders;

    await client.save();

    const linkedId = client._id;
    const user = new Models.UserModel.Model({
      login: 'client-' + e.CLIENT,
      password: '',
      region: e.region,
      permissions: {
        role: 'Клиент',
      },
      linked: linkedId,
    } as User);
    user.save();
    clientsCreated++;
  });

  setTimeout(() => {
    console.log(`
    Создано:
      Экспедиторов: ${expeditorsCreated}
      Логистов: ${logistsCreated}
      Клиентов: ${clientsCreated}
      Разработчиков: ${developersCreated}
      Администраторов: ${adminsCreated}
  `);
  }, 4000);

  return true;
}
