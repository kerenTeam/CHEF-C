//总份数 
/***/

var fens = document.getElementById("fen");
var fen;
var numberall = 0;
if ($.cookie("Number") != null) {
    numberall = $.cookie("Number");
}
/** 总价格 */
//var allmoney = document.getElementById("allmoney");
$("allmoney").html()
var paymoney = parseFloat($("allmoney").html());
//服务费
var fee = document.getElementById('fee');
var ff = document.getElementsByClassName('ff')[0];
var servmoeny = document.getElementById("servmoney");
var fwf=0;
//当前输入框的值
var curCount;
var onum = 0;
//加载完成统计份数和总价
window.onload = function () {
    var ordFen = document.getElementsByClassName('numTxt');
    var ordPrice = document.getElementsByClassName('price');
    fen = 0;
    paymoney = 0;
    for (var i = 0; i < ordFen.length; i++) {
        fen += parseInt(ordFen[i].value);
        paymoney += parseFloat(parseInt(ordFen[i].value) * parseFloat(ordPrice[i].innerHTML));
    }
    if ($.cookie("Number") != null) {
        numberall = $.cookie("Number");
        fens.innerHTML = numberall;
    } else {
        fens.innerHTML = fen;
    }
    if (numberall == 0) {
        fens.style.display = 'none';
    } else {
        fens.style.display = 'inline-block';
    }
    if ($.cookie("DinnerMoney") == null) {
        $.cookie("DinnerMoney", 0)
    }
    if ($.cookie("FoodMoney") == null) {
        $.cookie("FoodMoney", 0)
    }
    if ($.cookie("CeleMoney") == null) {
        $.cookie("CeleMoney", 0)
    }
    if ($.cookie("WaiterMoney") == null) {
        $.cookie("WaiterMoney", 0)
    }
    if ($.cookie("FuwuMoney") == null) {
        $.cookie("FuwuMoney", 0);
    }
    allmoney.innerHTML = parseInt($.cookie("FuwuMoney")) + parseInt($.cookie("WaiterMoney")) + parseInt($.cookie("FoodMoney")) + parseInt($.cookie("DinnerMoney")) + parseInt($.cookie("CeleMoney"));
}

