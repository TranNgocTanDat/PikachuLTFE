let cellWidth = 50;
let cellHeight = 50;
let gameWidth = 11;
let gameHeight = 18;
let totalCells = (gameHeight * gameWidth);
var DONE = false
let shuffleIndex
let shuffleTimes = [25, 20, 18, 15, 12, 10]
let timeDuration = [5000, 4500, 4000, 3500, 3000, 2500]
let timeIndex

let wrapper = document.querySelector(".wrapper")
let title = document.querySelector(".title")
let title_game = document.querySelector(".title__game")
let overview = document.querySelector(".overview")

let intro = document.querySelector(".intro")
let intro_content = document.querySelector(".intro__content")
let content__levels = document.querySelector(".content__levels")
let start_btn = document.querySelector(".start_btn")
let level_select = document.getElementById("levels")
let level = document.getElementById("level_index")
let shuffle = document.getElementById("shuffle_index")

let main_game = document.querySelector(".main__game")
let start__game = document.querySelector(".start__game")

let game__content_right = document.querySelector(".game__content--right")




const imagePaths = [
    "./Images/1.png",
    "./Images/2.png",
    "./Images/3.png",
    "./Images/4.png",
    "./Images/5.png",
    "./Images/6.png",
    "./Images/7.png",
    "./Images/8.png",
    "./Images/9.png",
    "./Images/10.png",
    "./Images/11.png",
    "./Images/12.png",
    "./Images/13.png",
    "./Images/14.png",
    "./Images/15.png",
    "./Images/16.png",
    "./Images/17.png",
    "./Images/18.png",
    "./Images/19.png",
    "./Images/20.png",
    "./Images/21.png",
    "./Images/22.png",
    "./Images/23.png",
    "./Images/24.png",
    "./Images/25.png",
    "./Images/26.png",
    "./Images/27.png",
    "./Images/28.png",
    "./Images/29.png",
    "./Images/30.png",
    "./Images/31.png",
    "./Images/32.png",
    "./Images/33.png",
    "./Images/34.png",
    "./Images/35.png",
    "./Images/36.png",
    

    // Thêm các đường dẫn hình ảnh khác tại đây nếu cần
];

const themeAudio = new Audio()
themeAudio.src = "./audio/theme.mp3"
themeAudio.volume = 0.8

const scoreAudio = new Audio()
scoreAudio.src = "./audio/connect(1).mp3"
scoreAudio.volume = 0.8


start_btn.onclick = function () {
    overview.style.display = "none"
    main_game.style.display = "block"
    init();
    // timer_bar.style.display = "inline-flex"
    // labels.style.display = "inline-flex"
    // score_label.style.display = "block"
    // content.style.display = "flex"
    clearInterval(countDown)
    timer.style.width = "300px"
    interval = 100
    countDown = null
    levelController()
    shuffle.innerHTML = shuffleIndex
    themeAudio.play()
    level.innerHTML = level_select.options[level_select.selectedIndex].text

}


//level controller
const levelController = () => {
    let level_info = level_select.options[level_select.selectedIndex].text
    switch (level_info) {
        case 'EASY':
            timeIndex = timeDuration[0]
            shuffleIndex = shuffleTimes[0]
            break
        case 'MEDIUM':
            timeIndex = timeDuration[1]
            shuffleIndex = shuffleTimes[1]
            break
        case 'HARD':
            timeIndex = timeDuration[2]
            shuffleIndex = shuffleTimes[2]
            break
        case 'EXTREM':
            timeIndex = timeDuration[3]
            shuffleIndex = shuffleTimes[3]
            break
        case 'TERRIBLE':
            timeIndex = timeDuration[4]
            shuffleIndex = shuffleTimes[4]
            break
        case 'NIGHTMARE':
            timeIndex = timeDuration[5]
            shuffleIndex = shuffleTimes[5]
            break
    }
}

//return to menu button
const returnToMenuButton = () => {
    location.reload()
}

const retryThisLevel = () => {
    gameFrame.innerHTML = ""
    end_frame.style.display = "none"
    gameFrame.style.display = "block"
    timer_bar.style.display = "inline-flex"
    labels.style.display = "inline-flex"
    levelController()
    init()

}

