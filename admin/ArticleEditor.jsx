// ArticleEditor.jsx — QuietWizard Studios Admin
// Rich text article editor using Quill.js

const ArticleEditor = ({ articleId, onBack }) => {
  const isNew = !articleId;
  const [loading, setLoading] = React.useState(!isNew);
  const [saving, setSaving] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [fields, setFields] = React.useState({
    title: '', slug: '', category: '', tags: '', author_name: 'QuietWizard Studios',
    cover_image_url: '', published: false, read_time_minutes: '',
    seo_title: '', seo_description: '',
  });
  const quillRef = React.useRef(null);
  const editorRef = React.useRef(null);
  const fileRef = React.useRef(null);

  // Load existing article
  React.useEffect(() => {
    if (!isNew) {
      window.sb.from('articles').select('*').eq('id', articleId).single().then(({ data }) => {
        if (data) {
          setFields({
            title: data.title || '', slug: data.slug || '', category: data.category || '',
            tags: (data.tags || []).join(', '), author_name: data.author_name || 'QuietWizard Studios',
            cover_image_url: data.cover_image_url || '', published: data.published || false,
            read_time_minutes: data.read_time_minutes || '', seo_title: data.seo_title || '',
            seo_description: data.seo_description || '',
          });
          setTimeout(() => { if (quillRef.current) quillRef.current.clipboard.dangerouslyPasteHTML(data.body || ''); }, 200);
        }
        setLoading(false);
      });
    }
  }, [articleId]);

  // Init Quill
  React.useEffect(() => {
    if (loading) return;
    if (!editorRef.current || quillRef.current) return;
    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
      placeholder: 'Write your article here…',
      modules: {
        toolbar: [
          [{ header: [2, 3, false] }],
          ['bold', 'italic', 'underline'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link'],
          ['clean'],
        ],
      },
    });
  }, [loading]);

  const slugify = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const set = (k, v) => setFields(f => ({ ...f, [k]: v }));

  const handleTitleChange = (v) => {
    set('title', v);
    if (!articleId) set('slug', slugify(v));
  };

  const uploadCover = async (file) => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `covers/${Date.now()}.${ext}`;
    const { error } = await window.sb.storage.from('media').upload(path, file, { upsert: true });
    if (!error) {
      const { data } = window.sb.storage.from('media').getPublicUrl(path);
      set('cover_image_url', data.publicUrl);
    }
    setUploading(false);
  };

  const save = async (publish = null) => {
    setSaving(true);
    const body = quillRef.current ? quillRef.current.root.innerHTML : '';
    const payload = {
      ...fields,
      body,
      tags: fields.tags.split(',').map(t => t.trim()).filter(Boolean),
      read_time_minutes: fields.read_time_minutes ? parseInt(fields.read_time_minutes) : null,
      published: publish !== null ? publish : fields.published,
      published_at: (publish === true) ? new Date().toISOString() : (publish === false ? null : undefined),
    };
    if (publish !== null) set('published', publish);

    let error;
    if (isNew) {
      ({ error } = await window.sb.from('articles').insert(payload));
    } else {
      ({ error } = await window.sb.from('articles').update(payload).eq('id', articleId));
    }
    setSaving(false);
    if (!error) { setSaved(true); setTimeout(() => setSaved(false), 2500); if (isNew) onBack(); }
  };

  if (loading) return <div style={adminStyles.empty}>Loading article…</div>;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <button onClick={onBack} style={{ ...adminStyles.btnGhost, padding: '6px 12px' }}>← Back</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 20, fontWeight: 600, color: '#E8EEF8' }}>{isNew ? 'New Article' : 'Edit Article'}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {saved && <span style={{ fontSize: 12, color: '#3DD68C', alignSelf: 'center' }}>Saved ✓</span>}
          <button onClick={() => save(false)} disabled={saving} style={adminStyles.btnSecondary}>Save Draft</button>
          <button onClick={() => save(true)} disabled={saving} style={adminStyles.btnPrimary}>{saving ? 'Saving…' : 'Publish'}</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <AdminField label="Title">
            <input style={adminStyles.input} value={fields.title} onChange={e => handleTitleChange(e.target.value)} placeholder="Article title" />
          </AdminField>
          <AdminField label="Slug">
            <input style={adminStyles.input} value={fields.slug} onChange={e => set('slug', e.target.value)} placeholder="url-slug" />
          </AdminField>

          {/* Quill editor */}
          <AdminField label="Body">
            <div style={{ border: '1px solid #1C2B44', borderRadius: 4, overflow: 'hidden' }}>
              <style>{`
                .ql-toolbar { background: #0A0D16 !important; border: none !important; border-bottom: 1px solid #1C2B44 !important; }
                .ql-toolbar button, .ql-toolbar .ql-picker { color: #7590AF !important; }
                .ql-toolbar button:hover, .ql-toolbar button.ql-active { color: #5BB3FF !important; }
                .ql-toolbar .ql-stroke { stroke: #7590AF !important; }
                .ql-toolbar button:hover .ql-stroke, .ql-toolbar button.ql-active .ql-stroke { stroke: #5BB3FF !important; }
                .ql-toolbar .ql-fill { fill: #7590AF !important; }
                .ql-container { background: #07090F !important; border: none !important; font-family: 'EB Garamond', serif !important; font-size: 17px !important; color: #C8D5E4 !important; min-height: 320px; }
                .ql-editor { padding: 18px !important; min-height: 320px; line-height: 1.8 !important; }
                .ql-editor.ql-blank::before { color: #344D6E !important; font-style: italic; }
                .ql-editor h2 { font-family: 'Cinzel', serif !important; color: #E8EEF8 !important; }
                .ql-editor h3 { font-family: 'Cinzel', serif !important; color: #C8D5E4 !important; }
                .ql-editor blockquote { border-left: 3px solid #1E5FD4 !important; padding-left: 16px !important; color: #7590AF !important; }
                .ql-editor code { background: #0D1220 !important; color: #5BB3FF !important; padding: 2px 5px !important; border-radius: 3px !important; font-family: 'JetBrains Mono', monospace !important; }
                .ql-editor pre { background: #0D1220 !important; color: #5BB3FF !important; border: 1px solid #1C2B44 !important; border-radius: 4px !important; padding: 14px !important; font-family: 'JetBrains Mono', monospace !important; font-size: 13px !important; }
              `}</style>
              <div ref={editorRef} />
            </div>
          </AdminField>
        </div>

        {/* Sidebar meta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Cover image */}
          <AdminField label="Cover Image">
            {fields.cover_image_url && (
              <img src={fields.cover_image_url} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 4, marginBottom: 8, border: '1px solid #1C2B44' }} />
            )}
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files[0] && uploadCover(e.target.files[0])} />
            <button onClick={() => fileRef.current.click()} disabled={uploading} style={{ ...adminStyles.btnSecondary, width: '100%' }}>
              {uploading ? 'Uploading…' : fields.cover_image_url ? 'Change Image' : '+ Upload Image'}
            </button>
            {fields.cover_image_url && (
              <input style={{ ...adminStyles.input, marginTop: 6, fontSize: 11 }} value={fields.cover_image_url} onChange={e => set('cover_image_url', e.target.value)} placeholder="Or paste URL" />
            )}
          </AdminField>

          <AdminField label="Category">
            <input style={adminStyles.input} value={fields.category} onChange={e => set('category', e.target.value)} placeholder="Tutorial, Deep Dive…" />
          </AdminField>

          <AdminField label="Tags (comma-separated)">
            <input style={adminStyles.input} value={fields.tags} onChange={e => set('tags', e.target.value)} placeholder="AI, Automation, LLMs" />
          </AdminField>

          <AdminField label="Author">
            <input style={adminStyles.input} value={fields.author_name} onChange={e => set('author_name', e.target.value)} />
          </AdminField>

          <AdminField label="Read Time (minutes)">
            <input style={adminStyles.input} type="number" value={fields.read_time_minutes} onChange={e => set('read_time_minutes', e.target.value)} placeholder="8" />
          </AdminField>

          <div style={{ height: 1, background: '#1C2B44' }} />
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#4F6A8F' }}>SEO</div>

          <AdminField label="Meta Title">
            <input style={adminStyles.input} value={fields.seo_title} onChange={e => set('seo_title', e.target.value)} placeholder="Defaults to article title" />
          </AdminField>

          <AdminField label="Meta Description">
            <textarea style={{ ...adminStyles.input, height: 72, padding: '8px 12px', resize: 'none', lineHeight: 1.5 }} value={fields.seo_description} onChange={e => set('seo_description', e.target.value)} placeholder="160 characters max" />
          </AdminField>
        </div>
      </div>
    </div>
  );
};

const AdminField = ({ label, children }) => (
  <div>
    <div style={{ fontSize: 11, fontWeight: 600, color: '#7590AF', marginBottom: 5, letterSpacing: '.04em' }}>{label}</div>
    {children}
  </div>
);

Object.assign(window, { ArticleEditor, AdminField });
