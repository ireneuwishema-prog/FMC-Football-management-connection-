import { useMemo, useState } from 'react'
import {
  ArrowRight, BadgeCheck, Bookmark, Check, ChevronDown, Compass, Hash,
  Home, ImagePlus, MapPin, MessageCircle, Plus, Send, Sparkles, Trophy, Users,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CommunityPost from '../components/CommunityPost'
import {
  communityAccounts, communityCategories, communityClubs, communityPosts,
  communityTopics, currentCommunityUser, followedAccountIds, followedClubIds, samplePostImages,
} from '../data/communityData'

const initialPostFeed = communityPosts.map(post => ({ ...post, comments: [...post.comments] }))

function CommunitySidebar({ activeFeed, setActiveFeed, followedAccounts, toggleFollowAccount }) {
  return (
    <aside className="community-left-rail">
      <section className="community-rail-card community-nav-card">
        <span className="community-rail-label">YOUR COMMUNITY</span>
        <nav className="community-side-nav" aria-label="Community feed navigation">
          <button type="button" className={activeFeed === 'all' ? 'active' : ''} onClick={() => setActiveFeed('all')}><Home size={17} />For you</button>
          <button type="button" className={activeFeed === 'following' ? 'active' : ''} onClick={() => setActiveFeed('following')}><Users size={17} />Following</button>
          <button type="button" className={activeFeed === 'my-posts' ? 'active' : ''} onClick={() => setActiveFeed('my-posts')}><Bookmark size={17} />My posts</button>
        </nav>
      </section>

      <section className="community-rail-card followed-card">
        <div className="community-rail-heading"><h2>Following</h2><span>{followedAccounts.length}</span></div>
        {followedAccounts.length ? (
          <div className="community-following-list">
            {followedAccounts.map(account => (
              <div className="community-following-person" key={account.id}>
                <img src={account.image} alt="" loading="lazy" />
                <button type="button" onClick={() => setActiveFeed('following')} title={`View posts from ${account.name}`}><strong>{account.name}</strong><small>{account.type}</small></button>
                <button className="community-unfollow-icon" type="button" onClick={() => toggleFollowAccount(account.id)} aria-label={`Unfollow ${account.name}`} title={`Unfollow ${account.name}`}><Check size={14} /></button>
              </div>
            ))}
          </div>
        ) : <p className="community-rail-empty">Follow people to see them here.</p>}
        <button type="button" className="community-small-link" onClick={() => setActiveFeed('following')}>See your feed <ArrowRight size={14} /></button>
      </section>

      <div className="community-left-note"><Sparkles size={16} /><span>Good conversations make the game bigger. Keep it respectful.</span></div>
    </aside>
  )
}

function CommunityComposer({ onPublish }) {
  const [content, setContent] = useState('')
  const [category, setCategory] = useState(communityCategories[0])
  const [imageIndex, setImageIndex] = useState(null)

  function cycleImage() {
    setImageIndex(index => index === null ? 0 : (index + 1) % samplePostImages.length)
  }

  function publish(event) {
    event.preventDefault()
    const text = content.trim()
    if (!text) return
    onPublish({ content: text, category, image: imageIndex === null ? null : samplePostImages[imageIndex] })
    setContent('')
    setImageIndex(null)
    setCategory(communityCategories[0])
  }

  return (
    <form className="community-composer" onSubmit={publish}>
      <div className="community-composer-top">
        <img src={currentCommunityUser.image} alt="" />
        <label className="visually-hidden" htmlFor="community-post-input">Write a community post</label>
        <textarea id="community-post-input" value={content} onChange={event => setContent(event.target.value)} placeholder="Share a thought from your side of the game..." rows={3} maxLength={500} />
      </div>
      {imageIndex !== null && (
        <div className="community-composer-preview">
          <img src={samplePostImages[imageIndex].src} alt={samplePostImages[imageIndex].alt} />
          <button type="button" onClick={() => setImageIndex(null)} aria-label="Remove image preview">×</button>
          <span>Sample image preview</span>
        </div>
      )}
      <div className="community-composer-footer">
        <div className="community-composer-tools">
          <label className="community-category-select">
            <span className="visually-hidden">Post category</span>
            <select value={category} onChange={event => setCategory(event.target.value)} aria-label="Post category">
              {communityCategories.map(item => <option key={item}>{item}</option>)}
            </select>
            <ChevronDown size={14} />
          </label>
          <button className="community-add-image" type="button" onClick={cycleImage}><ImagePlus size={16} /><span>{imageIndex === null ? 'Add image' : 'Change image'}</span></button>
          <span className="community-character-count">{content.length}/500</span>
        </div>
        <button className="community-publish-button" type="submit" disabled={!content.trim()}><Send size={15} />Post</button>
      </div>
    </form>
  )
}

function SuggestedAccounts({ followedIds, onToggleFollow }) {
  const suggestions = communityAccounts.filter(account => !followedIds.includes(account.id)).slice(0, 3)
  return (
    <section className="community-rail-card community-suggestions">
      <div className="community-rail-heading"><h2>People to know</h2><Compass size={16} /></div>
      {suggestions.map(account => (
        <article className="community-suggestion" key={account.id}>
          <img src={account.image} alt={account.name} loading="lazy" />
          <div className="community-suggestion-copy">
            <strong>{account.name}{account.verified && <BadgeCheck size={13} aria-label="Demonstration verified account" />}</strong>
            <span>{account.type} · {account.country}</span>
          </div>
          <button type="button" className="community-follow-button" onClick={() => onToggleFollow(account.id)} aria-label={`Follow ${account.name}`}><Plus size={15} />Follow</button>
        </article>
      ))}
      {!suggestions.length && <p className="community-rail-empty">You’re following everyone in today’s suggestions.</p>}
      <a className="community-small-link" href="#community-feed">Explore the feed <ArrowRight size={14} /></a>
    </section>
  )
}

function PopularClubs({ followedIds, onToggleFollow }) {
  return (
    <section className="community-rail-card community-popular-clubs">
      <div className="community-rail-heading"><h2>Clubs in the conversation</h2><Trophy size={16} /></div>
      {communityClubs.map(club => {
        const following = followedIds.includes(club.id)
        return (
          <article className="community-club-row" key={club.id}>
            <span className="community-club-mark" style={{ '--club-color': club.color }}>{club.initials}</span>
            <div className="community-club-copy"><strong>{club.name}</strong><span>{club.location}</span><small>{club.followers} followers</small></div>
            <button type="button" className={following ? 'community-club-follow following' : 'community-club-follow'} onClick={() => onToggleFollow(club.id)} aria-label={`${following ? 'Unfollow' : 'Follow'} ${club.name}`} aria-pressed={following}>{following ? <Check size={14} /> : <Plus size={14} />}</button>
          </article>
        )
      })}
      <a className="community-small-link" href="#community-feed">More football clubs <ArrowRight size={14} /></a>
    </section>
  )
}

function CommunityRightRail({ topics, activeTopic, onSelectTopic, followedAccountIdsState, onToggleFollow, followedClubIdsState, onToggleClub }) {
  return (
    <aside className="community-right-rail">
      <section className="community-rail-card community-trending">
        <div className="community-rail-heading"><h2>Trending now</h2><Hash size={16} /></div>
        {topics.map((topic, index) => (
          <button type="button" key={topic.id} className={`community-trending-topic${activeTopic === topic.id ? ' active' : ''}`} onClick={() => onSelectTopic(activeTopic === topic.id ? null : topic.id)}>
            <span className="community-trending-number">0{index + 1}</span><span className="community-trending-copy"><strong>#{topic.label}</strong><small>{topic.posts} · worldwide</small></span><ArrowRight size={14} />
          </button>
        ))}
        {activeTopic && <button className="community-clear-topic" type="button" onClick={() => onSelectTopic(null)}>Clear topic filter</button>}
      </section>
      <SuggestedAccounts followedIds={followedAccountIdsState} onToggleFollow={onToggleFollow} />
      <PopularClubs followedIds={followedClubIdsState} onToggleFollow={onToggleClub} />
      <div className="community-demo-note"><MapPin size={14} /><span>Community profiles and activity are fictional demonstrations.</span></div>
    </aside>
  )
}

export default function CommunityPage() {
  const [posts, setPosts] = useState(initialPostFeed)
  const [activeFeed, setActiveFeed] = useState('all')
  const [activeTopic, setActiveTopic] = useState(null)
  const [accountFollows, setAccountFollows] = useState(followedAccountIds)
  const [clubFollows, setClubFollows] = useState(followedClubIds)
  const followedAccounts = useMemo(() => communityAccounts.filter(account => accountFollows.includes(account.id)), [accountFollows])

  const visiblePosts = useMemo(() => posts.filter(post => {
    const belongsToFollowing = accountFollows.includes(post.authorId) || clubFollows.includes(post.authorId)
    const matchesFeed = activeFeed === 'all' || (activeFeed === 'following' && belongsToFollowing) || (activeFeed === 'my-posts' && post.authorId === currentCommunityUser.id)
    return matchesFeed && (!activeTopic || post.topics.includes(activeTopic))
  }), [posts, activeFeed, activeTopic, accountFollows, clubFollows])

  function toggleFollow(setFollowState, id) {
    setFollowState(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  }

  function publishPost({ content, category, image }) {
    const newPost = {
      id: `community-${Date.now()}`, authorId: currentCommunityUser.id, time: 'Just now', category,
      content, image, topics: [], likes: 0, liked: false, comments: [],
    }
    setPosts(current => [newPost, ...current])
    setActiveFeed('all')
    setActiveTopic(null)
  }

  function toggleLike(postId) {
    setPosts(current => current.map(post => post.id === postId
      ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) }
      : post))
  }

  function addComment(postId, text) {
    const comment = { id: `comment-${Date.now()}`, author: currentCommunityUser.name, text, time: 'Just now' }
    setPosts(current => current.map(post => post.id === postId ? { ...post, comments: [...post.comments, comment] } : post))
  }

  return (
    <>
      <Navbar />
      <main className="community-page">
        <div className="container">
          <header className="community-page-heading">
            <div><span className="kicker">ONE GLOBAL GAME</span><h1>Football is better <em>together.</em></h1><p>Meet the people behind the game. Share what you see, learn from every perspective and find your football community.</p></div>
            <div className="community-page-badge"><Users size={17} /><span><strong>Every role. Every level.</strong><small>One global football community</small></span></div>
          </header>

          <div className="community-layout">
            <CommunitySidebar
              activeFeed={activeFeed}
              setActiveFeed={feed => { setActiveFeed(feed); setActiveTopic(null) }}
              followedAccounts={followedAccounts}
              toggleFollowAccount={id => toggleFollow(setAccountFollows, id)}
            />
            <section className="community-main-column" id="community-feed" aria-label="Football community feed">
              <CommunityComposer onPublish={publishPost} />
              <div className="community-feed-heading">
                <div><span className="kicker">{activeFeed === 'following' ? 'YOUR NETWORK' : activeFeed === 'my-posts' ? 'YOUR CONTRIBUTIONS' : activeTopic ? 'TRENDING DISCUSSION' : 'THE COMMUNITY'}</span><h2>{activeFeed === 'following' ? 'Following' : activeFeed === 'my-posts' ? 'My posts' : activeTopic ? `#${communityTopics.find(topic => topic.id === activeTopic)?.label}` : 'Latest conversations'}</h2></div>
                <span className="community-post-count">{visiblePosts.length} posts</span>
              </div>
              {visiblePosts.length ? visiblePosts.map(post => {
                const author = post.authorId === currentCommunityUser.id
                  ? { ...currentCommunityUser, verified: false }
                  : communityAccounts.find(account => account.id === post.authorId)
                if (!author) return null
                return <CommunityPost key={post.id} post={post} author={author} currentUser={currentCommunityUser} onLike={toggleLike} onAddComment={addComment} />
              }) : (
                <div className="community-feed-empty"><span><MessageCircle size={22} /></span><h3>No conversations here yet</h3><p>Follow more people, clear the topic filter or share the first post.</p><button type="button" className="community-empty-action" onClick={() => { setActiveFeed('all'); setActiveTopic(null) }}>Back to the community</button></div>
              )}
            </section>
            <CommunityRightRail
              topics={communityTopics}
              activeTopic={activeTopic}
              onSelectTopic={setActiveTopic}
              followedAccountIdsState={accountFollows}
              onToggleFollow={id => toggleFollow(setAccountFollows, id)}
              followedClubIdsState={clubFollows}
              onToggleClub={id => toggleFollow(setClubFollows, id)}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
