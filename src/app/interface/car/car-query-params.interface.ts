interface SortBy {
  sortBy: string;
}

type SortOrder = 'ASC' | 'DESC';

export interface CarQueryParams {
  page: number;
  limit: number;
  sortBy: SortBy;
  sortOrder: SortOrder;
}
