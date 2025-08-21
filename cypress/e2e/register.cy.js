
// This file is a placeholder. The original register.cy.js was not found.
// Please update your actual register.cy.js file with the following change.

// Original line (assuming this is what was in your test):
// cy.get('input[name="confirm_password"]').type(user.password);

// Corrected line:
cy.get('input[name="confirm-password"]').type(user.password);
