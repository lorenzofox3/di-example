import { transfertAPI } from './transfert/transfert.routes.js';
import { serviceRegistry } from '../plugins/di.js';

export const createAPI = async (instance, opts) => {
  instance.register(serviceRegistry, opts);
  instance.register(transfertAPI, { prefix: '/transferts' });
};
