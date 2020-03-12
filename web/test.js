function test1() {
    console.log("begin");
    for (var i=0;i<15;i++){
        for (var j=0;j<15;j++){
            if(hasNeighbour(i,j,2,1 && chessboard[i][j]==0)){
                var sb=CalPointScoreX(i,j,1);
                var sw=CalPointScoreX(i,j,-1);
                console.log('i :'+i+'j:'+j+'blackScore='+sb+'  whiteScore='+sw);
            }




        }
    }
}
function test2() {
    var a=[];
    a.push(1);
    var b=[];
    b.push(3);
    var c=[];

    c.push(2);

    console.log(a.concat(b.concat(c)));
    console.log(a.concat(b).concat(c));
}

function test3() {
    console.log(whiteTotal);
    console.log(blackTotal);
   console.log(blackScore);
    console.log(whiteScore);
   // console.log(blackScoreDir);
    //console.log(whiteScoreDir);
}
function test4() {
    var temp=CreateArray1(15,15);
    var tempp=CreateArray1(15,15);
    for (var i=0;i<15;i++){

        for (var j=0;j<15;j++){
            var p = CalPointScoreX(i,j, 1, 5);
            var pp = CalPointScoreX(i,j, -1, 5);
            temp[i][j]=p;
            tempp[i][j]=pp;
        }
    }
   // console.log(whiteTotal);
    //console.log(blackTotal);
    console.log(temp);
    console.log(tempp);
}

function test5() {
    for (var i=0;i<4;i++){
        for (var j=0;j<15;j++){
            for(var k=0;k<15;k++){
                updateApoint(j,k,i);
            }
        }
    }
    blackTotal=0;
    whiteTotal=0;




}
function test6() {
    for (var i=0;i<15;i++){
        for (var j=0;j<15;j++){
            var w=CalPointScoreX(i,j,-1,5);
            var b=CalPointScoreX(i,j,1,5);
            blackScore[i][j]=b;
            whiteScore[i][j]=w;


        }
    }
}

function test7() {
    console.log(map);
}