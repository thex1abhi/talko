
(function () {

    //userData 

    const script = document.currentScript;

    const userId = script?.dataset?.userId

    const theme = "dark"

    const assistantConfig = null

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

})();