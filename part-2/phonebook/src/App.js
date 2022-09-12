import { useEffect, useState } from 'react';
import DisplayPhoneBook from './DisplayPhoneBook';
import FilterForm from './FilterForm';
import NewEntryForm from './NewEntryForm';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => setPersons(res.data));
  }, []);

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
