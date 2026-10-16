
/* @vitest-environment jsdom */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar', () => {
    it('attēlo navigācijas saites', () => {
        render(<Navbar />);

        expect(
            screen.getByRole('link', { name: 'Posts' })
        ).toBeTruthy();

        expect(
            screen.getByRole('link', { name: 'About' })
        ).toBeTruthy();
    });
});
