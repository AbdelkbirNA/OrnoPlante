import { render, screen } from '@testing-library/react';
import { LoginForm } from '@/components/login-form';
import React from 'react';

describe('LoginForm', () => {
  it('renders the login form correctly', () => {
    render(<LoginForm />);

    // Check for the main title
    expect(screen.getByText('Se connecter à votre compte')).toBeInTheDocument();

    // Check for email input
    expect(screen.getByLabelText('Adresse e-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('exemple@domaine.com')).toBeInTheDocument();

    // Check for password input
    expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument();

    // Check for the submit button
    expect(screen.getByRole('button', { name: 'Connexion' })).toBeInTheDocument();

    // Check for the link to the registration page
    expect(screen.getByText("Vous n'avez pas encore de compte ?")).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Créer un compte' })).toBeInTheDocument();
  });

  it('displays an error message when the error prop is provided', () => {
    const errorMessage = 'Identifiants incorrects';
    render(<LoginForm error={errorMessage} />);

    // Check if the error message is displayed
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
