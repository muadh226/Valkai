chrome.runtime.sendMessage({request: "info"}, async function(response) {

  var response = await response
  console.log(response.is_done_for_day);

  function pad(x) {
    if (Math.floor((x/10)) < 1) {
      return "0"+x
    }
    return x
  }

  function county() {

  	var now = new Date().getTime();

  	// Find the distance between now and the count down date
  	var distance = countDownDate - now;

    console.log(distance)

  	// Time calculations for days, hours, minutes and seconds
  	var hours = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  	var minutes = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
  	var seconds = pad(Math.floor((distance % (1000 * 60)) / 1000));

  	// Output the result in an element with id="demo"
  	document.getElementById("timer").innerHTML = hours + ":"
  	+ minutes + ":" + seconds;

  	// If the count down is over, write some text
  	if (distance < 0) {
      countDownDate = "NA"
  		clearInterval(y);
  		document.getElementById("timer").innerHTML = "";
      document.getElementById("labels").innerHTML = "";

      chrome.runtime.sendMessage({request: "session_ended"}, async function(response) {

        var response = await response
        console.log(response.is_done_for_day);

        if (response.in_session){
          county()
          document.getElementById("labels").innerHTML = "hours minutes seconds"
          var y = setInterval(county,1000);

          document.getElementById("end").addEventListener('click', function() {
            countDownDate = "NA"
        		clearInterval(y);
        		document.getElementById("timer").innerHTML = "";
            document.getElementById("labels").innerHTML = "";
          });
        }

        else {
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {request:"session_ended"}, function(response){
                  console.log("content script responded")
              });
          });
        }

      });
  	}

  }

  if (response.in_session=="0"){
    document.getElementById("timer").innerHTML = "";
    document.getElementById("labels").innerHTML = "";
    console.log("not in sessions")
  }


  if (response.in_session=="1"){
    var countDownDate = new Date(response.end_time).getTime();
    county()
    document.getElementById("labels").innerHTML = "hours minutes seconds"
    var y = setInterval(county,1000);
  }


  document.getElementById("end-popup-Tention").addEventListener('click', function() {
    countDownDate = "NA"
    clearInterval(y);
    document.getElementById("timer").innerHTML = "";
    document.getElementById("labels").innerHTML = "";

    chrome.runtime.sendMessage({request: "session_ended"}, function(response) {
      console.log("responded")
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {request:"session_ended"}, function(response){
              console.log("content script responded")
          });
      });
    });

  });

  function openDash() {
    chrome.tabs.create({"url":"http://localhost:3000/?user_id="+response.id})
  }

  document.getElementById("dash").addEventListener('click', openDash);

});
