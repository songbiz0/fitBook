// 프로그램 등록
{
    const addProgramBtn = document.querySelector('#addBtn');
    const program_enrollment_divElem = document.querySelector('.program_enrollment_div');
    const frmSmBtnElem = document.querySelector('#frmSmBtn');
    frmSmBtnElem.addEventListener('click', (e) => {
        e.preventDefault();

        const programArr = document.querySelectorAll('.program');
        const enrollmentDivElem = document.querySelector('.program_enrollment_div');
        const list = [
            'nm', 'required_cpu', 'required_gpu', 'required_ram', 'img'
        ];
        let forNo = 0;
        programArr.forEach((item) => {
            for(let z=0; z<list.length; z++) {
                const result = 'programList[' + forNo + '].' + list[z];
                const listResult = list[z];
                item.querySelector(`.${listResult}`).name = result;
            }
            forNo++;
        });
    });

    addProgramBtn.addEventListener('click', () => {
        const addDivElem = document.createElement('div');
        addDivElem.className = 'program'
        addDivElem.innerHTML = `
                <div>
                    <input type="text" class="nm">
                </div>
                <div>
                    <input type="text" class="required_cpu">
                </div>
                <div>
                    <input type="text" class="required_gpu">
                </div>
                <div>
                    <input type="text" class="required_ram">
                </div>
                <div>
                    <input type="file" class="img">
                    <input type="button" value="삭제하기" class="delBtn">
                </div>
        `;
        program_enrollment_divElem.appendChild(addDivElem);

        const delBtnElemArr = document.querySelectorAll('.delBtn');
        delBtnElemArr.forEach((item) => item.addEventListener('click', (e) => {
            e.target.closest('.program').remove();
        }));
    });

}