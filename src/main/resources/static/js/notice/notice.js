// notice list
{
    const noticeList = document.querySelector('#notice-list');
    if(noticeList) {
        const noticeBody = noticeList.querySelector('table tbody');
        const paginationElem = noticeList.querySelector('.pagination');
        const selectElem = noticeList.querySelector('#select');
        const searchElem = noticeList.querySelector('#search');
        const searchBtnElem = noticeList.querySelector('#searchBtn');

        let selectVal = selectElem.value;
        let searchVal = searchElem.value;
        let maxPage = 1;
        let currentPage = 1;
        if(history.state) {
            if (history.state['currentPage']) {
                currentPage = history.state['currentPage'];
            }
            if (history.state['search']) {
                searchVal = history.state['search'];
                searchElem.value = searchVal;
            }
            if (history.state['select']) {
                selectVal = history.state['select'];
            }
        }
        let rowCnt = 10;
        let startIdx = (currentPage - 1) * rowCnt;
        let pageCnt = 10;
        let url = `/ajax/notice/list?`;

        const getList = (result) => {
            result = result + `startIdx=${startIdx}&rowCnt=${rowCnt}&select=${selectVal}&search=${searchVal}`;
            fetch(result)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    getMaxPage();
                    setList(data);
                })
                .catch(e => {
                    console.error(e);
                });
        }
        const setList = (list) => {
            noticeBody.innerHTML = '';
            list.forEach(item => {
                const trElem = document.createElement('tr');
                trElem.addEventListener('click', () => {
                    let param = {
                        currentPage : currentPage,
                        select : selectVal,
                        search : searchVal
                    }
                    history.pushState(param, 'list', '/notice/list/#');
                    location.href = '/notice/detail?inotice=' + item.inotice +'&page=' + currentPage +'&search=' + searchVal + '&select=' + selectVal;
                });
                const rdt = item.rdt.substr(0, item.rdt.indexOf('.'));
                trElem.innerHTML = `
                    <td>${item.inotice}</td>
                    <td>${item.title}</td>
                    <td>${rdt}</td>
                    <td>${item.writerNm}</td>
                    <td>${item.hits}</td>
                `;
                noticeBody.appendChild(trElem);
            });
        }
        const getMaxPage = () => {
            let maxUrl = `/ajax/notice/maxPage?rowCnt=${rowCnt}&select=${selectVal}&search=${searchVal}`;
            fetch(maxUrl)
                .then(res => res.json())
                .then(data => {
                    maxPage = data.result;
                    makePage(maxPage);
                })
                .catch(e => {
                    console.error(e);
                });
        }
        const makePage = (maxPage) => {
            paginationElem.innerHTML = '';
            const aElem1 = document.createElement('a');
            const aElem2 = document.createElement('a');

            const pop = Math.ceil(currentPage / pageCnt);
            const lastPage = pop * pageCnt;
            const startPage = lastPage - (pageCnt - 1);

            startIdx = (currentPage - 1) * rowCnt;

            aElem1.classList.add('item');
            aElem1.innerHTML = `<i class="angle left icon mr0"></i>`;
            if(maxPage === 0 || pop === 1) { aElem1.classList.add('disabled'); }
            aElem1.addEventListener('click', () => {
                let param = {
                    currentPage : currentPage,
                    select : selectVal,
                    search : searchVal
                }
                history.pushState(param, 'list', '/notice/list/#');
                currentPage = ((currentPage - pageCnt) < pageCnt) ? 1 : (currentPage - pageCnt);
                makePage(maxPage);
                getList(url);
            });
            paginationElem.appendChild(aElem1);

            for(let i=startPage; i<=(lastPage < maxPage ? lastPage : maxPage); i++){
                let status;
                const aElem3 = document.createElement('a');
                if(parseInt(currentPage) === i) { status = 'active'; }
                aElem3.innerText = i;
                aElem3.classList.add('item');
                aElem3.classList.add(status);
                aElem3.addEventListener('click', () => {
                    currentPage = i;
                    let param = {
                        currentPage : currentPage,
                        select : selectVal,
                        search : searchVal
                    }
                    history.pushState(param, 'list', '/notice/list/#');
                    makePage(maxPage);
                    getList(url);
                });
                paginationElem.appendChild(aElem3);
            }

            aElem2.classList.add('item');
            aElem2.innerHTML = `<i class="angle right icon mr0"></i>`;
            if(maxPage === 0 || (startPage * pageCnt) >= maxPage) { aElem2.classList.add('disabled'); }
            aElem2.addEventListener('click', () => {
                let param = {
                    currentPage : currentPage,
                    select : selectVal,
                    search : searchVal
                }
                history.pushState(param, 'list', '/notice/list/#');
                currentPage = ((currentPage + pageCnt) > maxPage) ? maxPage : currentPage + pageCnt;
                makePage(maxPage);
                getList(url);
                console.log(maxPage);
            });
            paginationElem.appendChild(aElem2);
        }

        searchBtnElem.addEventListener('click', () => {
            currentPage = 1;
            startIdx = 0;
            selectVal = selectElem.value;
            searchVal = searchElem.value;
            getList(url);
        });

        window.onbeforeunload = () => {
            let param = {
                currentPage : currentPage,
                select : selectVal,
                search : searchVal
            }
            history.pushState(param, 'list', '/notice/list/#');
        }
        getMaxPage();
        getList(url);
    }
}

