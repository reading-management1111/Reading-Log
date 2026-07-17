export type BookStatus = '未読' | '読書中' | '読了';

export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  status: BookStatus;
  rating?: number;
  memo?: string;
};

// 絞り込み用に「すべて」を含めた型も別途用意すると便利
export type FilterStatus = 'すべて' | BookStatus;

export type SortOrder = 'asc' | 'desc';