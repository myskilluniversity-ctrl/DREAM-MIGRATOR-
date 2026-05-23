import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getSEOConfig, getPagesMeta } from '../services/seoService';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  schemaOverride?: string; // Optional direct custom schema injection
}

export default function SEO({ title, description, keywords, image, url, schemaOverride }: SEOProps) {
  const location = useLocation();
  const config = getSEOConfig();
  const pagesMeta = getPagesMeta();

  // Spot check if there is an administrative override for the current page path
  const pathMeta = pagesMeta.find(m => m.path === location.pathname);

  const activeTitle = pathMeta?.title || title;
  const activeDesc = pathMeta?.description || description;
  const activeKeywords = pathMeta?.keywords || keywords || 'education migration, Pearson BTEC levels 4-5, medical Ausbildung 2026';

  const siteTitle = 'Dream Migrator | BTEC Levels 4 & 5 Healthcare & German Ausbildung';
  const fullTitle = `${activeTitle} | ${siteTitle}`;

  // Process structured data
  let finalSchemaJson = '';
  if (schemaOverride) {
    finalSchemaJson = schemaOverride;
  } else if (pathMeta?.schemaData) {
    finalSchemaJson = pathMeta.schemaData;
  } else {
    // Generate automatic WebPage schema fallback if none exists
    const fallbackSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": fullTitle,
      "description": activeDesc,
      "url": `https://dream-migrator.dynamic${location.pathname}`,
      "isPartOf": {
        "@type": "WebSite",
        "name": "Dream Migrator",
        "url": "https://dream-migrator.dynamic"
      }
    };
    finalSchemaJson = JSON.stringify(fallbackSchema);
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={activeDesc} />
      <meta name="keywords" content={activeKeywords} />

      {/* Google Search Console Verification Tag */}
      {config.searchConsoleId && (
        <meta name="google-site-verification" content={config.searchConsoleId.replace('google-site-verification=', '')} />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={activeDesc} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={activeDesc} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Active JSON-LD Schema Plug */}
      {finalSchemaJson && (
        <script type="application/ld+json">
          {finalSchemaJson}
        </script>
      )}

      {/* Dynamic Google Analytics & Tag Manager Tag Headers */}
      {config.analyticsId && (
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.analyticsId}`} />
      )}
      {config.analyticsId && (
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${config.analyticsId}');
          `}
        </script>
      )}
      {config.tagManagerId && (
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${config.tagManagerId}');
          `}
        </script>
      )}
    </Helmet>
  );
}
