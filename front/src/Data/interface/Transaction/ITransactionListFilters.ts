export interface ITransactionListFilters {
  orderBy?: string,
  filterByDebited?: boolean,
  filterByCredited?: boolean,
  begin?: Date | string,
  end?: Date | string,
  limit?: number,
}
