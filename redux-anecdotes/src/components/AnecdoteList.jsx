import { useSelector, useDispatch } from "react-redux";
import { votesAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(({filterSearch, anecdotes}) => {
      console.log(anecdotes)
        const filterd = filterSearch || '';
        if (filterSearch !== '') {
            return anecdotes.filter(ad => ad.content.includes(filterd))
        }
        return anecdotes
    })

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  
  const vote = (id, content, votes) => {
    dispatch(votesAnecdote(id, content, votes));
    dispatch(setNotification(`You voted for: "${content}"`,5));
  };
  

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
