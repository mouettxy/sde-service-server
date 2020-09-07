import { createUnionType } from 'type-graphql';
import Models from './models/';

export const userLinkedType = createUnionType({
  name: 'UserLinked',
  types: () => [
    Models.ExpeditorModel.Expeditor,
    Models.ClientModel.Client,
    Models.LogistModel.Logist,
    Models.AdministratorModel.Administrator,
    Models.ManagerModel.Manager,
    Models.DeveloperModel.Developer,
  ],
  resolveType: (value) => {
    switch (true) {
      case value instanceof Models.ExpeditorModel.Expeditor:
        return Models.ExpeditorModel.Expeditor;
      case value instanceof Models.ClientModel.Client:
        return Models.ClientModel.Client;
      case value instanceof Models.LogistModel.Logist:
        return Models.LogistModel.Logist;
      case value instanceof Models.AdministratorModel.Administrator:
        return Models.AdministratorModel.Administrator;
      case value instanceof Models.ManagerModel.Manager:
        return Models.ManagerModel.Manager;
      case value instanceof Models.DeveloperModel.Developer:
        return Models.DeveloperModel.Developer;
    }

    console.log(value);
    console.log('undefined returned');

    return undefined;
  },
});
