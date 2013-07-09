
document.onreadystatechange = function () {

  var $btn = document.getElementById('submit')

  $btn.addEventListener('click', function() {
    var consumerKey = document.getElementById('consumer-key').value
    var consumerSecret = document.getElementById('consumer-secret').value
    /*globals chrome*/
    chrome.storage.local.set({ MaxConsumerKey: consumerKey, MaxConsumerSecret: consumerSecret }, function() {
      alert('Successfully saved consumerKey and consumerSecret')
    })
  })

}
