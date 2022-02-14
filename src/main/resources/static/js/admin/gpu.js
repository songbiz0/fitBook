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
        let url = '/ajax/admin/gpuSearch';
        const seq = document.querySelector('#seq');
        const perf = document.querySelector('#perf');
        const searchBtn = document.querySelector('#searchBtn');

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
        })

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
        })

        searchBtn.addEventListener('click', () => {
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
                    <td>${item.seq}</td>
                    <td>${item.brand}</td>
                `;
                tbody.appendChild(tr);
                table.appendChild(tbody);
            })
        }

        const removeList = () => {
            const tbody = document.querySelector('table tbody');
            tbody.remove();
        }

        getList(url);

    }
}