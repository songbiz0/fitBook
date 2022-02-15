{
    // cpu insert
    const addBtn = document.querySelector('#addBtn');
    if(addBtn) {
        const frmBtn = document.querySelector('#frmBtn');
        const list = [
            'nm', 'performance', 'inner_gpu', 'seq', 'brand'
        ];

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
                    <input type="text" class="inner_gpu">
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
        let url = '/ajax/admin/cpuSearch';
        const seq = document.querySelector('#seq');
        const perf = document.querySelector('#perf');
        const inner_perf = document.querySelector('#inner_perf');
        const searchBtn = document.querySelector('#searchBtn');
        const searchElem = document.querySelector('#searchText');
        searchElem.addEventListener('keyup', () => {
            const searchElemValLength = document.querySelector('#searchText').value.length;
            if(searchElemValLength === 0) {
                getList(url);
            }
        });

        inner_perf.addEventListener('click', () => {
            const inner_perfElem = document.querySelector('#inner_perf');
            const searchText = document.querySelector('#searchText').value;
            const select = document.querySelector('#select').value;
            let resultUrl= '';
            if(inner_perf.classList.contains('fa-angle-up')) {
                inner_perfElem.classList.remove('fa-angle-up');
                inner_perfElem.classList.add('fa-angle-down');
                resultUrl = url + `?inner_perf=2&search=${searchText}&select=${select}`;
            } else {
                inner_perfElem.classList.remove('fa-angle-down');
                inner_perfElem.classList.add('fa-angle-up');
                resultUrl = url + `?inner_perf=1&search=${searchText}&select=${select}`;
            }
            getList(resultUrl);
        });

        perf.addEventListener('click', () => {
            const perfElem = document.querySelector('#perf');
            const searchText = document.querySelector('#searchText').value;
            const select = document.querySelector('#select').value;
            let resultUrl= '';
            if(perf.classList.contains('fa-angle-up')) {
                perfElem.classList.remove('fa-angle-up');
                perfElem.classList.add('fa-angle-down');
                resultUrl = url + `?perf=2&search=${searchText}&select=${select}`;
            } else {
                perfElem.classList.remove('fa-angle-down');
                perfElem.classList.add('fa-angle-up');
                resultUrl = url + `?perf=1&search=${searchText}&select=${select}`;
            }
            getList(resultUrl);
        });

        seq.addEventListener('click', () => {
            const seqElem = document.querySelector('#seq');
            const searchText = document.querySelector('#searchText').value;
            const select = document.querySelector('#select').value;
            let resultUrl= '';
            if(seqElem.classList.contains('fa-angle-up')) {
                seqElem.classList.remove('fa-angle-up');
                seqElem.classList.add('fa-angle-down');
                resultUrl = url + `?seq=2&search=${searchText}&select=${select}`;
            } else {
                seqElem.classList.remove('fa-angle-down');
                seqElem.classList.add('fa-angle-up');
                resultUrl = url + `?seq=1&search=${searchText}&select=${select}`;
            }
            getList(resultUrl);
        });

        searchElem.addEventListener('keyup', () => {
            const searchText = document.querySelector('#searchText').value;
            const select = document.querySelector('#select').value;
            const searchUrl = url + `?search=${searchText}&select=${select}`;
            getList(searchUrl);
        });

        const getList = (url) => {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setList(data);
                    console.log(data);
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
                    <td>${item.inner_gpu}</td>
                    <td>${item.seq}</td>
                    <td>${item.brand}</td>
                `;
                tbody.appendChild(tr);
                table.appendChild(tbody);
            })
        }

        getList(url);

    }
}