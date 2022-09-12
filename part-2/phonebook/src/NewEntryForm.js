import { useState } from 'react';

const NewEntryForm = ({ addNew }) => {
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew(newName, number);
    setNewName('');
    setNumber('');
  };
  return (
    <>
      <h2>add a new</h2>
      <form>
        <div>
          name:{' '}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:{' '}
          <input value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
    </>
  );
};

export default NewEntryForm;
