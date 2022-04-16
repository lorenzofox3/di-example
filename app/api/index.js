import {transfertAPI} from './transfert/transfert.routes.js';
import {serviceRegistry} from '../plugins/di.js';

export const createAPI = async (instance) => {
    instance.register(serviceRegistry);
    instance.register(transfertAPI, {prefix: '/transferts'});
};
