describe('Login Flow', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('http://localhost:3000/login');
  });

  it('should display the login form correctly', () => {
    // Check for the main title
    cy.contains('h1', 'Se connecter à votre compte').should('be.visible');

    // Check for email input
    cy.contains('label', 'Adresse e-mail').should('be.visible');
    cy.get('input[placeholder="exemple@domaine.com"]').should('be.visible');

    // Check for password input
    cy.contains('label', 'Mot de passe').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');

    // Check for the submit button
    cy.get('button[type="submit"]').contains('Connexion').should('be.visible');

    // Check for the link to the registration page
    cy.contains("Vous n'avez pas encore de compte ?").should('be.visible');
    cy.get('a[href="/register"]').contains('Créer un compte').should('be.visible');
  });

  it('should show an error message with invalid credentials (mocked)', () => {
    // Mock the API call to return an error
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      body: {
        message: 'Identifiants incorrects',
      },
    }).as('loginRequest');

    // Type invalid credentials
    cy.get('input[placeholder="exemple@domaine.com"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpassword');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Wait for the mocked request to complete
    cy.wait('@loginRequest');

    // Check for the error message from the mocked response
    cy.contains('Identifiants incorrects').should('be.visible');
  });

  it('should log in successfully with mocked credentials and redirect', () => {
    // Mock the API call for login
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: {
        token: 'fake-jwt-token',
        user: {
          id: '1',
          name: 'Test User',
          email: 'testuser@example.com',
        },
      },
    }).as('loginRequest');

    // Type any credentials, they will be mocked
    cy.get('input[placeholder="exemple@domaine.com"]').type('testuser@example.com');
    cy.get('input[type="password"]').type('password123');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Wait for the mocked request to complete
    cy.wait('@loginRequest');

    // The user should be redirected to the profile page
    cy.url().should('include', '/profil');
    cy.contains('Informations personnelles').should('be.visible');
  });
});
