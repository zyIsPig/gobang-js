function showImage() {
    //var sta=new Date();
    var modal=document.getElementById("imgdiv");
    setTimeout(function () {
        modal.style.display="block";
    },1)
   // modal.style.display="block";

    //alert("zyispig");
     //setTimeout(closeImage(),10000);
    //modal.style.display="none";


}

function closeImage() {
    var modal=document.getElementById("imgdiv");
    modal.style.display="none";
}

function writeLabel(depth,score,time,leave,alphacut,betacut,cachecount) {
    var l=document.getElementById("label1");
    var contant="depth:"+depth+"\nblackTotal:"+blackTotal+"\nwhiteTotal:"+whiteTotal+"\nscore:"+score+"\ntime:"+time+"\n nodes: "+leave+"\n alphacut:"+alphacut
    +"\nbetacut: "+betacut+"\ncacheget:"+ cachecount+"\nupdateTime:"+pointScoreTimer+"\nkilltime:"+killtime+"\ngenerate"+genTimer;
    l.innerText=contant;
}