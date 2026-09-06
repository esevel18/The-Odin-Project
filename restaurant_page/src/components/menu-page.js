import "../css/menu-page-styles.css"
import tunaTartarRollImg from "../assets/imgi_10_TUNA-TARTAR-ROLL-1.jpg";
import yokomahaRamen from "../assets/imgi_4_YOKOHAMA-SPICY-RAMEN.jpg";
import tunaMentaiRollImg from "../assets/imgi_11_TUNA-MENTAI-ROLL-1.jpg";
import tunaMentaiNigiri from "../assets/imgi_12_TUNA-MENTAI-SUSHI.jpg";
import yuzuCoffee from "../assets/imgi_3_YUZU-COFFEE.jpg";
import toriKarageImg from "../assets/imgi_14_TEMPURA-KARAGE.jpg";

const data = [
    {
        name: "Tuna Tartar Roll",
        imgSrc: tunaTartarRollImg,
        desc: "Tuna, mentimun, saus tartar dan saus namban.",
        price: "Rp 20.000"
    },
    {
        name: "Yoko Hama Ramen",
        imgSrc: yokomahaRamen,
        desc: "Ramen mala spesial dengan gyoza kukus, jamur, telur, dan daun bawang.",
        price: "Rp 35.000"
    },
    {
        name: "Tuna Menati Roll",
        imgSrc: tunaMentaiRollImg,
        desc: "Nasi sushi dengan tuna, ber-topping saus mentai.",
        price: "Rp 25.000"
    },
    {
        name: "Tuna Mentai Nigiri",
        imgSrc: tunaMentaiNigiri,
        desc: "Tuna yang disajikan di atas atau bersama nasi sushi lalu diberi saus mentai.",
        price: "Rp 30.000"
    },
    {
        name: "Yuzu Coffee",
        imgSrc: yuzuCoffee,
        desc: "Fresh Yuzu Coffee",
        price: "Rp 15.000"
    },
    {
        name: "Tori Karage",
        imgSrc: toriKarageImg,
        desc: "Ayam Goreng Khas Jepang",
        price: "Rp 25.000"
    },
];

function makeCard(imgSrc, name, desc, price){
    const card = document.createElement("div");
    card.setAttribute("class", "grid-card");

    // Image
    const cardImgContainer = document.createElement("div");
    cardImgContainer.setAttribute("class", "grid-card-img");

    const img = document.createElement("img");
    img.setAttribute("src", imgSrc);

    cardImgContainer.appendChild(img);

    // Text
    const cardTextContainer = document.createElement("div");
    cardTextContainer.setAttribute("class", "grid-card-text");

    const h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode(name));

    const p = document.createElement("p");
    p.appendChild(document.createTextNode(desc));

    const h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(price));

    cardTextContainer.appendChild(h2);
    cardTextContainer.appendChild(p);
    cardTextContainer.appendChild(h3);

    // Combaine
    card.appendChild(cardImgContainer);
    card.appendChild(cardTextContainer);

    return card;
}

export default function loadMenuPage(){
    const content = document.getElementById("content");

    const h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("Our Menu"));
    content.appendChild(h1);

    const grid = document.createElement("div");
    grid.setAttribute("class", "grid-container");

    data.forEach(d => {
        const card = makeCard(d.imgSrc, d.name, d.desc, d.price);
        grid.appendChild(card);
    });
    

    content.classList.add("menu-content");
    content.appendChild(grid);
}