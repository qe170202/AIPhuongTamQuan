import { useState, useEffect, useRef } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

/* ─── Data: Danh sách trúng cử HĐND phường Tam Quan Khóa XIV (2026-2031) ─── */
/* Thêm trường `image` cho mỗi ứng viên. Đặt ảnh vào /public/assets/candidates/
   Ví dụ: image: '/assets/candidates/le-duc-anh.jpg'
   Nếu không có ảnh, component sẽ tự hiển thị avatar chữ cái tắt. */
const electionData = [
  {
    id: 1,
    unit: 'ĐƠN VỊ BẦU CỬ SỐ 1',
    areas: 'Khu phố 1, Khu phố 2, Khu phố 9',
    candidates: [
      {
        name: 'Lê Đức Anh',
        role: 'Đảng ủy viên, Phó Chủ tịch Ủy ban MTTQVN phường, Bí thư Đoàn TNCS Hồ Chí Minh phường Tam Quan.',
        gender: 'male',
        initials: 'LĐA',
        image: '/assets/anhthanhvien/leducanh.jpg',
      },
      {
        name: 'Trịnh Văn Mười',
        role: 'Đảng ủy viên, Phó Chủ tịch Thường trực Ủy ban MTTQVN phường, Chủ tịch Hội Nông dân phường Tam Quan.',
        gender: 'male',
        initials: 'TVM',
        image: '/assets/anhthanhvien/vanmuoi.jpg',
      },
      {
        name: 'La Long Quyết',
        role: 'Ủy viên Ban Thường vụ Đảng ủy, Phó Chủ tịch UBND phường Tam Quan.',
        gender: 'male',
        initials: 'LLQ',
        image: '/assets/anhthanhvien/lalongquyet.jpg',
      },
      {
        name: 'Huỳnh Thị Tường Vy',
        role: 'Ủy viên Ban Thường vụ Đảng ủy, Chủ nhiệm Ủy ban Kiểm tra Đảng ủy phường Tam Quan.',
        gender: 'female',
        initials: 'HTTV',
        image: '/assets/anhthanhvien/tuongvy.jpg',
      },
    ],
  },
  {
    id: 2,
    unit: 'ĐƠN VỊ BẦU CỬ SỐ 2',
    areas: 'Khu phố 3, Khu phố 4, Khu phố 5',
    candidates: [
      {
        name: 'Nguyễn Thị Thanh Thúy',
        role: 'Ủy viên Ủy ban Kiểm tra Đảng ủy phường Tam Quan.',
        gender: 'female',
        initials: 'NTTT',
        image: '/assets/anhthanhvien/thanhthuy.jpg',
      },
      {
        name: 'Huỳnh Ngọc Trường',
        role: 'Ủy viên Ban Thường vụ Đảng ủy, Chỉ huy trưởng Ban Chỉ huy Quân sự phường Tam Quan.',
        gender: 'male',
        initials: 'HNT',
        image: '/assets/anhthanhvien/ngoctruong.jpg',
      },
      {
        name: 'Trương Thị Thúy Ức',
        role: 'Phó Bí thư Đảng ủy, Chủ tịch UBND phường Tam Quan.',
        gender: 'female',
        initials: 'TTTƯ',
        image: '/assets/anhthanhvien/thuyuc.png',
      },
    ],
  },
  {
    id: 3,
    unit: 'ĐƠN VỊ BẦU CỬ SỐ 3',
    areas: 'Khu phố 6, Khu phố 7, Khu phố 8',
    candidates: [
      {
        name: 'Lê Tấn Đảm',
        role: 'Trưởng khu phố 8, phường Tam Quan.',
        gender: 'male',
        initials: 'LTĐ',
        image: '/assets/anhthanhvien/tandam.png',
      },
      {
        name: 'Võ Thanh Điệp',
        role: 'Ủy viên Ban Thường vụ Đảng ủy, Trưởng ban Ban xây dựng Đảng Đảng ủy phường Tam Quan.',
        gender: 'male',
        initials: 'VTĐ',
        image: '/assets/anhthanhvien/thanhdiep.jpg',
      },
      {
        name: 'Võ Đông Giang',
        role: 'Đảng ủy viên, Trưởng Phòng Văn hóa - Xã hội phường Tam Quan.',
        gender: 'male',
        initials: 'VĐG',
        image: '/assets/anhthanhvien/dongiang.jpg',
      },
      {
        name: 'Lê Quốc Việt',
        role: 'Ủy viên Ban Thường vụ Đảng ủy, Trưởng Công an phường Tam Quan.',
        gender: 'male',
        initials: 'LQV',
        image: '/assets/anhthanhvien/quocviet.jpg',
      },
    ],
  },
  {
    id: 4,
    unit: 'ĐƠN VỊ BẦU CỬ SỐ 4',
    areas: 'Khu phố An Quý Bắc, Khu phố An Quý Nam, Khu phố An Sơn',
    candidates: [
      {
        name: 'Hoàng Thị Kim Giang',
        role: 'Đảng ủy viên, Phó Chủ tịch Ủy ban Mặt trận TQVN phường, Chủ tịch Hội LHPN phường Tam Quan.',
        gender: 'female',
        initials: 'HTKG',
        image: '/assets/anhthanhvien/kimgiang.jpg',
      },
      {
        name: 'Nguyễn Thành Long',
        role: 'Trưởng khu phố An Quý Nam, phường Tam Quan.',
        gender: 'male',
        initials: 'NTL',
        image: '/assets/anhthanhvien/thanhlong.jpg',
      },
      {
        name: 'Nguyễn Hoàng Nhật',
        role: 'Đảng ủy viên, Phó Chủ tịch Hội đồng nhân dân phường Tam Quan.',
        gender: 'male',
        initials: 'NHN',
        image: '/assets/anhthanhvien/hoangnhat.jpg',
      },
      {
        name: 'Nguyễn Thị Nhung',
        role: 'Phó Bí thư Thường trực Đảng ủy phường Tam Quan.',
        gender: 'female',
        initials: 'NTN',
        image: '/assets/anhthanhvien/thinhung.png',
      },
    ],
  },
  {
    id: 5,
    unit: 'ĐƠN VỊ BẦU CỬ SỐ 5',
    areas: 'Khu phố Hội An, Khu phố Hội An Tây, Khu phố Thành Sơn, Khu phố Thành Sơn Tây, Khu phố Tân Trung, Khu phố Tân An',
    candidates: [
      {
        name: 'Lê Minh Đức',
        role: 'Bí thư Đảng ủy, Chủ tịch HĐND phường Tam Quan.',
        gender: 'male',
        initials: 'LMĐ',
        image: '/assets/anhthanhvien/minhduc.jpg',
      },
      {
        name: 'Đỗ Thị Phương Nhung',
        role: 'Phó Trưởng Ban Văn hoá - Xã hội HĐND phường Tam Quan.',
        gender: 'female',
        initials: 'ĐTPN',
        image: '/assets/anhthanhvien/phuongnhung.jpg',
      },
      {
        name: 'Trần Văn Quyết',
        role: 'Ủy viên Ban Thường vụ Đảng ủy, Chủ tịch Ủy ban MTTQ Việt Nam phường Tam Quan.',
        gender: 'male',
        initials: 'TVQ',
        image: '/assets/anhthanhvien/vanquyet.jpg',
      },
      {
        name: 'Đào Văn Trung',
        role: 'Bí thư Chi bộ khu phố Hội An Tây, phường Tam Quan.',
        gender: 'male',
        initials: 'ĐVT',
        image: '/assets/anhthanhvien/vantrung.png',
      },
    ],
  },
]

