const submitBtn = document.querySelector('.icon');
const inputs = document.querySelectorAll('input');
let dateType;
let dateObj = {};
let age;

for (let input of inputs) {
    input.addEventListener('focus', () => {
        input.classList.add('targeted');
        input.nextElementSibling.innerHTML = '';
        input.previousElementSibling.style.color = '#716F6F';
        input.style.border = '1px solid #854DFF';

    });
    input.addEventListener('blur', () => {
        input.classList.remove('targeted');
    });
};

function errorFormatting(input) {
    input.style.border = '1px solid #FF5959';
    input.previousElementSibling.style.color = '#FF5959';
}

submitBtn.addEventListener('click', () => {

    for (let input of inputs) {
        dateType = input.parentElement.dataset.id;
        inputValue = parseInt(input.value);

        const today = new Date();

        if (!inputValue) {
            input.nextElementSibling.innerHTML = 'This field is required';
            errorFormatting(input);
        } else if (dateType == 'day' && (inputValue < 1 || inputValue > 31)) {
            input.nextElementSibling.innerHTML = 'Must be a valid day';
            errorFormatting(input);
        } else if (dateType == 'month' && (inputValue < 1 || inputValue > 12)) {
            input.nextElementSibling.innerHTML = 'Must be a valid month';
            errorFormatting(input);
        } else if (dateType == 'year' && inputValue > today.getFullYear()) {
            input.nextElementSibling.innerHTML = 'Must be in the past';
            errorFormatting(input);
        } else {
            dateObj[dateType] = inputValue;
        }
    }

    

    if (Object.keys(dateObj).length === 3) {
        const date = moment(`${dateObj.year}-${dateObj.month}-${dateObj.day}`, 'YYYY-MM-DD');
        const todayDate = moment().format('YYYY-MM-DD');
        if(!date.isValid()) {
            for (let input of inputs) {
                errorFormatting(input);
                document.querySelector('.error-invalid').innerHTML = 'Must be a valid date'
            }
        } else {
            age = moment.duration(date.diff(todayDate));
            document.querySelector('.fig-years').innerText = Math.abs(age.years());
            document.querySelector('.fig-months').innerText = Math.abs(age.months());
            document.querySelector('.fig-days').innerText = Math.abs(age.days());
        }

        if (Math.abs(age.years()) == 1) {
            document.querySelector('.time-years').innerHTML = 'year';
        }
        if (Math.abs(age.months()) == 1) {
            document.querySelector('.time-months').innerHTML = 'month';
        }
        if (Math.abs(age.days()) == 1) {
            document.querySelector('.time-days').innerHTML = 'day';
        }
    };

});

