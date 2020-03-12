<%--
  Created by IntelliJ IDEA.
  User: gulu
  Date: 2019-07-09
  Time: 12:07
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>jsptest</title>
    <style>
        #imgdiv{
            display: none;
            /*background-color: brown;*/
            z-index: 9999;
            position: absolute;
            left: 700px;
            top: 350px;
           // opacity: 0.7

        ;
            //transition: opacity 1s;

        }
        .modal{
            -webkit-animation-name:aaa ;
            -webkit-animation-duration: 6s;
            animation-name: aaa;
            animation-duration: 0.6s;
            /*-webkit-animation: aaa 5s infinite;*/
            /*animation: aaa infinite;*/
        }
        @-webkit-keyframes zoom {
            from {-webkit-transform: scale(0)}
            to {-webkit-transform: scale(1)}
        }
        
        @-webkit-keyframes aaa {
            10%{ opacity: 1;}
        }
        .close{
            position: absolute;
            top: 8px;
            right: 14px;
            color: #020205;
            font-size: 40px;
            font-weight: bold;
            transition: 0.3s;

        }
    </style>
    <script >
        var chessboard=new Array();
        var step=[];
        //根据chessboard本身来绘制棋盘，用于悔棋

        function drawChessboardDirectly() {
            //console.log("drawchessboardDirectly");
            //clearCanvas();


            //console.log("count=" + count);
            // alert(count);
            for (var i = 0; i < count; i++) {
                var temp = step[i];
                //console.log(temp[0] + "," + temp[1]);
                drawXcolorChess(temp[0], temp[1], i % 2, i);
            }




        }
        function drawXcolorChess(x,y,color,count) {

            var canvas=document.getElementById("c1");
            if(canvas.getContext){
                var context=canvas.getContext("2d");
                context.beginPath();
                context.arc(x * 50 + 550 - 150, y * 50 + 150 - 50, 13, 0, Math.PI * 2, false);
                if(color==0){
                    context.fillStyle="black";
                    context.fill();
                    context.stroke();
                    context.fillStyle="white";

                    context.font = "normal 20px 微软雅黑";
                    context.fillText(count, x * 50 + 550 - 150 - 5, y * 50 + 150 - 50 + 5);

                }
                if(color==1){
                    context.fillStyle="white";
                    context.fill();
                    context.stroke();
                    context.fillStyle="black";


                    context.font = "normal 20px 微软雅黑";
                    context.fillText(count, x * 50 + 550 - 150 - 5, y * 50 + 150 - 50 + 5);
                }
                //context.fill();
                //  context.stroke();
                //   if(color==1){
                //       context.fillStyle="white";
                //   }
                //   if(color==-1){
                //       context.fillStyle="black";
                //   }
                //   context.font = "normal 20px 微软雅黑";
                //   context.fillText(count, x * 50 + 550 - 150 - 5, y * 50 + 150 - 50 + 5);
            }
        }

        function clearCanvas()
        {
            var c=document.getElementById("c1");
            var cxt=c.getContext("2d");
            c.height=c.height;
        }


        var count=0;
        //var flag=true;

        function back() {
            // console.log("back");

            var temp = step.pop();
            //var c=chessboard[temp[0]][temp[1]];
            // var tem2=step.pop();
            // ;
            // console.log(temp[0] + "," + temp[1]);
            chessboard[temp[0]][temp[1]] = 0;

            //chessboard[tem2[0]][tem2[1]]=0;

            count--;
            // count--;
            // unpdatePointScore(temp[0],temp[1]);
            updateScore(temp[0],temp[1]);


            //console.log(blackScore);
            //console.log(whiteScore);

            clearCanvas();
            drawChessBoard(400, 100, 50);
            drawChessboardDirectly();


        }
        /**
         * initial
         * */
        function initial() {
            //console.log("logooo");
            for (var i=0;i<15;i++){
                chessboard[i]=new Array();
                for (var j=0;j<15;j++){
                    chessboard[i][j]=0;
                }

            }
            count=0;
            clearCanvas();

            drawChessBoard(400,100,50);
            printfchessboard();
            ini=initemp;


        }

        function printfchessboard() {
            for (var i=0;i<15;i++){
                for (var j=0;j<15;j++){
                    console.log(chessboard[i][j]);
                }
                //console.log("\n");
            }
        }

        /**
         * draw chessboard
         *
         *
         * */
        function drawChessBoard(x,y,width) {
            var canvas=document.getElementById("c1");
            if(canvas.getContext){
                var context=canvas.getContext("2d");
                context.font="15 Caliri";
                // context.strokeText("0",500,500);
                // context.strokeText("2",100,100);
                // context.strokeText("9",100,100);
                color(x,y,width);
                for (var i=0;i<15;i++){

                    context.beginPath();
                    context.font="10pt Caliri";

                    context.strokeText(i, x-20, width * i+y+5);
                    context.moveTo(x, width * i+y);
                    context.lineTo(x+width * 14, width * i+y);
                    context.stroke();


                }
                for (var i=0;i<15;i++){

                    context.beginPath();
                    context.font="10pt Caliri";
                    context.strokeText(i, i*width+x-5, y-10);
                    context.moveTo(width*i+x,y);
                    context.lineTo(width*i+x,width*14+y);
                    context.stroke();
                }
                point(x+3*width,y+3*width,3);
                point(x+11*width,y+3*width,3);
                point(x+3*width,y+11*width,3);
                point(x+11*width,y+11*width,3);

                point(x+7*width,y+7*width,3);

                //context.beginPath();

                initialZabrist();
               // test5();

            }
        }
        //draw the big point in the chessboard
        function point(x,y,width){
            var canvas=document.getElementById("c1");
            if(canvas.getContext){
                var context=canvas.getContext("2d");
                context.beginPath();
                context.arc(x,y,width,0,Math.PI*2,false);
                context.fillStyle="black";
                context.fill();
                context.stroke();

            }

        }
        //draw the
        function color(x,y,width) {
            var canvas=document.getElementById("c1");
            if(canvas.getContext){
                var context=canvas.getContext("2d");
                context.fillStyle="#fcffba";
                context.fillRect(x,y,14*width,14*width);

            }
        }

        /**
         * control the action of add a new chess
         *
         * */

        function addchess(event) {
            var canvas=document.getElementById("c1");
            var x=event.clientX;
            var y=event.clientY;
            //alert(x+","+y);
            if(canvas.getContext){
                var context=canvas.getContext("2d");

                if(x>=550 && y>=150 && x<=1250 && y<=850) {
                    var intx = parseInt((x - 550) / 50);
                    var inty = parseInt((y - 150) / 50);
                    var xreminder = parseInt((x - 550) % 50);
                    var yreminder = parseInt((y - 150) % 50);

                    //console.log("xrem="+xreminder+"yrem"+yreminder);


                    if (xreminder > 25) {
                        intx++;
                    }
                    if (yreminder > 25) {
                        inty++;
                    }

                    //console.log(intx, inty);
                    if (chessboard[intx][inty] == 0) {

                        context.beginPath();
                        context.arc(intx * 50 + 550 - 150, inty * 50 + 150 - 50, 13, 0, Math.PI * 2, false);
                        if (count % 2 == 0) {
                            context.fillStyle = "black";

                            //context.font="40px bond 黑体";
                            //context.fillText(count,intx*50+500-100,inty*50+150-50);
                            chessboard[intx][inty] = 1;
                            step.push([intx,inty]);
                            context.fill();
                            context.stroke();

                            //context.font="18px bond 黑体";
                            context.fillStyle = "white";
                            context.font = "normal 20px 微软雅黑";
                            context.fillText(count, intx * 50 + 550 - 150 - 5, inty * 50 + 150 - 50 + 5);
                        } else {
                            context.fillStyle = "white";
                            //context.fillText(count,intx*50+500-100,inty*50+150-50);
                            chessboard[intx][inty] = -1;
                            step.push([intx,inty]);
                            context.fill();
                            context.stroke();
                            context.fillStyle = "black";
                            context.font = "normal 20px 微软雅黑";
                            context.fillText(count, intx * 50 + 550 - 150 - 5, inty * 50 + 150 - 50 + 5);
                        }
                        count++;
                    }
                    ifwin();
                    //unpdatePointScore(intx,inty);
                    put(intx,inty,1);
                    updateScore(intx,inty);
                    defentCheck(intx,inty);
                    console.log('attackP='+attackPoint);
                    console.log(blackScore);
                    console.log(whiteScore);

                    console.log('current'+step);
                    //step.push([intx,inty]);
                    console.log('current'+step);

                    console.log(blackTotal);
                    console.log(whiteTotal);

                    aigonging=0;
                    // alert(ini);
                    // minmax(-1);
                    // var next=zyispig.pop();
                    // zyispig=[];

                    //CalPointScoreX(intx,inty);

                    // var test=[];
                    // var test1=[];
                    // test.push([2,2]);
                    // test.push([5,4]);
                    // test1.push([9,8]);
                    // test1.push([-1,-9]);
                    // //console.log(test.concat(test1));
                    // //test=test+test1;
                    // test=test.concat(test1);
                    // for (var i=0;i<test.length;i++){
                    //     console.log(test[i][0],test[i][1]);
                    // }
                    // aigo(-1);
                }
            }



        }


        /**
         * check if win
         *
         */

        function ifwin() {
            for (var i=0;i<15;i++){
                for (var j=0;j<15;j++){
                    if(chessboard[i][j]!=0){
                        var temp=chackx(i,j);
                        var temp1=chacky(i,j);

                        //console.log("temp = "+temp+", temp1 = "+temp1);
                        if(temp || temp1 || chackxy(i,j) || chackyx(i,j)){
                            if(chessboard[i][j]==1){

                                alert("black win");
                            }
                            else{
                                alert("white win");
                            }
                            return;
                        }
                    }
                }
            }
        }
        function chackx(x,y){

            var counttemp=1;
            for (var i=1;i<5;i++){
                if(x+i<15 && chessboard[x][y]==chessboard[x+i][y]){
                    counttemp++;
                }
                else {
                    break;
                }
            }
            for (var i=1;i<5;i++){
                if(x-i>=0 && chessboard[x][y]==chessboard[x-i][y]){
                    counttemp++;
                }
                else {
                    break;
                }
            }
            // console.log("county = "+counttemp+"chessboard[x][y] ="+chessboard[x][y]);
            // console.log("counttemp ="+counttemp);
            if(counttemp==5){
                return chessboard[x][y];
            }
            else {
                return 0;
            }
        }

        function chacky(x,y){

            var counttempy=1;
            for (var i=1;i<5;i++){
                if(y+i<15 && chessboard[x][y]==chessboard[x][y+i]){
                    counttempy++;
                }
                else {
                    break;
                }
            }
            for (var i=1;i<5;i++){
                if(y-i>=0 && chessboard[x][y]==chessboard[x][y-i]){
                    counttempy++;
                }
                else {
                    break;
                }
            }
            //console.log("county = "+counttempy+"chessboard[x][y] ="+chessboard[x][y]);
            if(counttempy==5){
                return chessboard[x][y];
            }
            else {
                return 0;
            }
        }

        function chackxy(x,y){

            var counttempy=1;
            for (var i=1;i<5;i++){
                if(y+i<15 && x+i<15 && chessboard[x][y]==chessboard[x+i][y+i]){
                    counttempy++;
                }
                else {
                    break;
                }
            }
            for (var i=1;i<5;i++){
                if(y-i>=0 && x-i>=0 && chessboard[x][y]==chessboard[x-i][y-i]){
                    counttempy++;
                }
                else {
                    break;
                }
            }
            //console.log("county = "+counttempy+"chessboard[x][y] ="+chessboard[x][y]);
            if(counttempy==5){
                return chessboard[x][y];
            }
            else {
                return 0;
            }
        }

        function chackyx(x,y){

            var counttempy=1;
            for (var i=1;i<5;i++){
                if(y+i<15 && x-i>=0 && chessboard[x][y]==chessboard[x-i][y+i]){
                    counttempy++;
                }
                else {
                    break;
                }
            }
            for (var i=1;i<5;i++){
                if(y-i>=0 && x+i<15 && chessboard[x][y]==chessboard[x+i][y-i]){
                    counttempy++;
                }
                else {
                    break;
                }
            }
            //  console.log("county = "+counttempy+"chessboard[x][y] ="+chessboard[x][y]);
            if(counttempy==5){
                return chessboard[x][y];
            }
            else {
                return 0;
            }
        }




        function aigo(color) {
            starGo=0;
            if(aigonging){

            }
            else {
                aigonging=true;

                win = false;

                console.log(debug);
                //console.log(cache);
                debugInitial();
                var sta = new Date();
                //alert(color);
                alphaCut = 0;
                betaCut = 0;
                cacheCount = 0;
                starcut = 0;
                starcost = 0;
                dd=0;
                leave=0;
                cacheCount=0;
                killtime=0;

                genTimer = 0;
                totalTimer = 0;
                pointScoreTimer = 0;
                //max(6, color, -9999999, 99999999, 6);

                //var temp = zyispig.pop();
                var temp;
                // if(count==0){
                //     temp=[7,7];
                // }
                // else {
                temp = iterationdepth(8, color, -999999999, 999999999);
                // }
                //var t=neg(-1,8,8,-99999999,9999999999);
                // var temp=it(8,-1,-999999999,999999999);
                console.log(temp);
                console.log("there are "+leave+"node in total");
                console.log("there are "+negABcut+"nodes are cut");
                console.log("there are "+cacheCount+"nodes are get!");
               // leave=0;
                negABcut=0;
                //cacheCount=0;
                //var temp=bestpath[bestpath.length-1];
                bestpath=[];
                zyispig = [];
                chessboard[temp[0]][temp[1]] = color;
                //console.log("temp="+temp[0],temp[1]);
                drawXcolorChess(temp[0], temp[1], 1, count);
                count++;
                //iiiiiiii
                updateScore(temp[0],temp[1]);
                ifwin();
                console.log('alphacut=' + alphaCut + ", betacut=" + betaCut);
                console.log('cachecount=' + cacheCount);
                console.log('starcut' + starcut);
                console.log("");
                //var debugout=new debugout();

                put(temp[0], temp[1],color);
                id = [];
                step.push([temp[0], temp[1]]);
                //attackCheck(temp[0], temp[1]);
                // console.log('defent='+defentPoint);
                var end = new Date();
                totalTimer = end - sta;
                console.log('cacheTime = '+cacheTime+'starcost = ' + starcost + 'genTimer=' + genTimer + ", pointScoreTimer =" + pointScoreTimer + ", totalTimer =" + totalTimer);
                console.log("cnt"+bacnt,gocnt)
                //   console.log(attackPoint);
                //    console.log(defentPoint);
                //    console.log(testStar);
                //    console.log('missrate'+(miss/starcount));
                //    console.log('stepcheck'+steptest);
                //    console.log('missrate'+(stepmiss/stepcount));
                //neg(-1,2,2,-99999999);
                //    console.log('c1'+c1+'c2'+c2);
                writeLabel(dd,temp[2],totalTimer,leave,alphaCut,betaCut,cacheCount);
            }

        }

    </script>
    <script type="text/javascript" src="config.js"></script>
    <script type="text/javascript" src="score.js" >


    </script>
    <script type="text/javascript" src="array.js">

    </script>
    <script type="text/javascript" src="minimax.js"></script>

    <script type="text/javascript" src="zabrist.js"></script>

    <script type="text/javascript" src="debug.js"></script>
    <script type="text/javascript" src="debug.js"></script>
    <script type="text/javascript" src="config.js"></script>
    <script type="text/javascript" src="test.js"></script>
    <script type="text/javascript" src="image.js"></script>

    <script type="text/javascript" src="vct.js"></script>
    <script type="text/javascript" src="kill.js"></script>

    <link href="button.css" rel="stylesheet" type="text/css">

