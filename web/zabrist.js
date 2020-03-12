var blackz=CreateArray(15,15);

var whitez=CreateArray(15,15);

var ini=getRandom(1,1000000000);
initemp=ini;

var map={};

var cacheCount=0;

function initialZabrist() {

    for (var i=0;i<15;i++){

        for (var j=0;j<15;j++){

            blackz[i][j]=getRandom(1,1000000000);
           // console.log(blackz[i][j]);
            whitez[i][j]=getRandom(1,1000000000);
        }
    }
}

function put(i,j,color) {
    if(color==1){
        ini=ini^blackz[i][j];
    }else {
        ini=ini^whitez[i][j];
    }
}

function getRandom(low,high) {
    var x=Math.random();
    var p=parseInt(x*(high-low)+low);

   // console.log(p);
    return p;

}

function remove(i,j,color) {
    if(color==1){
        ini=ini^blackz[i][j];
    }
    else {
        ini=ini^whitez[i][j]
    }
}

function savecache(depth,score) {
    var temp={
        depth: depth,
        score: score
    }

    map[ini]=temp;
}

function checkCache(depth) {
    var a=map[ini];
    if(a){
        if(a.depth>=depth){
            return a.score;
        }


    }


}

