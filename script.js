const grid = document.getElementById("grid")
const start = document.getElementById("start-button")
const refresh = document.getElementById("refresh-button")
const h_score = document.getElementById("highest-score")
const c_score = document.getElementById("current-score")

let snake = [[0, 0]]
let ax = 0
let ay = 0
let current = 0
let d = 0;
let current_score = 0
let highest_score = 0



//start the game
start.addEventListener("click", (event) => {
    console.log(current)
    if(current == 0) {        
        current = 1;
        d = 3;
        continue_playing()
    }
})

//end the game
refresh.addEventListener("click", (event) => {
    current = 0;
    d = 0;
    snake = [[0, 0]]
    inital_game_start()
})


//grid creation
function createGrid() {
    for(let i=0;i<15;i++) {
        const newNode = document.createElement("div")
        newNode.classList.add("row")
        for(let j=0;j<15;j++) {
           const newBox = document.createElement("div")
           newBox.setAttribute('id', `${i}-${j}`)
           newNode.append(newBox)
        }
        grid.append(newNode)
    }
}

createGrid()

function find_apple_position() {
    let x = parseInt(Math.random() * 14);
    let y = parseInt(Math.random() * 14);

    ax = x;
    ay = y;
}

function inital_game_start() {
    current_score = 0
    while(snake[0][0] == ax && snake[0][1] == ay) {
        find_apple_position()
    }
    for(let i=0;i<15;i++) {
        for(let j=0;j<15;j++) {
            document.getElementById(`${i}-${j}`).style.background = "none"
        }
    }
    snake.forEach(value => {
        document.getElementById(`${value[0]}-${value[1]}`).style.background = "white"
    })

    document.getElementById(`${ax}-${ay}`).style.background = "red"
}

inital_game_start()


//check for error
function check_for_error(x, y) {
    if(x < 0 || y < 0 || x >= 15 || y >= 15) return true
    let f = 0;
    snake.forEach(value => {
        if(x == value[0] && y == value[1]) {
            f = 1;
        }
    })

    return f
}

function check_for_apple(x, y) {
    return (x == ax && y == ay)
}

function handleSnake(dx, dy) {
    let nx = snake[0][0];
    let ny = snake[0][1];
    nx += dx;
    ny += dy;
    current_score = Math.max(current_score, snake.length)
    highest_score = Math.max(highest_score, snake.length)

    h_score.innerText = `Highest-score - ${highest_score}`
    c_score.innerText = `Current-score - ${current_score}`
    if(check_for_error(nx, ny)) {
          current = 0;
          d = 0;
          current_score = 0
          c_score.innerText = `Current-score - ${current_score}`
          snake = [[0, 0]]
          inital_game_start()
          clearInterval(interval)
    } else if(check_for_apple(nx, ny)) {
         snake.unshift([nx, ny])
         while(snake[0][0] == ax && snake[0][1] == ay) {
            find_apple_position()
        }
        inital_game_start()
    } else {        
          let sz = snake.length
           document.getElementById(`${snake[sz-1][0]}-${snake[sz-1][1]}`).style.background="none"
          for(let i=sz-1;i>0;i--) {
              snake[i] = snake[i-1]
          }
          snake[0] = [nx, ny]
          inital_game_start()
    }
}

document.addEventListener("keydown", handle_direction)

function handle_direction(event) {
   let key = event.keyCode
   if(current) {
        if(key == 37) {
            d = 1            
        } else if(key == 38) {
            d = 2            
        } else if(key == 39) {
            d = 3
        } else if(key == 40) {
            d = 4            
        }
   }

}
let interval 
function continue_playing() {

    if(current) {
    
        interval = setInterval(() => {            
            if(d == 1) {
                handleSnake(0, -1)
            } else if(d == 2) {
                handleSnake(-1, 0)
            } else if(d == 3) {
                handleSnake(0, 1)
            } else if(d == 4) {
                handleSnake(1, 0)
            }
        },200)
        
    }
}

h_score.innerText = `Highest-score - ${highest_score}`
c_score.innerText = `Current-score - ${current_score}`

