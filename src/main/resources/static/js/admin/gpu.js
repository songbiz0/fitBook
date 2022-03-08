// gpu insert
{
    const nmRegex = /^([a-zA-Z가-힣ㄱ-ㅎ0-9\s-_=+]{1,20})$/;
    const perfRegex = /^([0-9]{1,10})$/;
    const seqRegex = /^([0-9]{1,10})$/;
    const brandRegex = /^([a-zA-Z가-힣ㄱ-ㅎ0-9\s-_=+]{1,20})$/;

    const regexObject = {
        nm : nmRegex,
        performance : perfRegex,
        seq : seqRegex,
        brand : brandRegex
    }


    const addBtn = document.querySelector('#addBtn');
    if(addBtn) {
        const frmBtn = document.querySelector('#frmBtn');
        const makeToast = (elem, msg) => {
            $('body')
                .toast({
                    class: 'error',
                    position: 'top right',
                    message: msg
                });
            elem.classList.add('err-red');
            setTimeout(function() {
                elem.classList.remove('err-red');
            }, 3000);
        }
        const list = [
            'nm', 'performance', 'seq', 'brand', 'is_inner_gpu'
        ];

        frmBtn.addEventListener('click', (e) => {
            const gpuArr = document.querySelectorAll('.gpu');
            let forNo = 0;
            let bool = false;
            gpuArr.forEach((item) => {
                e.preventDefault();
                for (let i in list) {
                    const searchId = list[i];
                    const result = 'gpuList[' + forNo + '].' + searchId;
                    const elem = item.querySelector(`.${searchId}`);
                    elem.name = result;
                    const val = elem.value;
                    for(let i in regexObject) {
                        if(i === searchId) {
                            if(!regexObject[i].test(val)) {
                                elem.parentNode.classList.add('error');
                                if(i === 'nm' || i === 'brand') {
                                    makeToast(elem, '20글자 이내로 작성해 주세요.');
                                } else {
                                    makeToast(elem, '10자리 이내의 숫자로 작성해 주세요.');
                                }
                                bool = false;
                                return;
                            } else {
                                elem.parentNode.classList.remove('error');
                                console.log('asd');
                                bool = true;
                            }
                        }
                    }
                }
                forNo++;
            });
            if(bool) {
                const gpuFrm = document.querySelector('#gpuFrm');
                gpuFrm.submit();
            }
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
                <div class="ui toggle checkbox">
                    <input type="checkbox" class="is_inner_gpu" value="Y">
                    <label>내장그래픽</label>
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
        let rowCnt = 10;
        let currentPage = 1;
        let pageCnt = 10;
        let paginationElem = document.querySelector('.pagination');

        const url = '/ajax/admin/gpuSearch?';
        const seq = document.querySelector('#seq');
        const perf = document.querySelector('#perf');
        const searchElem = document.querySelector('#searchText');
        const selectElem = document.querySelector('#select');
        // const delChkBoxElem = document.querySelector('#delChkBox');
        // const delBtnElem = document.querySelector('#delBtn');
        //
        // delBtnElem.addEventListener('click', () => {
        //     const delChkboxArr = document.querySelectorAll('.delChk');
        //     const list = [];
        //     const no = delChkboxArr.length;
        //     let delNo = 1;
        //     delChkboxArr.forEach(item => {
        //         if(item.checked) {
        //             const data = {'igpu' : item.value}
        //             list.push(data);
        //         }
        //         delNo++;
        //     });
        //     console.log(list);
        //     fetch('/ajax/admin/testDel', {
        //         method : 'post',
        //         headers : {'Content-Type' : 'application/json'},
        //         body : JSON.stringify(list)
        //     })
        //         .then(res => res.json())
        //         .then(data => {
        //             console.log(data);
        //         })
        //         .catch(e => {
        //             console.error(e);
        //         });
        // });
        //
        // delChkBoxElem.addEventListener('click', () => {
        //     const delChkBoxArr = document.querySelectorAll('.delChk');
        //     let chkCnt = 0;
        //     if(delChkBoxElem.checked) {
        //         delChkBoxArr.forEach(item => {
        //             item.checked = true;
        //             item.addEventListener('click', () => {
        //                 if(!item.checked) {
        //                     delChkBoxElem.checked = false;
        //                 } else {
        //                     delChkBoxArr.forEach(item => {
        //                         if (item.checked) {
        //                             chkCnt += 1;
        //                         }
        //                     });
        //                     if (chkCnt === delChkBoxArr.length) {
        //                         delChkBoxElem.checked = true;
        //                     }
        //                 }
        //                 chkCnt = 0;
        //             });
        //         });
        //     } else {
        //         delChkBoxArr.forEach(item => {
        //             item.checked = false;
        //         });
        //     }
        // });


        const getList = (addUrl) => {
            let resultUrl = url + `startIdx=${startIdx}&rowCnt=${rowCnt}`;
            if(addUrl) { resultUrl = resultUrl + `&` + addUrl; }
            console.log(resultUrl);
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
                // tr.classList.add('list-tr');
                tr.innerHTML = `
                    <td><a href="/admin/gpuDetail?igpu=${item.gpu}">${item.nm}</a></td>
                    <td>${item.performance}</td>
                    <td>${item.seq}</td>
                    <td>${item.brand}</td>
                `;
                tbody.appendChild(tr);
                table.appendChild(tbody);
                // tr.addEventListener('click', () => {
                //     location.href = `/admin/gpuDetail?igpu=${item.igpu}`;
                // });
            });
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
        });



        getMaxPage();
        getList();
    }
}

