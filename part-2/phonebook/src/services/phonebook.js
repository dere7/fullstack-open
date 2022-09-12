import axios from 'axios';

const base_url = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(base_url);
  return request.then((res) => res.data);
};

const newPerson = (name, number) => {
  const request = axios.post(base_url, { name, number });
  return request.then((res) => res.data).catch((err) => alert(`Error: ${err}`));
};

const deletePerson = (id) => {
  const request = axios.delete(`${base_url}/${id}`);
  return request.then((res) => res.data).catch((err) => alert(`Error: ${err}`));
};

const updatePerson = (id, name, number) => {
  const request = axios.put(`${base_url}/${id}`, { name, number });
  return request.then((res) => res.data).catch((err) => alert(`Error: ${err}`));
};

const phonebookService = { getAll, newPerson, deletePerson, updatePerson };

export default phonebookService;
