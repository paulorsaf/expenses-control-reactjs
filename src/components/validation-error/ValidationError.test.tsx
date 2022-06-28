import React from 'react';
import { render, screen } from '@testing-library/react';
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

    describe('given error is mandatory', () => {

        test('when value is empty, then return error', () => {
            render(<ValidationError
                errorMessage='anyErrorMessage'
                hasChanged={true}
                testId='error'
                type='required'
                value=''
            />);
    
            expect(screen.getByTestId('error')).not.toBeNull();
        })
    
        test('when value is not empty, then return null', () => {
            render(<ValidationError
                errorMessage='anyErrorMessage'
                hasChanged={true}
                testId='error'
                type='required'
                value='anyValue'
            />);
    
            expect(screen.queryByTestId('error')).toBeNull();
        })

    })

    describe('given error is email', () => {

        test('when value is invalid, then return error', () => {
            render(<ValidationError
                errorMessage='anyErrorMessage'
                hasChanged={true}
                testId='error'
                type='email'
                value='invalid'
            />);
    
            expect(screen.getByTestId('error')).not.toBeNull();
        })
    
        test('when value is valid, then return null', () => {
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

})