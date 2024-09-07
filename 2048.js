var box;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function(){
    setGame();
}

function setGame(){
    box = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = box[r][c];
            updateTile(tile,num);
            document.getElementById("box").append(tile);
        }
    }

    setTwo();
    setTwo();
}

function hasEmptyTile(){
    for (let r = 0; r < rows;r++){
        for (let c = 0; c<columns;c++){
            if (box[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}

function setTwo(){
    if (!hasEmptyTile()){
        return;
    }

    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (box[r][c] == 0){
            box[r][c] = 2;
            let tile = document.getElementById(r.toString() +"-"+ c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function updateTile(tile,num){
    tile.innerText = " ";
    tile.classList.value = " ";
    tile.classList.add("tile");
    if (num > 0){
        tile.innerText = num;
        if (num <= 1024) {
            tile.classList.add("x"+num.toString());
        }else {
            tile.classList.add("x2048");
        }
    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }else
    if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }else
    if (e.code == "ArrowUp"){
        slideup();
        setTwo();
    }else
    if (e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
    
})

function filterZero(row){
    return row.filter(num => num !=0);
}

function slide(row){
    row = filterZero(row);

    for (let i = 0; i < row.length-1; i++) {
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    }

    row = filterZero(row);

    while (row.length < columns) {
        row.push(0);
    }
    
    return row;
}


function slideLeft(){
    for (let r = 0; r < rows; r++) {
        let row = box[r];
        row = slide(row);
        box[r] = row;

        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() +"-"+ c.toString());
            let num = box[r][c];
            updateTile(tile,num);
        }

        
    }
}

function slideRight(){
    for (let r = 0; r < rows; r++){
        let row = box[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        box[r] = row;

        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() +"-"+ c.toString());
            let num = box[r][c];
            updateTile(tile,num);
        }
    }
}

function slideup(){
    for (let c = 0; c < columns; c++){
        let row =  [box[0][c],box[1][c],box[2][c],box[3][c]];
        row = slide(row);
        box[0][c] = row[0];
        box[1][c] = row[1];
        box[2][c] = row[2];
        box[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            let tile = document.getElementById(r.toString() +"-"+ c.toString());
            let num = box[r][c];
            updateTile(tile,num);
        }
    }
}

function slideDown(){
    for (let c = 0; c<columns;c++){
        let row = [box[0][c],box[1][c],box[2][c],box[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for (let r = 0; r<rows;r++){
            box[r][c] = row[r];
            let tile = document.getElementById(r.toString() +"-"+ c.toString());
            let num = box[r][c];
            updateTile(tile,num);
        }
    }
}

document.getElementById("restart-btn").addEventListener('click',function(){
    setTwo()
})