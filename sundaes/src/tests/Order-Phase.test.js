import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

test('order phases for happy path', async () => {
  // render app
  render(<App />)
  // add ice cream scoops and toppings
  const scoop = await screen.findByRole('spinbutton', { name: 'Vanilla' })
  userEvent.clear(scoop)
  userEvent.type(scoop, '1')
  const chocolateInput = screen.getByRole('spinbutton', { name: 'Chocolate' });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries'
  })
  userEvent.click(cherriesCheckbox)
  // find and click order button 
  const orderSummaryBTN = screen.getByRole('button', {
    name: /order sundae/i
  })
  userEvent.click(orderSummaryBTN)
  // check summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' })
  expect(summaryHeading).toBeInTheDocument()
  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' })
  expect(scoopsHeading).toBeInTheDocument()
  const toppingHeading = screen.getByRole('heading', { name: 'Toppings: $1.50' })
  expect(toppingHeading).toBeInTheDocument()

  // check summary option items
  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument()

  // accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i })
  userEvent.click(tcCheckbox)
  const confirmOrderBTN = screen.getByRole('button', { name: /confirm order/i })
  userEvent.click(confirmOrderBTN)
  // confirm order number based on confirmation page
  // this one is async becuase there is a POST request to server between server 
  // and confirmation pages
  // Expect "Loading" to show
  const loading = screen.getByText(/loading/i)
  expect(loading).toBeInTheDocument()

  const thankYouHeader = await screen.findByRole('heading', { name: /Thank You!/i })
  expect(thankYouHeader).toBeInTheDocument()
  // expect that loading has disappeared
  const notLoading = screen.queryByText('loading')
  expect(notLoading).not.toBeInTheDocument()
  const orderNumber = await screen.findByText(/order number/i)
  expect(orderNumber).toBeInTheDocument()

  // click new order button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i })
  userEvent.click(newOrderButton)

  // check that scoops and toppings subtotals have been reset
  const scoopTotal = screen.getByText('Scoops total: $0.00')
  expect(scoopTotal).toBeInTheDocument()
  const toppingsTotal = screen.getByText('Scoops total: $0.00')
  expect(toppingsTotal).toBeInTheDocument()

  // wait for items to appear so that Testing Library doesn't get angry about 
  // stuff happening after test is over

  await screen.findByRole('spinbutton', { name: 'Vanilla' })
  await screen.findByRole('checkbox', { name: 'Cherries' })
})

test('toppings header is not on the summary page', async () => {
  // render app
  render(<App />)
  // add ice cream scoops and toppings 

  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')
  const chocolateInput = screen.getByRole('spinbutton', { name: 'Chocolate' })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')
  // find and click order summary button
  const orderSummaryBTN = screen.getByRole('button', { name: /order sundae/i })
  userEvent.click(orderSummaryBTN)
  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' })
  expect(scoopsHeading).toBeInTheDocument()
  const toppingHeading = screen.queryByRole('heading', { name: /toopings/i })
  expect(toppingHeading).not.toBeInTheDocument()
})