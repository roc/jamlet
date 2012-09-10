chrome.contextMenus.create({
    'title' : 'Choose Which MP3 You Would Like to Make Your Jam',
    'contexts' : ['selection'],
    'onclick' : function(info, tab) {
        console.log('Selected link: ' + info.selectionText);
    }
});