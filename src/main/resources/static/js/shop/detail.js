const dataElem = document.querySelector('#data');
const likeSpanElem = document.querySelector('#likeSpan');
const productImgElem = document.querySelector('#productImg');
const optionDropdownElem = document.querySelector('#optionDropdown');
const optionMenuElem = document.querySelector('#optionMenu');
const cartBtnElem = document.querySelector('#cartBtn');
const orderBtnElem = document.querySelector('#orderBtn');
const goToProductDetailElems = document.querySelectorAll('.goToProductDetail');
const goToProductReviewElems = document.querySelectorAll('.goToProductReview');
const goToProductQuestionElems = document.querySelectorAll('.goToProductQuestion');
const productDetailElem = document.querySelector('#productDetail');
const productReviewElem = document.querySelector('#productReview');
const productQuestionElem = document.querySelector('#productQuestion');

const reviewWriteBtnElem = document.querySelector('#reviewWriteBtn');
const questionWriteBtnElem = document.querySelector('#questionWriteBtn');
const reviewWriteTbodyElem = document.querySelector('#reviewWriteTbody');
const questionWriteTbodyElem = document.querySelector('#questionWriteTbody');

const iproduct = dataElem.dataset.iproduct;
const iuser = dataElem.dataset.iuser;

goToProductDetailElems.forEach(item => {
    item.addEventListener('click', () => {
        window.scrollTo({ top: productDetailElem.offsetTop });
    });
});

goToProductReviewElems.forEach(item => {
    item.addEventListener('click', () => {
        window.scrollTo({ top: productReviewElem.offsetTop });
    });
});

goToProductQuestionElems.forEach(item => {
    item.addEventListener('click', () => {
        window.scrollTo({ top: productQuestionElem.offsetTop });
    });
});

const selFavorite = () => {
    fetch('/fit/api/selfavorite?iproduct=' + dataElem.dataset.iproduct)
        .then(res => res.json())
        .then(data => {
            likeSpanElem.innerText = data.result + '개';
        }).catch(err => { console.error(err); });
}
selFavorite();

const isFavorite = () => {
    fetch('/fit/api/isfavorite?iproduct=' + dataElem.dataset.iproduct)
        .then(res => res.json())
        .then(data => {
            if(data.result === 1) {
                document.querySelector('#likeI').classList.add('crealred');
            } else {
                document.querySelector('#likeI').classList.remove('crealred');
            }
        }).catch(err => { console.error(err); });
}
isFavorite();

let isRatingLet = false;
const isRating = () => {
    fetch('/fit/api/israting?iproduct=' + dataElem.dataset.iproduct)
        .then(res => res.json())
        .then(data => {
            if(data.result === 1) {
                document.querySelector('#starI').classList.add('cgold');
                isRatingLet = true;
            } else {
                document.querySelector('#starI').classList.remove('cgold');
                isRatingLet = false;
            }
        }).catch(err => { console.error(err); });
}
isRating();

document.querySelector('#starBtn').addEventListener('click', () => {
    window.scrollTo({ top: productReviewElem.offsetTop });
});

document.querySelector('#likeBtn').addEventListener('click', e => {
    if(Number(document.querySelector('#data').dataset.iuser) === 0) {
        makeErrorToast('로그인 한 회원한 상품을 좋아요 할 수 있어요.');
        return;
    }

    fetch('/fit/api/clickfavorite?iproduct=' + dataElem.dataset.iproduct)
        .then(res => res.json())
        .then(data => {
            if(data.result === 1) {
                selFavorite();
                isFavorite();
            }
        }).catch(err => { console.error(err); });
});

$('#colorDropdown').dropdown('setting', 'onChange', () => {
    const idx = Number($('#colorDropdown').dropdown('get value'));
    productImgElem.setAttribute('src', '/imgPath/products/detail/' + colorList[idx].idetail + '/' + colorList[idx].img);

    $('#optionDropdown').dropdown('clear');
    optionMenuElem.innerHTML = ``;
    optionList.forEach(item => {
        if(item.color === $('#colorDropdown').dropdown('get text')) {
            const div = document.createElement('div');
            div.className = 'item';
            div.dataset.value = item.idetail;
            div.innerText = item.option;
            optionMenuElem.appendChild(div);
        }
    });

    optionDropdownElem.classList.remove('disabled');
});

