// components/NotFound.tsx
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NotFound = (): JSX.Element => {
  return (
    <section className="section mt-120 mb-100">
      {/* <div className="container-sub">
        <div className="text-center"> */}
      <Image
        width={770}
        height={538}
        className=" "
        src="/assets/imgs/page/404/404.svg"
        alt="Kryptonum - Strona nie znaleziona"
      />
      <h2 className="">Oops! It looks like you're lost.</h2>
      <p className="">
        The page you're looking for isn't available. Try to search again or use the go to.
      </p>
      <Link href="/">
        Go Back to Homepage
        <svg
          className="icon-16 ml-5"
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
      {/*  </div>
      </div> */}
    </section>
  );
};

export default NotFound;
