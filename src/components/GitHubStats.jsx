import { useEffect, useState, useRef } from 'react';

const GITHUB_USER = 'priyanshupriyesh6';

function StatCard({ label, value, icon, color = 'var(--accent, #dc2626)', loading }) {
  return (
    <div style={{
      padding: '20px 24px',
      border: '1px solid rgba(185,28,28,0.2)',
      background: 'rgba(4,0,0,0.7)',
      backdropFilter: 'blur(8px)',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}60`; e.currentTarget.style.boxShadow = `0 0 20px ${color}12`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(185,28,28,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#374151', letterSpacing: '0.2em', marginBottom: 8 }}>
        {icon} {label}
      </div>
      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color }}>
        {loading ? (
          <span style={{ fontSize: '0.7rem', color: '#374151', fontFamily: "'Share Tech Mono', monospace" }}>
            loading...
          </span>
        ) : value}
      </div>
    </div>
  );
}

function RepoCard({ repo }) {
  const lang = repo.language || 'Unknown';
  const langColor = {
    JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3776ab',
    HTML: '#e34c26', CSS: '#563d7c', 'C++': '#00599c', C: '#555555',
  }[lang] || '#6b7280';

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      data-cursor="VIEW"
      style={{
        display: 'block', textDecoration: 'none',
        padding: '16px 18px',
        border: '1px solid rgba(185,28,28,0.18)',
        background: 'rgba(4,0,0,0.6)',
        transition: 'all 0.2s',
        backdropFilter: 'blur(6px)',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(220,38,38,0.5)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(185,28,28,0.18)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: '#e5e7eb', margin: 0, fontSize: '0.95rem' }}>
          {repo.name}
        </h4>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {repo.stargazers_count > 0 && (
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: '#f59e0b' }}>
              ★ {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: '#6b7280' }}>
              ⑂ {repo.forks_count}
            </span>
          )}
        </div>
      </div>

      {repo.description && (
        <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#6b7280', lineHeight: 1.6, marginBottom: 10 }}>
          {repo.description.length > 80 ? repo.description.slice(0, 80) + '...' : repo.description}
        </p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: langColor, display: 'inline-block' }} />
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: '#6b7280' }}>{lang}</span>
        </div>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#374151' }}>
          {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </span>
      </div>
    </a>
  );
}

export default function GitHubStats() {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, { signal: controller.signal }),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`, { signal: controller.signal }),
    ])
      .then(([pRes, rRes]) => Promise.all([pRes.json(), rRes.json()]))
      .then(([profileData, reposData]) => {
        if (profileData.message) throw new Error(profileData.message);
        setProfile(profileData);
        const filtered = Array.isArray(reposData)
          ? reposData.filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)
          : [];
        setRepos(filtered);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError('Failed to load GitHub data.');
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, []);

  // Language distribution
  const langMap = {};
  repos.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
  const langs = Object.entries(langMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const total = langs.reduce((s, [, c]) => s + c, 0);

  const langColors = {
    JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3776ab',
    HTML: '#e34c26', CSS: '#563d7c', 'C++': '#00599c', C: '#555555',
  };

  return (
    <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', overflowY: 'auto' }}>
      <div style={{ maxWidth: 1100, width: '100%', padding: '60px 0' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '.3em', color: 'var(--accent, #dc2626)', textTransform: 'uppercase', marginBottom: 8 }}>
            // 05 — github.api
          </div>
          <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 'clamp(2.5rem,7vw,6rem)', fontWeight: 700, margin: 0 }}>
            GITHUB <span style={{ color: 'var(--accent, #dc2626)', textShadow: '0 0 8px var(--glow, rgba(220,38,38,0.9))' }}>STATS</span>
          </h2>
          {error && (
            <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: '#374151', marginTop: 12 }}>
              // {error}
            </p>
          )}
        </div>

        {/* Profile + stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
          <StatCard label="PUBLIC REPOS" icon="⬡" value={profile?.public_repos ?? '—'} loading={loading} />
          <StatCard label="FOLLOWERS" icon="◈" value={profile?.followers ?? '—'} loading={loading} />
          <StatCard label="FOLLOWING" icon="▷" value={profile?.following ?? '—'} loading={loading} />
          <StatCard label="TOTAL STARS" icon="★"
            value={repos.reduce((s, r) => s + r.stargazers_count, 0) || '—'}
            loading={loading} color="#f59e0b"
          />
        </div>

        {/* Language distribution */}
        {!loading && langs.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#374151', letterSpacing: '0.2em', marginBottom: 12 }}>
              // language_distribution
            </div>
            <div style={{ height: 8, display: 'flex', overflow: 'hidden', borderRadius: 0, marginBottom: 12, gap: 2 }}>
              {langs.map(([lang, count]) => (
                <div key={lang} style={{
                  flex: count / total,
                  background: langColors[lang] || '#6b7280',
                  boxShadow: `0 0 6px ${langColors[lang] || '#6b7280'}`,
                  transition: 'flex 0.5s ease',
                }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {langs.map(([lang, count]) => (
                <div key={lang} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: langColors[lang] || '#6b7280', display: 'inline-block' }} />
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#6b7280' }}>
                    {lang} <span style={{ color: '#374151' }}>{Math.round((count / total) * 100)}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top repos grid */}
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#374151', letterSpacing: '0.2em', marginBottom: 16 }}>
          // top_repositories
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ height: 120, border: '1px solid rgba(185,28,28,0.1)', background: 'rgba(4,0,0,0.4)', animation: 'ghPulse 1.5s ease infinite' }} />
            ))
            : repos.map(r => <RepoCard key={r.id} repo={r} />)
          }
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noreferrer"
            data-cursor="OPEN"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.65rem', color: 'var(--accent, #dc2626)',
              letterSpacing: '0.15em', textDecoration: 'none',
              padding: '8px 24px',
              border: '1px solid var(--accent-dark, #7f1d1d)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.08)'; e.currentTarget.style.borderColor = 'var(--accent, #dc2626)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--accent-dark, #7f1d1d)'; }}
          >
            VIEW ALL REPOS →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes ghPulse {
          0%,100% { opacity: 0.3; }
          50%      { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
