'use strict';

chrome.browserAction.onClicked.addListener(function(tab) {
  if( tab.url.includes('asana.com/') && tab.url.includes('list')){
    chrome.tabs.executeScript(tab.id, {file: "scripts/inject.js"});
  }
});
