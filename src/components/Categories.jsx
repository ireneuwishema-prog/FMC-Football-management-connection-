import * as Icons from 'lucide-react'
import { Link } from 'react-router-dom'
import { categoryData } from '../data/sampleData'

export default function Categories() {
  return (
    <section className="section categories-section">
      <div className="container">
        <div className="section-heading compact">
          <div><span className="kicker">ONE GLOBAL ECOSYSTEM</span><h2>Football belongs to everyone.</h2></div>
          <p>One platform. Every role in the game.</p>
        </div>
        <div className="category-grid">
          {categoryData.map((item) => {
            const Icon = Icons[item.icon]
            return (
              <Link className="category-card" to={item.path} key={item.title}>
                <div className="category-top"><span className="category-icon"><Icon size={21} /></span><span>{item.audience}</span></div>
                <h3>{item.title}</h3><p>{item.text}</p>
                <span className="card-arrow"><Icons.ArrowUpRight size={17} /></span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
