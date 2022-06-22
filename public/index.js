let categoryList=[];
let productList=[];

function init(){

    setCategories();


    let ps = document.getElementById('categories').getElementsByTagName('p');
    for(let i=0; i<ps.length; i++){
        ps[i].onclick = function(){
            alert('hello');
        }
    }
}

function setCategories() {

    categoryDiv = document.getElementById('categories');

    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                categoryList = JSON.parse(httpRequest.responseText);

                for(let i=0; i<categoryList.length; i++){
                    let p = document.createElement('p');
                    p.innerText = categoryList[i];

                    p.onclick=function(){
                        categoryDiv.getElementsByClassName('chosenCategory')[0].classList.remove('chosenCategory');
                        this.classList.add('chosenCategory');
                    }

                    categoryDiv.appendChild(p);

                }

                categoryDiv.getElementsByTagName('p')[0].classList.add('chosenCategory');


            }
        }
    }
    httpRequest.open('GET', 'categoryList', true);
    httpRequest.send();
}

init();