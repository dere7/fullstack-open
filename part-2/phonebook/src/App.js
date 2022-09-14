import { useEffect, useState } from 'react';
import DisplayPhoneBook from './DisplayPhoneBook';
import FilterForm from './FilterForm';
import NewEntryForm from './NewEntryForm';
import phonebookService from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [msg, setMsg] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    phonebookService.getAll().then(setPersons);
  }, []);

  const setMessage = (msg, error = false) => {
    if (error) setErrorMessage(msg);
    else setMsg(msg);
    setTimeout(() => {
      error ? setErrorMessage('') : setMsg('');
    }, 5000);
  };

  const addNewPerson = (newName, number) => {
    const person = persons.find(({ name }) => name === newName);
    if (!person) {
      phonebookService
        .newPerson(newName, number)
        .then((data) => {
          setPersons(persons.concat(data));
          setMessage(`Added ${newName}`);
        })
        .catch((err) => setErrorMessage(err.response.data.error));
    } else {
      // eslint-disable-next-line no-restricted-globals
      const confirmUpdate = confirm(
        `${newName} is already added to phonebook, replace old number with a new one?`
      );
      if (confirmUpdate) {
        phonebookService
          .updatePerson(person.id, newName, number)
          .then(() => {
            const newPersons = persons.map((p) => {
              if (p.id === person.id) p.number = number;
              return p;
            });
            setPersons(newPersons);
            setMessage(`Updated ${newName}`);
          })
          .catch(() =>
            setMessage(`The ${newName} is already deleted on server`, true)
          );
      } else {
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
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setMessage(`Successfully deleted`);
        })
        .catch(() => setMessage(`The person is already deleted`, true));
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage && <div className="error">{errorMessage} </div>}
      {msg && <div className="message">{msg} </div>}
      <FilterForm filter={filter} onChange={(e) => setFilter(e.target.value)} />
      <NewEntryForm addNew={addNewPerson} />
      <DisplayPhoneBook phoneBook={filtered} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
