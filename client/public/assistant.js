
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
      console.log(data);

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
      subtitle.innerHTML = `Welcome to  ${assistantConfig.businessName }. </br>
      Ask anything about your website 
      `

    } catch (error) {
      console.log(error);
    }
  }

  loadAssistant()

})();