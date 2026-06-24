export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string | null;
  width: number;
  height: number;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination?: StrapiPagination;
}

export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}
