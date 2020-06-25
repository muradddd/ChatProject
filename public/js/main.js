const socket = io();
var msgDiv = document.getElementById("messages");


// MSG FROM SERVER
socket.on('message', message => {
    outputMsg(message);

    // SCROLL DOWN
    msgDiv.scrollTop = msgDiv.scrollHeight;
});


document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    let msgInput = document.getElementById('msgInput');
    let msg = msgInput.value;
    msgInput.value = '';
    msgInput.focus();

    saveMsg(msg);
});


// OUTPUT MST TO DOM
const outputMsg = message => {
    let msgLi = document.createElement('li');
    msgLi.innerText = message;
    msgDiv.appendChild(msgLi);
};


// SAVE MSG TO DB
const saveMsg = async message => {
    const url = 'http://localhost:3000/threads';
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    }

    try {
        const msgPromise = await fetch(url, settings);
        const msgResponse = await msgPromise.json();

        if (msgPromise.status === 201) {
            // EMIT MSG TO SERVER
            socket.emit('chatMsg', message);
        }
    } catch (error) {
        throw error;
    }
};

// RETRIEVE MSG
const retrieveMsg = async () => {
    const url = 'http://localhost:3000/threads';
    const settings = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }

    try {
        const msgPromise = await fetch(url, settings);
        const msgResponse = await msgPromise.json();

        msgResponse.forEach(e => {
            msg = JSON.stringify(e.message);
            outputMsg(msg);
        });
    } catch (error) {
        throw error;
    }
}

retrieveMsg();