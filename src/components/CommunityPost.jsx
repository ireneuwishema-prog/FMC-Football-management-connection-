import { useState } from 'react'
import { BadgeCheck, Bookmark, Check, Heart, MessageCircle, MoreHorizontal, Send, Share2 } from 'lucide-react'
import { communityAccounts } from '../data/communityData'

export default function CommunityPost({ post, author, currentUser, onLike, onAddComment }) {
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [shared, setShared] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [saved, setSaved] = useState(false)

  function submitComment(event) {
    event.preventDefault()
    const text = commentText.trim()
    if (!text) return
    onAddComment(post.id, text)
    setCommentText('')
    setCommentsOpen(true)
  }

  return (
    <article className="community-post-card">
      <header className="community-post-header">
        <img className="community-post-avatar" src={author.image} alt={author.name} loading="lazy" />
        <div className="community-post-author">
          <div className="community-post-name">
            <strong>{author.name}</strong>
            {author.verified && <BadgeCheck size={15} aria-label="Demonstration verified account" />}
            <span className="community-post-type">{author.type}</span>
          </div>
          <span className="community-post-meta">{author.handle} <span>·</span> {post.time}</span>
        </div>
        <div className="community-post-menu-wrap">
          <button className="community-post-more" type="button" onClick={() => setMoreOpen(open => !open)} aria-label="More post options" aria-expanded={moreOpen} title="More post options"><MoreHorizontal size={19} /></button>
          {moreOpen && <div className="community-post-menu"><button type="button" onClick={() => setSaved(value => !value)}>{saved ? <Check size={14} /> : <Bookmark size={14} />}{saved ? 'Saved for later' : 'Save post'}</button></div>}
        </div>
      </header>

      <div className="community-post-content">
        <span className="community-post-category">{post.category}</span>
        <p>{post.content}</p>
        {post.image && <img className="community-post-image" src={post.image.src || post.image} alt={post.image.alt || post.imageAlt || 'Football community post'} loading="lazy" />}
        {post.topics?.length > 0 && (
          <div className="community-post-topics">
            {post.topics.map(topic => <span key={topic}>#{topic.replace('-', '')}</span>)}
          </div>
        )}
      </div>

      <div className="community-post-actions">
        <button type="button" className={post.liked ? 'is-liked' : ''} onClick={() => onLike(post.id)} aria-pressed={post.liked} aria-label={`${post.liked ? 'Unlike' : 'Like'} post by ${author.name}`}>
          <Heart size={17} fill={post.liked ? 'currentColor' : 'none'} /> <span>{post.likes}</span>
        </button>
        <button type="button" className={commentsOpen ? 'is-active' : ''} onClick={() => setCommentsOpen(open => !open)} aria-expanded={commentsOpen}>
          <MessageCircle size={17} /><span>{post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}</span>
        </button>
        <button type="button" className={shared ? 'is-active' : ''} onClick={() => setShared(value => !value)} aria-pressed={shared}>
          <Share2 size={16} /><span>{shared ? 'Shared' : 'Share'}</span>
        </button>
      </div>

      {shared && <p className="community-share-feedback" role="status">Shared in your FMC community demo.</p>}

      {commentsOpen && (
        <section className="community-comments" aria-label={`Comments on ${author.name}'s post`}>
          {post.comments.map(comment => (
            <div className="community-comment" key={comment.id}>
              {comment.author === currentUser.name
                ? <img src={currentUser.image} alt="" />
                : (() => {
                    const commenter = communityAccounts.find(account => account.name === comment.author)
                    return commenter ? <img src={commenter.image} alt="" /> : <span className="community-comment-avatar">{comment.author.slice(0, 1)}</span>
                  })()}
              <div><strong>{comment.author}</strong><p>{comment.text}</p><span>{comment.time}</span></div>
            </div>
          ))}
          <form className="community-comment-form" onSubmit={submitComment}>
            <img src={currentUser.image} alt="" />
            <label className="visually-hidden" htmlFor={`comment-${post.id}`}>Write a comment</label>
            <input id={`comment-${post.id}`} value={commentText} onChange={event => setCommentText(event.target.value)} placeholder="Add to the conversation..." />
            <button type="submit" disabled={!commentText.trim()} aria-label="Post comment"><Send size={15} /></button>
          </form>
        </section>
      )}
    </article>
  )
}
