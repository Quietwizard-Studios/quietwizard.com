// SettingsEditor.jsx — QuietWizard Studios Admin

const SETTINGS_FIELDS = [
  { key: 'site_tagline',           label: 'Site Tagline',             type: 'textarea', hint: 'Hero section tagline' },
  { key: 'hero_eyebrow',           label: 'Hero Eyebrow',             type: 'text',     hint: 'Small label above the hero title (e.g. "AI Agency")' },
  { key: 'about_headline',         label: 'About Headline',           type: 'text',     hint: 'H1 on the About page' },
  { key: 'articles_section_title', label: 'Articles Section Title',   type: 'text',     hint: 'E.g. "The Codex"' },
  { key: 'articles_section_label', label: 'Articles Section Label',   type: 'text',     hint: 'Small eyebrow label above the title' },
  { key: 'contact_email',          label: 'Contact Email',            type: 'text',     hint: 'Where contact form notifications go' },
];

const SettingsEditor = () => {
  const [values, setValues] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    window.sb.from('settings').select('key,value').then(({ data }) => {
      const map = {};
      (data || []).forEach(row => { map[row.key] = row.value; });
      setValues(map);
      setLoading(false);
    });
  }, []);

  const saveAll = async () => {
    setSaving(true);
    const upserts = Object.entries(values).map(([key, value]) => ({ key, value }));
    await window.sb.from('settings').upsert(upserts, { onConflict: 'key' });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) return <div style={adminStyles.empty}>Loading…</div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 22, fontWeight: 600, color: '#E8EEF8' }}>Site Settings</div>
          <div style={{ fontSize: 13, color: '#4F6A8F', marginTop: 4 }}>Global copy and configuration for the website</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {saved && <span style={{ fontSize: 12, color: '#3DD68C' }}>Saved ✓</span>}
          <button onClick={saveAll} disabled={saving} style={adminStyles.btnPrimary}>{saving ? 'Saving…' : 'Save All'}</button>
        </div>
      </div>
      <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {SETTINGS_FIELDS.map(f => (
          <div key={f.key}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#A8B8CC', marginBottom: 4 }}>{f.label}</div>
            {f.hint && <div style={{ fontSize: 11, color: '#344D6E', marginBottom: 6 }}>{f.hint}</div>}
            {f.type === 'textarea' ? (
              <textarea
                style={{ ...adminStyles.input, height: 80, padding: '10px 12px', resize: 'vertical', lineHeight: 1.6 }}
                value={values[f.key] || ''} onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))}
              />
            ) : (
              <input style={adminStyles.input} value={values[f.key] || ''} onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { SettingsEditor });
