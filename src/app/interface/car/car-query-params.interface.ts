interface SortBy {
  sortBy: string;
}

type SortOrder = 'ASC' | 'DESC';

export interface CarQueryParams {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  filters: { [key: string]: any };
  search_term?: string;
}
