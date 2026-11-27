import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DashboardAccessAction({ to, onClick, title, description }) {
  const content = (
    <>
      <span><strong>{title}</strong><small>{description}</small></span>
      <ArrowUpRight size={18} />
    </>
  )

  return to
    ? <Link className="dashboard-access-action" to={to}>{content}</Link>
    : <button type="button" className="dashboard-access-action" onClick={onClick}>{content}</button>
}
