const recommendedUlElem = document.querySelector('#recommendedUl');
const recommendedMoreBtnElem = document.querySelector('#recommendedMoreBtn');
const bestUlElem = document.querySelector('#bestUl');
const bestMoreBtnElem = document.querySelector('#bestMoreBtn');
const newUlElem = document.querySelector('#newUl');
const newMoreBtnElem = document.querySelector('#newMoreBtn');
const liListElem = document.querySelectorAll('li');

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

recommendedMoreBtnElem.addEventListener('click', () => {
    alert('리스트로 이동');
    // TODO
});

bestMoreBtnElem.addEventListener('click', () => {
    alert('리스트로 이동');
    // TODO
});

newMoreBtnElem.addEventListener('click', () => {
    alert('리스트로 이동');
    // TODO
});