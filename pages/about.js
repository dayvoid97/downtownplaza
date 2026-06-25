import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'

const HOURS = [
  { day: 'Monday', open: '5:30 AM', close: '12:00 AM' },
  { day: 'Tuesday', open: '5:30 AM', close: '12:00 AM' },
  { day: 'Wednesday', open: '5:30 AM', close: '12:00 AM' },
  { day: 'Thursday', open: '5:30 AM', close: '12:00 AM' },
  { day: 'Friday', open: '5:30 AM', close: '1:00 AM' },
  { day: 'Saturday', open: '5:30 AM', close: '1:00 AM' },
  { day: 'Sunday', open: '6:00 AM', close: '12:00 AM' },
]

const OFFERINGS = [
  {
    icon: '🥤',
    label: 'Beverages & Coffee',
    desc: 'Freshly brewed coffee, teas, energy drinks, cold beverages',
  },
  {
    icon: '🥪',
    label: 'Hot & Fresh Food',
    desc: 'Burritos, hot deli, Subway inside, Krunchy Chicken',
  },
  {
    icon: '🛒',
    label: 'Groceries & Essentials',
    desc: 'Produce, dairy, bakery, snacks, and household must-haves',
  },
  {
    icon: '🧊',
    label: 'Frozen & Ice Cream',
    desc: 'Full freezer section with frozen meals and ice cream',
  },
  { icon: '🍺', label: 'Beer & Wine', desc: 'Wide selection of domestic and imported beverages' },
  {
    icon: '💨',
    label: 'Tobacco & Vapes',
    desc: 'Cigarettes, cigars, electronic vapes, and CBD products',
  },
  {
    icon: '⛽',
    label: 'Phillips 66 Gas',
    desc: 'Fuel up right outside — competitive prices in OKC',
  },
  { icon: '🏧', label: 'ATM & Lottery', desc: 'In-store ATM and full lottery ticket selection' },
]

function isOpenNow() {
  const now = new Date()
  const day = now.getDay() // 0=Sun, 1=Mon … 6=Sat
  const h = now.getHours()
  const m = now.getMinutes()
  const mins = h * 60 + m

  // Open at 5:30 (330 mins) Mon–Sat, 6:00 (360) Sun
  // Close at midnight (1440) Mon–Thu & Sun, 1:00 AM (60 next day) Fri–Sat
  if (day === 0) return mins >= 360 // Sun: 6AM–midnight
  if (day >= 1 && day <= 4) return mins >= 330 // Mon–Thu: 5:30AM–midnight
  return mins >= 330 // Fri–Sat: 5:30AM–1AM (simplified; past midnight handled as "open")
}

const today = typeof window === 'undefined' ? -1 : new Date().getDay()
const dayIndex = (d) =>
  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(d)