// gpu Detail
{
    const tableContainerElem = document.querySelector('#table-container');
    if(tableContainerElem) {
        const idx = document.querySelector('#idx');
        const tableElem = tableContainerElem.querySelector('.mytable');
        const modBtnElem = document.querySelector('#modBtn');
        const delBtnElem = document.querySelector('#delBtn');
        let params = (new URL(document.location)).searchParams;
        const igpu = params.get('igpu');
        const baseUrl = `/ajax/admin/gpuDetail?igpu=${igpu}`;

        const updFetch = (param) => {
            const updUrl = `/ajax/admin/gpuDetail`;
            console.log(param);
            fetch(updUrl, {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(param)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
                .catch(e => {
                    console.error(e);
                })

        }

        const setList = (data) => {
            const tBody = document.createElement('tbody');
            idx.innerText = (data.igpu);
            tBody.innerHTML = `
                <tr>
                    <th>GPU명</th>
                    <td colspan="3" class="tnm">${data.nm}</td>
                </tr>
                <tr>
                    <th>성능수치</th>
                    <td colspan="3" class="tperf">${data.performance}</td>
                </tr>
                <tr>
                    <th>세대</th>
                    <td colspan="3" class="tseq">${data.seq}</td>
                </tr>
                <tr>
                    <th>브랜드</th>
                    <td colspan="3" class="tbrand">${data.brand}</td>
                </tr>
            `;
            tableElem.appendChild(tBody);
        }

        fetch(baseUrl)
            .then(res => res.json())
            .then(data => {
                setList(data);
            })
            .catch(e => {
                console.error(e);
            });

        const makeInput = (elem, className) => {
            const inputElem = document.createElement('input');
            inputElem.type = 'text';
            inputElem.classList.add(className);
            inputElem.value = elem.innerText;
            elem.innerText = '';
            elem.appendChild(inputElem);
            return inputElem.value;
        }

        modBtnElem.addEventListener('click', () => {
            const nmElem = document.querySelector('.tnm');
            const perfElem = document.querySelector('.tperf');
            const seqElem = document.querySelector('.tseq');
            const brandElem = document.querySelector('.tbrand');

            if(modBtnElem.classList.contains('mod')) {
                makeInput(nmElem, 'nm');
                makeInput(perfElem, 'performance');
                makeInput(seqElem, 'seq');
                makeInput(brandElem, 'brand');
                modBtnElem.classList.replace('mod', 'chk');
                modBtnElem.innerText = '확인';
            } else if(modBtnElem.classList.contains('chk')) {
                let nmVal = document.querySelector('.nm').value;
                let perfVal = document.querySelector('.performance').value;
                let seqVal = document.querySelector('.seq').value;
                let brandVal = document.querySelector('.brand').value;

                console.log(nmVal);

                let param = {
                    'igpu': igpu,
                    'nm' : nmVal,
                    'performance' : perfVal,
                    'seq' : seqVal,
                    'brand' : brandVal
                };

                nmElem.innerText = nmVal;
                perfElem.innerText = perfVal;
                seqElem.innerText = seqVal;
                brandElem.innerText = brandVal;
                modBtnElem.classList.add('chk', 'mod');
                modBtnElem.innerText =  '수정';
                updFetch(param);
            }

        });

        delBtnElem.addEventListener('click', () => {
            if(!confirm(`${igpu}번 글을 삭제하시겠어요?`)) {
                return;
            }
            fetch(baseUrl, {
                method: 'delete'
            })
                .then(res => res.json())
                .then(data => {
                    location.href = '/admin/gpuList';
                })
                .catch(e => {
                    console.error(e);
                });
        });
    }
}
