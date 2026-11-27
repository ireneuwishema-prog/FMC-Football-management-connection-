export default function ClubLogo({ club, size = 'medium' }) {
  return (
    <span className={`club-identity-mark club-identity-mark-${size}`} style={{ '--club-color': club.color }} aria-hidden="true">
      <span>{club.initials}</span>
    </span>
  )
}