//键盘松开时 限制非数值型输入
function IsNum(e) {
    var k = window.event ? e.keyCode : e.which;
    if (((k >= 48) && (k <= 57)) || k == 8 || k == 0) { } else {
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
    onum = parseInt(t.value);
}
//同步输入 验证+数量总价显示
function waiterueserWrite(obj, foodid) {
    curCount = parseInt(obj.value);
    if (curCount >= 2000) {
        alert("请输入小于2000的整数哟！");
        obj.focus();
        obj.value = 2000;
        //return false;
    }
    if (!/^[0-9]*[1-9][0-9]*$/.test(curCount) || curCount == '') {
        obj.value = 0;
    }
    var prices = obj.parentNode.parentNode.getElementsByClassName("price")[0].innerHTML;
    fen += obj.value - onum;
    if ($.cookie("Number") != null) {
        var shuliang = $.cookie("Number");
        $.cookie("Number", parseFloat(shuliang) + parseFloat(obj.value - onum));
        numberall = $.cookie("Number");
        fens.innerHTML = numberall;

    } else {
        $.cookie("Number", obj.value - onum);
        fens.innerHTML = $.cookie("Number");
    }
    if (numberall == 0) {
        fens.style.display = 'none';
    } else {
        fens.style.display = 'inline-block';
    }
    var fooddetails = "";
    var foods = "";
    var money=0
    if ($.cookie("Waiter") == null) {
        fooddetails = '{"FoodId":"' + foodid + '","Number":"' + curCount + '","Price":"' + prices + '"}';
        foodnumbers = curCount;
        money = curCount * prices;
    }
    else {
        var number = 2;
        var foodnumbers = 0;
        var istrue = false;


        var foodall = $.cookie("Waiter");
        foodall = foodall.substring(1, foodall.length - 1)
        var food = eval('(' + $.cookie("Waiter") + ')');
        $.each(food, function (i) {
            if (foodid == food[i].FoodId) {
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
                if (foodid == food[i].FoodId) {
                    food[i].Number = parseInt(food[i].Number) + 1;
                    fooddetails += '{"FoodId":"' + foodid + '","Number":"' + obj.value + '","Price":"' + food[i].Price + '"},'
                    foodnumbers = parseInt(food[i].Number);
                    money += obj.value * food[i].Price;
                }
                else {
                    fooddetails += '{"FoodId":"' + food[i].FoodId + '","Number":"' + food[i].Number + '","Price":"' + food[i].Price + '"},'
                    foodnumbers = food[i].Number;
                    money += food[i].Number * food[i].Price;
                }
            })
        }
        else {
            fooddetails += ',{"FoodId":"' + foodid + '","Number":"' + obj.value + '","Price":"' + prices + '"}';
            fooddetails = foodall + fooddetails;
            foodnumbers = curCount;
            money = parseFloat($.cookie("WaiterMoney")) + parseFloat((obj.value * prices));
        }
    }
    $.cookie("WaiterMoney", money);
    if ($.cookie("FoodMoney") == null) {
        $.cookie("FoodMoney", 0);
    }
    if ($.cookie("CeleMoney") == null) {
        $.cookie("CeleMoney", 0)
    }
    if ($.cookie("DinnerMoney") == null) {
        $.cookie("DinnerMoney", 0)
    }
    if ($.cookie("WaiterMoney") == null) {
        $.cookie("WaiterMoney", 0)
    }
    if ($.cookie("FuwuMoney") == null) {
        $.cookie("FuwuMoney", 0);
    }
    allmoney.innerHTML = parseInt($.cookie("FuwuMoney")) + parseInt($.cookie("WaiterMoney")) + parseInt($.cookie("FoodMoney")) + parseInt($.cookie("DinnerMoney")) + parseInt($.cookie("CeleMoney"));
    foods = "[" + fooddetails + "]";
    var foodfood = foods.replace("},]", "}]");
    $.cookie("Waiter", foodfood)
    console.log($.cookie("Waiter"))
}

//加减操作
function waiterhandle(self, isAdd, foodid) {
    var id = foodid;
    var countEl = self.parentNode.childNodes[3];
    curCount = parseFloat(countEl.value);

    var reduce = self.parentNode.childNodes[1];
    var price = self.parentNode.parentNode.getElementsByClassName("price")[0].innerHTML; /* 获取价格 */
    //var foodId = self.parentNode.parentNode.parentNode.getElementsByName("foodid").value;
    //console.log(foodId);
    console.log(price)

    if (isAdd) {
        curCount++;
        fen++;
        reduce.style.display = "inline-block";
        countEl.style.display = "inline-block";
        paymoney += parseFloat(price);
        // prabola();
        var fooddetails = "";
        var foods = "";
        if ($.cookie("Waiter") == null) {
            fooddetails = '{"FoodId":"' + foodid + '","Number":"' + curCount + '","Price":"' + price + '"}';
            foodnumbers = curCount;
        }
        else {
            var number = 2;
            var foodnumbers = 0;
            var istrue = false;
            var foodall = $.cookie("Waiter");
            foodall = foodall.substring(1, foodall.length - 1)
            var food = eval('(' + $.cookie("Waiter") + ')');
            $.each(food, function (i) {
                if (foodid == food[i].FoodId) {
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
                    if (foodid == food[i].FoodId) {
                        food[i].Number = parseInt(food[i].Number) + 1;
                        fooddetails += '{"FoodId":"' + foodid + '","Number":"' + parseInt(food[i].Number) + '","Price":"'+price+'"},'
                        foodnumbers = parseInt(food[i].Number);
                    }
                    else {
                        fooddetails += '{"FoodId":"' + food[i].FoodId + '","Number":"' + food[i].Number + '","Price":"' + price + '"},'
                        foodnumbers = food[i].Number;
                    }
                })
            }
            else {
                fooddetails += ',{"FoodId":"' + foodid + '","Number":"' + curCount + '","Price":"' + price + '"}';
                fooddetails = foodall + fooddetails;
                foodnumbers = curCount;
            }
        }
        foods = "[" + fooddetails + "]";
        var foodfood = foods.replace("},]", "}]");
        $.cookie("Waiter", foodfood)
        console.log(foodfood);
        if ($.cookie("Number") != null) {
            numbers = $.cookie("Number");
            $.cookie("Number", parseFloat(numbers) + 1);
            $("#fen").html($.cookie("Number"))
        }
        else {
            $.cookie("Number", parseFloat(1));
            $.cookie("Number", parseFloat(1));
        }
    } else {
        if (curCount <= 0) {
            curCount = 0;
            paymoney = paymoney;
            fen = fen;

        } else {
            curCount--;
            fen--;
            paymoney -= parseFloat(price);
            var number = 2;
            var foodnumbers = 0;
            var istrue = false;
            var foodall = $.cookie("Waiter");
            var fooddetails = "";
            foodall = foodall.substring(1, foodall.length - 1)
            var food = eval('(' + $.cookie("Waiter") + ')');
            $.each(food, function (i) {
                if (foodid == food[i].FoodId) {
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
                    if (foodid == food[i].FoodId) {
                        food[i].Number = parseInt(food[i].Number) - 1;
                        fooddetails += '{"FoodId":"' + foodid + '","Number":"' + parseInt(food[i].Number) + '","Price":"' + price + '"},'
                        console.log(fooddetails)
                        foodnumbers = parseInt(food[i].Number);
                    }
                    else {
                        fooddetails += '{"FoodId":"' + food[i].FoodId + '","Number":"' + food[i].Number + '","Price":"' + price + '"},'
                        foodnumbers = food[i].Number;
                    }
                })
            }
            else {
                fooddetails += ',{"FoodId":"' + foodid + '","Number":"' + curCount + '","Price":"' + price + '"}';
                fooddetails = foodall + fooddetails;
                foodnumbers = curCount;
            }
            foods = "[" + fooddetails + "]";
            var foodfood = foods.replace("},]", "}]");
            $.cookie("Waiter", foodfood)
            console.log(foodfood);
            if ($.cookie("Number") != null) {
                numbers = $.cookie("Number");
                $.cookie("Number", parseFloat(numbers) - 1);
                $("#fen").html($.cookie("Number"))
            }
        }
    }
    if ($.cookie("Number") != null) {
        numberall = $.cookie("Number");
        fens.innerHTML = numberall;
    } else {
        fens.innerHTML = fen;
    }
    if (numberall == 0) {
        fens.style.display = 'none';
    } else {
        fens.style.display = 'inline-block';
    }
    countEl.value = curCount;
    var foodmoney = $.cookie("Waiter");
    var foodmoneys = eval('(' + foodmoney + ')');
    var foodmoneyall = 0;
    $.each(foodmoneys, function (i) {
        foodmoneyall += parseFloat(foodmoneys[i].Number) * parseFloat(foodmoneys[i].Price)
    })
    $.cookie("WaiterMoney", foodmoneyall);
    if ($.cookie("FoodMoney") == null) {
        $.cookie("FoodMoney", 0)
    }
    if ($.cookie("DinnerMoney") == null) {
        $.cookie("DinnerMoney", 0)
    }
    if ($.cookie("CeleMoney") == null) {
        $.cookie("CeleMoney", 0)
    }
    if ($.cookie("FuwuMoney") == null) {
        $.cookie("FuwuMoney", 0);
    }
    allmoney.innerHTML = (parseInt($.cookie("FuwuMoney")) + parseInt($.cookie("WaiterMoney")) + parseInt($.cookie("FoodMoney")) + parseInt($.cookie("CeleMoney")) + parseInt($.cookie("DinnerMoney"))).toFixed(2);

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
    }
}
