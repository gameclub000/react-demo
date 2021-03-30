import { fireEvent } from '@testing-library/dom';
import { makeTestStore, testRender } from '../utils/testUtils';
import BlockForm from './BlockForm';
import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react';

describe('BlockForm', () => {
    it('should pass this canary test', () => expect(true).toBe(true));

    it('should call dispatch with getList and getData on submit', () => {
        const store = makeTestStore();
        const formNode = testRender(<BlockForm />, { store }).getByTitle(
            'form'
        );

        fireEvent.submit(formNode);

        expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('should call setCurrentBlock on input change', () => {
        const store = makeTestStore();
        const setCurrentBlock = jest.fn();
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, setCurrentBlock]);
        const inputNode = testRender(<BlockForm />, { store }).getByTitle(
            'input'
        );

        fireEvent.change(inputNode, { target: { value: 'a' } });

        expect(setCurrentBlock).toHaveBeenLastCalledWith('a');
    });
});
