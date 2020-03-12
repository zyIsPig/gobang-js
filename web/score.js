// importScripts("minimax");
var five=1000000;
var four=100000;
var blockfour=10000;
var three=1000;
var blockthree=100;
var two=100;
var blocktwo=10;
var one=10;
var blockone=1;
var total=0;
var maxsc=10*five;

var fiveS="11111";

var zy=[[1,0],[0,1],[1,1],[1,-1]];


function Cal2(color) {
    var score=0;

    for (var i=0;i<15;i++){
        for (var j=0;j<15;j++){
            if(chessboard[i][j]!=0){
                continue;
            }
            if(!hasNeighbour(i,j,2,1)){
                continue;
            }
            score+=CalPointScoreX(i,j,color,5);


        }
    }
    return score;

}


function CalPointScoreX(x,y,color,dir) {


    total = 0;

    //var color=chessboard[i][j];

    //var sempty=0;

    //console.log(i);
    if (dir == 5) {
        for (var i = 0; i < 4; i++) {
            cal(x,y,color,i);
        }

    } else {
        cal(x,y,color,dir);

    }
    return total;
}


function cal(x,y,color,k) {
   // console.log('zyispig');

        //alert(model);

       // console.log("model="+model);
    var count=1;
    var empty=0;
    var block=0;
    //console.log("color="+color);

    var  model="1";
    //console.log(zy);
    var sss=zy[k];
        var xtemp=sss[0];
    //console.log(xtemp);
    var ytemp=sss[1];
    var tempi=x;
    var tempj=y;
       // console.log(xtemp,ytemp);
        while (true) {
            //console.log('while1');
            if (tempi - xtemp == -1 || tempi-xtemp==15 || tempj-ytemp==-1 || tempj-ytemp==15) {
                //console.log("i am break");
                block++;
                model = "-1" + model;
                break;
            }
            if (chessboard[tempi - xtemp][tempj-ytemp] == -color) {
                block++;
                model = "-1" + model;
                break;
            }
            if (chessboard[tempi - xtemp][tempj-ytemp] == color) {
                count++;
                model = "1" + model;
                tempi=tempi-xtemp;
                tempj=tempj-ytemp;
            } else if (chessboard[tempi - xtemp][tempj-ytemp] == 0) {
                if ((tempi - 2*xtemp >= 0)&& (tempi-2*xtemp<15) && (tempj-2*ytemp>=0) &&(tempj-2*ytemp<15) && chessboard[tempi - 2*xtemp][tempj-2*ytemp] == color && empty == 0) {
                    empty = count + 1;
                    model = "0" + model;
                    tempi=tempi-xtemp;
                    tempj=tempj-ytemp;
                } else {
                    break;
                }
            } else {
                //empty=0;
                // model="0"+model;
                // break;
            }
            //  console.log("while1");


        }
        tempi = x;
        tempj=y;
        //console.log(xtemp,ytemp);
        //empty=0;
        //console.log(model);

        while (true) {
          //  console.log('while2');
           // console.log(tempi,tempj);


            if (tempi + xtemp == 15 || tempi + xtemp == -1 || tempj + ytemp == 15 || tempj + ytemp == -1) {
                block++;
                model = model + "-1";
                break;
            }
            if (chessboard[tempi + xtemp][tempj + ytemp] == -color) {
                block++;
                model = model + "-1";
                break;
            }
            if (chessboard[tempi + xtemp][tempj + ytemp] == color) {
                count++;
                if (empty != 0) {
                    empty++;
                }
                model = model + "1";
                tempi = tempi + xtemp;
                tempj = tempj + ytemp;
            } else if (chessboard[tempi + xtemp][tempj + ytemp] == 0) {
                if (empty == 0 && (tempi + 2 * xtemp < 15) && (tempi + 2 * xtemp >= 0) && (tempj + 2 * ytemp >= 0) && (tempj + 2 * ytemp < 15) && chessboard[tempi + 2 * xtemp][tempj + 2 * ytemp] == color) {
                    empty = 1;
                    model = model + "0";
                    tempi = tempi + xtemp;
                    tempj = tempj + ytemp;
                } else {
                    break;
                }
            } else {
                // model=model+"0";
                // break;
            }
        }
    var xs = getScore(model, count, block, empty);

    // console.log(k+"times=" + xs);
    //console.log(" ");
    total+=xs;


            // console.log("while2");



        //console.log("molde"+model);
        //console.log(count, block, empty);


    }

    //test();








