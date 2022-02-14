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
            <div>
                <input type="text" placeholder="GPU명" class="nm">
            </div>
            <div>
                <input type="text" placeholder="성능수치" class="performance">
            </div>
            <div>
                <input type="text" placeholder="세대" class="seq">
            </div>
            <div>
                <input type="text" placeholder="브랜드" class="brand">
                <input type="button" value="삭제하기" class="delBtn">
            </div>
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

        seq.addEventListener('click', () => {
            const seqElem = document.querySelector('#seq');
            if(seqElem.classList.contains('fa-angle-up')) {
                seqElem.classList.remove('fa-angle-up');
                seqElem.classList.add('fa-angle-down');
                //TODO 오름차순
            } else {
                seqElem.classList.remove('fa-angle-down');
                seqElem.classList.add('fa-angle-up');
                // TODO 내림차순
            }
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