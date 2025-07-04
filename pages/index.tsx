
import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import MirrorForm from '../components/MirrorForm';
import ReflectionDisplay from '../components/ReflectionDisplay';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [currentReflection, setCurrentReflection] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (input: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/save-reflection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (response.ok) {
        setCurrentReflection(input);
        setIsSubmitted(true);
      } else {
        console.error('Failed to save reflection');
        alert('Failed to save your reflection. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting reflection:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewReflection = () => {
    setCurrentReflection('');
    setIsSubmitted(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Mirror First Form</title>
        <meta name="description" content="A space for reflecting unspoken truths" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Mirror First Form</h1>
          <p className={styles.subtitle}>A sacred space for unspoken truths</p>
        </div>

        {isLoading && (
          <div className={styles.loading}>
            <p>Holding your truth...</p>
          </div>
        )}

        {!isSubmitted && !isLoading && (
          <MirrorForm onSubmit={handleSubmit} isSubmitted={isSubmitted} />
        )}

        {isSubmitted && (
          <ReflectionDisplay 
            reflection={currentReflection}
            onNewReflection={handleNewReflection}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
