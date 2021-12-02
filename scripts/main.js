// Canvas declared in interface.js
handlers.updateCanvasSize();
ctx.translate(0,canvas.height);
ctx.scale(1,-1);

ctx2D.translate(0, canvas2D.height);
ctx2D.scale(1, -1);


let wallCount = 0;
const walls = [];
let renderWalls = [];

let showGraph = false;




const player = new Player(canvas2D.width/2 , canvas2D.height - canvas2D.height/1.4, 90);
player.fov.xamount = 90;

player.setFOV();



// let tmp = ""
// walls.forEach(w => {
//     tmp = tmp + "walls.push(new Boundary(" + w.pos.x + ", " + w.pos.y + ", " +
//                                         (w.pos.x + w.header.x) + ", " + (w.pos.y + w.header.y) + ", " + w.hue + "));\n"
// });
// console.log(tmp);

function exampleScene() {
    renderWalls.splice(0, renderWalls.length);
    wallCount = 0;
    walls.splice(0, walls.length);
    walls.push(new Boundary(430, canvas2D.height - 270,   530,    canvas2D.height - 270, 100, 1, 0, 300));
    walls.push(new Boundary(339, canvas2D.height - 118,   232,    canvas2D.height - 192, 100, 1, 0, 300));
    walls.push(new Boundary(157, canvas2D.height - 197,   113,    canvas2D.height - 387, 100, 1, 0, 300));
    walls.push(new Boundary(201, canvas2D.height - 417,   289,    canvas2D.height - 321, 100, 1, 0, 300));
    walls.push(new Boundary(354, canvas2D.height - 427,   488,    canvas2D.height - 495, 100, 1, 0, 300));
    walls.push(new Boundary(615, canvas2D.height - 464,   702,    canvas2D.height - 417, 100, 1, 0, 300));
    walls.push(new Boundary(790, canvas2D.height - 200,   694,    canvas2D.height - 59, 100, 1, 0, 300));
    walls.push(new Boundary(429, canvas2D.height - 20,    304,    canvas2D.height - 32, 100, 1, 0, 300));
    walls.push(new Boundary(148, canvas2D.height - 58,    39,     canvas2D.height - 95, 100, 1, 0, 300));
    walls.push(new Boundary(488, canvas2D.height - 115,   613,    canvas2D.height - 157, 100, 1, 0, 300));
    walls.push(new Boundary(912, canvas2D.height - 251,   931,    canvas2D.height - 409, 100, 1, 0, 300));
    walls.push(new Boundary(762, canvas2D.height - 345,   815,    canvas2D.height - 472, 100, 1, 0, 300));
}

exampleScene();

let show2D = true;
let show2D2 = false;
let showWallNums = false;
let rainbowMode = false;
let changeAll = true;
document.getElementById("changeAll").checked = true;
document.getElementById("sortedActive").checked = true;
document.getElementById("sliderH0").value = 0;
document.getElementById("sliderH1").value = 300;
let sortedActive = true;

function changeSlider() {
    let sliderH0 = document.getElementById("sliderH0");
    let sliderH1 = document.getElementById("sliderH1");
    let showH0 = document.getElementById("showH0");
    let showH1 = document.getElementById("showH1");
    showH0.innerHTML = sliderH0.value;
    showH1.innerHTML = sliderH1.value;
    if (changeAll) {
        for (wall of walls) {
            wall.height0 = sliderH0.value;
            wall.height1 = sliderH1.value;
        }
    } else {
        walls[walls.length - 1].height0 = sliderH0.value;
        walls[walls.length-1].height1 = sliderH1.value;
    }
    
}

gameLoop();
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2D.clearRect(0, 0, canvas2D.width, canvas2D.height);


    background();
    playerHandler.movement();
        set2Dctx();
        player.draw();
        set3Dctx();
    renderWalls.splice(0, renderWalls.length)
    walls.forEach(wall => {
        if (rainbowMode) {
            if (wall.hue >= 255) wall.hue = -1;
            wall.hue +=1;
        }
        if (show2D) {
            set2Dctx();
            wall.draw();
        }
        if (wall.isInsideFOV()) {
            wall.processFOV();
            wall.calculate3D();
            renderWalls.push(wall);
        }
    });
    
    if (renderWalls.length >= 1) {
        if (sortedActive) {
            let sorted = wallsToGraph(renderWalls);
            if (sorted.length <= 1) sorted = [0]
                sorted.forEach(index => {
                    renderWalls[index].display3D();
            });
        } else {
            renderWalls.forEach(wall => {
                wall.display3D();
            });
        }
    }

    drawing.start();
    touchControls();

    requestAnimationFrame(gameLoop);
}

// background terrain
function background() {
    // ctx.fillStyle = '#00d2ff';
    ctx.fillStyle = "#64a7ff";
    ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height*5);
    ctx.fillStyle = "#969696";
    ctx.fillRect(0, -canvas.height*5.5, canvas.width, canvas.height*6);

    ctx2D.fillStyle = 'gray';
    ctx2D.fillRect(0, 0, canvas2D.width, canvas2D.height);

}


