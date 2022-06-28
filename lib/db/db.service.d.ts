export interface ITransactionManager<Client> {
  withinTransaction<Result>(
    fn: ({ client }: { client: Client }) => Promise<Result>
  ): Result;
}
