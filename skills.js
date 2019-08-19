
// Animation by: Gregory Schier
var TxtRotate = function(el, toRotate,period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = period;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = "<span class=\"wrap\">" + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  let list = [ "Skills", "Abilities", "Competences", "Proficiencies"];
  let elem = document.getElementById("skillsTitleCar");
  new TxtRotate(elem, list, 2000);

  let elements = document.getElementsByClassName("stars");
  for(let i = 0; i <elements.length; i++){
    let num = parseInt(elements[i].getAttribute("stars"));
    let html = "";
    for (let j = 0; j < num; j++ ) {
      html += "<span class=\"glyphicon glyphicon-star filled\"></span>";
    }
    for (let j = 5-num; j > 0; j-- ) {
      html += "<span class=\"glyphicon glyphicon-star\"></span>";
    }
    elements[i].innerHTML = html;
  }
  let skillsElement = document.getElementById("skillsRow");
  let html = "";
  let client = new HttpClient();
  client.get("https://script.google.com/macros/s/AKfycbwOEf1CwXoFC3nMUKMNNme4jLqp73OZdRKfUy9luQwKRyKng3Q/exec", function(response) {
    let resp = JSON.parse(response);
    let skills = resp.skills;
    let skills2 = [];
    for (let i = 0; i < parseInt(skills.length/2); i++) {
      skills2.push(skills.pop());
    }
    if (skills.length>0) {
      html += "<div class=\"col-md-5\"><div class=\"skillsList container-fluid\">";
      for (let i = 0; i < skills.length; i++) {
        let num = parseInt(skills[i].value);
        html+= "<div class=\"skill row\"><div class=\"title col-sm-6\">"+skills[i].name+"</div><div class=\"stars col-sm-6\" >";
        for (let j = 0; j < num; j++ ) {
          html += "<span class=\"glyphicon glyphicon-star filled\"></span>";
        }
        for (let j = 5-num; j > 0; j-- ) {
          html += "<span class=\"glyphicon glyphicon-star\"></span>";
        }
        html+="</div></div>";
      }
      html += "</div></div>";
    }
    if (skills2.length >0) {
      html += "<div class=\"col-md-5\"><div class=\"skillsList container-fluid\">";
      for (let i = 0; i < skills2.length; i++) {
        let num = parseInt(skills2[i].value);
        html+= "<div class=\"skill row\"><div class=\"title col-sm-6\">"+skills2[i].name+"</div><div class=\"stars col-sm-6\" >";
        for (let j = 0; j < num; j++ ) {
          html += "<span class=\"glyphicon glyphicon-star filled\"></span>";
        }
        for (let j = 5-num; j > 0; j-- ) {
          html += "<span class=\"glyphicon glyphicon-star\"></span>";
        }
        html+="</div></div>";
      }
      html += "</div></div>";
    }
    skillsElement.innerHTML = html;
  });
};

var HttpClient = function() {
  this.get = function(aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function() {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
        aCallback(anHttpRequest.responseText);
    };
    anHttpRequest.open( "GET", aUrl, true );
    anHttpRequest.send( null );
  };
};