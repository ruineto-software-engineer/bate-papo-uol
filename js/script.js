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



function nameUser() {
  const userNameInput = document.querySelector(".home-screen-input");

  const user = {
    name: userNameInput.value,
  }

  const promisseUser = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", user);
  promisseUser.then(addUser);

  setInterval(keepConnection, 5000);
}


function keepConnection() {
  const userNameInput = document.querySelector(".home-screen-input");

  const user = {
    name: userNameInput.value,
  }

  const promisseUser = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", user);
  promisseUser.then(addUser);
}

function addUser(answerUser) {
  console.log(answerUser);
}


const promisseMessagens = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
promisseMessagens.then(listMessages);
let messages = [];

function listMessages(answerMessages) {
  messages = answerMessages.data;
  console.log(messages);

  const messagesContainer = document.querySelector(".container");

  for(let i = 0; i < messages.length ; i++){
    const message = messages[i];

    if(message.type === "status"){
      messagesContainer.innerHTML += `
        <div class="lobby lobby-enter-leave">
          <div class="lobby-content">
            <!--current-time-->
            <span class="current-time">${message.time}</span>

            <!--lobby-user-name-->
            <span class="lobby-user-name">${message.from}</span> ${message.text}
          </div><!--lobby-content--> 
        </div><!--lobby-->     
      `;
    }else{
      messagesContainer.innerHTML += `
      <div class="lobby">
        <div class="lobby-content">
          <!--current-time-->
          <span class="current-time">${message.time}</span>
      
          <!--lobby-user-name-->                                    <!--lobby-message-everyone-->
          <span class="lobby-user-name">${message.from}</span> para <span class="lobby-message-everyone">${message.to}</span>: ${message.text}
        </div><!--lobby-content-->
      </div><!--lobby-->   
    `;
    }
  }
}