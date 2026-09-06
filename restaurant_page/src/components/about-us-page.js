import "../css/about-page-styles.css";

function makeSectionCard(heading, desc){
    const sectionCard = document.createElement("section");
    sectionCard.setAttribute("class", "section-card");

    const h1 = document.createElement("h1");
    h1.textContent = heading;

    const p = document.createElement("p");
    p.textContent = desc;

    sectionCard.appendChild(h1);
    sectionCard.appendChild(p);

    return sectionCard
}

export default function loadAboutUsPage() {
    const content = document.getElementById("content");

    const container = document.createElement("div");
    container.setAttribute("class", "container");

    container.appendChild(
        makeSectionCard(
            "About us",
            "Sushi To selalu berkomitmen untuk memberikan cita rasa yang otentik dan pelayanan yang baik"
        )
    );
    container.appendChild(
        makeSectionCard(
            "Address",
            "Sushi To selalu berkomitmen untuk memberikan cita rasa yang otentik dan pelayanan yang baik"
        )
    );
    container.appendChild(
        makeSectionCard(
            "Telephone",
            "0812345678"
        )
    );
    container.appendChild(
        makeSectionCard(
            "Email",
            "sushiTo@sushito.com"
        )
    );

    const schedule = makeSectionCard("Opening Hours", "Tuesday – Thursday: 5:00 PM – 10:00 PM");
    schedule.appendChild(document.createTextNode("Friday – Saturday: 5:00 PM – 11:00 PM"));
    schedule.appendChild(document.createTextNode("Sunday: 5:00 PM – 9:00 PM"));
    schedule.appendChild(document.createTextNode("Monday: Closed"));

    container.appendChild(schedule);
    
    content.classList.add("about-content");
    content.appendChild(container);
}