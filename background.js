
// Called when URLs change
function checkForJammableUrl(tabId, changeInfo, tab) {
    console.log(tabId,changeInfo,tab);
    if (isPotentiallyJammable(tab.url)) {
        //chrome.pageAction.show(tabId);
        console.log("Totally got it");
        chrome.browserAction.setIcon({
            path : "active.png" // Whatever the 'active icon will be'
        });
    }
    else {
        chrome.browserAction.setIcon({
            path : "icon.png" // Whatever the 'active icon will be'
        });
        chrome.pageAction.hide(tabId);
    }
}

function onRequest(request, sender, sendResponse){
    console.log("we're in onRequest here", request, sender, sendResponse);
}

// Listen to URL changes
chrome.tabs.onUpdated.addListener(checkForJammableUrl);

// Called when jamlet icon is clicked
function jamletClicked(tab) {
    chrome.contextMenus.create({
        'title' : 'Choose Which MP3 You Would Like to Make Your Jam',
        'contexts' : ['selection'],
        'onclick' : function(info, tab) {
            console.log('Selected link: ' + info.selectionText);
        }
    });

    var destUrl = 'http://www.thisismyjam.com/jam/create?signin=1&url=' + encodeURIComponent(tab.url);
    chrome.tabs.create({'url': destUrl});
}
/*
chrome.contextMenus.create({
    'title' : 'Choose Which MP3 You Would Like to Make Your Jam',
    'contexts' : ['selection'],
    'onclick' : function(info, tab) {
        console.log('Selected link: ' + info.selectionText);
    }
});
*/
/*
chrome.contextMenus.onClicked.addListener(
    //function(OnClickData info, tabs.Tab tab)
    function(OnClickData info, tabs.Tab tab)
    {}
);
*/

// Jammable URL resolver helper
function isPotentiallyJammable(string) {
    if(string.match(/^(https?:\/\/)?(www\.)?youtube\.com\/watch.+/i))
        return true; // YouTube watch page
    else if(string.match(/^(https?:\/\/)?(www\.)?soundcloud\.com\/[^\/]+\/[^\/]+/i)) {
        // TODO: instrospect page to make sure?
        return true; // Potential SoundCloud track page
    }
    else if(string.match(/^[^ ]+\/[^ ]+\.mp3$/))
        return true; // Found audio
    else if(string.match(/^(https?:\/\/)?(www\.)?hypem.com\/track[^\/]+/i))
        return true; // Hype Machine track page
    else if(string.match(/^(https?:\/\/)[^\/]+\/track\//)) {
        // TODO: Introspect page to make sure?
        return true; // Potential Bandcamp track page
    }

    return false;
}

// Listen to clicks
chrome.browserAction.onClicked.addListener(jamletClicked);

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);

