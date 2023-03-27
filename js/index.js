//
$(function () {
    $('.icon-menu').on('click', function () {
        $('.mobile-list').slideToggle('slow');
    });
});


// Submit form
async function handleSubmit(event) {
    event.preventDefault();

    //validate? true / false
    if(!validateForm()){
        return;
    }

    let blockSubmit = document.getElementById('block-submit');
    let status = document.createElement('div');
    status.id = 'form-status';
    status.classList.add('submit-style');
    blockSubmit.appendChild(status);

    let data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data
    }).then(response => {
        if (response.ok) {
            status.innerHTML = 'Thanks for your submission!';
            form.reset();
        } else {
            status.innerHTML = 'Oops! There was a problem submitting your form';
        }
    }).catch(error => {
        status.innerHTML = 'Oops! There was a problem submitting your form';
    });

}

function validateForm() {
    let fullNameValue = fullName.value.trim();
    let emailValue = email.value.trim();
    let subjectValue = subject.value.trim();
    let messageValue = message.value.trim();

    let validationResult = true;

    let setError = (elem, message) => {
        let inputControl = elem.parentElement;
        let errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerHTML = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');

        validationResult = false;
    }

    let setSuccess = elem => {
        let inputControl = elem.parentElement;
        let errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerHTML = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }

    let isValidEmail = email => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }

    if(fullNameValue === '') {
        setError(fullName, 'Name is required');
    } else {
        setSuccess(fullName);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if(!isValidEmail(emailValue)){
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(subjectValue === '') {
        setError(subject, 'Subject is required');
    } else if(subjectValue.length >= 30) {
        setError(subject, 'The title of the subject is long');
    } else {
        setSuccess(subject);
    }

    if(messageValue === '') {
        setError(message, 'Message is required');
    } else {
        setSuccess(message);
    }

    return validationResult;
}

let form = document.getElementById('form-submit');
let fullName = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

form.addEventListener('submit', handleSubmit);
