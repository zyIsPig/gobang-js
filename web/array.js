
function CreateArray1(m,n) {
    var temp=[];
    for (var i=0;i<m;i++){
        var temp1=new Array();
        for (var j=0;j<n;j++){

            temp1.push(0);
        }
        temp.push(temp1);
    }
    return temp;

}
function CreateArray(m,n,k) {
    var temp=[];
    for (var i=0;i<m;i++){
        var temp1=new Array();
        for (var j=0;j<n;j++){
            var temp2=new Array();
            for (var t=0;t<k;t++){
                temp2.push(0);
            }

            temp1.push(temp2);
        }
        temp.push(temp1);
    }
    return temp;

}

function arrayPrint(chessboard) {
    for (var i=0;i<15;i++){
        var temp=i+"    ";
        for (var j=0;j<15;j++){
            temp+=chessboard[i][j];
            temp+=" ";

        }
        console.log(temp);



    }
    console.log("");


}

function arrayadd(added,adder) {
    var a=[];
    for (var i=0;i<adder.length;i++){
        var temp=adder[i];
        a.push(temp);
    }
    added.push(a);

}

function test() {
    alert("success");
}
var threshold = 1.15;
var greatThan = function(a, b) {
    return b >= 0 ? (a >= (b+0.1) * threshold) : (a >= (b+0.1) / threshold) // 注意处理b为0的情况，通过加一个0.1 做简单的处理
}
var equal = function(a, b) {
    b = b || 0.01
    return b >= 0 ? ((a >= b / threshold) && (a <= b * threshold))
        : ((a >= b * threshold) && (a <= b / threshold))
}
var greatOrEqualThan = function(a, b) {
    return equal(a, b) || greatThan(a, b)
}