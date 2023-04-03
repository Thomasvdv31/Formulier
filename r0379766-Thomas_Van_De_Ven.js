let forms = document.querySelectorAll(".form-control");
let selectProvince = document.querySelector("#selectProvince");
let inputZip = document.querySelector("#inputZip");
let flexCheckChecked = document.querySelector("#flexCheckChecked");
let btnBevestig = document.querySelector("#btnBevestig");
let alerts = document.querySelector("#alerts");
const errors = [];
btnBevestig.addEventListener("click", ValidateForm);


function ValidateForm(){
   
    forms.forEach(x => {
        // check if the value of the control is empty
        switch (x.getAttribute("id")) {
            case "inputFirstName":
                    checkEmptyField(x, "Voornaam niet ingevuld.");
                    break;
            case "inputLastName":
                    checkEmptyField(x, "Naam niet ingevuld.");
                    break;
            case "inputGebruikersNaam":
                    checkEmptyField(x, "Gebruikersnaam niet ingevuld.");
                    break;
            case "inputEmail":
                    checkEmptyField(x, "Email niet ingevuld.");
                    break;
            case "inputPassword":
                    checkEmptyField(x, "wachtwoord is niet ingevuld.");
                    break;
            case "inputRepeatPassword":
                    checkEmptyField(x, "Herhaal wachtwoord is niet ingevuld.");
                    break;
            case "inputAddress":
                    checkEmptyField(x, "Adress is niet ingevuld.");
                    break;
            case "inputRepeatPassword":
                    checkEmptyField(x, "Herhaal wachtwoord is niet ingevuld.");
                    break;
            default:
                break;
        } 
              
    })
    checkEmptyField(selectProvince, "Selecteer een provincie.");
    checkEmptyField(inputZip, "Zipcode is niet ingevuld");
    checkEmptyField(flexCheckChecked, "Je moet de algemene voorwaarden accepteren.");

    if (errors.length === 0){
        alerts.textContent = "Succes";
        alerts.classList.add('alert', 'alert-success');
        alerts.classList.remove('alert-danger');
    }
    else{
        alerts.innerHTML = errors.join('');
        alerts.classList.add('alert', 'alert-danger');
        alerts.classList.remove('alert-success');
    }
    
};

function checkEmptyField(veld, melding) {
    const index = errors.indexOf(melding + "<br>");
    
    if (veld.type === "checkbox") {
      if (!veld.checked) {
        if (index === -1) {
          errors.push(melding + "<br>");
        }
      } else {
        if (index > -1) {
          errors.splice(index, 1);
        }
      }
    } else if (veld.value === "") {
      if (index === -1) {
        errors.push(melding + "<br>");
      }
    } else {
      if (index > -1) {
        errors.splice(index, 1);
      }
    }
  }

