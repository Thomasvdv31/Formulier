// Get references to DOM elements
const forms = document.querySelectorAll(".form-control");
const selectProvince = document.querySelector("#selectProvince");
const inputZip = document.querySelector("#inputZip");
const checkVoorwaarden = document.querySelector("#checkVoorwaarden");
const btnBevestig = document.querySelector("#btnBevestig");
const alerts = document.querySelector("#alerts");
const alertPayment = document.querySelector("#alertPayment");
const radioBtns = document.getElementsByName('flexRadioDefault');

// Array to store all the errors
const errors = [];

// Define error messages for validation
const errorMessages = {
  emptyField: {
    inputFirstName: "Het veld voornaam is vereist.<br>",
    inputLastName: "Het veld naam is vereist.<br>",
    inputGebruikersNaam: "Het veld gebruikersnaam is vereist.<br>",
    inputEmail: "Het veld email is vereist.<br>",
    inputPassword: "Het veld wachtwoord is vereist.<br>",
    inputRepeatPassword: "Het veld herhaal wachtwoord is vereist.<br>",
    inputAddress: "Adres is vereist.<br>",
    selectProvince: "Provincie is vereist.<br>",
    inputZip: "Het veld postcode is vereist.<br>",
    checkVoorwaarden: "Je moet de algemene voorwaarden accepteren.<br>",
  },
  invalid: {
    inputEmail: "Ongeldige email.<br>",
    inputGebruikersNaam:
      "Gebruikersnaam mag alleen letters, nummers en underscores bevatten. Het mag ook punten en streepjes bevatten, maar niet als eerste karakter.<br>",
    inputPasswordLength: "Wachtwoord moet minimaal 8 karakters bevatten.<br>",
    inputPasswordMatch: "Wachtwoorden komen niet overeen.<br>",
    inputZip: "De waarde van postcode moet tussen 1000 en 9999 liggen.<br>",
  },
};

// Attach an event listener to the button
btnBevestig.addEventListener("click", ValidateForm);

// The function that handles form validation
function ValidateForm(){

  const { emptyField, invalid } = errorMessages;

  // loop through each Form-Control class name's input and checks each ID. Based on the id's name it will perform validation logic.
  forms.forEach(x => {
     switch (x.id) {
         case "inputFirstName":
            // Check if the firstName field is empty and add an error message if necessary.
             checkEmptyField(x, emptyField.inputFirstName);
             break;
         case "inputLastName":
            // Check if the lastName field is empty and add an error message if necessary.
             checkEmptyField(x, emptyField.inputLastName);
             break;
         case "inputGebruikersNaam":
            // Check if the Gebruikersnaam field is empty and add an error message if necessary.
             checkEmptyField(x, emptyField.inputGebruikersNaam);
             break;
         case "inputEmail": 
             // Validate the email address and add or remove an error message if necessary.
             // I Would do it like the rest but since the assignment asked to return a boolean i have to do it this way.
             const isValid = ValidateEmail(x);
             checkEmptyField(x, emptyField.inputEmail);
             if (!isValid) {
                 AddErrorToArray(invalid.inputEmail);
             } else {
                 RemoveErrorFromArray(invalid.inputEmail);
             }
             break;
         case "inputPassword":
              // Check if the password field is empty, validate the password length, and check if the password matches the repeated password
             checkEmptyField(x, emptyField.inputPassword);
             ValideerWachtwoord(x, invalid.inputPasswordLength, invalid.inputPasswordMatch);
             break;
         case "inputRepeatPassword":
             // Check if the RepeatPassword field is empty and add an error message if necessary.
             checkEmptyField(x, emptyField.inputRepeatPassword);
             break;
         case "inputAddress":
             // Check if the Adress field is empty and add an error message if necessary.
             checkEmptyField(x, emptyField.inputAddress);
             break;
         default:
             // Do nothing if the input id does not match any of the cases.
             break;
     }
 });

    // Validate the remaining input fields
    
    // Check if the province field is empty and add an error message if necessary.
    checkEmptyField(selectProvince, emptyField.selectProvince);
    
    // Check if the zip code field is empty and add an error message if necessary.
    checkEmptyField(inputZip, emptyField.inputZip);
    
    // Check if the zip code is in a valid format and add an error message if necessary.
    CheckPC(inputZip);
    
    // Check if the "terms and conditions" checkbox is empty and add an error message if necessary.
    checkEmptyField(checkVoorwaarden, emptyField.checkVoorwaarden);
    
    // Set the visibility of the error windows based on whether there are any error messages in the errors array or if theres a payment selected.
    AlertVisibility();

    
    
};


