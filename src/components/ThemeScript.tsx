export default function ThemeScript() {
  const script = `(() => {
  try {
    const cookie = document.cookie.split('; ').find((row) => row.startsWith('theme='));
    const value = cookie ? decodeURIComponent(cookie.split('=')[1]) : 'system';
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = value === 'system' ? (systemDark ? 'dark' : 'light') : value;
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
  } catch (_) {
    // no-op
  }
})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
