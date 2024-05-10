import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react';
import { createAnecdote } from '../requests'
import Notification from './Notification';


// eslint-disable-next-line react/prop-types
const AnecdoteForm = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes']);
      setNotificationMessage('Anecdote created successfully!');
      console.log("successfully created anecdote");
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        setNotificationMessage('');
      }, 5000);
    },
      onError: (error) => {
        setNotificationMessage(`Failed to create anecdote: ${error.message}`);
        setTimeout(() => {
          setShowNotification(false);
          setNotificationMessage('');
        }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value;

    if (content.length < 5) {
      setNotificationMessage('Anecdote must be at least 5 characters long!');
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        setNotificationMessage('');
      }, 5000);

      return;
    }
    event.target.anecdote.value = ''
    const getId = () => (100000 * Math.random()).toFixed(0);
    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
  }

  return (
    <div>
      {showNotification && <Notification message={notificationMessage} />}
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
