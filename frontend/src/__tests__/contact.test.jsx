import { render, screen, waitFor } from '@testing-library/react';
import ContactPage from '@/app/contact/page';
import React from 'react';

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub';
  },
}));

describe('ContactPage', () => {
  it('renders the main sections', async () => {
    render(<ContactPage />);

    expect(screen.getByRole('heading', { name: 'Contactez OrnoPlante' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Contactez-nous rapidement' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Envoyez-nous un message' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Questions fréquentes' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Venez nous rendre visite' })).toBeInTheDocument();

    // Check for the form
    await waitFor(() => {
  expect(document.querySelector('form')).toBeInTheDocument();
});
  });
});