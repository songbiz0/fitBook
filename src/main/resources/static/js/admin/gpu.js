// gpu insert
{
    const addBtn = document.querySelector('#addBtn');
    if(addBtn) {
        const frmBtn = document.querySelector('#frmBtn');
        const list = [
            'nm', 'performance', 'seq', 'brand'
        ];

        frmBtn.addEventListener('click', (e) => {
            const gpuArr = document.querySelectorAll('.gpu');
            let forNo = 0;
            gpuArr.forEach((item) => {
                for (let i in list) {
                    const searchId = list[i];
                    const result = 'gpuList[' + forNo + '].' + searchId;
                    item.querySelector(`.${searchId}`).name = result;
                }
                forNo++;
            });
        });

        addBtn.addEventListener('click', () => {
            const gpuElem = document.createElement('div');
            gpuElem.className = 'gpu';
            gpuElem.innerHTML = `
            <div class="ui right labeled input">
                    <input type="text" class="nm">
                    <div class="ui basic label">
                        GPU 이름
                    </div>
                </div>
                <div class="ui right labeled input">
                    <input type="text" class="performance">
                    <div class="ui basic label">
                        성능수치
                    </div>
                </div>
                <div class="ui right labeled input">
                    <input type="text" class="seq">
                    <div class="ui basic label">
                        세대
                    </div>
                </div>
                <div class="ui right labeled input">
                    <input type="text" class="brand">
                    <div class="ui basic label">
                        브랜드
                    </div>
                </div>
                <input type="button" value="삭제하기" class="delBtn ui inverted red button">
        `;
            const gpuContainer = document.querySelector('.gpu-enrollment-container');
            gpuContainer.appendChild(gpuElem);

            const delBtn = document.querySelectorAll('.delBtn');
            delBtn.forEach((item) => item.addEventListener('click', (e) => {
                e.target.closest('.gpu').remove();
            }));
        });
    }
}

