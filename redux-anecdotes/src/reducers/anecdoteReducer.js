import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes'


const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    voteAnecdote(state, action) {
      return state.map(anecdote =>
        anecdote.id === action.payload.id ? { ...anecdote, votes: action.payload.votes } : anecdote
      );
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  },
});

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const votesAnecdote = (id, content, votes) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.voteThis({ id, content, votes });
    dispatch(voteAnecdote(updatedAnecdote));
  }
}


export default anecdotesSlice.reducer;
