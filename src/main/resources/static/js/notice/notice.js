// notice list
{
    const noticeList = document.querySelector('#notice-list');
    if(noticeList) {
        const noticeBody = noticeList.querySelector('table tbody');
        const paginationElem = noticeList.querySelector('.pagination');
        const selectElem = noticeList.querySelector('#select');
        const searchElem = noticeList.querySelector('#search');
        const searchBtnElem = noticeList.querySelector('.mini');

        let selectVal = selectElem.value;
        let searchVal = searchElem.value;
        let maxPage = 1;
        let startIdx = 0;
        let rowCnt = 10;
        let pageCnt = 10;
        let currentPage = 1;
        let url = `/ajax/notice/list?`;

        const getList = (result) => {
            console.log(startIdx);
            result = result + `startIdx=${startIdx}&rowCnt=${rowCnt}&select=${selectVal}&search=${searchVal}`;
            fetch(result)
                .then(res => res.json())
                .then(data => {
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
                let role = item.role;
                if(role === 'ROLE_ADMIN') {
                    role = '관리자';
                }
                const trElem = document.createElement('tr');
                trElem.innerHTML = `
                    <td>${item.inotice}</td>
                    <td>${item.title}</td>
                    <td>${item.rdt}</td>
                    <td>${role}</td>
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
            console.log(paginationElem);
            const aElem1 = document.createElement('a');
            const aElem2 = document.createElement('a');

            const pop = Math.ceil(currentPage / pageCnt);
            const lastPage = pop * pageCnt;
            const startPage = lastPage - (pageCnt - 1);

            startIdx = (currentPage - 1) * rowCnt;


            let status1;
            if(currentPage === 1 || maxPage === 0) { status1 = 'disabled'; }
            aElem1.classList.add(status1);
            aElem1.classList.add('item');
            aElem1.innerHTML = `<i class="angle left icon mr0"></i>`;
            aElem1.addEventListener('click', () => {
                currentPage = ((currentPage - rowCnt) < rowCnt) ? 1 : (currentPage - rowCnt);
                makePage(maxPage);
                getList(url);
            });
            paginationElem.appendChild(aElem1);

            for(let i=startPage; i<=(lastPage < maxPage ? lastPage : maxPage); i++){
                let status;
                const aElem3 = document.createElement('a');
                if(currentPage === i) { status = 'active'; }
                aElem3.innerText = i;
                aElem3.classList.add('item');
                aElem3.classList.add(status);
                aElem3.addEventListener('click', () => {
                    currentPage = i;
                    makePage(maxPage);
                    getList(url);
                });
                paginationElem.appendChild(aElem3);
            }

            let status2;
            if(currentPage === maxPage || maxPage === 0) { status2 = 'disabled'; }
            aElem2.classList.add('item');
            aElem2.classList.add(status2);
            aElem2.innerHTML = `<i class="angle right icon mr0"></i>`;
            aElem2.addEventListener('click', () => {
                currentPage = ((currentPage + rowCnt) > maxPage) ? maxPage : currentPage + rowCnt;
                makePage(maxPage);
                getList(url);
            });
            paginationElem.appendChild(aElem2);
        }

        selectElem.addEventListener('change', () => {
            selectVal = selectElem.value;
            searchVal = searchElem.value;
            getList(url);
        });
        searchBtnElem.addEventListener('click', () => {
            selectVal = selectElem.value;
            searchVal = searchElem.value;
            getList(url);
        });
        getList(url);
    }
}