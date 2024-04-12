'use strict';

// const socket = io("wss://chat.lswt2021.comiles.eu/ws");
const socket = io("wss://chat.2023.dataweek.de/");
// const ws = new WebSocket('wss://chat.lswt2021.comiles.eu/ws');
// const ws = new WebSocket('ws://localhost:5000/ws');

let default_room_id = "!irnMvwCKJtUyHjAAwI:matrix.org"
let room_id = window.location.hash.substring(1)

if (room_id == "") {
    room_id = default_room_id
}

socket.on('connect', () => {
  console.log(`connect ${socket.id}`);
  const message_box = document.getElementById('info_box');
  message_box.innerHTML = '';
  zapp(room_id);
});

socket.on('disconnect', () => {
  console.log(`disconnect ${socket.id}`);

  const message_box = document.getElementById('info_box');
  message_box.innerHTML = 'The Chat is diconnected, trying to reconnect';
});

socket.on('server_message', (message) => {
  console.log("message received");
  console.log(message);
  let e = document.createElement('p');
  if (message.type == 'message') {
    let sp_nick = document.createElement('span');
    let sp_time = document.createElement('span');
    let sp_message = document.createElement('span');
    sp_nick.innerHTML = message.nickname;
    sp_time.innerHTML = message.time;
    sp_time.setAttribute("class", "date");
    sp_message.innerHTML = message.body;
    e.append(sp_time);
    e.append(" ");
    e.append(sp_nick);
    e.append(": ");
    e.append(sp_message);
  }
  if (message.type == 'topic') {
    let sp_nick = document.createElement('span');
    let sp_message = document.createElement('span');
    sp_nick.innerHTML = "topic";
    sp_message.innerHTML = message.body;
    e.append(sp_nick);
    e.append(": ");
    e.append(sp_message);
    updateVideo(message.body);
    // updateStreams(topicData.streams);
  }

  document.getElementById('message-box').prepend(e);
});

function updateVideo(videoUrl) {
  let currentUrl = document.getElementById('videoframe').getAttribute("src");
  if (currentUrl != videoUrl) {
    document.getElementById('videoframe').setAttribute("src", videoUrl);
  }
}

socket.on('streams_update', (streamList) => {
  const stream_selection = document.getElementById('stream_selection');
  stream_selection.innerHTML = '';
  console.log(streamList);

  if (streamList[room_id] == undefined) {
    document.getElementById("title").textContent = 'Chat - ' + streamList[default_room_id]
  } else {
    document.getElementById("title").textContent = 'Chat - ' + streamList[room_id]
  }

});

function zapp(stream_id) {
  // clear messages
  console.log("zapp to: " + stream_id);
  const message_box = document.getElementById('message-box');
  message_box.innerHTML = '';
  room_id = stream_id;
  window.location.hash = "#" + room_id;
  socket.emit('client_zapp', stream_id);
}

function sendMessage() {
  console.log("send message");

  const nickname = htmlEntities(document.getElementById('nickname-input').value);
  const message_body = htmlEntities(document.getElementById('message-input').value);

  if (nickname.trim() == "" || message_body.trim() == "") {
    console.log("nickname or message body not set, will not send message");
    if (nickname.trim() == "") {
      document.getElementById('nickname-input').required = "true";
    }
    if (message_body.trim() == "") {
      document.getElementById('message-input').required = "true";
    }
  } else {
    const message = {
      body: message_body,
      nickname: nickname
    };
    console.log(message);
    if (message) {
      socket.emit('client_message', message, room_id);
    }
    document.getElementById('message-input').value = '';
  }
  return false;
}


function htmlEntities(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function isPressingEnter(e){
  let k;
  if(window.event){
    k = e.keyCode;
    if(k===13){
      sendMessage();
    }
  } else if(e.which){
    k = e.which;
    if(k===13){
      sendMessage();
    }
  }
}

window.isPressingEnter = isPressingEnter;
window.sendMessage = sendMessage;
window.zapp = zapp;
