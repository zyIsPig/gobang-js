//importScripts();
var score=[];
var blackScore=CreateArray1(15,15);
var blackScoreDir=CreateArray(15,15,4);
var blackTotal=0;
var whiteTotal=0;
var whiteScore=CreateArray1(15,15);
var whiteScoreDir=CreateArray(15,15,4);
var zyispig=[];
var attackPoint=[];
var defentPoint=[];

var ttt=0;
var qqq=0;
var gocnt=0;
var bacnt=0;



function zabrist_init() {
    chessboard
}

function attackCheck(x,y) {
    var color=chessboard[x][y];
    var temp=CalPointScoreX(x,y,color,5);

    if(temp>=three){
        attackPoint.push([x,y]);
        return 1;
    }



    if(attackPoint.length==0){
        attackPoint.push([x,y]);
        return 1;
    }
    return 0;
}

function defentCheck(x,y) {
    var color=chessboard[x][y];

    var temp=CalPointScoreX(x,y,color,5);

    if(temp>=three){
        defentPoint.push([x,y]);
        return 1;
    }

    if(defentPoint.length==0){
        defentPoint.push([x,y]);
        return 1;
    }
    return 0;
}

function starCheck(p1,p2) {
    if(p1==undefined || p2==undefined){
        //console.log('w1');
        return false;
    }
     if(Math.abs(p1[0]-p2[0])>4 || Math.abs(p1[1]-p2[1])>4){
         //console.log('w2');

         return false;
     }
     if(p1[0]==p2[0] || p1[1]==p2[1] || Math.abs(p1[0]-p2[0])==Math.abs(p1[1]-p2[1])){
         return true;
     }
   // console.log('w3');
 //    console.log(p1);
 //    console.log(p2);

    return false;
}






function hasNeighbour(x,y,len,c) {
    for (var i=x-len;i<=x+len;i++){
        if(i<0 || i>=15 ){
            continue;
        }
        for (var j=y-len;j<=y+len;j++){
            if(j<0 || j>=15){
                continue;
            }
            if(i==x && j==y){
                continue;
            }
            if(chessboard[i][j]!=0){
                c--;
                if(c==0){
                    return true;
                }
            }
        }

    }
    return false;


}

function unpdatePointScore(x,y) {
    //console.log('bl'+blackTotal);
    var i=0;
    var j=0;
    if(chessboard[x][y]==-1){
        blackTotal=blackTotal-blackScore[x][y];
        blackScore[x][y]=0;
        whiteTotal=whiteTotal-whiteScore[x][y];
        whiteScore[x][y]=CalPointScoreX(x,y,-1);
        whiteTotal=whiteTotal+whiteScore[x][y];
    }
    else if(chessboard[x][y]==1){
        whiteTotal=whiteTotal-whiteScore[x][y];
        whiteScore[x][y]=0;
        blackTotal=blackTotal-blackScore[x][y];
        blackScore[x][y]=CalPointScoreX(x,y,1);
        blackTotal=blackTotal+blackScore[x][y];
    }
    else {
        whiteTotal=whiteTotal-whiteScore[x][y];
        whiteScore[x][y]=CalPointScoreX(x,y,-1);
        whiteTotal+=whiteScore[x][y];

        blackTotal=blackTotal-blackScore[x][y];
        blackScore[x][y]=CalPointScoreX(x,y,1);
        blackTotal+=blackScore[x][y];

    }
    for (var k=0;k<4;k++){
        var dir=zy[k];
        i=dir[0];
        j=dir[1];

        var tempi=x-i;
        var tempj=y-j;
        var count=5;




        while(count!=0){
           // console.log("zyispig");

                if(tempi-i<0 || tempi-i>=15 || tempj-j<0 || tempj-j>=15){
                    break;
                }
            // if( !hasNeighbour(tempi,tempj,2,1)){
            //
            // }

            else {
               // if(chessboard[tempi][tempj])

                var valueb = CalPointScoreX(tempi, tempj, 1);
                blackTotal = blackTotal - blackScore[tempi][tempj];
                blackScore[tempi][tempj] = valueb;
                blackTotal = blackTotal + blackScore[tempi][tempj];
               // console.log(blackTotal);

                var valuew = CalPointScoreX(tempi, tempj, -1);
                whiteTotal = whiteTotal - whiteScore[tempi][tempj];
                whiteScore[tempi][tempj] = valuew;
                whiteTotal = whiteTotal + whiteScore[tempi][tempj];

            }
            tempi = tempi - i;
            tempj = tempj - j;
            count--;

        }
        tempi=x+i;
        tempj=y+i;
        count=5;
        while(count!=0){
           //console.log("zyispig");

            if(tempi+i<0 || tempi+i>=15 || tempj+j<0 || tempj+j>=15){
                break;
            }
            // if(!hasNeighbour(tempi,tempj,2,1)){
            //
            // }
            else {
                var valueb = CalPointScoreX(tempi, tempj, 1);
                blackTotal = blackTotal - blackScore[tempi][tempj];
                blackScore[tempi][tempj] = valueb;
                blackTotal = blackTotal + blackScore[tempi][tempj];

                var valuew = CalPointScoreX(tempi, tempj, -1);
                whiteTotal = whiteTotal - whiteScore[tempi][tempj];
                whiteScore[tempi][tempj] = valuew;
                whiteTotal = whiteTotal + whiteScore[tempi][tempj];

            }
            tempi = tempi + i;
            tempj = tempj + j;
            count--;

        }

    }
    //console.log('bt='+whiteTotal);
}


