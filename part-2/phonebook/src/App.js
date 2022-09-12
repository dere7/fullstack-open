import { useEffect, useState } from 'react';
import DisplayPhoneBook from './DisplayPhoneBook';
import FilterForm from './FilterForm';
import NewEntryForm from './NewEntryForm';
import phonebookService from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    phonebookService.getAll().then(setPersons);
  }, []);

  const addNewPerson = (newName, number) => {
    const person = persons.find(({ name }) => name === newName);
    if (!person) {
      phonebookService
        .newPerson(newName, number)
        .then((data) => setPersons(persons.concat(data)));
    } else {
      // eslint-disable-next-line no-restricted-globals
      const confirmUpdate = confirm(
        `${newName} is already added to phonebook, replace old number with a new one?`
      );
      if (confirmUpdate) {
        phonebookService.updatePerson(person.id, newName, number);
        const newPersons = persons.map((p) => {
          if (p.id === person.id) p.number = number;
          return p;
        });
        setPersons(newPersons);
      }
    }
  };
  const filtered = persons.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm('Are you sure you wanna delete person?');
    if (confirmDelete) {
      phonebookService.deletePerson(id);
      setPersons(persons.filter((p) => p.id !== id));
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filter={filter} onChange={(e) => setFilter(e.target.value)} />
      <NewEntryForm addNew={addNewPerson} />
      <DisplayPhoneBook phoneBook={filtered} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