// notice detail
{
    const detailPageElem = document.querySelector('.detail-page');
    const backList = document.querySelector('#back-list');
    const backListH3 = document.querySelector('#back-list-h3');
    const delBtn = document.querySelector('#delNotice');

    if(detailPageElem) {
        const url = new URL(location.href);
        const currentPage = url.searchParams.get('page');
        const select = url.searchParams.get('select');
        const search = url.searchParams.get('search');
        const param = {
            currentPage : currentPage,
            search : search,
            select: select
        }
        backList.addEventListener('click', () => {
            history.pushState(param, 'list', '/notice/list/');
            location.href = '/notice/list/';
        });
        backListH3.addEventListener('click', () => {
            history.pushState(param, 'list', '/notice/list/');
            location.href = '/notice/list/';
        });
    }

    if(delBtn) {
        const data = document.querySelector('#data');
        const inotice = data.dataset.inotice;
        const delUrl = `/ajax/notice/del?inotice=${inotice}`;
        delBtn.addEventListener('click', () => {
            if(confirm('글을 삭제하시겠습니까?')) {
                fetch(delUrl, {
                    method: 'delete'
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    location.href = '/notice/list';
                })
                .catch(e => {
                    console.log(e);
                });
            }
        });
    }
}

// notice write
{
    const toolbar = document.querySelector('.note-toolbar');
    if(toolbar) {
        const divElem = document.createElement('div');
        divElem.id = 'asd';
        divElem.classList.add('chk');
        toolbar.appendChild(divElem);

        const titleRegex = /^([a-zA-Z가-힣ㄱ-ㅎ0-9 !@#$%^&*()_\-+=?/<>'";:,.\/~\`]{1,30})$/;

        const formElem = document.querySelector('.summernote-form');
        const titleElem = document.querySelector('#title');
        const noticeTitle = document.querySelector('.notice-tit');
        const ctntElem1 = document.querySelector('#summernote');
        const ctntElem2 = document.querySelector('.note-editable');
        let isTitle = false;
        let isCtnt = false;

        titleElem.addEventListener('keyup', () => {
            const titleDivElem = document.querySelector('#tit');
            if(!titleRegex.test(titleElem.value)) {
                noticeTitle.classList.add('error');
                titleDivElem.classList.replace('hidden', 'cerror');
                titleDivElem.querySelector('span').innerText = '제목은 30자 이내로 비워두지 말고 작성해 주세요.';
                isTitle = false;
                return;
            } else {
                noticeTitle.classList.remove('error');
                titleDivElem.classList.replace('cerror', 'hidden');
                isTitle = true;
            }
        });
        ctntElem2.addEventListener('keyup', () => {
            let ctntElemVal = document.querySelector('#summernote').value;
            ctntElemVal = ctntElemVal.replaceAll('<p>', '').replaceAll('</p>', '').replaceAll('<br>', '').replaceAll('&nbsp;', '').replaceAll(' &nbsp;', '');
            if(ctntElemVal.length < 1 || ctntElemVal.length === 0) {
                isCtnt = false;
            } else {
                isCtnt = true;
            }
        });
        let ctntElemVal = document.querySelector('#summernote').value;
        ctntElemVal = ctntElemVal.replaceAll('<p>', '').replaceAll('</p>', '').replaceAll('<br>', '').replaceAll('&nbsp;', '').replaceAll(' &nbsp;', '');
        if(ctntElemVal.length < 1 || ctntElemVal.length === 0) {
            isCtnt = false;
        } else {
            isCtnt = true;
        }
        const titleDivElem = document.querySelector('#tit');
        if(!titleRegex.test(titleElem.value)) {
            isTitle = false;
        } else {
            noticeTitle.classList.remove('error');
            titleDivElem.classList.replace('cerror', 'hidden');
            isTitle = true;
        }

        formElem.addEventListener('submit' , (e) => {
            if(!isTitle || !isCtnt) {
                $('body').toast({
                    class: 'error',
                    message: '잠깐 ! 내용이나 제목을 입력하셨나요?'
                });
                e.preventDefault();
                return;
            }
        });
    }
}

// notice mod
{

}