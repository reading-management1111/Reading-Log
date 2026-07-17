// src/utils/sortBooksByPrice.ts
import type { Book, SortOrder } from './types';

export function sortBooksByPrice(books: Book[], order: SortOrder): Book[] {
  return [...books].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price));
}