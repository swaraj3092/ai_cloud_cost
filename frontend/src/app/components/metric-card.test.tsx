import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MetricCard } from './metric-card';

describe('MetricCard Component', () => {
  it('renders title and value', () => {
    render(
      <MetricCard
        title="Total Spend"
        value="$12,000"
        change="5%"
        changeType="positive"
        icon={<span>Icon</span>}
        accentColor="green"
      />
    );

    expect(screen.getByText('Total Spend')).toBeInTheDocument();
    expect(screen.getByText('$12,000')).toBeInTheDocument();
    expect(screen.getByText('5%')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });
});