function updateScore(x,y) {

    //var role=chessboard[x][y];
    var color=chessboard[x][y];

    if(color==1){
        blackTotal-=blackScore[x][y];
        !fixed&&(blackScore[x][y]=CalPointScoreX(x,y,1,5));
       fixed&& (blackScore[x][y]=fixedScore(x,y,1,5));
        blackTotal+=blackScore[x][y];

        whiteTotal-=whiteScore[x][y];
        whiteScore[x][y]=0;

    }
    if(color==-1){
        whiteTotal-=whiteScore[x][y];
       ! fixed&&(whiteScore[x][y]=CalPointScoreX(x,y,-1,5));
        fixed&&(whiteScore[x][y]=fixedScore(x,y,-1,5));
        whiteTotal+=whiteScore[x][y];

        blackTotal-=blackScore[x][y];
        blackScore[x][y]=0;
    }
    if(color==0){
        blackTotal-=blackScore[x][y];
       !fixed&& (blackScore[x][y]=CalPointScoreX(x,y,1,5));
       fixed&&(blackScore[x][y]=fixedScore(x,y,1,5));

        blackTotal+=blackScore[x][y];


        whiteTotal-=whiteScore[x][y];
        !fixed&&(whiteScore[x][y]=CalPointScoreX(x,y,-1,5));
        fixed&&(whiteScore[x][y]=fixedScore(x,y,-1,5));

        whiteTotal+=whiteScore[x][y];
    }



    for (var i=0;i<4;i++){
        var tempx=zy[i][0];
        var tempy=zy[i][1];

        var tempi=x+tempx;
        var temj=y+tempy;
        var count=5;

        while(count!=0){
            if(tempi<0 || tempi>=15 || temj<0 || temj>=15){
                break;
            }
            // if(!hasNeighbour(tempi,temj,2,1)){
            //     break;
            // }
            updateApoint(tempi,temj,i);
            tempi+=tempx;
            temj+=tempy;
            count--;

        }
        tempi=x-tempx;
        temj=y-tempy;
        count=5;

        while(count!=0){
            if(tempi<0 || tempi>=15 || temj<0 || temj>=15){
                break;
            }
            // if(!hasNeighbour(tempi,temj,2,1)){
            //     break;
            // }
            updateApoint(tempi,temj,i);
            tempi-=tempx;
            temj-=tempy;
            count--;

        }


    }



}
function updateApoint(x,y,dir) {
    var role=chessboard[x][y];

    if(role==1){
        blackScore[x][y]-=blackScoreDir[x][y][dir];
        blackTotal=blackTotal-blackScoreDir[x][y][dir];
       !fixed &&( blackScoreDir[x][y][dir]=CalPointScoreX(x,y,role,dir));
       fixed && (blackScoreDir[x][y][dir]=fixedScore(x,y,role,dir));

        // console.log('dir='+dir+'score='+blackScoreDir[x][y][dir]);
        blackScore[x][y]+=blackScoreDir[x][y][dir];
        blackTotal+=blackScoreDir[x][y][dir];

       // whiteTotal-=whiteScore[x][y];
       // whiteScore[x][y]=0;

    }
    else if(role==-1){
        whiteScore[x][y]-=whiteScoreDir[x][y][dir];
        whiteTotal=whiteTotal-whiteScoreDir[x][y][dir];
        !fixed&&(whiteScoreDir[x][y][dir]=CalPointScoreX(x,y,role,dir));
        fixed &&(whiteScoreDir[x][y][dir]=fixedScore(x,y,role,dir));
        whiteScore[x][y]+=whiteScoreDir[x][y][dir];
        whiteTotal+=whiteScoreDir[x][y][dir];

      //  blackTotal-=blackScore[x][y];
     //   blackScore[x][y]=0;
    }
    else{
        blackScore[x][y]-=blackScoreDir[x][y][dir];
        blackTotal=blackTotal-blackScoreDir[x][y][dir];
        //var kk = fixedScore(x,y,1,dir);
       // console.log('dir='+dir+'score='+kk);
        fixed&&(blackScoreDir[x][y][dir]=fixedScore(x,y,1,dir));
        !fixed&&(blackScoreDir[x][y][dir]=CalPointScoreX(x,y,1,dir));
        blackScore[x][y]+=blackScoreDir[x][y][dir];
        blackTotal+=blackScoreDir[x][y][dir];

        whiteScore[x][y]-=whiteScoreDir[x][y][dir];
        whiteTotal=whiteTotal-whiteScoreDir[x][y][dir];
       fixed&& (whiteScoreDir[x][y][dir]=fixedScore(x,y,-1,dir));
       !fixed&& (whiteScoreDir[x][y][dir]=CalPointScoreX(x,y,-1,dir));
        whiteScore[x][y]+=whiteScoreDir[x][y][dir];
        whiteTotal+=whiteScoreDir[x][y][dir];
    }



}
function PointScore(dir) {
    whiteTotal=0;
    blackTotal=0;

    for (var i=0;i<15;i++){
        for (var j=0;j<15;j++){
            if(hasNeighbour(i,j,2,1) || chessboard[i][j]!=0){
                if(chessboard[i][j]==0){
                    blackScore[i][j]=CalPointScoreX(i,j,1,dir);
                    whiteScore[i][j]=CalPointScoreX(i,j,-1,dir);
                }
                else if(chessboard[i][j]==1){
                    whiteScore[i][j]=0;
                    blackScore[i][j]=CalPointScoreX(i,j,1,dir);
                }
                else if(chessboard[i][j]==-1) {
                    blackScore[i][j]=0;
                    whiteScore[i][j]=CalPointScoreX(i,j,-1,dir);
                }
                whiteTotal+=whiteScore[i][j];
                blackTotal+=blackScore[i][j];
            }




        }


    }
    //console.log(blackTotal);
    //console.log(whiteTotal);

}

