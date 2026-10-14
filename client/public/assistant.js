
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

    



})();