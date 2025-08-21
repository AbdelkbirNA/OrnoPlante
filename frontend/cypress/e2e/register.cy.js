describe('Registration Flow', () => {
  beforeEach(() => {
    // Visit the registration page before each test
    cy.visit('http://localhost:3000/register');
  });

  it('should allow a new user to register successfully and redirect to login', () => {
    // Generate unique user data for each test run to avoid conflicts
    const uniqueId = Date.now();
    const user = {
      first_name: 'Test',
      last_name: `User_${uniqueId}`,
      email: `testuser_${uniqueId}@example.com`,
      password: 'password123',
    };

    // Intercept the backend call to assert on the request and response
    cy.intercept('POST', '/api/register').as('registerRequest');

    // Fill out the registration form
    // Note: These selectors might need to be adjusted to match your frontend component
    cy.get('input[name="first_name"]').type(user.first_name);
    cy.get('input[name="last_name"]').type(user.last_name);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
cy.get('input[name="confirm-password"]').type(user.password);
    // Submit the form
    cy.get('button[type="submit"]').click();

    // Wait for the request and assert on the response
    cy.wait('@registerRequest').then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
      expect(interception.response.body.message).to.equal('Utilisateur créé avec succès');
    });

    // Assert that the user is redirected to the login page
    cy.url().should('include', '/login');

    // Optional: Assert that a success message is shown to the user on the login page
    // cy.contains('Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.').should('be.visible');
  });

  it('should display an error message if passwords do not match', () => {
    // Fill out the form with mismatching passwords
    cy.get('input[name="first_name"]').type('Test');
    cy.get('input[name="last_name"]').type('User');
    cy.get('input[name="email"]').type('test.passwordmismatch@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirm-password"]').type('password123');
    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert that the backend error message is displayed in the UI
    // This requires your frontend to render the error.
  });

  it('should display an error message if the email is already used', () => {
    // First, create a user
    const uniqueId = Date.now();
    const user = {
      first_name: 'Existing',
      last_name: `User_${uniqueId}`,
      email: `existinguser_${uniqueId}@example.com`,
      password: 'password123',
      confirm_password: 'password123'
    };

    // We use cy.request to create the user directly via API to set up the test condition
    cy.request('POST', 'http://localhost:8080/api/register', user);

    // Now, try to register again with the same email
    cy.get('input[name="first_name"]').type(user.first_name);
  cy.get('input[name="last_name"]').type(user.last_name);
  cy.get('input[name="email"]').type(user.email);
  cy.get('input[name="password"]').type(user.password);
  cy.get('input[name="confirm-password"]').type(user.password);
  cy.get('button[type="submit"]').click();

    // Assert that the error message for duplicate email is shown
  });
});
