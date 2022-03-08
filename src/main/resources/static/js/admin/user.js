// 회원 목록 ----------------------------------------------------------------------------------[start]
{
    const userListElem = document.querySelector('.user-list');
    if(userListElem) {
        const iuserTrElemArr = userListElem.querySelectorAll('.iuser-tr');
        const sortElem = userListElem.querySelector('#rdt-sort');
        iuserTrElemArr.forEach(item => {
            item.addEventListener('click', (e) => {
                const trData = e.target.closest('.iuser-tr');
                const iuser = trData.dataset.iuser;
                const url = `/admin/userinfo?iuser=${iuser}`;
                const option = 'with = 500, height = 500, top = 100, left = 200, location = no';
                const name = 'userinfo';
                window.open(url, name, option);
            });
        });

        sortElem.addEventListener('change', () => {
            const selectVal = userListElem.querySelector('#type').value;
            const searchVal = userListElem.querySelector('#search').value;
            const sortVal = sortElem.value;


        });
    }
}

// User Detail
{
    const url = new URL(window.location);
    const iuser = url.searchParams.get('iuser');
    const userDetailElem = document.querySelector('.user-detail');
    if(userDetailElem) {
        const modPointElem = document.querySelector('#modPoint');
        const cancelBtnElem = document.querySelector('#cancelBtn');
        const submitBtnElem = document.querySelector('#submitBtn');

        modPointElem.addEventListener('click', () => {
            $('.ui.modal')
                .modal('show')
            ;
        });

        cancelBtnElem.addEventListener('click', () => {
            $('.ui.modal')
                .modal('hide')
            ;
        });
        submitBtnElem.addEventListener('click', () => {
            const submitElem = document.querySelector('#pointFrm');
            const pointStatusElem = document.querySelector('#point-status');
            const pointValElem = document.querySelector('#pointVal');
            pointValElem.value = pointStatusElem.value + pointValElem.value;
            submitElem.submit();
        });

        // 문의 내역
        {
            let startIdx = 0;
            let currentPage = 1;
            let recordCount = 5;
            let pageCnt = 5;
            if (userDetailElem) {
                const qnaBodyElem = userDetailElem.querySelector('.qna-body');
                const qnaPageElem = userDetailElem.querySelector('.qna-pagination');

                const getMaxPage = (url, elem) => {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => {
                            makePage(data.result, elem);
                        })
                        .catch(e => {
                            console.error(e);
                        });
                }

                const getQuestionList = () => {
                    fetch(`/ajax/admin/userqna?iuser=${iuser}&startIdx=${startIdx}&recordCount=${recordCount}`)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            setQuestionList(data);
                            getMaxPage(`/ajax/admin/qnamaxpage?iuser=${iuser}&recordCount=${recordCount}`, qnaPageElem);
                        })
                        .catch(e => {
                            console.error(e);
                        });
                }
                const setQuestionList = (data) => {
                    qnaBodyElem.innerHTML = '';
                    if(data.length === 0) {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td colspan="4"><strong>문의내역이 없습니다.</strong></td>
                        `;
                        qnaBodyElem.appendChild(tr);
                    }
                    data.forEach(item => {
                        const trElem = document.createElement('tr');
                        trElem.classList.add('cspointer');
                        trElem.addEventListener('click', () => {
                            const url = `/shop/detail?iproduct=${item.iproduct}`;
                            const option = 'with = 500, height = 500, top = 100, left = 200, location = no';
                            const name = 'detail';
                            window.open(url, name, option);
                        });
                        const parent = item.parent === 0 ? 'X' : 'O';
                        const rdt = item.rdt.substr(0, 19);
                        trElem.innerHTML = `
                    <td>
                        <span>${item.productNm} (${item.color})</span>
                    </td>
                    <td>${item.ctnt}</td>
                    <td>${parent}</td>
                    <td>${rdt}</td>
                `;
                        qnaBodyElem.appendChild(trElem);
                    });
                }

                const makePage = (maxPage, pageElem) => {
                    pageElem.innerHTML = '';
                    startIdx = (currentPage - 1) * recordCount;
                    let pop = Math.ceil(currentPage / pageCnt);
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
                        currentPage = (currentPage - pageCnt) < pageCnt ? 1 : (currentPage - pageCnt);
                        makePage(maxPage, pageElem);
                        getQuestionList();
                    });
                    pageElem.appendChild(span1);
                    for (let i = startPage; i <= (lastPage < maxPage ? lastPage : maxPage); i++) {
                        const aElem = document.createElement('a');
                        let click_status;
                        if (currentPage === i) {
                            click_status = 'active';
                        }
                        aElem.classList.add(click_status);
                        aElem.classList.add('item');
                        aElem.innerText = i;
                        aElem.addEventListener('click', () => {
                            currentPage = i;
                            makePage(maxPage, pageElem);
                            getQuestionList();
                        });
                        pageElem.appendChild(aElem);
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
                        currentPage = (currentPage + pageCnt) > maxPage ? maxPage : (currentPage + pageCnt);
                        makePage(maxPage, pageElem);
                        getQuestionList();
                    });
                    pageElem.appendChild(span2);
                }

                getQuestionList();
            }
        }

        // 리뷰내역
        {
            let startIdx = 0;
            let currentPage = 1;
            let recordCount = 5;
            let pageCnt = 5;
            const reviewBodyElem = document.querySelector('.review-body');
            const reviewPageElem = document.querySelector('.review-pagination');

            const getMaxPage = (url, elem) => {
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        makePage(data.result, elem);
                    })
                    .catch(e => {
                        console.error(e);
                    });
            }

            const getReviewList = () => {
                fetch(`/ajax/admin/userreview?iuser=${iuser}&startIdx=${startIdx}&recordCount=${recordCount}`)
                    .then(res => res.json())
                    .then(data => {
                        getMaxPage(`/ajax/admin/reviewmaxpage?iuser=${iuser}&recordCount=${recordCount}`, reviewPageElem);
                        setReviewList(data);
                    })
                    .catch(e => {
                        console.error(e);
                    });
            }
            const setReviewList = (data) => {
                reviewBodyElem.innerHTML = '';
                if(data.length === 0) {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td colspan="4"><strong>리뷰내역이 없습니다.</strong></td>
                    `;
                    reviewBodyElem.appendChild(tr);
                }
                data.forEach(item => {
                    const trElem = document.createElement('tr');
                    trElem.classList.add('cspointer');
                    trElem.addEventListener('click', () => {
                        const url = `/shop/detail?iproduct=${item.iproduct}`;
                        const option = 'with = 500, height = 500, top = 100, left = 200, location = no';
                        const name = 'detail';
                        window.open(url, name, option);
                    });
                    const rdt = item.rdt.substr(0, 19);
                    trElem.innerHTML = `
                    <td>
                        <span>${item.nm}</span>
                        <span>(${item.color})</span>
                    </td>
                    <td>
                        <span>${item.ctnt}</span>
                    </td>
                    <td>
                        <span>${item.rating}</span>
                    </td>
                    <td>
                        <span>${rdt}</span>
                    </td>
                `;
                    reviewBodyElem.appendChild(trElem);
                });
            }

            const makePage = (maxPage, pageElem) => {
                pageElem.innerHTML = '';
                startIdx = (currentPage - 1) * recordCount;
                let pop = Math.ceil(currentPage / pageCnt);
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
                    currentPage = (currentPage - pageCnt) < pageCnt ? 1 : (currentPage - pageCnt);
                    makePage(maxPage, pageElem);
                    getReviewList();
                });
                pageElem.appendChild(span1);
                for (let i = startPage; i <= (lastPage < maxPage ? lastPage : maxPage); i++) {
                    const aElem = document.createElement('a');
                    let click_status;
                    if (currentPage === i) {
                        click_status = 'active';
                    }
                    aElem.classList.add(click_status);
                    aElem.classList.add('item');
                    aElem.innerText = i;
                    aElem.addEventListener('click', () => {
                        currentPage = i;
                        makePage(maxPage, pageElem);
                        getReviewList();
                    });
                    pageElem.appendChild(aElem);
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
                    currentPage = (currentPage + pageCnt) > maxPage ? maxPage : (currentPage + pageCnt);
                    makePage(maxPage, pageElem);
                    getReviewList();
                });
                pageElem.appendChild(span2);
            }


            getReviewList();
        }

        // 주문내역
        {
            let startIdx = 0;
            let currentPage = 1;
            let recordCount = 5;
            let pageCnt = 5;
            const orderBodyElem = document.querySelector('.order-body');
            const orderPageElem = document.querySelector('.order-pagination');


            const getMaxPage = (url, elem) => {
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data.result);
                        makePage(data.result, elem);
                    })
                    .catch(e => {
                        console.error(e);
                    });
            }


            const getOrderList = () => {
                fetch(`/ajax/admin/userorder?iuser=${iuser}&recordCount=${recordCount}&startIdx=${startIdx}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        getMaxPage(`/ajax/admin/ordermaxpage?iuser=${iuser}&recordCount=${recordCount}`, orderPageElem);
                        setOrderList(data);
                    })
                    .catch(e => {
                        console.error(e);
                    });
            }
            const setOrderList = (data) => {
                orderBodyElem.innerHTML = '';
                if(data.length === 0) {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td colspan="7"><strong>주문내역이 없습니다.</strong></td>
                    `;
                    orderBodyElem.appendChild(tr);
                }
                data.forEach(item => {
                    const rdt = item.rdt.substr(0, 19);
                    const trElem = document.createElement('tr');
                    trElem.classList.add('cspointer');
                    trElem.addEventListener('click', () => {
                        const url = `/shop/detail?iproduct=${item.iproduct}`;
                        const option = 'with = 500, height = 500, top = 100, left = 200, location = no';
                        const name = 'product';
                        window.open(url, name, option);
                    });
                    trElem.innerHTML = `
                        <td>${item.iorder}</td>
                        <td>${item.nm}</td>
                        <td>${item.payment_way}</td>
                        <td>${item.spent_point}</td>
                        <td>${item.result_price}</td>
                        <td>${item.order_status}</td>
                        <td>${rdt}</td>
                    `;
                    orderBodyElem.appendChild(trElem);
                });
            }
            const makePage = (maxPage, pageElem) => {
                pageElem.innerHTML = '';
                startIdx = (currentPage - 1) * recordCount;
                let pop = Math.ceil(currentPage / pageCnt);
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
                    currentPage = (currentPage - pageCnt) < pageCnt ? 1 : (currentPage - pageCnt);
                    makePage(maxPage, pageElem);
                    getOrderList();
                });
                pageElem.appendChild(span1);
                for (let i = startPage; i <= (lastPage < maxPage ? lastPage : maxPage); i++) {
                    const aElem = document.createElement('a');
                    let click_status;
                    if (currentPage === i) {
                        click_status = 'active';
                    }
                    aElem.classList.add(click_status);
                    aElem.classList.add('item');
                    aElem.innerText = i;
                    aElem.addEventListener('click', () => {
                        currentPage = i;
                        makePage(maxPage, pageElem);
                        getOrderList();
                    });
                    pageElem.appendChild(aElem);
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
                    currentPage = (currentPage + pageCnt) > maxPage ? maxPage : (currentPage + pageCnt);
                    makePage(maxPage, pageElem);
                    getOrderList();
                });
                pageElem.appendChild(span2);
            }
            getOrderList();
        }
    }
}