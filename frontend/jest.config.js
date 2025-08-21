module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(js|jsx|ts|tsx)',
    '**/?(*.)+(spec|test).+(js|jsx|ts|tsx)'
  ],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // <-- pointé ici
  moduleNameMapper: {
  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  '^@/(.*)$': '<rootDir>/src/$1' // mappe @/xxx → src/xxx
},
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
};
