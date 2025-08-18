// jest.config.js
module.exports = {
  testEnvironment: 'node', // Nécessaire pour exécuter Jest avec Node.js
  testMatch: ['**/tests/**/*.test.js'], // Cherche tous les fichiers de tests dans le dossier tests/
  verbose: true, // Affiche plus de détails lors de l'exécution des tests
  collectCoverage: true, // Optionnel : génère un rapport de couverture de tests
  coverageDirectory: 'coverage', // Dossier où sera stocké le rapport de couverture
  clearMocks: true, // Réinitialise automatiquement les mocks entre chaque test
};
