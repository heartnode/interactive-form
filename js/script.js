
// "Job Role" section code 
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

// T Shirt Info section code
function initTShirtInfo(){
    // Default hide the "Shirt Colors" drop down list
    let shirtColors = document.getElementById('shirt-colors');
    shirtColors.classList.add('hide');

    // When the Design is picked "Shirt Colors" drop down changes accordingly.
    document.getElementById('design').addEventListener('change', (e)=>{

        let selectedDesign = e.target.value;         
        let options = shirtColors.getElementsByTagName('option');
        let isSelected = false;
        
        for (let option of options){
            // Show the Color option only if matched with the selected Design
            if (option.dataset.theme === selectedDesign){
                // Resets the selected color to match with the selected theme only once
                if (!isSelected){
                    option.selected = true;
                    shirtColors.value = option.value;
                    isSelected = true;
                }
                // Show the match Color option with the Theme
                option.removeAttribute('hidden');
            } else{
                // Hide the Color option if is not part of the same theme
                option.setAttribute('hidden','');
            }
        }
        // Set the Colors dropdown to be visible
        shirtColors.classList.remove('hide');

    });
}

/**
 * Initialize the "Register for Activities" section
 */
function initRegisterForActivities(){
    // Create references to the Activities Cost and the container of activities 
    let activitiesCost = document.getElementById('activities-cost');
    let activities = document.getElementById('activities');

    // Add event listener for the activities fieldset that handles the checkboxes updates
    activities.addEventListener('change',e=>{
        let currentCheckbox = e.target;
        let conflictSchedule = [];

        //Iterate over all the checkboxes to find conflicts in the schedule base on the data attribute day-and-time of the checkbox
        let checkedboxes = activities.querySelectorAll('input[type=checkbox]:checked');
        for(let checkbox of checkedboxes){
            let dayAndTime = checkbox.dataset.dayAndTime;
            // If the checkbox is checked and contains data-day-and-time attribute add to list of potential schedule conflicts
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
            // Disable the option if is in conflict with an registered event
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

        //Show the UI of the selected payment type
        document.getElementById(selectedPayment).classList.remove("hide");
    });

    //By default set payment to credit card during initial load of the UI
    payment.querySelector('option[value="credit-card"]').selected = true;
    let changeEvent = new Event('change');
    payment.dispatchEvent(changeEvent);

}
/**
 * Setup form validation
 */
function setupFormValidation(){
    let form = document.querySelector('form');
    form.addEventListener('submit',(e)=>{
        console.log("Form submit");
        e.preventDefault();
    });
}

// Populate the page when is fully loaded and the DOM is ready,
document.addEventListener('DOMContentLoaded', () => {
    
    // Set the input focus on the Name field
    document.getElementById('name').focus();

    initJobRole();
    initTShirtInfo();
    initRegisterForActivities();
    initPaymentInfo();

    setupFormValidation();
});