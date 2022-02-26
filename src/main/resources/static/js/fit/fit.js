const dropdown = $('.ui.dropdown');
dropdown.dropdown({
    maxSelections: 5,
    fullTextSearch: true
});

const numRegex = /^[0-9]+$/;

$(() => {
    $('.q0').transition('fade up');

    fetch('/fit/api/programlist')
        .then(res => res.json())
        .then(data => {
            const menuElem = document.querySelector('.menu');
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'item';
                div.dataset.value = item.iprogram;
                div.innerHTML =
                    `<img src="/imgPath/program/${item.iprogram}/${item.img}">
                     ${item.nm}`
                menuElem.appendChild(div);
            });
        }).catch(err => { console.error(err); });
});

$('#startBtn').on('click', () => {
    $('.q0').transition('hide');
    $('.q1').transition('fade up');
});

const budgetInputElem = $('#budgetInput');
$('#q1NextBtn').on('click', () => {
    if(!numRegex.test(budgetInputElem.val())) {
        makeErrorToast('숫자만 입력할 수 있어요.');
        budgetInputElem.focus();
    } else {
        budget = budgetInputElem.val();
        $('.q1').transition('hide');
        $('.q2').transition('fade up');
    }
});

budgetInputElem.keypress(e => {
    if(e.which === 13) {
        $('#q1NextBtn').click();
    }
});

$('.rewBtn').on('click', () => {
    window.location.reload();
});

$('.q2NextBtn').on('click', () => {
    $('.q2').transition('hide');
    $('.q3').transition('fade up');
});

$('.q3NextBtn').on('click', () => {
    $('.q3').transition('hide');
    $('.q4').transition('fade up');
});

$('.q4NextBtn').on('click', () => {
    $('.q4').transition('hide');
    $('.q5').transition('fade up');
});

$('.q5NextBtn').on('click', () => {
    $('.q5').transition('hide');
    $('.q6').transition('fade up');
});

$('.q6NextBtn').on('click', () => {
    $('.q6').transition('hide');
    $('.q7').transition('fade up');
});

$('#q7NextBtn').on('click', () => {
    twoinone = $('#twoinoneChk').checkbox('is checked');
    macbook = $('#macbookChk').checkbox('is checked');
    highhz = $('#highhzChk').checkbox('is checked');
    highresolution = $('#highresolutionChk').checkbox('is checked');

    $('.q7').transition('hide');
    $('.ql').transition('fade up');
});

$('#qlNextBtn').on('click', () => {
    programs = dropdown.dropdown('get value');
    $('.ql').transition('hide');
    $('.result').transition('fade up');
});

let budget = 0;
let weight = 0;
let size = 0;
let os = 0;
let as = 0;
let battery = 0;
let twoinone = false;
let macbook = false;
let highhz = false;
let highresolution = false;
let programs = null;

$('.weight0').on('click', () => {
    weight = 0;
});
$('.weight1').on('click', () => {
    weight = 1;
});
$('.weight2').on('click', () => {
    weight = 2;
});

$('.size0').on('click', () => {
    size = 0;
});
$('.size1').on('click', () => {
    size = 1;
});
$('.size2').on('click', () => {
    size = 2;
});

$('.os0').on('click', () => {
    os = 0;
});
$('.os1').on('click', () => {
    os = 1;
});
$('.os2').on('click', () => {
    os = 2;
});

$('.as0').on('click', () => {
    as = 0;
});
$('.as1').on('click', () => {
    as = 1;
});

$('.bt0').on('click', () => {
    battery = 0;
});
$('.bt1').on('click', () => {
    battery = 1;
});

$('#saveBtn').on('click', () => {
    console.log('budget : ' + budget);
    console.log('weight : ' + weight);
    console.log('size : ' + size);
    console.log('os : ' + os);
    console.log('as : ' + as);
    console.log('battery : ' + battery);
    console.log('twoinone : ' + twoinone);
    console.log('macbook : ' + macbook);
    console.log('highhz : ' + highhz);
    console.log('highresolution : ' + highresolution);
    console.log('programs : ' + programs);
});