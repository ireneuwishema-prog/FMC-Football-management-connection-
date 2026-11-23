import { ArrowRight, MessageSquareText, Newspaper, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CommunitySection() {
  return (
    <section className="section community-section">
      <div className="container community-grid">
        <div className="community-content">
          <span className="kicker">THE FMC COMMUNITY</span>
          <h2>More than football.<br />A shared passion.</h2>
          <p>Stay close to the game you love. Follow your favourite clubs and players, get involved in discussions and never miss a story.</p>
          <Link className="button button-dark" to="/community">Enter the community <ArrowRight size={17} /></Link>
        </div>
        <div className="community-cards">
          <article><Newspaper size={21} /><div><span>News & Stories</span><strong>Matchday</strong></div></article>
          <article><Star size={21} /><div><span>Player Watch</span><strong>Rising Stars</strong></div></article>
          <article><MessageSquareText size={21} /><div><span>Active Discussion</span><strong>Transfer Talk</strong></div></article>
        </div>
      </div>
    </section>
  )
}
