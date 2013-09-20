
document.addEventListener('DOMContentLoaded', domLoaded, false)

function domLoaded() {
  var $btn = document.getElementById('submit')
    , $form = document.getElementById('form')
  $btn.addEventListener('click', submitForm)
  $form.addEventListener('submit', submitForm)
}

function submitForm(ev) {
  ev.preventDefault()
  var consumerKey = document.getElementById('consumer-key').value
  var consumerSecret = document.getElementById('consumer-secret').value
  var companyAlias = document.getElementById('company-alias').value
  /*globals chrome*/
  chrome.storage.local.set({ MaxConsumerKey: consumerKey, MaxConsumerSecret: consumerSecret, MaxCompanyAlias: companyAlias }, function() {
    alert('Successfully Saved Key, Secret and Alias')
  })
}
