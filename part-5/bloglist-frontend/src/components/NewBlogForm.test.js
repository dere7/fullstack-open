import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
  const blog = {
    author: 'Steve Doe',
    title: 'The React Hook',
    url: 'http://soemhwere/far/away',
  }

  test('calls the event handler with right arguments', async () => {
    const user = userEvent.setup()
    const mockHandler = jest.fn()

    const { container } = render(<NewBlogForm onSubmit={mockHandler} />)
    const title = container.querySelector('#title')
    await user.type(title, blog.title)
    const author = container.querySelector('#author')
    await user.type(author, blog.author)
    const url = container.querySelector('#url')
    await user.type(url, blog.url)

    const createButton = container.querySelector('#create-btn')
    await user.click(createButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toEqual(blog)
  })
})
