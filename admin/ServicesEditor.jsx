// ServicesEditor.jsx — QuietWizard Studios Admin

const ServicesEditor = () => {
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(null); // service object or 'new'
  const [saving, setSaving] = React.useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await window.sb.from('services').select('*').order('sort_order');
    setServices(data || []);
    setLoading(false);
  };

  React.useEffect(() => { load(); }, []);

  const blank = { label: '', title: '', description: '', price: '', tags: '', featured: false, sort_order: services.length + 1 };

  const save = async () => {
    setSaving(true);
    const payload = { ...editing, tags: typeof editing.tags === 'string' ? editing.tags.split(',').map(t => t.trim()).filter(Boolean) : editing.tags };
    if (editing.id) {
      await window.sb.from('services').update(payload).eq('id', editing.id);
    } else {
      await window.sb.from('services').insert(payload);
    }
    setSaving(false);
    setEditing(null);
    load();
  };

  const deleteService = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await window.sb.from('services').delete().eq('id', id);
    load();
  };

  const set = (k, v) => setEditing(e => ({ ...e, [k]: v }));

  if (editing !== null) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <button onClick={() => setEditing(null)} style={{ ...adminStyles.btnGhost, padding: '6px 12px' }}>← Back</button>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 20, fontWeight: 600, color: '#E8EEF8', flex: 1 }}>{editing.id ? 'Edit Service' : 'New Service'}</div>
          <button onClick={save} disabled={saving} style={adminStyles.btnPrimary}>{saving ? 'Saving…' : 'Save Service'}</button>
        </div>
        <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <AdminField label="Label (e.g. Build)"><input style={adminStyles.input} value={editing.label} onChange={e => set('label', e.target.value)} placeholder="Build" /></AdminField>
            <AdminField label="Price"><input style={adminStyles.input} value={editing.price} onChange={e => set('price', e.target.value)} placeholder="From $5,000" /></AdminField>
          </div>
          <AdminField label="Title"><input style={adminStyles.input} value={editing.title} onChange={e => set('title', e.target.value)} placeholder="Custom AI Agents" /></AdminField>
          <AdminField label="Description">
            <textarea style={{ ...adminStyles.input, height: 100, padding: '10px 12px', resize: 'none', lineHeight: 1.6 }} value={editing.description} onChange={e => set('description', e.target.value)} placeholder="Service description…" />
          </AdminField>
          <AdminField label="Tags (comma-separated)"><input style={adminStyles.input} value={editing.tags} onChange={e => set('tags', e.target.value)} placeholder="LLM Agents, Tool Use" /></AdminField>
          <AdminField label="Sort Order"><input style={adminStyles.input} type="number" value={editing.sort_order} onChange={e => set('sort_order', parseInt(e.target.value))} /></AdminField>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input type="checkbox" checked={editing.featured} onChange={e => set('featured', e.target.checked)} style={{ accentColor: '#1E5FD4', width: 14, height: 14 }} />
            <span style={{ fontSize: 13, color: '#A8B8CC' }}>Featured (highlighted card)</span>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 22, fontWeight: 600, color: '#E8EEF8' }}>Services</div>
          <div style={{ fontSize: 13, color: '#4F6A8F', marginTop: 4 }}>Manage service offerings shown on the website</div>
        </div>
        <button onClick={() => setEditing(blank)} style={adminStyles.btnPrimary}>+ New Service</button>
      </div>
      {loading ? <div style={adminStyles.empty}>Loading…</div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {services.map(s => (
            <div key={s.id} style={{ background: '#0D1220', border: '1px solid #1C2B44', borderRadius: 6, padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#5BB3FF' }}>{s.label}</span>
                  {s.featured && <span style={{ fontSize: 10, fontWeight: 600, padding: '1px 7px', borderRadius: 3, background: 'rgba(30,95,212,.15)', border: '1px solid rgba(30,95,212,.25)', color: '#4B8EF5' }}>Featured</span>}
                </div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: 15, fontWeight: 600, color: '#E8EEF8', marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: '#7590AF', fontFamily: "'EB Garamond', serif", lineHeight: 1.6, marginBottom: 8 }}>{s.description}</div>
                <div style={{ fontSize: 12, color: '#4B8EF5', fontWeight: 600 }}>{s.price}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => setEditing({ ...s, tags: (s.tags || []).join(', ') })} style={adminStyles.btnSecondary}>Edit</button>
                <button onClick={() => deleteService(s.id, s.title)} style={adminStyles.btnDanger}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { ServicesEditor });