$('#optionDropdown').dropdown('setting', 'onChange', () => {
    fetch('/shop/api/selprice?idetail=' + $('#optionDropdown').dropdown('get value'))
        .then(res => res.json())
        .then(data => {
            document.querySelector('#originalPrice').innerText = data.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';
            document.querySelector('#price').innerText = data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';
        }).catch(err => { console.error(err); });
});

cartBtnElem.addEventListener('click', () => {
    const selected = $('#optionDropdown').dropdown('get value');
    if(selected === '') {
        makeErrorToast('먼저 옵션을 선택해주세요.');
        return;
    }

    if(iuser === '0') {
        makeErrorToast('비회원은 주문 기능을 이용할 수 없어요.');
        return;
    }

    fetch('/shop/api/inscart?idetail=' + selected)
        .then(res => res.json())
        .then(data => {
            if(data.result === 0) {
                makeErrorToast('장바구니에 상품을 담는데 실패했어요.');
            } else {
                makeInfoToast('장바구니에 상품을 담았어요.');
            }
        }).catch(err => { console.error(err); });
});

orderBtnElem.addEventListener('click', () => {
    const selected = $('#optionDropdown').dropdown('get value');
    if(selected === '') {
        makeErrorToast('먼저 옵션을 선택해주세요.');
        return;
    }

    if(iuser === '0') {
        makeErrorToast('비회원은 주문 기능을 이용할 수 없어요.');
        return;
    }

    fetch('/shop/api/inscart?idetail=' + selected)
        .then(res => res.json())
        .then(data => {
            if(data.result === 0) {
                makeErrorToast('주문에 실패했어요.');
            } else {
                const URLSearch = new URLSearchParams(location.search);
                const productsArr = [];
                productsArr.push(selected);
                URLSearch.append('list', JSON.stringify(productsArr));
                location.href = '/shop/order?' + URLSearch;
            }
        }).catch(err => { console.error(err); });
});

