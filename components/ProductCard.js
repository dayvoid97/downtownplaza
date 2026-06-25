import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '../lib/CartContext'

export default function ProductCard({ product }) {
  const { addToCart, items } = useCart()
  const [flash, setFlash] = useState(false)

  const inCart = items.some((i) => i.id === product.id)

  const handleAdd = (e) => {
    e.preventDefault() // don't navigate when clicking Add button
    addToCart(product)
    setFlash(true)
    setTimeout(() => setFlash(false), 800)
  }

  return (
    <Link href={`/product/${product.id}`} className="product-card">
      <span>
        <div className="product-card__img-wrap">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
          />
          <span className="product-card__badge">{product.category}</span>
        </div>

        <div className="product-card__body">
          <div className="product-card__name">{product.name}</div>
          <div className="product-card__desc">{product.desc}</div>
          <div className="product-card__footer">
            <span className="product-card__price">${product.price.toFixed(2)}</span>
            <button className={`add-btn${flash ? ' added' : ''}`} onClick={handleAdd}>
              {flash ? '✓ Added' : inCart ? '+ More' : 'Add'}
            </button>
          </div>
        </div>
      </span>
    </Link>
  )
}