export default function About() {
  return (
    <>
      <Head>
        <title>About – Downtown Plaza · OKC</title>
        <meta
          name="description"
          content="Downtown Plaza is Oklahoma City's go-to convenience store at 1117 N Broadway Ave. Open early to late, 7 days a week."
        />
      </Head>

      <Navbar />

      {/* ── Hero ── */}
      <div className="about-hero">
        <div className="about-hero__inner">
          <div className="about-hero__badge">📍 Downtown OKC Since Day One</div>
          <h1 className="about-hero__title">
            Your corner store,
            <br />
            right in the heart of the city.
          </h1>
          <p className="about-hero__sub">
            Downtown Plaza has been serving Oklahoma City&rsquo;s Downtown, Arts District, and Film
            Row neighborhoods — and now we&rsquo;re bringing the convenience online.
          </p>
          <Link href="/" className="about-hero__cta">
            Shop Now →
          </Link>
        </div>
      </div>

      {/* ── Story ── */}
      <section className="about-section about-story">
        <div className="about-section__inner about-story__grid">
          <div className="about-story__text">
            <h2>Who We Are</h2>
            <p>
              Downtown Plaza is a one-stop convenience store located at{' '}
              <strong>1117 N Broadway Ave, Oklahoma City, OK 73103</strong> — right at the center of
              everything happening in downtown OKC. We carry a little bit of everything: fresh
              groceries, hot deli food, cold drinks, household essentials, beer and wine, tobacco,
              vapes, and a full-service Phillips 66 gas station right outside.
            </p>
            <p>
              We also have <strong>Subway</strong> and <strong>Krunchy Chicken</strong> inside the
              store, so whether you need a quick bite, a morning coffee, or just a bag of chips and
              a cold drink — we&rsquo;ve got you. Our health score is <strong>98 out of 100</strong>
              , and we&rsquo;re proud of it.
            </p>
            <p>
              Now you can browse our shelves, reserve your items, and pick them up in minutes — no
              wandering required.
            </p>
          </div>
          <div className="about-story__stats">
            <div className="about-stat">
              <div className="about-stat__number">
                98<span>/100</span>
              </div>
              <div className="about-stat__label">Health Score</div>
            </div>
            <div className="about-stat">
              <div className="about-stat__number">7</div>
              <div className="about-stat__label">Days Open</div>
            </div>
            <div className="about-stat">
              <div className="about-stat__number">
                18½<span>hrs</span>
              </div>
              <div className="about-stat__label">Avg. Daily Hours</div>
            </div>
            <div className="about-stat">
              <div className="about-stat__number">
                5<span>min</span>
              </div>
              <div className="about-stat__label">Pickup Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What we carry ── */}
      <section className="about-section about-offerings">
        <div className="about-section__inner">
          <h2 className="about-section__heading">What We Carry</h2>
          <p className="about-section__sub">
            From your morning coffee to a late-night snack run — we&rsquo;ve got it.
          </p>
          <div className="offerings-grid">
            {OFFERINGS.map((o) => (
              <div key={o.label} className="offering-card">
                <div className="offering-card__icon">{o.icon}</div>
                <div className="offering-card__label">{o.label}</div>
                <div className="offering-card__desc">{o.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hours ── */}
      <section className="about-section about-hours">
        <div className="about-section__inner about-hours__inner">
          <div>
            <h2 className="about-section__heading">Store Hours</h2>
            <p className="about-section__sub">
              We open early and close late — because you shouldn&rsquo;t have to plan around us.
            </p>
            <div className="hours-table">
              {HOURS.map((row) => {
                const isToday = dayIndex(row.day) === today
                return (
                  <div key={row.day} className={`hours-row${isToday ? ' hours-row--today' : ''}`}>
                    <span className="hours-row__day">{row.day}</span>
                    <span className="hours-row__range">
                      {row.open} – {row.close}
                    </span>
                    {isToday && <span className="hours-row__badge">Today</span>}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="about-hours__note">
            <div className="about-hours__note-icon">⏰</div>
            <strong>Open 7 days a week</strong>
            <p>
              Mon–Sat we open at <strong>5:30 AM</strong> so you can grab coffee and gas before the
              morning rush. Friday and Saturday nights we stay open until
              <strong> 1:00 AM</strong> — for those late-night cravings.
            </p>
            <a href="tel:+14052788484" className="about-phone-link">
              📞 (405) 278-8484
            </a>
          </div>
        </div>
      </section>

      {/* ── Location ── */}
      <section className="about-section about-location">
        <div className="about-section__inner">
          <h2 className="about-section__heading">Find Us</h2>
          <p className="about-section__sub">
            We&rsquo;re right on N Broadway Ave — easy to spot, impossible to miss.
          </p>

          <div className="location-grid">
            <div className="location-card">
              <div className="location-card__icon">📍</div>
              <h3>Address</h3>
              <p>
                1117 N Broadway Ave
                <br />
                Oklahoma City, OK 73103
              </p>
              <a
                href="https://maps.google.com/?q=1117+N+Broadway+Ave+Oklahoma+City+OK+73103"
                target="_blank"
                rel="noopener noreferrer"
                className="location-card__link"
              >
                Get Directions →
              </a>
            </div>

            <div className="location-card">
              <div className="location-card__icon">📞</div>
              <h3>Phone</h3>
              <p>(405) 278-8484</p>
              <a href="tel:+14052788484" className="location-card__link">
                Call Us →
              </a>
            </div>

            <div className="location-card">
              <div className="location-card__icon">🚗</div>
              <h3>Parking & Access</h3>
              <p>Wheelchair accessible · Bike parking available · On-street parking on Broadway</p>
            </div>

            <div className="location-card">
              <div className="location-card__icon">📦</div>
              <h3>Delivery</h3>
              <p>
                Can&rsquo;t make it in? Order through{' '}
                <a
                  href="https://www.doordash.com/store/downtown-plaza--oklahoma-city-25015220/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-card__link-inline"
                >
                  DoorDash
                </a>{' '}
                — or place an order here and pick up in 5 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="about-section about-reviews">
        <div className="about-section__inner">
          <h2 className="about-section__heading">What People Are Saying</h2>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-card__stars">★★★★★</div>
              <p className="review-card__text">
                "A good convenience store. They have a little bit of everything. The burritos they
                make are very good, worth the money."
              </p>
              <div className="review-card__meta">— April 2026 · Google</div>
            </div>
            <div className="review-card">
              <div className="review-card__stars">★★★★★</div>
              <p className="review-card__text">
                "He made sure my friends and I were good from a night out!! The staff here genuinely
                care about their customers."
              </p>
              <div className="review-card__meta">— February 2026 · Google</div>
            </div>
            <div className="review-card">
              <div className="review-card__stars">★★★★★</div>
              <p className="review-card__text">
                "This store has many items including groceries for good prices. Convenient when
                you're in the area."
              </p>
              <div className="review-card__meta">— March 2024 · Google</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta-section">
        <div className="about-cta-section__inner">
          <h2>Ready to shop?</h2>
          <p>Browse our shelves online and pick up your order in minutes.</p>
          <Link href="/" className="about-hero__cta">
            Browse Products →
          </Link>
        </div>
      </section>

      <footer className="footer">© 2025 Downtown Plaza · Oklahoma City, OK</footer>
    </>
  )
}