/* ─── Avatar gradient palettes ─── */
const GRADIENT_PALETTES = [
  ['#1d4ed8', '#3b82f6'],
  ['#0891b2', '#06b6d4'],
  ['#7c3aed', '#8b5cf6'],
  ['#be185d', '#ec4899'],
  ['#c2410c', '#f97316'],
  ['#059669', '#10b981'],
  ['#4338ca', '#6366f1'],
  ['#0d9488', '#14b8a6'],
  ['#b91c1c', '#ef4444'],
  ['#0369a1', '#0ea5e9'],
  ['#9333ea', '#a855f7'],
  ['#065f46', '#34d399'],
  ['#6d28d9', '#7c3aed'],
  ['#1e40af', '#60a5fa'],
  ['#b45309', '#f59e0b'],
  ['#dc2626', '#f87171'],
  ['#7e22ce', '#a78bfa'],
  ['#0e7490', '#22d3ee'],
  ['#15803d', '#4ade80'],
  ['#9333ea', '#c084fc'],
]

/* ─── Profile Card Component (vertical, premium) ─── */
const ProfileCard = ({ candidate, index, delay, highlighted }) => {
  const palette = GRADIENT_PALETTES[index % GRADIENT_PALETTES.length]
  const hasImage = candidate.image && candidate.image.trim() !== ''

  return (
    <div
      className={`ep-profile-card ${highlighted ? 'ep-profile-card-highlight' : ''}`}
      style={{ '--ep-card-delay': `${delay}ms` }}
    >
      {/* Top gradient accent */}
      <div
        className="ep-profile-accent"
        style={{ background: `linear-gradient(135deg, ${palette[0]}, ${palette[1]})` }}
      />

      {/* Avatar — image or initials fallback */}
      <div className="ep-profile-avatar-wrap">
        {hasImage ? (
          <div className="ep-profile-avatar ep-profile-avatar-img">
            <img
              src={candidate.image}
              alt={candidate.name}
              className="ep-profile-photo"
            />
          </div>
        ) : (
          <div
            className="ep-profile-avatar"
            style={{ background: `linear-gradient(135deg, ${palette[0]}, ${palette[1]})` }}
          >
            <span className="ep-profile-avatar-text">{candidate.initials}</span>
          </div>
        )}
        {/* Gender badge */}
        <div
          className="ep-profile-gender"
          style={{ background: candidate.gender === 'female' ? '#ec4899' : '#3b82f6' }}
        >
          {candidate.gender === 'female' ? '♀' : '♂'}
        </div>
      </div>

      {/* Name */}
      <h3 className="ep-profile-name">{candidate.name}</h3>

      {/* Divider */}
      <div
        className="ep-profile-divider"
        style={{ background: `linear-gradient(90deg, transparent, ${palette[1]}, transparent)` }}
      />

      {/* Role */}
      <p className="ep-profile-role">{candidate.role}</p>

      {/* Shine effect */}
      <div className="ep-profile-shine" />
    </div>
  )
}

