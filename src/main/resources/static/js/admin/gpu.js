{
    const gpuContainer = document.querySelector('.gpu-enrollment-container');

    const addBtn = document.querySelector('#addBtn');
    const frmBtn = document.querySelector('#frmBtn');
    const list = [
        'nm', 'performance', 'seq', 'brand'
    ];

    frmBtn.addEventListener('click', (e) => {
        const gpuArr = document.querySelectorAll('.gpu');
        let forNo = 0;
        gpuArr.forEach((item) => {
            for(let i in list) {
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