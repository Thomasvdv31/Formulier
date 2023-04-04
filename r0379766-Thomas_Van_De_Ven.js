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
                    ValidateGebruikersnaam(x);
                    break;
            case "inputEmail":
                    const emailError = "Ongeldige email.<br>";
                    checkEmptyField(x, "Email niet ingevuld.");
                    const isValid = ValidateEmail(x);
                    const index = errors.indexOf(emailError);
                    if (!isValid) {
                      if (index === -1) {
                        errors.push(emailError);
                      }
                    } else {
                      if (index !== -1) {
                        errors.splice(index, 1);
                      }
                    }
                    break;
            case "inputPassword":
                    checkEmptyField(x, "wachtwoord is niet ingevuld.");
                    ValideerWachtwoord();
                    break;
            case "inputRepeatPassword":
                    checkEmptyField(x, "Herhaal wachtwoord is niet ingevuld.");
                    ValideerWachtwoord();
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
    CheckPC(inputZip);
    checkEmptyField(flexCheckChecked, "Je moet de algemene voorwaarden accepteren.");

    if (errors.length === 0){
        alerts.textContent = "Succes";
        alerts.classList.add('alert', 'alert-success');
        alerts.classList.remove('alert-danger');
        $("#alerts").show();
        
    }
    else{
        alerts.innerHTML = errors.join('');
        alerts.classList.add('alert', 'alert-danger');
        alerts.classList.remove('alert-success');
        $("#alerts").show();
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
  
  function ValidateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomainRegex = /^[A-Za-z0-9][A-Za-z0-9.-]*$/;
    const emailParts = email.value.split('@');
    const domain = emailParts[1];
    if (!regex.test(email.value) || !validDomainRegex.test(domain)){
      return false;
    }
    return true
    
  }

  function ValideerWachtwoord() {
    const password = document.querySelector("#inputPassword").value;
    const repeatPassword = document.querySelector("#inputRepeatPassword").value;
    const index1 = errors.indexOf("Wachtwoord moet minimaal 8 karakters bevatten.<br>");
    const index = errors.indexOf("Wachtwoorden komen niet overeen.<br>");

    if (password.length < 8) {
      if (index1 === -1) {
        errors.push("Wachtwoord moet minimaal 8 karakters bevatten.<br>");
      }
    } else {
      if (index1 > -1) {
        errors.splice(index1, 1);
      }
    }

    if (password !== repeatPassword) {
      
      if (index === -1) {
        errors.push("Wachtwoorden komen niet overeen.<br>");
      }
    } else {
      if (index > -1) {
        errors.splice(index, 1);
      }
  }
}

function ValidateGebruikersnaam(veld) {
  const regex = /^[a-zA-Z0-9_]+([.-]?[a-zA-Z0-9_]+)*$/;
  const melding = "Gebruikersnaam mag alleen letters, nummers en underscores bevatten. Het mag ook punten en streepjes bevatten, maar niet als eerste karakter.";
  const index = errors.indexOf(melding + "<br>");
  if (!regex.test(veld.value) || /^[.-]/.test(veld.value)) {
    if (index === -1) {
      errors.push(melding + "<br>");
    }
  } else {
    if (index > -1) {
      errors.splice(index, 1);
    }
  }
}

function CheckPC(veld){
  const melding = "De waarde van postcode moet tussen 1000 en 9999 liggen.";
  const index = errors.indexOf(melding + "<br>");
  if (veld.value < 1000 || veld.value > 9999){
    if (index === -1) {
      errors.push(melding + "<br>");
    }
  } else {
    if (index > -1) {
      errors.splice(index, 1);
    }
  }
}

    
  

