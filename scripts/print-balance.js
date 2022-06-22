import { createContainer } from '../lib/di/container.js';
import conf from '../config/index.js';
import { createDBClient } from '../lib/db/index.js';

(async () => {
  const db = createDBClient(conf);
  try {
    const bankAccountIds = process.argv.slice(2);
    if (!bankAccountIds.length) {
      console.warn('no bank account id provided');
      return;
    }
    const getDeps = await createContainer({});

    const { BankAccounts } = getDeps({ db });
    for (const bankAccountId of bankAccountIds) {
      console.log(await BankAccounts.findOne({ bankAccountId }));
    }
  } finally {
    db.end();
  }
})();
