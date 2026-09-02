import { useEffect, useId, useRef, useState } from 'react'
import { notices } from '../data/notices'
import Icon from './Icon'

function formatPostedOn(dateString) {
  const [year, month] = dateString.split('-')
  return `${year}.${month}`
}

function NoticeMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUnreadCount, setShowUnreadCount] = useState(true)
  const menuRef = useRef(null)
  const panelId = useId()
  const noticeCount = notices.length
  const hasUnreadNotices = showUnreadCount && noticeCount > 0
  const bellLabel = hasUnreadNotices
    ? `매장 알림 ${noticeCount}개`
    : '매장 알림'

  function toggleNoticePanel() {
    const willOpen = !isOpen
    if (willOpen) {
      setShowUnreadCount(false)
    }
    setIsOpen(willOpen)
  }

  useEffect(() => {
    if (!isOpen) return

    function closeOnEscape(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    function closeOnOutsideClick(event) {
      const clickedInsideMenu = menuRef.current?.contains(event.target)
      if (!clickedInsideMenu) setIsOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('mousedown', closeOnOutsideClick)

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('mousedown', closeOnOutsideClick)
    }
  }, [isOpen])

  return (
    <div className="notice-menu" ref={menuRef}>
      <button
        type="button"
        className="notice-bell"
        aria-label={bellLabel}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggleNoticePanel}
      >
        <Icon name="bell-icon" />
        {hasUnreadNotices && (
          <span className="notice-bell-count">{noticeCount}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="notice-backdrop" onClick={() => setIsOpen(false)} />
          <div
            className="notice-panel"
            id={panelId}
            role="dialog"
            aria-label="매장 알림"
          >
          <div className="notice-panel-header">
            <div>
              <p className="notice-panel-kicker">알림</p>
              <h2 className="notice-panel-title">휴무·영업 안내</h2>
            </div>
            <button
              type="button"
              className="notice-panel-close"
              aria-label="알림 닫기"
              onClick={() => setIsOpen(false)}
            >
              <Icon name="close-icon" />
            </button>
          </div>

          <ul className="notice-list">
            {notices.map((notice) => (
              <li key={notice.id}>
                <article className="notice-card">
                  <div className="notice-card-meta">
                    <span className="notice-badge">알림</span>
                    <time dateTime={notice.postedOn}>{formatPostedOn(notice.postedOn)}</time>
                  </div>
                  <h3 className="notice-card-title">{notice.title}</h3>
                  <p className="notice-card-body">{notice.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
        </>
      )}
    </div>
  )
}

export default NoticeMenu