// timer countdown bar
let timer_bar = document.createElement("div")
timer_bar.className = "timer_bar"
let labels = document.createElement("div")
labels.className = "labels"
const timerBar = () => {
    
    //timer
    let timer_wrapper = document.createElement("div")
    timer_wrapper.className = "timer_wrapper"
    let timer = document.createElement("div")
    timer.id = "timer_id"
    timer.className = "timer"

    //pause button
    let pause = document.createElement("div")
    pause.onclick = function () {
        pauseButton()
    }
    pause.className = "pause"
    pause.innerHTML = "<i class=\"fa-solid fa-pause\"></i>"

    //restart game button
    let restart = document.createElement("div")
    restart.className = "restart"
    restart.innerHTML = "<i class=\"fa-solid fa-repeat\"></i>"
    restart.onclick = function () {
        shuffleButton()
    }
    //label
    // labels.style.display = "none"
    let pause_label = document.createElement("div")
    pause_label.className = "pause_label"
    pause_label.innerHTML = "Stop"
    let restart_label = document.createElement("div")

    restart_label.className = "restart_label"
    restart_label.innerHTML = "Shuffle"
    let timer_label = document.createElement("div")
    timer_label.className = "timer_label"
    timer_label.innerHTML = "Timer"

    game__content_right.append(timer_bar)
    timer_bar.append(pause)
    timer_bar.append(restart)
    timer_bar.append(timer_wrapper)
    timer_wrapper.append(timer)

    game__content_right.append(labels)
    labels.append(pause_label)
    labels.append(restart_label)
    labels.append(timer_label)
}
timerBar()

//Tạo mảng cells thêm ảnh vào mảng 
var cells = []
let cellsLength // độ dài mảng
function getRandomImages() {
    let cellImages = [];
    //generate 100 cells = 50 pairs
    for(i = 0; i < imagePaths.length; i++){
        imagePaths[i]
        for(j = 0; j < 4; j++){
            cellImages.push(imagePaths[i])
        }
    }

    return cellImages;
}

function shuffleCellImages(cellImages) {
    for (let i = cellImages.length - 2; i > 1; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cellImages[i], cellImages[j]] = [cellImages[j], cellImages[i]];
    }
    return cellImages;
}

//import images to game frame
function init() {
    for (let i = 0; i < gameWidth; i++) {
        let rs = []
        for (let j = 0; j < gameHeight; j++) {

            rs.push(0)
        }
        cells.push(rs)
    }
    let cellImages = shuffleCellImages(getRandomImages());
    let k = 0
    for (let i = 1; i < gameWidth - 1; i++) {
        for (let j = 1; j < gameHeight - 1; j++) {
            let value = cellImages[k]
            cells[i][j] = value
            k = k + 1
        }
    }
    for (let i = 0; i < gameWidth; i++) {
        for (let j = 0; j < gameHeight; j++) {
            draw(i, j, cells[i][j])
        }
    }
    console.log(cells.length)
}

//update the game frame after changes
const reRender = () => {
    start__game.textContent = ""
    for (let i = 0; i < gameWidth; i++) {
        for (let j = 0; j < gameHeight; j++) {
            draw(i, j, cells[i][j])
        }
    }
}

//generate cells by div element to game frame
const draw = (x, y, value) => {
    let cell = document.createElement("div");
    cell.className = "cell cell_" + x + "-" + y;
    cell.style.backgroundImage = `url(${value})`;
    if (value === 0) {
        cell.style.backgroundColor = " rgb(255, 170, 66);"
        cell.style.border = "none"
        
        
    }
    cell.style.padding = "1px "
    cell.style.left = `${y * cellWidth}px`;
    cell.style.top = `${x * cellHeight}px`;
    cell.addEventListener("click", (e) => {
        mouseClicked(x, y, e)
    });
    start__game.appendChild(cell);
}

let cellStart, cellTarget, div1, div2
let visited = []

const initVisited = () => {
    visited = []
    for (let i = 0; i < gameWidth; i++) {
        let row = []
        for (let j = 0; j < gameHeight; j++) {
            row.push(false)
        }
        visited.push(row)
    }
}

let interval = 100;
let interval_update
let bonus_score
let interval_status = false
let countDown = null
let countdown_value

