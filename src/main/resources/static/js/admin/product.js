{
    const detailListNodes = document.querySelector('#detail-list-container').childNodes;
    const detailList = document.querySelector('#detail-list-container');
    detailList.insertBefore(detailListNodes[2], detailListNodes[0]);
    detailList.insertBefore(detailListNodes[4], detailListNodes[0]);


    const detailElem = document.querySelector('#detail-list-container');
    const addDetailBtn = document.querySelector('#add-detail-btn');
    let delBtnnum = 2;
    let repre = 1;

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
                <div>
                    <span>할인 : </span>
                    <input type="text">
                </div>
                <div class="repre-div">
                    <span>이미지 : </span>
                    <input type="file">
                    <input type="button" value="삭제하기" id="delBtn${delBtnnum}">
                    <input type="button" value="test" id="repre${repre}">
                </div>
        `;

            detailElem.appendChild(divElem);

            if(repre === 1) {
                const fst_repre = document.querySelector('#detail-list-container');
                const fst_nodes = fst_repre.childNodes;
                const idx = fst_nodes.length-1;
                console.log('idx : ' + idx);
                for(let i=0; i<fst_nodes[idx].childNodes.length; i++) {
                    console.log('length : ' + fst_nodes[idx].childNodes.length);
                    if(fst_nodes[idx].childNodes[i].className !== '' && fst_nodes[idx].childNodes[i].className !== undefined) {
                        fst_nodes[idx].childNodes[i].childNodes[7].className = 'hidden';
                    }
                }
            }

            const repreElem = document.querySelector(`#repre${repre}`);
            repreElem.addEventListener('click', (e) => {
                const elem = e.target.parentNode.parentNode;
                let idx = 0;
                for(let i=0; i<detailList.childNodes.length; i++) {
                    if(detailList.childNodes[i].nodeName === 'DIV') {
                        idx++;
                    }
                }
                const appendIdx = detailList.childNodes.length - idx;
                detailList.insertBefore(elem, detailListNodes[appendIdx]);
                const list2 = document.querySelector('#detail-list-container');
                const nodes = list2.childNodes;
                for(let i=1; i<nodes.length; i++) {
                    if(nodes[i].nodeName === 'DIV') {
                        for(let y=0; y<nodes[i].childNodes.length; y++) {
                            if (nodes[i].childNodes[y].className !== '' && nodes[i].id === '') {
                                if(nodes[i].childNodes[y].nodeName === 'DIV') {
                                    if (i == appendIdx) {
                                        nodes[i].childNodes[y].childNodes[7].className = 'hidden';
                                    } else {
                                        nodes[i].childNodes[y].childNodes[7].className = '';
                                    }
                                }
                            }
                        }
                    }
                }
            })

            const delBtn = document.querySelector(`#delBtn${delBtnnum}`);
            delBtn.addEventListener('click', (e) => {
                e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
            });

            delBtnnum += 1;
            repre += 1;
        });
    }

    const list = [
        'color', 'hdd', 'ssd', 'price', 'stock', 'dc_rate', 'mfFile'
    ];

    const submitBtn = document.querySelector('#submitBtn');
    if(submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let nodes = document.querySelector('#detail-list-container').childNodes;
            const num = nodes.length;

            console.log('num : ' + num);
            let idx = 0;
            let nmIdx = 0;
            while (idx != num) {
                const productList = 'productList[' + nmIdx + '].';
                let forNum = 1;
                if (nodes[idx].nodeName === 'DIV' && nodes[idx].id === '') {
                    for (let i in list) {
                        const result = productList + list[i];
                        console.log('idx : ' + idx);
                        if (list[i] === 'isrep') {
                            nodes[idx].childNodes[forNum].childNodes[3].name = result;
                            nodes[idx].childNodes[forNum].childNodes[5].name = result;
                        } else {
                            nodes[idx].childNodes[forNum].childNodes[3].name = result;
                            console.log(result);
                        }
                        forNum = forNum + 2;
                    }
                    nmIdx++;
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