# https-louis-de-lavenne-de-choulot.github.io
<html>
<style>
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
			user-select: none;
		}

		body {
			height: 100vh;
			display: flex;
			align-items: center;
			justify-content: center;
			/* background gradient between soft black and soft white */
			background: linear-gradient(45deg, #1a1a1a, #686868, #1a1a1a);
			;
			font-family: 'Helvetika Neue', Arial, sans-serif;
			font-size: 28px;
		}

		.counter-container {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.counter {
			text-transform: uppercase;
			color: #fff;
			font-weight: bold;
			font-size: 3rem;
		}

		.btn-row {
			display: flex;
			align-items: center;
			margin: 1rem;
		}

		.btn {
			cursor: pointer;
			min-width: 4em;
			padding: 1em;
			border-radius: 5px;
			text-align: center;
			margin: 0 1rem;
			box-shadow: 0 6px #070707;
			color: white;
			background-color: #2a2a2a;
			position: relative;
			font-weight: bold;
		}

		.btn:hover {
			box-shadow: 0 4px #101010;
			top: 2px;
		}

		.btn:active {
			box-shadow: 0 1px #000000;
			top: 5px;
		}

		/* input with class .inp with light white background design*/
		.inp {
			background-color: #d6d6d6b7;
			border: none;

			padding: 0.5rem;
			border-top: 1px solid #fff;
			border-bottom: 1px solid #fff;
		}
	</style>
	<body>
  	<div class="counter-container">
		<h6 class="ia"></h6>
		<div class="btn-row">
			<input type="text" class="inp fromLang" style="color: black; width: 100%;" placeholder="from en">
			<input type="text" class="inp lang" style="color: black; width: 100%;" placeholder="to en">
			<input type="text" class="inp activation_word" style="color: black; width: 100%;" value="Frank">
			<input type="text" class="inp speech_recognition" style="color: black; width: 100%;" value="zh">
		</div>
		<input type="text" class="inp text" style="color: black; width: 100%;" placeholder="Write Something">
		<div class="btn-row">
			<div class="btn btn-send">Send</div>>
			<div onclick="recognition.stop();recognition.lang = speech_recognition.lang ;recognition.start();" class="btn btn-disc">Run SpeechRecognition</div>
		</div>
	</div>

	<!-- Scripts -->

	<script>
		//create a list of keywords
		var keywords = ["begin language", "end language", "activation word", "speech"];

		try {
			var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			var recognition = new SpeechRecognition();
			recognition.continuous = true;
			//recognition lang to chinese
			recognition.lang = "en-UK";
		} catch (e) {
			console.error(e);
			$('.no-browser-support').show();
			$('.app').hide();
		}

		recognition.onstart = function () {
			console.log('Voice recognition activated. Try speaking into the microphone.');
		}

		recognition.onend = function (event) {
			console.log('You were quiet for a while so voice recognition turned itself off.');
			alert('Finished in ' + event.elapsedTime + ' seconds.');
		}

		recognition.onerror = function (event) {
			if (event.error == 'no-speech') {
				console.log('No speech was detected. Try again.');
			};
		}

		var noteContent = '';
		var waitOnce = false;
		recognition.onresult = async function (event) {
			var current = event.resultIndex;
			var transcript = event.results[current][0].transcript;
			var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
			if (!mobileRepeatBug) {
				noteContent += transcript;
				transcript = transcript.toLowerCase();
				//write noteContent to the component with class .ia
				document.querySelector('.ia').innerText = (noteContent);
				// if transcript contains the word set in the input field .activation_word then call Discuss() and Send() and await for the response
				if (waitOnce) {
					// var indexesAnd = getAllIndexes(transcript, 'and');
					var minIndex = [0, "none"];
					//foreach keyword in the list of keywords
					keywords.forEach(async keyword => {
						if (transcript.includes(keyword)) {
							var index = transcript.indexOf(keyword);
							if (minIndex[0] == 0) {
								minIndex = [index, keyword];
							} else {
								if (index < minIndex[0]) {
									minIndex = [index, keyword];
								}
							}
						// }
						}
					});
					//if minIndex is not 0 then call the function that is in minIndex[1]
					if (minIndex[0] != 0) {
						if (minIndex[1] == "begin language") {
							//remove "to" from the transcript
							transcript = transcript.replace("to", "");
							fromLang.value = transcript.substring(minIndex[0] + minIndex[1].length);
						} else if (minIndex[1] == "end language") {
							//remove "to" from the transcript
							transcript = transcript.replace("to", "");
							lang.value = transcript.substring(minIndex[0] + minIndex[1].length);
						} else if (minIndex[1] == "activation word") {
							//remove "to" from the transcript
							activation_word.value = transcript.substring(minIndex[0] + minIndex[1].length);
						} else if (minIndex[1] == "speech") {
							//remove "to" from the transcript
							transcript = transcript.replace("to", "");
							speech_recognition.value = transcript.substring(minIndex[0] + minIndex[1].length);
							recognition.lang = speech_recognition.innerText;
						}
					}else{
							SpeechSend(transcript, minIndex);
						}
					waitOnce = false;
				}

				if (transcript.includes((document.querySelector('.activation_word').value).toLowerCase())) {
					waitOnce = true;
				}
			}
		}

		async function SpeechSend(transcript, minIndex){
			console.log("_______________________________minIndex: " + minIndex);
					//set transcript to the text that is after the keyword
					// transcript = transcript.substring(minIndex[0] + minIndex[1].length);
					//Call Send() and await for the response
					await Send(transcript, lang.value, fromLang.value);
					render();
		}


		navigator.mediaDevices.getUserMedia({
				audio: true
			})
			.then(function (stream) {
				console.log('You have given me access to your mic, starting recognition...');
				recognition.start();
			})
			.catch(function (err) {
				console.log('No mic for you!')
			});
	</script>

	<!-- Connect UI actions to Go functions -->
	<script>
		function getAllIndexes(arr, val) {
			var indexes = [];
			var i = -1;
			indexes.push(arr.indexOf(val, 0));
			while ((i = arr.indexOf(val, i + 1)) != -1) {
				indexes.push(arr.indexOf(val, i + 1));
			}
			//remove last element if it is -1
			indexes.pop();
			return indexes;
		}
		const ia = document.querySelector('.ia');
		const text = document.querySelector('.text');
		const lang = document.querySelector('.lang');
		const fromLang = document.querySelector('.fromLang');
		const activation_word = document.querySelector('.activation_word');
		const speech_recognition = document.querySelector('.speech_recognition');
		const btnSay = document.querySelector('.btn-say');
		const btnSend = document.querySelector('.btn-send');
		const btnDisc = document.querySelector('.btn-disc');

		// We use async/await because Go functions are asynchronous
		const render = async () => {
			ia.innerText = `${await window.GetInput()}`;
		};

		btnSend.addEventListener('click', async () => {
			await Send(text.value, lang.value, fromLang.value); // Call Go function
			render();
		});

		render();
	</script>
	</body>
		</html>
