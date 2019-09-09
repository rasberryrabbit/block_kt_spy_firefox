var defaultip="59.4.85.230";
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

    var elements = document.getElementsByTagName('script');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var replacedText = text.replace(ipregex, document.URL+"\"");

                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                    console.log(element);
                }
            }
        }
    }

    var elements = document.getElementsByTagName('iframe');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var text=element.getAttribute("src");
        if(text!=null) {
            var replacedText = text.replace(ipregex, document.URL);
            
            if (replacedText !== text) {
              element.setAttribute("src",replacedText);
              console.log(element);
            }
        }
    }
}