// gpu list
{
    const frmElem = document.querySelector('.gpuListFrm');
    if(frmElem) {
        let startIdx = 0;
        let rowCnt = 2;
        let currentPage = 1;
        let pageCnt = 1;
        let paginationElem = document.querySelector('.pagination');

        const url = '/ajax/admin/gpuSearch?';
        const seq = document.querySelector('#seq');
        const perf = document.querySelector('#perf');
        const searchElem = document.querySelector('#searchText');
        const selectElem = document.querySelector('#select');

        const getList = (addUrl) => {
            let resultUrl = url + `startIdx=${startIdx}&rowCnt=${rowCnt}`;
            if(addUrl) { resultUrl = resultUrl + `&` + addUrl; }
            fetch(resultUrl)
                .then(res => res.json())
                .then(data => {
                    setList(data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        const setList = (list) => {
            const table = document.querySelector('table');
            const isTbody = table.querySelector('tbody');
            if(isTbody) {
                isTbody.remove();
            }
            const tbody = document.createElement('tbody');
            list.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.nm}</td>
                    <td>${item.performance}</td>
                    <td>${item.seq}</td>
                    <td>${item.brand}</td>
                `;
                tbody.appendChild(tr);
                table.appendChild(tbody);
            })
        }
        const makePage = (maxPage) => {
            paginationElem = document.querySelector('.pagination');
            paginationElem.innerHTML = '';
            startIdx = (currentPage - 1) * rowCnt;
            const aElem1 = document.createElement('a');
            const aElem3 = document.createElement('a');
            const pop = Math.ceil(currentPage / pageCnt);
            const lastPage = pop * pageCnt;
            const startPage = lastPage - (pageCnt - 1);
            let search = searchElem.value;
            let select = selectElem.value;
            let url = `search=${search}&select=${select}`;

            let status1;
            if(currentPage === 1 || maxPage === 0) { status1 = 'disabled'; }
            aElem1.classList.add(status1);
            aElem1.classList.add('item');
            aElem1.innerHTML = `<i class="angle left icon mr0"></i>`;
            aElem1.addEventListener('click', () => {
                currentPage = currentPage === 1 ? 1 : (currentPage - 1);
                makePage(maxPage);
                getList(url);
            });
            paginationElem.appendChild(aElem1);

            for(let i=startPage; i<=(lastPage < maxPage ? lastPage : maxPage); i++) {
                const aElem2 = document.createElement('a');
                aElem2.innerText = i;
                let status;
                if(i === currentPage) { status = 'active'; }
                aElem2.classList.add('item');
                aElem2.classList.add(status);
                aElem2.addEventListener('click', () => {
                    currentPage = i;
                    makePage(maxPage);
                    getList(url);
                });
                paginationElem.appendChild(aElem2);
            }

            let status2;
            if(currentPage === maxPage || maxPage === 0) { status2 = 'disabled'; }
            aElem3.classList.add(status2);
            aElem3.classList.add('item');
            aElem3.innerHTML = `<i class="angle right icon mr0"></i>`;
            aElem3.addEventListener('click', () => {
                currentPage = currentPage === maxPage ? maxPage : (currentPage + 1);
                makePage(maxPage);
                getList(url);
            });
            paginationElem.appendChild(aElem3);
        }
        const getMaxPage = (addUrl) => {
            let url = `/ajax/admin/gpuMaxPage?rowCnt=${rowCnt}`;
            let maxUrl = url;
            if(addUrl) {
                maxUrl = url + `&startIdx=${startIdx}&${addUrl}`;
            }
            fetch(maxUrl)
                .then(res => res.json())
                .then(data => {
                    makePage(data.result);
                })
                .catch(e => {
                    console.error(e);
                })
        }

        searchElem.addEventListener('keyup', () => {
            currentPage = 1;
            startIdx = 0;
            const searchText = document.querySelector('#searchText').value;
            const selectVal = document.querySelector('#select').value;
            const searchUrl = `search=${searchText}&select=${selectVal}`;
            console.log(searchText);
            console.log(selectVal);

            getMaxPage(searchUrl);
            getList(searchUrl);
        });

        selectElem.addEventListener('change', () => {
            const search = searchElem.value;
            const select = selectElem.value;
            const selectUrl = `search=${search}&select=${select}`;

            getMaxPage(selectUrl);
            getList(selectUrl);
        });

        seq.addEventListener('click', () => {
            const seqElem = document.querySelector('#seq');
            const searchText = document.querySelector('#searchText').value;
            const select = document.querySelector('#select').value;
            let resultUrl= '';
            if(seqElem.classList.contains('fa-angle-up')) {
                seqElem.classList.remove('fa-angle-up');
                seqElem.classList.add('fa-angle-down');
                resultUrl = `typeNo=2&search=${searchText}&select=${select}&type=seq`;
            } else {
                seqElem.classList.remove('fa-angle-down');
                seqElem.classList.add('fa-angle-up');
                resultUrl = `typeNo=1&search=${searchText}&select=${select}&type=seq`;
            }
            getList(resultUrl);
        })

        perf.addEventListener('click', () => {
            const perfElem = document.querySelector('#perf');
            const searchText = document.querySelector('#searchText').value;
            const select = document.querySelector('#select').value;
            let resultUrl= '';
            if(perf.classList.contains('fa-angle-up')) {
                perfElem.classList.remove('fa-angle-up');
                perfElem.classList.add('fa-angle-down');
                resultUrl = `typeNo=2&search=${searchText}&select=${select}&type=performance`;
            } else {
                perfElem.classList.remove('fa-angle-down');
                perfElem.classList.add('fa-angle-up');
                resultUrl = `typeNo=1&search=${searchText}&select=${select}&type=performance`;
            }
            getList(resultUrl);
        })

        getMaxPage();
        getList(url);

    }
}
