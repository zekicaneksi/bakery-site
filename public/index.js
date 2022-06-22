let products={};


function init(){

    setProducts();
}

async function setProducts() {

    categoryDiv = document.getElementById('categories');

    let categories = await getCategories();
    categories = JSON.parse(httpRequest.responseText);

    for(let i = 0; i<categories.length; i++){
        products[categories[i]] = {};
    }

    for(category in products){
        let p = document.createElement('p');
        p.innerText = category;

        p.onclick=function(){
            categoryDiv.getElementsByClassName('chosenCategory')[0].classList.remove('chosenCategory');
            this.classList.add('chosenCategory');
        }

        categoryDiv.appendChild(p);

        await getProducts(category);
        
    }


    let ps = document.getElementById('categories').getElementsByTagName('p');
    let productsDiv = document.getElementById('products');
    for(let i=0; i<ps.length; i++){
        ps[i].onclick = function(){
            productsDiv.innerHTML="";
            for(product in products[ps[i].innerText]){

                let productContainerDiv = document.createElement('div');

                let img = document.createElement('img');
                img.src = "assets/products/" + ps[i].innerText + "/" + product + ".jpg";
                
                let pName = document.createElement('p');
                pName.innerText = product.replaceAll('_',' ');
                pName.innerText = pName.innerText.substring(0,pName.innerText.lastIndexOf(' '));

                let pPrice = document.createElement('p');
                pPrice.innerText = "$" + products[ps[i].innerText][product];

                productContainerDiv.appendChild(img);
                productContainerDiv.appendChild(pName);
                productContainerDiv.appendChild(pPrice);

                productsDiv.appendChild(productContainerDiv);
            }
            let chosen = document.getElementsByClassName('chosenCategory')[0];
            if(chosen != undefined)
                chosen.classList.remove('chosenCategory');
            this.classList.add('chosenCategory');
        }
    }
    ps[0].click();
}

function getCategories(){

    return new Promise(resolve => {
        httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function(){
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    resolve(httpRequest.responseText);
                }
            }
        }
        httpRequest.open('GET', 'categoryList', false);
        httpRequest.send();
    });
}

function getProducts(categoryName){

    return new Promise(resolve => {
        httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function(){
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let responseProducts = JSON.parse(httpRequest.responseText);
                    
                    for(let i = 0; i < responseProducts.length; i++){
                        let price = responseProducts[i].substring(responseProducts[i].lastIndexOf('_')+1);
                        products[categoryName][responseProducts[i]] = price;
                    }

                    resolve();
                    
                }
            }
        }
        httpRequest.open('GET', 'productList?category=' + categoryName, false);
        httpRequest.send();
    });

}

init();