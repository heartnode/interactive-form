/**
 * Initialize the "Job Role" section code 
 */ 
function initJobRole(){
    // Default hide the "Other job role" text field
    let otherJobRoleField = document.getElementById('other-job-role');
    otherJobRoleField.classList.add('hide');

    // Enable dynamic form changes base on selected "Job Role" value
    document.getElementById('title').addEventListener('change', (e) =>{
        var selectedRole = e.target.value;
        // Enable "Other job role" field base on selected "Job Role". 
        //Hide the "Other job role" for all other selected Job Role.  
        if (selectedRole === 'other'){
            otherJobRoleField.classList.remove('hide');
        } else if (!otherJobRoleField.classList.contains('hide')){
            otherJobRoleField.classList.toggle('hide');
        }
    });
}

/*
 * Initialize the T Shirt Info section code
 */
function initTShirtInfo(){
    // Default disable the Shirt Color drop down list
    let shirtColors = document.getElementById('color');
    shirtColors.disabled = true;

    // When a Design is picked the "Shirt Colors" drop down changes accordingly.
    document.getElementById('design').addEventListener('change', (e)=>{

        let selectedDesign = e.target.value;         
        let options = shirtColors.getElementsByTagName('option');
        let isSelected = false;
        
        for (let option of options){
            // Show the Color option only if matched with a selected Design
            if (option.dataset.theme === selectedDesign){
                // Resets the selected color to match with the selected theme only once
                if (!isSelected){
                    option.selected = true;
                    isSelected = true;
                }
                // Show the match Color option with the Theme
                option.removeAttribute('hidden');
            } else{
                // Hide the Color option if is not part of the same theme
                option.setAttribute('hidden','');
            }
        }
        // Set the Colors dropdown to be selectable
        shirtColors.disabled = false;

    });
}

/**
 * Initialize the "Register for Activities" section
 */
function initRegisterForActivities(){
    // Create reference to the Activities Cost and the container of activities 
    let activitiesCost = document.getElementById('activities-cost');
    let activities = document.getElementById('activities');

    // Enables in-focus and out-of-focus highlights of checkboxes within the activities section
    let chkboxes = document.querySelectorAll('#activities input[type=checkbox]');
    for(let chkbox of chkboxes){
        chkbox.addEventListener('focus', e=>{
            e.target.parentNode.classList.add("focus");
        });

        chkbox.addEventListener('blur', e=>{
            e.target.parentNode.classList.remove('focus');
        });
    }
    // Add event listener for the activities fieldset that handles the checkboxes updates
    activities.addEventListener('change',e=>{
        let currentCheckbox = e.target;
        let conflictSchedule = [];

        // Iterate over all the checkboxes to find conflicts in the schedule base on the data attribute day-and-time of the checkbox
        let checkedboxes = activities.querySelectorAll('input[type=checkbox]:checked');
        for(let checkbox of checkedboxes){
            let dayAndTime = checkbox.dataset.dayAndTime;
            // If the checkbox is checked and contains data-day-and-time attribute then add to list of potential schedule conflicts
            if (dayAndTime){
                if (!conflictSchedule.includes(dayAndTime)){
                    conflictSchedule.push(dayAndTime);
                }  
            } 
        }

        //Iterate over all the boxes if an unregistered event is conflict with an already registered event then disable it from the UI
        let uncheckedboxes = activities.querySelectorAll('input[type=checkbox]:not(:checked)');
        for (let checkbox of uncheckedboxes){
            let dayAndTime = checkbox.dataset.dayAndTime;
            // Disable the option if is in conflict with a registered event
            if (conflictSchedule.includes(dayAndTime)){
                checkbox.parentNode.classList.add('disabled');
                checkbox.disabled = true;
            } else {
                // Not a conflict in schedule make sure is enabled
                checkbox.parentNode.classList.remove('disabled');
                checkbox.disabled = false;
            }

        }
 
        //Calculate the Total cost of all the selected event
        let total = 0;
        for(let checked of checkedboxes){
            if (checked.dataset.cost){
                let cost = parseInt(checked.dataset.cost);
                if (cost > 0){
                    total += cost;
                }
            }
        }
        //Update the Activities Cost to display the total
        activitiesCost.textContent = `Total: $${total}`;
        
    });
}
/***
 * Initalize the "Payment Info" section
 */
function initPaymentInfo(){
    var payment = document.getElementById('payment');
    
    // Listen for payment type change events
    payment.addEventListener('change',e=>{
        // Hide the UI for all other payment type that is not the currently selected payment
        let selectedPayment = e.target.value;
        let hideOptions = payment.querySelectorAll('option:not([value="'+selectedPayment+'"]):not([hidden])');
        for(let option of hideOptions){
            let optValue = option.value;
            document.getElementById(optValue).classList.add("hide");
        }

        //Show the UI for the selected payment type
        document.getElementById(selectedPayment).classList.remove("hide");
    });

    //By default set payment to credit card during initial load of the UI
    payment.querySelector('option[value="credit-card"]').selected = true;

    //Update the UI to show credit card related input fields
    let changeEvent = new Event('change');
    payment.dispatchEvent(changeEvent);

}

/**
 * Update the display of validity in the UI for the given input field base on the status is valid or not-valid.
 * @param {HTMLElement} field 
 * @param {function} validator 
 */
function updateValidity(field,validator){
    // Perform validation check and determines the status
    let status = validator(field.value) ? 'valid' : 'not-valid';

    //  Base on the validity update the UI to show validity mark and the corresponding hint message
    if (status === 'valid'){
        field.parentNode.classList.remove('not-valid');
        field.parentNode.classList.add('valid');
        field.parentElement.lastElementChild.classList.remove('active'); // hint
    } else if (status === 'not-valid') {
        field.parentNode.classList.remove('valid');
        field.parentNode.classList.add('not-valid');
        field.parentElement.lastElementChild.classList.add('active'); // hint
    }
}

