import { render, screen } from '@testing-library/react'
import ScoopOption from '../ScoopOption';
import userEvent from '@testing-library/user-event'

test('indicate if scoop count is non-int or out of range', async () => {
  render(<ScoopOption name="" imagePath='' updateItemCount={jest.fn()} />)

  // expect input to be invalid with negative number

  const vanillaInput = screen.getByRole('spinbutton')
  userEvent.click(vanillaInput)
  userEvent.type(vanillaInput, '-1')
  expect(vanillaInput).toHaveClass('is-invalid')

  // replace with decimal input

  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '2.5')
  expect(vanillaInput).toHaveClass('is-invalid')

  // replace with input thats too high

  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '11')
  expect(vanillaInput).toHaveClass('is-invalid')

  // replace with valid input
  // note: here we're testing validation rules (namely that the input can display
  //as valid and not react-bootstrap's response)

  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '3')
  expect(vanillaInput).not.toHaveClass('is-invalid')
})