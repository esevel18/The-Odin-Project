import "./styles.css";
import loadHomePage from "./components/home-page.js";
import loadMenuPage from "./components/menu-page.js";
import loadAboutUsPage from "./components/about-us-page.js";

// loadHomePage();
// loadMenuPage();
// loadAboutUsPage();

function handleSwitchPage(e){
    e.preventDefault();
    const target = e.currentTarget;
    const targetValue = target.dataset.value
    
    const content = document.getElementById("content");
    content.innerHTML = "";

    content.classList.remove("menu-content");
    content.classList.remove("about-content");
    
    document
        .querySelectorAll("nav button.active-button")
        .forEach(button => {
            button.classList.remove("active-button");
        });

    target.classList.add("active-button");

    if(targetValue === "Home"){
        loadHomePage();
    } else if(targetValue === "Menu"){
        loadMenuPage();
    } else{
        loadAboutUsPage();
    }
}

// MAIN
(function (){
    const navButtons = document.querySelectorAll("nav button");
    navButtons.forEach(button => {
        button.addEventListener("click", handleSwitchPage);
    });
    loadHomePage();
})();