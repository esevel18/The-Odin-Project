import RegisterData from "./register.js";

const form = document.getElementById("registration-form");

function getDataForm(form){
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    return new RegisterData(data);
}

function handleSubmit(e){
    e.preventDefault();

    const isValid = validate();

    if(isValid)
        confirm("Are you sure?");
    else
        alert("Invalid inputs");
}

function validate(){
    const data = getDataForm(form);

    console.log(JSON.stringify(data));

    return data.validate();
}

// MAIN
(function () {
    form.addEventListener("submit", handleSubmit);
})();