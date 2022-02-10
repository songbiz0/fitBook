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
            <td>${item.img}</td>
            <td>${item.iproduct}</td>
            <td>${item.product_code}</td>
            <td>${item.nm}</td>
            <td>${item.brand}</td>
            <td>${item.quantity}</td>
            <td>${item.icpu}</td>
            <td>${item.igpu}</td>
            <td>${item.ram}</td>
            <td>${item.size}</td>
            <td>${item.weight}</td>
            `;
        });


    }
}