function getScore(model,count,block,empty) {
    if(block==0){
        if(empty==0){
            if(count>=5){
                return five;
            }
            switch (count) {
                case 4:
                    return four;
                case 3:
                    return three;
                case 2:
                    return two;
                case 1:
                    return one;
            }
        }
        if(empty==2 || empty==count){
            if(count>=6){
                return five;
            }
            switch (count) {
                case 5:
                    return four;
                case 4:
                    return blockfour;
                case 3:
                    return three;
                case 2:
                    return two;

            }
        }
        if(empty==3 || empty==count-1){
            if(count>=7){
                return five;
            }
            switch (count) {
                case 6:
                    return four;
                case 5:
                    return blockfour;
                case 4:
                    return blockfour;
                case 3:
                    return three;
            }
        }
        if(empty==4 || empty==count-2){
            if (count>=8){
                return five;
            }
            switch (count) {
                case 7:
                    return four;
                case 6:
                    return blockfour;
                case 5:
                    return blockfour;
                case 4:
                    return  blockfour;
            }
        }
        if(empty==5 || empty==count-3){
            if(count>=9){
                return five;
            }
            else {
                return four;
            }
        }
    }
    if(block==1){
        if(empty==0){
            if(count>=5){
                return five;
            }
            switch (count) {
                case 4:
                    return blockfour;
                case 3:
                    return blockthree;
                case 2:
                    return blocktwo;
                case 1:
                    return blockone;
            }
        }
        if(empty==2 || empty==count){
            if(count>=6){
                return five;
            }
            switch (count) {
                case 5:
                    if(model=="-1101111"|| model=="111101-1"){
                        return four;
                    }
                    else {
                        return blockfour;
                    }
                case 4:
                    return blockfour;
                case 3:
                    return blockthree;
                case 2:
                    return blocktwo;

            }
        }
        if(empty==3 || empty==count-1){
            if(count>=7){
                return five;
            }
            switch (count) {
                case 6:
                    if(model=="-11101111" || model=="1111011-1"){
                        return four;
                    }
                    else {
                        return blockfour;
                    }

                case 5:
                    return blockfour;
                case 4:
                    return blockfour;
                case 3:
                    return blockthree;

            }

        }
        if(empty==4 || empty==count-2){
            if(count>=8){
                return five;
            }
            switch (count) {
                case 7:
                    if(model=="-111101111" || model=="11110111-1"){
                        return four;
                    }
                    else {
                        return blockfour;
                    }
                case 6:
                    return blockfour;
                case 5:
                    return blockfour;
                case 4:
                    return blockfour;
            }
        }
        if(empty==5 || empty==count-3){
            if(count>=9){
                return five;
            }
            switch (count) {
                case 8:
                    return four;
                case 7:
                    return blockfour;
                case 6:
                    return blockfour;
            }
        }
    }
    if (block==2){
        if(empty==0){
            if(count>=5){
                return five;
            }
            else{
                return 0;
            }
        }
        if(empty==2 || empty==count){
            if(count>=6){
                return five;
            }
            if(count==5){
                return blockfour;
            }
            if(count==4){
                return blockfour;
            }
            else {
                return 0;
            }
        }
        if(empty==3 || empty==count-1){
            if(count>=7){
                return five;
            }
            if(count<=3){
                return 0;
            }
            else {
                return blockfour;
            }
        }
        if(empty==4|| empty==count-2){
            if(count>=8){
                return five;
            }
            if(count<=3){
                return 0;
            }
            else {
                return blockfour;
            }

        }
        if (empty==5 || empty==count-3){
            if (count>=9){
                return five;
            }
            if(count<=3){
                return 0;
            }
            else {
                return blockfour;
            }
        }
    }


}

function fixedScore(x,y,color,dir) {
    var temp=CalPointScoreX(x,y,color,dir);

    if(five>temp && temp>blockfour){
        if(temp<blockfour+three){
            return three;
        }

        if(temp>=blockfour+three){
            return four;
        }
        if(temp>=2*blockfour){
            return 2*four;
        }


    }
    return temp;
}



