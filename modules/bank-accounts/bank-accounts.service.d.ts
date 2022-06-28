type BankAccount = { bankAccountId: number; balance: number };

export interface IBankAccountsService {
  findOne({
    bankAccountId,
  }: {
    bankAccountId: number;
  }): Promise<BankAccount | undefined>;
  updateBalance({
    bankAccountId,
    balance,
  }: {
    bankAccountId: number;
    balance: number;
  }): Promise<void>;
}
