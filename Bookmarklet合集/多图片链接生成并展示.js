var pic_base = "<img src='https://i.tuiimg.net/005/2225/num.jpg'>";
var div = document.createElement('div');
var createnew = function(num){
    for(var i = 1; i <= num; i++){
        div.innerHTML +=  pic_base.replace('num',i);
    }
    document.body.appendChild(div);
}
createnew(55);
