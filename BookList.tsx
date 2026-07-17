import type { Book } from './types';
import BookItem from './BookItem';
import styles from './BookList.module.css';

type Props = {
    books : Book[];
    onDone:(id: string)=> void;
};

export default function BookList({ books, onDone}: Props) {
    if(books.length === 0){
        return <p className={styles.empty}>該当する本がありません</p>;
    }

    return (
        <ul className={styles.list}>
            {books.map((book)=>(
                <BookItem key={book.id} book={book} onDone={onDone}/>
            ))}
        </ul>
    );
}