// Services.jsx
const ServiceCard = ({ s, onNav }) => {
  const [hovered, setHovered] = React.useState(false);
  const tags = Array.isArray(s.tags) ? s.tags : (s.tags||'').split(',').map(t=>t.trim()).filter(Boolean);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} style={{ background:s.featured?'#0D1220':'#0A0D16',border:`1px solid ${s.featured?(hovered?'#4B8EF5':'#253652'):(hovered?'#253652':'#1C2B44')}`,borderRadius:6,padding:28,boxShadow:s.featured?`inset 0 1px 0 rgba(255,255,255,.06)${hovered?',0 0 28px rgba(91,179,255,.15)':''}`:' inset 0 1px 0 rgba(255,255,255,.04)',transform:hovered?'translateY(-3px)':'none',transition:'all 300ms cubic-bezier(.16,1,.3,1)',display:'flex',flexDirection:'column' }}>
      <div style={{ fontFamily:'var(--font-ui)',fontSize:10,fontWeight:700,letterSpacing:'.22em',textTransform:'uppercase',color:s.featured?'#5BB3FF':'#4F6A8F',marginBottom:14 }}>{s.label}</div>
      <div style={{ fontFamily:'var(--font-heading)',fontSize:20,fontWeight:600,color:'#E8EEF8',lineHeight:1.3,marginBottom:14 }}>{s.title}</div>
      <p style={{ fontFamily:'var(--font-body)',fontSize:16,color:'#7590AF',lineHeight:1.75,marginBottom:20,flex:1 }}>{s.description}</p>
      <div style={{ display:'flex',flexWrap:'wrap',gap:6,marginBottom:20 }}>
        {tags.map(t => <span key={t} style={{ fontFamily:'var(--font-ui)',fontSize:11,fontWeight:600,padding:'2px 8px',borderRadius:3,background:'rgba(30,95,212,.12)',border:'1px solid rgba(30,95,212,.2)',color:'#4B8EF5' }}>{t}</span>)}
      </div>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:16,borderTop:'1px solid #1C2B44' }}>
        <span style={{ fontFamily:'var(--font-ui)',fontSize:13,color:'#A8B8CC',fontWeight:500 }}>{s.price}</span>
        <button onClick={() => onNav('contact')} style={{ background:'none',border:'none',fontFamily:'var(--font-ui)',fontSize:12,fontWeight:600,color:'#5BB3FF',cursor:'pointer' }}>Learn more →</button>
      </div>
    </div>
  );
};

const Services = ({ services, settings, onNav }) => {
  const title = settings?.services_title || 'Craft Over Convention';
  const label = settings?.services_label || 'What We Do';
  return (
    <section style={{ background:'#07090F',padding:'96px 48px',position:'relative' }}>
      <div style={{ position:'absolute',top:0,left:48,right:48,height:1,background:'linear-gradient(90deg,transparent,#1C2B44 30%,#1C2B44 70%,transparent)' }} />
      <div style={{ maxWidth:1200,margin:'0 auto' }}>
        <div style={{ marginBottom:56,display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:16 }}>
          <div>
            <div style={{ fontFamily:'var(--font-ui)',fontSize:11,fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'#5BB3FF',marginBottom:12 }}>{label}</div>
            <h2 style={{ fontFamily:'var(--font-heading)',fontSize:'clamp(24px,3vw,40px)',fontWeight:600,color:'#E8EEF8',lineHeight:1.2 }}>{title}</h2>
          </div>
          <p style={{ fontFamily:'var(--font-body)',fontSize:17,color:'#7590AF',maxWidth:380,lineHeight:1.75 }}>We don't do everything. We build agents, automate workflows, and advise teams who are serious about AI.</p>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:16 }}>
          {services.map((s,i) => <ServiceCard key={s.id||i} s={s} onNav={onNav} />)}
        </div>
      </div>
    </section>
  );
};
Object.assign(window,{Services,ServiceCard});
