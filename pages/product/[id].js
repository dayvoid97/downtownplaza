import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import { useCart } from '../../lib/CartContext'
import { products } from '../../data/products'

export default function ProductPage({ product, related }) {
  const [qty, setQty] = useState(1)
  const [flash, setFlash] = useState(false)
  const { addToCart, items } = useCart()
  const router = useRouter()

  const inCart = items.some((i) => i.id === product.id)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product)
    setFlash(true)
    setTimeout(() => setFlash(false), 1000)
  }

  const lineTotal = (product.price * qty).toFixed(2)

  return (
    <>
      <Head>
        <title>{product.name} – Downtown Plaza</title>
        <meta name="description" content={product.desc} />
      </Head>

      <Navbar />

      <div className="product-detail">
        {/* ── Back ── */}
        <div className="product-detail__back">
          <button className="back-btn" onClick={() => router.back()}>
            ← Back
          </button>
        </div>

        {/* ── Hero image ── */}
        <div className="product-detail__img-wrap">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
          <span className="product-detail__badge">{product.category}</span>
        </div>

        {/* ── Info ── */}
        <div className="product-detail__body">
          <div className="product-detail__header">
            <h1 className="product-detail__name">{product.name}</h1>
            <span className="product-detail__price">${product.price.toFixed(2)}</span>
          </div>

          <p className="product-detail__desc">{product.desc}</p>

          {/* ── Qty + Add ── */}
          <div className="product-detail__actions">
            <div className="qty-control">
              <button
                className="qty-btn"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="qty-val">{qty}</span>
              <button
                className="qty-btn"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button className={`add-btn-lg${flash ? ' added' : ''}`} onClick={handleAdd}>
              {flash
                ? '✓ Added to Cart'
                : inCart
                ? `Add More — $${lineTotal}`
                : `Add to Cart — $${lineTotal}`}
            </button>
          </div>
        </div>

        {/* ── Related ── */}
        {related.length > 0 && (
          <div className="product-detail__related">
            <h2 className="related-title">You might also like</h2>
            <div className="related-grid">
              {related.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="related-card">
                  <div className="related-card__img">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="200px"
                      priority
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="related-card__name">{p.name}</div>
                  <div className="related-card__price">${p.price.toFixed(2)}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="footer">© 2025 Downtown Plaza · Oklahoma City, OK</footer>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: products.map((p) => ({ params: { id: String(p.id) } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const rawProduct = products.find((p) => p.id === Number(params.id))
  if (!rawProduct) return { notFound: true }

  // Helper function to dynamically map old API string paths to your clean public folder structure
  const cleanImagePath = (oldUrl) => {
    return oldUrl
      .replace('/api/img/', '/images/') // Changes API lookups to your local assets
      .replace('%20', '') // Removes encoded space
      .replace(' ', '') // Removes standard space
  }

  const product = {
    ...rawProduct,
    image: cleanImagePath(rawProduct.image),
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)
    .map((p) => ({
      ...p,
      image: cleanImagePath(p.image), // Automate it for the related section too
    }))

  return { props: { product, related } }
}
