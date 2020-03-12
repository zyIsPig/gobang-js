<%--
  Created by IntelliJ IDEA.
  User: gulu
  Date: 2019-07-09
  Time: 09:29
  To change this template use File | Settings | File Templates.
--%>
<script>
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

      context.beginPath();


    }
  }
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
  function color(x,y,width) {
    var canvas=document.getElementById("c1");
    if(canvas.getContext){
      var context=canvas.getContext("2d");
      context.fillStyle="#fcffba";
      context.fillRect(x,y,14*width,14*width);

    }
  }

  function addchess(event) {
    var canvas=document.getElementById("c1");
    var x=event.clientX
    var y=event.clientY;
    alert(x+","+y);
    if(canvas.getContext){
      var context=canvas.getContext("2d");
      context.beginPath();
      context.arc(x,y,20,0,Math.PI*2,false);
      context.fillStyle="black";
      context.fill();
      context.stroke();
    }



  }
</script>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>gobang1.0</title>
  </head>
  <body onload="drawChessBoard(400,100,50)">
  <canvas id="c1"width="1600px" height="1000px" style="left: 400px; top: 400px; background-color: aliceblue" onclick="addchess(event)" >
  </canvas>
  $END$
  </body>
</html>
