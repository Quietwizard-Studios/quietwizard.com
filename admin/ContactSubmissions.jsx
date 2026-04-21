// ContactSubmissions.jsx — QuietWizard Studios Admin

const ContactSubmissions = ({ onCountChange }) => {
  const [submissions, setSubmissions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState(null);

  const load = async () => {
    setLoading(true);
    const { data } = await window.sb.from('contact_submissions').select('*').order('created_at', { ascending: false });
    setSubmissions(data || []);
    const unread = (data || []).filter(s => !s.read).length;
    onCountChange && onCountChange(unread);
    setLoading(false);
  };

  React.useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await window.sb.from('contact_submissions').update({ read: true }).eq('id', id);
    setSubmissions(s => s.map(x => x.id === id ? { ...x, read: true } : x));
    const unread = submissions.filter(s => !s.read && s.id !== id).length;
    onCountChange && onCountChange(unread);
  };

  const del = async (id) => {
    if (!confirm('Delete this submission?')) return;
    await window.sb.from('contact_submissions').delete().eq('id', id);
    if (selected?.id === id) setSelected(null);
    load();
  };

  if (selected) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <button onClick={() => setSelected(null)} style={{ ...adminStyles.btnGhost, padding: '6px 12px' }}>← All Inquiries</button>
        </div>
        <div style={{ maxWidth: 600, background: '#0D1220', border: '1px solid #1C2B44', borderRadius: 6, padding: 28, boxShadow: 'inset 0 1px 0 rgba(255,255,255,.05)' }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 600, color: '#E8EEF8', marginBottom: 4 }}>{selected.name}</div>
          <div style={{ fontSize: 13, color: '#5BB3FF', marginBottom: 2 }}>{selected.email}</div>
          {selected.company && <div style={{ fontSize: 13, color: '#4F6A8F', marginBottom: 16 }}>{selected.company}</div>}
          <div style={{ fontSize: 11, color: '#344D6E', marginBottom: 20 }}>{new Date(selected.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</div>
          <div style={{ height: 1, background: '#1C2B44', marginBottom: 20 }} />
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 17, color: '#A8B8CC', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            <a href={`mailto:${selected.email}`} style={{ ...adminStyles.btnPrimary, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Reply via Email</a>
            <button onClick={() => del(selected.id)} style={adminStyles.btnDanger}>Delete</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 22, fontWeight: 600, color: '#E8EEF8' }}>Inquiries</div>
        <div style={{ fontSize: 13, color: '#4F6A8F', marginTop: 4 }}>Contact form submissions from the website</div>
      </div>
      {loading ? <div style={adminStyles.empty}>Loading…</div> : submissions.length === 0 ? (
        <div style={adminStyles.emptyCard}><div style={{ fontSize: 14, color: '#7590AF' }}>No inquiries yet.</div></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {submissions.map(s => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: s.read ? '#0A0D16' : '#0D1220', border: `1px solid ${s.read ? '#131B2E' : '#1C2B44'}`, borderRadius: 4, cursor: 'pointer', transition: 'all 200ms' }}
              onClick={() => { setSelected(s); if (!s.read) markRead(s.id); }}
              onMouseEnter={e => e.currentTarget.style.borderColor='#253652'}
              onMouseLeave={e => e.currentTarget.style.borderColor=s.read?'#131B2E':'#1C2B44'}
            >
              {!s.read && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#5BB3FF', boxShadow: '0 0 6px #5BB3FF', flexShrink: 0 }} />}
              {s.read && <div style={{ width: 6, flexShrink: 0 }} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: s.read ? 400 : 600, color: s.read ? '#7590AF' : '#E8EEF8', marginBottom: 2 }}>{s.name} {s.company && <span style={{ color: '#4F6A8F', fontWeight: 400 }}>· {s.company}</span>}</div>
                <div style={{ fontSize: 12, color: '#4F6A8F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.email} — {s.message?.slice(0, 80)}{s.message?.length > 80 ? '…' : ''}</div>
              </div>
              <div style={{ fontSize: 11, color: '#253652', flexShrink: 0 }}>{new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              <button onClick={e => { e.stopPropagation(); del(s.id); }} style={{ ...adminStyles.btnDanger, padding: '4px 10px', fontSize: 11 }}>Del</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { ContactSubmissions });
