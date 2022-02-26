{
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


    const dateBtnsElem = document.querySelector('#dateBtns');

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


    const fstDateElem = document.querySelector('#fst-date');
    const secDateElem = document.querySelector('#sec-date');
    const orderSearchBtnElem = document.querySelector('#orderSearchBtn');
    const searchPagination = document.querySelector('.pagination');
    const statusElem = document.querySelector('#status');
    const searchElem = document.querySelector('#search');
    const selectElem = document.querySelector('#select');
    let orderUrl = `/ajax/admin/order?`;
    let maxUrl = `/ajax/admin/orderMaxPage?`;

    let fstDate;
    let secDate;
    let status;
    let search;
    let select;

    let pageCnt = 2;
    let startIdx = 0;
    let rowCnt = 1;
    let currentPage = 1;

    const makePage = (maxPage) => {
        searchPagination.innerHTML = '';

        let pop = Math.ceil(currentPage / pageCnt);
        startIdx = (currentPage - 1) * rowCnt;
        let lastPage = pop * pageCnt;
        let startPage = lastPage - (pageCnt - 1);

        const span1 = document.createElement('a');
        let click_status1;
        if(currentPage === 1 || maxPage === 0) { click_status1 = 'disabled'; }
        span1.classList.add(click_status1);
        span1.classList.add('item');
        span1.innerHTML = `<i class="angle left icon mr0"></i>`;
        span1.addEventListener('click', () => {
            currentPage = currentPage === 1 ? 1 : (currentPage - 1);
            makePage();
            getList();
        });
        searchPagination.appendChild(span1);

        for(let i=startPage; i<=(lastPage < maxPage ? lastPage : maxPage); i++) {
            const aElem = document.createElement('a');
            let click_status;
            if(currentPage === i) { click_status = 'active'; }
            aElem.classList.add(click_status);
            aElem.classList.add('item');
            aElem.innerText = i;
            aElem.addEventListener('click', () => {
                currentPage = i;
                makePage();
                getList();
            });
            searchPagination.appendChild(aElem);
        }
        const span2 = document.createElement('a');
        let click_status2;
        if(currentPage === maxPage || maxPage === 0) { click_status2 = 'disabled'; }
        span2.classList.add(click_status2);
        span2.classList.add('item');
        span2.innerHTML = `<i class="angle right icon mr0"></i>`;
        span2.addEventListener('click', () => {
            currentPage = currentPage === maxPage ? maxPage : (currentPage + 1);
            makePage();
            getList();
        });
        searchPagination.appendChild(span2);
    }

    const getMaxPage = () => {
        fetch(makeUrl(true))
            .then(res => res.json())
            .then(data => {
                makePage(data.result);
            })
            .catch(e => {
                console.error(e);
            });
    }

    const setList = (list) => {
        const tBodyElem = document.querySelector('#tbody');
        tBodyElem.innerHTML = '';
        list.forEach(item => {
            const trElem = document.createElement('tr');
            let cnt = '';
            if(item.cnt != 0) {
                cnt = '외 ' + item.cnt + '건'
            }
            trElem.innerHTML = `
                <td>${item.rdt}/${item.iorder}</td>
                <td>${item.productNm} ${cnt}</td>
                <td>${item.quantity}</td>
                <td>${item.uid}/${item.userNm}</td>
                <td>${item.spent_point}</td>
                <td>${item.payment_way}</td>
                <td>${item.order_status}</td>
                <td>${item.result_price}</td>
                <td>${item.cdt}</td>
            `;
            tBodyElem.appendChild(trElem);
        });
    }

    const getList = () => {
        console.log(makeUrl());
        fetch(makeUrl())
            .then(res => res.json())
            .then(data => {
                getMaxPage();
                setList(data);
            })
            .catch(e => {
                console.error(e);
            });
    }

    const changeStatus = () => {
        let statusArr = document.querySelector('#status');
        let result = statusArr.value;
        // statusArr.forEach(item => {
        //     if(item.checked == true) {
        //         result = item.value;
        //     }
        // });
        return result;
    }

    const makeUrl = (isMax) => {
        fstDate = fstDateElem.value;
        secDate = secDateElem.value;
        search = searchElem.value;
        select = selectElem.value;
        status = changeStatus();
        let resultUrl = orderUrl;
        let queryString = `startIdx=${startIdx}&rowCnt=${rowCnt}&fstDate=${fstDate}&secDate=${secDate}&status=${status}&search=${search}&select=${select}`;
        if(isMax) {
            resultUrl = maxUrl;
        }
        resultUrl = resultUrl + queryString;
        return resultUrl;
    }
    orderSearchBtnElem.addEventListener('click', () => {
        getList();
    });
    statusElem.addEventListener('change', () => {
        getList();
    });
    searchElem.addEventListener('keyup', () => {
        getList();
    });


    getList();
}