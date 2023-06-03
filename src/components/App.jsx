import React, { useState, useEffect } from 'react';
import css from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = contact => {
    if (contacts.find(item => item.name === contact.name)) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }
    setContacts(prevState => {
      return [...prevState, contact];
    });
  };

  const changeFilter = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const filteredContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const deleteContact = e => {
    setContacts(contacts.filter(contact => contact.id !== e));
  };

  return (
    <div className={css.formContainer}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm contacts={contacts} addContact={handleAddContact} />

      <h2 className={css.title}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={filteredContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }
//   handleAddContact = contact => {
//     const { contacts } = this.state;

//     if (contacts.find(item => item.name === contact.name)) {
//       alert(`${contact.name} is already in contacts.`);
//       return;
//     }
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, contact],
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   filteredContacts = () => {
//     const { filter, contacts } = this.state;
//     // console.log(contacts);
//     if (contacts === '') {
//       return;
//     }

//     const normalizeFilter = filter.toLowerCase();

//     return contacts.filter(({ name }) =>
//       name.toLowerCase().includes(normalizeFilter)
//     );
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     const filteredContacts = this.filteredContacts();

//     return (
//       <div className={css.formContainer}>
//         <h1 className={css.title}>Phonebook</h1>
//         <ContactForm
//           contacts={this.state.contacts}
//           addContact={this.handleAddContact}
//         />

//         <h2 className={css.title}>Contacts</h2>
//         <Filter value={this.state.filter} onChange={this.changeFilter} />
//         <ContactList
//           contacts={filteredContacts}
//           onDeleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }
// export default App;
