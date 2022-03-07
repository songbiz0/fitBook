const dataElem = document.querySelector('#data');
let currentPage = Number(dataElem.dataset.currentpage);
const maxPage = Number(dataElem.dataset.maxpage);
let sort = dataElem.dataset.sort;

const URLSearch = new URLSearchParams(location.search);
makeQueryString = (URLSearch, name, value) => {
    if(URLSearch.get(name)) {
        URLSearch.set(name, value);
    } else {
        URLSearch.append(name, value);
    }
}

const liListElem = document.querySelectorAll('li');
const searchPaginationElem = document.querySelector('#productPagination');
const applyBtn = document.querySelector('#applyBtn');
const cancelBtn = document.querySelector('#cancelBtn');

const makeActive = item => {
    item.classList.remove('link');
    item.classList.add('active');
}

const makeLink = item => {
    item.classList.remove('active');
    item.classList.add('link');
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
        makeQueryString(URLSearch, 'currentPage', currentPage);
        location.href = '/shop/list?' + URLSearch;
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
            makeQueryString(URLSearch, 'currentPage', currentPage);
            location.href = '/shop/list?' + URLSearch;
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
        makeQueryString(URLSearch, 'currentPage', currentPage);
        location.href = '/shop/list?' + URLSearch;
    });

    searchPaginationElem.appendChild(a3);
}
makePage();

const selFavorite = liList => {
    liList.forEach(li => {
        fetch('/fit/api/selfavorite?iproduct=' + li.querySelector('.data').dataset.iproduct)
            .then(res => res.json())
            .then(data => {
                li.querySelector('#likeSpan').innerText = data.result;
            }).catch(err => { console.error(err); });
    });
}
selFavorite(liListElem);

const selRating = liList => {
    liList.forEach(li => {
        fetch('/fit/api/selrating?iproduct=' + li.querySelector('.data').dataset.iproduct)
            .then(res => res.json())
            .then(data => {
                li.querySelector('#starSpan').innerText = data.result;
            }).catch(err => { console.error(err); });
    });
}

const isFavorite = liList => {
    liList.forEach(li => {
        fetch('/fit/api/isfavorite?iproduct=' + li.querySelector('.data').dataset.iproduct)
            .then(res => res.json())
            .then(data => {
                if(data.result === 1) {
                    li.querySelector('#likeI').classList.add('crealred');
                } else {
                    li.querySelector('#likeI').classList.remove('crealred');
                }
            }).catch(err => { console.error(err); });
    });
}
isFavorite(liListElem);

const isRating = liList => {
    liList.forEach(li => {
        fetch('/fit/api/israting?iproduct=' + li.querySelector('.data').dataset.iproduct)
            .then(res => res.json())
            .then(data => {
                if(data.result === 1) {
                    li.querySelector('#starI').classList.add('cgold');
                    li.querySelector('#starSpan').innerText = data.resultFloat;
                } else {
                    li.querySelector('#starI').classList.remove('cgold');
                    selRating(liListElem);
                }
            }).catch(err => { console.error(err); });
    });
}
isRating(liListElem);

const addEvent = liList => {
    liList.forEach(li => {
        li.querySelector('#likeBtn').addEventListener('click', e => {
            e.stopPropagation();

            if(Number(document.querySelector('#data').dataset.iuser) === 0) {
                makeErrorToast('로그인 한 회원한 상품을 좋아요 할 수 있어요.');
                return;
            }

            fetch('/fit/api/clickfavorite?iproduct=' + li.querySelector('.data').dataset.iproduct)
                .then(res => res.json())
                .then(data => {
                    if(data.result === 1) {
                        selFavorite(liListElem);
                        isFavorite(liListElem);
                    }
                }).catch(err => { console.error(err); });
        });

        li.addEventListener('click', () => {
            location.href = '/shop/detail?iproduct=' + li.querySelector('.data').dataset.iproduct;
        });
    });
}
addEvent(liListElem);

document.querySelector('#' + sort).classList.add('active');
let sortKorean;
if(sort === 'best') {
    sortKorean = '판매량순';
} else if(sort === 'recommendation') {
    sortKorean = '추천순';
} else if(sort === 'new') {
    sortKorean = '출시일순';
} else if(sort === 'lowPrice') {
    sortKorean = '낮은 가격순';
} else if(sort === 'highPrice') {
    sortKorean = '높은 가격순';
}
document.querySelector('#sortText').innerText = sortKorean;

const sortDropdownJElem = $('#sortDropdown');
sortDropdownJElem.dropdown('setting', 'onChange', () => {
    sort = sortDropdownJElem.dropdown('get value');
    if(sort === '판매량순') {
        sort = 'best';
    } else if(sort === '추천순') {
        sort = 'recommendation';
    } else if(sort === '출시일순') {
        sort = 'new';
    } else if(sort === '낮은 가격순') {
        sort = 'lowPrice';
    } else if(sort === '높은 가격순') {
        sort = 'highPrice';
    }
    makeQueryString(URLSearch, 'sort', sort);

    URLSearch.delete('currentPage');
    location.href = '/shop/list?' + URLSearch;
});


$('.ui.sidebar').sidebar('setting', 'transition', 'overlay');

const sidebarBtn = document.querySelector('.sidebar_toggle');
if(sidebarBtn) {
    sidebarBtn.addEventListener('click', () => {
        $('.ui.sidebar').sidebar('show');
    });
}

$('.ui.accordion')
    .accordion()
;

const makeSearchString = (name, formID) => {
    const arr = [];
    const checkboxes = document.querySelector(formID).querySelectorAll('.checkbox');
    checkboxes.forEach(item => {
        if($(item).checkbox('is checked')) {
            arr.push(item.querySelector('input').name);
        }
    });
    if(arr.length !== 0) {
        makeQueryString(URLSearch, name, JSON.stringify(arr));
    } else {
        URLSearch.delete(name);
    }
}

$('#innerGpuChk').checkbox().first().checkbox({
    onChecked: () => {
        $('#gpuForm .ui.checkbox').not('#innerGpuChk').checkbox('set disabled');
    },
    onUnchecked: () => {
        $('#gpuForm .ui.checkbox').checkbox('set enabled');
    }
})

const conditions = ['brand', 'cpu', 'gpu', 'size', 'ram', 'os', 'weight', 'res', 'hz', 'battery', 'etc'];

const maintainCheckboxes = () => {
    conditions.forEach(item => {
        if(URLSearch.has(item)) {
            JSON.parse(URLSearch.get(item)).forEach(item2 => {
                document.querySelector(`#${item}Form`).querySelectorAll('.ui.checkbox').forEach(item3 => {
                    if(item2 === item3.querySelector('input').name) {
                        $(item3).checkbox('set checked');
                    }
                });
            });
        }
    });
}
maintainCheckboxes();

applyBtn.addEventListener('click', () => {
    conditions.forEach(item => {
        makeSearchString(item, `#${item}Form`);
    });

    URLSearch.delete('currentPage');
    location.href = '/shop/list?' + URLSearch;
});

cancelBtn.addEventListener('click', () => {
    $('.ui.checkbox').checkbox('set unchecked');
    $('.ui.sidebar').sidebar('hide');
});
