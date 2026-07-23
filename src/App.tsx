// import { useState } from 'react';
// import Panel from './components/ui/Panel';
// import BookSummary from './components/ui/BookSummary';
// import BookFilter from './components/ui/BookFilter';
// import BookList from './components/ui/BookList';
// import BookForm from './components/ui/BookForm';
// //import { initialBooks } from './datas/books';
// import { filterBooksByStatus } from './components/ui/filterBooksByStatus';
// import { sortBooksByPrice } from './components/ui/sortBooksByPrice';
// import type { Book, FilterStatus, SortOrder } from './components/ui/types';

// const mockBooks: Book[] = [
//   { id: '1', title: 'TypeScript入門', author: '山田太郎', price: 2800, status: '読書中' },
//   { id: '2', title: 'React実践ガイド', author: '佐藤花子', price: 3200, status: '未読' },
//   { id: '3', title: 'JavaScript本格入門', author: '鈴木一郎', price: 3600, status: '読了', rating: 4 },
// ];

// function App() {
//   // ── State の集約 ──
//   const [books, setBooks] = useState<Book[]>(mockBooks);
//   const [filter, setFilter] = useState<FilterStatus>('すべて');
//   const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

//   // ── 表示用データの計算（元のbooksは変更しない） ──
//   const filteredBooks = filterBooksByStatus(books, filter);
//   const sortedBooks = sortBooksByPrice(filteredBooks, sortOrder);

//   // ── F-7: 読了にする（子→親のリフトアップ） ──
//   const handleDone = (id: string) => {
//     setBooks((prevBooks) =>
//       prevBooks.map((book) =>
//         book.id === id ? { ...book, status: '読了' } : book
//       )
//     );
//   };

//   // ── F-6: 新規登録（子→親のリフトアップ） ──
//   const handleAdd = (newBook: Omit<Book, 'id'>) => {
//     const book: Book = {
//       ...newBook,
//       id: crypto.randomUUID(),
//     };
//     setBooks((prevBooks) => [...prevBooks, book]);
//   };

//   return (
//     <div className="app">
//       <h1>MyLibrary 📚</h1>

//       <Panel title="集計">
//         <BookSummary books={books} />
//       </Panel>

//       <Panel title="絞り込み・並び替え">
//         <BookFilter
//           filter={filter}
//           sortOrder={sortOrder}
//           onFilterChange={setFilter}
//           onSortOrderChange={setSortOrder}
//         />
//       </Panel>
//       {/* ── ここが検証用の表示 ── */}
//       <div style={{ marginTop: '16px', padding: '8px', background: '#f0f0f0' }}>
//         <p>現在のfilter: <strong>{filter}</strong></p>
//         <p>現在のsortOrder: <strong>{sortOrder}</strong></p>
//       </div>

//       <Panel title="書籍一覧">
//         <BookList books={sortedBooks} onDone={handleDone} />
//       </Panel>

//       <Panel title="新しい本を登録">
//         <BookForm onAdd={handleAdd} />
//       </Panel>
//     </div>
//   );
// }
// export default App;

// App.tsx
import HookCallbackRef from "./HookCallbackRef";

function App() {
  return (
    <div>
      <HookCallbackRef />
    </div>
  );
}

export default App;
