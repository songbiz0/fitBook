const dropdown = $('.ui.dropdown');
dropdown.dropdown({
    maxSelections: 5,
    fullTextSearch: true
});

$('.activating.element').popup();

const productUlElem = document.querySelector('#productUl');
const dontSaveBtnElem = document.querySelector('#dontSaveBtn');
const saveBtnElem = document.querySelector('#saveBtn');

const numRegex = /^[0-9]+$/;

$('#simpleChk').checkbox().first().checkbox({
    onChecked: () => {
        $('#programDropdown').addClass('disabled');
    },
    onUnchecked: () => {
        $('#programDropdown').removeClass('disabled');
    }
});

$(() => {
    $('.q0').transition('fade up');

    fetch('/fit/api/programlist')
        .then(res => res.json())
        .then(data => {
            const menuElem = document.querySelector('.menu');
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'item';
                div.dataset.value = item.iprogram;
                div.innerHTML =
                    `<img src="/imgPath/program/${item.iprogram}/${item.img}">
                     ${item.nm}`
                menuElem.appendChild(div);
            });
        }).catch(err => { console.error(err); });
});

$('#startBtn').on('click', () => {
    $('.q0').transition('hide');
    $('.q1').transition('fade up');
});

const budgetInputElem = $('#budgetInput');
$('#q1NextBtn').on('click', () => {
    if(!numRegex.test(budgetInputElem.val())) {
        makeErrorToast('숫자만 입력할 수 있어요.');
        budgetInputElem.focus();
    } else {
        budget = budgetInputElem.val();
        $('.q1').transition('hide');
        $('.q2').transition('fade up');
    }
});

budgetInputElem.keypress(e => {
    if(e.which === 13) {
        $('#q1NextBtn').click();
    }
});

$('.rewBtn').on('click', () => {
    window.location.reload();
});

$('.q2NextBtn').on('click', () => {
    $('.q2').transition('hide');
    $('.q3').transition('fade up');
});

$('.q3NextBtn').on('click', () => {
    $('.q3').transition('hide');
    $('.q4').transition('fade up');
});

$('.q4NextBtn').on('click', () => {
    $('.q4').transition('hide');
    $('.q5').transition('fade up');
});

$('.q5NextBtn').on('click', () => {
    $('.q5').transition('hide');
    $('.q6').transition('fade up');
});

$('.q6NextBtn').on('click', () => {
    $('.q6').transition('hide');
    $('.q7').transition('fade up');
});

$('#q7NextBtn').on('click', () => {
    twoinone = $('#twoinoneChk').checkbox('is checked');
    macbook = $('#macbookChk').checkbox('is checked');
    highhz = $('#highhzChk').checkbox('is checked');
    highresolution = $('#highresolutionChk').checkbox('is checked');

    $('.q7').transition('hide');
    $('.ql').transition('fade up');
});

let budget = 0;
let weight = 0;
let size = 0;
let os = 0;
let as = 0;
let battery = 0;
let twoinone = false;
let macbook = false;
let highhz = false;
let highresolution = false;
let programs = null;

$('#qlNextBtn').on('click', () => {
    programs = dropdown.dropdown('get value');
    $('.ql').transition('hide');

    const param = {
        budget,
        weight,
        size,
        os,
        as,
        battery,
        twoinone: twoinone ? 'Y' : 'N',
        macbook: macbook ? 'Y' : 'N',
        highhz: highhz ? 'Y' : 'N',
        highresolution: highresolution ? 'Y' : 'N',
        programs
    }

    fetch('/fit/api/question', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    }).then(res => res.json())
        .then(data => {
            fetch('/fit/api/topfour', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(param)
            }).then(res => res.json())
                .then(data => {
                    makeProductList(data);
                    console.log(data);
                    $('.result').transition('fade up');
                })
                .catch(err => { console.error(err); });
        }).catch(err => { console.error(err); });
});

$('.weight0').on('click', () => {
    weight = 0;
});
$('.weight1').on('click', () => {
    weight = 1;
});
$('.weight2').on('click', () => {
    weight = 2;
});

