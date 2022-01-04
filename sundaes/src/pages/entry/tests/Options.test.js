import { render, screen } from '../../../test-utils/testing-library-utils'
import Options from '../Options'
import { OrderDetailsProvider } from '../../../contexts/OrderDetails'
import userEvent from '@testing-library/user-event'

test('Displays image for each scoop from the server', async () => {
  render(<Options optionType='scoops' />)

  // Find images

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  expect(scoopImages).toHaveLength(4)
  // confirm alt text of images
  const altText = scoopImages.map((element => element.alt))
  expect(altText).toEqual(['Mint chip scoop', 'Vanilla scoop', 'Chocolate scoop', 'Salted caramel scoop'])
})

test('Displays image for each topping from the server', async () => {
  render(<Options optionType="toppings" />)

  // Find images
  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i })
  expect(toppingImages).toHaveLength(3)
  // confirm alt text of images
  const imageTitle = toppingImages.map((img => img.alt))
  expect(imageTitle).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ])
})


test('Displays image for each toppings option from server', async () => {
  // Mock Service Worker will return three toppings from server
  render(<Options optionType="toppings" />);

  // find images, expect 3 based on what msw returns
  const images = await screen.findAllByRole('img', { name: /topping$/i });
  expect(images).toHaveLength(3);

  // check the actual alt text for the images
  // @ts-ignore
  const imageTitles = images.map((img) => img.alt);
  expect(imageTitles).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});

test("don't update total if scoops input is invalid", async () => {
  render(<Options optionType='scoops' />)

  // expect button to be enabled after adding scoop
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '-1')

  // make sure scoops subtotal hasn't updated
  const scoopSubtotal = screen.getByText('Scoops total: $0.00')
  expect(scoopSubtotal).toBeInTheDocument()
})