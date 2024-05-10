import React from 'react';

// eslint-disable-next-line react/prop-types
const Notification = ({ message }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: message ? 'block' : 'none',
  };

  return (
    <div style={style}>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Notification;
