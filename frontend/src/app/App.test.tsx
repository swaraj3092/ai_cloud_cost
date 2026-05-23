import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Check if a known element or text is in the document
    // We don't have the exact text right now, but just rendering it is a good start.
    expect(document.body).toBeDefined();
  });
});
