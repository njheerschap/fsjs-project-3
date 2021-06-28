function validateForm() {
    const nameField = document.getElementById('name');
    const paymentType = document.getElementById('payment');

    function focusName () {
        nameField.focus();
    }

    function otherJobRole () {
        const jobTitle = document.getElementById('title');
        const otherJob = document.getElementById('other-job-role');
        
        otherJob.style.display = 'none';
        
        jobTitle.addEventListener('change', () => {
            if (jobTitle.value === 'other') {
                otherJob.style.display = '';
            } else {
                otherJob.style.display = 'none';
            }
        });
    }

    function shirtColor () {
        const colorPicker = document.getElementById('color');
        const design = document.getElementById('design');
        const colors = document.querySelectorAll('[data-theme]');

        colors.forEach ((element) => {
            element.style.display = 'none';
        })
        
        design.addEventListener('change', () => {
            if (design.value.includes('puns')) {
                colors.forEach ((element) => {
                    element.style.display = 'none';
                    if (element.dataset.theme.includes('pun')) {
                        element.style.display = '';
                    } else {
                        colorPicker.value = '';
                        element.style.display = 'none';
                    }
                });
            } else if (design.value.includes('heart')) {
                colorPicker.style.display = '';
                colors.forEach ((element) => {
                    if (element.dataset.theme.includes('heart')) {
                        element.style.display = '';
                    } else {
                        colorPicker.value = '';
                        element.style.display = 'none';
                    }
                });
            }
        })
    }

    function totalCost () {
        let total = document.getElementById('activities-cost');
        let count = 0
        const costArray = document.querySelectorAll('[data-cost]')
        costArray.forEach((element) => {
            const cost = parseInt(element.dataset.cost);
            element.addEventListener('change', () => {
                if (element.checked) {
                    count += cost;
                } else {
                    count -= cost;
                }
                total.innerText =`Total: $${count}`;
            })
        })
        
    }

    function payment () {
        const creditCardOption = document.querySelector('[value="credit-card"]');
        const creditCard = document.getElementById('credit-card')
        const payPal = document.getElementById('paypal');
        const bitcoin = document.getElementById('bitcoin');
        creditCardOption.setAttribute('selected', 'selected');

        payPal.style.display = 'none';
        bitcoin.style.display = 'none';

        paymentType.addEventListener('change', () => {
            if (paymentType.value === 'paypal') {
                creditCard.style.display = 'none';
                bitcoin.style.display = 'none';
                payPal.style.display = '';
            } else if (paymentType.value === 'bitcoin') {
                payPal.style.display = 'none';
                creditCard.style.display = 'none';
                bitcoin.style.display = '';
            } else if (paymentType.value === 'credit-card') {
                bitcoin.style.display = 'none';
                payPal.style.display = 'none';
                creditCard.style.display = '';
            }
        })
    }

    function notValid(field) {
        field.parentNode.classList = '';
        field.parentNode.classList += 'not-valid';
    }
    function valid(field) {
        field.parentNode.classList = '';
        field.parentNode.classList += 'valid';
    }

    function validate(field, hint, regex, e) {
        let fieldValue = field.value;
        if (!regex.test(fieldValue)) {
            e.preventDefault();
            hint.style.display = 'block';
            notValid(field);
        } else {
            hint.style.display = 'none';
            valid(field);
        }
    }

    function checkName () {
        const nameHint = document.getElementById('name-hint');
        const regex = /^[A-Za-z]*[ A-Za-z ]+$/;
        nameField.parentNode.classList = '';
        nameField.addEventListener('keyup', e => {
                validate(nameField, nameHint, regex, e);
            },);
        document.addEventListener('submit', e => {
                validate(nameField, nameHint, regex, e);
            },);
    }

    function checkEmail () {
        const email = document.getElementById('email');
        const emailHint = document.getElementById('email-hint');
        const regex = /^[^@\.]+@[^@\.]+\.[a-z]+$/;
            email.addEventListener('keyup', e => {
                validate(email, emailHint, regex, e);
            });
            document.addEventListener('submit', e => {
                validate(email, emailHint, regex, e)
            })
        }

        function validateCcInfo(field, hint, regex) {
            document.addEventListener('submit', e => {
                if (paymentType.value === 'credit-card') {
                    validate(field, hint, regex, e);
                }
            },);
        }
        
        function checkCreditCard () {
            const ccNum = document.getElementById('cc-num');
            const ccHint = document.getElementById('cc-hint');
            const regex = /^\d{13,16}$/;
                validateCcInfo(ccNum, ccHint, regex);
        }
        
        function checkZip() {
            const zip = document.getElementById('zip');
            const zipHint = document.getElementById('zip-hint');
            const regex = /^\d{5}$/;
            validateCcInfo(zip, zipHint, regex);
        }
        
        function checkCVV() {
            const cvv = document.getElementById('cvv');
            const cvvHint = document.getElementById('cvv-hint');
            const regex = /^\d{3}$/;
            validateCcInfo(cvv, cvvHint, regex);
        }
        

        
    function checkActivities() {
        const activities = document.querySelectorAll('#activities [type="checkbox"]');
        const activity = document.querySelector('#activities [type="checkbox"]');
        const activitiesHint = document.getElementById('activities-hint');
        let count = 0;
        document.addEventListener('change', e => {
            const target = e.target;
            const targetTime = target.dataset.dayAndTime;
            activities.forEach((element) => {
                if(element.dataset.dayAndTime === targetTime) {
                    console.log(element.name)
                    console.log(target.name)
                    if(element.name != target.name) {
                        if(target.checked) {
                            element.parentNode.classList.add('disabled');
                            element.setAttribute('disabled', true);
                        } else {
                            element.parentNode.classList.remove('disabled');
                            element.removeAttribute('disabled');
                        }
                    }
                }
                if (e.target.checked) {
                    count ++;
                    
                } else {
                    count --;
                }
            })
        });
        document.addEventListener('submit', e => {
            if (count === 0) {
                e.preventDefault()
                activitiesHint.style.display = 'block';
                activity.parentNode.parentNode.parentNode.className += ' not-valid';
                activity.parentNode.parentNode.parentNode.classList.remove('valid');
            } else {
                activitiesHint.style.display = 'none';
                activity.parentNode.parentNode.parentNode.className += ' valid';
                activity.parentNode.parentNode.parentNode.classList.remove('not-valid');


            }
        });
    }

    function addFocus() {
        const checkBox = document.querySelectorAll('#activities [type="checkbox"]');
        checkBox.forEach((element) => {
            element.addEventListener('focus', e => {
                element.parentNode.classList += 'focus';
            })
            element.addEventListener('blur', e => {
                element.parentNode.classList -= 'focus';
            })
        })
    }


    function formValidation () {
        checkName();
        checkCreditCard();
        checkZip();
        checkCVV();
        checkEmail();
        checkActivities()
    }

    focusName();
    otherJobRole();
    shirtColor();
    totalCost();
    payment();
    addFocus ();
    formValidation();
}

validateForm();