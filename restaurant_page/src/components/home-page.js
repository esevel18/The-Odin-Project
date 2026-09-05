import sushiImg from "../assets/sushi-set-hot-rolls-avocado-california-salmon-rolls.jpg";
import "../css/home-page-styles.css";

export default function loadHomePage(){
    // Hero text
    const heroText = document.createElement("div");
    heroText.setAttribute("class", "hero-text");

    const h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("Experience Authentic Taste Of Our Sushi"));

    const p = document.createElement("p");
    p.appendChild(
        document.
        createTextNode(
            "SushiTo is a japanese restaurant that represents japanese cuisine & sushi which aims to innovating and state the art of dishes made with moderen taste and love."
        )
    );

    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.appendChild(document.createTextNode("Make Reservation"));

    heroText.appendChild(h1);
    heroText.appendChild(p);
    heroText.appendChild(button);

    // Hero Img
    const heroImg = document.createElement("div");
    heroImg.setAttribute("class", "hero-img");

    const img = document.createElement("img");
    img.setAttribute("src", sushiImg);
    img.setAttribute("alt", "sushi picture");

    heroImg.appendChild(img);

    // Append to main content
    const content = document.getElementById("content");
    content.appendChild(heroText);
    content.appendChild(heroImg);
}