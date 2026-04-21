// Sidebar.jsx — QuietWizard Studios Admin

const NAV_ITEMS = [
  { id: 'articles',  label: 'Articles',    icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM7 8h10M7 12h10M7 16h6' },
  { id: 'services',  label: 'Services',    icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 'contact',   label: 'Inquiries',   icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 'settings',  label: 'Settings',    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
];

const Sidebar = ({ page, setPage, user, unreadCount }) => {
  const signOut = async () => {
    await window.sb.auth.signOut();
  };

  return (
    <aside style={{
      width: 220, background: '#0A0D16', borderRight: '1px solid #1C2B44',
      display: 'flex', flexDirection: 'column', height: '100vh', position: 'fixed', left: 0, top: 0,
      fontFamily: 'Space Grotesk, sans-serif',
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid #1C2B44', display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="../assets/logo-dark.png" style={{ width: 30, height: 30, objectFit: 'contain' }} />
        <div>
          <div style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 13, fontWeight: 700, color: '#E8EEF8', letterSpacing: '.02em', lineHeight: 1.1 }}>QuietWizard</div>
          <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '.25em', textTransform: 'uppercase', color: '#344D6E', marginTop: 2 }}>Admin</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(item => (
          <button key={item.id} onClick={() => setPage(item.id)} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 12px', borderRadius: 4, border: 'none', cursor: 'pointer',
            background: page === item.id ? '#131B2E' : 'transparent',
            color: page === item.id ? '#E8EEF8' : '#7590AF',
            fontSize: 13, fontWeight: 500, fontFamily: 'Space Grotesk, sans-serif',
            transition: 'all 200ms', textAlign: 'left', width: '100%',
          }}
          onMouseEnter={e => { if (page !== item.id) { e.currentTarget.style.background='#0D1220'; e.currentTarget.style.color='#C8D5E4'; }}}
          onMouseLeave={e => { if (page !== item.id) { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#7590AF'; }}}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              {item.icon.split(' M').map((d, i) => <path key={i} d={i === 0 ? d : 'M' + d} />)}
            </svg>
            {item.label}
            {item.id === 'contact' && unreadCount > 0 && (
              <span style={{ marginLeft: 'auto', background: '#1E5FD4', color: '#F5F8FF', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 9999 }}>{unreadCount}</span>
            )}
          </button>
        ))}
      </nav>

      {/* User */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #1C2B44' }}>
        <div style={{ fontSize: 11, color: '#4F6A8F', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
        <button onClick={signOut} style={{ background: 'none', border: 'none', color: '#344D6E', fontSize: 12, cursor: 'pointer', padding: 0, fontFamily: 'Space Grotesk, sans-serif', transition: 'color 200ms' }}
          onMouseEnter={e => e.target.style.color='#F05252'}
          onMouseLeave={e => e.target.style.color='#344D6E'}
        >Sign out</button>
      </div>
    </aside>
  );
};

Object.assign(window, { Sidebar });
