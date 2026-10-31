
(function () {

  //userData 

  const script = document.currentScript;

  const userId = script?.dataset?.userId

  const theme = "dark"

  let assistantConfig = null

  // css 

  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = "http://localhost:5173/assistant.css"

  document.head.appendChild(link)

  // assistant popup  

  const popup = document.createElement("div")

  popup.className = `talko-popup theme-${theme}`
  popup.innerHTML = `
    <div class="talko-overlay"></div>

    <div class="talko-content">
      <div class="talko-top">
        <div class="talko-orb-wrap">
          <div class="talko-orb-glow"></div>
          <div class="talko-orb"></div>
        </div>

        <h2 class="talko-title">Hello! I'm Talko AI</h2>
        <p class="talko-sub">
          Your smart voice assistant
          <br />
          Ask anything about your website.
        </p>

        <div class="talko-status">Tap button to speak</div>

        <div class="talko-wave">
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
        </div>

        <div class="talko-user-text"></div>
        <div class="talko-ai-text"></div>
      </div>

      <div class="talko-bottom">
        <button class="talko-mic">
          <img src="http://localhost:5173/mic.svg" alt="mic" class="talko-mic-icon" />
        </button>
      </div>
    </div>
    `;
  document.body.appendChild(popup);

  //  floating button 

  const button = document.createElement("button")

  button.className = `talko-btn theme-${theme} `

  button.innerHTML = `
  <img src="http://localhost:5173/logo.png" alt="logo" />
  `
  document.body.appendChild(button);


  //toggle popup 

  let open = false;

  button.onclick = () => {
    open = !open;
    popup.style.display = open ? "flex" : "none";

  }

  //load assistant 

  const loadAssistant = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/assistant/config/${userId}`)
      const data = await res.json()
      // console.log(data);

      if (data) {
        assistantConfig = data.user
        applyConfig()
      }

    } catch (error) {
      console.log(`Assistant load  error : ${error} `);
    }
  }

  const applyConfig = async () => {
    try {
      if (!assistantConfig) return;

      popup.className = `talko-popup theme-${assistantConfig.theme}`
      button.className = `talko-btn theme-${assistantConfig.theme} `

      const title = popup.querySelector(".talko-title")

      title.innerHTML = `Hello I'm ${assistantConfig.assistantName} `

      const subtitle = popup.querySelector(".talko-sub")
      subtitle.innerHTML = `Welcome to  ${assistantConfig.businessName}. </br>
      Ask anything about your website 
      `

    } catch (error) {
      console.log(error);
    }
  }

  loadAssistant()

  const status = popup.querySelector(".talko-status")
  const wave = popup.querySelector(".talko-wave")
  const userText = popup.querySelector(".talko-user-text")
  const aiText = popup.querySelector(".talko-ai-text")
  const mic = popup.querySelector(".talko-mic")

  const speak = (text) => {

    window.speechSynthesis.cancel()

    aiText.innerHTML = text;
    status.innerHTML = "AI Speaking ...";

    const speech = new SpeechSynthesisUtterance(text)

    speech.lang = "hi-IN";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onend = () => {

      status.innerText = "Tap button to speak "
      wave.style.opacity = "0";

    }
    window.speechSynthesis.speak(
      speech
    )

  }

  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  if (speechRecognition) {
    const recognition = new speechRecognition()

    recognition.lang = "en-us";
    recognition.continuous = false;
    recognition.interimResults = false;


    mic.onclick = () => {
      wave.style.opacity = "1";
      status.innerHTML = "Listening...";
      userText.innerHTML = "";
      aiText.innerHTML = "";
      recognition.start();

    }

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript
      userText.innerHTML = "You : " + text
      recognition.stop();

      setTimeout(async () => {
        try {
          status.innerHTML = "Thinking...";
          const res = await fetch("http://localhots:8000/api/assistant/ask", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              message: text,
              userId
            })
          })

          const data = await res.json()
          console.log(data);

          if (data.success) {
            if (data.action === "navigate") {
              speak(data.response)

              setTimeout(() => {
                window.location.href = data.path
              }, 1500);
            } else {
              speak(data.aiResponse)
            }
          } else {
            speak("Response Error Check your plan ")
          }

        } catch (error) {
          console.log(error);
          speak("Server error ")
        }
      }, 600)
    }
    recognition.onerror = () => {
      status.innerHTML = "Tap button to speak ";
      wave.style.opacity = "0";
    }
  } else {
    status.innerHTML = "Speech recognition not supported"
  }
  
})();