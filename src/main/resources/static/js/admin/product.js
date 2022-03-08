// 상품 목록 ----------------------------------------------------------------------------------[start]
{
    const Productlist = document.querySelector('.product-master');
    if(Productlist) {
        const recordCount = 2; //리스트 수
        let currentPage = 1; //현재 페이지
        let maxPage = 1;
        const pagingCount = 10; //페이징 수
        const searchParams = new URL(window.location.href).searchParams;
        const product_master = searchParams.get('product_master');
        const pageContainer = document.querySelector('.page-container');
        const ulElem = pageContainer.querySelector('div')
        let url = '/ajax/admin/product_master'; //search
        const searchElem = document.querySelector('#searchText');
        const searchBth = document.querySelector("#searchEvent");

        const getList = () => fetch(`/ajax/admin/product_master?currentPage=${currentPage}&recordCount=${recordCount}`)
            .then(res => res.json())
            .then(list => {
                selProductList(list);

            })
            .catch(e => {
                console.log(e);
            });


        const getMaxPageVal = () =>
            fetch(`/ajax/admin/maxpage?recordCount=${recordCount}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.result);
                maxPage = data.result;
                makePaging();
            });

        getMaxPageVal();

        const selProductList = list => {
            const tbodyElem = Productlist.querySelector('table tbody')
            tbodyElem.innerHTML = null;
            list.forEach(item => {
                const trElem = document.createElement('tr')
                trElem.classList.add('cspointer');
                tbodyElem.appendChild(trElem);
                // const locale = item.master_total.toLocaleString();
                // const month_total = item.month_total.toLocaleString();
                trElem.innerHTML = `
            <td>${item.num}</td>
            <td>${item.product_code}</td>
            <td>${item.nm}<img class="w70 h50" src="/imgPath/products/detail/${item.idetail}/${item.img}"></td>
            <td>${item.brand}</td>
            <td>${item.stock} EA</td>
            <td>${item.month_total}원</td>
            <td>${item.master_total}원</td>
            <td>${item.rating} / ${item.ratingCount}</td>
            `;
                trElem.addEventListener('click', e => {
                    location.href = `/admin/product_master_detail?iproduct=${item.iproduct}`
                });

            });
        };

        const searchList = (searchUrl, cur) => {
            const resultUrl = searchUrl + '&currentPage=' + cur;
            fetch(resultUrl)
                .then(res => res.json())
                .then(data => {
                    searchPageVal();
                    selProductList(data);
                })
                .catch(e => {
                    console.error(e);
                });
        }

        const searchPageVal = () => {
            const searchText = document.querySelector('#searchText').value;
            const select = document.querySelector('#select').value;
            const searchPage =  `/ajax/admin/maxpage?search=${searchText}&select=${select}&recordCount=${recordCount}`;
            console.log(searchPage);
            fetch(searchPage)
                .then(res => res.json())
                .then(data => {
                    maxPage = data.result;
                    searchMakePaging(maxPage);
                });
        }

        searchBth.addEventListener('click', () => {
            currentPage = 1;
           const searchText = document.querySelector('#searchText').value;
           const select = document.querySelector('#select').value;
           const searchUrl = url + `?search=${searchText}&select=${select}&recordCount=${recordCount}`;
           const searchPage =  `/ajax/admin/maxpage?search=${searchText}&select=${select}&recordCount=${recordCount}`;

            searchList(searchUrl, currentPage);
            searchPageVal(searchPage);
        });

        const searchMakePaging = (maxPage) => {
            ulElem.innerHTML = null;

            const calcPage = parseInt((currentPage - 1) / pagingCount);
            const startPage = (calcPage * pagingCount) + 1;
            const lastPage = (calcPage + 1) * pagingCount;

            const searchText = document.querySelector('#searchText').value;
            const select = document.querySelector('#select').value;
            const searchUrl = url + `?search=${searchText}&select=${select}&recordCount=${recordCount}`;
            const searchPage =  `/ajax/admin/maxpage?search=${searchText}&select=${select}&recordCount=${recordCount}`;

            const liElem1 = document.createElement('li');
            ulElem.appendChild(liElem1);
            liElem1.classList.add('item');
            liElem1.innerHTML = '&lt;';
            liElem1.addEventListener('click', e => {
                currentPage = (currentPage) === 1 ? 1 : (currentPage - 1);
                searchList(searchUrl, currentPage);
            });


            for (let i = startPage; i <= (lastPage > maxPage ? maxPage : lastPage); i++) {
                const liElem = document.createElement('li');
                if(currentPage === i) {
                    liElem.classList.add('active');
                }
                ulElem.appendChild(liElem);
                liElem.classList.add('item');
                liElem.innerText = i;
                liElem.addEventListener('click' , e =>{
                    currentPage = i;
                    searchList(searchUrl, currentPage);
                });
            }

            const liElem2 = document.createElement('li');
            ulElem.appendChild(liElem2);
            liElem2.classList.add('item');
            liElem2.innerHTML = '&gt;';
            liElem2.addEventListener('click' , e => {
                currentPage = (currentPage) === maxPage ? maxPage : (currentPage + 1);
                searchList(searchUrl, currentPage);
            });

        }



//----------------------------------------------------------------------------------------------------------------------
        const makePaging = () => {
            ulElem.innerHTML = null;
            const calcPage = parseInt((currentPage - 1) / pagingCount);
            const startPage = (calcPage * pagingCount) + 1;
            const lastPage = (calcPage + 1) * pagingCount;



            const liElem1 = document.createElement('li');
            ulElem.appendChild(liElem1);
            liElem1.classList.add('item');
            liElem1.innerHTML = '&lt;';
            liElem1.addEventListener('click', e => {
                currentPage = (currentPage) === 1 ? 1 : (currentPage - 1);
                getList();
                makePaging();
            });


            for (let i = startPage; i <= (lastPage > maxPage ? maxPage : lastPage); i++) {
                const liElem = document.createElement('li');
                if(currentPage === i) {
                    liElem.classList.add('active');
                }
                ulElem.appendChild(liElem);
                liElem.classList.add('item');
                liElem.innerText = i;
                liElem.addEventListener('click' , e =>{
                   if(currentPage !== i){
                       currentPage = i;
                       getList();
                       makePaging();
                   }
                });
            }

            const liElem2 = document.createElement('li');
            ulElem.appendChild(liElem2);
            liElem2.classList.add('item');
            liElem2.innerHTML = '&gt;';
            liElem2.addEventListener('click' , e => {
                currentPage = (currentPage) === maxPage ? maxPage : (currentPage + 1);
                getList();
                makePaging();
            });

        }
        getList();
    }
}
// 상품등록--------------------------------------------------------------------------------------------------------------[start]
{
    const insProductElem = document.querySelector('.ins-product');
    if(insProductElem) {
        // master
        const nmRegex = /^([a-zA-Z가-힣ㄱ-ㅎ0-9\s.\-_+=/()<>,.';`~!@#$%^&*]{1,100})$/;
        const codeRegex = /^([a-zA-Z0-9\-\s.]{1,100})$/;
        const rdtRegex = /^([0-9\-]{1,30})$/;
        const ramRegex = /^([0-9]{1,10})$/;
        const sizeRegex = /^[0-9]+(.[0-9]+)?$/;
        const weigthRegex = /^[0-9]+(.[0-9]+)?$/;
        const brandRegex = /^([a-zA-Z가-힣ㄱ-ㅎ0-9\s]{1,20})$/;
        const osRegex = /^([a-zA-Z가-힣0-9\s]{1,20})$/;
        const battryRegex = /^([0-9]{1,10})$/;

        // detail
        const colorRegex = /^([a-zA-Z가-힣0-9\s]{1,20})$/;
        const hddRegex = /^([0-9]{1,10})$/;
        const ssdRegex = /^([0-9]{1,10})$/;
        const priceRegex = /^([0-9]{1,10})$/;
        const stockRegex = /^([0-9]{1,10})$/;
        const dc_rateRegex = /^([0-9]{1,10})$/;

        const getMasterInnerGpuFromCpu = () => {
            const iCpuVal = document.querySelector('.icpu').value;
            const selectIgpuElem = document.querySelector('.igpu');
            const igpuOption = document.createElement('option');
            fetch(`/ajax/admin/getMasterInnerGpu?icpu=${iCpuVal}`)
                .then(res => res.json())
                .then(data => {
                    selectIgpuElem.innerHTML = '';
                    igpuOption.value = data.igpu;
                    igpuOption.innerText = data.gpuNm;
                    selectIgpuElem.appendChild(igpuOption);
                })
                .catch(e => {
                    selectIgpuElem.innerHTML = '';
                    igpuOption.value = '';
                    igpuOption.innerText = '';
                    selectIgpuElem.appendChild(igpuOption);
                    console.error(e);
                });
        }
        const selGpu = () => {
            fetch('/ajax/admin/selGpu')
                .then(res => res.json())
                .then(data => {
                    const selectIgpuElem = document.querySelector('.igpu');
                    data.forEach(item => {
                        const gpuOption = document.createElement('option');
                        gpuOption.value = item.igpu;
                        gpuOption.innerText = item.nm;
                        selectIgpuElem.appendChild(gpuOption);
                    })
                })
        }

        const detailList = document.querySelector('#detail-list-container');
        if (detailList) {
            const isInnerGpuBtnElem = document.querySelector('.is_inner_gpu');
            const selectGpuElem = document.querySelector('.igpu');
            const selectCpuElem = document.querySelector('.icpu');

            selectCpuElem.addEventListener('change', () => {
                if (isInnerGpuBtnElem.checked) {
                    getMasterInnerGpuFromCpu();
                }
            });

            isInnerGpuBtnElem.addEventListener('change', () => {
                selectGpuElem.innerHTML = '';
                if (isInnerGpuBtnElem.checked) {
                    getMasterInnerGpuFromCpu();
                } else {
                    selGpu();
                }
            });

            const isMacBook = document.querySelector('#mac');
            isMacBook.addEventListener('change', () => {
                const osList = ['Window 11', 'Window 10', 'FreeDOS'];
                const brand = document.querySelector('.brand');
                const os = document.querySelector('.os');
                const osOption = document.createElement('option');
                if (isMacBook.checked) {
                    brand.value = 'APPLE';
                    brand.readOnly = true;
                    os.innerHTML = '';
                    osOption.value = 'Mac OS';
                    osOption.innerText = 'Mac OS';
                    os.appendChild(osOption);
                } else {
                    brand.value = '';
                    brand.readOnly = false;
                    os.innerHTML = '';
                    for (let i = 0; i < osList.length; i++) {
                        const osOption = document.createElement('option');
                        const val = osList[i];
                        osOption.value = val;
                        osOption.innerText = val;
                        os.appendChild(osOption);
                    }
                }
            });

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
                        <input type="text" class="color">
                    </div>
                    <div class="inv-box">
                        <div class="inv-name">
                            <span>하드디스크 용량</span>
                            <span>:</span>
                        </div>
                        <input type="text" class="hdd">
                    </div>
                    <div class="inv-box">
                        <div class="inv-name">
                            <span>SSD 용량</span>
                            <span>:</span>
                        </div>
                        <input type="text" class="ssd">
                    </div>
                    <div class="inv-box">
                        <div class="inv-name">
                            <span>가격</span>
                            <span>:</span>
                        </div>
                        <input type="text" class="price">
                    </div>
                    <div class="inv-box">
                        <div class="inv-name">
                            <span>재고</span>
                            <span>:</span>
                        </div>
                        <input type="text" class="stock">
                    </div>
                    <div class="inv-box">
                        <div class="inv-name">
                            <span>할인</span>
                            <span>:</span>
                        </div>
                        <input type="text" class="dc_rate">
                    </div>
                    <div id="repre-div">
                        <div class="inv-name">
                            <span>이미지</span>
                            <span>:</span>
                        </div>
                        <div class="inv-btm">
                            <div class="file-area">
                                <input type="file" class="mfFile">
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

                    const fileRemoveBtn = divElem.querySelector('.file-remove-button');
                    if (fileRemoveBtn) {
                        fileRemoveBtn.addEventListener('click', (e) => {
                            e.target.closest('.inv-btm').querySelector('.mfFile').value = '';
                        });
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


                        if (thisDivElem === repreDivElem || (detailElem.children.length === 2)) {
                            thisDivElem.remove();
                            const productDetailArr = document.querySelectorAll('.product-detail');
                            const toBeRepreDivElem = productDetailArr[0];
                            const repreBtn = toBeRepreDivElem.querySelector('.repre');
                            repreBtn.className = 'dis-none repre';
                            insBeforeDivElem.appendChild(productDetailArr[0]);
                        }
                        thisDivElem.remove();
                    }))
                });
                addDetailBtn.click();

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

        const list = [
            'color', 'hdd', 'ssd', 'price', 'stock', 'dc_rate', 'mfFile'
        ];

        const masterList = [
            'nm', 'code', 'rdt', 'ram', 'icpu', 'igpu', 'size', 'weight', 'brand', 'os', 'img', 'battery'
        ]

        const makeErrBox = (item, msg) => {
            $('body')
                .toast({
                    class: 'error',
                    position: 'bottom right',
                    message: msg
                });
            item.classList.add('err-red');
            setTimeout(function () {
                item.classList.remove('err-red');
            }, 3000);
        }

        const frmChk = (type, item) => {
            let result = 0;
            let cnt = 0;
            if (type === 'detail') {
                for (let i in list) {
                    const elem = item.querySelector(`.${list[i]}`);
                    const val = elem.value;
                    const length = val.length;
                    if (list[i] === 'color' && !colorRegex.test(val)) {
                        console.log('color');
                        makeErrBox(elem, '색상: 한글/영문 조합으로 20글자 이내로 작성해 주세요.');
                    } else if (list[i] === 'hdd' && !hddRegex.test(val)) {
                        console.log('hdd');
                        makeErrBox(elem, 'HDD: 숫자 10자리 이내로 작성해 주세요.');
                    } else if (list[i] === 'ssd' && !ssdRegex.test(val)) {
                        console.log('ssd');
                        makeErrBox(elem, 'SSD: 숫자 10자리 이내로 작성해 주세요.');
                    } else if (list[i] === 'price' && !priceRegex.test(val)) {
                        console.log('price');
                        makeErrBox(elem, '가격: 숫자 10자리 이내로 작성해 주세요.');
                    } else if (list[i] === 'stock' && !stockRegex.test(val)) {
                        console.log('stock');
                        makeErrBox(elem, '재고: 숫자 10자리 이내로 작성해 주세요.');
                    } else if (list[i] === 'dc_rate' && !dc_rateRegex.test(val)) {
                        makeErrBox(elem, '할인율: 0~100 (% 제외)로 작성해 주세요.');
                        console.log('dc_rate');
                    } else if (list[i] === 'mfFile' && (length < 1)) {
                        makeErrBox(elem, '이미지: 이미지를 추가해 주세요.');
                        console.log('mfFile');
                    } else {
                        cnt++;
                    }
                }
            } else if (type === 'master') {
                for (let i in masterList) {
                    const elem = item.querySelector(`.${masterList[i]}`);
                    const val = elem.value;
                    const length = val.length;
                    if (masterList[i] === 'nm' && !nmRegex.test(val)) {
                        console.log('nm');
                        makeErrBox(elem, '이름: 영어/한글/숫자/특수문자를 조합해서 100자 이내로 작성해 주세요.');
                    } else if (masterList[i] === 'code' && !codeRegex.test(val)) {
                        makeErrBox(elem, '상품코드: 영어/숫자를 조합해서 100자 이내로 작성해 주세요.')
                        console.log('code');
                    } else if (masterList[i] === 'rdt' && !rdtRegex.test(val)) {
                        makeErrBox(elem, '날짜: 날짜를 빠짐없이 입력해 주세요.');
                        console.log('rdt');
                    } else if (masterList[i] === 'ram' && !ramRegex.test(val)) {
                        makeErrBox(elem, 'RAM : 숫자 10자리 이하로 작성해 주세요.');
                        console.log('ram');
                    } else if (masterList[i] === 'icpu' && length < 1) {
                        makeErrBox(elem, 'CPU : 숫자 10자리 이하로 작성해 주세요.');
                        console.log('icpu');
                    } else if (masterList[i] === 'igpu' && length < 1) {
                        makeErrBox(elem, 'GPU : 숫자 10자리 이하로 작성해 주세요.');
                        console.log('igpu');
                    } else if (masterList[i] === 'size' && !sizeRegex.test(val)) {
                        makeErrBox(elem, '사이즈 : 실수, 정수를 조합해서 10자리 이하로 작성해 주세요.');
                        console.log('size');
                    } else if (masterList[i] === 'weight' && !weigthRegex.test(val)) {
                        makeErrBox(elem, '무게 : 실수, 정수를 조합해서 10자리 이하로 작성해 주세요.');
                        console.log('weight');
                    } else if (masterList[i] === 'brand' && !brandRegex.test(val)) {
                        makeErrBox(elem, '브랜드 : 영문, 한글을 조합해서 20자 이하로 작성해 주세요.');
                        console.log('brand');
                    } else if (masterList[i] === 'os' && !osRegex.test(val)) {
                        makeErrBox(elem, 'OS : 영문, 한글, 숫자를 조합해서 20자 이하로 작성해 주세요.');
                        console.log('os');
                    } else if (masterList[i] === 'battery' && !battryRegex.test(val)) {
                        makeErrBox(elem, '배터리 : 숫자 10자리 이하로 작성해 주세요.');
                        console.log('battry');
                    } else if (masterList[i] === 'img') {
                        cnt++;
                    } else {
                        cnt++;
                    }
                }
            }
            if (list.length === cnt || masterList.length === cnt) {
                result++;
            }
            return result;

        }

        const isInnerGpuBtnElem = document.querySelector('.is_inner_gpu');
        isInnerGpuBtnElem.addEventListener('click', () => {
            if (isInnerGpuBtnElem.checked) {

            } else {

            }
        });

        const submitBtn = document.querySelector('#submitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const submitBeforeList = document.querySelectorAll('.product-detail');
                const frmDivElemList = document.querySelectorAll('.frmDiv');

                let cnt = 0;
                let result = submitBeforeList.length + frmDivElemList.length;

                frmDivElemList.forEach(item => {
                    cnt += frmChk('master', item);
                })

                let num = 0;
                submitBeforeList.forEach(item => {

                    cnt += frmChk('detail', item);

                    let forNo = 0;
                    for (let i in list) {
                        const dbName = list[forNo];

                        const result = 'productList[' + num + '].' + dbName;
                        item.querySelector(`.${dbName}`).name = result;
                        forNo++;
                    }
                    num++;
                });

                if (result === cnt) {
                    const frmElem = document.querySelector('#frm');
                    frmElem.submit();
                }
            });
        }
    }
}

