// ArticlesList.jsx — QuietWizard Studios Admin

const ArticlesList = ({ onEdit, onNew }) => {
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await window.sb.from('articles').select('id,title,slug,category,published,published_at,updated_at').order('updated_at', { ascending: false });
    setArticles(data || []);
    setLoading(false);
  };

  React.useEffect(() => { load(); }, []);

  const deleteArticle = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await window.sb.from('articles').delete().eq('id', id);
    load();
  };

  const togglePublish = async (id, published) => {
    await window.sb.from('articles').update({ published: !published, published_at: !published ? new Date().toISOString() : null }).eq('id', id);
    load();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 22, fontWeight: 600, color: '#E8EEF8' }}>Articles</div>
          <div style={{ fontSize: 13, color: '#4F6A8F', marginTop: 4 }}>Manage Codex articles and blog posts</div>
        </div>
        <button onClick={onNew} style={adminStyles.btnPrimary}>+ New Article</button>
      </div>

      {loading ? (
        <div style={adminStyles.empty}>Loading…</div>
      ) : articles.length === 0 ? (
        <div style={adminStyles.emptyCard}>
          <div style={{ fontSize: 14, color: '#7590AF', marginBottom: 16 }}>No articles yet. Write your first one.</div>
          <button onClick={onNew} style={adminStyles.btnPrimary}>+ New Article</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {articles.map(a => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', background: '#0D1220', border: '1px solid #1C2B44', borderRadius: 4, transition: 'border-color 200ms' }}
              onMouseEnter={e => e.currentTarget.style.borderColor='#253652'}
              onMouseLeave={e => e.currentTarget.style.borderColor='#1C2B44'}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: 14, fontWeight: 600, color: '#E8EEF8', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</div>
                <div style={{ fontSize: 12, color: '#4F6A8F' }}>/{a.slug} {a.category && `· ${a.category}`}</div>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 3,
                background: a.published ? 'rgba(61,214,140,.1)' : 'rgba(79,106,143,.1)',
                border: `1px solid ${a.published ? 'rgba(61,214,140,.25)' : 'rgba(79,106,143,.25)'}`,
                color: a.published ? '#3DD68C' : '#7590AF',
              }}>{a.published ? 'Published' : 'Draft'}</span>
              <div style={{ fontSize: 11, color: '#344D6E', width: 90, textAlign: 'right', flexShrink: 0 }}>
                {new Date(a.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => togglePublish(a.id, a.published)} style={adminStyles.btnGhost}>{a.published ? 'Unpublish' : 'Publish'}</button>
                <button onClick={() => onEdit(a.id)} style={adminStyles.btnSecondary}>Edit</button>
                <button onClick={() => deleteArticle(a.id, a.title)} style={adminStyles.btnDanger}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { ArticlesList });
