{
    // cpu insert
    const addBtn = document.querySelector('#addBtn');
    if(addBtn) {
        const frmBtn = document.querySelector('#frmBtn');
        const list = [
            'nm', 'performance', 'inner_gpu', 'seq', 'brand'
        ];

        const gpuOption = document.querySelector('#gpuOption');
        gpuOption.addEventListener('change', ()=>{
            const value = gpuOption.value;
            const innerGpuInputElem = document.querySelector('#top-innergpu');
            fetch(`/ajax/admin/gpuPerformance?igpu=${value}`)
                .then(res => res.json())
                .then(data => {
                    innerGpuInputElem.value = data.performance;
                })
                .catch(e => {
                    innerGpuInputElem.value = '';
                    console.error(e);
                });
        });

        const selCpu = (elem) => {
            fetch('/ajax/admin/selInnerGpu')
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    elem.innerHTML = '';
                    const option = document.createElement('option');
                    option.innerText = '선택';
                    option.value = 0;
                    elem.appendChild(option);
                    data.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item.igpu;
                        option.innerText = item.nm;
                        elem.appendChild(option);
                    });
                })
                .catch(e => {
                    console.error(e);
                });
        }

        frmBtn.addEventListener('click', (e) => {
            const cpuArr = document.querySelectorAll('.cpu');
            let forNo = 0;
            cpuArr.forEach((item) => {
                for (let i in list) {
                    const searchId = list[i];
                    const result = 'cpuList[' + forNo + '].' + searchId;
                    item.querySelector(`.${searchId}`).name = result;
                }
                forNo++;
            });
        });

        addBtn.addEventListener('click', () => {
            const cpuElem = document.createElement('div');
            cpuElem.className = 'cpu';
            cpuElem.innerHTML = `
            <div class="ui right labeled input">
                    <input type="text" class="nm">
                    <div class="ui basic label">
                        CPU 이름
                    </div>
                </div>
                <div class="ui right labeled input">
                    <input type="text" class="performance">
                    <div class="ui basic label">
                        성능수치
                    </div>
                </div>
                <div class="ui right labeled input">
                    <select class="inner_gpu">
                        <option>선택</option>
                    </select>
                    <input type="text" class="innerGpu">
                    <div class="ui basic label">
                        내장그래픽 성능수치
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
            const cpuContainer = document.querySelector('.cpu-enrollment-container');
            cpuContainer.appendChild(cpuElem);
            const innerGpu = cpuElem.querySelector('.inner_gpu');
            selCpu(innerGpu);
            const innerGpuInputElem = cpuElem.querySelector('.innerGpu');
            const gpuPerform = () => {
                const value = innerGpu.value;
                fetch(`/ajax/admin/gpuPerformance?igpu=${value}`)
                    .then(res => res.json())
                    .then(data => {
                        innerGpuInputElem.value = data.performance;
                    })
                    .catch(e => {
                        innerGpuInputElem.value = '';
                        console.error(e);
                    });
            }
            innerGpu.addEventListener('change', () => {
                gpuPerform();
            });


            const delBtn = document.querySelectorAll('.delBtn');
            delBtn.forEach((item) => item.addEventListener('click', (e) => {
                e.target.closest('.cpu').remove();
            }));
        });


    }
}
// cpuList
{
    const frmElem = document.querySelector('.cpuListFrm');
    if(frmElem) {
        const rowCnt = 10;
        const pageCnt = 10;
        let startIdx = 0;
        let currentPage = 1;

        const baseUrl = '/ajax/admin/cpuSearch?';
        const maxUrl = '/ajax/admin/cpuMaxPage?';

        const paginationElem = document.querySelector('.pagination');
        const selectElem = document.querySelector('#select');
        const searchElem = document.querySelector('#searchText');
        const seqElem = document.querySelector('#seq');
        const perfElem = document.querySelector('#perf');
        const innerPerfElem = document.querySelector('#inner_perf');
        const tbodyElem = document.querySelector('table tbody');

        searchElem.addEventListener('keyup', () => {
            const searchText = document.querySelector('#searchText').value; // i7
            const select = document.querySelector('#select').value; // nm
            const searchUrl = url + `?search=${searchText}&select=${select}`;
            getList(searchUrl);
        });


        const getList = (addUrl) => {
            let url = baseUrl + `startIdx=${startIdx}&rowCnt=${rowCnt}`;
            if(addUrl) { url = url + '&' + addUrl; }
            console.log(url);
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setList(data);
                    getMaxPage(addUrl);
                })
                .catch(e => {
                    console.error(e);
                })
        }
        const setList = (data) => {
            tbodyElem.innerHTML = '';
            data.forEach(item => {
                const trElem = document.createElement('tr');
                trElem.classList.add('list-tr');
                trElem.innerHTML = `
                    <td>${item.nm}</td>
                    <td>${item.performance}</td>
                    <td>${item.inner_gpu}</td>
                    <td>${item.seq}</td>
                    <td>${item.brand}</td>
                `;
                trElem.addEventListener('click', () => {
                    location.href = `/admin/cpuDetail?icpu=${item.icpu}`;
                });
                tbodyElem.appendChild(trElem);
            });
        }
        const getMaxPage = (addUrl) => {
            let url = maxUrl + `startIdx=${startIdx}&rowCnt=${rowCnt}`;
            if(addUrl) { url =  url + '&' + addUrl; }
            console.log(url);
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    makePage(data.result);
                })
                .catch(e => {
                    console.error(e);

                })
        }
        const makePage = (maxPage) => {
            paginationElem.innerHTML = '';
            console.log(paginationElem);
            const aElem1 = document.createElement('a');
            const aElem2 = document.createElement('a');

            const pop = Math.ceil(currentPage / pageCnt);
            const lastPage = pop * pageCnt;
            const startPage = lastPage - (pageCnt - 1);

            const searchVal = searchElem.value;
            const selectVal = selectElem.value;

            let url = `search=${searchVal}&select=${selectVal}`;
            startIdx = (currentPage - 1) * rowCnt;


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
                currentPage = currentPage === maxPage ? maxPage : (currentPage + 1);
                console.log(currentPage);
                makePage(maxPage);
                getList(url);
            });
            paginationElem.appendChild(aElem2);
        }
        const getListFromSortStatus = (elem, sortType) => {
            let url = makeUrl(sortType);
            if(elem.classList.contains('fa-angle-down')) {
                elem.classList.replace('fa-angle-down', 'fa-angle-up');
                url = url + 'typeNo=1';
            } else {
                elem.classList.replace('fa-angle-up', 'fa-angle-down');
                url = url + 'typeNo=2';
            }
            getList(url);
        }
        const makeUrl = (sortType) => {
            const searchVal = searchElem.value;
            const selectVal = selectElem.value;
            let url = `search=${searchVal}&select=${selectVal}`;
            if(sortType) {
                url = url + `&type=${sortType}&`;
            }
            return url;
        }

        selectElem.addEventListener('change', () => {
            getList(makeUrl());
        });

        searchElem.addEventListener('keyup', () => {
            getList(makeUrl());
        });

        seqElem.addEventListener('click', () => {
            getListFromSortStatus(seqElem, 'seq');
        });

        perfElem.addEventListener('click', () => {
            getListFromSortStatus(perfElem, 'performance');
        });

        innerPerfElem.addEventListener('click', () => {
            getListFromSortStatus(innerPerfElem, 'inner_gpu');
        });

        getList();
    }
}

// Cpu Detail
{
    const tableContainerElem = document.querySelector('#table-container');
    if(tableContainerElem) {
        let params = (new URL(document.location)).searchParams;
        const icpu = params.get('icpu');
        const baseUrl = `/ajax/admin/cpuDetail?icpu=${icpu}`;
        const paramUrl = '/ajax/admin/cpuDetail';
        const tableElem = document.querySelector('.mytable');
        const idxElem = document.querySelector('#idx');
        const modBtnElem = document.querySelector('#modBtn');
        const delBtnElem = document.querySelector('#delBtn');

        const updFetch = (param) => {
            fetch(paramUrl, {
                method : 'put',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(param)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                });
        }

        const getList = () => {
            fetch(baseUrl)
                .then(res => res.json())
                .then(data => {
                    setList(data);
                })
                .catch(e => {
                    console.error(e);
                });
        }

        const delList = () => {
            fetch(baseUrl, {
                method : 'delete'
            })
                .then(res => res.json())
                .then(data => {
                    location.href = '/admin/cpuList';
                })
                .catch(e => {
                    console.error(e);
                });
        }

        const setList = (data) => {
            const tbodyElem = document.createElement('tbody');
            tbodyElem.innerHTML = `
                <tr>
                    <th>CPU 명</th>
                    <td class="tnm">${data.nm}</td>
                </tr>
                <tr>
                    <th>성능수치</th>
                    <td class="tperf">${data.performance}</td>
                </tr>
                <tr>
                    <th>내장그래픽 성능수치</th>
                    <td class="tinner">${data.inner_gpu}</td>
                </tr>
                <tr>
                    <th>세대</th>
                    <td class="tseq">${data.seq}</td>
                </tr>
                <tr>
                    <th>브랜드</th>
                    <td class="tbrand">${data.brand}</td>
                </tr>
            `;
            tableElem.appendChild(tbodyElem);
            idxElem.innerText = data.icpu;
        }
        const makeInput = (elem, className) => {
            const inputElem = document.createElement('input');
            inputElem.type = 'text';
            inputElem.classList.add(className);
            inputElem.value = elem.innerText;
            elem.innerText = '';
            elem.appendChild(inputElem);
            return inputElem.value;
        }

        delBtnElem.addEventListener('click', () => {
            if(delBtnElem.innerText === '삭제') {
                if (!confirm(`${icpu}번 글을 삭제하시겠어요?`)) {
                    return;
                }
                delList();
            } else {
                tableElem.innerHTML = '';
                modBtnElem.innerText = '수정';
                modBtnElem.classList.replace('chk', 'mod');
                delBtnElem.innerText = '삭제';
                getList(baseUrl);
            }
        });

        modBtnElem.addEventListener('click', () => {
            const nmElem = document.querySelector('.tnm');
            const perfElem = document.querySelector('.tperf');
            const innerElem = document.querySelector('.tinner');
            const seqElem = document.querySelector('.tseq');
            const brandElem = document.querySelector('.tbrand');

            if(modBtnElem.classList.contains('mod')) {
                makeInput(nmElem, 'nm');
                makeInput(perfElem, 'performance');
                makeInput(innerElem, 'inner_gpu');
                makeInput(seqElem, 'seq');
                makeInput(brandElem, 'brand');
                modBtnElem.classList.replace('mod', 'chk');
                modBtnElem.innerText = '확인';
                delBtnElem.innerText = '취소';
            } else if(modBtnElem.classList.contains('chk')) {
                let nmVal = document.querySelector('.nm').value;
                let perfVal = document.querySelector('.performance').value;
                let innerVal = document.querySelector('.inner_gpu').value;
                let seqVal = document.querySelector('.seq').value;
                let brandVal = document.querySelector('.brand').value;
                delBtnElem.innerText = '삭제';

                let param = {
                    'icpu': icpu,
                    'nm' : nmVal,
                    'performance' : perfVal,
                    'inner_gpu' : innerVal,
                    'seq' : seqVal,
                    'brand' : brandVal
                };

                nmElem.innerText = nmVal;
                perfElem.innerText = perfVal;
                innerElem.innerText = innerVal;
                seqElem.innerText = seqVal;
                brandElem.innerText = brandVal;
                modBtnElem.classList.add('chk', 'mod');
                modBtnElem.innerText =  '수정';
                updFetch(param);
            }

        });

        getList();
    }
}