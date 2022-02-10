// 상품등록
{
    const detailElem = document.querySelector('#detail-list-container');
    const addDetailBtn = document.querySelector('#add-detail-btn');
    let delBtnnum = 1;
    addDetailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const divElem = document.createElement('div');
        divElem.innerHTML = `
                <div>
                    <span>색상 : </span>
                    <input type="text">
                </div>
                <div>
                    <span>하드디스크 용량 : </span>
                    <input type="text">
                </div>
                <div>
                    <span>SSD 용량 : </span>
                    <input type="text">
                </div>
                <div>
                    <span>가격 : </span>
                    <input type="text">
                </div>
                <div>
                    <span>재고 : </span>
                    <input type="text">
                </div>
                <label>
                    <span>대표이미지 설정 : </span>
                    예<input type="radio" value="Y">
                    아니오<input type="radio" value="N" checked>
                </label>
                <div>
                    <span>할인 : </span>
                    <input type="text">
                </div>
                <div>
                    <span>이미지 : </span>
                    <input type="file">
                    <input type="button" value="삭제하기" id="delBtn${delBtnnum}">
                </div>
        `;
        detailElem.appendChild(divElem);

        const delBtn = document.querySelector(`#delBtn${delBtnnum}`);
        delBtn.addEventListener('click', (e) => {
            e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
        });
        delBtnnum += 1;
    });
}