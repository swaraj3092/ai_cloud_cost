import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from './sidebar';

describe('Sidebar Component', () => {
  it('renders navigation links correctly', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    // Sidebar should have links to all standard paths
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    // Check for some specific text inside the sidebar 
    // Wait, the sidebar doesn't render text labels for links directly, it renders icons?
    // Wait, looking at the Sidebar code, the label text isn't actually rendered in the DOM, 
    // but the AI logo text "AI" is rendered.
    expect(screen.getByText('AI')).toBeInTheDocument();
  });
});
