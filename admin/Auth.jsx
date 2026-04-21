// Auth.jsx — QuietWizard Studios Admin
// Google OAuth login screen

const Auth = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    const { error } = await window.sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.href },
    });
    if (error) { setError(error.message); setLoading(false); }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#07090F',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Space Grotesk, sans-serif',
    }}>
      {/* Radial glow */}
      <div style={{ position: 'fixed', top: '35%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(30,95,212,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{
        background: '#0D1220', border: '1px solid #1C2B44', borderRadius: 8,
        padding: '48px 40px', width: 380, textAlign: 'center',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.06), 0 0 40px rgba(0,0,0,.4)',
        position: 'relative',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <img src="../assets/logo-dark.png" style={{ width: 52, height: 52, objectFit: 'contain' }} />
          <div style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 18, fontWeight: 700, color: '#E8EEF8', letterSpacing: '.02em' }}>QuietWizard</div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '.3em', textTransform: 'uppercase', color: '#344D6E' }}>Admin Panel</div>
        </div>

        <div style={{ width: '100%', height: 1, background: '#1C2B44', marginBottom: 28 }} />

        <p style={{ fontSize: 13, color: '#7590AF', marginBottom: 28, lineHeight: 1.6 }}>
          Sign in with your Google account to access the admin panel.
        </p>

        {error && (
          <div style={{ background: 'rgba(240,82,82,.1)', border: '1px solid rgba(240,82,82,.3)', borderRadius: 4, padding: '10px 14px', fontSize: 12, color: '#F05252', marginBottom: 18 }}>{error}</div>
        )}

        <button onClick={signInWithGoogle} disabled={loading} style={{
          width: '100%', height: 44, background: loading ? '#0F3490' : '#1E5FD4',
          color: '#F5F8FF', border: 'none', borderRadius: 4,
          fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 200ms',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}
        onMouseEnter={e => { if (!loading) { e.currentTarget.style.background='#4B8EF5'; e.currentTarget.style.boxShadow='0 0 20px rgba(91,179,255,.25)'; }}}
        onMouseLeave={e => { e.currentTarget.style.background=loading?'#0F3490':'#1E5FD4'; e.currentTarget.style.boxShadow='none'; }}
        >
          {loading ? (
            <span>Redirecting…</span>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <p style={{ fontSize: 11, color: '#253652', marginTop: 20 }}>Access restricted to authorized accounts only.</p>
      </div>
    </div>
  );
};

Object.assign(window, { Auth });