$('.size0').on('click', () => {
    size = 0;
});
$('.size1').on('click', () => {
    size = 1;
});
$('.size2').on('click', () => {
    size = 2;
});

$('.os0').on('click', () => {
    os = 0;
});
$('.os1').on('click', () => {
    os = 1;
});
$('.os2').on('click', () => {
    os = 2;
});

$('.as0').on('click', () => {
    as = 0;
});
$('.as1').on('click', () => {
    as = 1;
});

$('.bt0').on('click', () => {
    battery = 0;
});
$('.bt1').on('click', () => {
    battery = 1;
});

const makeProductList = list => {
    list.forEach(item => {
        const li = document.createElement('li');
        li.className = 'fc w300 product hp mlr10 pl';
        li.innerHTML =
            `
        <div>
            <img class="w250"
                 src="/imgPath/products/detail/${item.idetail}/${item.detailImg}">
        </div>
        <div class="fs13">${item.brand} ${item.nm}</div>
        <div class="fs12 cgrey">${item.product_code}</div>
        <div class="fs12 cgrey">${item.cpuNm} / ${item.ram}GB</div>
        <div class="fs12 mt10 tdlt cgrey">${item.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
        <div class="fs13">${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
        <div class="mt10">
                            <span id="likeBtn" class="like fs12 hp mlr10 cb0_5">
                                <i id="likeI" class="like icon"></i> <span id="likeSpan"></span>
                            </span>
            <span id="ratingBtn" class="star fs12 hp mlr10 cb0_5">
                                <i id="starI" class="star icon"></i> <span id="starSpan"></span>
                            </span>
            <span class="mlr10 temper" data-tooltip="나에게 얼마나 적합한 제품인지를 보여줘요." data-variation="mini">
                            <i class="fire icon cb0_5"></i>
                            <span class="fs12 cred">${item.fitness === -1 ? '?' : item.fitness}°</span></span>
        </div>
        `

        const selFavorite = () => {
            fetch('/fit/api/selfavorite?iproduct=' + item.iproduct)
                .then(res => res.json())
                .then(data => {
                    li.querySelector('#likeSpan').innerText = data.result;
                }).catch(err => { console.error(err); });
        }
        selFavorite();

        const selRating = () => {
            fetch('/fit/api/selrating?iproduct=' + item.iproduct)
                .then(res => res.json())
                .then(data => {
                    li.querySelector('#starSpan').innerText = data.result;
                }).catch(err => { console.error(err); });
        }

        const isFavorite = () => {
            fetch('/fit/api/isfavorite?iproduct=' + item.iproduct)
                .then(res => res.json())
                .then(data => {
                    if(data.result === 1) {
                        li.querySelector('#likeI').classList.add('crealred');
                    } else {
                        li.querySelector('#likeI').classList.remove('crealred');
                    }
                }).catch(err => { console.error(err); });
        }
        isFavorite();

        const isRating = () => {
            fetch('/fit/api/israting?iproduct=' + item.iproduct)
                .then(res => res.json())
                .then(data => {
                    if(data.result === 1) {
                        li.querySelector('#starI').classList.add('cgold');
                        li.querySelector('#starSpan').innerText = data.resultFloat;
                    } else {
                        li.querySelector('#starI').classList.remove('cgold');
                        selRating();
                    }
                }).catch(err => { console.error(err); });
        }
        isRating();

        li.querySelector('#likeBtn').addEventListener('click', e => {
            e.stopPropagation();
            fetch('/fit/api/clickfavorite?iproduct=' + item.iproduct)
                .then(res => res.json())
                .then(data => {
                    if(data.result === 1) {
                        selFavorite();
                        isFavorite();
                    }
                }).catch(err => { console.error(err); });
        });

        li.addEventListener('click', () => {
            location.href = '/shop/detail?iproduct=' + item.iproduct;
        });
        productUlElem.appendChild(li);
    });
}

dontSaveBtnElem.addEventListener('click', () => {
    fetch('/fit/api/question', {
        method: 'delete'
    }).then(res => res.json())
        .then(data => {
            if(data.result === 1) {
                location.href = '/';
            } else {
                makeErrorToast('삭제에 실패했어요');
            }
        }).catch(err => { console.error(err); });
});