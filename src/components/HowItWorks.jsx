import { ArrowUpRight, Compass, UserRoundPlus, UserRoundCheck, UsersRound } from 'lucide-react'

const steps = [
  {
    icon: UserRoundPlus,
    title: 'Create your account.',
    text: 'Start with the basics and choose how you want to take part in football.',
  },
  {
    icon: UserRoundCheck,
    title: 'Build your football profile.',
    text: 'Share your experience, interests and ambitions with the community.',
  },
  {
    icon: Compass,
    title: 'Discover people, clubs and opportunities.',
    text: 'Explore the football world and find connections that match your goals.',
  },
  {
    icon: UsersRound,
    title: 'Connect with the global football community.',
    text: 'Follow the game, join conversations and grow your network.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section how-section" id="how-it-works">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="kicker">YOUR NEXT MOVE</span>
            <h2>Four steps.<br />A world of football.</h2>
          </div>
          <p>Make your place in the game and start building connections that move you forward.</p>
        </div>
        <div className="steps-grid">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <article className="step-card" key={title}>
              <div className="step-top"><span className="step-icon"><Icon size={20} /></span><span>0{index + 1}</span></div>
              <h3>{title}</h3>
              <p>{text}</p>
              {index < steps.length - 1 && <ArrowUpRight className="step-arrow" size={17} aria-hidden="true" />}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
