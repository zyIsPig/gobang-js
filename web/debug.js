var genTimer=0;
var pointScoreTimer=0;
var totalTimer=0;

var hasNeiTimer=0;

var initemp=0;

var starcost;
var starcut;

var testStar=true;

var starcount=0;

var miss=0;

var steptest=true;

var stepcount=0;

var stepmiss=0;

var c1=0;
var c2=0;

var attacktemp=[];

var countt=1;

var cacheTime=0;

var dd=0;

var killtime=0;

var updatetime=0;
function debugInitial() {
    genTimer=0;
    pointScoreTimer=0;
    totalTimer=0;
    hasNeiTimer=0;
}

function nbbb() {
    alert("aaaaa");
}

function checkPointScore() {
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

function checkini() {
    alert(ini);
}
function checkScore() {
    PointScore(5);
    console.log(blackScore);
    console.log(whiteScore);

    console.log("end");
}

function checkScore2() {
    checkScore();
    chessboard[7][7]=1;
    updateScore(7,7);
    checkScore();

    chessboard[7][7]=0;
    updateScore(7,7);
    checkScore();
}

function checkMi() {
    chessboard[7][7]=1;
    attackCheck(7,7);
    console.log(attackPoint);
    chessboard[6][6]=-1;
    defentCheck(6,6);
    console.log(defentPoint);

    chessboard[6][8]=1;
    attackCheck(6,8);
    console.log(attackPoint);

    chessboard[7][5]=-1;
    defentCheck(7,5);
    console.log(defentPoint);

    chessboard[5][9]=1;
    var i=attackCheck(5,9);
    console.log(attackPoint);


    chessboard[5][9]=0;
    //attackCheck(5,9);
    if(i){
        attackPoint.pop();
    }
    console.log(attackPoint);

}

function checkstar() {
    console.log(starCheck([7,7],[9,9]));

    console.log(starCheck([5,5],[5,9]));

    console.log(starCheck([10,10],[11,11]));

}

function checkgen() {
   var test= gen(1);

   console.log(test);

   test= gen(-1);

   console.log(test);
}

function scoreCheck() {
    console.log('whiteTotal='+whiteTotal);
    return whiteTotal-blackTotal;
}