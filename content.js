var defaultip="0.0.0.0";
var ipchecktext=defaultip;
  
function getValue(callback) {
  chrome.storage.sync.get(['AntiKTIP'], callback);
}

getValue(function (value) {
  ipchecktext=value.AntiKTIP;
  if(ipchecktext==null) {
    ipchecktext=defaultip;
  }
  console.log(ipchecktext);
  doPatchURL();
});

function doPatchURL() {
    var iptext = String(ipchecktext).replace(/\./gi,"\\\.");
    var ipregex = new RegExp("http\:\/\/"+iptext+"\/tm\/[^\<]+","gi");
    var ipgetregex = new RegExp("http\:\/\/"+"(\\d+\\.\\d+\\.\\d+\\.\\d+)"+"\/tm\/[^\<]+","gi");
    var ipnewregr = null;
	var found = 0;

    var elements = document.getElementsByTagName('script');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.nodeType === 3) {
                var text = node.nodeValue;                
                
                // detect IP                
                ipnewregr = ipgetregex.exec(text);
                if (ipchecktext == "0.0.0.0" && ipnewregr != null) {
                    ipchecktext = ipnewregr[1];
                    chrome.storage.sync.set({'AntiKTIP':ipchecktext},function(){
                        // stored
                    });
                    console.log(ipchecktext);
                }

                if (ipchecktext != "0.0.0.0" && ipnewregr != null) {
                    var replacedText = text.replace(ipregex, document.URL+"?\"");
                    element.replaceChild(document.createTextNode(replacedText), node);
                    browser.runtime.sendMessage({redirect: document.URL+"?"});
                    console.log(element);
                }
            }
        }
    }

    var elements = document.getElementsByTagName('iframe');
    ipnewregr = null;

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var text=element.getAttribute("src");
        if(text!=null) {
            ipnewregr = ipgetregex.exec(text);
            
            if (ipchecktext != "0.0.0.0" && ipnewregr != null) {
              var replacedText = text.replace(ipregex, document.URL+"?");
              element.setAttribute("src",replacedText);
              browser.runtime.sendMessage({redirect: document.URL+"?"});
              console.log(element);
            }
        }
    }
}