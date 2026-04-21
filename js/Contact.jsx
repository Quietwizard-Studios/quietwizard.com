// Contact.jsx
const Contact = ({ settings }) => {
  const [fields, setFields] = React.useState({ name:'',email:'',company:'',message:'' });
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const email = settings?.contact_email || 'hello@quietwizard.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    if (window.sb) {
      await window.sb.from('contact_submissions').insert({ name:fields.name, email:fields.email, company:fields.company, message:fields.message });
    }
    setSending(false);
    setSent(true);
  };

  return (
    <section style={{ background:'#07090F',padding:'96px 48px',position:'relative' }}>
      <div style={{ position:'absolute',top:0,left:48,right:48,height:1,background:'linear-gradient(90deg,transparent,#1C2B44 30%,#1C2B44 70%,transparent)' }} />
      <div style={{ maxWidth:720,margin:'0 auto' }}>
        <div style={{ textAlign:'center',marginBottom:56 }}>
          <div style={{ fontFamily:'var(--font-ui)',fontSize:11,fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'#5BB3FF',marginBottom:14 }}>Get In Touch</div>
          <h2 style={{ fontFamily:'var(--font-heading)',fontSize:'clamp(24px,3vw,40px)',fontWeight:600,color:'#E8EEF8',lineHeight:1.2,marginBottom:16 }}>Start a Project</h2>
          <p style={{ fontFamily:'var(--font-body)',fontSize:18,color:'#7590AF',lineHeight:1.75 }}>Tell us what you're working on. We'll respond within one business day — no sales call required.</p>
        </div>
        {sent ? (
          <div style={{ textAlign:'center',padding:'48px 32px',background:'#0D1220',border:'1px solid #253652',borderRadius:6,boxShadow:'0 0 32px rgba(91,179,255,.08)' }}>
            <div style={{ fontFamily:'var(--font-heading)',fontSize:22,color:'#5BB3FF',marginBottom:12 }}>Message Received</div>
            <p style={{ fontFamily:'var(--font-body)',color:'#7590AF',fontSize:16,lineHeight:1.7 }}>We'll be in touch within one business day. In the meantime, explore the Codex.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background:'#0D1220',border:'1px solid #1C2B44',borderRadius:6,padding:36,boxShadow:'inset 0 1px 0 rgba(255,255,255,.05)' }}>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16 }}>
              <CField label="Name" value={fields.name} onChange={v=>setFields(f=>({...f,name:v}))} placeholder="Your name" required />
              <CField label="Email" value={fields.email} onChange={v=>setFields(f=>({...f,email:v}))} placeholder={email} type="email" required />
            </div>
            <div style={{ marginBottom:16 }}>
              <CField label="Company" value={fields.company} onChange={v=>setFields(f=>({...f,company:v}))} placeholder="Optional" />
            </div>
            <div style={{ marginBottom:28 }}>
              <div style={{ fontFamily:'var(--font-ui)',fontSize:12,fontWeight:500,color:'#A8B8CC',marginBottom:6 }}>Message</div>
              <textarea value={fields.message} onChange={e=>setFields(f=>({...f,message:e.target.value}))} required placeholder="Tell us about your project, timeline, and what you're trying to solve…"
                style={{ width:'100%',height:120,background:'#07090F',border:'1px solid #1C2B44',borderRadius:4,padding:'10px 14px',fontFamily:'var(--font-ui)',fontSize:14,color:'#E8EEF8',resize:'none',outline:'none',lineHeight:1.6,transition:'border 200ms' }}
                onFocus={e=>e.target.style.borderColor='#5BB3FF'} onBlur={e=>e.target.style.borderColor='#1C2B44'} />
            </div>
            <button type="submit" disabled={sending} style={{ width:'100%',height:46,background:'#1E5FD4',color:'#F5F8FF',border:'none',borderRadius:4,fontFamily:'var(--font-ui)',fontSize:14,fontWeight:600,cursor:'pointer',transition:'all 200ms' }}
              onMouseEnter={e=>{e.currentTarget.style.background='#4B8EF5';e.currentTarget.style.boxShadow='0 0 22px rgba(91,179,255,.3)';}}
              onMouseLeave={e=>{e.currentTarget.style.background='#1E5FD4';e.currentTarget.style.boxShadow='none';}}
            >{sending?'Sending…':'Send Message'}</button>
          </form>
        )}
      </div>
    </section>
  );
};

const CField = ({ label, value, onChange, placeholder, type='text', required }) => (
  <div>
    <div style={{ fontFamily:'var(--font-ui)',fontSize:12,fontWeight:500,color:'#A8B8CC',marginBottom:6 }}>{label}</div>
    <input type={type} value={value} placeholder={placeholder} required={required} onChange={e=>onChange(e.target.value)}
      style={{ width:'100%',height:38,background:'#07090F',border:'1px solid #1C2B44',borderRadius:4,padding:'0 12px',fontFamily:'var(--font-ui)',fontSize:13,color:'#E8EEF8',outline:'none',transition:'border 200ms' }}
      onFocus={e=>e.target.style.borderColor='#5BB3FF'} onBlur={e=>e.target.style.borderColor='#1C2B44'} />
  </div>
);
Object.assign(window,{Contact,CField});
