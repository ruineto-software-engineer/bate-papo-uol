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