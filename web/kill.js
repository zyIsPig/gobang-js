

var attackpath=[];

var defenceAndAttack=[];
//var control=false;

var defencepath=[];

var record=[];
var path=[];
var defenceattackCount=0;
function findmax(com,depth,td,control) {
    var comfive=[];
    var humfive=[];
    var comfour=[];
    var humfour=[];
    var comblockedfour=[];
    var humblockedfour=[];
    var comthree=[];
    var humthree=[];
    for (var i=0;i<15;i++){
        for (var j=0;j<15;j++){



            if(chessboard[i][j]!=0){
                continue;
            }

            if(!hasNeighbour(i,j,2,2)){
                continue;
            }
            var scorecom=CalPointScoreX(i,j,com,5);
            var scorehum=CalPointScoreX(i,j,-com,5);
            if(attackpath.length>=1) {
                if (!starCheck(attackpath[attackpath.length - 1], [i, j])) {
                    if (control == 2 && starCheck(defenceAndAttack[defenceAndAttack.length - 1], [i, j])) {
                        defenceattackCount++;
                    } else if (scorehum >= blockfour || scorecom >= four) {

                    } else {
                        continue;
                    }
                }
            }

            if(scorecom>=five){
                comfive.push([i,j,scorecom,scorehum]);
            }
            else if(scorehum>=five){
                humfive.push([i,j,scorecom,scorehum]);
            }

            else if(scorecom>=four){
                comfour.push([i,j,scorecom,scorehum]);
            }

            else if (scorecom>=blockfour){
                comblockedfour.push([i,j,scorecom,scorehum]);
            }

            else if (scorecom>=three){
                comthree.push([i,j,scorecom,scorehum]);
            }
            // else if (scorehum>=three){
            //     humthree.push([i,j,-scorehum]);
            // }



        }
    }
    if(comfive.length>=1){
        return comfive;
    }
    if(humfive.length>=1){
        return humfive;
    }
    if(comfour.length>=1){
        return comfour;
    }


    if(comblockedfour.length>=1 || comthree.length>=1){
        return comblockedfour.concat(comthree);
    }
    return [];



}

function findmin(com,control) {
    var humfive=[];
    var comfive=[];
    var humanblockedfour=[];
    var defence=[];


    for (var i=0;i<15;i++){
        for (var j=0;j<15;j++){


            if(chessboard[i][j]!=0){
                continue;
            }

            if(!hasNeighbour(i,j,2,2)){
                continue;
            }
            var scorecom=CalPointScoreX(i,j,com,5);
            var scorehum=CalPointScoreX(i,j,-com,5);

            if (!starCheck(attackpath[attackpath.length - 1], [i, j])) {
                if(control==2 && starCheck(defenceAndAttack[defenceAndAttack.length-1],[i,j])){

                }
                   else if (scorehum >= blockfour) {

                    } else {
                        continue;
                    }
                }
            if(scorehum>=five){
                humfive.push([i,j,scorehum,scorecom]);
            }
            else if(scorecom>=five){
             comfive.push([i,j,scorehum,scorecom]);
            }
            else if(scorehum>=blockfour){
                humanblockedfour.push([i,j,scorehum,scorecom]);
            }
            else if(scorecom>=four){
                defence.push([i,j,scorehum,scorecom]);
            }
            else if(scorecom>=blockfour){
                defence.push([i,j,scorehum,scorecom]);
            }



        }
    }
    if(humfive.length>=1){
        return humfive;
    }
    if(comfive.length>=1){
        return comfive;
    }
    return humanblockedfour.concat(defence);
}


/**
 * maxvcf:if return true:kill success
 * minvcf: if return true:can defence,kill failed
 * @param com
 * @param depth
 * @returns {boolean}
 */
function maxvcf(com,depth,td,c) {
    //doubleAttack=false;
    var candidate=findmax(com,depth,td,c);
    var control=0;
    //var path=[];
    if(depth==0 || candidate.length==0){
        return false;
    }

    for (var i=0;i<candidate.length;i++){
        var tempx=candidate[i][0];
        var tempy=candidate[i][1];
        var scom=candidate[i][2];
        var shum=candidate[i][3];
        if(scom>=five){
           // arrayadd(record,path);
            if(depth==td){
                return [tempx,tempy];
            }
            return true;
        }
        if( shum>=five){

            control=1;
            if(scom>=three){
                control=2;
                defenceAndAttack.push([tempx,tempy]);
            }
                //return false;

        }

        chessboard[tempx][tempy]=com;

        (control==0) && attackpath.push([tempx, tempy]);

        path.push([tempx,tempy,com]);
        var l=minvcf(-com,depth-1,td,control);
        chessboard[tempx][tempy]=0;
        path.pop();


        (control==0) &&   attackpath.pop();
        (control==2) && defenceAndAttack.pop();



        if(l==false){
            if(depth==td){
                return [tempx,tempy];
            }
            return true;
        }


    }
    return false;
}


function minvcf(com,depth,td,c) {

    var candidate=findmin(-com,c);
    if(candidate.length==0){
        return true;
    }

    for (var i=0;i<candidate.length;i++){

        var tempx=candidate[i][0];
        var tempy=candidate[i][1];
        var s=candidate[i][2];

        if(s>=five){
            return true;
        }
        chessboard[tempx][tempy]=com;
        path.push([tempx,tempy,com]);
        var t=maxvcf(-com,depth-1,td,c);

        chessboard[tempx][tempy]=0;
        path.pop();



        if(t==false){
            if(depth==td-1){
                defencepath.push([tempx,tempy]);
            }
            return true;
        }

    }
    return false;


}

function vcf(com) {
    //var attackpath=[];
    var t=maxvcf(com,10,10);
    if(t==false){
        alert('kill failed');

    }
    else {
        alert(t);
    }
}


function vcx(com,depth) {
    record=[];
    for (var i=6;i<=depth;i+=2){
        var temp=maxvcf(com,i,i,false);
        if(temp==false){
            //alert();
        }
        else {
           // alert(tem
            console.log(temp);
            return temp;
        }
    }
    console.log("test"+defenceattackCount);
    console.log("kill failed");
    return false;

   // alert('kill failed');




}

function att(com,depth,td,x,y) {
    defencepath=[];
    //chessboard[x][y]=com;

    attackpath.push([y, x]);

    path.push([x,y,com]);
    var l=minvcf(-com,depth-1,td);
   // chessboard[x][y]=0;
    path.pop();

    attackpath.pop();


    console.log(l);
    console.log(defencepath);





}


function attack(com) {
    var a=document.getElementById('a').value;
    var b=document.getElementById('b').value;
    att(com,16,16,a,b);

    //att()
}


