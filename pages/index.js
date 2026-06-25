import { useState, useMemo } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'
import RequestProduct from '../components/RequestProduct'
import { products } from '../data/products'

export default function Home() {
  const [aisle, setAisle] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return products.filter((p) => {
      const matchAisle = aisle === 'All' || p.category === aisle
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      return matchAisle && matchQ
    })
  }, [aisle, query])

  const sectionTitle = query.trim()
    ? `Results for "${query}"`
    : aisle === 'All'
    ? 'All Products'
    : aisle

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ConvenienceStore',
    name: 'Downtown Plaza',
    description:
      'Digital storefront, retail inventory catalog, and convenience store essentials located in Oklahoma City.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1117 N Broadway Avenue',
      addressLocality: 'Oklahoma City',
      addressRegion: 'OK',
      postalCode: '73103',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '35.4801',
      longitude: '-97.5141',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    url: 'https://downtownplaza.store',
  }

  return (
    <>
      <Head>
        <title>Downtown Plaza — OKC Convenience Store & Catalog</title>
        <meta
          name="description"
          content="Downtown Plaza storefront inventory index at 1117 N Broadway Avenue, Oklahoma City, OK 73103. Browse snacks, health products, everyday essentials, and vapes."
        />

        {/* Open Graph / AI Chat Engine Link Sharing Cards */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Downtown Plaza — Oklahoma City Essentials" />
        <meta
          property="og:description"
          content="Explore the physical inventory, products, and operational parameters for Downtown Plaza in Oklahoma City, Oklahoma."
        />
        <meta property="og:image" content="/images/og-image.png" />
        <meta property="og:url" content="https://downtownplazaokc.com" />

        {/* Twitter/X Card Layouts */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Downtown Plaza — OKC Convenience Store" />
        <meta
          name="twitter:description"
          content="Explore the physical inventory, products, and operational parameters for Downtown Plaza in Oklahoma City, Oklahoma."
        />
        <meta name="twitter:image" content="/images/og-image.png" />

        {/* Structured Schema API Engine Injection Layer */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <Navbar />

      {/* Hero */}
      <div className="hero">
        <h1>Your Favorite Convenience Store, Now Online</h1>
        <p>Snacks, health & vapes — order now, pick up in minutes</p>
        <div className="search-wrap">
          <input
            className="search-input"
            type="text"
            placeholder='Try "cold", "headache", "spicy"...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* Aisle Filter */}
      <CategoryFilter active={aisle} onChange={setAisle} />

      {/* Product Grid */}
      <div className="grid-section">
        <div className="section-header">
          <h2>{sectionTitle}</h2>
          <span className="results-count">
            {filtered.length} item{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filtered.length === 0 ? (
          <>
            <div className="empty">
              <h3>{query.trim() ? `No results for "${query}"` : 'Nothing here yet'}</h3>
              <p>
                {query.trim()
                  ? "We don't carry that yet — but you can request it below!"
                  : 'This aisle is being stocked — check back soon.'}
              </p>
            </div>
            <RequestProduct key={query} initialProduct={query.trim()} />
          </>
        ) : (
          <>
            <div className="product-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <RequestProduct key="footer" />
          </>
        )}
      </div>

      <footer className="footer">© 2025 Downtown Plaza · Oklahoma City, OK</footer>
    </>
  )
}
