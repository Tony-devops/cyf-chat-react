import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import MessageForm from './MessageForm';
import AllMessages from './AllMessages';
import LatestMessages from './LatestMessage';


function App() {
  const [messages, setMessages] =useState([]);
  const [refresh, setRefresh] = useState(true);
  const [showMessages, setShowMessages]= useState(false);
  const [latestMessages, setLatestMessages] =useState(messages);
  const [showLatestMessages, setShowLatestMessages] = useState(false);

  // refresh message
  function messageRefresh(state) {
    setRefresh(state);
  }

  // get all messages
  function getAllMessages() {
    fetch('https://tony-arora-cyf-chat-server.glitch.me/messages')
    .then((response) => response.json())
    .then((data) =>{
      setMessages(data);
    })
    .catch((error)=> console.log(error));
  }

  // get latest messages
  function getLatestMessages() {
    fetch ('https://tony-arora-cyf-chat-server.glitch.me/messages/last')
    .then((response)=> response.json())
    .then((data)=> {
      setRefresh(false);
      setLatestMessages(data);
    })
    .catch((error)=>console.log(error));
  }

  useEffect(()=> {
    getAllMessages();
    if(refresh) {
      getLatestMessages();
    }
  }, [refresh, setRefresh]);
  return (
    <div className="App">
      <Header />
      <MessageForm getAllMessages = {getAllMessages}
      messageRefresh={messageRefresh} />
      <button onClick={() =>setShowMessages(true)}> All Messages</button> 
      {showMessages && (
        <AllMessages messages={messages} messageRefresh={messageRefresh} />
      )}
      <button onClick={()=> setShowLatestMessages(true)}>
Latest Messages
      </button>
      <LatestMessages latestMessages={latestMessages} messageRefresh={messageRefresh} refresh={refresh} />
    </div>
  );
}

export default App;
