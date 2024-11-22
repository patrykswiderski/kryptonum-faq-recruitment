import styles from '@/styles/loading.module.scss';

export const metadata = {
  title: 'Loading',
  description: 'Kryptonum Loading',
};

export default function Loading() {
  return <div className={styles.loader}></div>;
}
