// src/components/ui/BookItem.tsx
import type { Book } from './types';
import styles from './BookItem.module.css';

type Props = {
    book: Book;
    onDone: (id: string) => void;
};

const badgeClassByStatus: Record<Book['status'], string> = {
    未読: styles.badgeUnread,
    読書中: styles.badgeReading,
    読了: styles.badgeDone,
};

// ── ratingの数だけ★を作る関数 ──
function renderStars(rating: number) {
    const fullStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return fullStars + emptyStars;
}

export default function BookItem({ book, onDone }: Props) {
    const isDone = book.status === '読了';

    return (
        <li className={styles.item}>
            <div className={styles.info}>
                <span className={styles.title}>{book.title}</span>
                <span className={styles.author}>{book.author}</span>
                <span className={styles.price}>{book.price.toLocaleString()}</span>

                <span className={badgeClassByStatus[book.status]}>{book.status}</span>

                {/* ── F-2: 読了の本だけ★評価を表示 ── */}
                {isDone && book.rating && (
                    <span className={styles.rating}>{renderStars(book.rating)}</span>
                )}

                {book.memo && <span className={styles.memo}>{book.memo}</span>}
            </div>

            {!isDone && (
                <button type="button" className={styles.toggleButton} onClick={() => onDone(book.id)}>
                    読了にする
                </button>
            )}
        </li>
    );
}