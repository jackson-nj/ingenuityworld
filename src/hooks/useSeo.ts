import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  ogImage?: string;
};

const SITE_URL = "https://www.ingenuityworld.com";
const TITLE_SUFFIX = " | Ingenuity Engineering";

function buildLocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Ingenuity Specialized Engineering Works Ltd",
    url: SITE_URL,
    telephone: "+260975078766",
    email: "ingenuity.engltd@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop No. 233A, Buseko Market, Off Lumumba Road",
      addressLocality: "Lusaka",
      addressRegion: "Lusaka",
      addressCountry: "Zambia"
    },
    description: "Specialized engineering, fabrication and industrial supply across Zambia.",
    areaServed: ["Zambia", "Copperbelt"],
    sameAs: [
      "https://web.facebook.com/profile.php?id=100085097660946"
    ]
  };
  return JSON.stringify(jsonLd);
}

export default function useSeo({ title, description, ogImage }: SeoProps) {
  useEffect(() => {
    const previousTitle = document.title;
    const metaTag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const previousDescription = metaTag?.getAttribute("content") || "";

    // Set title (avoid doubling site name if already present)
    document.title = title.includes("Ingenuity") ? title : `${title}${TITLE_SUFFIX}`;

    // Ensure a meta description tag exists and set content
    let meta = metaTag;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    // Add JSON-LD structured data for LocalBusiness
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-generated-by", "useSeo");
    script.text = buildLocalBusinessJsonLd();
    document.head.appendChild(script);

    // Add or update canonical link
    const canonicalSelector = 'link[rel="canonical"]';
    let canonicalLink = document.querySelector(canonicalSelector) as HTMLLinkElement | null;
    const previousCanonical = canonicalLink?.getAttribute('href') || null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    // Use SITE_URL as base plus current path
    canonicalLink.setAttribute('href', `${SITE_URL}${window.location.pathname}${window.location.search}`);

    // Add/Update Open Graph & Twitter meta tags
    const ogImageUrl = ogImage || `${SITE_URL}/og-image.svg`;

    const metaChanges: { element: HTMLMetaElement; prev: string | null }[] = [];
    function upsertMetaAttr(attrName: string, attrKey: string, content: string) {
      let m = document.querySelector(`meta[${attrKey}="${attrName}"]`) as HTMLMetaElement | null;
      if (!m) {
        m = document.createElement('meta');
        m.setAttribute(attrKey, attrName);
        document.head.appendChild(m);
      }
      const prev = m.getAttribute('content');
      m.setAttribute('content', content);
      metaChanges.push({ element: m, prev });
    }

    upsertMetaAttr('og:title', 'property', document.title);
    upsertMetaAttr('og:description', 'property', description);
    upsertMetaAttr('og:type', 'property', 'website');
    upsertMetaAttr('og:url', 'property', `${SITE_URL}${window.location.pathname}${window.location.search}`);
    upsertMetaAttr('og:image', 'property', ogImageUrl);
    upsertMetaAttr('og:site_name', 'property', 'Ingenuity Specialized Engineering Works Ltd');

    upsertMetaAttr('twitter:card', 'name', 'summary_large_image');
    upsertMetaAttr('twitter:title', 'name', document.title);
    upsertMetaAttr('twitter:description', 'name', description);
    upsertMetaAttr('twitter:image', 'name', ogImageUrl);

    return () => {
      document.title = previousTitle;
      if (meta) meta.setAttribute("content", previousDescription);
      if (script && script.parentNode) script.parentNode.removeChild(script);
      if (canonicalLink) {
        if (previousCanonical) canonicalLink.setAttribute('href', previousCanonical);
        else if (canonicalLink.parentNode) canonicalLink.parentNode.removeChild(canonicalLink);
      }
      // restore or remove OG/Twitter tags
      metaChanges.forEach(({ element, prev }) => {
        if (prev !== null && prev !== undefined) element.setAttribute('content', prev);
        else if (element.parentNode) element.parentNode.removeChild(element);
      });
    };
  }, [title, description]);
}
