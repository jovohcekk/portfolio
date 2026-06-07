const TRANSITION_CLASS = "theme-transition";
const DURATION_MS = 480;

export function withThemeTransition(action: () => void): void {
  const root = document.documentElement;
  root.classList.add(TRANSITION_CLASS);
  action();
  window.setTimeout(() => root.classList.remove(TRANSITION_CLASS), DURATION_MS);
}