function gen(com,depth,td) {
    //var sta=new Date();

    var comfivetemp = [];
    var comfourtemp = [];
    var comblockfourtemp = [];
    var comtwothreetemp = [];
    var comthreetemp = [];
    var comtwotemp = [];


    var humfivetemp = [];
    var humfourtemp = [];
    var humblockfourtemp = [];
    var humtwothreetemp = [];
    var humthreetemp = [];
    var humtwotemp = [];
    var othertemp = [];

    var attack = [];
    var defent = [];

    var potentialPoint = [];

    var comtemp = 0;
    var humtemp = 0;
    if (starGo) {
        var sta = new Date();
        for (var i = step.length - 1; i >= 0; i -= 2) {
            var point = step[i];
            //console.log(point);
            var co = chessboard[point[0]][point[1]];
            var p;
            var p = CalPointScoreX(point[0], point[1], co, 5);
            // if(co==1){
            //     p=blackScore[point[0]][point[1]];
            // }
            // else {
            //
            //     p=whiteScore[point[0]][[point[1]]];
            // }
            if (p > three) {
                attack.push([point[0], point[1]]);
                break;
            }
        }

        for (var i = step.length - 2; i >= 0; i -= 2) {
            var point = step[i];
            //console.log(point);
            var p;
            // if(chessboard[point[0]][point[1]==1]){
            //     p=blackScore[point[0]][point[1]];
            // }
            // else {
            //     p=whiteScore[point[0]][point[1]];
            // }
            var p = CalPointScoreX(point[0], point[1], chessboard[point[0]][point[1]], 5);
            if (p > three) {
                defent.push([point[0], point[1]]);
                break;
            }
        }

        if (attack.length == 0) {
            var point = step[step.length - 1];
            attack.push([point[0], point[1]]);
        }
        if (defent.length == 0) {
            var point = step[step.length - 2];

            defent.push([point[0], point[1]]);
        }
        var end = new Date();
        starcost += (end - sta);
    }


    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (chessboard[i][j] != 0) {
                continue;
            }
            if (count >= 12 && !hasNeighbour(i, j, 2, 2)) {

                continue;
            }
            if (count < 12 && !hasNeighbour(i, j, 1, 1)) {
                // console.log("boook");
                continue;
            }
            // console.log(attackPoint);
            // console.log(defentPoint);
            if(com==1){
                comtemp=blackScore[i][j];
                humtemp=whiteScore[i][j];
            }else {
                comtemp = whiteScore[i][j];
                humtemp = blackScore[i][j];
            }

        // comtemp = CalPointScoreX(i, j, com, 5);
        // humtemp = CalPointScoreX(i, j, -com, 5);
        // if (com == -1){
        //     if(comtemp==whiteScore[i][j] && humtemp==blackScore[i][j]){
        //
        //     }
        //     else {
        //         ttt++;
        //     }
        //
        //
        // }else {
        //    if(comtemp==blackScore[i][j] && humtemp==whiteScore[i][j]){
        //
        //    }else {
        //        qqq++;
        //    }

    // if (!CalPointScoreX(i,j,com,5)==comtemp){
    //     ttt++;
    // }
    // if(!CalPointScoreX(i,j,-com,5)==humtemp){
    //     qqq++;
    // }


    var maxtemp = Math.max(comtemp, humtemp);
    if (maxtemp > maxscore) {
        maxscore = maxtemp;
    }
    // starCheck()
    if (starGo) {
        //good bug
        var a = starCheck(attack[attack.length - 1], [i, j]);
        var b = starCheck(defent[defent.length - 1], [i, j]);

        // console.log(a, b);
        if (maxtemp >= blockfour) {

        } else if ((starGo) && (!a) && (!b)) {
            //console.log(attack);
            //console.log(defent);
            //console.log(step);
            // console.log("lplp");
            //  console.log('attack' + attack);
            //  console.log('defent' + defent);
            //  console.log(i, j);
            starcut++;
            continue;
        }
        // if (starGo) {
        //     //alert('pqq');
        //     //console.log(i, j);
        // }
    }


    //console.log(i,j);


    /**
     * bug 8.2
     * comscore and humscore should be treated
     * @type {number}
     */


    if (comtemp >= five) {
        comfivetemp.push([i, j, comtemp]);

    } else if (humtemp >= five) {
        humfivetemp.push([i, j, -humtemp]);

    } else if (comtemp >= four) {
        comfourtemp.push([i, j, comtemp]);
        //return fivetemp;
    } else if (humtemp >= four) {
        humfourtemp.push([i, j, -humtemp]);
        //return fivetemp;
    } else if (comtemp >= blockfour) {
        comblockfourtemp.push([i, j, comtemp]);
        // return four;
    } else if (humtemp >= blockfour) {
        humblockfourtemp.push([i, j, -humtemp]);
        // return four;
    } else if (comtemp >= 2000) {
        comtwothreetemp.push([i, j, comtemp]);
    } else if (humtemp >= 2000) {
        humtwothreetemp.push([i, j, -humtemp]);
    } else if (comtemp >= three) {
        comthreetemp.push([i, j, comtemp]);
    } else if (humtemp >= three) {
        humthreetemp.push([i, j, -humtemp]);
    } else if (comtemp >= 2 * two) {
        potentialPoint.push([i, j, comtemp]);
    } else if (comtemp >= two) {
        comtwotemp.push([i, j, comtemp]);
        if (depth == td) {

            waitlist.push([i, j, comtemp]);
        }
    } else if (humtemp >= two) {
        humtwotemp.push([i, j, humtemp]);
    } else {
        othertemp.push([i, j, maxtemp]);
    }
//......................................................

}











        }


    // if(depth==td){
    //     for (var i=0;i<potentialPoint.length;i++){
    //         var x=potentialPoint[i][0];
    //         var y=potentialPoint[i][1];
    //         chessboard[x][y]=com;
    //         attackpath.push([x,y]);
    //         var t=vcx(com,12);
    //
    //
    //
    //         attackpath.pop();
    //         chessboard[x][y]=0;
    //
    //         if(t==false){
    //
    //         }else {
    //             comblockfourtemp.push(comtwotemp[i]);
    //         }
    //     }
  //  }
    //var end=new Date();
    //genTimer+=(end-sta);


    if(comfivetemp.length>=1){
        win=true;
        return comfivetemp;
    }
    if(humfivetemp.length>=1){
        return humfivetemp;
    }
    if(comfourtemp.length>=1){
        return comfourtemp;
    }
    if(humfourtemp.length>=1 && comblockfourtemp.length>=1){

        return comblockfourtemp.concat(humfourtemp).concat(humblockfourtemp);
    }
    if(humfourtemp.length>=1 && comblockfourtemp.length<1){

        return humfourtemp.concat(humblockfourtemp);
    }

    if(comtwothreetemp.length>=1){
        // if(depth==4) {
        //     console.log("twothree");
        // }
        return comtwothreetemp.concat(comblockfourtemp).concat(comthreetemp).concat(humblockfourtemp).concat(humtwothreetemp).concat(humthreetemp);
    }
    if(humtwothreetemp.length>=1){
        //console.log("twothree");
        return humtwothreetemp.concat(comblockfourtemp).concat(humblockfourtemp).concat(humthreetemp);
    }

    if(comblockfourtemp.length>=1 || comthreetemp.length>=1 || humblockfourtemp.length>=1 || humthreetemp.length>=1){
        return comblockfourtemp.concat(comthreetemp.concat(humblockfourtemp.concat(humthreetemp)));
    }

    else{
        var t=potentialPoint.concat(comtwotemp).concat(humtwotemp).concat(othertemp).sort(function (a,b) {
            return b[2]-a[2];
        });

        return t;
    }

}


