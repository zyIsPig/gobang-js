function random() {
    var last=step[step.length-1];
    if(chessboard[last[0]+1][last[1]]==0){
        return [last[0]+1,last[1]];
    }
}