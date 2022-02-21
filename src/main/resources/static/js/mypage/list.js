const makeErrorToast = msg => {
    $(document).ready(() => {
            $('body').toast({
                class: 'error',
                message: msg
            });
        }
    );
}

const makeInfoToast = msg => {
    $(document).ready(() => {
            $('body').toast({
                class: 'info',
                message: msg
            });
        }
    );
}

const todayBtnElem = document.querySelector('#todayBtn');
const weekBtnElem = document.querySelector('#weekBtn');
const fifteenDayBtnElem = document.querySelector('#fifteenDayBtn');
const monthBtnElem = document.querySelector('#monthBtn');
const threeMonthBtnElem = document.querySelector('#threeMonthBtn');
const yearBtnElem = document.querySelector('#yearBtn');
const rangestartElem = document.querySelector('#rangestart');
const rangeendElem = document.querySelector('#rangeend');
let rangestartInput = null;
if (rangestartElem) {
    rangestartInput = rangestartElem.querySelector('input');
}
let rangeendInput = null;
if (rangeendElem) {
    rangeendInput = rangeendElem.querySelector('input');
}

const orderSearchBtnElem = document.querySelector('#orderSearchBtn');
const dateBtnsElem = document.querySelector('#dateBtns');

const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDate();

const dataSetElem = document.querySelector('#dataSet');
const dataType = dataSetElem.dataset.datatype;
console.log(dataType);

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
        dateBtnsElem.querySelectorAll('.active').forEach(item => {
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

const getMaxPage = () => {
    fetch('/mypage/api/maxpage', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            fromDate: rangestartInput.value,
            toDate: rangeendInput.value,
            recordCount,
            param: dataType
        })
    }).then(res => res.json())
        .then(data => {
            maxPage = Math.max(data.result, 1);
            makePage();
        })
        .catch(err => {
            console.error(err);
        });
}

const searchPaginationElem = document.querySelector('#searchPagination');