let shuffle_display
const shuffleButton = () => {
    if (shuffleIndex >= 0) {
        for (let i = 1; i < cells.length - 1; i++) {
            for (let j = 1; j < cells[i].length - 1; j++) {
                if (cells[i][j] !== 0) {
                    let c1 = cells[i][j]
                    let i_r = Math.floor(Math.random() * (gameHeight - 8)) + 1
                    let j_r = Math.floor(Math.random() * (gameWidth - 8)) + 1
                    for (let k = 0; k < 10000; k++) {
                        if (cells[i_r][j_r] === 0) {
                            i_r = Math.floor(Math.random() * (gameHeight - 8)) + 1
                            j_r = Math.floor(Math.random() * (gameWidth - 8)) + 1
                        } else {
                            break
                        }
                    }
                    let value_c1 = cells[i][j]
                    cells[i][j] = cells[i_r][j_r]
                    cells[i_r][j_r] = value_c1
                }
            }
        }
        shuffleIndex = shuffleIndex - 1
        shuffle_display = shuffleIndex
        updateShuffle(shuffle_display)
    }
    reRender()
}

let timer = document.getElementById("timer_id")
const pauseButton = () => {
    let width_stopped = interval_update
    if (!interval_status) {
        interval_status = true
        timer.style.width = width_stopped + "%"
        clearInterval(countDown)
        countDown = null
        let pause = document.getElementsByClassName("pause")[0]
        let text = document.getElementsByClassName("pause_label")[0]
        text.textContent = "Play"
        start__game.style.backgroundImage = "url(\"image/pokestop.jpg\")"
        start__game.style.opacity = "0.05"
        pause.innerHTML = "<i class=\"fa-solid fa-play\"></i>"
    } else {
        interval_status = false
        let pause = document.getElementsByClassName("pause")[0]
        start__game.style.opacity = "1"
        start__game.style.backgroundImage = "none"
        pause.innerHTML = "<i class=\"fa-solid fa-pause\"></i>"
        let text = document.getElementsByClassName("pause_label")[0]
        text.textContent = "Stop"
        countDown = setInterval(() => {
            interval--
            let timer = document.getElementById("timer_id")
            let progressWidth = interval

            if (interval > 0) {
                timer.style.width = progressWidth + "%"
                interval_update = progressWidth

            } else {
                clearInterval(countDown)
                timer.style.width = "0%"
                let alert = `<div class="time_out">
                                <p>TIME OUT!</p>
                             </div>                
                `
                start__game.innerHTML += alert
            }
        }, timeIndex)
    }
    countdown_value = countDown
}

function mouseClicked(x, y, e) {
    if (countDown === null) {
        countDown = setInterval(() => {
            interval--

            let progressWidth = interval - (interval * 0.0000000025)
            if (interval > 0) {
                timer.style.width = progressWidth + "%"
                interval_update = progressWidth
            } else {
                clearInterval(countDown)
                timer.style.width = "0%"
                let alert = `<div class="time_out">
                                <p>TIME OUT!</p>
                             </div>`
                start__game.innerHTML += alert
            }
        }, timeIndex)
    }

    let count = 0
    if (cells[x][y] !== 0) {
        e.target.style.opacity = "0.5"
        let clickedCell = e.target
        if (clickedCell !== cellStart) {
            if (!cellStart || cellStart === null) {
                div1 = clickedCell
                cellStart = [x, y]
                count++
            } else if (cellStart[0] === x && cellStart[1] === y) {
                e.target.style.opacity = "1"
                cellStart = null;
            } else {
                div2 = clickedCell
                cellTarget = [x, y]
                finishPath = false
                initVisited()
                let first_cell = cells[cellStart[0]][cellStart[1]]
                let second_cell = cells[cellTarget[0]][cellTarget[1]]
                if (first_cell === second_cell) {
                    findWay(cellStart, cellTarget)
                }
                if (DONE) {
                    DONE = false
                } else {
                    div1.style.opacity = "1"
                    div2.style.opacity = "1"
                    cellStart = null
                    cellTarget = null
                }
            }
        }
    }
}

//shuffle times update
const updateShuffle = (shuffle_display) => {
    if (shuffle_display < 0) { return }
    shuffle_display = shuffleIndex
    // shuffleIndex = shuffle_times
    shuffle.innerHTML = shuffleIndex
}

const decreaseShuffle = () => {
    updateShuffle(shuffleIndex - 1)
}

