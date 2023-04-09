import React, {useState} from 'react';

function MessageForm(props) {
    const [formMessage, setFormMessage] = useState({
        name: '',
        message:'',
        time: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('https://tony-arora-cyf-chat-server.glitch.me/messages', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: formMessage.name,
                text: formMessage.message,
                timeSent :formMessage.time,
            }),
        })
        .then((response) => response.json())
        .then((data)=>{
            props.getAllMessages();
            props.messageRefresh(true);
        })
        .catch((error)=>{
            console.error('Error',error);
        });
    };
    function handleInputChange(event) {
        event.preventDefault();
        setFormMessage({...formMessage, [event.target.name]: event.target.value});
    }
    return (
        <form action='/messages' method='post' onSubmit={handleSubmit} >
         <div>
            <label htmlFor='name'> Your Name</label>
            <input type='text' name='name' placeholder='Enter name' value={formMessage.name} onChange={handleInputChange} />
         </div>   
         <div>
            <label htmlFor="message">Please enter your message</label>
        <input type='text' name='message' placeholder='Your message'
          value={formMessage.message} onChange={handleInputChange}
        />
         </div>
         <button type='submit' className='submit-button'> Enter </button>
        </form>
    );


}
export default MessageForm;