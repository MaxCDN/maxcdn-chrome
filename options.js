
document.onreadystatechange = function () {

  var $btn = document.getElementById('submit')

  $btn.addEventListener('click', function() {
    var consumerKey = document.getElementById('consumer-key').value
    var consumerSecret = document.getElementById('consumer-secret').value
    var companyAlias = document.getElementById('company-alias').value
    /*globals chrome*/
    chrome.storage.local.set({ MaxConsumerKey: consumerKey, MaxConsumerSecret: consumerSecret, MaxCompanyAlias: companyAlias }, function() {
      alert('Successfully Saved Key, Secret and Alias')
    })
  })

}
