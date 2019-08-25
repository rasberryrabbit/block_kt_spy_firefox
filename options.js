var ipchecktext;
// Saves options to chrome.storage
function save_options() {
  ipchecktext = document.getElementById('iptext').value;
  chrome.storage.sync.set({ 'AntiKTIP': ipchecktext });
  console.log(ipchecktext);
}

function getValue(callback) {
  chrome.storage.sync.get(['AntiKTIP'], callback);
}

function restore_options() {
  getValue(function (value) {
    ipchecktext=value.AntiKTIP;
    if(ipchecktext==null) {
      ipchecktext='59.4.85.230';
    }
    document.getElementById('iptext').value=ipchecktext;
    console.log(ipchecktext);
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
