/** 初始化一个空数组用来存放已经添加的ID */
var ids = new Array();
/** 自增ID */
var tempId = 0;
/** 总份数*/
var fens = document.getElementById("fen");
//var fen = parseFloat(fens.value); 
var fen = parseFloat(fens.innerHTML);
var allmoney = document.getElementById("allmoney");
/** 总价格 */
var paymoney;
var curCount;
//男
var servTotal1;
//女
var servTotal2;
//餐具
var servTotal3;
// 总服务员费
var servTotal;
var onum = 0;

//服务费
//服务费
var fee = document.getElementById('fee');
var ff = document.getElementsByClassName('ff')[0];
var servmoeny = document.getElementById("servmoney");
var fwf;
var ban = document.getElementsByClassName('ban-price');
var banAll = 0;
// 服务员数量
var serinput2 = document.getElementsByClassName('serinput2')[0];
var serinput = document.getElementsByClassName('serinput')[0];
// 服务员价格
var serprice = document.getElementById('serprice');
var serprice2 = document.getElementById('serprice2');
var serprice3 = document.getElementById('serprice3');
servTotal1 = document.getElementById('servTotal');
servTotal2 = document.getElementById('servTotal2');
servTotal2 = document.getElementById('servTotal3');
window.onload = function() {

    servTotal1.value = parseInt(serinput.value) * parseFloat(serprice.innerHTML);

    servTotal2.value = parseInt(serinput2.value) * parseFloat(serprice2.innerHTML)
    servTotal = parseInt(serinput.value) * parseFloat(serprice.innerHTML) + parseInt(serinput2.value) * parseFloat(serprice2.innerHTML);
    console.log(servTotal);
    var ordFen = document.getElementsByClassName('numTxt');
    var ordPrice = document.getElementsByClassName('price');
    fen = parseInt(serinput.value) + parseInt(serinput2.value);
    paymoney = 0;
    for (var j = 0; j < ban.length; j++) {
        banAll += parseFloat(ban[j].innerHTML);
    }
    for (var i = 0; i < ordFen.length; i++) {
        fen += parseInt(ordFen[i].value);
        paymoney += parseFloat(parseInt(ordFen[i].value) * parseFloat(ordPrice[i].innerHTML));
        console.log(paymoney)
    }
    fens.innerHTML = fen;
    if (fen == 0) {
        fens.style.display = 'none';
    } else {
        fens.style.display = '';
    }
    servFee(paymoney);

    allmoney.innerHTML = (paymoney + fwf + banAll + servTotal).toFixed(2);
}

function IsNum(e) {
    var k = window.event ? e.keyCode : e.which;
    if (((k >= 48) && (k <= 57)) || k == 8 || k == 0) {} else {
        if (window.event) {
            window.event.returnValue = false;
        } else {
            e.preventDefault(); //for firefox 
        }
    }
}

//每次输入时获取当前的值
function keydown(t) {
    if (event.keyCode == 13)
        event.keyCode = 9;
    else
        onum = t.value;
}

function ueserWrite(obj) {
    console.log(obj.value);
    curCount = obj.value;
    if (!/^[0-9]*[1-9][0-9]*$/.test(obj.value) || obj.value == '' || obj.value >= 200) {
        alert("请输入大于0小于200的整数哟！");
        obj.focus();
        obj.value = onum;
        return false;
    }
    var prices = obj.parentNode.parentNode.getElementsByClassName("price")[0].innerHTML;
    servTotal1.value = parseInt(serinput.value) * parseFloat(serprice.innerHTML);
    servTotal2.value = parseInt(serinput2.value) * parseFloat(serprice2.innerHTML)
    servTotal = parseInt(serinput.value) * parseFloat(serprice.innerHTML) + parseInt(serinput2.value) * parseFloat(serprice2.innerHTML);
    fen += obj.value - onum;
    fens.innerHTML = fen;
    paymoney += (obj.value - onum) * prices;
    allmoney.innerHTML = paymoney.toFixed(2);
    servFee(paymoney);
    allmoney.innerHTML = (paymoney + fwf + banAll + servTotal).toFixed(2);
}

