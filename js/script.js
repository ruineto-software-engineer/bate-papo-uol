function userOptionsOpen() {
  let userOptionsBackgroundElement = document.querySelector(".user-options");
  userOptionsBackgroundElement.classList.add("opacity-show");
  userOptionsBackgroundElement.classList.remove("opacity-hidden");

  let userOptionsElement = document.querySelector(".user-options-content-general");
  userOptionsElement.classList.add("visibility-show");
  userOptionsElement.classList.remove("visibility-hidden");
}

function userOptionsClose() {
  let userOptionsBackgroundElement = document.querySelector(".user-options");
  userOptionsBackgroundElement.classList.add("opacity-hidden");

  let userOptionsElement = document.querySelector(".user-options-content-general");
  userOptionsElement.classList.add("visibility-hidden");
}

function enterLobby(enterLobbyNow){
  enterLobbyNow.parentNode.classList.add("home-screen-visibility");

  let contentGeneral = document.querySelector(".content-general-visibility");
  contentGeneral.classList.add("content-general-to-visibility");
}





function chooseOnlineUser(choosedUser){
  let choosedUserIconReplace = choosedUser.querySelector(".location-icon");
  const iconCheck = document.querySelector(".user-options-select-users .user-options-checkmark");

  if(iconCheck !== null){
    iconCheck.remove();    
  }

  choosedUserIconReplace.innerHTML = `<i class="fa fa-check user-options-checkmark" aria-hidden="true"></i><!--user-options-checkmark-->`;
}

function chooseTypeMessage(typeMessage){
  let typeMessageIconReplace = typeMessage.querySelector(".location-icon");
  const iconCheck = document.querySelector(".user-options-messagens .user-options-checkmark");

  if(iconCheck !== null){
    iconCheck.remove();
    typeMessageIconReplace.innerHTML = `<i class="fa fa-check user-options-checkmark" aria-hidden="true"></i><!--user-options-checkmark-->`;
  }else{
    typeMessageIconReplace.innerHTML = `<i class="fa fa-check user-options-checkmark" aria-hidden="true"></i><!--user-options-checkmark-->`;
  }
}





function nameUser() {
  const userNameInput = document.querySelector(".home-screen-input");

  const user = {
    name: userNameInput.value,
  }

  axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", user);

  setInterval(keepConnection, 5000);
  setInterval(listMessagesRequest, 3000);
}

function keepConnection() {
  const userNameInput = document.querySelector(".home-screen-input");

  const user = {
    name: userNameInput.value,
  }

  axios.post("https://mock-api.driven.com.br/api/v4/uol/status", user);
}





let messagesContainer;
let lastMensagePick = "";

function listMessagesRequest() {
  const promisseMessagens = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
  promisseMessagens.then(listMessages);
}

