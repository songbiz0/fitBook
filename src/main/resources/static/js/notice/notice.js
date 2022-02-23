// notice list
{
    const noticeList = document.querySelector('#notice-list');
    if(noticeList) {
        const noticeBody = noticeList.querySelector('table tbody');
        const paginationElem = noticeList.querySelector('.pagination');
        const selectElem = noticeList.querySelector('#select');
        const searchElem = noticeList.querySelector('#search');
        const searchBtnElem = noticeList.querySelector('#searchBtn');
        const form = new FormData();

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
                    location.href = '/notice/detail?inotice=' + item.inotice;
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

            if(startPage !== 1 || maxPage === 0) {
                aElem1.classList.add('item');
                aElem1.innerHTML = `<i class="angle left icon mr0"></i>`;
                if(maxPage === 0) { aElem1.classList.add('disabled'); }
                aElem1.addEventListener('click', () => {
                    currentPage = ((currentPage - pageCnt) < pageCnt) ? 1 : (currentPage - pageCnt);
                    history.pushState(null, 'list', '/notice/list');
                    makePage(maxPage);
                    getList(url);
                });
                paginationElem.appendChild(aElem1);
            }

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

                    form.append('currentPage', param['currentPage']);
                    history.pushState(param, 'list', '/notice/list/#');
                    makePage(maxPage);
                    getList(url);
                });
                paginationElem.appendChild(aElem3);
            }

            if(lastPage < maxPage || maxPage === 0) {
                history.pushState(null, 'list', '/notice/list');
                aElem2.classList.add('item');
                aElem2.innerHTML = `<i class="angle right icon mr0"></i>`;
                if(maxPage === 0) { aElem2.classList.add('disabled'); }
                aElem2.addEventListener('click', () => {
                    currentPage = ((currentPage + pageCnt) > maxPage) ? maxPage : currentPage + pageCnt;
                    makePage(maxPage);
                    getList(url);
                    console.log(maxPage);
                });
                paginationElem.appendChild(aElem2);
            }
        }

        window.onbeforeunload = () => {
            currentPage = history.state['currentPage'];
        }

        searchBtnElem.addEventListener('click', () => {
            currentPage = 1;
            startIdx = 0;
            selectVal = selectElem.value;
            searchVal = searchElem.value;
            getList(url);
        });
        getList(url);
    }
}