function minmax(depth,com,alpha,beta) {
   // var max=-99999999;
    var x=0;
    var y=0;
    if(depth==0){
        var sta=new Date();
        PointScore();
        var end=new Date();
        pointScoreTimer+=(end-sta);
        if(com==1) {
            return blackTotal-whiteTotal;
        }
        else {
            return whiteTotal-blackTotal;
        }

    }
    else{
        //console.log("com="+com);
        sta=new Date();
        var candidate=gen(com);
        end=new Date();
        genTimer+=(end-sta);

        //console.log(candidate);

        // for (var i=0;i<candidate.length;i++){
        //     console.log(candidate[i][0],candidate[i][1]);
        //     //console.log("");
        // }

        for (var i=0;i<candidate.length;i++) {
            var tempi = candidate[i][0];
            var tempj = candidate[i][1];
            //console.log(tempi,tempj);
            chessboard[tempi][tempj] = com;
            var sc = minmax(depth - 1, -com);
            //console.log("com= "+com+","+tempi+","+tempj+","+sc);
            if (alpha >= beta) {
                break;
            }
                if (sc >= alpha) {
                    max = sc;
                    x = tempi;
                    y = tempj;
                    if (depth == 4) {

                        zyispig.push([tempi, tempj]);
                        //console.log(tempi + "," + tempj + "," + max);
                    }

                }
                chessboard[tempi][tempj] = 0;

        }

        return max;


    }
}

