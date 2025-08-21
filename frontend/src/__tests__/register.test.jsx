import { render, screen } from '@testing-library/react';
import { RegisterForm } from '@/components/Register-form';
import React from 'react';

describe('RegisterForm', () => {
  it('renders the register form correctly', () => {
    render(<RegisterForm />);

    // Check for the main title
    expect(screen.getByRole('heading', { name: 'Créer un compte', level: 1 })).toBeInTheDocument();

    // Check for first name input
    expect(screen.getByLabelText('Prénom')).toBeInTheDocument();

    // Check for last name input
    expect(screen.getByLabelText('Nom')).toBeInTheDocument();

    // Check for email input
    expect(screen.getByLabelText('Adresse e-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('exemple@gmail.com')).toBeInTheDocument();

    // Check for password input
    expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument();

    // Check for confirm password input
    expect(screen.getByLabelText('Confirmer le mot de passe')).toBeInTheDocument();

    // Check for the submit button
    expect(screen.getByRole('button', { name: 'Créer un compte' })).toBeInTheDocument();

    // Check for the link to the login page
    expect(screen.getByText('Vous avez déjà un compte ?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Se connecter' })).toBeInTheDocument();
  });

  it('disables all inputs and the submit button when disabled prop is true', () => {
    render(<RegisterForm disabled={true} />);

    // Check if inputs are disabled
    expect(screen.getByLabelText('Prénom')).toBeDisabled();
    expect(screen.getByLabelText('Nom')).toBeDisabled();
    expect(screen.getByLabelText('Adresse e-mail')).toBeDisabled();
    expect(screen.getByLabelText('Mot de passe')).toBeDisabled();
    expect(screen.getByLabelText('Confirmer le mot de passe')).toBeDisabled();

    // Check if the submit button is disabled and shows loading text
    const submitButton = screen.getByRole('button', { name: 'Création en cours...' });
    expect(submitButton).toBeDisabled();
  });
});
