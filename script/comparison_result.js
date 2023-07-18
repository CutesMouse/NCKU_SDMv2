let URL = document.URL;

if (!URL.includes('?')) {
    window.open('comparison_s1.html', '_self')
}

let data = URL.split('?')[1].split("&");
let order = [];
let pts_0 = data[1].split('=')[1];
let pts_1 = data[2].split('=')[1];
let pts_0_sum = 0;
let pts_1_sum = 0;
let dictionary = {
    "f": ["fee", "費用"],
    "e": ["effect", "治療效果"],
    "t": ["time", "注射時間"],
    "s": ["side_effect", "副作用"]
}
// order=fes&pts_0=001&pts_1=320

let order_string = data[0].split('=')[1];
for (let i = 0; i < order_string.length; i++) {
    order.push(dictionary[order_string[i]][0]);
}

document.addEventListener('DOMContentLoaded', function () {
    let rows = 4;
    while (rows !== order_string.length) {
        document.querySelector("#r" + rows.toString()).remove();
        rows--;
    }
    for (let i = 1; i <= rows; i++) {
        let index = rows-i;
        document.querySelector('#c' + i + 'h').innerHTML = dictionary[order[index][0]][1];
        document.querySelector('#c' + i + '0').innerHTML = pts_0[index];
        document.querySelector('#c' + i + '1').innerHTML = pts_1[index];
        pts_0_sum += parseInt(pts_0[index]);
        pts_1_sum += parseInt(pts_1[index]);
    }
    document.querySelector('#pts_0').innerHTML = pts_0_sum;
    document.querySelector('#pts_1').innerHTML = pts_1_sum;
}, false);