var alphaCut=0;
var betaCut=0;
var len;
var zab={};
var id=[];

var win=false;

var maxscore=0;

var waitlist=[];

function max(depth,com,alpha,beta,totalDepth,spread,comStep,humStep) {
    var m=-maxsc;

    if(totalDepth>dd){
        dd=totalDepth;
    }
    //console.log(blackTotal);
    if(cacheConfig==1) {
        if (depth != totalDepth) {

            var a = map[ini];
            //console.log('ini'+ini);
            if (a) {
                if (a.depth >= depth) {
                    cacheCount++;
                   // console.log('max cache hit depth=' + a.depth + 'score=' + a.score);
                    return a.score;
                }


            }
        }
    }



    if(depth==0){
        leave++;

        if(debug==0){
            blackTotal=Cal2(1);
            whiteTotal=Cal2(-1);
            if(com==1){
                return blackTotal-whiteTotal;
            }
            else {
                return whiteTotal-blackTotal;
            }
            //return

        }else {

            if (com == 1) {


                return blackTotal - whiteTotal;
            } else {

                return whiteTotal - blackTotal;
            }
        }
    }


    var candidate;

    if(comStep>1&&humStep>1){
        starGo=1;
    }
    else {
        starGo=0;
    }
    if(depth==totalDepth && id.length>=1){
        candidate=id;
        id=[];
       // console.log("i catch you");
    }
    else {
        var sta=new Date();
        candidate=gen(com,depth,totalDepth);

        var end=new Date();
        genTimer+=(end-sta);
    }

   // genTimer+=(end-sta);
   //  if(candidate.length>=1){
   //      var s=candidate[0][2];
   //      var tempi=candidate[0][0];
   //      var tempj=candidate[0][1];
   //      if(s>=five && depth!==totalDepth){
   //          return maxsc;
   //      }
   //
   //      chessboard[tempi][tempj]=com;
   //      var sta=new Date();
   //      debug && updateScore(tempi,tempj);
   //      var end=new Date();
   //      pointScoreTimer+=(end-sta);
   //      put(tempi,tempj,com);
   //      // var steplen=step.length;
   //      step.push([tempi,tempj]);
   //
   //  }
   // var current;

    for (var i=0;i<candidate.length;i++){
        var s=candidate[i][2];

        //var count=0;
        var tempi=candidate[i][0];
        var tempj=candidate[i][1];



        if(s>=five && depth!==totalDepth){
            return maxsc;
        }

       //  chessboard[tempi][tempj]=com;
       //  var sta=new Date();
       //  debug && updateScore(tempi,tempj);
       //  var end=new Date();
       //  pointScoreTimer+=(end-sta);
       //  put(tempi,tempj,com);
       // // var steplen=step.length;
       //  step.push([tempi,tempj]);
        go(tempi,tempj,com);




        if(s<=-five && spread<fourLongCount){
            depth+=2;
            spread++;
            totalDepth+=2;
        }
        var sc;
        if(pvs) {
            if (i == 0) {
                sc = min(depth - 1, -com, alpha, beta, totalDepth, spread, comStep + 1, humStep);
            } else {


                sc = min(depth - 1, -com, alpha  , alpha+1, totalDepth, spread, comStep + 1, humStep);

                if (alpha < sc && sc < beta) {
                    sc = min(depth - 1, -com, sc, beta, totalDepth, spread, comStep + 1, humStep);
                }


            }
        }
        else {
            sc=min(depth - 1, -com, alpha, beta, totalDepth, spread, comStep + 1, humStep);
        }
            //sc = min(depth - 1, -com, alpha, beta);


       ba(tempi,tempj,com);

        if(sc>m){
            m=sc;
        }


        if(depth==totalDepth){
           // console.log('sc='+sc);

            id.push([tempi,tempj,sc]);
        }
        //console.log(sc,alpha);
        if(sc>=alpha){
            alpha=sc;
            if(depth==totalDepth){
                zyispig.push([tempi, tempj,sc]);
                console.log(tempi + "," + tempj + "," + sc);
            }
        }
        if(alpha>=beta){
            alphaCut++;
            return alpha;
        }



    }
    if(depth!=totalDepth) {
        var sta=new Date();
        savecache(depth, m);
        var end=new Date();
        cacheTime+=(end-sta);
    }
    return m;

}

