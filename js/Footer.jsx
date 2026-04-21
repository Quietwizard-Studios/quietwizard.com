// Footer.jsx
const Footer = ({ onNav }) => (
  <footer style={{ background:'#0A0D16',borderTop:'1px solid #1C2B44',padding:'48px 48px 32px' }}>
    <div style={{ maxWidth:1200,margin:'0 auto' }}>
      <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:48,marginBottom:48 }}>
        <div>
          <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:16,cursor:'pointer' }} onClick={() => onNav('home')}>
            <img src="/assets/logo-dark.png" style={{ width:30,height:30,objectFit:'contain' }} alt="QuietWizard" />
            <div>
              <div style={{ fontFamily:'var(--font-display)',fontSize:16,fontWeight:700,color:'#E8EEF8',lineHeight:1,letterSpacing:'.02em' }}>QuietWizard</div>
              <div style={{ fontFamily:'var(--font-ui)',fontSize:8,fontWeight:700,letterSpacing:'.28em',textTransform:'uppercase',color:'#344D6E' }}>Studios</div>
            </div>
          </div>
          <p style={{ fontFamily:'var(--font-body)',fontSize:16,color:'#4F6A8F',lineHeight:1.75,maxWidth:260 }}>We build the AI that others only talk about — agents, automation, and strategy that ships.</p>
        </div>
        {[{title:'Services',links:[['Services','services'],['Work','work'],['About','about']]},{title:'Codex',links:[['All Articles','codex'],['Tutorials','codex'],['Case Studies','codex']]},{title:'Company',links:[['About','about'],['Contact','contact'],['Admin','/admin/']]}].map(col => (
          <div key={col.title}>
            <div style={{ fontFamily:'var(--font-ui)',fontSize:10,fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:'#4F6A8F',marginBottom:16 }}>{col.title}</div>
            {col.links.map(([label,page]) => (
              <div key={label} style={{ fontFamily:'var(--font-ui)',fontSize:13,color:'#344D6E',marginBottom:10,cursor:'pointer',transition:'color 200ms' }}
                onClick={() => page.startsWith('/') ? window.location.href=page : onNav(page)}
                onMouseEnter={e=>e.target.style.color='#8A9BB8'} onMouseLeave={e=>e.target.style.color='#344D6E'}
              >{label}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop:'1px solid #1C2B44',paddingTop:24,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
        <div style={{ fontFamily:'var(--font-ui)',fontSize:12,color:'#253652' }}>© {new Date().getFullYear()} QuietWizard Studios. All rights reserved.</div>
        <div style={{ fontFamily:'var(--font-display)',fontSize:11,fontWeight:700,color:'#1C2B44',letterSpacing:'.02em' }}>QuietWizard</div>
      </div>
    </div>
  </footer>
);
Object.assign(window,{Footer});