// score update
let score = 0
const updateScore = newScore => {
    if (isNaN(newScore)) return
    score = newScore
    score_title.innerHTML = score
}

const increaseScore = () => {
    updateScore(score + 100)
}

let count = 0;
const findWay = (cellStart, cellTarget) => {
    let stack = [];
    stack.push(cellStart);

    while (stack.length !== 0) {
        let cellCurrent = stack.shift();

        const neighbors = [
            { row: cellCurrent[0] - 1, col: cellCurrent[1] },
            { row: cellCurrent[0] + 1, col: cellCurrent[1] },
            { row: cellCurrent[0], col: cellCurrent[1] - 1 },
            { row: cellCurrent[0], col: cellCurrent[1] + 1 }
        ]

        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            let neighborRow = neighbor.row;
            let neighborCol = neighbor.col;
            if (neighborRow >= 0 && neighborRow < gameWidth && neighborCol >= 0 && neighborCol < gameHeight) {
                if (cells[neighborRow][neighborCol] === 0 & visited[neighborRow][neighborCol] === false) {
                    let tmp = [neighborRow, neighborCol]
                    stack.push(tmp)
                    visited[neighborRow][neighborCol] = cellCurrent
                }
                if (neighborRow === cellTarget[0] && neighborCol === cellTarget[1]) {
                    visited[cellTarget[0]][cellTarget[1]] = cellCurrent
                    logPath(visited)
                }
            }
        }

    }
}

var finishPath = false
//log the path between 2 cells
const logPath = (v) => {
    let path = []
    let c = cellTarget
    //loop until reach start cell
    while (c[0] !== cellStart[0] || c[1] !== cellStart[1]) {
        c = v[c[0]][c[1]]
        path.push(c)
    }
    let checkExistCellTarget = false
    for (let i = 0; i < path.length; i++) {
        if (path[i][0] === cellTarget[0] && path[i][1] === cellTarget[1]) {
            checkExistCellTarget = true
            break
        }
    }
    if (!checkExistCellTarget) {
        path.reverse()
        path.push(cellTarget)
    } else {
        path.push(cellStart)
    }
    //check path's length and mark cells in path
    let findWay = new Map()
    if (path.length <= 2 && !finishPath) {
        findWay.set(0, path)
        drawPathWay(findWay, path)
    } else {
        let count = 0
        findWay.set(count, [path[0]])
        findWay.set(count, [...findWay.get(count), path[1]])
        for (let i = 2; i < path.length; i++) {
            if (path[i][0] !== path[i - 2][0] && path[i][1] !== path[i - 2][1]) {
                count++
                if (findWay.get(count) !== undefined) {
                    findWay.set(count, [...findWay.get(count), path[i]])
                } else {
                    findWay.set(count, [path[i]])
                }
            } else {
                if (findWay.get(count) !== undefined) {
                    findWay.set(count, [...findWay.get(count), path[i]])
                } else {
                    findWay.set(count, [path[i]])
                }
            }
        }
        console.log("Count: ", count)
        if (count <= 2 && !finishPath) {
            drawPathWay(findWay, path, cellTarget)
        }
    }
}

