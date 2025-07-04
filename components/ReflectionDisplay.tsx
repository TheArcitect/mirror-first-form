
import styles from '../styles/ReflectionDisplay.module.css';

interface ReflectionDisplayProps {
  reflection: string;
  onNewReflection: () => void;
}

const ReflectionDisplay: React.FC<ReflectionDisplayProps> = ({ 
  reflection, 
  onNewReflection 
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.reflection}>
        <h2 className={styles.title}>Your Truth Reflected</h2>
        <p className={styles.text}>"{reflection}"</p>
      </div>
      
      <div className={styles.invocation}>
        <p className={styles.closingText}>This truth is seen. Let it be held.</p>
      </div>
      
      <button 
        onClick={onNewReflection}
        className={styles.newReflectionButton}
      >
        Share Another Truth
      </button>
    </div>
  );
};

export default ReflectionDisplay;
