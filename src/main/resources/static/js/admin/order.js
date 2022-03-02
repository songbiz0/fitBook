// Order List
{
    const selectKindsElem = document.querySelector('.selectkinds');
    if(selectKindsElem) {
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

        let pageCnt = 10;
        let startIdx = 0;
        let rowCnt = 10;
        let currentPage = 1;

        const makePage = (maxPage) => {
            searchPagination.innerHTML = '';

            let pop = Math.ceil(currentPage / pageCnt);
            startIdx = (currentPage - 1) * rowCnt;
            let lastPage = pop * pageCnt;
            let startPage = lastPage - (pageCnt - 1);

            const span1 = document.createElement('a');
            let click_status1;
            if (currentPage === 1 || maxPage === 0) {
                click_status1 = 'disabled';
            }
            span1.classList.add(click_status1);
            span1.classList.add('item');
            span1.innerHTML = `<i class="angle left icon mr0"></i>`;
            span1.addEventListener('click', () => {
                currentPage = ((currentPage - pageCnt) < pageCnt) ? 1 : (currentPage - pageCnt);
                makePage();
                getList();
            });
            searchPagination.appendChild(span1);

            for (let i = startPage; i <= (lastPage < maxPage ? lastPage : maxPage); i++) {
                const aElem = document.createElement('a');
                let click_status;
                if (currentPage === i) {
                    click_status = 'active';
                }
                aElem.classList.add(click_status);
                aElem.classList.add('item');
                aElem.innerText = i;
                if (currentPage != i) {
                    aElem.addEventListener('click', () => {

                        currentPage = i;

                        makePage();
                        getList();
                    });
                }
                searchPagination.appendChild(aElem);
            }
            const span2 = document.createElement('a');
            let click_status2;
            if (currentPage === maxPage || maxPage === 0) {
                click_status2 = 'disabled';
            }
            span2.classList.add(click_status2);
            span2.classList.add('item');
            span2.innerHTML = `<i class="angle right icon mr0"></i>`;
            span2.addEventListener('click', () => {
                currentPage = ((currentPage + pageCnt) > maxPage) ? maxPage : currentPage + pageCnt;
                makePage();
                getList();
            });
            searchPagination.appendChild(span2);
        }

        const getMaxPage = () => {
            fetch(makeUrl(true))
                .then(res => res.json())
                .then(data => {
                    console.log(data.result);
                    makePage(data.result);
                })
                .catch(e => {
                    console.error(e);
                });
        }

        const setList = (list) => {
            const tBodyElem = document.querySelector('#tbody');
            tBodyElem.innerHTML = '';
            if(list.length > 0) {
                list.forEach(item => {
                    const trElem = document.createElement('tr');
                    trElem.addEventListener('click', () => {
                        location.href = '/admin/orderdetail?iorder=' + item.iorder;
                    });
                    trElem.classList.add('cspointer');
                    let cnt = '';
                    if (item.cnt != 0) {
                        cnt = '외 ' + item.cnt + '건'
                    }
                    trElem.innerHTML = `
                        <td>
                            <p class="mb5">${item.rdt}</p>
                            <p>${item.iorder}</p>
                        </td>
                        <td class="frow w100p ct gap20">
                            <div><img class="custom-img" src="/imgPath/products/detail/${item.idetail}/${item.img}"></div>
                            <div class="taleft minw130">
                                <p class="mb5">${item.productNm} ${cnt}</p>
                                <p class="mb5">${item.product_code}</p>
                                <div>
                                    <span class="c777777">
                                        옵션 : ${item.color} / HDD ${item.hdd} GB / SSD ${item.ssd} GB
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="mb5">${item.uid}</p>
                            <p>${item.userNm}</p>
                        </td>
                        <td>${item.spent_point}</td>
                        <td>${item.payment_way}</td>
                        <td>${item.order_status}</td>
                        <td>${item.result_price}</td>
                        <td>${item.cdt}</td>
                    `;
                    tBodyElem.appendChild(trElem);
                });
            } else {
                const tdElem = document.createElement('td');
                tdElem.colSpan = 8;
                tdElem.innerHTML = '<h4>주문이 없습니다.</h4>';
                tBodyElem.appendChild(tdElem);
            }
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
            if (isMax) {
                resultUrl = maxUrl;
            }
            resultUrl = resultUrl + queryString;
            return resultUrl;
        }
        orderSearchBtnElem.addEventListener('click', () => {
            currentPage = 1;
            startIdx = 0;
            getList();
        });
        statusElem.addEventListener('change', () => {
            currentPage = 1;
            startIdx = 0;
            getList();
        });
        searchElem.addEventListener('keyup', () => {
            currentPage = 1;
            startIdx = 0;
            getList();
        });


        getList();
    }
}

// Order Detail
{
    const orderDetailElem = document.querySelector('.order-detail');
    if(orderDetailElem) {
        const dataElem = document.querySelector('#data');
        const initSelectElem = document.querySelector('.init-select');
        const saveBtnElem = document.querySelector('#saveBtn');
        const iorder = dataElem.dataset.iorder;
        const initVal = initSelectElem.value;
        let selectVal = initSelectElem.value;
        const makeToast = (msg) => {
            $('body')
                .toast({
                    class: 'success',
                    message: msg
                })
            ;
        }
        initSelectElem.addEventListener('change', () => {
            selectVal = initSelectElem.value;
            saveBtnElem.classList.remove('dis-none');
            if(initVal === selectVal) {
                saveBtnElem.classList.add('dis-none');
            }
        });
        saveBtnElem.addEventListener('click', () => {
            const url = '/ajax/admin/updorderstatus';
            const param = {
                iorder : iorder,
                order_status : selectVal
            }
            fetch(url, {
                method : 'put',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(param)
            })
                .then(res => res.json())
                .then(data => {
                    if(data.result === 1) {
                        initSelectElem.value = selectVal;
                        makeToast('주문상태 수정을 완료했어요.');
                        setTimeout(function() {
                            location.href = '/admin/orderdetail?iorder=' + iorder;
                        }, 1000);
                    } else {
                        initSelectElem.value = initVal;
                    }
                    saveBtnElem.classList.add('dis-none');
                })
                .catch(e => {
                    console.error(e);
                });
        });
    }
}