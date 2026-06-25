import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import { useCart } from '../lib/CartContext'

export default function CartPage() {
  const { items, removeFromCart, updateQty, subtotal, tax, total } = useCart()
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Cart – Downtown Plaza</title>
      </Head>
      <Navbar />

      <div className="page-wrapper">
        <h1 className="page-title">🛒 Your Cart</h1>

        {items.length === 0 ? (
          <div className="empty">
            <h3>Your cart is empty</h3>
            <p>Add some items from the store to get started.</p>
            <br />
            <Link
              href="/"
              className="shop-again-btn"
              style={{ display: 'inline-block', marginTop: 16 }}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      layout="fill"
                      style={{ objectFit: 'cover', borderRadius: 8 }}
                    />
                  </div>

                  <div className="cart-item__info">
                    <div className="cart-item__name">{item.name}</div>
                    <div className="cart-item__cat">{item.category}</div>
                  </div>

                  <div className="cart-item__controls">
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>
                      −
                    </button>
                    <span className="qty-val">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>
                      +
                    </button>
                  </div>

                  <div className="cart-item__price">${(item.price * item.qty).toFixed(2)}</div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery / Pickup</span>
                <span style={{ color: 'var(--green-mid)', fontWeight: 600 }}>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className="checkout-btn" onClick={() => router.push('/checkout')}>
                Proceed to Checkout →
              </button>
              <Link href="/" className="continue-btn">
                ← Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>

      <footer className="footer">© 2025 Downtown Plaza · Oklahoma City, OK</footer>
    </>
  )
}