// This function checks if a form field is empty
// If the field is a checkbox, it checks if it is checked or not
// If the field is not a checkbox, it checks if the value is empty
// If the field is empty, an error message is added to an array of error messages
// If the field is not empty, the error message is removed from the array
function checkEmptyField(veld, melding) {
    
    if (veld.type === "checkbox") { 
      if (!veld.checked) {  // If checkbox is not checked, add error message to array
        AddErrorToArray(melding);
      } else {  // If checkbox is checked, remove error message from array
        RemoveErrorFromArray(melding);
      }
    } else if (veld.value === "") { // If value is empty, add error message to array
      AddErrorToArray(melding); 
    } else {  // If value is not empty, remove error message from array
      RemoveErrorFromArray(melding); 
    }
  }
  
  /**
 * Validate an email address using regular expressions.
 * @param {HTMLInputElement} email - The input field containing the email address.
 * @returns {boolean} True if the email address is valid, false otherwise.
 */
  function ValidateEmail(email) {
    // Define regular expressions to match email addresses, usernames, and domains.
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]+([.-]?[a-zA-Z0-9_]+)*[a-zA-Z0-9_]$/;
    const DomainRegex = /^[A-Za-z0-9][A-Za-z0-9.-]*$/;

    // Split the email address into its username and domain parts.
    const emailParts = email.value.split('@');
    const username = emailParts[0];
    const domain = emailParts[1];

    // Check if the email address matches the regular expressions for usernames, domains, and email addresses.
    if (!regex.test(email.value) || !DomainRegex.test(domain) || !usernameRegex.test(username)) {
      return false;
    }
    return true;
  }

  // This function validates the password field and checks if the entered passwords are valid and equal
  function ValideerWachtwoord(passwordField, errorMessagePasswordLength, errorMessagePasswordEquality) {
    // get the value of the repeat password field
    const repeatPassword = document.querySelector("#inputRepeatPassword").value;

    // check if the length of the password is less than 8 characters
    if (passwordField.value.length < 8) { 
      AddErrorToArray(errorMessagePasswordLength); // add error message to array if the password length is less than 8
    } else {
      RemoveErrorFromArray(errorMessagePasswordLength); // remove error message from array if the password length is 8 or more
    }
    // check if the password field value is not equal to the repeat password field value
    if (passwordField.value !== repeatPassword) {
      AddErrorToArray(errorMessagePasswordEquality); // add error message to array if the password fields do not match
    } else {
      RemoveErrorFromArray(errorMessagePasswordEquality); // remove error message from array if the password fields match  
  }
}


//Checks if the value of the input field is a valid postal code.
function CheckPC(veld){
  // Check if the input value is less than 1000 or greater than 9999, which are the valid postal code ranges.
  if (veld.value < 1000 || veld.value > 9999){
    AddErrorToArray(errorMessages.invalid.inputZip);  // add error message to the array if post code range is out of bounds.
  } else {
    RemoveErrorFromArray(errorMessages.invalid.inputZip); // remove error message from array if post code is in range. 
  }
}

/**
This function validates the selected payment option and displays it in the alertPayment div.
@param {HTMLCollection} veld - The collection of radio buttons that represent the available payment options.
*/
function validatePayment(veld){
  // Get the element where the payment information will be displayed
  let currentPaymentInfo = document.getElementById("paymentText");

      // If the payment information element doesn't exist, create it and add it to the HTML page
      if (!currentPaymentInfo) {
        currentPaymentInfo = document.createElement("p");
        currentPaymentInfo.id = "paymentText";
        alertPayment.appendChild(currentPaymentInfo);
      }
  
  // Loop through the payment options and check which one is selected
  for (let i = 0; i < veld.length; i++) {
    // If a payment option is selected, display the payment information and exit the loop
    if (veld[i].checked) {
      currentPaymentInfo.textContent = `Je betalingswijze is ${veld[i].value}.`;
      break;  
    }else{
      currentPaymentInfo.textContent = `Geen betalingswijze geselecteerd.`;
    }
  }
  $("#alertPayment").show(); // Turns the Payment window visible
}

/*
 * This function checks for the visibility of the alert box, and updates its content based on the validation results.
 * If no errors were found, it displays a success message and calls the validatePayment function to validate the payment info.
 * If errors were found, it displays an error message with the list of errors.
 */
function AlertVisibility(){
  // Get the elements for the alert title and info text
  let currentTitle = document.getElementById("AlertTitleId");
  let currentInfo = document.getElementById("AlertInfoId");

  if(!currentTitle){ // If the alert TITLE element does not exist, create it and append it to the alerts container
    currentTitle =  document.createElement("h4");
    currentTitle.id = "AlertTitleId";
    alerts.appendChild(currentTitle);
  }
  if(!currentInfo){ // If the alert INFO element does not exist, create it and append it to the alerts container
    currentInfo =  document.createElement("p");
    currentInfo.id = "AlertInfoId";
    alerts.appendChild(currentInfo);
  }

  // Check if any errors were found
  if (errors.length === 0){ // If no errors were found, display a success message and call the validatePayment function
    alerts.classList.add('alert', 'alert-success');
    alerts.classList.remove('alert-danger');
    currentTitle.textContent = "Goed gedaan!";
    currentInfo.textContent = "Aww yeah, je werd geregistreerd.";
    $("#alerts").show();
    validatePayment(radioBtns);
    
  }
  else{ // If errors were found, display an error message with the list of errors
    currentTitle.textContent = "Yikes, Errors...";
    currentInfo.innerHTML = errors.join('');
    alerts.classList.add('alert', 'alert-danger');
    alerts.classList.remove('alert-success');
    $("#alerts").show();
  }
}

/**
 * Adds an error message to an array if it does not already exist in the array.
 *
 * @param {string} errorMessage - The error message to add to the array.
 */
// https://jsdoc.app/tags-param.html For putting Synonyms in comments.
function AddErrorToArray(errorMessage){
  const index = errors.indexOf(errorMessage); // Find the index of the error message in the array.
  if (index === -1) { // If the error message is not already in the array, add it.
    errors.push(errorMessage);
  }
}

/**
 * Removes an error message from an array if it exists in the array.
 *
 * @param {string} errorMessage - The error message to remove from the array.
 */
function RemoveErrorFromArray(errorMessage){
  const index = errors.indexOf(errorMessage); // Find the index of the error message in the array.
  if (index > -1) { // If the error message is in the array, remove it using the splice method.
    errors.splice(index, 1);
  }
}