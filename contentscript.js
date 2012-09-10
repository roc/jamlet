// function collectMP3Links(){
//     var links = [],
//         linkTags = document.getElementsByTagName("a"),
//         html = false;

//     for (var i = 0; i < linksTags.length; i++) {
//         match = linkTags[i].href.match(/\.mp3(\?|\#|$)/);
//         if(match)
//             links.push(linkTags[i]);
//     }
//     if(!links.length)
//         return;
//     else{
//         html = "<ul>";
//         for (var n = 0; n < links.length; n++) {
//             html += "<li>" + link + "</li>";
//         }
//         html += "</ul>";

//     }

//     chrome.extension.sendRequest({},function(response){});
//     //return html;

// }
console.log("HELLOW CONTENT SCRIPT");

var matches = false,
    linkTags = document.getElementsByTagName("a");

console.log('come on document',document,document.getElementsByTagName("a"));
console.log(linkTags);

for (var i = 0; i < linkTags.length; i++) {
    if(linkTags[i].href.match(/\.mp3(\?|\#|$)/)){
        matches = true;
        break;
    }
}

if (matches)
    collectMP3Links();
