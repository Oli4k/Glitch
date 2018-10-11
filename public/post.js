
var urlQuery = getQueryVariable("postid");
var getData = {};
const url = '/data/content/' + urlQuery;
var postID = "";

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
          // showItemById('loader', 0); // Hide the loader
          setTimeout(function(){ showItemById('content-container', 1); }, 250); // Show the content with a slight delay
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

function parse() {
  const contentData = JSON.parse(getData);
  
//   Constructing the header with data from the "info" sheet
//   contentData.info.forEach(function(infoItem) {  
    
//   var  title = infoItem.title,
//       tagline = infoItem.tagline,
//       intro = infoItem.intro,
//       author = infoItem.author,
//       background = infoItem.background;

//   document.body.style.backgroundImage = "url(" + background + ")";
    
//   var infonode = document.createElement("H1");
//   infonode.className = "info-title";
//   var textnode = document.createTextNode(title);
//   infonode.appendChild(textnode);
//   document.getElementById("info-header").appendChild(infonode); 
//   });

  //   Constructing the content sections with data from the "posts" sheet
  postID = urlQuery;
  var contentItem = contentData;
     console.log(contentItem[postID]);
 
  var title = contentItem[postID].title,
      img = contentItem[postID].img,
      imgalt = contentItem[postID].imgalt,
      id = contentItem[postID].id,
      content = contentItem[postID].content,
      date = contentItem[postID].date;
      
      // console.log(img);
    
  var contentTitle = document.createElement("H4"),
      contentImage = document.createElement("img"),
      contentText = document.createElement("p");

      contentImage.src = img,
      contentImage.alt = imgalt;  
      contentTitle.innerHTML = title;
      contentText.innerHTML = content;
    
  var contentContainer = document.getElementById('content-container'),
      contentElement = document.createElement("div");
      contentElement.className = 'content-item';
      contentElement.appendChild(contentImage);
      contentImage.className = 'content-item content-image';
  var createA = document.createElement('a');
  var createAText = document.createTextNode(title);
  // var new_url = window.location.href.append( "?postid=" + id)  
  //     window.location.href = new_url 
    
      createA.setAttribute('href', "/posts/post.html?postid=" + id);
      createA.appendChild(createAText);
      contentElement.appendChild(createA);
    // contentElement.appendChild(contentTitle);
      // contentTitle.className = 'content-item content-title';
      contentElement.appendChild(contentText);
      contentText.className = 'content-item content-text';
      contentContainer.appendChild(contentElement);
   
};

(function(){
   var req = request();
   req.then(function(data) {     
      getData = data;
      parse();
         // .catch(e => console.error(e));
   });
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
