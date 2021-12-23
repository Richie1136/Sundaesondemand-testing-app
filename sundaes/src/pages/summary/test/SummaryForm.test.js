import SummaryForm from "../SummaryForm"
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event'


test('initial conditions', () => {
  render(<SummaryForm />)
  // check that the button starts out enabled

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  })
  expect(checkbox).not.toBeChecked()

  const confirmButton = screen.getByRole('button', { name: /confirm order/i })
  expect(confirmButton).toBeDisabled()
});



test('Checkbox enables button on first click and disable on second click', () => {
  render(<SummaryForm />)

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  const confirmButton = screen.getByRole('button', { name: /confirm order/i })


  userEvent.click(checkbox)
  expect(confirmButton).toBeEnabled()

  userEvent.click(checkbox)
  expect(confirmButton).toBeDisabled()
});


test('Popover responds to hover', async () => {
  render(<SummaryForm />)
  // popover starts out hidden
  const nullpopover = screen.queryByText(/no Ice cream will actually be delivered/i)
  expect(nullpopover).not.toBeInTheDocument()
  // popover appears upon mouseover of checkbox label
  const termsandconditions = screen.getByText(/terms and conditions/i)

  userEvent.hover(termsandconditions);

  const popover = screen.getByText(/no Ice cream will actually be delivered/i)
  expect(popover).toBeInTheDocument()
  // popover disappears when we mouse out
  userEvent.unhover(termsandconditions)
  await waitForElementToBeRemoved(() => screen.queryAllByText(/no Ice cream will actually be delivered/i))
})