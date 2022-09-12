import React from 'react';

const DisplayPhoneBook = ({ phoneBook, handleDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      {phoneBook.map(({ id, name, number }) => (
        <p key={id}>
          {name} {number}
          <button onClick={() => handleDelete(id)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default DisplayPhoneBook;