</head>
<body onload="drawChessBoard(400,100,50) ;initial();initialZabrist()">
<button onclick="initial()" id="ini"  class="ui-button">
    initial
</button>
<button onclick="back()"  id="back" class="ui-button" >
    retract
</button>
<button onclick="attack(-1)" id="PointScore" class="ui-button">
    attack
</button>
<button onclick="aigo(-1)" id="ai" class="ui-button">
    aigo
</button>

<button onclick="test3()" id="getRandom" class="ui-button">
    test3
</button>
<button onclick="test4()" id="check" class="ui-button">
    test4
</button>
<button onclick="test5()" id="showimage" class="ui-button">
    test5
</button>
<button onclick="test7()" id="scorecheck" class="ui-button">
    test7
</button>
<button onclick="vcx(-1,16)" id="govct" class="ui-button">
    vct-1
</button>
<button onclick="vcx(1,16)" id="govct" class="ui-button">
    vct1
</button>
<button id="change" class="ui-button" onclick="writeLabel(12)">
    change
</button>


<form>
    <input id="a"><br>
    <input id="b">
</form>




<div id="imgdiv" class="modal" >
    <img src="timg-2.jpeg" id="img1" width="300" height="200">
<%--    <span class="modal" onclick="document.getElementById('imgdiv').style.display='none'">&times;</span>--%>
    <span class="close" onclick="closeImage()
    ">&times;</span>
    <span class="modal-content" id="img01"> </span>

</div>



<%--<button onclick="drawXcolorChess(1,1,0,9)" class="ui-button">--%>
<%--    drawChessboardDirectly--%>
<%--</button>--%>

<div style="top: 200px; left: 200px; z-index: 1;">
<canvas id="c1"width="1350px" height="900px" style="left: 150px; position: absolute; top: 50px; background-color: aliceblue" onclick="addchess(event )"  >
</canvas>
    <span style="left: 300px;top: 230px;position: absolute;font-style: italic; color: #ada3ff" id="label1" >

    </span>
</div>

</body>
</html>
