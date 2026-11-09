import { Html, Head, Main, NextScript } from 'next/document';
import { GA_MEASUREMENT_ID } from '@/helpers/analytics';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        {/* Add Google Analytics Global Site Tag */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('set', ${JSON.stringify({
                  send_page_view: false,
                })});
                gtag('js', new Date());
              `,
            }}
          ></script>
          <script
            async
            src={`https://www.googletagmanager.com/gtm.js?id=${GA_MEASUREMENT_ID}`}
          ></script>
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
