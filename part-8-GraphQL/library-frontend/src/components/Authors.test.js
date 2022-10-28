import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import Authors from './Authors'
import { ALL_AUTHORS } from '../queries'
import '@testing-library/jest-dom'

const mocks = [{
  request: {
    query: ALL_AUTHORS,
  },
  result: {
    data: {
      allAuthors: [
        {
          "name": "dereje",
          "bookCount": 1,
          "born": null,
          "id": "635ba63230d4c693bf7231e5"
        },
      ]
    }
  }
}]

test('renders without error', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Authors show={true} isLoggedIn={false} />
    </MockedProvider>
  )


  expect(await screen.findByText('loading...')).toBeInTheDocument()
  console.log(screen.debug())
  expect(await screen.findByText('dereje')).toBeInTheDocument()
})