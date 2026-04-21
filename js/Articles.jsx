// Articles.jsx
const ArticleCard = ({ article: a, large, onNav }) => {
  const [hovered, setHovered] = React.useState(false);
  const gradients = [
    'linear-gradient(135deg,#0A2268 0%,#131B2E 60%,#1C2B44 100%)',
    'linear-gradient(135deg,#061444,#0D1220,#253652)',
    'linear-gradient(135deg,#0F3490,#07090F,#1C2B44)',
  ];
  const grad = a.cover_image_url ? null : gradients[Math.abs(a.title?.charCodeAt(0)||0) % 3];
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      onClick={() => onNav('article', a.slug)}
      style={{ background:'#0D1220',border:`1px solid ${hovered?'#253652':'#1C2B44'}`,borderRadius:6,overflow:'hidden',boxShadow:`inset 0 1px 0 rgba(255,255,255,.05)${hovered?',0 0 20px rgba(91,179,255,.08)':''}`,transform:hovered?'translateY(-2px)':'none',transition:'all 280ms cubic-bezier(.16,1,.3,1)',cursor:'pointer',display:'flex',flexDirection:'column' }}>
      <div style={{ height:large?140:90,background:grad||undefined,overflow:'hidden',position:'relative' }}>
        {a.cover_image_url ? <img src={a.cover_image_url} style={{ width:'100%',height:'100%',objectFit:'cover' }} alt={a.title} /> : <div style={{ height:'100%',display:'flex',alignItems:'center',justifyContent:'center' }}><span style={{ fontFamily:'var(--font-heading)',fontSize:11,letterSpacing:'.2em',color:'rgba(168,184,204,0.25)',textTransform:'uppercase' }}>Codex</span></div>}
      </div>
      <div style={{ padding:large?24:18,flex:1,display:'flex',flexDirection:'column' }}>
        {a.category && <div style={{ fontFamily:'var(--font-ui)',fontSize:10,fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:'#5BB3FF',marginBottom:8 }}>{a.category}</div>}
        <div style={{ fontFamily:'var(--font-heading)',fontSize:large?18:15,fontWeight:600,color:'#E8EEF8',lineHeight:1.35,marginBottom:large?10:0 }}>{a.title}</div>
        {large && a.seo_description && <p style={{ fontFamily:'var(--font-body)',fontSize:16,color:'#7590AF',lineHeight:1.7,marginBottom:14,flex:1 }}>{a.seo_description}</p>}
        <div style={{ fontFamily:'var(--font-ui)',fontSize:11,color:'#4F6A8F',marginTop:'auto',paddingTop:large?0:10,display:'flex',gap:8 }}>
          {a.published_at && <span>{new Date(a.published_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>}
          {a.read_time_minutes && <><span>·</span><span>{a.read_time_minutes} min read</span></>}
        </div>
      </div>
    </div>
  );
};

const Articles = ({ articles, settings, onNav }) => {
  const title = settings?.articles_section_title || 'The Codex';
  const label = settings?.articles_section_label || 'Knowledge Base';
  const preview = articles.slice(0,3);
  if (preview.length === 0) return null;
  return (
    <section style={{ background:'#07090F',padding:'96px 48px',position:'relative' }}>
      <div style={{ position:'absolute',top:0,left:48,right:48,height:1,background:'linear-gradient(90deg,transparent,#1C2B44 30%,#1C2B44 70%,transparent)' }} />
      <div style={{ maxWidth:1200,margin:'0 auto' }}>
        <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:48,flexWrap:'wrap',gap:16 }}>
          <div>
            <div style={{ fontFamily:'var(--font-ui)',fontSize:11,fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'#5BB3FF',marginBottom:12 }}>{label}</div>
            <h2 style={{ fontFamily:'var(--font-heading)',fontSize:'clamp(22px,3vw,38px)',fontWeight:600,color:'#E8EEF8',lineHeight:1.2 }}>{title}</h2>
          </div>
          <button onClick={() => onNav('codex')} style={{ background:'none',border:'1px solid #253652',borderRadius:4,padding:'8px 18px',fontFamily:'var(--font-ui)',fontSize:13,fontWeight:500,color:'#8A9BB8',cursor:'pointer',transition:'all 200ms' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='#5BB3FF';e.currentTarget.style.color='#5BB3FF';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='#253652';e.currentTarget.style.color='#8A9BB8';}}
          >View all articles →</button>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16 }}>
          {preview.map((a,i) => <ArticleCard key={a.id||i} article={a} large={i===0} onNav={onNav} />)}
        </div>
      </div>
    </section>
  );
};
Object.assign(window,{Articles,ArticleCard});
