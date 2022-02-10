// 상품등록
{
    const detailElem = document.querySelector('#detail-list-container');
    const addDetailBtn = document.querySelector('#add-detail-btn');
    let delBtnnum = 1;
    addDetailBtn.addEventListener('click', (e)=>{
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
        delBtn.addEventListener('click', (e)=>{
            e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
        });
        delBtnnum += 1;
    });
// 상품등록
{
    const addBtn = document.querySelector('#add-detail-btn');
    const detailContainer = document.querySelector('#detail-container');
    const copyDetail = detailContainer.querySelector('#copy-detail');

    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('asd');
        detailContainer.appendChild(copyDetail);
    });
}
    const list = [
        'color', 'hdd', 'ssd', 'price', 'stock', 'isrep', 'dc_rate', 'mfFile'
    ];

    const submitBtn = document.querySelector('#submitBtn');
    submitBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        let nodes = document.querySelector('#detail-list-container').childNodes;
        const num = nodes.length;

        console.log('num : ' + num);
        let idx = 1;
        while(idx != num) {
            console.log('idx: ' + idx);
            const productList = 'productList[' + idx + '].';
            let forNum = 1;
            for(let i in list) {
                console.log(forNum);
                const result = productList + list[i];
                if(list[i] === 'isrep') {
                    nodes[idx].childNodes[forNum].childNodes[3].name = result;
                    nodes[idx].childNodes[forNum].childNodes[5].name = result;
                    forNum = forNum + 2;
                } else {
                    nodes[idx].childNodes[forNum].childNodes[3].name = result;
                    forNum = forNum + 2;
                    console.log(result);
                }
            }
            idx++;
        }
        const frmElem = document.querySelector('#frm');
        frmElem.submit();
    })
}