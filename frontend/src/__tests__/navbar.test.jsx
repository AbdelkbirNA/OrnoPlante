
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/navbar';
import { useAuth } from '@/lib/auth-context';
import React from 'react'


jest.mock('@/lib/auth-context');

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('Navbar', () => {
  it('renders correctly when logged out', () => {
    useAuth.mockReturnValue({
      isLoggedIn: false,
      user: null,
      loading: false,
    });

    render(<Navbar />);

    expect(screen.getByText('Se connecter')).toBeInTheDocument();
    expect(screen.getByText("S'inscrire")).toBeInTheDocument();
  });

  
});
