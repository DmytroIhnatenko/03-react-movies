import styles from './SearchBar.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface SearchBarProps {
  onSubmit: (query: string) => void;  
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    const query = formData.get('query') as string;
    

      if (!query) {
        
      toast.error('Please enter a search query');
      return;
    }
    onSubmit (query);
    form.reset();
 };

  return (
  <header className={styles.header}>
    <ToastContainer position="top-center" autoClose={3000} />
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