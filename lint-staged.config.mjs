/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  "**/*.{mts,tsx}": ["eslint --fix", "prettier --write"],
  "**/*.md": "prettier --write",
};
