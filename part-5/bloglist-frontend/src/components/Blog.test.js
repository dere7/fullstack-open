import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import '@testing-library/jest-dom/extend-expect'

describe('<Blog />', () => {
  const blog = {
    author: 'Steve Doe',
    id: '633ec5dcc498d4747d170412',
    likedBy: ['633ec3fd7877ee576b6346fe', '633eceb2ffcac14438c1bcdb'],
    likes: 2,
    title: 'The React Hook',
    url: 'http://soemhwere/far/away',
    user: {
      id: '633ec3fd7877ee576b6346fe',
      username: 'user123',
    },
  }
  let div
  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn()
    const container = render(
      <Blog blog={blog} handleLike={mockHandler} deleteBlog={() => {}} />
    ).container
    div = container.querySelector('.blog')
  })

  test('renders the blog\'s title and author', () => {
    expect(div).toHaveTextContent('The React Hook')
    expect(div).toHaveTextContent('Steve Doe')

    expect(div).not.toHaveTextContent('http://soemhwere/far/away')
    expect(div).not.toHaveTextContent('likes 2')
  })

  test('shows blog\'s url and number of likes when view button clicked', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('view')
    await user.click(button)

    expect(div).toHaveTextContent('http://soemhwere/far/away')
    expect(div).toHaveTextContent('likes 2')
  })

  test('event handler called twice when like button is clicked twice', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('view')
    await user.click(button)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
