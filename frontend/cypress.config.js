const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Pattern pour tous les fichiers de test .cy.js dans cypress/e2e
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
