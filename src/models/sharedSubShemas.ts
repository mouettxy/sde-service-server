export const paymentShema = {
  form: {
    type: String,
  },
  type: {
    type: String,
  },
  pays: {
    type: String,
  },
};

export const freeShema = {
  in: {
    type: Boolean,
    default: false,
  },
  out: {
    type: Boolean,
    default: false,
  },
  buyin: {
    type: Boolean,
    default: false,
  },
  buyout: {
    type: Boolean,
    default: false,
  },
  extraPoint: {
    type: Boolean,
    default: false,
  },
};

export const automatedShema = {
  alwaysIn: {
    type: Boolean,
  },
  alwaysOut: {
    type: Boolean,
  },
};

export const permissionsShema = {
  isAdmin: {
    type: Boolean,
  },
  role: {
    type: String,
  },
  roleModel: {
    type: String,
  },
  active: {
    type: Boolean,
  },
};

export const fieldsShema = {
  bus: {
    type: Boolean,
  },
  takeIn: {
    type: Boolean,
  },
  takeOut: {
    type: Boolean,
  },
  buyin: {
    type: Number,
  },
  buyout: {
    type: Number,
  },
  bundles: {
    type: Number,
  },
  datetime: {
    type: String,
  },
  phone: {
    type: String,
  },
  comment: {
    type: String,
  },
};

export const clientAddressShema = {
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  lat: {
    type: Number,
  },
  lon: {
    type: Number,
  },
  fields: fieldsShema,
};

export const clientOrderRouteShema = {
  to: {
    type: String,
  },
  from: {
    type: String,
  },
  distance: {
    type: String,
  },
  time: {
    type: String,
  },
  timeString: {
    type: String,
  },
};

export const routeShema = {
  routes: [clientOrderRouteShema],
  overallTime: {
    type: Number,
  },
  overallDistance: {
    type: Number,
  },
  overallTimeString: {
    type: String,
  },
};

export const addressShema = {
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  lat: {
    type: Number,
  },
  lon: {
    type: Number,
  },
  fields: {
    type: fieldsShema,
  },
  isAlias: {
    type: Boolean,
  },
  completed: {
    type: Boolean,
  },
};

export const infoShema = {
  car: {
    type: Boolean,
  },
  quick: {
    type: Boolean,
  },
  optimizeRoute: {
    type: Boolean,
  },
  comment: {
    type: String,
  },
  whoPays: {
    type: String,
  },
};

export const clientOrderShema = {
  name: {
    type: String,
  },
  route: routeShema,
  addresses: addressShema,
  info: infoShema,
};

export const payShema = {
  form: {
    type: String,
  },
  pays: {
    type: String,
  },
  type: {
    type: String,
  },
  price: {
    type: Number,
  },
  priceDiscounted: {
    type: Number,
  },
  priceAdditionals: {
    type: Number,
  },
  buyin: {
    type: Number,
  },
};

export const orderShema = {
  route: routeShema,
  addresses: addressShema,
  info: infoShema,
};

export const timeShema = {
  deliveryFrom: {
    type: String,
  },
  deliveryTo: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  month: {
    type: String,
  },
};