// 상품 리뷰
{
    const maxPageUrl = '/shop/api/reviewmaxpage?iproduct=' + iproduct;
    const getListUrl = '/shop/api/reviewlist?iproduct=' + iproduct;
    const nullMessage = '등록된 상품 후기가 없습니다.';

    const recordCount = 5;
    let currentPage = 1;
    let maxPage = 1;

    const searchPaginationElem = document.querySelector('#reviewPagination');
    const tbodyElem = document.querySelector('#reviewTbody');

    const makeActive = item => {
        item.classList.remove('link');
        item.classList.add('active');
    }

    const makeLink = item => {
        item.classList.remove('active');
        item.classList.add('link');
    }

    const getMaxPage = () => {
        fetch(maxPageUrl, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                recordCount
            })
        }).then(res => res.json())
            .then(data => {
                maxPage = Math.max(data.result, 1);
                console.log('maxPage = ' + maxPage);
                makePage();
            })
            .catch(err => {
                console.error(err);
            });
    }

    const makePage = () => {
        searchPaginationElem.innerHTML = '';

        const a1 = document.createElement('a');
        if (currentPage <= 10) {
            a1.classList.add('disabled');
        }
        a1.classList.add('item');
        a1.innerHTML = `<i class="angle left icon mr0"></i>`;

        a1.addEventListener('click', () => {
            if (a1.classList.contains('disabled')) {
                return;
            }
            currentPage = currentPage - (currentPage % 10 === 0 ? 10 : currentPage % 10);
            loadList();
        });

        searchPaginationElem.appendChild(a1);

        const startPage = currentPage - (currentPage % 10 === 0 ? 10 : currentPage % 10) + 1;
        const lastPage = Math.min(maxPage, startPage + 9);

        for (let i = startPage; i <= lastPage; i++) {
            const a2 = document.createElement('a');
            if (currentPage === i) {
                a2.classList.add('active');
            }
            a2.classList.add('item');
            a2.innerText = i;

            a2.addEventListener('click', () => {
                if (a2.classList.contains('active')) {
                    return;
                }
                currentPage = Number(a2.innerText);
                loadList();
            });

            searchPaginationElem.appendChild(a2);
        }

        const a3 = document.createElement('a');
        if (currentPage > Math.floor(maxPage / 10) * 10) {
            a3.classList.add('disabled');
        }
        a3.classList.add('item');
        a3.innerHTML = `<i class="angle right icon mr0"></i>`;

        a3.addEventListener('click', () => {
            if (a3.classList.contains('disabled')) {
                return;
            }
            currentPage = currentPage - (currentPage % 10 === 0 ? 10 : currentPage % 10) + 11;
            loadList();
        });

        searchPaginationElem.appendChild(a3);
    }

    const loadList = () => {
        fetch(getListUrl, {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                recordCount,
                currentPage
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                makeList(data);
                getMaxPage();
            })
            .catch(err => {
                console.error(err);
            });
    }

    const makeList = list => {
        if(list === null) {
            return;
        }

        tbodyElem.innerHTML = '';

        if (list.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML =
                `<td rowspan="1" colspan="4" class="btline h100 fs12 tact">${nullMessage}</td>`
            tbodyElem.appendChild(tr);
        }

        list.forEach(item => {
            const tr = document.createElement('tr');
            const div = document.createElement('div');
            div.className = 'ui rating disabled';

            for(let i=0; i<item.rating; i++) {
                const i = document.createElement('i');
                i.className = 'star icon active';
                div.appendChild(i);
            }
            for(let i=item.rating; i<5; i++) {
                const i = document.createElement('i');
                i.className = 'star icon';
                div.appendChild(i);
            }

            tr.innerHTML =
                `<td id="ratingTd" class="tact"></td>
                 <td class="taleft fs12">
                    <div id="ctntDiv">
                        ${item.ctnt}
                    </div>
                 </td>
                 <td class="tact fs12">${item.userNm}</td>
                 <td class="tact fs12">${item.rdt.substring(0, 11)}</td>`
            tr.querySelector('#ratingTd').appendChild(div);

            if(item.iuser === Number(dataElem.dataset.iuser)) {
                const editBtn = document.createElement('button');
                editBtn.className = 'ui compact basic icon mini button ml5';
                editBtn.innerHTML = `<i class="edit icon"></i>`;
                const delBtn = document.createElement('button');
                delBtn.className = 'ui compact basic icon mini button ml5';
                delBtn.innerHTML = `<i class="trash icon"></i>`;

                editBtn.addEventListener('click', () => {
                    makeReviewWriteArea();
                    reviewWriteTbodyElem.querySelector('#reviewInput').value = item.ctnt;
                    $('.reviewRating').rating('set rating', item.rating);
                });

                delBtn.addEventListener('click', () => {
                    if(confirm('정말 리뷰를 삭제하시겠습니까?')) {
                        fetch('/shop/api/review?iproduct=' + iproduct, {
                            method: 'delete'
                        }).then(res => res.json())
                            .then(data => {
                                if(data.result === 1) {
                                    loadList();
                                    isRating();
                                    makeInfoToast('리뷰를 삭제했어요.');
                                } else {
                                    makeErrorToast('리뷰 삭제에 실패했어요.');
                                }
                            }).catch(err => { console.error(err); });
                    }
                });

                tr.querySelector('#ctntDiv').appendChild(editBtn);
                tr.querySelector('#ctntDiv').appendChild(delBtn);
            }

            tbodyElem.appendChild(tr);
        });
    }

    loadList();

    const makeReviewWriteArea = () => {
        reviewWriteTbodyElem.innerHTML = `<tr>
            <td class="tact">
                <div class="ui yellow rating mct reviewRating" data-max-rating="5"></div>
            </td>
            <td colspan="2" class="pr15">
                <div class="ui fluid tiny action input">
                    <input type="text" id="reviewInput" placeholder="상품 후기">
                    <div id="reviewSubmitBtn" class="ui secondary tiny button">등록</div>
                </div>
            </td>
        </tr>`;
        $('.reviewRating').rating();

        document.querySelector('#reviewSubmitBtn').addEventListener('click', () => {
            const reviewRatingElem = $('.reviewRating');
            if(reviewRatingElem.rating('get rating') < 1) {
                makeErrorToast('먼저 상품에 대한 평점을 골라주세요.');
                return;
            }

            fetch('/shop/api/review', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    iproduct,
                    rating: reviewRatingElem.rating('get rating'),
                    ctnt: document.querySelector('#reviewInput').value
                })
            }).then(res => res.json())
                .then(data => {
                    if(data.result === 1) {
                        currentPage = 1;
                        loadList();
                        isRating();
                        closeWriteArea();
                    } else if(data.result === 2) {
                        loadList();
                        isRating();
                        closeWriteArea();
                    } else {
                        makeErrorToast('리뷰 등록에 실패했어요.');
                    }
                }).catch(err => { console.error(err); });
        });
    }

    const closeWriteArea = () => {
        reviewWriteTbodyElem.innerHTML = '';
    }

    let isOrdered = false;
    fetch('/shop/api/selordercount?iproduct=' + iproduct)
        .then(res => res.json())
        .then(data => {
            isOrdered = data.result > 1;
        }).catch(err => { console.error(err); });

    reviewWriteBtnElem.addEventListener('click', () => {
        if(dataElem.dataset.iuser === '0') {
            location.href = '/user/login';
            return;
        }

        if(!isOrdered) {
            makeErrorToast('상품을 구매확정한 회원만 리뷰를 작성할 수 있어요.');
            return;
        }

        if(isRatingLet) {
            makeErrorToast('이미 이 제품에 대한 리뷰를 작성했어요.');
            return;
        }

        makeReviewWriteArea();
    });
}