/**
 * Validate the name is it consists of alphabets for first, middle or middle initial(optional) and last name(optional), all case insensitive.
 * @param {string} name 
 * @return {boolean} this returns either the input name is valid (true) or invalid (false)
 */
function validateName(name){
    return /^[a-z]+( [a-z.]*)?( [a-z]+)?$/i.test(name.trim());
}

/**
 * Validate the email is it contains account name follow by single @ and has domain name ends with .com
 * @param {string} email 
 * @return {boolean} this returns either the input email is valid (true) or invalid (false)
 */
function validateEmail(email){
    return /^[^@ ]+@[^@. ]+\.com$/i.test(email);
}

/**
 * Checks the register activites section of the form with at least one activity checked
 */
function checkRegisteredActivities(){
    let activities = document.getElementById('activities');
    let activitiesHint = document.getElementById('activities-hint');
    //Get all the checked activites 
    let registeredActivities = activities.querySelectorAll('input[type=checkbox]:checked');

    //If no activities checked the entire section is invalid otherwise considered valid
    if (registeredActivities.length === 0){
        activities.classList.remove('valid');
        activities.classList.add('not-valid');
        activitiesHint.classList.add('active');
    } else {
        activities.classList.remove('not-valid');
        activities.classList.add('valid');
        activitiesHint.classList.remove('active');
    }
}
/**
 * Validates the credit card number it should consists 13-16 digits of numbers between 0 and 9.
 * @param {string} ccnum 
 * @return {boolean} either valid (true) or invalid (false)
 */
function validateCCNum(ccnum){
    return /^\d{13,16}$/.test(ccnum);
}

/**
 * Validates the zip code it should be a string consists 5 digits of numbers between 0 and 9.
 * @param {string} zip 
 * @return {boolean} either valid (true) or invalid (false)
 */
function validateCCZip(zip){
    return /^\d{5}$/.test(zip);
}

/**
 * Validates the CVV it should be a string consists of 3 digits of numbers between 0 and 9.
 * @param {string} cvv 
 * @return {boolean} either valid (true) or invalid (false)
 */
function validateCVV(cvv){
    return /^\d{3}$/.test(cvv);
}

/**
 * Setup real time validation for a given field
 * @param {HTMLElement} field 
 * @param {function} validator 
 */
function setupRealtimeValidation(field,validator){
    //Making sure only input type of text or email works with the real time validation
    if (field.tagName === 'INPUT' && ["text","email"].includes(field.getAttribute("type"))){    
        //Listen for user inputs the key event
        field.addEventListener('keyup',()=>{
            // Make sure something have entered and not just whitespaces
            if (field.value.trim() !== ''){
                //Perform validity check and updates the UI accordingly.
                updateValidity(field,validator);
            }
        });
    }
}
/**
 * Setup form validation
 */
function setupFormValidation(){
    let form = document.querySelector('form');
    let nameField = document.getElementById('name');
    let emailField = document.getElementById('email');
    let activities = document.getElementById('activities');
    let paymentType = document.getElementById('payment');
    let ccnumField = document.getElementById('cc-num');
    let zipField = document.getElementById('zip');
    let cvvField = document.getElementById('cvv');

    //Enable validation check on form submission (i.e. when the user clicks on the Register button)
    form.addEventListener('submit',(e)=>{
 
        //Validate the Name field make sure is not empty or whitespaces only
        updateValidity(nameField,validateName);

        //Validate email field make sure is in account@domain.com format
        updateValidity(emailField,validateEmail);
        
        //Make sure at least one activities is checked
        checkRegisteredActivities();

        //When the payment type is credit card perform validation on the credit card information
        if (paymentType.value === 'credit-card'){
            //Validate credit card is a string between 13-16 digits of numbers 
            updateValidity(ccnumField,validateCCNum);

            //Validate the zip code is a combination of 5 digits of numbers
            updateValidity(zipField, validateCCZip);

            //Validate the CVV field is a combination of 3 digits of numbers
            updateValidity(cvvField, validateCVV);
        } else {
            // When other payment type is selected make sure to clean up invalid test results from previous performed actions
            let labels = document.querySelectorAll('.credit-card-box label');
            for(let label of labels){
                label.classList.remove('not-valid');
            }
        }
        // Pervent the form submission if one or more fields are labeled as invalid
        if (document.querySelectorAll('.not-valid').length > 0)
            e.preventDefault();
    });

    // Setup real time validation for name field
    setupRealtimeValidation(nameField,validateName);

    // Setup real time validation for email field
    setupRealtimeValidation(emailField,validateEmail);

    // Setup real time validation for activities
    activities.addEventListener('change',(e)=>{
        checkRegisteredActivities();
    });

    // Setup real time validation for credit card number field
    setupRealtimeValidation(ccnumField,validateCCNum);

    // Setup real time validation for zip code field
    setupRealtimeValidation(zipField,validateCCZip);

    // Setup real time validation for CVV field
    setupRealtimeValidation(cvvField,validateCVV);
}

// Populate the page when is fully loaded and the DOM is ready,
document.addEventListener('DOMContentLoaded', () => {
    
    // Set the input focus on the Name field
    document.getElementById('name').focus();

    // Initialize job fields
    initJobRole();
    
    // Initialize TShirt Info section
    initTShirtInfo();

    // Initalize Register for Activities section
    initRegisterForActivities();

    // Initalize Payment Info section
    initPaymentInfo();

    // Setup form validation when user clicks Register button
    setupFormValidation();

});