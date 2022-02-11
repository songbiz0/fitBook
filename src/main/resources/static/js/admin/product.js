{
    const detailElem = document.querySelector('#detail-list-container');
    const addDetailBtn = document.querySelector('#add-detail-btn');
    let delBtnnum = 1;
    if(addDetailBtn) {
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
                    예<input type="radio" value="Y" name="y">
                    아니오<input type="radio" value="N" name="y" checked>
                   
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

    const list = [
        'color', 'hdd', 'ssd', 'price', 'stock', 'isrep', 'dc_rate', 'mfFile'
    ];

    const submitBtn = document.querySelector('#submitBtn');
    if(submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let nodes = document.querySelector('#detail-list-container').childNodes;
            const num = nodes.length;

            console.log('num : ' + num);
            let idx = 1;
            while (idx != num) {
                console.log('idx: ' + idx);
                const productList = 'productList[' + idx + '].';
                let forNum = 1;
                for (let i in list) {
                    console.log(forNum);
                    const result = productList + list[i];
                    if (list[i] === 'isrep') {
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
        });
    }
}

{
    fetch('/ajax/admin/product_master')
        .then(res => res.json())
        .then(list => {
            selProductList(list);
        })
        .catch(e => {
            console.log(e);
        });
    const Productlist = document.querySelector('.product-master')

    const selProductList = list => {
        const tbodyElem = Productlist.querySelector('table tbody')
        list.forEach(item => {
            const trElem = document.createElement('tr')
            tbodyElem.appendChild(trElem);

            trElem.innerHTML = `
            <td><img class="w70 h50" src="/images/products/detail/${item.iproduct}/${item.img}"></td>
            <td>${item.iproduct}</td>
            <td>${item.product_code}</td>
            <td>${item.nm}</td>
            <td>${item.brand}</td>
            <td>${item.stock}</td>
            <td>${item.icpu}</td>
            <td>${item.igpu}</td>
            <td>${item.ram}</td>
            <td>${item.size}</td>
            <td>${item.weight}</td>
            <td>${item.os}</td>
            `;
        });
    }
}