// 회원 목록 ----------------------------------------------------------------------------------[start]
{
    const frmElem = document.querySelector('.user');
    if (frmElem) {
        let startIdx = 0;
        let rowCnt = 4;
        let currentPage = 1;
        let pageCnt = 1;
        let paginationElem = document.querySelector('.pagination');
        const tbodyElem = document.querySelector('table tbody');

        const url = '/ajax/admin/user?';
        const searchUrl = '/ajax/admin/selectUserSearchList?';
        const typeElem = document.querySelector('#type');
        const keywordElem = document.querySelector('#keyword');

        //리스트 정보 불러오기
        const getList = (addUrl) => {
            let resultUrl = `${url}startIdx=${startIdx}&recordCount=${rowCnt}`;
            if (addUrl) {
                resultUrl = searchUrl + addUrl + `&startIdx=${startIdx}&recordCount=${rowCnt}`;
            }
            console.log(resultUrl);
            fetch(resultUrl)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    console.log(resultUrl)
                    getMaxPage();
                    setList(data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        const getSearchList = (addUrl) =>{
            let resultUrl =  `${searchUrl}rowCnt=${rowCnt}&startIdx=${startIdx}&`;
            if (addUrl) {
                resultUrl = resultUrl + '&' + addUrl;
            }
            fetch(resultUrl)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setList(data);
                })
                .catch(e => {
                    console.log(e);
                });
        }

        const setList = (list) => {
            tbodyElem.innerHTML = '';
            const tableElem = document.querySelector('table');
            const tbody = document.createElement('tbody');
            list.forEach(item => {
                const trElem = document.createElement('tr');
                trElem.innerHTML = `
                <td>${item.iuser}</td>
                <td>${item.uid}</td>
                <td>${item.nm}</td>
                <td>${item.email}</td>
                <td>${item.recent_price}</td>
                <td>${item.result_price}</td>
                <td>${item.recent_rdt}</td>
                <td>${item.join_rdt}</td>
                <td>${item.point}</td>
            `;
                tbodyElem.appendChild(trElem);
                tableElem.appendChild(tbody);
            });
        }
        const makePage = (maxPage) => { // 번호 찍어주는거
            paginationElem = document.querySelector('.pagination');
            paginationElem.innerHTML = '';
            startIdx = (currentPage - 1) * rowCnt;
            const aElem1 = document.createElement('a');
            const aElem3 = document.createElement('a');
            const pop = Math.ceil(currentPage / pageCnt);
            const lastPage = pop * pageCnt;
            const startPage = lastPage - (pageCnt - 1);
            const type = typeElem.value;
            const keyword = keywordElem.value;
            console.log(currentPage);
            console.log(startIdx);
            const url = `type=${type}&keyword=${keyword}`;

            let status1;
            if (currentPage === 1) { status1 = 'disabled'; }
            aElem1.classList.add(status1);
            aElem1.classList.add('item');
            aElem1.innerHTML = `<i class="angle left icon mr0"></i>`;
            aElem1.addEventListener('click', () => {
                currentPage = currentPage === 1 ? 1 : (currentPage - 1);
                makePage();
                getList(url);
            });
            paginationElem.appendChild(aElem1);
            for (let i = startPage; i <= (lastPage < maxPage ? lastPage : maxPage); i++) {
                const aElem2 = document.createElement('a');
                aElem2.innerText = i;
                let status;
                if (i === currentPage) {
                    status = 'active';
                }
                aElem2.classList.add('item');
                aElem2.classList.add(status);
                aElem2.addEventListener('click', () => {
                    currentPage = i;
                    makePage();
                    getList(url);
                });
                paginationElem.appendChild(aElem2);
            }

            let status2;
            if (currentPage === maxPage) { status2 = 'disabled'; }
            aElem3.classList.add(status2);
            aElem3.classList.add('item')
            aElem3.innerHTML = `<i class="angle right icon mr0"></i>`;
            aElem3.addEventListener('click', () => {
                currentPage = currentPage === maxPage ? maxPage : (currentPage + 1);
                makePage();
                getList(url);
            });
            paginationElem.appendChild(aElem3);
        }
        const getMaxPage = () => {
            let url = `/ajax/admin/userMaxPage?recordCount=${rowCnt}&type=${typeElem.value}&keyword=${keywordElem.value}`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data.result);
                    makePage(data.result);
                })
                .catch(e => {
                    console.error(e);
                })
        }

        keywordElem.addEventListener('keyup', () => {
            currentPage = 1;
            startIdx = 0;
            const keywordVal = document.querySelector('#keyword').value;
            const typeVal = document.querySelector('#type').value;
            const searchUrl = `type=${typeVal}&keyword=${keywordVal}`;
            console.log(typeVal);
            console.log(keywordVal);

            getList(searchUrl);
        });

        typeElem.addEventListener('change', () => {
            const type = typeElem.value;
            const keyword = keywordElem.value;
            const selectUrl = `type=${type}&keyword=${keyword}`;

            getList(selectUrl);
        });

        getList();
    }
}