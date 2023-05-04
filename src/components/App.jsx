import { useState } from 'react';
import { ContactForm } from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import { Filter } from '../components/Filter/Filter';
import styled from 'styled-components';
import { Section } from './Section/Section';
import { searchContacts } from 'utils/searchContacts';
import { useLocalStorage } from 'hooks/useLocalStorage';

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpsonna', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const handleAddContact = contact => {
    if (
      contacts.some(
        ({ name, number }) => contact.name === name || contact.number === number
      )
    ) {
      alert(
        `${contact.name} already in contacts! Check contact name or number`
      );
      return true;
    }
    setContacts(prevState => [...prevState, contact]);
    return false;
  };

  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  const handleDeleteContact = id => {
    setContacts(prevcontacts =>
      prevcontacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = searchContacts(contacts, filter);
  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm addContact={handleAddContact} />
      </Section>
      <Section title="Contacts">
        <Filter changeFilter={handleChangeFilter} />
        <ContactList
          onDeleteContact={handleDeleteContact}
          contacts={filteredContacts}
        />
      </Section>
    </Container>
  );
}
