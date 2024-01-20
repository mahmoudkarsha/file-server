// cache variables
let cachedFilesList = [];

// elements
const navLinkTextElements = $(".nav-link-text");
const navLinkSeperatorTextElements = $(".nav-link-seperator-text");
const mainSectionContainer = $(".main-section-cont");

// global functions
function renderHeader(main, secondary) {
  return /*html*/ `<div class="page-header">
    <h1>${main}</h1>
    <h4>${secondary}</h4>
  </div>`;
}

// server functions
const wsURL = "ws://127.0.0.1:8080";
const socket = new WebSocket(wsURL);
socket.onopen = (e) => {
  socket.opened = true;
};

socket.onmessage = (msg) => {
  console.log(msg);
};
socket.addEventListener("message", (ev) => {
  console.log("mmms");
});

socket.sendObject = function sendObject(object) {
  if (socket.opened) {
    socket.send("object" + JSON.stringify(object));
  } else {
    setTimeout(() => {
      sendObject(object);
    }, 100);
  }
};
// const btn = document.createElement("button");
// btn.addEventListener("click", () => {

// });
// btn.innerText = "asdsd";
// document.body.appendChild(btn);
function parseMessage(str) {
  try {
    if (str.startsWith("object")) {
      return JSON.parse(str.replace("object", ""));
    } else {
      throw new Error("Not Supported Type");
    }
  } catch (err) {
    throw err;
  }
}

function calculateSize(bytes) {
  if (bytes < 1024) {
    return `${bytes}bytes`;
  } else if (bytes < 1024 * 1024) {
    return ((bytes * 1) / 1024).toFixed(2) + "mb";
  } else if (bytes < 1024 * 1024 * 1024) {
    return ((bytes * 1) / (1024 * 1024)).toFixed(2) + "gb";
  }
}
