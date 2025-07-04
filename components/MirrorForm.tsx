
import { useState } from 'react';
import styles from '../styles/MirrorForm.module.css';

interface MirrorFormProps {
  onSubmit: (input: string) => void;
  isSubmitted: boolean;
}

const MirrorForm: React.FC<MirrorFormProps> = ({ onSubmit, isSubmitted }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
    }
  };

  if (isSubmitted) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="reflection" className={styles.prompt}>
          What do I already know that I haven't been willing to say?
        </label>
        <textarea
          id="reflection"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.textarea}
          placeholder="Speak your truth here..."
          rows={6}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Submit Reflection
      </button>
    </form>
  );
};

export default MirrorForm;