const makePage = () => {
    searchPaginationElem.innerHTML = '';

    const a1 = document.createElement('a');
    if (currentPage <= 10) {
        a1.classList.add('disabled');
    }
    a1.classList.add('item');
    a1.innerHTML = `<i class="angle left icon mr0"></i>`;

    a1.addEventListener('click', () => {
        if (a1.classList.contains('disabled')) {
            return;
        }
        currentPage = currentPage - (currentPage % 10 === 0 ? 10 : currentPage % 10);
        loadOrderlist();
    });

    searchPaginationElem.appendChild(a1);

    const startPage = currentPage - (currentPage % 10 === 0 ? 10 : currentPage % 10) + 1;
    const lastPage = Math.min(maxPage, startPage + 9);

    for (let i = startPage; i <= lastPage; i++) {
        const a2 = document.createElement('a');
        if (currentPage === i) {
            a2.classList.add('active');
        }
        a2.classList.add('item');
        a2.innerText = i;

        a2.addEventListener('click', () => {
            if (a2.classList.contains('active')) {
                return;
            }
            currentPage = Number(a2.innerText);
            loadOrderlist();
        });

        searchPaginationElem.appendChild(a2);
    }

    const a3 = document.createElement('a');
    if (currentPage > Math.floor(maxPage / 10) * 10) {
        a3.classList.add('disabled');
    }
    a3.classList.add('item');
    a3.innerHTML = `<i class="angle right icon mr0"></i>`;

    a3.addEventListener('click', () => {
        if (a3.classList.contains('disabled')) {
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
            currentPage,
            param: dataType
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

    if (list.length === 0) {
        const tr = document.createElement('tr');
        if (dataType === 'order') {
            tr.innerHTML =
                `<td rowspan="1" colspan="5" class="btline h100">주문 내역이 없습니다.</td>`
        } else if (dataType === 'cancel') {
            tr.innerHTML =
                `<td rowspan="1" colspan="5" class="btline h100">취소/반품 내역이 없습니다.</td>`
        }
        orderListTbodyElem.appendChild(tr);
    }

    list.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML =
            `<td rowspan=${item.productDetails.length} class="btline">
                <div>
                    <div>${item.iorder}</div>
                    <div>${item.rdt}</div>
                </div>
            </td>`

        let td = null;
        if (item.order_status !== '구매확정' && dataType === 'order') {
            td = document.createElement('td');
            td.setAttribute('rowspan', item.productDetails.length);
            td.classList.add('btline');
            td.classList.add('h100p');

            if (item.order_status === '입금대기' || item.order_status === '결제완료') {
                const btn = document.createElement('button');
                btn.className = 'ui basic mini button';
                btn.innerText = '주문 취소';
                btn.addEventListener('click', () => {
                    if(confirm('주문을 취소하시겠습니까?')) {
                        fetch('/mypage/api/orderchange', {
                            method: 'post',
                            headers: {'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                iorder: item.iorder,
                                order_status: '취소완료',
                                param: 'orderChange'
                            })
                        }).then(res => res.json())
                            .then(data => {
                                if(data.result === 0) {
                                    makeErrorToast('주문 취소에 실패했어요.');
                                } else {
                                    loadOrderlist();
                                    makeInfoToast('주문을 취소했어요.');
                                }
                            })
                            .catch(err => console.error(err));
                    }
                });
                td.appendChild(document.createElement('div')).appendChild(btn);
            } else if (item.order_status === '배송중') {
                refundBtnEvent(item, td);
            } else if (item.order_status === '배송완료') {
                refundBtnEvent(item, td);
                const btn = document.createElement('button');
                btn.className = 'ui secondary mini button';
                btn.innerText = '구매 확정';
                btn.addEventListener('click', () => {
                    if(confirm('상품을 구매 확정하시겠습니까?')) {
                        fetch('/mypage/api/orderchange', {
                            method: 'post',
                            headers: {'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                iorder: item.iorder,
                                order_status: '구매확정',
                                param: 'confirmOrder'
                            })
                        }).then(res => res.json())
                            .then(data => {
                                if(data.result === 0) {
                                    makeErrorToast('구매 확정에 실패했어요.');
                                } else {
                                    loadOrderlist();
                                    makeInfoToast('상품을 구매 확정했어요.');
                                }
                            })
                            .catch(err => console.error(err));
                    }
                });
                td.appendChild(document.createElement('div')).appendChild(btn);
            } else if (item.order_status === '환불신청') {
                const btn = document.createElement('button');
                btn.className = 'ui basic mini button';
                btn.innerText = '환불 취소';
                btn.addEventListener('click', () => {
                    if(confirm('환불 신청을 취소하시겠습니까?')) {
                        fetch('/mypage/api/orderchange', {
                            method: 'post',
                            headers: {'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                iorder: item.iorder,
                                order_status: item.pre_order_status,
                                param: 'refundCancel'
                            })
                        }).then(res => res.json())
                            .then(data => {
                                if(data.result === 0) {
                                    makeErrorToast('환불 신청 취소에 실패했어요.');
                                } else {
                                    loadOrderlist();
                                    makeInfoToast('환불 신청을 취소했어요.');
                                }
                            })
                            .catch(err => console.error(err));
                    }
                });
                td.appendChild(document.createElement('div')).appendChild(btn);
            }
        }

        const orderConfirmed = item.order_status === '구매확정';
        for (let i = 0; i < item.productDetails.length; i++) {
            if (i === 0) {
                makeProductDetailList(tr, item.productDetails[i], item, orderConfirmed);
                orderListTbodyElem.appendChild(tr);
                if (item.productDetails.length === 1) {
                    tr.classList.add('btline');
                }
                if (td !== null) {
                    tr.appendChild(td);
                }
            } else {
                const tr2 = document.createElement('tr');
                makeProductDetailList(tr2, item.productDetails[i], item, orderConfirmed);
                orderListTbodyElem.appendChild(tr2);
                if (i === item.productDetails.length - 1) {
                    tr2.classList.add('btline');
                }
                if (td !== null) {
                    tr.appendChild(td);
                }
            }
        }
    });
}

const makeProductDetailList = (trElem, productDetailItem, orderItem, orderConfirmed) => {
    const td = document.createElement('td');
    td.innerHTML =
        `<div class="frow w100p ct gap20">
                    <img src="${productDetailItem.img}" width="100px" height="100px">
                    <div class="taleft minw130">
                        <div class="mb5">${productDetailItem.brand} ${productDetailItem.nm}</div>
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

    if (orderConfirmed) {
        const td4 = document.querySelector('td');
        td4.innerHTML =
            `<div>
                    <button class="ui secondary mini button" id="writeReviewBtn">후기 작성</button>
                </div>`
        trElem.appendChild(td4);
    }
}

const refundBtnEvent = (itemElem, tdElem) => {
    const btn = document.createElement('button');
    btn.className = 'ui basic mini button';
    btn.innerText = '환불 신청';
    btn.addEventListener('click', () => {
        if(confirm('환불을 신청하시겠습니까?')) {
            fetch('/mypage/api/orderchange', {
                method: 'post',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({
                    iorder: itemElem.iorder,
                    order_status: '환불신청',
                    pre_order_status: itemElem.order_status,
                    param: 'refund'
                })
            }).then(res => res.json())
                .then(data => {
                    if(data.result === 0) {
                        makeErrorToast('환불 신청에 실패했어요.');
                    } else {
                        loadOrderlist();
                        makeInfoToast('환불 신청이 완료됐어요.');
                    }
                })
                .catch(err => console.error(err));
        }
    });
    tdElem.appendChild(document.createElement('div')).appendChild(btn);
}