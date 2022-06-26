import camelcase from 'camelcase';
import { compose, composeP, head, map, mapKeys } from '../../utils.js';

const normalizeKeys = mapKeys(camelcase);

// private
export const createClient = ({ client }) => {
  const query = (...args) => {
    return new Promise((resolve, reject) => {
      client.query(...args, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(Array.isArray(data) ? data : []);
      });
    });
  };

  const formatRows = map(normalizeKeys);

  const clientService = {
    query: composeP([formatRows, query]),
    one: composeP([compose([head, formatRows]), query]),
    withinTransaction: (fn) => fn({ client: clientService }),
  };

  return clientService;
};
