import Link from 'next/link';
import styles from '@/styles/homePage.module.scss';

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <Link href="/faq" className={styles.navigateButton}>
        Przejdź do FAQ
      </Link>
    </div>
  );
};

export default HomePage;
