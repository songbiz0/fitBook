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
;

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


const todayBtnElem = document.querySelector('#todayBtn');
const weekBtnElem = document.querySelector('#weekBtn');
const fifteenDayBtnElem = document.querySelector('#fifteenDayBtn');
const monthBtnElem = document.querySelector('#monthBtn');
const threeMonthBtnElem = document.querySelector('#threeMonthBtn');
const yearBtnElem = document.querySelector('#yearBtn');
const rangestartElem = document.querySelector('#rangestart');
const rangeendElem = document.querySelector('#rangeend');
const rangestartInput = rangestartElem.querySelector('input');
const rangeendInput = rangeendElem.querySelector('input');

const orderSearchBtnElem = document.querySelector('#orderSearchBtn');

const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDate();

const getNowDate = () => {
    rangeendInput.value = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0];
}

const makeActive = item => {
    item.classList.remove('link');
    item.classList.add('active');
}

const makeLink = item => {
    item.classList.remove('active');
    item.classList.add('link');
}

if (rangeendInput && rangestartInput) {
    rangestartInput.value = new Date(+new Date(year, month, day - 7) + 3240 * 10000).toISOString().split("T")[0];
    getNowDate();
}

const makeDateBtn = (btnElem, date) => {
    btnElem.addEventListener('click', () => {
        if (btnElem.classList.contains('active')) {
            return;
        }
        rangestartInput.value = new Date(+date + 3240 * 10000).toISOString().split("T")[0];
        document.querySelectorAll('.active').forEach(item => {
            makeLink(item);
        });
        makeActive(btnElem);
    });
}

if (todayBtnElem) {
    makeDateBtn(todayBtnElem, new Date());
}

if (weekBtnElem) {
    makeDateBtn(weekBtnElem, new Date(year, month, day - 7));
}

if (fifteenDayBtnElem) {
    makeDateBtn(fifteenDayBtnElem, new Date(year, month, day - 15));
}

if (monthBtnElem) {
    makeDateBtn(monthBtnElem, new Date(year, month - 1, day));
}

if (threeMonthBtnElem) {
    makeDateBtn(threeMonthBtnElem, new Date(year, month - 3, day));
}

if (yearBtnElem) {
    makeDateBtn(yearBtnElem, new Date(year - 1, month, day));
}

const recordCount = 10;
let currentPage = 1;
let maxPage = 1;
let getMaxPageOnce = false;

const getMaxPage = () => {
    fetch('/mypage/api/maxpage', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        fromDate: rangestartInput.value,
        toDate: rangeendInput.value,
        recordCount
    })
}).then(res => res.json())
    .then(data => {
        maxPage = data.result;
        makePage();
    })
    .catch(err => { console.error(  err); });
}

const searchPaginationElem = document.querySelector('#searchPagination');

const makePage = () => {
    searchPaginationElem.innerHTML = '';

    const a1 = document.createElement('a');
    if(currentPage <= 10) {
        a1.classList.add('disabled');
    }
    a1.classList.add('item');
    a1.innerHTML = `<i class="angle left icon mr0"></i>`;

    a1.addEventListener('click', () => {
        if(a1.classList.contains('disabled')) {
            return;
        }
        currentPage = currentPage - (currentPage % 10 === 0 ? 10 : currentPage % 10);
        loadOrderlist();
    });

    searchPaginationElem.appendChild(a1);

    const startPage = currentPage - (currentPage % 10 === 0 ?  10 : currentPage % 10) + 1;
    const lastPage = Math.min(maxPage, startPage + 9);

    for(let i=startPage; i<=lastPage; i++) {
        const a2 = document.createElement('a');
        if(currentPage === i) {
            a2.classList.add('active');
        }
        a2.classList.add('item');
        a2.innerText = i;

        a2.addEventListener('click', () => {
            if(a2.classList.contains('active')) {
                return;
            }
            currentPage = Number(a2.innerText);
            loadOrderlist();
        });

        searchPaginationElem.appendChild(a2);
    }

    const a3 = document.createElement('a');
    if(currentPage > Math.floor(maxPage / 10) * 10) {
        a3.classList.add('disabled');
    }
    a3.classList.add('item');
    a3.innerHTML = `<i class="angle right icon mr0"></i>`;

    a3.addEventListener('click', () => {
        if(a3.classList.contains('disabled')) {
            return;
        }
        currentPage = currentPage - (currentPage % 10 === 0 ? 10 : currentPage % 10) + 11;
        loadOrderlist();
    });

    searchPaginationElem.appendChild(a3);
}

const loadOrderlist = () => {
    fetch('/mypage/api/orderlist', {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            fromDate: rangestartInput.value,
            toDate: rangeendInput.value,
            recordCount,
            currentPage
        })
    }).then(res => res.json())
        .then(data => {
            makeOrderList(data);
            getMaxPage();
        })
        .catch(err => {
            console.error(err);
        });
}

if (orderSearchBtnElem) {
    orderSearchBtnElem.addEventListener('click', () => {
        currentPage = 1;
        loadOrderlist();
    });
    orderSearchBtnElem.click();
}

const orderListTbodyElem = document.querySelector('#orderListTbody');

const makeOrderList = list => {
    orderListTbodyElem.innerHTML = '';
    list.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML =
            `<td rowspan=${item.productDetails.length} class="btline">
                <div>
                    <div>${item.iorder}</div>
                    <div>${item.rdt}</div>
                </div>
            </td>`

        for (let i = 0; i < item.productDetails.length; i++) {
            if (i === 0) {
                makeProductDetailList(tr, item.productDetails[i], item);
                orderListTbodyElem.appendChild(tr);
                if (item.productDetails.length === 1) {
                    tr.classList.add('btline');
                }
            } else {
                const tr2 = document.createElement('tr');
                makeProductDetailList(tr2, item.productDetails[i], item);
                orderListTbodyElem.appendChild(tr2);
                if (i === item.productDetails.length - 1) {
                    tr2.classList.add('btline');
                }
            }
        }
    });
}

const makeProductDetailList = (trElem, productDetailItem, orderItem) => {
    const td = document.createElement('td');
    td.innerHTML =
        `<div class="frow w100p ct gap20">
                    <img src="${productDetailItem.img}" width="100px" height="100px">
                    <div class="taleft minw130">
                        <div class="mb5">${productDetailItem.nm}</div>
                        <div class="mb5">${productDetailItem.product_code}</div>
                        <div class="c777777">
                            옵션 : ${productDetailItem.option}
                        </div>
                    </div>
                </div>`
    trElem.appendChild(td);

    const td2 = document.createElement('td');
    td2.innerHTML =
        `<div>
                    <div class="mb5"><b>${productDetailItem.price}원</b></div>
                    <div>(${productDetailItem.quantity})</div>
                </div>`
    trElem.appendChild(td2);

    const td3 = document.createElement('td');
    td3.innerHTML =
        `<div>
                    <div>${orderItem.order_status}</div>
                </div>`
    trElem.appendChild(td3);

    const td4 = document.createElement('td');
    td4.innerHTML =
        `<div>
                    <button class="ui secondary mini button">후기 작성</button>
                </div>`
    trElem.appendChild(td4);
}