// src/utils/filterBooksByStatus.ts
import type { Book, FilterStatus } from './types';

export function filterBooksByStatus(books: Book[], status: FilterStatus): Book[] {
  return status === 'すべて' ? books : books.filter((book) => book.status === status);
}