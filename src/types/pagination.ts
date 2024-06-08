export type Pagination<T> = {
  total: number;
  current: number;
  next: boolean;
  previous: boolean;
  results: Array<T>;
};