function min(depth,com,alpha,beta,totalDepth,spread,comStep,humStep) {

    var m=maxsc;
    if(cacheConfig==1) {
        var a = map[ini];
        if (a) {
            if (a.depth >= depth) {
                cacheCount++;
                //console.log('pppppppö');
                return a.score;
            }


        }
    }
//
//     if(count<=8){
//         len=1;
//     }
// else {
//         len=2;
//     }
    if(comStep>1&&humStep>1){
        starGo=1;
    }
    else {
        starGo=0;
    }
    var sta=new Date();
    var candidate=gen(com,depth,totalDepth);
    var end=new Date();
    genTimer+=(end-sta);


    for (var i=0;i<candidate.length;i++){
        var tempi=candidate[i][0];
        var tempj=candidate[i][1];
        var s=candidate[i][2];

        if(s>=five){
            return -maxsc;
        }
       go(tempi,tempj,com);
      // var ans= defentCheck(tempi,tempj);
      //   if(s>=blockfour && s<four){
      //       console.log('fourgomin');
      //       console.log(chessboard);
      //
      //   if(s>=five){
      //       win=true;
      //       console.log('break2');
      //       break;
      //   }
        //   }
        if(s<=-five && spread<fourLongCount){
            depth+=2;
            totalDepth+=2;
            spread++;
        }
        var sc;
        if(pvs) {
            if (i == 0) {

                sc = max(depth - 1, -com, alpha, beta, totalDepth, spread, comStep, humStep + 1);
            } else {
                sc = max(depth - 1, -com, beta-1, beta, totalDepth, spread, comStep, humStep + 1);
                if (sc > alpha && sc < beta) {
                    sc = max(depth - 1, -com, alpha, sc, totalDepth, spread, comStep, humStep + 1);
                }
            }
        }
        else {
            sc=max(depth - 1, -com, alpha, beta, totalDepth, spread, comStep, humStep + 1);
        }

       ba(tempi,tempj,com);
        // if(ans){
        //     defentPoint.pop();
        // }
      // debug && unpdatePointScore(tempi,tempj);
    //    count--;

        if(sc<m){
            m=sc;
        }

        if(sc<beta){
            beta=sc;
        }
        if(alpha>=beta){
            betaCut++;
            return beta;

        }

        // if(alpha>beta){
        //     betaCut++;
        //
        //     break;
        // }
        // else {
        //     if(sc<beta){
        //         beta=sc;
        //
        //     }
        // }
    }
    var sta=new Date();
    savecache(depth,m);
    var end=new Date();
    cacheTime+=(end-sta);
    return m;

}

