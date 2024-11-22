'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/notFound.module.scss';

export const metadata = {
  title: 'Error',
  description: 'Kryptonum Error',
};

export default function ErrorBoundary() {
  return (
    <section>
      <div className={styles.containerSub}>
        <div className={styles.textCenter}>
          <Image
            width={770}
            height={538}
            src="/assets/imgs/page/404/404.svg"
            alt="Kryptonum - Strona nie znaleziona"
            className={styles.image}
          />
          <h2 className={styles.heading}>Oops! It looks like something go wrong.</h2>
          <p className={styles.description}>
            The page you&#39;re looking for isn&#39;t available at that moment. Try again
            or use the go to.
          </p>
          <Link href="/faq" className={styles.homeLink}>
            Go Back
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
