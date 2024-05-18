import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        ></link>
      </Head>
      <body className="bg-white dark:bg-v9-primary-black text-black dark:text-white transition-colors duration-300 custom-scroll-bar-x">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