function iterationdepth(depth,com,alpha,beta) {

    var best=0;
    var sta=new Date();
    var ll=vcx(com,16);
    if(ll!=false){
        showImage();
        return ll;
    }
    var end=new Date();
    killtime+=(end-sta);

    for (var i=4;i<=depth;i+=2){
        if(i==depth){
            alphaCut=0;
            betaCut=0;
            cacheCount=0;
            leave=0;
        }
        max(i,com,alpha,beta,i,0,0,0);

        if(zyispig.length==0){
            //best
        }
        best=zyispig[zyispig.length-1];

        //var best=zyispig[zyispig.length-1];
        console.log('depth='+i);
       // console.log(zyispig);
        try{
            if(best[2]>=999999999 || best[2]<=-999999999){
                // console.log('boooooooooooooooo'+i);
                //alert('best get');
              //  showImage();
                alert("geng");

                return best;
            }

        }
        catch (e) {
            console.log(zyispig);
            return id[0];
        }
       id.sort(function (a, b) {
          // console.log('calculateIn'+i);

           return b[2]-a[2];
       });


        console.log(id);
        zyispig=[];


    }
    //sta=new Date();
    // go(id[0][0],id[0][1],com);
    // var d=vcx(-com,16);
    // end=new Date();
    // killtime+=(end-sta);
    // if(d==false){
    //
    // }
    // else {
    //     alert("prevent killed");
    //     ba(id[0][0],id[0][1],com);
    //     return d;
    // }
    // ba(id[0][0],id[0][1],com);
    // id.sort(function (a, b) {
    //     // console.log('calculateIn'+i);
    //
    //     return b[2]-a[2];
    // });
    console.log('calculateIn'+depth);

    return id[0];
}

function go(tempi,tempj,com) {
    chessboard[tempi][tempj]=com;
    var sta=new Date();
    debug && updateScore(tempi,tempj);
    var end=new Date();
    pointScoreTimer+=(end-sta);
    put(tempi,tempj,com);
    // var steplen=step.length;
    step.push([tempi,tempj]);
    gocnt++;

}

