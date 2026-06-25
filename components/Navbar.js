import Link from 'next/link'
import { useCart } from '../lib/CartContext'

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link href="/" className="navbar__logo">
          <span>
            <span>Downtown</span>Plaza
            <div className="navbar__tagline">Conveniently located, online</div>
          </span>
        </Link>
        <div className="navbar__right">
          <Link href="/" className="navbar__link">
            Shop
          </Link>
          <Link href="/about" className="navbar__link">
            About
          </Link>
          <Link href="/cart" className="cart-btn">
            <span>
              🛒 Cart
              {totalItems > 0 && <span className="cart-btn__badge">{totalItems}</span>}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
