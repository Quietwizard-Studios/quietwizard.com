// Header.jsx
const Header = ({ activePage, onNav }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const links = ['Services','Work','Codex','About'];
  return (
    <header style={{ position:'fixed',top:0,left:0,right:0,zIndex:100,height:64,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 48px',background:scrolled?'rgba(7,9,15,0.92)':'transparent',borderBottom:scrolled?'1px solid #1C2B44':'1px solid transparent',backdropFilter:scrolled?'blur(12px)':'none',transition:'all 400ms cubic-bezier(.16,1,.3,1)' }}>
      <div style={{ display:'flex',alignItems:'center',gap:10,cursor:'pointer' }} onClick={() => onNav('home')}>
        <img src="/assets/logo-dark.png" style={{ width:34,height:34,objectFit:'contain' }} alt="QuietWizard" />
        <div>
          <div style={{ fontFamily:'var(--font-display)',fontSize:18,fontWeight:700,color:'#E8EEF8',lineHeight:1,letterSpacing:'.02em' }}>QuietWizard</div>
          <div style={{ fontFamily:'var(--font-ui)',fontSize:8,fontWeight:700,letterSpacing:'.3em',textTransform:'uppercase',color:'#4F6A8F',marginTop:2 }}>Studios</div>
        </div>
      </div>
      <nav style={{ display:'flex',alignItems:'center',gap:2 }}>
        {links.map(l => (
          <a key={l} onClick={() => onNav(l.toLowerCase())} style={{ padding:'6px 16px',fontSize:13,fontWeight:500,cursor:'pointer',color:activePage===l.toLowerCase()?'#E8EEF8':'#7590AF',borderRadius:4,transition:'color 200ms',textDecoration:'none' }}
            onMouseEnter={e=>e.target.style.color='#E8EEF8'}
            onMouseLeave={e=>e.target.style.color=activePage===l.toLowerCase()?'#E8EEF8':'#7590AF'}
          >{l}</a>
        ))}
      </nav>
      <button onClick={() => onNav('contact')} style={{ height:36,padding:'0 20px',background:'#1E5FD4',color:'#F5F8FF',border:'none',borderRadius:4,fontFamily:'var(--font-ui)',fontSize:13,fontWeight:600,cursor:'pointer',transition:'all 200ms' }}
        onMouseEnter={e=>{e.currentTarget.style.background='#4B8EF5';e.currentTarget.style.boxShadow='0 0 18px rgba(91,179,255,.3)';}}
        onMouseLeave={e=>{e.currentTarget.style.background='#1E5FD4';e.currentTarget.style.boxShadow='none';}}
      >Start a Project</button>
    </header>
  );
};
Object.assign(window,{Header});
