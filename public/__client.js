const url = '/personas.json';  

var number = 0;
var maxNumber = {};
var personasData = {};

function showItemById(item, state) {
  var hideItem = document.getElementById(item);
  switch (state) {
    case 0:
      hideItem.classList.remove("show");
      hideItem.classList.add("hide");
      break;
    case 1:
      hideItem.classList.remove("hide");
      hideItem.classList.add("show");
      break;
  }
};

function request() {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response)
          showItemById('loader', 0); // Hide the loader
          setTimeout(function(){ showItemById('persona_content', 1); }, 250); // Show the persona card with a slight delay
        } else {
          reject(xhr.status)
        }
      }
    }
    xhr.ontimeout = function () {
      reject('timeout')
    }
    xhr.open('get', url, true)
    xhr.send()
  })
};

function parse(number) {
  const personasList = JSON.parse(personasData);
  maxNumber = personasList.length -1;

  // Some crude validation
  if (number > personasList.length) {
    number = 0;
  }
  if (number < 1) {
    number = 0;
  } if (isNaN(number) == true) {
    number = 0;
  }
   else {number = number};
  
  // Push the browser URL with the number for this persona
history.pushState(null, 'https://copper-reindeer.glitch.me/', '/?persona=' + number);
  
  Object.keys(personasList[number]).forEach(function(key) {
    
    var value = personasList[number][key];
    var personaContent = document.getElementById(key);
  
    switch (key) {
      case 'img':
        document.getElementById("profile_image").src=personasList[number].img;
        break;
      default:
        personaContent.innerHTML = '<h4 class="key">' + key + '</h4><p class="value">' + value + '</p>';
      }
  })
    var printNumber = number += 1;
    document.getElementById("paginator").innerHTML = '<p id="current_persona">' + printNumber + ' / ' + personasList.length + '</p>';
    // document.getElementById("persona_url").innerHTML = 'https://accidental-medicine.glitch.me/?persona=' + number;
};

var buttonNext = document.getElementById("persona_content");
buttonNext.onclick = function(){
  if (number >= maxNumber) {number = 0;} else { number = ++number; };
  parse(number);
};

// Use arrow keys to flip through cards 
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
          showItemById("keystroke_left", 1);
          setTimeout(function(){ showItemById("keystroke_left", 0); }, 1000);
          number = number - 1;
          if (number < 0) { number = maxNumber;              
            }
          parse(number);
          break;
        case 39:
          showItemById("keystroke_right", 1);
          setTimeout(function(){ showItemById("keystroke_right", 0); }, 1000);
          number = number + 1;
          if (number > maxNumber) { number = 0; 
            }
          parse(number);
          break;
    }
};

// var buttonPrev = document.getElementById("left_button");
// buttonPrev.onclick = function(){
//   if (number <= 0) {number = maxNumber;} else { number = --number; };
//   parse(number);
// };

(function(){
   var req = request();
   req.then(function(data) {
     
      number = getQueryVariable("persona");
      console.log(number);         
     personasData = data;
     parse(number);
   });
  
  // parse(number)
  //   .catch(e => console.error(e));
})();

function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}