// 상품 문의
{
    const maxPageUrl = '/shop/api/questionmaxpage';
    const getListUrl = '/shop/api/questionlist';
    const nullMessage = '등록된 상품 문의가 없습니다.';

    const recordCount = 5;
    let currentPage = 1;
    let maxPage = 1;

    const searchPaginationElem = document.querySelector('#questionPagination');
    const tbodyElem = document.querySelector('#questionTbody');

    const makeActive = item => {
        item.classList.remove('link');
        item.classList.add('active');
    }

    const makeLink = item => {
        item.classList.remove('active');
        item.classList.add('link');
    }

    const getMaxPage = () => {
        fetch(maxPageUrl, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                iproduct,
                recordCount
            })
        }).then(res => res.json())
            .then(data => {
                maxPage = Math.max(data.result, 1);
                console.log('maxPage = ' + maxPage);
                makePage();
            })
            .catch(err => {
                console.error(err);
            });
    }

    const makePage = () => {
        searchPaginationElem.innerHTML = '';

        const a1 = document.createElement('a');
        if (currentPage <= 10) {
            a1.classList.add('disabled');
        }
        a1.classList.add('item');
        a1.innerHTML = `<i class="angle left icon mr0"></i>`;

        a1.addEventListener('click', () => {
            if (a1.classList.contains('disabled')) {
                return;
            }
            currentPage = currentPage - (currentPage % 10 === 0 ? 10 : currentPage % 10);
            loadList();
        });

        searchPaginationElem.appendChild(a1);

        const startPage = currentPage - (currentPage % 10 === 0 ? 10 : currentPage % 10) + 1;
        const lastPage = Math.min(maxPage, startPage + 9);

        for (let i = startPage; i <= lastPage; i++) {
            const a2 = document.createElement('a');
            if (currentPage === i) {
                a2.classList.add('active');
            }
            a2.classList.add('item');
            a2.innerText = i;

            a2.addEventListener('click', () => {
                if (a2.classList.contains('active')) {
                    return;
                }
                currentPage = Number(a2.innerText);
                loadList();
            });

            searchPaginationElem.appendChild(a2);
        }

        const a3 = document.createElement('a');
        if (currentPage > Math.floor(maxPage / 10) * 10) {
            a3.classList.add('disabled');
        }
        a3.classList.add('item');
        a3.innerHTML = `<i class="angle right icon mr0"></i>`;

        a3.addEventListener('click', () => {
            if (a3.classList.contains('disabled')) {
                return;
            }
            currentPage = currentPage - (currentPage % 10 === 0 ? 10 : currentPage % 10) + 11;
            loadList();
        });

        searchPaginationElem.appendChild(a3);
    }

    const loadList = () => {
        fetch(getListUrl, {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                iproduct,
                recordCount,
                currentPage
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                makeList(data);
                getMaxPage();
            })
            .catch(err => {
                console.error(err);
            });
    }

    const makeList = list => {
        tbodyElem.innerHTML = '';

        if (list.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML =
                `<td rowspan="1" colspan="4" class="btline h100 fs12 tact">${nullMessage}</td>`
            tbodyElem.appendChild(tr);
        }

        list.forEach(item => {
            makeReply(item, true);
        });
    }

    const makeReply = (item, able) => {
        const tr = document.createElement('tr');
        if(!able) {
            tr.classList.add('reply');
        }

        let status = '';
        const replyList = item.replyList === null ? [] : item.replyList;
        if(replyList.length === 0 && item.parent === 0) {
            status = '대기중';
        } else if(replyList.length === 0 && item.parent !== 1) {
            status = '답변';
        } else {
            status = '답변완료';
        }

        tr.innerHTML =
            `<td class="tact fs12">${status}</td>
                 <td id="ctntDiv" class="taleft fs12">${item.ctnt.replace('\n', '<br>')}</td>
                 <td class="tact fs12">${item.nm}</td>
                 <td class="tact fs12">${item.rdt.substring(0, 11)}</td>`

        if(item.iuser === Number(dataElem.dataset.iuser)) {
            const editBtn = document.createElement('button');
            editBtn.className = 'ui compact basic icon mini button ml5';
            editBtn.innerHTML = `<i class="edit icon"></i>`;
            const delBtn = document.createElement('button');
            delBtn.className = 'ui compact basic icon mini button ml5';
            delBtn.innerHTML = `<i class="trash icon"></i>`;

            editBtn.addEventListener('click', () => {
                makeQuestionWriteArea(item.iquestion, 'update');
                questionWriteTbodyElem.querySelector('#questionInput').value = item.ctnt;
            });

            delBtn.addEventListener('click', () => {
                if(confirm('정말 문의를 삭제하시겠습니까?')) {
                    fetch('/shop/api/question?iproduct=' + iproduct + '&iquestion=' + item.iquestion, {
                        method: 'delete'
                    }).then(res => res.json())
                        .then(data => {
                            if(data.result === 1) {
                                loadList();
                                makeInfoToast('문의를 삭제했어요.');
                            } else {
                                makeErrorToast('문의 삭제에 실패했어요.');
                            }
                        }).catch(err => { console.error(err); });
                }
            });

            tr.querySelector('#ctntDiv').appendChild(editBtn);
            tr.querySelector('#ctntDiv').appendChild(delBtn);
        }

        if(dataElem.dataset.role === 'ROLE_ADMIN' && able) {
            const replyBtn = document.createElement('button');
            replyBtn.className = 'ui compact basic icon mini button ml5';
            replyBtn.innerHTML = `<i class="comment dots icon"></i>`;

            replyBtn.addEventListener('click', () => {
                makeQuestionWriteArea(item.iquestion);
            });

            tr.querySelector('#ctntDiv').appendChild(replyBtn);
        }

        tbodyElem.appendChild(tr);

        if(able) {
            item.replyList.forEach(item2 => {
                makeReply(item2, false);
            });
        }
    }

    loadList();

    const makeQuestionWriteArea = (iquestion, param) => {
        questionWriteTbodyElem.innerHTML = `<tr>
            <td></td>
            <td colspan="2" class="pr15">
                <div class="ui fluid tiny action input">
                        <textarea id="questionInput" class="w100p" rows="2" style="resize: none;"></textarea>
                    </div>
                    <div id="questionSubmitBtn" class="ui secondary tiny button mt5">등록</div>
                </div>
            </td>
        </tr>`;

        document.querySelector('#questionSubmitBtn').addEventListener('click', () => {
            fetch('/shop/api/question', {
                method: param === 'update' ? 'put' : 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    iquestion: iquestion,
                    parent: iquestion === undefined ? 0 : iquestion,
                    iproduct,
                    ctnt: document.querySelector('#questionInput').value
                })
            }).then(res => res.json())
                .then(data => {
                    if(data.result === 1) {
                        if(iquestion === undefined) {
                            currentPage = 1;
                        }
                        loadList();
                        closeWriteArea();
                    } else if(data.result === 2) {
                        loadList();
                        closeWriteArea();
                    } else {
                        makeErrorToast('문의 등록에 실패했어요.');
                    }
                }).catch(err => { console.error(err); });
        });
    }

    const closeWriteArea = () => {
        questionWriteTbodyElem.innerHTML = '';
    }

    questionWriteBtnElem.addEventListener('click', () => {
        if(dataElem.dataset.iuser === '0') {
            location.href = '/user/login';
            return;
        }

        makeQuestionWriteArea();
    });
}