import camelcase from 'camelcase';
import { compose, composeP, head, map, mapKeys } from '../../utils.js';

const normalizeKeys = mapKeys(camelcase);

// private
export const createClient = ({ client }) => {
  const query = (...args) => client.query(...args);
  const formatRows = compose([map(normalizeKeys), ({ rows }) => rows]);
  const clientService = {
    query: composeP([formatRows, query]),
    one: composeP([compose([head, formatRows]), query]),
    withinTransaction: (fn) => fn({ client: clientService }),
    async end() {
      await client.end();
    },
    async connect() {
      await client.connect();
    },
  };

  return clientService;
};
