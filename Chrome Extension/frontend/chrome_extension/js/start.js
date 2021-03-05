(function (){

	console.log(new Date().toISOString());

	chrome.runtime.sendMessage({request: "info"}, async function(response) {
		var response = await response
	  console.log(response);

		var done = Number(response.is_done_for_day)
		var in_session = Number(response.in_session)
		var balance = Number(response.daily_balance)
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
						check(remaining_time)
					}
					if (! (done || in_session)){
						modal.style.display = "block";
						shadowWrapperXxxtention.shadowRoot.getElementById("coins").innerHTML = "💰 Daily Balance: " + balance + "c";}

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

			var sessionLength = shadowWrapperXxxtention.shadowRoot.getElementById("start-length-xxxtention").innerHTML;
			var index = possibleValues.findIndex((element) => (element == sessionLength));

			var newIndex = index;
			if (action == "minus" && index > 0) {
				newIndex = newIndex - 1;
			} else if (action == "plus" && index < possibleValues.length - 1) {
				newIndex = newIndex + 1;
			}

			shadowWrapperXxxtention.shadowRoot.getElementById("start-length-xxxtention").innerHTML = possibleValues[newIndex];
		}

		// modal <button id="watchVideoBtn" class="modal-btn-xxxtention">Watch this video</button>
		document.body.insertAdjacentHTML('beforeend',
			`<div id="shadowWrapperXxxtention"></div>
			`);

		shadowWrapperXxxtention.attachShadow({mode: 'open'});

		shadowWrapperXxxtention.shadowRoot.innerHTML =
		(`
			<style>
			@font-face {
			  font-family: CircularStd;
			  src: "Circular Std Font.otf"
			}

			* {
				 box-sizing: border-box
				}

			.modal-xxxtention {
			  display: none;
			  position: fixed;
			  z-index: 9999;
			  left: 0;
			  top: 0;
			  padding-top: 129px;
			  width: 100%;
			  height: 100%;
			  margin: 0;
			  overflow: auto;
			  background-color: rgb(0,0,0);
			  background-color: rgba(0,0,0,0.75);
			}

			.modal-content-xxxtention {
			  font-family: Arial, Helvetica, sans-serif;
			  position: relative;
			  background-color: #2e2e2e;
			  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			  margin: auto;
			  padding: 0;
			  width: 253px;
				font-weight: normal;
			  height: 223px;
			  text-align: center;
			  border-radius: 16px;
				padding: 2px 16px;
			  font-size: 10px;
				font-weight: normal;
			  color: #ffffffa7;
				border-top-left-radius: 25px;
			  border-bottom-left-radius: 25px;
			  border-top-right-radius: 25px;
			  border-bottom-right-radius: 25px;
			}

			.header-text-xxxtention {
			  color: #ffffff;
			  font-size: 19px;
			  font-family: CircularStd;
				font-weight: normal;
				top: 17px;
				right: 75px;
				left: 75px;
				position: absolute;
			}

			.modal-btn-xxxtention {
			  border-radius: 16px;
			  height: 32px;
			  width: 221px;
			}

			#selectTimeBtn {
			  width: 250px;
				position:absolute;
				bottom: 105px;
				right: 16px;
				left: 16px;
				top: 76px;
			}

			#button-plus-xxxtention {
			  height: 32px;
			  width: 34px;
			  background-color: #00bfa5;
			  color: #ffffff;
			  font-size: 15px;
			  text-align: center;
			  border: none;
			  outline: none;
			  border-top-right-radius: 500px;
			  border-bottom-right-radius: 500px;
			  float: left;
			}

			#button-minus-xxxtention {
			  height: 32px;
			  width: 34px;
			  background-color: #00bfa5;
			  color: #ffffff;
			  text-align: center;
			  border: none;
			  outline: none;
			  border-top-left-radius: 500px;
			  border-bottom-left-radius: 500px;
			  display: inline-block;
				float: left;
			}

			#start-length-xxxtention{
			  width: 153px;
			  height:32px;
			  background-color: #00bfa5;
			  font-size: 12px;
			  text-align: center;
			  color: #ffffff;
			  border: none;
			  outline: none;
			  display: inline-block;
				float: left;
			}

			#start-length-xxxtention:hover {
			  background-color: #800080;
			}

			#video-length-xxxtention {
			  height: 32px;
			  width: 194px;
			  font-size: 12px;
			  background-color: ##ffffff;
			  color: #000000;
			  text-align: center;
			  border: none;
			  outline: none;
			  border-top-left-radius: 500px;
			  border-bottom-left-radius: 500px;
			  border-top-right-radius: 500px;
			  border-bottom-right-radius: 500px;
			  display: inline-block;
			}

			#video-length-xxxtention:hover {
			  background-color: #FD5602;
			}

			#button-minus-xxxtention:hover {
			  background-color: #800080;
			}

			#button-plus-xxxtention:hover {
			  background-color: #800080;
			}

			#binge {
			  width: 253px;
			  height:49px;
			  background-color: #3a3a3a;
			  font-size: 12px;
			  text-align: center;
			  color: #ffffff;
			  border: none;
			  outline: none;
			  border-top-left-radius: 10px;
			  border-bottom-left-radius: 25px;
			  border-top-right-radius: 10px;
			  border-bottom-right-radius: 25px;
			  position: absolute;
				top: 174px;
				left: 0px;
			}

			#binge:hover {
			  background-color: #FD5602;
			}

			#imDoneBtn {
			  background-color: #ffffff;
			  color: #000000;
			  font-size: 12px;
			}

			#wasteBtn {
			  background-color: #fb6c2c;
			  color: #ffffff;
			  font-size: 12px;
			}

			#coins {
				position: absolute;
				bottom: 69px;
				top: 127px;
				right: 64px;
			}

			</style>

			<div id="startModalXxxtention" class="modal-xxxtention" style="display: block;">
			<div class="modal-content-xxxtention">
					<p class="header-text-xxxtention">Start Session</p>
					<div id="selectTimeBtn">
						<button id="button-minus-xxxtention">-</button><button id="start-length-xxxtention">10 minutes</button><button id="button-plus-xxxtention">+</button>
					</div><br>
					<p id="coins">💰 Daily Balance: 9996c</p>
					<button id="binge">Binge All Day</button>
				</div>
			</div>`);

		const styling = document.createElement('link');
		styling.setAttribute('rel', 'stylesheet');
		styling.setAttribute('src', 'custom.css');
		shadowWrapperXxxtention.appendChild(styling);

		var modal = shadowWrapperXxxtention.shadowRoot.getElementById("startModalXxxtention");

		shadowWrapperXxxtention.shadowRoot.getElementById("coins").innerHTML = "💰 Daily Balance: " + balance + "c";

		shadowWrapperXxxtention.shadowRoot.getElementById("button-minus-xxxtention").addEventListener("click", function(){
				updateStartMinutes('minus');
		});
		shadowWrapperXxxtention.shadowRoot.getElementById("button-plus-xxxtention").addEventListener("click", function(){
				updateStartMinutes('plus');
		});

		shadowWrapperXxxtention.shadowRoot.getElementById("start-length-xxxtention").addEventListener("click", async function(){
			modal.style.display = "none";
			var desired_session_length = shadowWrapperXxxtention.shadowRoot.getElementById("start-length-xxxtention").innerHTML.split(' ')
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

		shadowWrapperXxxtention.shadowRoot.getElementById("binge").addEventListener("click", async function(){
			modal.style.display = "none";
			shadowWrapperXxxtention.shadowRoot.getElementById("coins").innerHTML = "💰 Daily Balance: 0c"
			console.log(new Date().getTime());
			chrome.runtime.sendMessage({request: "done"}, function(response) {
		    console.log(response.is_done_for_day)
		  });
		});

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
								shadowWrapperXxxtention.shadowRoot.getElementById("coins").innerHTML = "💰 Daily Balance: " + balance + "c";}
						});

						break;

					case "check":
						check(1)

						break;
				}

				return true
			}
		);
  });

})()
