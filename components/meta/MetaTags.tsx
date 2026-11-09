import Head from 'next/head';
import seo from '@/data/seo.json';
import { URLS } from '@/helpers/helpers';

export default function MetaTags({ pathname }: { pathname: string }) {
  const isIndexable = pathname === '/' || pathname === '/resume';
  const metadata = pathname === '/resume' ? seo.resume : seo.home;
  const canonicalUrl = `${seo.siteUrl}${pathname === '/' ? '' : pathname}`;
  const imageUrl = `${seo.siteUrl}${seo.image}`;
  const personId = `${seo.siteUrl}/#person`;
  const websiteId = `${seo.siteUrl}/#website`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: seo.name,
        url: seo.siteUrl,
        jobTitle: seo.jobTitle,
        description: seo.home.description,
        homeLocation: {
          '@type': 'Place',
          name: 'Ahmedabad, Gujarat, India',
        },
        knowsAbout: seo.skills,
        sameAs: [URLS.linkedin, URLS.github],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: seo.siteUrl,
        name: seo.siteName,
        inLanguage: 'en',
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: metadata.title,
        description: metadata.description,
        inLanguage: 'en',
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
      },
    ],
  };

  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/logo.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#2b5797" />
      <meta name="theme-color" content="#162447" />
      <meta name="author" content={seo.name} />
      <meta
        name="robots"
        content={isIndexable ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, follow'}
        key="robots"
      />
      <meta name="google-site-verification" content="P2GFX4aApNjQAZRqGxblrilFSA6PmgeWmMIuRVS8PxM" />
      <meta name="application-name" content={seo.siteName} />
      <meta name="apple-mobile-web-app-title" content={seo.siteName} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {isIndexable && (
        <>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} key="description" />
          <link rel="canonical" href={canonicalUrl} key="canonical" />
          <link rel="alternate" type="text/plain" href="/llms.txt" title="Machine-readable portfolio summary" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_IN" />
          <meta property="og:site_name" content={seo.siteName} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
          <meta property="og:image" content={imageUrl} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="512" />
          <meta property="og:image:height" content="512" />
          <meta property="og:image:alt" content={seo.imageAlt} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={metadata.title} />
          <meta name="twitter:description" content={metadata.description} />
          <meta name="twitter:image" content={imageUrl} />
          <meta name="twitter:image:alt" content={seo.imageAlt} />
          <script
            type="application/ld+json"
            key="profile-schema"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
          />
        </>
      )}
    </Head>
  );
}