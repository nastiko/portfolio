$(function (){
    $('.icon-menu').on( 'click', function(){
        $('.mobile-list').slideToggle('slow');
    });
});



let form = document.getElementById('form-submit');
async function handleSubmit(event) {
    event.preventDefault();

    let blockSubmit = document.getElementById('block-submit');
    let status = document.createElement('div');
    status.id = 'form-status';
    status.classList.add('submit-style');
    blockSubmit.appendChild(status);

    let data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = 'Thanks for your submission!';
            form.reset()
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data['errors'].map(error => error['message']).join(', ')
                } else {
                    status.innerHTML = 'Oops! There was a problem submitting your form';
                }
            })
        }
    }).catch(error => {
        status.innerHTML = 'Oops! There was a problem submitting your form';
    });
}
form.addEventListener('submit', handleSubmit);

