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
            <div>
                <input type="text" placeholder="CPU명" class="nm">
            </div>
            <div>
                <input type="text" placeholder="성능수치" class="performance">
            </div>
            <div>
                <input type="text" placeholder="내장그래픽 성능수치" class="inner_gpu">
            </div>
            <div>
                <input type="text" placeholder="세대" class="seq">
            </div>
            <div>
                <input type="text" placeholder="브랜드" class="brand">
                <input type="button" value="삭제하기" class="delBtn">
            </div>
        `;
        const cpuContainer = document.querySelector('.cpu-enrollment-container');
        cpuContainer.appendChild(cpuElem);

        const delBtn = document.querySelectorAll('.delBtn');
        delBtn.forEach((item) => item.addEventListener('click', (e) => {
            e.target.closest('.cpu').remove();
        }));
    });
}