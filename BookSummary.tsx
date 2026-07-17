import type { Book } from './types.ts';

interface BookSummaryProps {
  books: Book[];
}

export default function BookSummary({ books }: BookSummaryProps) {
  // 1. 登録（全体の冊数）
  const totalCount = books.length;

  // 2. 読了数（status が '読了' の冊数）
  const completedCount = books.filter((book) => book.status === '読了').length;

  // 3. 読了率（0冊のときは 0% にする安全設計）
  const completionRate = totalCount > 0 
    ? Math.round((completedCount / totalCount) * 100) 
    : 0;

  // 4. 合計価格の算出
  const totalPrice = books.reduce((sum, book) => sum + book.price, 0);

  return (
    <div className="book-summary" style={{ padding: '0.5rem 0' }}>
      <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 'bold' }}>
        登録: {totalCount}冊 / 
        読了: {completedCount}冊 (読了率 {completionRate}%) / 
        合計 {totalPrice.toLocaleString()}円
      </p>
    </div>
  );
}