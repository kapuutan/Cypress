const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://fufelka.ru',
    viewportWidth: 1366,
    viewportHeight: 768,
    video: true,
    retries: 1,
  },
});
