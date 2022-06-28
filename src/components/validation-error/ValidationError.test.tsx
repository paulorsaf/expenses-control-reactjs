import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ValidationError from './ValidationError';

describe('ValidationError', () => {

    test('given value has not changed, then return null', () => {
        render(<ValidationError
            errorMessage='anyErrorMessage'
            hasChanged={false}
            testId='error'
            type='email'
            value='anyValue'
        />);

        expect(screen.queryByTestId('error')).toBeNull();
    })

    test('given value is mandatory, when value is empty, then return error', () => {
        render(<ValidationError
            errorMessage='anyErrorMessage'
            hasChanged={true}
            testId='error'
            type='required'
            value=''
        />);

        expect(screen.getByTestId('error')).not.toBeNull();
    })

    test('given value is mandatory, when value is not empty, then return null', () => {
        render(<ValidationError
            errorMessage='anyErrorMessage'
            hasChanged={true}
            testId='error'
            type='required'
            value='anyValue'
        />);

        expect(screen.queryByTestId('error')).toBeNull();
    })

    test('given error is email, when value is invalid, then return error', () => {
        render(<ValidationError
            errorMessage='anyErrorMessage'
            hasChanged={true}
            testId='error'
            type='email'
            value='invalid'
        />);

        expect(screen.getByTestId('error')).not.toBeNull();
    })

    test('given error is email, when value is valid, then return null', () => {
        render(<ValidationError
            errorMessage='anyErrorMessage'
            hasChanged={true}
            testId='error'
            type='email'
            value='valid@email.com'
        />);

        expect(screen.queryByTestId('error')).toBeNull();
    })

})