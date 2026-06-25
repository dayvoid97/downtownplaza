import { useState, useEffect, useRef } from 'react'
import { AISLES } from '../data/products'

const NOTIFY_AISLES = [...AISLES.filter((a) => a !== 'All'), 'Other / Not sure']

export default function RequestProduct({ initialProduct = '' }) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  // Step 1 fields
  const [name, setName] = useState(initialProduct)
  const [category, setCategory] = useState('')
  const [details, setDetails] = useState('')

  // Media
  const [mediaItems, setMediaItems] = useState([]) // { previewUrl|null, type, name }
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  // Step 2 fields
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [instagram, setInstagram] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [contactError, setContactError] = useState(false)

  // Sync when parent query changes (empty-state usage)
  useEffect(() => {
    setName(initialProduct)
    setOpen(!!initialProduct)
    setStep(1)
    setSubmitted(false)
    setContactError(false)
    setMediaItems((prev) => {
      prev.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl)
      })
      return []
    })
  }, [initialProduct])

  // ── Media helpers ──────────────────────────────────────────
  const addFiles = (fileList) => {
    const valid = Array.from(fileList).filter(
      (f) => f.type.startsWith('image/') || f.type.startsWith('video/')
    )
    const items = valid.map((f) => ({
      previewUrl: f.type.startsWith('image/') ? URL.createObjectURL(f) : null,
      type: f.type.startsWith('image/') ? 'image' : 'video',
      name: f.name,
    }))
    setMediaItems((prev) => [...prev, ...items].slice(0, 5))
  }

  const removeMedia = (idx) => {
    setMediaItems((prev) => {
      if (prev[idx]?.previewUrl) URL.revokeObjectURL(prev[idx].previewUrl)
      return prev.filter((_, i) => i !== idx)
    })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    addFiles(e.dataTransfer.files)
  }

  // ── Form actions ───────────────────────────────────────────
  const reset = () => {
    setOpen(false)
    setStep(1)
    setSubmitted(false)
    setName(initialProduct)
    setCategory('')
    setDetails('')
    setMediaItems((prev) => {
      prev.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl)
      })
      return []
    })
    setEmail('')
    setPhone('')
    setInstagram('')
    setTiktok('')
    setContactError(false)
  }

  const handleStep2Submit = (e) => {
    e.preventDefault()
    if (!email && !phone && !instagram && !tiktok) {
      setContactError(true)
      return
    }
    setContactError(false)
    setSubmitted(true)
  }

  // ── Success ────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="request-section">
        <div className="request-success">
          <div className="request-success__icon">✅</div>
          <h3>You're on the list!</h3>
          <p>
            We've logged your request for <strong>{name}</strong>
            {mediaItems.length > 0 &&
              ` along with ${mediaItems.length} ${
                mediaItems.length === 1 ? 'photo' : 'media file'
              }${mediaItems.length > 1 ? 's' : ''}`}
            . The moment it hits the shelves at Downtown Plaza, we'll reach out on the channel you
            gave us.
          </p>
          <button className="back-btn" onClick={reset}>
            ← Back to browsing
          </button>
        </div>
      </div>
    )
  }

  // ── Collapsed CTA ──────────────────────────────────────────
  if (!open) {
    return (
      <div className="request-section">
        <div
          className="request-cta"
          role="button"
          tabIndex={0}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
        >
          <div className="request-cta__left">
            <div className="request-cta__icon-wrap">💡</div>
            <div>
              <div className="request-cta__title">Don't see what you're looking for?</div>
              <div className="request-cta__sub">
                Request a product — we'll stock it and notify you when it arrives.
              </div>
            </div>
          </div>
          <span className="request-cta__btn">Request a product →</span>
        </div>
      </div>
    )
  }

  // ── Expanded form ──────────────────────────────────────────
  return (
    <div className="request-section">
      <div className="request-form-card">
        <div className="request-form__header">
          <div>
            <div className="request-form__title">
              {step === 1 ? 'Request a product' : 'How do we reach you?'}
            </div>
            <div className="request-form__step">Step {step} of 2</div>
          </div>
          <button className="request-form__close" onClick={reset} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="request-progress">
          <div className="request-progress__fill" style={{ width: step === 1 ? '50%' : '100%' }} />
        </div>

        {/* ── Step 1: product info + media ── */}
        {step === 1 && (
          <form
            className="request-form__body"
            onSubmit={(e) => {
              e.preventDefault()
              setStep(2)
            }}
          >
            <div className="form-group">
              <label htmlFor="req-name">Product name *</label>
              <input
                id="req-name"
                type="text"
                required
                placeholder="e.g. Monster Energy Zero Sugar"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="req-category">Preferred aisle</label>
              <select
                id="req-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Pick a category…</option>
                {NOTIFY_AISLES.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="req-details">Details (optional)</label>
              <textarea
                id="req-details"
                placeholder="Brand, size, flavor — anything helpful…"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={2}
              />
            </div>

            {/* ── Media upload ── */}
            <div className="form-group">
              <label>
                Photos or videos
                <span className="req-label-hint">— show us exactly what you mean (up to 5)</span>
              </label>

              {/* Drop zone (hidden once files are added) */}
              {mediaItems.length === 0 && (
                <div
                  className={`upload-zone${dragOver ? ' upload-zone--active' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragOver(true)
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                >
                  <div className="upload-zone__icon">📎</div>
                  <div className="upload-zone__label">
                    <strong>Drop files here</strong> or click to browse
                  </div>
                  <div className="upload-zone__sub">Images &amp; videos accepted</div>
                </div>
              )}

              {/* Preview grid */}
              {mediaItems.length > 0 && (
                <div className="media-previews">
                  {mediaItems.map((item, idx) => (
                    <div key={idx} className="media-preview-item">
                      {item.type === 'image' ? (
                        <img
                          src={item.previewUrl}
                          alt={item.name}
                          className="media-preview-item__img"
                        />
                      ) : (
                        <div className="media-preview-video">
                          <span className="media-preview-video__icon">🎬</span>
                          <span className="media-preview-video__name">
                            {item.name.length > 14 ? item.name.slice(0, 12) + '…' : item.name}
                          </span>
                        </div>
                      )}
                      <button
                        type="button"
                        className="media-preview-item__remove"
                        onClick={() => removeMedia(idx)}
                        aria-label={`Remove ${item.name}`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {/* Add more tile */}
                  {mediaItems.length < 5 && (
                    <div
                      className="media-preview-add"
                      onClick={() => fileInputRef.current?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                      aria-label="Add more files"
                    >
                      <span className="media-preview-add__icon">+</span>
                      <span className="media-preview-add__label">Add more</span>
                    </div>
                  )}
                </div>
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                style={{ display: 'none' }}
                onChange={(e) => {
                  addFiles(e.target.files)
                  e.target.value = ''
                }}
              />
            </div>

            <button type="submit" className="request-next-btn">
              Next — how do we reach you? →
            </button>
          </form>
        )}

        {/* ── Step 2: contact ── */}
        {step === 2 && (
          <form className="request-form__body" onSubmit={handleStep2Submit}>
            <p className="request-form__hint">
              Fill in at least one — we'll hit you up on whichever channel you prefer the moment
              your product lands in store.
            </p>

            {contactError && (
              <p className="request-form__error">Please provide at least one way to reach you.</p>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="req-email">📧 Email</label>
                <input
                  id="req-email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setContactError(false)
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="req-phone">📱 Phone / SMS</label>
                <input
                  id="req-phone"
                  type="tel"
                  placeholder="(405) 555-0000"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    setContactError(false)
                  }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="req-ig">Instagram</label>
                <div className="input-prefix-wrap">
                  <span className="input-prefix">@</span>
                  <input
                    id="req-ig"
                    type="text"
                    placeholder="yourhandle"
                    className="input-with-prefix"
                    value={instagram}
                    onChange={(e) => {
                      setInstagram(e.target.value)
                      setContactError(false)
                    }}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="req-tt">TikTok</label>
                <div className="input-prefix-wrap">
                  <span className="input-prefix">@</span>
                  <input
                    id="req-tt"
                    type="text"
                    placeholder="yourhandle"
                    className="input-with-prefix"
                    value={tiktok}
                    onChange={(e) => {
                      setTiktok(e.target.value)
                      setContactError(false)
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="request-form__actions">
              <button type="button" className="back-btn" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button type="submit" className="request-next-btn request-next-btn--submit">
                Submit request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
