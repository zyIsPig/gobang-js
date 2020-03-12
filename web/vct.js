
function genvct(com) {
    var comfive=[];
    var humfive=[];
   // var comfour=[];
   // var humfour=[];
    var comblockfour=[];
    var humblockfour=[];
    var comthree=[];
    var humthree=[];

    var att=[];
    for (var i=0;i<15;i++){
        for (var j=0;j<15;j++){
            if(count>=6 && !hasNeighbour(i,j,2,2)){
                continue;

            }
            if(count<6 && !hasNeighbour(i,j,1,1)){
                // console.log("boook");
                continue;
            }
            if(chessboard[i][j]!=0){
                continue;
            }
          var  comtemp=CalPointScoreX(i,j,com,5);
            var humtemp=CalPointScoreX(i,j,-com,5);

            if(comtemp>=five){
                comfive.push([i,j,comtemp]);
            }
            else if(humtemp>=five){
                humfive.push([i,j,-humtemp]);

            }
            else if(comtemp>=blockfour){
                comblockfour.push([i,j,comtemp]);
            }
            else if (humtemp>=blockfour){
                humblockfour.push([i,j,-humtemp]);
            }
            else if(comtemp>=three){
                comthree.push([i,j,comtemp]);
            }



        }
    }

    if(comfive.length>=1){
        return comfive;
    }
    if (humfive.length>=1){
        return humfive;
    }
    if (comblockfour.length>=1){
        return comblockfour;
    }
    if(humblockfour.length>=1){
        return humblockfour;
    }
    else {
        return comthree;
    }

    // att.sort(function (a, b) {
    //     return b[2]-a[2];
    // })
    return att;

}



function vctmax(com,depth,totaldepth) {

    if(depth==0){
         return false;

    }


    var list=genvct(com);
    if (list.length==0){
        return false;
    }


    for (var i=0;i<list.length;i++){

        var tempx=list[i][0];
        var tempy=list[i][1];

        var tempsc=list[i][2];

        if(tempsc>=five){
            return true;

        }

        chessboard[tempx][tempy]=com;

        var s=vctmin(-com,depth-1,totaldepth);

        chessboard[tempx][tempy]=0;


        if(s==true){
            if(depth==totaldepth) {
                return {
                    success: true
                    , x: tempx, y: tempy
                };
            }
            else {
                return true;
            }
        }






    }
    if(depth==totaldepth){
        return {success:false,x:null,y:null};
    }
    return false;
}

function vctmin(com,depth,totaldepth) {
    var list=genvct(com);
    if (list.length==0){
        return false;
    }
    var gulu=false;
    for (var i=0;i<list.length;i++){
        var tempx=list[i][0];
        var tempy=list[i][1];

        var tempsc=list[i][2];

        if(tempsc>=five){
            return false;
        }

        chessboard[tempx][tempy]=com;

        var s=vctmax(-com,depth-1,totaldepth);

        chessboard[tempx][tempy]=0;

        if(!s){
            gulu=true;
            return false;
        }




    }
    return true;


}

function govct(com,depth) {
    var p=false;

    for (var k = 12; k <= depth; k+=2) {


    var temp = vctmax(com, k, k);
    console.log(temp);
    if (temp.success == false || temp==false) {

    } else {
        alert(temp.x + "," + temp.y);

        p=true;
        break;
    }
}
    if (!p){
        alert('no kill');
    }
   // alert('no kill');
}