import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'

function generateOrderId() {
  return 'DTP-' + Math.random().toString(36).substring(2, 8).toUpperCase()
}

export default function OrderConfirmation() {
  const { query } = useRouter()
  const total = query.total || '—'
  const count = query.count || '—'
  const orderId = generateOrderId()

  const eta = new Date(Date.now() + 5 * 60 * 1000)
  const etaStr = eta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      <Head>
        <title>Order Confirmed – Downtown Plaza</title>
      </Head>
      <Navbar />

      <div className="confirm-wrap">
        <div className="confirm-icon">✅</div>

        <h1>Order Confirmed!</h1>
        <p>
          Your order is being prepared at <strong>Downtown Plaza · OKC</strong>.<br />
          Head over — it'll be ready by <strong>{etaStr}</strong> (~5 minutes).
        </p>

        <div className="confirm-card">
          <h3>Order Details</h3>
          <div className="confirm-row">
            <span>Order ID</span>
            <span style={{ fontWeight: 700, color: '#6B1A2A' }}>{orderId}</span>
          </div>
          <div className="confirm-row">
            <span>Items</span>
            <span>
              {count} item{count !== '1' ? 's' : ''}
            </span>
          </div>
          <div className="confirm-row">
            <span>Status</span>
            <span
              style={{
                background: '#fdf7f7',
                color: '#6B1A2A',
                padding: '2px 10px',
                borderRadius: 12,
                fontWeight: 600,
                fontSize: '0.85rem',
                border: '1px solid #6B1A2A',
              }}
            >
              Being prepared 🏪
            </span>
          </div>
          <div className="confirm-row">
            <span>Est. Ready By</span>
            <span>{etaStr}</span>
          </div>
          <div className="confirm-row total">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>

        <div className="confirm-card">
          <h3>What's Next</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: '0.92rem' }}>
              <span style={{ fontSize: '1.2rem' }}>📱</span>
              <span>Show your Order ID at the Downtown Plaza counter.</span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: '0.92rem' }}>
              <span style={{ fontSize: '1.2rem' }}>💳</span>
              <span>Pay at pickup — cash or card accepted.</span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: '0.92rem' }}>
              <span style={{ fontSize: '1.2rem' }}>⏱</span>
              <span>Your order will be bagged and waiting for you.</span>
            </div>
          </div>
        </div>

        <Link href="/" className="shop-again-btn">
          ← Shop Again
        </Link>
      </div>

      <footer className="footer">© 2025 Downtown Plaza · Oklahoma City, OK</footer>
    </>
  )
}
