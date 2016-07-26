 //份数
 var fens = document.getElementById("fen");
 var fen = parseFloat(fens.innerHTML);
 //服务费
var fee = document.getElementById('fee');
var ff = document.getElementsByClassName('ff')[0];
var servmoeny = document.getElementById("servmoney");
var fwf;
 // var sercheck = document.getElementById('serpeople');
 var cd = document.getElementsByClassName('cd')[0];
 var serinput = document.getElementsByClassName('serinput')[0];
 var serprice = document.getElementById('serprice');
 var servTotal1 = document.getElementById('servTotal');
 var allmoney = document.getElementById('allmoney');
 var keep = allmoney.innerHTML;

 //服务于数量加减
 function empdel() {
     var sernum = serinput.value;
     sernum--;
     fen--
     if (sernum < 1) {
         sernum = 0;
         //    sercheck.checked = false;
         cd.getElementsByClassName('reduce')[0].style.display = 'none';
         serinput.style.display = 'none';
     }
     serinput.value = sernum;
     servTotal1.value = sernum * parseFloat(serprice.innerHTML);
     console.log(servTotal1.value);
     fens.innerHTML = fen;
     if (fen == 0) {
         fens.style.display = 'none';
     } else {
         fens.style.display = '';
     }
     allmoney.innerHTML = (parseFloat(allmoney.innerHTML) - parseFloat(serprice.innerHTML)).toFixed(2);
     servFee(allmoney.innerHTML);
 }

 function empladd() {
     var sernum = serinput.value;
     sernum++;
     fen++;
     cd.getElementsByClassName('reduce')[0].style.display = '';
     serinput.style.display = '';
     serinput.value = sernum;
     servTotal1.value = sernum * parseFloat(serprice.innerHTML);
     console.log(servTotal1.value);
     fens.innerHTML = fen;
     if (fen == 0) {
         fens.style.display = 'none';
     } else {
         fens.style.display = '';
     }
     allmoney.innerHTML = (parseFloat(allmoney.innerHTML) + parseFloat(serprice.innerHTML)).toFixed(2);
      servFee(allmoney.innerHTML);
 }

 //var sercheck2 = document.getElementById('serpeople2');
 var cd2 = document.getElementsByClassName('cd2')[0];
 var serinput2 = document.getElementsByClassName('serinput2')[0];
 var serprice2 = document.getElementById('serprice2');
 var servTotal2 = document.getElementById('servTotal2');


 //服务于数量加减
 function empdel2() {
     var sernum2 = serinput2.value;
     sernum2--;
     fen--;
     if (sernum2 < 1) {
         sernum2 = 0;
         //  sercheck2.checked = false;
         cd2.getElementsByClassName('reduce')[0].style.display = 'none';
         serinput2.style.display = 'none';
     }
     serinput2.value = sernum2;
     servTotal2.value = sernum2 * parseFloat(serprice2.innerHTML);
     console.log(servTotal2.value);
     fens.innerHTML = fen;
     if (fen == 0) {
         fens.style.display = 'none';
     } else {
         fens.style.display = '';
     }
     allmoney.innerHTML = (parseFloat(allmoney.innerHTML) - parseFloat(serprice2.innerHTML)).toFixed(2);
      servFee(allmoney.innerHTML);
 }

 function empladd2() {
     var sernum2 = serinput2.value;
     sernum2++;
     fen++;
     cd2.getElementsByClassName('reduce')[0].style.display = '';
     serinput2.style.display = '';
     serinput2.value = sernum2;
     servTotal2.value = sernum2 * parseFloat(serprice2.innerHTML);
     console.log(servTotal2.value);
     fens.innerHTML = fen;
     if (fen == 0) {
         fens.style.display = 'none';
     } else {
         fens.style.display = '';
     }
     allmoney.innerHTML = (parseFloat(allmoney.innerHTML) + parseFloat(serprice2.innerHTML)).toFixed(2);
      servFee(allmoney.innerHTML);
 }
 //var sercheck2 = document.getElementById('serpeople2');
 var cd3 = document.getElementsByClassName('cd3')[0];
 var serinput3 = document.getElementsByClassName('serinput3')[0];
 var serprice3 = document.getElementById('serprice3');
 var servTotal3 = document.getElementById('servTotal3');


 //服务于数量加减
 function empdel3() {
     var sernum3 = serinput3.value;
     sernum3--;
     fen--;
     if (sernum3 < 1) {
         sernum3 = 0;
         //  sercheck2.checked = false;
         cd3.getElementsByClassName('reduce')[0].style.display = 'none';
         serinput3.style.display = 'none';
     }
     serinput3.value = sernum3;
     servTotal3.value = sernum3 * parseFloat(serprice3.innerHTML);
     console.log(servTotal3.value);
     fens.innerHTML = fen;
     if (fen == 0) {
         fens.style.display = 'none';
     } else {
         fens.style.display = '';
     }
     
     allmoney.innerHTML = (parseFloat(allmoney.innerHTML) - parseFloat(serprice3.innerHTML)).toFixed(2);
      servFee(allmoney.innerHTML);
 }

 function empladd3() {
     var sernum3 = serinput3.value;
     sernum3++;
     fen++;
     cd3.getElementsByClassName('reduce')[0].style.display = '';
     serinput3.style.display = '';
     serinput3.value = sernum3;
     servTotal3.value = sernum3 * parseFloat(serprice3.innerHTML);
     console.log(servTotal3.value);
     fens.innerHTML = fen;
     if (fen == 0) {
         fens.style.display = 'none';
     } else {
         fens.style.display = '';
     }

     allmoney.innerHTML = (parseFloat(allmoney.innerHTML) + parseFloat(serprice3.innerHTML)).toFixed(2);
       servFee(allmoney.innerHTML);
 }
//计算服务费

function servFee(feeT) {
    if (feeT > 300 || feeT <= 0) {
        fwf = 0;
        ff.style.display = 'none';
        servmoeny.innerHTML = fwf;
        fee.value = fwf;
    }

    if (feeT > 0 && feeT <= 240) {
        fwf = 60.00;
        ff.style.display = '';
        servmoeny.innerHTML = fwf.toFixed(2);
        fee.value = fwf.toFixed(2);
    }
    if (feeT > 240 && feeT <= 300) {
        fwf = 300 - feeT;
        ff.style.display = '';
        servmoeny.innerHTML = fwf.toFixed(2);
        fee.value = fwf.toFixed(2);
    }
}