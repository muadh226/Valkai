(function (){

	console.log(new Date().toISOString());

	window.addEventListener ("load", myMain, false);

	function myMain (evt) {
	    var jsInitChecktimer = setInterval (checkForJS_Finish, 111);

	    function checkForJS_Finish () {
	        if (typeof document.getElementsByClassName("time-remaining__time")[0].innerHTML != "undefined") {
	            clearInterval (jsInitChecktimer);

							setTimeout(function() {
								$(document.body).hover();
								$(document.body).mouseover();
								$(document.body ).trigger('mouseenter');
								console.log(document.getElementsByClassName("time-remaining__time")[0].innerHTML);
							}, 1000);

	        }
	    }
	}

	chrome.runtime.sendMessage({request: "info"}, async function(response) {
		var response = await response
	  console.log(response);

		var done = Number(response.is_done_for_day)
		var in_session = Number(response.in_session)
		var balance = Number(response.daily_balance)

		if ((! in_session) && (! done) && (location.hostname == "www.youtube.com")){
			document.querySelectorAll('.html5-main-video').forEach(vid => vid.pause());
		}
		if (in_session){
			var remaining_time = response.remaining_time}

		function check(time){
			setTimeout(function() {
				console.log("it's working");
				chrome.runtime.sendMessage({request: "info"}, async function(response) {
					console.log(response.is_done_for_day);
					var response = await response
					var done = Number(response.is_done_for_day)
					var in_session = Number(response.in_session)
					var balance = Number(response.daily_balance)
					if (in_session){
						var remaining_time = response.remaining_time
						document.querySelectorAll('.html5-main-video').forEach(vid => vid.play());
						check(remaining_time)
					}
					if (! (done || in_session)){
						modal.style.display = "block";
						document.querySelectorAll('.html5-main-video').forEach(vid => vid.pause());
						document.getElementById("coins").innerHTML = "💰 Daily Balance: " + balance + "c";}

					if (done || in_session){
						modal.style.display = "none";}
				});

			}, 1000*time);
		}

		function updateStartMinutes(action) {
			var possibleValues = [
				"5 minutes",
				"10 minutes",
				"30 minutes",
				"60 minutes",
				"120 minutes",
				"180 minutes"
			];

			var sessionLength = document.getElementById("start-length-xxxtention").innerHTML;
			var index = possibleValues.findIndex((element) => (element == sessionLength));

			var newIndex = index;
			if (action == "minus" && index > 0) {
				newIndex = newIndex - 1;
			} else if (action == "plus" && index < possibleValues.length - 1) {
				newIndex = newIndex + 1;
			}

			document.getElementById("start-length-xxxtention").innerHTML = possibleValues[newIndex];
		}

		// modal <button id="watchVideoBtn" class="modal-btn-xxxtention">Watch this video</button>

		document.body.insertAdjacentHTML('beforeend',
			`<div id="start-modal-xxxtention" class="modal-xxxtention" style="display: block;">
				<div class="modal-content-xxxtention">
					<div class="modal-body-xxxtention">
						<br>
						<p class="header-text-xxxtention">Start Session</p>
						<br><br>
						<div id="selectTimeBtn">
							<button id="video-length-xxxtention">Finish This Video</button><br><br>
							<button id="button-minus-xxxtention">-</button><button id="start-length-xxxtention">10 minutes</button><button id="button-plus-xxxtention">+</button>
						</div>
						<br>
						<p id="coins">💰 Daily Balance: 9996c</p>
					</div>
					<div class="modal-footer-xxxtention">
					<button id="binge">Binge All Day</button>
					</div>
				</div>
			</div>`);

		var modal = document.getElementById("start-modal-xxxtention");

		document.getElementById("coins").innerHTML = "💰 Daily Balance: " + balance + "c";

		document.getElementById("button-minus-xxxtention").addEventListener("click", function(){
				updateStartMinutes('minus');
		});
		document.getElementById("button-plus-xxxtention").addEventListener("click", function(){
				updateStartMinutes('plus');
		});

		document.getElementById("start-length-xxxtention").addEventListener("click", async function(){
			modal.style.display = "none";
			document.querySelectorAll('.html5-main-video').forEach(vid => vid.play());

			var desired_session_length = document.getElementById("start-length-xxxtention").innerHTML.split(' ')
			desired_session_length.pop()
			var data = {
				time: parseInt(desired_session_length),
				date: new Date().getTime(),
				end_time: new Date().getTime() + 60000*parseInt(desired_session_length)
			}

			console.log(data)
			chrome.runtime.sendMessage({request: "update", session_length:parseInt(desired_session_length), start_time:new Date().toISOString()}, async function(response) {
				console.log(response);

				check(60);

			});
		});

		document.getElementById("video-length-xxxtention").addEventListener("click", async function(){
			modal.style.display = "none";
			document.querySelectorAll('.html5-main-video').forEach(vid => vid.play());

			if (location.hostname == "www.youtube.com"){
				var desired_session_length = Math.ceil((document.querySelector('video').duration)/60) - Math.floor((document.querySelector('video').currentTime)/60);
				console.log(location.hostname);
			}

			var data = {
				time: parseInt(desired_session_length),
				date: new Date().getTime(),
				end_time: new Date().getTime() + 60000*parseInt(desired_session_length)
			}

			console.log(data)
			chrome.runtime.sendMessage({request: "update", session_length:parseInt(desired_session_length), start_time:new Date().toISOString()}, async function(response) {
				console.log(response);

				check(60);

			});
		});

		document.getElementById("binge").addEventListener("click", async function(){
			modal.style.display = "none";
			document.getElementById("coins").innerHTML = "💰 Daily Balance: 0c"
			console.log(new Date().getTime());
			chrome.runtime.sendMessage({request: "done"}, function(response) {
		    console.log(response.is_done_for_day)
		  });
		});
		if (! (done || in_session)) {
			modal.style.display = "block";
		}

		if (done || in_session) {
			modal.style.display = "none";
			setTimeout(function() {
				check(1)
			}, 1000*remaining_time);
		}

		chrome.runtime.onMessage.addListener(
			function(request, sender, sendResponse) {

				switch (request.request) {
					case "session_ended":
						chrome.runtime.sendMessage({request: "info"}, async function(response) {
							console.log(response.is_done_for_day);
							var response = await response
							var done = Number(response.is_done_for_day)
							var in_session = Number(response.in_session)
							var balance = Number(response.daily_balance)
							if (in_session){
								var remaining_time = response.remaining_time
								check(remaining_time)
							}
							if (! (done || in_session)){
								modal.style.display = "block";
								document.querySelectorAll('.html5-main-video').forEach(vid => vid.pause());
								document.getElementById("coins").innerHTML = "💰 Daily Balance: " + balance + "c";}
						});

						break;

					case "check":
						check(1)

						break;
				}

				return true
			}
		);

		function process(){
			check(1)
			}

		window.addEventListener('yt-navigate-start', process);
  });

})()
