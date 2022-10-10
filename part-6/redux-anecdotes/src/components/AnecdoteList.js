import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => (
  <div key={anecdote.id}>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={handleVote}>vote</button>
    </div>
  </div>
)

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter(
      ({ content }) => content.toLowerCase().includes(state.filter.toLowerCase()))
  )
  const dispatch = useDispatch()
  const vote = ({ id, content }) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`voted '${content}'`))
  }

  console.log(anecdotes)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          anecdote={anecdote}
          handleVote={() => vote(anecdote)}
          key={anecdote.id}
        />
      ))}
    </>
  )
}

export default AnecdoteList
