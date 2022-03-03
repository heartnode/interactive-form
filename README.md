Intearctive Form
This project is a simple register page for a make up Full Stack conference.
It depended on Javascript and a modern Web browser with or without Javascript.

The index.html page will have both real-time and submission validation.
1. Real time validation will be started as soon as the user typing in the Name and Email field. 
    1. Name field with a string of first name and optionally middle and last name are considered valid. 
    2. Email field following example-account@domain.com  format are considered valid, the user have to completely type up til the .com portion of the address in order for the validator to change from invalid to valid. 
        1. If the user only enter a string without @ symbol, the validation will show "Email address must contain a single @".
        2. If the user enters the @ symbol but missing a vaild domain name, the validation will show "The domain portion of the email address is invalid (the portion after the @.)"
2. When a user perform a click on one of the activity in the Activities to Register, a real time validation will be performed. When at least one activity is checked the validation is consider valid. Otherwise, it will consider invalid and the hint message will displayed.
3. When a user selected credit card payment type, the credit card number, zip code and CVV are being validated in real time.
    1. As soon as the user started to key in the credit card information up til the 12 digits of numbers (0-9) are considered invalid on the 13th digits when keyed in a number then it will display as valid. In form submission validation, 13-16 digits of numbers are considered valid for the credit card number field.
    2. The Zip and CVV fields are done similar to the credit card number field except they are strings of numbers that is 5 and 3 digits long to be considered valid. And the all other values are considered invalid for both fields.



