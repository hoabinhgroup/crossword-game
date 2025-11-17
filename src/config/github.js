// GitHub Configuration
// Tạo file .env và thêm GITHUB_TOKEN và GITHUB_REPO
export const GITHUB_CONFIG = {
  token: import.meta.env.VITE_GITHUB_TOKEN || '',
  repo: import.meta.env.VITE_GITHUB_REPO || 'TuanLouis/crossword-images',
  branch: import.meta.env.VITE_GITHUB_BRANCH || 'main'
};

