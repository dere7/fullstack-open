import { useState } from 'react';
import DisplayPhoneBook from './DisplayPhoneBook';
import FilterForm from './FilterForm';
import NewEntryForm from './NewEntryForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [filter, setFilter] = useState('');

  const addNote = (newName, number) => {
    if (persons.findIndex(({ name }) => name === newName) === -1)
      setPersons(persons.concat({ name: newName, number }));
    else alert(`${newName} is already added to phonebook`);
  };
  const filtered = persons.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filter={filter} onChange={(e) => setFilter(e.target.value)} />
      <NewEntryForm addNote={addNote} />
      <DisplayPhoneBook phoneBook={filtered} />
    </div>
  );
};

export default App;
