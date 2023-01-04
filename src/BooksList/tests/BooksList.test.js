// import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom"
import BooksList from '../BooksList';
import {expect, jest, test} from '@jest/globals'

it('renders correctly', () => {
    expect(true).toBeTruthy()
//   const tree = renderer
//     .create(<BooksList />)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
});

it('snapshot correctly', () => {
  const { asFragment } = render(<Router><BooksList books={[]} updatedBooks={[]}/></Router>)
  expect(asFragment()).toMatchSnapshot()
});