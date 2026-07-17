import React from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { Book, BookStatus } from './types';

// ==========================================
// 1. バリデーションスキーマ定義 (Yup)
// ==========================================
const schema = yup.object().shape({
  title: yup
    .string()
    // 前後の空白を除去 (F-6要件)
    .transform((value) => (typeof value === 'string' ? value.trim() : value))
    .required('${label}は必須入力です。')
    .max(30, '${label}は30文字以内で入力してください。')
    .label('タイトル'),

  author: yup
    .string()
    .required('${label}は必須入力です。')
    .max(20, '${label}は20文字以内で入力してください。')
    // 「匿名」入力不可のカスタムバリデーション (F-6要件)
    .test('no-anonymous', '著者に「匿名」は使用できません。', (value) => {
      return value !== '匿名';
    })
    .label('著者'),

  price: yup
    .number()
    .typeError('価格は数値で入力してください。')
    .required('価格は必須入力です。')
    .integer('価格は整数で入力してください。')
    .min(1, '価格は1以上で入力してください。')
    .max(100000, '価格は100,000円以下で入力してください。')
    .label('価格'),

  status: yup
    .string()
    .oneOf(['未読', '読書中', '読了'] as const, '状態は正しく選択してください。')
    .required('状態は必須入力です。')
    .label('状態'),

  // 発展課題3: 状態が「読了」のときのみ評価のバリデーションを適用する
  rating: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .when('status', {
      is: '読了',
      then: (schema) =>
        schema
          .required('読了時は評価を入力してください。')
          .min(1, '評価は1〜5の間で選択してください。')
          .max(5, '評価は1〜5の間で選択してください。'),
      otherwise: (schema) => schema.strip(), // 「読了」以外の場合はデータから除外する
    })
    .label('評価'),

  memo: yup
    .string()
    .max(100, 'メモは100文字以内で入力してください。')
    .optional()
    .label('メモ'),
});

// スキーマからフォームの入力データの型を自動推論
type FormData = yup.InferType<typeof schema>;

// ==========================================
// 2. 新規追加フォームコンポーネント (CSSなし)
// ==========================================
interface BookFormProps {
  onAdd: (book: Omit<Book, 'id'>) => void;
}

export const BookForm: React.FC<BookFormProps> = ({ onAdd }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
    defaultValues: {
      title: '',
      author: '',
      price: undefined,
      status: '未読',
      rating: null,
      memo: '',
    },
  });

  const currentStatus = watch('status');

  const onSubmit = (data: FormData) => {
    onAdd({
      title: data.title,
      author: data.author,
      price: data.price,
      status: data.status as BookStatus,
      // 状態が「読了」のときのみratingを設定し、それ以外はundefinedにする
      rating: data.status === '読了' ? (data.rating ?? undefined) : undefined,
      memo: data.memo ?? undefined,
    });
    reset(); // 登録成功後にフォームを初期化
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* タイトル */}
      <div>
        <label>
          タイトル <span>*</span>
        </label>
        <br />
        <input
          type="text"
          {...register('title')}
          placeholder="例: TypeScript入門"
        />
        {errors.title && (
          <p style={{ color: 'red', fontSize: '12px', margin: '4px 0' }}>
            ⚠️ {errors.title.message}
          </p>
        )}
      </div>

      <br />

      {/* 著者 */}
      <div>
        <label>
          著者 <span>*</span>
        </label>
        <br />
        <input
          type="text"
          {...register('author')}
          placeholder="例: 山田 太郎 (「匿名」は不可)"
        />
        {errors.author && (
          <p style={{ color: 'red', fontSize: '12px', margin: '4px 0' }}>
            ⚠️ {errors.author.message}
          </p>
        )}
      </div>

      <br />

      {/* 価格 */}
      <div>
        <label>
          価格 (円) <span>*</span>
        </label>
        <br />
        <input
          type="number"
          {...register('price')}
          placeholder="例: 2800"
        />
        {errors.price && (
          <p style={{ color: 'red', fontSize: '12px', margin: '4px 0' }}>
            ⚠️ {errors.price.message}
          </p>
        )}
      </div>

      <br />

      {/* 状態 (CSSが無くても機能する標準のラジオボタン形式) */}
      <div>
        <label>
          状態 <span>*</span>
        </label>
        <br />
        {(['未読', '読書中', '読了'] as const).map((statusValue) => (
          <label key={statusValue} style={{ marginRight: '12px' }}>
            <input
              type="radio"
              value={statusValue}
              {...register('status')}
            />
            {statusValue}
          </label>
        ))}
        {errors.status && (
          <p style={{ color: 'red', fontSize: '12px', margin: '4px 0' }}>
            ⚠️ {errors.status.message}
          </p>
        )}
      </div>

      <br />

      {/* 発展課題3: 状態が「読了」のときのみ評価選択フィールドを表示 */}
      {currentStatus === '読了' && (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
          <label>
            評価 (1〜5) <span>*</span>
          </label>
          <br />
          <select {...register('rating')}>
            <option value="">選択してください</option>
            <option value="1">1 (★)</option>
            <option value="2">2 (★★)</option>
            <option value="3">3 (★★★)</option>
            <option value="4">4 (★★★★)</option>
            <option value="5">5 (★★★★★)</option>
          </select>
          {errors.rating && (
            <p style={{ color: 'red', fontSize: '12px', margin: '4px 0' }}>
              ⚠️ {errors.rating.message}
            </p>
          )}
        </div>
      )}

      <br />

      {/* メモ */}
      <div>
        <label>メモ (任意 / 100文字以内)</label>
        <br />
        <textarea
          {...register('memo')}
          rows={3}
          placeholder="読書メモや感想、キーワードなど..."
        />
        {errors.memo && (
          <p style={{ color: 'red', fontSize: '12px', margin: '4px 0' }}>
            ⚠️ {errors.memo.message}
          </p>
        )}
      </div>

      <br />

      {/* 登録ボタン */}
      <button type="submit">
        登録する
      </button>
    </form>
  );
};

export default BookForm;