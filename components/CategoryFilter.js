import { AISLES } from '../data/products'

const ICONS = {
  All: '🏪',
  'Medicine Cabinet': '💊',
  'Health & Hygiene': '🧴',
  'Female Hygiene': '🌸',
  'Smokes & Nicotine': '💨',
  Snacks: '🍿',
  Drinks: '🥤',
  'Cold Ones': '🍺',
  'For Pets': '🐾',
  'Household & Cooking': '🏠',
  Accessories: '🎒',
}

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="aisle-nav">
      <p className="aisle-nav__label">Browse by Aisle</p>
      <div className="categories">
        {AISLES.map((aisle) => (
          <button
            key={aisle}
            className={`cat-btn${active === aisle ? ' active' : ''}`}
            onClick={() => onChange(aisle)}
          >
            <span aria-hidden="true">{ICONS[aisle]}</span>
            {aisle}
          </button>
        ))}
      </div>
    </div>
  )
}
