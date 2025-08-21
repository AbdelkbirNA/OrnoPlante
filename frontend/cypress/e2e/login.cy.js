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

  it('should log in successfully with a real user and redirect', () => {
    // IMPORTANT: Remplacez ces identifiants par ceux d'un utilisateur existant dans votre base de données de test locale.
    const userEmail = 'test@example.com';
    const userPassword = 'password123';

    // Remplir les identifiants
    cy.get('input[placeholder="exemple@domaine.com"]').type(userEmail);
    cy.get('input[type="password"]').type(userPassword);

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // L'utilisateur doit être redirigé vers la page de profil
    cy.url().should('include', '/profil');

    // La page de profil doit contenir les informations personnelles de l'utilisateur
    cy.contains('Informations personnelles').should('be.visible');
  });
});
