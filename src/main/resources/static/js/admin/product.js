// 상품 목록 ----------------------------------------------------------------------------------[start]
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
                trElem.classList.add('cspointer')
                const master_total = item.master_total.toLocaleString();
                const month_total = item.month_total.toLocaleString();
                const rating = item.rating.toFixed(1);
                trElem.innerHTML = `
            <td>${item.num}</td>
            <td>${item.product_code}</td>
            <td style="display: flex; ">
                <div>
                    <img class="w100 h100" src="/imgPath/products/detail/${item.idetail}/${item.img}">            
                </div>
                <div style="margin: auto">
                    ${item.nm}
                </div>
            </td>
            <td>${item.brand}</td>
            <td>${item.stock} EA</td>
            <td>${month_total}원</td>
             <td>${master_total}원</td>
            <td>
                <span>
                    <i class="star icon"></i><span>${rating} (${item.ratingCount})</span>
                </span>
            </td>
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
    const insProductFrmElem = document.querySelector('#ins-product-frm');
    if(insProductFrmElem) {
        const selCpuElem = document.querySelector('.icpu');
        const isInnerGpuElem = document.querySelector('.is_inner_gpu');

        selCpuElem.addEventListener('change', () => {
            if(isInnerGpuElem.checked) {
                selInnerGpu();
            }
        });

        const selInnerGpu = () => {
            const icpu = selCpuElem.value;
            const igpuElem = document.querySelector('.igpu');
            fetch(`/ajax/admin/getMasterInnerGpu?icpu=${icpu}`)
                .then(res => res.json())
                .then(data => {
                    igpuElem.innerHTML = '';
                    const option = document.createElement('option');
                    option.value = data.igpu;
                    option.text = data.gpuNm;
                    igpuElem.appendChild(option);
                })
                .catch(e => {
                    console.error(e);
                });
        }

        isInnerGpuElem.addEventListener('click', (e) => {
            const igpuElem = document.querySelector('.igpu');
            if(e.target.checked) {
                selInnerGpu();
            } else {
                fetch('/ajax/admin/selGpu')
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        igpuElem.innerHTML = '';
                        data.forEach(item => {
                            const option = document.createElement('option');
                            option.value = item.igpu;
                            option.text = item.nm;
                            igpuElem.appendChild(option);
                        });
                    })
                    .catch(e => {
                        console.error(e);
                    });
            }
        });

        const makeErrBox = (elem, msg) => {
            $('body')
                .toast({
                    class: 'error',
                    position: 'top right',
                    message: msg
                });
            elem.classList.add('err-red');
            setTimeout(function() {
                elem.classList.remove('err-red');
            }, 3000);
        }

        // master
        const nmRegex = /^([a-zA-Z가-힣ㄱ-ㅎ0-9\s.\-_+=/()<>,.';`~!@#$%^&*]{1,100})$/;
        const nmMsg = '상품명은 특수기호를 포함한 1~100자 이내로 작성해 주세요.'
        const codeRegex = /^([a-zA-Z0-9\-\s/!@#$%^&*()_=+?><,.]{1,100})$/;
        const codeMsg = '상품코드는 특수기호를 포함한 1~100자 이내로 작성해 주세요.'
        const rdtRegex = /^([0-9\-]{1,30})$/;
        const rdtMsg = '올바른 날짜를 선택해 주세요';
        const ramRegex = /^([0-9]{1,10})$/;
        const ramMsg = 'RAM은 1~10자리의 정수로 작성해 주세요.';
        const sizeRegex = /^[0-9]+(.[0-9]+)?$/;
        const sizeMsg = '사이즈는 정수, 실수로만 작성해 주세요.';
        const weightRegex = /^[0-9]+(.[0-9]+)?$/;
        const weightMsg = '무게는 정수, 실수로만 작성해 주세요.';
        const brandRegex = /^([a-zA-Z가-힣ㄱ-ㅎ0-9\s]{1,20})$/;
        const brandMsg = '브랜드는 1~20자 이내로 작성해 주세요.(숫자, 영어, 한글 가능)'
        const osRegex = /^([a-zA-Z가-힣0-9\s]{1,20})$/;
        const osMsg = 'OS를 선택해 주세요.';
        const batteryRegex = /^([0-9]{1,10})$/;
        const batteryMsg = '배터리는 정수 10자리 이내로 작성해 주세요.';

        const masterChk = (elem, type) => {
            const value = elem.value;
            if(type === 'nm') {
                if(!nmRegex.test(value)) {
                    makeErrBox(elem, nmMsg);
                    return false;
                }
            }
            if(type === 'code') {
                if(!codeRegex.test(value)) {
                    makeErrBox(elem, codeMsg);
                    return false;
                }
            }
            if(type === 'rdt') {
                if(!rdtRegex.test(value)) {
                    makeErrBox(elem, rdtMsg);
                    return false;
                }
            }
            if(type === 'ram') {
                if(!ramRegex.test(value)) {
                    makeErrBox(elem, ramMsg);
                    return false;
                }
            }
            if(type === 'size') {
                if(!sizeRegex.test(value)) {
                    makeErrBox(elem, sizeMsg);
                    return false;
                }
            }
            if(type === 'weight') {
                if(!weightRegex.test(value)) {
                    makeErrBox(elem, weightMsg);
                    return false;
                }
            }
            if(type === 'brand') {
                if(!brandRegex.test(value)) {
                    makeErrBox(elem, brandMsg);
                    return false;
                }
            }
            if(type === 'os') {
                if(!osRegex.test(value)) {
                    makeErrBox(elem, osMsg);
                    return false;
                }
            }
            if(type === 'battery') {
                if(!batteryRegex.test(value)) {
                    makeErrBox(elem, batteryMsg);
                    return false;
                }
            }
            return true;
        }

        // detail
        const colorRegex = /^([a-zA-Z가-힣0-9\s]{1,20})$/;
        const colorMsg = '색상은 영어, 한글, 숫자 1~20자 이내로 작성해 주세요.';
        const hddRegex = /^([0-9]{1,10})$/;
        const hddMsg = '하드디스크 용량은 10자리 이내의 정수로 작성해 주세요.';
        const ssdRegex = /^([0-9]{1,10})$/;
        const ssdMsg = 'SSD 용량은 10자리 이내의 정수로 작성해 주세요.';
        const priceRegex = /^([0-9]{1,10})$/;
        const priceMsg = '가격은 10자리 이내의 정수로 작성해 주세요.';
        const stockRegex = /^([0-9]{1,10})$/;
        const stockMsg = '재고는 10자리 이내의 정수로 작성해 주세요.';
        const dc_rateRegex = /^([0-9]{1,3})$/;
        const dc_rateMsg = '할인은 0~100 사이의 정수로 작성해 주세요.';
        const mfFileMsg = '이미지를 선택해 주세요.';

        const detailChk = (elem, type) => {
            const value = elem.value;
            if(type === 'color') {
                if(!colorRegex.test(value)) {
                    makeErrBox(elem, colorMsg);
                    return false;
                }
            }
            if(type === 'hdd') {
                if(!hddRegex.test(value)) {
                    makeErrBox(elem, hddMsg);
                    return false;
                }
            }
            if(type === 'ssd') {
                if(!ssdRegex.test(value)) {
                    makeErrBox(elem, ssdMsg);
                    return false;
                }
            }
            if(type === 'price') {
                if(!priceRegex.test(value)) {
                    makeErrBox(elem, priceMsg);
                    return false;
                }
            }
            if(type === 'stock') {
                if(!stockRegex.test(value)) {
                    makeErrBox(elem, stockMsg);
                    return false;
                }
            }
            if(type === 'dc_rate') {
                if(!dc_rateRegex.test(value)) {
                    makeErrBox(elem, dc_rateMsg);
                    return false;
                }
            }
            if(type === 'mfFile') {
                if(value.length === 0) {
                    makeErrBox(elem, mfFileMsg);
                    return false;
                }
            }
            return true;
        }

        const detailListContainerElem = document.querySelector('#detail-list-container');
        let copyBtnElem = document.querySelector('.copy-btn');
        const addDetailBtnElem = document.querySelector('#add-detail-btn');
        const delBtnElem = document.querySelector('.delBtn');
        const repreBtnElem = document.querySelector('.repre');
        const smBtn = document.querySelector('#submitBtn');

        const list = [
            'color', 'hdd', 'ssd', 'price', 'stock', 'dc_rate', 'mfFile'
        ]

        const addBtn = (elem) => {
            let color = '';
            let hdd = '';
            let ssd = '';
            let price = '';
            let stock = '';
            let dc_rate = '';
            if (elem) {
                color = elem.querySelector('.color').value;
                hdd = elem.querySelector('.hdd').value;
                ssd = elem.querySelector('.ssd').value;
                price = elem.querySelector('.price').value;
                stock = elem.querySelector('.stock').value;
                dc_rate = elem.querySelector('.dc_rate').value;
            }

            const divElem = document.createElement('div');
            divElem.classList.add('detail-div');
            divElem.innerHTML = `
                    <div class="inv-box">
                        <div class="inv-name">
                            <span>색상</span>
                            <span>:</span>
                        </div>
                        <input type="text" class="color" value="${color}">
                    </div>
                    <div class="inv-box">
                        <div class="inv-name">
                            <span>하드디스크 용량</span>
                            <span>:</span>
                        </div>
                        <input type="text" class="hdd" value="${hdd}">
                    </div>
                    <div class="inv-box">
                        <div class="inv-name">
                            <span>SSD 용량</span>
                            <span>:</span>
                        </div>
                        <input type="text" class="ssd" value="${ssd}">
                    </div>
                    <div class="inv-box">
                        <div class="inv-name">
                            <span>가격</span>
                            <span>:</span>
                        </div>
                        <input type="text" class="price" value="${price}">
                    </div>
                    <div class="inv-box">
                        <div class="inv-name">
                            <span>재고</span>
                            <span>:</span>
                        </div>
                        <input type="text" class="stock" value="${stock}">
                    </div>
                    <div class="inv-box">
                        <div class="inv-name">
                            <span>할인</span>
                            <span>:</span>
                        </div>
                        <input type="text" class="dc_rate" value="${dc_rate}">
                    </div>
                    <div class="detail-img-box">
                        <div class="inv-name">
                            <span>이미지</span>
                            <span>:</span>
                        </div>
                        <div class="inv-btm">
                            <div class="file-area">
                                <input type="file" class="mfFile">
                            </div>
                            <div class="file-set">
                                <input type="button" class="ui inverted red button ml10 delBtn" value="삭제하기">
                                <input type="button" class="ui inverted blue button ml10 repre" value="대표옵션으로설정">
                                <input type="button" class="ui inverted blue button ml10 copy-btn" value="복사하기">
                            </div>
                        </div>
                    </div>
                </div>
            `;
            //===================== 추가하기버튼 =========================
            const copyElem = divElem.querySelector('.copy-btn');
            copyElem.addEventListener('click', (e) => {
                addBtn(divElem);
            });
            const insBeforeDivElem = document.querySelector('#ins-before-div');
            if (elem) {
                const insDetailDiv = document.querySelector('#ins-before-div').querySelector('.detail-div');
                if(insDetailDiv == elem) {
                    insBeforeDivElem.after(divElem);
                } else {
                    elem.after(divElem);
                }
            } else {
                if(insBeforeDivElem.children.length === 0) {
                    insBeforeDivElem.appendChild(divElem);
                } else {
                    detailListContainerElem.appendChild(divElem);
                }
            }
            //==========================================================



            //===================== 삭제하기버튼 ===========================
            const delBtnElem = divElem.querySelector('.delBtn');
            delBtnElem.addEventListener('click', () => {
                divElem.remove();
                const insBeforeDivElem = document.querySelector('#ins-before-div');
                if(insBeforeDivElem.children.length === 0) {
                    const detailList = document.querySelectorAll('.detail-div');
                    insBeforeDivElem.appendChild(detailList[0]);
                }
            });
            //==============================================================



            // ======================= 대표옵션으로 설정 버튼 ===================
            const repreBtnElem = divElem.querySelector('.repre');
            repreBtnElem.addEventListener('click', (e) => {
                const insBeforeDivElem = document.querySelector('#ins-before-div');
                const detailDivInInsBeforeDiv = insBeforeDivElem.querySelector('.detail-div');
                const curElem = e.target.closest('.detail-div');
                detailListContainerElem.appendChild(detailDivInInsBeforeDiv);
                insBeforeDivElem.appendChild(curElem);
                curElem.querySelector('.repre').classList.add('dis-none');
                detailDivInInsBeforeDiv.querySelector('.repre').classList.remove('dis-none');
            });
            // ==============================================================
        }

        copyBtnElem.addEventListener('click', (e) => {
            const elem = e.target.closest('.detail-div');
            addBtn(elem);
        });

        addDetailBtnElem.addEventListener('click', (e) => {
            e.preventDefault();
            addBtn();
        });

        delBtnElem.addEventListener('click', (e) => {
            e.target.closest('.detail-div').remove();
            const insBeforeDivElem = document.querySelector('#ins-before-div');
            if(insBeforeDivElem.children.length === 0) {
                const detailList = document.querySelectorAll('.detail-div');
                insBeforeDivElem.appendChild(detailList[0]);
            }
        });

        repreBtnElem.addEventListener('click', (e) => {
            const insBeforeDivElem = document.querySelector('#ins-before-div');
            const detailDivInInsBeforeDiv = insBeforeDivElem.querySelector('.detail-div');
            const curElem = e.target.closest('.detail-div');
            detailListContainerElem.appendChild(detailDivInInsBeforeDiv);
            insBeforeDivElem.appendChild(curElem);
            curElem.querySelector('.repre').classList.add('dis-none');
            detailDivInInsBeforeDiv.querySelector('.repre').classList.remove('dis-none');
        });

        smBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const insBeforeDivElem = document.querySelector('#ins-before-div');
            if(insBeforeDivElem.children.length === 0) {
                makeErrBox(insBeforeDivElem, '대표상품을 등록해 주세요');
                return;
            }

            // ================ Master Chk ============================
            const masterList = [
                  'nm', 'code', 'rdt', 'ram', 'size'
                , 'weight', 'brand', 'os', 'battery'
            ];
            for(let i in masterList) {
                const elem = document.querySelector(`.${masterList[i]}`);
                if (!masterChk(elem, masterList[i])) {
                    return;
                }
            }

            for(let i in list) {
                const elem = document.querySelector(`.${list[i]}`);
                if(!detailChk(elem, list[i])) {
                    return;
                }
            }


            // =========================================================

            const detailList = document.querySelectorAll('.detail-div');
            let no = 0;
            detailList.forEach(item => {
                for(let i in list) {
                    const type = list[i];
                    const nameResult = `productList[${no}].${type}`;
                    const typeElem = item.querySelector(`.${type}`);
                    typeElem.name = nameResult;
                }
                no++;
            });

            const smFrm = document.querySelector('#ins-product-frm');
            smFrm.submit();

        });
    }
}