function handle(self, isAdd) {
    var countEl = self.parentNode.childNodes[3];
    curCount = parseFloat(countEl.value);

    var reduce = self.parentNode.childNodes[1];
    var price = self.parentNode.parentNode.getElementsByClassName("price")[0].innerHTML; /* 获取价格 */
    //  var foodname = self.parentNode.parentNode.getElementsByClassName("foodname")[0].innerHTML; /* 获取食物名 */
    //var foodId = self.parentNode.parentNode.childNodes[1].value;
    servTotal1.value = parseInt(serinput.value) * parseFloat(serprice.innerHTML);
    servTotal2.value = parseInt(serinput2.value) * parseFloat(serprice2.innerHTML)
    servTotal = parseInt(serinput.value) * parseFloat(serprice.innerHTML) + parseInt(serinput2.value) * parseFloat(serprice2.innerHTML);
    var foodId = self.parentNode.parentNode.childNodes[0].value;
    console.log(foodId);
    if (isAdd) {
        curCount++;
        console.log(curCount);
        fen++;
        reduce.style.display = "inline-block";
        countEl.style.display = "inline-block";
        paymoney += parseFloat(price);

        var fooddetails = "";
        var foods = "";
        if ($.cookie("Food") == null) {
            console.log(1);
            fooddetails = '{"FoodId":"' + foodid + '","Number":"' + curCount + '"}';
            foodnumbers = curCount;
        }
        else {
            var number = 2;
            var foodnumbers = 0;
            var istrue = false;
            var foodall = $.cookie("Food");
            foodall = foodall.substring(1, foodall.length - 1)
            var food = eval('(' + $.cookie("Food") + ')');
            $.each(food, function (i) {
                if (foodId == food[i].FoodId) {
                    number = 1;
                    return false;
                }
                else {
                    number = 2;
                    istrue = true;
                }
            })
            if (number == 1) {
                $.each(food, function (i) {
                    if (foodId == food[i].FoodId) {
                        food[i].Number = parseInt(food[i].Number) + 1;
                        fooddetails += '{"FoodId":"' + foodId + '","Number":"' + parseInt(food[i].Number) + '"},'
                        foodnumbers = parseInt(food[i].Number);
                    }
                    else {
                        fooddetails += '{"FoodId":"' + food[i].FoodId + '","Number":"' + food[i].Number + '"},'
                        foodnumbers = food[i].Number;
                    }
                })
            }
            else {
                fooddetails += ',{"FoodId":"' + foodId + '","Number":"' + curCount + '"}';
                fooddetails = foodall + fooddetails;
                foodnumbers = curCount;
            }
        }
        foods = "[" + fooddetails + "]";
        var foodfood = foods.replace("},]", "}]");
        $.cookie("Food", foodfood)
        console.log(foodfood);


        // prabola();
    } else {

        console.log(curCount);
        if (curCount <= 0) {
            curCount = 0;
            fen = fen;
            paymoney = paymoney;

        } else {
            curCount--;
            fen--;
            paymoney -= parseFloat(price);


            var fooddetails = "";
            var foods = "";
            if ($.cookie("Food") == null) {
                console.log(1);
                fooddetails = '{"FoodId":"' + foodid + '","Number":"' + curCount + '"}';
                foodnumbers = curCount;
            }
            else {
                var number = 2;
                var foodnumbers = 0;
                var istrue = false;
                var foodall = $.cookie("Food");
                foodall = foodall.substring(1, foodall.length - 1)
                var food = eval('(' + $.cookie("Food") + ')');
                $.each(food, function (i) {
                    if (foodId == food[i].FoodId) {
                        number = 1;
                        return false;
                    }
                    else {
                        number = 2;
                        istrue = true;
                    }
                })
                if (number == 1) {
                    $.each(food, function (i) {
                        if (foodId == food[i].FoodId) {
                            food[i].Number = parseInt(food[i].Number) - 1;
                            fooddetails += '{"FoodId":"' + foodId + '","Number":"' + parseInt(food[i].Number) + '"},'
                            foodnumbers = parseInt(food[i].Number);
                        }
                        else {
                            fooddetails += '{"FoodId":"' + food[i].FoodId + '","Number":"' + food[i].Number + '"},'
                            foodnumbers = food[i].Number;
                        }
                    })
                }
                else {
                    fooddetails += ',{"FoodId":"' + foodId + '","Number":"' + curCount + '"}';
                    fooddetails = foodall + fooddetails;
                    foodnumbers = curCount;
                }
            }
            foods = "[" + fooddetails + "]";
            var foodfood = foods.replace("},]", "}]");
            $.cookie("Food", foodfood)
            console.log(foodfood);
        }
    }

    fens.innerHTML = fen;
    if (fen == 0) {
        fens.style.display = 'none';
    } else {
        fens.style.display = '';
    }
    servFee(paymoney);
    countEl.value = curCount;
    allmoney.innerHTML = (paymoney + fwf + banAll + servTotal).toFixed(2);
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

    console.log(fee.value);
}
