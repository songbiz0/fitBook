$('#rangestart').calendar({
    monthFirst: false,
    formatter: {
        date: function (date, settings) {
            if (!date) return '';
            var day = date.getDate();
            var formatDay = day < 10 ? '0' + day : day;
            var month = date.getMonth() + 1;
            var formatMonth = month < 10 ? '0' + month : month;
            var year = date.getFullYear();
            return year + '-' + formatMonth + '-' + formatDay;
        }
    },
    type: 'date',
    endCalendar: $('#rangeend')
});

$('#rangeend').calendar({
    monthFirst: false,
    formatter: {
        date: function (date, settings) {
            if (!date) return '';
            var day = date.getDate();
            var formatDay = day < 10 ? '0' + day : day;
            var month = date.getMonth() + 1;
            var formatMonth = month < 10 ? '0' + month : month;
            var year = date.getFullYear();
            return year + '-' + formatMonth + '-' + formatDay;
        }
    },
    type: 'date',
    startCalendar: $('#rangestart')
});

$('.ui.accordion').accordion();

const addShipBtnElem = document.querySelector('#addShipBtn');
if (addShipBtnElem) {
    addShipBtnElem.addEventListener('click', () => {
        $('.ui.modal')
            .modal('show')
        ;
    })
}

$('.coupled.modal')
    .modal({
        allowMultiple: true
    })
;

const shipManageBtnElem = document.querySelector('#shipManageBtn');
if (shipManageBtnElem) {
    shipManageBtnElem.addEventListener('click', e => {
        e.preventDefault();
        $('.first.modal')
            .modal('show')
        ;
    });
}

// open second modal on first modal buttons
$('.second.modal')
    .modal('attach events', '.first.modal #addShipBtn2')
;