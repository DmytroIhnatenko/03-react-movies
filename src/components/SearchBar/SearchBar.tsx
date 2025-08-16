import { useRef } from 'react';
import styles from './SearchBar.module.css';
import toast from "react-hot-toast";

export interface SearchBarProps {
  onSubmit: (query: string) => void | Promise<void>;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = inputRef.current?.value.trim() || '';

    if (!query) {
      toast.error('Please enter your search query');
      return;
    }

    await onSubmit(query);

     
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

       
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
