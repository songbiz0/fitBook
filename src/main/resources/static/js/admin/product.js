{
    const Productlist = document.querySelector('.product-master');
    if(Productlist) {
        const recordCount = 10; //리스트 수
        let currentPage = 1; //현재 페이지
        let maxPage = 1;
        const pagingCount = 10; //페이징 수
        const searchParams = new URL(window.location.href).searchParams;
        const product_master = searchParams.get('product_master');
        const pageContainer = document.querySelector('.page-container');
        const ulElem = pageContainer.querySelector('nav > ul')

        //리스트 정보 불러오기
        const myFetch = () => fetch(`/ajax/admin/product_master?currentPage=${currentPage}&recordCount=${recordCount}`)
            .then(res => res.json())
            .then(list => {
                selProductList(list);
            })
            .catch(e => {
                console.log(e);
            });

        const getMaxPageVal = () => fetch(`/ajax/admin/maxpage?product_master=${product_master}&recordCount=${recordCount}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.result);
                maxPage = data.result;
                makePaging();
            })

        getMaxPageVal();

        const selProductList = list => {
            const tbodyElem = Productlist.querySelector('table tbody')
            tbodyElem.innerHTML = null;
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
                trElem.addEventListener('click', e => {
                    location.href = `/admin/product_detail?iproduct=${item.iproduct}`
                });
            });
        }

        const makePagingItem = (val, cb) => {
            const liElem = document.createElement('li');
            liElem.className = 'active item'
            liElem.innerHTML = val;
            liElem.addEventListener('click', cb);
            ulElem.appendChild(liElem);

        }

        const makePaging = () => {
            ulElem.innerHTML = null;
            const calcPage = parseInt((currentPage - 1) / pagingCount);
            const startPage = (calcPage * pagingCount) + 1;
            const lastPage = (calcPage + 1) * pagingCount;

            if (startPage > 1) {
                makePagingItem('&lt;', () => {
                    currentPage = startPage - 1;
                    myFetch();
                    makePaging();
                });
            }

            for (let i = startPage; i <= (lastPage > maxPage ? maxPage : lastPage); i++) {
                makePagingItem(i, () => {
                    if (currentPage !== i) {
                        currentPage = i;
                    }
                });
            }

            if (maxPage > lastPage) {
                makePagingItem('&gt;', () => {
                    currentPage = lastPage + 1;
                    myFetch();
                    makePaging();
                });
            }


        }
        myFetch();
    }
}

{
    const detailList= document.querySelector('#detail-list-container');
    if(detailList) {
    const detailListNodes = detailList.querySelector('#detail-list-container').childNodes;
        const detailList = document.querySelector('#detail-list-container');
        const product_detail_list = document.querySelectorAll('.product-detail');


        const detailElem = document.querySelector('#detail-list-container');
        const addDetailBtn = document.querySelector('#add-detail-btn');

        const fileRemoveBtnArr = document.querySelectorAll('.file-remove-button');
        if (fileRemoveBtnArr) {
            fileRemoveBtnArr.forEach((item) => item.addEventListener('click', (e) => {
                e.target.closest('.inv-btm').querySelector('#mfFile').value = '';
            }));
        }

        if (addDetailBtn) {
            addDetailBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const divElem = document.createElement('div');
                divElem.className = 'product-detail';
                divElem.innerHTML = `
                <div class="inv-box">
                    <div class="inv-name">
                        <span>색상</span>
                        <span>:</span>
                    </div>
                    <input type="text" id="color">
                </div>
                <div class="inv-box">
                    <div class="inv-name">
                        <span>하드디스크 용량</span>
                        <span>:</span>
                    </div>
                    <input type="text" id="hdd">
                </div>
                <div class="inv-box">
                    <div class="inv-name">
                        <span>SSD 용량</span>
                        <span>:</span>
                    </div>
                    <input type="text" id="ssd">
                </div>
                <div class="inv-box">
                    <div class="inv-name">
                        <span>가격</span>
                        <span>:</span>
                    </div>
                    <input type="text" id="price">
                </div>
                <div class="inv-box">
                    <div class="inv-name">
                        <span>재고</span>
                        <span>:</span>
                    </div>
                    <input type="text" id="stock">
                </div>
                <div class="inv-box">
                    <div class="inv-name">
                        <span>할인</span>
                        <span>:</span>
                    </div>
                    <input type="text" id="dc_rate">
                </div>
                <div id="repre-div">
                    <div class="inv-name">
                        <span>이미지</span>
                        <span>:</span>
                    </div>
                    <div class="inv-btm">
                        <div class="file-area">
                            <input type="file" id="mfFile">
                        </div>
                        <div class="file-set">
                            <input type="button" class="ui inverted red button file-remove-button" value="파일초기화">
                            <input type="button" class="ui inverted red button ml10 delBtn" value="삭제하기">
                            <input type="button" class="ui inverted blue button ml10 repre" value="대표옵션으로설정">
                        </div>
                    </div>
                </div>
                `;

                const insBeforeElem = document.querySelector('#ins-before-div');
                const repreElem = insBeforeElem.querySelector('.product-detail');
                if (!repreElem) {
                    const insBeforeElem = document.querySelector('#ins-before-div');
                    insBeforeElem.appendChild(divElem);
                    document.querySelector('.product-detail').querySelector('.repre').className = 'dis-none repre';
                } else {
                    detailElem.appendChild(divElem);
                }

                const fileRemoveBtnArr = document.querySelectorAll('.file-remove-button');
                if (fileRemoveBtnArr) {
                    fileRemoveBtnArr.forEach((item) => item.addEventListener('click', (e) => {
                        e.target.closest('.inv-btm').querySelector('#mfFile').value = '';
                    }));
                }

                const detail_list = document.querySelectorAll('.repre');
                detail_list.forEach(item => item.addEventListener('click', (e) => {
                    const thisElem = e.target.closest('.product-detail');
                    const thisRepreBtn = thisElem.querySelector('.repre');

                    const beforeElem = document.querySelector('#ins-before-div');
                    const beforeBtn = beforeElem.querySelector('.repre');

                    const detailListContainer = document.querySelector('#detail-list-container');
                    const repreElem = beforeElem.querySelector('.product-detail');

                    beforeBtn.className = 'ui inverted blue button ml10 repre';
                    thisRepreBtn.className = 'dis-none repre';
                    console.log(thisRepreBtn);


                    detailListContainer.appendChild(repreElem);

                    const insElem = document.querySelector('#ins-before-div');

                    insElem.appendChild(thisElem);
                }));

                const delBtnElemArr = document.querySelectorAll('.delBtn');
                delBtnElemArr.forEach((item) => item.addEventListener('click', (e) => {
                    const insBeforeDivElem = document.querySelector('#ins-before-div');
                    const repreDivElem = insBeforeDivElem.querySelector('.product-detail');
                    const thisDivElem = e.target.closest('.product-detail');

                    if (thisDivElem === repreDivElem) {
                        thisDivElem.remove();
                        const productDetailArr = document.querySelectorAll('.product-detail');
                        const toBeRepreDivElem = productDetailArr[0];
                        const repreBtn = toBeRepreDivElem.querySelector('.repre');
                        repreBtn.className = 'dis-none repre';
                        insBeforeDivElem.appendChild(productDetailArr[0]);
                    }
                }))
            });
        }

        const list = [
            'color', 'hdd', 'ssd', 'price', 'stock', 'dc_rate', 'mfFile'
        ];

        const submitBtn = document.querySelector('#submitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const submitBeforeList = document.querySelectorAll('.product-detail');

                let num = 0;
                submitBeforeList.forEach(item => {
                    let forNo = 0;
                    for (let i in list) {
                        const dbName = list[forNo];
                        const result = 'productList[' + num + '].' + dbName;
                        item.querySelector(`#${dbName}`).name = result;
                        forNo++;
                    }
                    num++;
                });
                const frmElem = document.querySelector('#frm');
                frmElem.submit();
            });
        }
    }
}

