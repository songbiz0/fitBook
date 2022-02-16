// 프로그램 등록
{
    const addBtn = document.querySelector('#addBtn');
    if(addBtn) {
        const frmBtn = document.querySelector('#frmBtn');
        const list = [
            'nm', 'required_cpu', 'required_gpu', 'required_ram', "mfFile"
        ];

        frmBtn.addEventListener('click', (e) => {
            const programArr = document.querySelectorAll('.program');
            let forNo = 0;
            programArr.forEach((item) => {
                for (let i in list) {
                    const searchId = list[i];
                    const result = 'programList[' + forNo + '].' + searchId;
                    item.querySelector(`.${searchId}`).name = result;
                }
                forNo++;
            });
        });

        addBtn.addEventListener('click', () => {
            const programElem = document.createElement('div');
            programElem.className = 'program';
            programElem.innerHTML = `
                <div class="ui right labeled input">
                    <input type="text" class="nm">
                    <div class="ui basic label">
                        프로그램 이름
                    </div>
                </div>
                <div class="ui right labeled input">
                    <input type="text" class="required_cpu">
                    <div class="ui basic label">
                        권장 CPU
                    </div>
                </div>
                <div class="ui right labeled input">
                    <input type="text" class="required_gpu">
                    <div class="ui basic label">
                        권장 GPU
                    </div>
                </div>
                <div class="ui right labeled input">
                    <input type="text" class="required_ram">
                    <div class="ui basic label">
                        권장 RAM
                    </div>
                </div>
                <div class="ui right labeled input">
                    <input type="file" class="mfFile">
                    <div class="ui basic label">
                        프로그램 이미지
                    </div>
                </div>
                <input type="button" value="삭제하기" class="delBtn ui inverted red button">
        `;
            const programContainer = document.querySelector('.program-enrollment-container');
            programContainer.appendChild(programElem);

            const delBtn = document.querySelectorAll('.delBtn');
            delBtn.forEach((item) => item.addEventListener('click', (e) => {
                e.target.closest('.program').remove();
            }));
        });
    }
}

// 프로그램 목록
{
    const frm = document.querySelector('.programListFrm');
    if(frm) {
        const cpuPerfElem = frm.querySelector('#required_cpu');
        const gpuPerfElem = frm.querySelector('#required_gpu');
        const ramPerfElem = frm.querySelector('#required_ram');
        const searchPagination = document.querySelector('#searchPagination');

        let searchElem = document.querySelector('#searchText');
        let result;
        let maxPage;
        let pageCnt = 3;
        let currentPage = 1;
        let startIdx = 0;
        let rowCnt = 3;
        let selectedSeq = '';
        let url = `/ajax/admin/programSearch?`;

        const getList = (makeUrl) => {
            console.log(startIdx);
            let resultUrl = url + `rowCnt=${rowCnt}&startIdx=${startIdx}` + makeUrl;
            if(makeUrl == undefined) {
                resultUrl = url + `rowCnt=${rowCnt}&startIdx=${startIdx}`;
            }
            console.log(resultUrl);
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
        const seqGetList = (type, elem) => {
            searchElem = frm.querySelector('#searchText');
            let searchText = searchElem.value;
            let result = '';
            if(elem.classList.contains('fa-angle-up')) {
                elem.classList.replace('fa-angle-up', 'fa-angle-down');
                result = `&search=${searchText}&typeNo=2&type=${type}`;
            } else {
                elem.classList.replace('fa-angle-down', 'fa-angle-up');
                result = `&search=${searchText}&typeNo=1&type=${type}`;
            }
            getList(result);
        }
        const setList = (list) => {
            const table = document.querySelector('table');
            const isTbody = table.querySelector('tbody');
            if (isTbody) {
                isTbody.remove();
            }
            const tbody = document.createElement('tbody');
            list.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td><img class="w70 h50" src="/images/program/${item.nm}/${item.img}"></td>
                <td>${item.nm}</td>
                <td>${item.required_cpu}</td>
                <td>${item.required_gpu}</td>
                <td>${item.required_ram}</td>
            `;
                tbody.appendChild(tr);
                table.appendChild(tbody);
            });
        }
        const makePage = (maxPage) => {
            searchPagination.innerHTML = '';

            searchElem = frm.querySelector('#searchText');
            let searchText = searchElem.value === undefined ? '' : searchElem.value;
            let resultUrl = '&search=' + searchText;
            let pop = Math.ceil(currentPage / pageCnt);
            startIdx = (currentPage - 1) * rowCnt;
            let lastPage = pop * pageCnt;
            let startPage = lastPage - (pageCnt - 1);

            const span1 = document.createElement('a');
            let click_status1;
            if(currentPage === 1) { click_status1 = 'disabled'; }
            span1.classList.add(click_status1);
            span1.classList.add('item');
            span1.innerHTML = `<i class="angle left icon mr0"></i>`;
            span1.addEventListener('click', () => {
                currentPage = currentPage === 1 ? 1 : (currentPage - 1);
                makePage(maxPage);
                getList(resultUrl);
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
                    makePage(maxPage);
                    getList(resultUrl);
                });
                searchPagination.appendChild(aElem);
            }
            const span2 = document.createElement('a');
            let click_status2;
            if(currentPage === maxPage) { click_status2 = 'disabled'; }
            span2.classList.add(click_status2);
            span2.classList.add('item');
            span2.innerHTML = `<i class="angle right icon mr0"></i>`;
            span2.addEventListener('click', () => {
                currentPage = currentPage === maxPage ? maxPage : (currentPage + 1);
                makePage(maxPage);
                getList(resultUrl);
            });
            searchPagination.appendChild(span2);
        }
        const getMaxPage = (search) => {
            let resultUrl = `/ajax/admin/programMaxPage?rowCnt=${rowCnt}`;
            if(search != undefined) {
                resultUrl += `&search=${search}`;
            }

            fetch(resultUrl)
                .then(res => res.json())
                .then(data => {
                    maxPage = data.result;
                    makePage(maxPage);
                })
                .catch(e => {
                    console.error(e);
                });
        }

        searchElem.addEventListener('keyup', () => {
            let searchVal = document.querySelector('#searchText').value;
            let result = `&search=${searchVal}`;
            currentPage = 1;

            if(selectedSeq === 'cpu') {
                getList(`${result}&typeNo=1&type=required_cpu`);
            } else if(selectedSeq === 'gpu') {
                getList(`${result}&typeNo=1&type=required_gpu`);
            } else if(selectedSeq === 'ram') {
                getList(`${result}&typeNo=1&type=required_ram`);
            } else {
                getList(result);
            }
            getMaxPage(searchVal);
            console.log('selectedSeq : ' + selectedSeq);
            console.log('currentPage : ' + currentPage );
        });

        cpuPerfElem.addEventListener('click', () => {
            seqGetList('required_cpu', cpuPerfElem);
            selectedSeq = 'cpu';
        });

        gpuPerfElem.addEventListener('click', () => {
            seqGetList('required_gpu', gpuPerfElem);
            selectedSeq = 'gpu';
        });

        ramPerfElem.addEventListener('click', () => {
            seqGetList('required_ram', ramPerfElem);
            selectedSeq = 'ram';
        });

        getList();
        getMaxPage();
    }
}