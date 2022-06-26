import { createContainer } from '../lib/di/container.js';
import conf from '../config/index.js';

(async () => {
  const bankAccountIds = process.argv.slice(2);
  if (!bankAccountIds.length) {
    console.warn('no bank account id provided');
    return;
  }
  const abortController = new AbortController();
  const { signal } = abortController;

  try {
    const resolve = await createContainer({
      injectableGlob: '**/*.service.js',
    });
    const { BankAccounts } = resolve({ conf, signal });

    for (const bankAccountId of bankAccountIds) {
      console.log(await BankAccounts.findOne({ bankAccountId }));
    }
  } finally {
    abortController.abort();
  }
})();
