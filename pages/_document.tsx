import MetaTags from '@/components/meta/MetaTags';
import { Html, Head, Main, NextScript } from 'next/document';
import { Analytics } from '@vercel/analytics/next';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        {/* Add Google Analytics Global Site Tag */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-KR2Y21KPVJ`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-KR2Y21KPVJ');
              `,
            }}
          ></script>
        <MetaTags/>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        ></link>
      </Head>
      <body className="bg-white dark:bg-v9-primary-black text-black dark:text-white transition-colors duration-300 custom-scroll-bar-x">
        <Main />
        <NextScript />
        <Analytics />
      </body>
    </Html>
  );
}