// Vẽ đường thẳng giữa 2 cells
const drawPathWay = (path, arrr, cellTarget) => {
    finishPath = true
    let frame = document.querySelector(".start__game")

    for (let i = 0; i < path.size; i++) {
        let arrayPath1 = path.get(i)
        if (arrayPath1[0][1] === arrayPath1[arrayPath1.length - 1][1] && arrayPath1.length !== 1) {
            console.log(arrayPath1);
            if (i > 0) {
                arrayPath1 = [path.get(i - 1)[path.get(i - 1).length - 1], ...arrayPath1]
            }
            let left = Number(document.querySelector(`.cell_${arrayPath1[0][0]}-${arrayPath1[0][1]}`).style.left.split("px")[0])
            let start = Number(document.querySelector(`.cell_${arrayPath1[0][0]}-${arrayPath1[0][1]}`).style.top.split("px")[0])
            let end = Number(document.querySelector(`.cell_${arrayPath1[arrayPath1.length - 1][0]}-${arrayPath1[arrayPath1.length - 1][1]}`).style.top.split("px")[0])
            console.log(start, end, left);
            if (start > end) {
                let s = start
                start = end
                end = s
            }
            let line = $('<div>').addClass('line')
            line.css({
                "width": "3px",
                "position": "absolute",
                "top": start + 25 + "px",
                "left": left + 25 + "px",
                "height": end - start + "px",
                "background": "red"
            })
            $(frame).append(line)
        } else {
            console.log(path.get(i));
            if (i > 0) {
                arrayPath1 = [path.get(i - 1)[path.get(i - 1).length - 1], ...arrayPath1]
            }
            let top = Number(document.querySelector(`.cell_${arrayPath1[0][0]}-${arrayPath1[0][1]}`).style.top.split("px")[0])
            let start = Number(document.querySelector(`.cell_${arrayPath1[0][0]}-${arrayPath1[0][1]}`).style.left.split("px")[0])
            let end = Number(document.querySelector(`.cell_${arrayPath1[arrayPath1.length - 1][0]}-${arrayPath1[arrayPath1.length - 1][1]}`).style.left.split("px")[0])
            if (start > end) {
                let s = start
                start = end
                end = s
            }
            let line = $('<div>').addClass('line')
            line.css({
                "position": "absolute",
                "top": Number(top) + 25 + "px",
                "left": Number(start) + 25 + "px",
                "right": Number($(frame).width()) - Number(end) - 25 + "px",
                "background": "red",
                "height": "3px"
            })
            $(frame).append(line)
        }
        arrayPath1 = path.get(i)
        if (arrayPath1[0][1] === arrayPath1[arrayPath1.length - 1][1]) {
            console.log(arrayPath1);
            if (i > 0) {
                arrayPath1 = [path.get(i - 1)[path.get(i - 1).length - 1], ...arrayPath1]
            }
            let left = Number(document.querySelector(`.cell_${arrayPath1[0][0]}-${arrayPath1[0][1]}`).style.left.split("px")[0])
            let start = Number(document.querySelector(`.cell_${arrayPath1[0][0]}-${arrayPath1[0][1]}`).style.top.split("px")[0])
            let end = Number(document.querySelector(`.cell_${arrayPath1[arrayPath1.length - 1][0]}-${arrayPath1[arrayPath1.length - 1][1]}`).style.top.split("px")[0])
            if (start > end) {
                let s = start
                start = end
                end = s
            }
            let line = $('<div>').addClass('line')
            line.css({
                "width": "3px",
                "position": "absolute",
                "top": start + 25 + "px",
                "left": left + 25 + "px",
                "height": end - start + "px",
                "background": "red"
            })
            $(frame).append(line)
        } else {
            console.log(path.get(i));
            if (i > 0) {
                arrayPath1 = [path.get(i - 1)[path.get(i - 1).length - 1], ...arrayPath1]
            }

            let top = Number(document.querySelector(`.cell_${arrayPath1[0][0]}-${arrayPath1[0][1]}`).style.top.split("px")[0])
            let start = Number(document.querySelector(`.cell_${arrayPath1[0][0]}-${arrayPath1[0][1]}`).style.left.split("px")[0])
            let end = Number(document.querySelector(`.cell_${arrayPath1[arrayPath1.length - 1][0]}-${arrayPath1[arrayPath1.length - 1][1]}`).style.left.split("px")[0])
            if (start > end) {
                let s = start
                start = end
                end = s
            }
            let line = $('<div>').addClass('line')
            line.css({
                "position": "absolute",
                "top": Number(top) + 25 + "px",
                "left": Number(start) + 25 + "px",
                "right": Number($(frame).width()) - Number(end) - 25 + "px",
                "background": "red",
                "height": "3px"
            })
            $(frame).append(line)
        }

    }
    increaseScore()
    setTimeout(() => {
        arrr.map(j => {
            cells[j[0]][j[1]] = 0
        })
        scoreAudio.play()   
        reRender()
        // levelDirection()
        // endGame()
    }, 400)
}

//swap 2 cells in same row by x index
const swapCellX = (i, index, x) => {
    let tmp = cells[x][i]
    cells[x][i] = cells[x][index]
    cells[x][index] = tmp
}

//swap 2 cells in same column by y index
const swapCellY = (i, index, y) => {
    let tmp = cells[i][y]
    cells[i][y] = cells[index][y]
    cells[index][y] = tmp
}

