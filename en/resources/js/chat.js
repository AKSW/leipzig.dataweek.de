'use strict';

// const socket = io("wss://chat.lswt2021.comiles.eu/ws");
const socket = io("wss://chat.2024.dataweek.de/");
// const ws = new WebSocket('wss://chat.lswt2021.comiles.eu/ws');
// const ws = new WebSocket('ws://localhost:5000/ws');

const liveConfig = window.dataweekLive || {};
let default_room_id = liveConfig.defaultRoomId || Object.keys(liveConfig.rooms || {})[0] || "!slhYXYesrqRvWAMjJX:matrix.org";
let room_id = window.location.hash.substring(1);

if (room_id == "") {
    room_id = default_room_id;
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
    const topicUrl = getTopicUrl(message.body);
    if (topicUrl) {
      updateVideo(topicUrl);
    }

    let sp_nick = document.createElement('span');
    let sp_time = document.createElement('span');
    let sp_message = document.createElement('span');
    sp_nick.textContent = message.nickname;
    sp_time.textContent = message.time;
    sp_time.setAttribute("class", "date");
    sp_message.textContent = message.body;
    e.append(sp_time);
    e.append(" ");
    e.append(sp_nick);
    e.append(": ");
    e.append(sp_message);
  }
  if (message.type == 'topic') {
    let sp_nick = document.createElement('span');
    let sp_message = document.createElement('span');
    sp_nick.textContent = "topic";
    sp_message.textContent = message.body;
    e.append(sp_nick);
    e.append(": ");
    e.append(sp_message);
    updateVideo(message.body);
    // updateStreams(topicData.streams);
  }

  document.getElementById('message-box').prepend(e);
});

function getTopicUrl(messageBody) {
  const match = String(messageBody || '').match(/^\s*topic:\s*(\S+)/i);
  return match ? match[1] : '';
}

function updateVideo(videoUrl) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  if (!embedUrl) {
    console.warn("Ignoring non-YouTube topic URL", videoUrl);
    return;
  }

  let wrapper = document.getElementById('videoWrapper');
  wrapper.innerHTML = '';

  let iframe = document.createElement('iframe');
  iframe.id = 'videoframe';
  iframe.src = embedUrl;
  iframe.width = '560';
  iframe.height = '315';
  iframe.title = 'YouTube video player';
  iframe.frameBorder = '0';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  wrapper.append(iframe);
}

function getYouTubeEmbedUrl(videoUrl) {
  try {
    const url = new URL(videoUrl.trim());
    const host = url.hostname.replace(/^www\./, '');
    let videoId = '';

    if (host == 'youtu.be') {
      videoId = url.pathname.split('/').filter(Boolean)[0] || '';
    } else if (host == 'youtube.com' || host == 'youtube-nocookie.com' || host == 'm.youtube.com') {
      if (url.pathname == '/watch') {
        videoId = url.searchParams.get('v') || '';
      } else if (url.pathname.startsWith('/embed/') || url.pathname.startsWith('/live/')) {
        videoId = url.pathname.split('/').filter(Boolean)[1] || '';
      }
    }

    if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
      return '';
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  } catch (e) {
    return '';
  }
}

socket.on('streams_update', (streamList) => {
  const stream_selection = document.getElementById('stream_selection');
  stream_selection.innerHTML = '';
  console.log(streamList);

  document.getElementById("title").textContent = 'Chat - ' + getStreamName(room_id, streamList);

});

function getStreamName(streamId, streamList) {
  const configuredStreams = liveConfig.rooms || {};
  const streamName = streamList && streamList[streamId];
  const configuredName = configuredStreams[streamId];

  if (streamName && streamName != 'Empty Room') {
    return streamName;
  }

  return configuredName || streamName || streamId;
}

function zapp(stream_id) {
  // clear messages
  console.log("zapp to: " + stream_id);
  const message_box = document.getElementById('message-box');
  message_box.innerHTML = '';
  room_id = stream_id;
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
