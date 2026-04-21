// Hero.jsx
const Hero = ({ settings, onNav }) => {
  const tagline = settings?.site_tagline || 'We build the AI that others only talk about — custom agents, real automation, and strategy that ships.';
  const eyebrow = settings?.hero_eyebrow || 'AI Agency';
  return (
    <section style={{ minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden',padding:'120px 48px 80px',background:'#07090F' }}>
      <div style={{ position:'absolute',top:'30%',left:'50%',transform:'translate(-50%,-50%)',width:700,height:500,background:'radial-gradient(ellipse,rgba(30,95,212,0.18) 0%,rgba(30,95,212,0.06) 45%,transparent 70%)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',inset:0,pointerEvents:'none',opacity:.3,backgroundImage:'radial-gradient(#1C2B44 1px,transparent 1px)',backgroundSize:'28px 28px' }} />
      <div style={{ position:'relative',maxWidth:800,textAlign:'center' }}>
        <div style={{ fontFamily:'var(--font-ui)',fontSize:11,fontWeight:700,letterSpacing:'.28em',textTransform:'uppercase',color:'#5BB3FF',marginBottom:28,display:'flex',alignItems:'center',justifyContent:'center',gap:12 }}>
          <span style={{ width:32,height:1,background:'linear-gradient(90deg,transparent,#5BB3FF)' }} />
          {eyebrow}
          <span style={{ width:32,height:1,background:'linear-gradient(90deg,#5BB3FF,transparent)' }} />
        </div>
        <h1 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(36px,7vw,84px)',fontWeight:700,color:'#E8EEF8',lineHeight:1.1,marginBottom:12,letterSpacing:'.03em',textShadow:'0 0 80px rgba(91,179,255,0.2)' }}>QuietWizard</h1>
        <h2 style={{ fontFamily:'var(--font-heading)',fontSize:'clamp(16px,2.5vw,28px)',fontWeight:500,color:'#A8B8CC',letterSpacing:'.15em',marginBottom:32,lineHeight:1.3 }}>Studios</h2>
        <p style={{ fontFamily:'var(--font-body)',fontSize:'clamp(18px,2vw,22px)',color:'#7590AF',lineHeight:1.75,maxWidth:580,margin:'0 auto 48px' }}>{tagline}</p>
        <div style={{ display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap' }}>
          <button onClick={() => onNav('contact')} style={{ height:48,padding:'0 32px',background:'#1E5FD4',color:'#F5F8FF',border:'none',borderRadius:4,fontFamily:'var(--font-ui)',fontSize:14,fontWeight:600,cursor:'pointer',transition:'all 200ms' }}
            onMouseEnter={e=>{e.currentTarget.style.background='#4B8EF5';e.currentTarget.style.boxShadow='0 0 24px rgba(91,179,255,.35)';}}
            onMouseLeave={e=>{e.currentTarget.style.background='#1E5FD4';e.currentTarget.style.boxShadow='none';}}
          >Start a Project</button>
          <button onClick={() => onNav('services')} style={{ height:48,padding:'0 28px',background:'transparent',color:'#E8EEF8',border:'1px solid #253652',borderRadius:4,fontFamily:'var(--font-ui)',fontSize:14,fontWeight:500,cursor:'pointer',transition:'all 200ms' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='#5BB3FF';e.currentTarget.style.color='#5BB3FF';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='#253652';e.currentTarget.style.color='#E8EEF8';}}
          >View Services</button>
        </div>
        <div style={{ marginTop:72,display:'flex',flexDirection:'column',alignItems:'center',gap:6,opacity:.4 }}>
          <div style={{ width:1,height:40,background:'linear-gradient(180deg,transparent,#7590AF)' }} />
          <span style={{ fontFamily:'var(--font-ui)',fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'#7590AF' }}>Scroll</span>
        </div>
      </div>
    </section>
  );
};
Object.assign(window,{Hero});
