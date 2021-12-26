import { render, screen } from '@testing-library/react'
import Options from '../Options'

test('Displays image for each scoop from the server', async () => {
  render(<Options optionType='scoops' />)

  // Find images

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  expect(scoopImages).toHaveLength(4)
  // confirm alt text of images
  const altText = scoopImages.map((element => element.alt))
  expect(altText).toEqual(['Mint chip scoop', 'Vanilla scoop', 'Chocolate scoop', 'Salted caramel scoop'])
})