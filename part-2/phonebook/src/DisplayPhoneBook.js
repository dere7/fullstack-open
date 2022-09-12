import React from 'react';

const DisplayPhoneBook = ({ phoneBook }) => {
  return (
    <>
      <h2>Numbers</h2>
      {phoneBook.map(({ id, name, number }) => (
        <p key={id}>
          {name} {number}
        </p>
      ))}
    </>
  );
};

export default DisplayPhoneBook;