/* ─── Main Component ─── */
const ElectedRepresentatives = () => {
  const [headerRef, isHeaderVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [activeTab, setActiveTab] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const [highlightedCard, setHighlightedCard] = useState(0) // 0-3: which card is highlighted
  const [isPaused, setIsPaused] = useState(false)
  const pauseTimeoutRef = useRef(null)
  const activeTabRef = useRef(activeTab)

  // Keep ref in sync
  useEffect(() => {
    activeTabRef.current = activeTab
  }, [activeTab])

  useEffect(() => {
    setAnimKey((k) => k + 1)
    setHighlightedCard(0)
  }, [activeTab])

  // Auto-highlight: cycle through cards every 3 seconds
  useEffect(() => {
    if (isPaused) return

    const cardInterval = setInterval(() => {
      setHighlightedCard((prev) => {
        const currentTab = activeTabRef.current
        const currentCandidateCount = electionData[currentTab]?.candidates.length || 4
        const next = prev + 1

        if (next >= currentCandidateCount) {
          // Move to next unit after cycling all cards
          const nextTab = (currentTab + 1) % electionData.length
          setActiveTab(nextTab)
          return 0
        }
        return next
      })
    }, 3000) // 3 seconds per card

    return () => clearInterval(cardInterval)
  }, [isPaused]) // Only re-create on pause/resume, not on activeTab change

  // Handle manual tab click — pause auto-play for 15s
  const handleTabClick = (index) => {
    setActiveTab(index)
    setHighlightedCard(0)
    setIsPaused(true)

    // Clear any existing pause timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
    }

    // Resume auto-play after 15 seconds of inactivity
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 15000)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }
    }
  }, [])

  const currentUnit = electionData[activeTab]

  return (
    <section id="elected" className="elected-section">
      {/* Decorative Background */}
      <div className="elected-bg-pattern" />
      <div className="elected-bg-glow elected-bg-glow-1" />
      <div className="elected-bg-glow elected-bg-glow-2" />

      <div className="elected-container">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`elected-header ${isHeaderVisible ? 'elected-header-visible' : ''}`}
        >
          <div className="elected-header-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="elected-header-badge-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            <span>DANH SÁCH TRÚNG CỬ</span>
          </div>
          <h2 className="elected-title">
            Đại Biểu HĐND <span className="elected-title-highlight">Phường Tam Quan</span>
          </h2>
          <p className="elected-subtitle">
            Khóa XIV — Nhiệm Kỳ 2026 - 2031
          </p>
          <div className="elected-title-divider" />
        </div>

        {/* Tab Bar — Switch between units */}
        <div className="elected-tabs-wrapper">
          <div className="elected-tabs">
            {electionData.map((unit, i) => (
              <button
                key={unit.id}
                className={`elected-tab ${activeTab === i ? 'elected-tab-active' : ''}`}
                onClick={() => handleTabClick(i)}
              >
                <span className="hidden sm:inline">Đơn vị </span>{unit.id}
              </button>
            ))}
          </div>
        </div>

        {/* ★ Profile Cards */}
        <div
          className="ep-profiles-grid"
          key={`cards-${animKey}`}
        >
          {currentUnit.candidates.map((candidate, i) => (
            <ProfileCard
              key={`${activeTab}-${i}`}
              candidate={candidate}
              index={activeTab * 4 + i}
              delay={100 + i * 150}
              highlighted={highlightedCard === i}
            />
          ))}
        </div>

        {/* ★ Unit info sub-header BELOW cards */}
        <div className="ep-unit-info" key={`unit-${activeTab}`}>
          <div className="ep-unit-info-badge">
            <svg className="ep-unit-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="ep-unit-info-text">
            <span className="ep-unit-info-title">{currentUnit.unit}</span>
            <span className="ep-unit-info-areas">{currentUnit.areas}</span>
          </div>
          <div className="ep-unit-info-count">
            <span className="ep-unit-info-count-num">{currentUnit.candidates.length}</span>
            <span className="ep-unit-info-count-label">Đại biểu</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ElectedRepresentatives

