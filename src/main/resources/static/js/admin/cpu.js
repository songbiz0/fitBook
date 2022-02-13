{
    const cpuContainer = document.querySelector('.cpu-enrollment-container');

    const addBtn = document.querySelector('#addBtn');
    const frmBtn = document.querySelector('#frmBtn');
    const list = [
        'nm', 'performance', 'inner_gpu', 'seq', 'brand'
    ];

    frmBtn.addEventListener('click', (e) => {
        const cpuArr = document.querySelectorAll('.cpu');
        let forNo = 0;
        cpuArr.forEach((item) => {
            for(let i in list) {
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