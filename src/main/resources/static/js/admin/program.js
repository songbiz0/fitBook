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
                    <input type="text" class="requred_cpu">
                    <div class="ui basic label">
                        권장 CPU
                    </div>
                </div>
                <div class="ui right labeled input">
                    <input type="text" class="requred_gpu">
                    <div class="ui basic label">
                        권장 GPU
                    </div>
                </div>
                <div class="ui right labeled input">
                    <input type="text" class="requred_ram">
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
    const url = '/ajax/admin/programSearch';
    const getList = (url) => {
        fetch(url)
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
        const table = document.querySelector('table');
        const isTbody = table.querySelector('tbody');
        if(isTbody) {
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

    getList(url);
}