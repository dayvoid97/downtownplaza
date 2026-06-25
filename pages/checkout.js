import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import { useCart } from '../lib/CartContext'

export default function Checkout() {
  const { items, subtotal, tax, total, clearCart } = useCart()
  const router = useRouter()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.firstName) e.firstName = true
    if (!form.lastName) e.lastName = true
    if (!form.phone) e.phone = true
    if (!form.cardName) e.cardName = true
    if (!form.cardNumber || form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = true
    if (!form.expiry) e.expiry = true
    if (!form.cvv || form.cvv.length < 3) e.cvv = true
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    const t = total.toFixed(2)
    const n = items.reduce((s, i) => s + i.qty, 0)
    setTimeout(() => {
      clearCart()
      router.push(`/order-confirmation?total=${t}&count=${n}`)
    }, 700)
  }

  const inp = (field) => ({
    value: form[field],
    onChange: set(field),
    style: errors[field] ? { borderColor: '#dc2626' } : {},
  })

  if (items.length === 0) {
    return (
      <>
        <Head>
          <title>Checkout – Downtown Plaza</title>
        </Head>
        <Navbar />
        <div className="empty" style={{ marginTop: 80 }}>
          <h3>Nothing to check out</h3>
          <p>Add items to your cart first.</p>
          <Link
            href="/"
            className="shop-again-btn"
            style={{ display: 'inline-block', marginTop: 24 }}
          >
            Browse Products
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Checkout – Downtown Plaza</title>
      </Head>
      <Navbar />

      <div className="page-wrapper" style={{ maxWidth: 960 }}>
        <h1 className="page-title">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="checkout-grid">
            {/* ── LEFT COLUMN ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Contact */}
              <div className="form-card">
                <h2>👤 Contact Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input type="text" placeholder="Jane" {...inp('firstName')} />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input type="text" placeholder="Doe" {...inp('lastName')} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input type="tel" placeholder="(405) 555-1234" {...inp('phone')} />
                </div>
              </div>

              {/* Pickup */}
              <div className="form-card">
                <h2>📍 Pickup Location</h2>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '14px 18px',
                    borderRadius: 10,
                    border: '2px solid #6B1A2A',
                    background: '#fdf7f7',
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>🏪</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#6B1A2A', fontSize: '1rem' }}>
                      Downtown Plaza
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Oklahoma City, OK · Ready in ~5 minutes
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="form-card">
                <h2>💳 Payment</h2>
                <div className="form-group">
                  <label>Name on Card *</label>
                  <input type="text" placeholder="Jane Doe" {...inp('cardName')} />
                </div>
                <div className="form-group">
                  <label>Card Number *</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={form.cardNumber}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '').slice(0, 16)
                      const spaced = v.match(/.{1,4}/g)?.join(' ') || v
                      setForm((f) => ({ ...f, cardNumber: spaced }))
                    }}
                    style={errors.cardNumber ? { borderColor: '#dc2626' } : {}}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry *</label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      maxLength={7}
                      value={form.expiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '').slice(0, 4)
                        if (v.length > 2) v = v.slice(0, 2) + ' / ' + v.slice(2)
                        setForm((f) => ({ ...f, expiry: v }))
                      }}
                      style={errors.expiry ? { borderColor: '#dc2626' } : {}}
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV *</label>
                    <input type="text" placeholder="123" maxLength={4} {...inp('cvv')} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Summary ── */}
            <div
              className="order-summary"
              style={{ position: 'sticky', top: 80, alignSelf: 'start' }}
            >
              <h3>Order Summary</h3>
              {items.map((item) => (
                <div key={item.id} className="summary-row" style={{ marginBottom: 8 }}>
                  <span style={{ color: 'var(--text)', flex: 1, paddingRight: 8 }}>
                    {item.name} × {item.qty}
                  </span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border)', marginTop: 12, paddingTop: 12 }}>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Pickup</span>
                  <span style={{ color: '#2D7A3E', fontWeight: 600 }}>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button type="submit" className="place-order-btn" disabled={submitting}>
                {submitting ? 'Placing Order…' : `Place Order · $${total.toFixed(2)}`}
              </button>
              <Link href="/cart" className="continue-btn">
                ← Back to Cart
              </Link>
            </div>
          </div>
        </form>
      </div>

      <footer className="footer">© 2025 Downtown Plaza · Oklahoma City, OK</footer>
    </>
  )
}
