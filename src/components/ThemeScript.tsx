export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  try {
    const cookie = document.cookie.split('; ').find((row) => row.startsWith('theme='));
    const value = cookie ? decodeURIComponent(cookie.split('=')[1]) : 'system';
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = value === 'system' ? (systemDark ? 'dark' : 'light') : value;
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
  } catch (error) {
    console.error('Failed to apply theme from cookie:', error);

    try {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const fallbackTheme = systemDark ? 'dark' : 'light';
      document.documentElement.classList.add(fallbackTheme);
      document.documentElement.style.colorScheme = fallbackTheme;
    } catch (fallbackError) {
      console.error('Failed to apply fallback theme:', fallbackError);
    }
  }
})();
        `,
      }}
    />
  );
}
