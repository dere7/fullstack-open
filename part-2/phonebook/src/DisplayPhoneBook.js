import React from 'react';

const DisplayPhoneBook = ({ phoneBook }) => {
  return (
    <>
      <h2>Numbers</h2>
      {phoneBook.map(({ name, number }) => (
        <p key={name}>
          {name} {number}
        </p>
      ))}
    </>
  );
};

export default DisplayPhoneBook;