function ba(tempi,tempj,com) {
    chessboard[tempi][tempj] = 0;
    var sta=new Date();
    debug && updateScore(tempi, tempj);
    var end=new Date();
    pointScoreTimer+=(end-sta);
    remove(tempi, tempj, com);
    step.pop();
    bacnt++;
}

var bestpath=[];
var negABcut=0;
var leave=0;

function neg(com,depth,td,alpha,beta) {
    //var sta=new Date();

    // if (depth != td) {
    //
    //     var a = map[ini];
    //     //console.log('ini'+ini);
    //     if (a) {
    //         if (a.depth >= depth) {
    //             cacheCount++;
    //             // console.log('max cache hit depth=' + a.depth + 'score=' + a.score);
    //             return a.score;
    //         }
    //
    //
    //     }
    // }

   // var max=-maxsc;
    if(depth==0){
        leave++;
            if(com==1){
                return blackTotal-whiteTotal
            }
            else {


                return whiteTotal - blackTotal;
            }

    }
    var best;
    var candidate=gen(com);
    //var max=-999999999;

    for (var i=0;i<candidate.length;i++){
        var tempx=candidate[i][0];
        var tempy=candidate[i][1];
        var s=candidate[i][2];

        go(tempx,tempy,com);
        var sc=neg(-com,depth-1,td,-beta,-alpha);
        ba(tempx,tempy,com);

        if(sc>alpha){
            alpha=sc;
            best=[tempx,tempy,s];
        }
        if(depth==td) {
            bestpath.push(best);
        }
        if(alpha>=beta){
            negABcut++;
            break;


        }
    }

        //savecache(depth,alpha);

    return alpha;

}

function it(depth,com,alpha,beta) {

    var best;
    for (var i=4;i<=depth;i+=2){
        if(i==depth){
            leave=0;
            negABcut=0;
            cacheCount=0;

        }
        //max(i,com,alpha,beta,i,0,0,0);
       // neg(com,i,i,alpha,beta);
        neg(com,i,i,alpha,beta);


        best=bestpath[bestpath.length-1];

        //var best=zyispig[zyispig.length-1];
        console.log('depth='+i);
        // console.log(zyispig);
        try{
            if(best[2]>=maxsc/2){
                // console.log('boooooooooooooooo'+i);
                //alert('best get');
                //showImage();

                return best;
            }

        }
        catch (e) {
            console.log(zyispig);
            return id[0];
        }
        // id.sort(function (a, b) {
        //     // console.log('calculateIn'+i);
        //
        //     return b[2]-a[2];
        // });
        // console.log(id);
        // zyispig=[];
        if(depth==i){
            console.log("bestpath");
            console.log(bestpath);
        }
        bestpath=[];


    }
    console.log('calculateIn'+depth);

    return best;
}


function negpvs(com,depth,td,alpha,beta) {

    // if (depth != td) {
    //
    //     var a = map[ini];
    //     //console.log('ini'+ini);
    //     if (a) {
    //         if (a.depth >= depth) {
    //             cacheCount++;
    //             // console.log('max cache hit depth=' + a.depth + 'score=' + a.score);
    //             return a.score;
    //         }
    //
    //
    //     }
    // }
    var max=-maxsc;
    if(depth==0){
        leave++;


            return whiteTotal-blackTotal;

    }
    var best;
    var candidate=gen(com);
   // var current=-999999999999;
    //var max=-999999999;


    for (var i=0;i<candidate.length;i++){
        var tempx=candidate[i][0];
        var tempy=candidate[i][1];
        var s=candidate[i][2];
        var sc;


        go(tempx,tempy,com);
        if(i==0){
            sc=-negpvs(-com,depth-1,td,-beta,-alpha);
        }
        else {
             sc = -negpvs(-com, depth - 1, td, -alpha - 1, -alpha);
            if (sc > alpha && sc < beta) {
                sc = -negpvs(-com, depth - 1, td, -beta, -alpha);
            }
        }
        ba(tempx,tempy,com);



        if(sc>alpha){
            alpha=sc;
            best=[tempx,tempy,s];
            if(depth==td) {
                bestpath.push(best);
            }
        }

        // if(sc>current){
        //     current=sc;
        //     best=[tempx,tempy,s];
        // }

        if(sc>=beta){
            negABcut++;
            return alpha;
        }


    }


        savecache(depth,alpha);

    return alpha;

}


