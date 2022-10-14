import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdote"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const index = state.findIndex(({ id }) => id === action.payload.id)
      state[index] = action.payload
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecodtes(state, action) {
      return action.payload
    }
  }
})

export const { updateAnecdote, addAnecdote, setAnecodtes } = anecdoteSlice.actions

export const initializeAnecdote = () => async dispatch => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecodtes(anecdotes))
}

export const createAnecdote = anecdote => async dispatch => {
  const newAnecdote = await anecdoteService.createAnecdote(anecdote)
  dispatch(addAnecdote(newAnecdote))
}

export const voteAnecdote = id => async (dispatch, getState) => {
  const anecdotes = getState().anecdotes
  let anecdote = anecdotes.find(({ id: anecdoteId }) => anecdoteId === id)
  anecdote = { ...anecdote, votes: anecdote.votes + 1 }

  const newAnecdote = await anecdoteService.updateAnecdote(anecdote)
  dispatch(updateAnecdote(newAnecdote))
}

export default anecdoteSlice.reducer
