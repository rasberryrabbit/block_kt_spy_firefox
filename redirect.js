function handleMessage(request, sender, sendResponse) {
    browser.tabs.update(sender.tab.id, {url: request.redirect});
    console.log(request.redirect);
}

browser.runtime.onMessage.addListener(handleMessage);