function listMessages(answerMessages) {
  const userNameInput = document.querySelector(".home-screen-input");

  let messages = [];
  messages = answerMessages.data;
  messagesContainer = document.querySelector(".container");

  if(messages[messages.length - 1].time === lastMensagePick.time){
    return;
  }

  messagesContainer.innerHTML = "";
  for(let i = 0; i < messages.length ; i++){
    const message = messages[i];

    if(message.type === "status"){
      messagesContainer.innerHTML += `
      <div class="lobby lobby-enter-leave">
        <span class="lobby-content lobby-message-width">
          <!--current-time-->
          <span class="current-time lobby-message-width">${message.time}</span>

          <!--lobby-user-name-->
          <span class="lobby-user-name lobby-message-width">${message.from}</span> <span class="lobby-message-width">${message.text}</span>
        </span><!--lobby-content--> 
      </div><!--lobby-->     
      `;
    }else if(message.type === "private_message"){
      if(message.to === userNameInput.value || message.from === userNameInput.value){
        messagesContainer.innerHTML += `
        <div class="lobby lobby-private">
          <span class="lobby-content lobby-message-width">
            <!--current-time-->
            <span class="current-time lobby-message-width">${message.time}</span>
  
            <!--lobby-user-name-->                                                                       <!--lobby-message-private-->
            <span class="lobby-user-name lobby-message-width">${message.from}</span> reservadamente para <span class="lobby-message-private lobby-message-width">${message.to}</span>: <span class="lobby-message-width">${message.text}</span>
          </span><!--lobby-content-->
        </div><!--lobby-->     
        `;
      }      
    }else{
      messagesContainer.innerHTML += `
      <div class="lobby">
        <span class="lobby-content lobby-message-width">
          <!--current-time-->
          <span class="current-time lobby-message-width">${message.time}</span>
      
          <!--lobby-user-name-->                                                        <!--lobby-message-everyone-->
          <span class="lobby-user-name lobby-message-width">${message.from}</span> para <span class="lobby-message-everyone">${message.to}</span>: <span class="lobby-message-width">${message.text}</span>
        </span><!--lobby-content-->
      </div><!--lobby-->   
      `;
    }
  }

  lastMensagePick = messages[messages.length - 1];

  const lastMessage = document.querySelector('.container div:last-child');
  lastMessage.scrollIntoView();
}

function sendMessage() {
  const userNameInput = document.querySelector(".home-screen-input");
  const messageInput = document.querySelector(".bottom-bar-input");

  const checkmarkContact = document.querySelector(".user-options-select-users .user-options-checkmark");
  const checkmarkMessage = document.querySelector(".user-options-messagens .user-options-checkmark");

  let nameContact = checkmarkContact.parentNode.parentNode.children[0].innerText;
  let optionMessage = checkmarkMessage.parentNode.parentNode.children[0].innerText;

  if(nameContact === "Todos" && optionMessage === "Público"){
    const sendMessageAll = {
      from: userNameInput.value,
      to: "Todos",
      text: messageInput.value,
      type: "message"
    }

    axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", sendMessageAll);
  }else if(nameContact !== "Todos" && optionMessage === "Reservadamente"){
    const sendMessagePrivate = {
      from: userNameInput.value,
      to: nameContact,
      text: messageInput.value,
      type: "private_message"
    }

    axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", sendMessagePrivate);
  }else if(nameContact !== "Todos" && optionMessage === "Público"){
    const sendMessageAllTo = {
      from: userNameInput.value,
      to: nameContact,
      text: messageInput.value,
      type: "message"
    }

    axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", sendMessageAllTo);    
  }
}





let usersContainer;
let userSelect;

function listOnlineUsersRequest() {
  const promisseUsers = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
  promisseUsers.then(listOnlineUsers);
}

setInterval(listOnlineUsersRequest, 10000);
function listOnlineUsers(answerUsers){
  let users = [];
  users = answerUsers.data;
  usersContainer = document.querySelector(".user-options-select-users ul");

  let optionAll = document.querySelector(".user-options-select-users ul li");
  let iconCheck = document.querySelector(".user-options-select-users .user-options-checkmark");
  let iconLiCheck = iconCheck.parentNode.parentNode;

  userSelect = iconLiCheck.children[0].innerText;

  usersContainer.innerHTML = "";
  usersContainer.innerHTML = optionAll.outerHTML;
  for(let i = 0; i < users.length ; i++){
    const user = users[i];

    if(userSelect == user.name){
      usersContainer.innerHTML += iconLiCheck.outerHTML; 
    }else{
      usersContainer.innerHTML += `
      <li class="user-flex-content" onclick="chooseOnlineUser(this)">
        <div class="user-flex-li">
          <ion-icon class="user-flex-icon" name="person-circle"></ion-icon><!--person-circle--> ${user.name}
        </div>
        <div class="location-icon"></div>
      </li>
      `;      
    } 
  }
}





document.addEventListener("keydown" , function (event) {
  if (event.keyCode !== 13) return;
  
  sendMessage()
})