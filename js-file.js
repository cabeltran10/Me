"use strict";
let comma = 0;
function hide(){
  comma++;
  if(comma===3){
    let name = document.getElementById("txtNombre");
    name.innerHTML = "<span id=\"comma\"  onclick=\"show(); return false\" >,</span> Ich bin Noah";
    let welcome = document.getElementById("txtWelcome");
    welcome.innerHTML = "Sic Mundus Creatus Est";
  }
}
function show(){
  comma = 0;
  let name = document.getElementById("txtNombre");
  name.innerHTML = "<span id=\"comma\"  onclick=\"hide(); return false\" >,</span> I am Andres Varon";
  let welcome = document.getElementById("txtWelcome");
  welcome.innerHTML = "Welcome to my Website";
}

function scrollToPanelAboutMe(){
  document.getElementById("panelAboutMe").scrollIntoView();
}

//Funcion para quitar warnings.
function act(){
  if(comma>0){
    hide();
    show();
    scrollToPanelAboutMe();
  }
}
act();