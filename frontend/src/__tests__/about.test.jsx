import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/about/page';
import React from 'react';

describe('AboutPage', () => {
  it('renders the main headings', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { name: "L'histoire d'OrnoPlante" })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '📅 Notre Parcours' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '📊 En chiffres' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '🎯 Mission & Vision' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '🌼 Nos Valeurs' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: '🏆 Certifications' })).toHaveLength(2);
    expect(screen.getByRole('heading', { name: '⭐ Pourquoi OrnoPlante ?' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '🧑‍🌾 Notre Équipe' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '🌳 Nos Services' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '📸 Nos Réalisations' })).toBeInTheDocument();
  });
});
