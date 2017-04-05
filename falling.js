/*
   Don't worry, this is still JavaScript---the latest version known as ES6.
   We've been looking at ES5 this semester because our tools, particularly
   Khan Academy, are not ES6-savvy yet. The good news is that ES5 code works
   fine in ES6; the deeper differences don't affect what we're doing at this
   stage. A summary of the most visible differences:
   - Instead of `var`, use `let`
   - Instead of `function (...)`, use `(...) =>`
   - There is a special `const` definition now for variables whose values you
     don’t intend to change.
   For a full summary of differences, try out this page:
       http://es6-features.org
   There are many other resources available as well.
*/
(() => {
    // In general, don't touch anything except for sections explicitly marked as such.
    // Look for the exclamations points (!!!!!) for such markers.
    let canvas = document.getElementById("game");
    let game = canvas.getContext("2d");
    let lastTimestamp = 0;

    let score = document.getElementById("score");
    let initialScore = 0;

    let livesRemaining = document.getElementById("lives");
    let startingLives = 5;
    livesRemaining.innerHTML = startingLives;

    let streakCount = document.getElementById("streakCount");
    let streakStart = 0;
    streakCount.innerHTML = streakStart;

    let FRAME_RATE = 60;
    const FRAME_DURATION = 1000 / FRAME_RATE;

    // !!!!! Change/add to this as needed. What other objects or variables will you need for your game idea?
    //       A score? Different kinds of fallers? Player statistics? It's all up to you!
    let fallers = [];

    // Check out that cool ES6 feature: default parameter values!
    const DEFAULT_DESCENT = 0.0001; // This is per millisecond.
    let Faller = function(fallerType, x, y, width, height, dx = 0, dy = 0, ax = 0, ay = DEFAULT_DESCENT) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // Velocity.
        this.dx = dx;
        this.dy = dy;

        // Acceleration.
        this.ax = ax;
        this.ay = ay;

        // Faller Type
        this.fallerType = fallerType;

        // Caught status
        this.caught = false;

    };

    // let scoreToAdd =

    let FALLER_TYPES = {
        1: {
            draw: function(faller) {
                game.fillStyle = "red";
                game.fillRect(faller.x, faller.y, faller.width, faller.height);
            },
            move: function(faller, millisecondsElapsed) {
                // Good old Newtonian physics.
                faller.x += faller.dx * millisecondsElapsed;
                faller.y += faller.dy * millisecondsElapsed;

                faller.dx += faller.ax * millisecondsElapsed;
                faller.dy += faller.ay * millisecondsElapsed;
            },
            caughtStatus: function(faller) {
                if (!faller.caught && faller.y > canvas.height - 85 && faller.x > player.x - 55 &&
faller.x < player.x + 55) {
                    faller.caught = true;
                    let pointValue = 10;
                    score.innerHTML = initialScore + pointValue;
                    initialScore = initialScore + pointValue;

                    let streakAdd = 1;
                    let scoreIncrease = 500;
                    streakCount.innerHTML = streakStart + streakAdd;
                    streakStart = streakStart + streakAdd;
                    if (streakStart % 9 === 0) {
                        initialScore = initialScore + scoreIncrease;
                    }
                } else if (faller.y > canvas.height && !faller.caught) {
                    livesRemaining.innerHTML = startingLives - 1;
                    startingLives = startingLives - 1;

                    streakStart = 0;
                    streakCount.innerHTML = streakStart;
                }
                if (startingLives === 0) {
                    livesRemaining.innerHTML = "GAME OVER";
                    running = false;
                }
            }
        },
        2: {
            draw: function(faller) {
                game.fillStyle = "greenyellow";
                game.fillRect(faller.x, faller.y, faller.width, faller.height);
            },
            move: function(faller, millisecondsElapsed) {
                // Good old Newtonian physics.
                faller.x += faller.dx * millisecondsElapsed;
                faller.y += faller.dy * 2 * millisecondsElapsed;

                faller.dx += faller.ax * millisecondsElapsed;
                faller.dy += faller.ay * millisecondsElapsed;
            },
            caughtStatus: function(faller) {
                if (!faller.caught && faller.y > canvas.height - 85 && faller.x > player.x - 55 &&
faller.x < player.x + 55) {
                  faller.caught = true;
                  let pointValue = 20;
                  score.innerHTML = initialScore + pointValue;
                  initialScore = initialScore + pointValue;

                  let streakAdd = 1;
                  let scoreIncrease = 500;
                  streakCount.innerHTML = streakStart + streakAdd;
                  streakStart = streakStart + streakAdd;
                  if (streakStart % 9 === 0) {
                        initialScore = initialScore + scoreIncrease;
                    }
              } else if (faller.y > canvas.height && !faller.caught) {
                    livesRemaining.innerHTML = startingLives - 1;
                    startingLives = startingLives - 1;

                    streakStart = 0;
                    streakCount.innerHTML = streakStart;
                }
                if (startingLives === 0) {
                    livesRemaining.innerHTML = "GAME OVER";
                    running = false;
                }
            }

        },
        3: {
            draw: function(faller) {
                game.fillStyle = "gold";
                game.fillRect(faller.x, faller.y, faller.width, faller.height);
            },
            move: function(faller, millisecondsElapsed) {
                // Good old Newtonian physics.
                faller.x += faller.dx * millisecondsElapsed;
                faller.y += faller.dy * 4 * millisecondsElapsed;

                faller.dx += faller.ax * millisecondsElapsed;
                faller.dy += faller.ay * millisecondsElapsed;
            },
            caughtStatus: function(faller) {
              if (!faller.caught && faller.y > canvas.height - 85 && faller.x > player.x - 55 &&
faller.x < player.x + 55) {
                  faller.caught = true;
                  let pointValue = 50;
                  score.innerHTML = initialScore + pointValue;
                  initialScore = initialScore + pointValue;

                  let streakAdd = 1;
                  let scoreIncrease = 500;
                  streakCount.innerHTML = streakStart + streakAdd;
                  streakStart = streakStart + streakAdd;
                  if (streakStart % 9 === 0) {
                        initialScore = initialScore + scoreIncrease;
                    }
              } else if (faller.y > canvas.height && !faller.caught) {
                    livesRemaining.innerHTML = startingLives - 1;
                    startingLives = startingLives - 1;

                    streakStart = 0;
                    streakCount.innerHTML = streakStart;
                }
                if (startingLives === 0) {
                    livesRemaining.innerHTML = "GAME OVER";
                    running = false;
                }
            }

        },
        4: {
            catchValue: 100,
            draw: function(faller) {
                game.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
                game.fillRect(faller.x, faller.y, faller.width, faller.height);
            },
            move: function(faller, millisecondsElapsed) {
                // Good old Newtonian physics.
                faller.x += faller.dx * millisecondsElapsed;
                faller.y += faller.dy * 8 * millisecondsElapsed;

                faller.dx += faller.ax * millisecondsElapsed;
                faller.dy += faller.ay * millisecondsElapsed;
            },
            caughtStatus: function(faller) {
                if (!faller.caught && faller.y > canvas.height - 85 && faller.x > player.x - 55 &&
faller.x < player.x + 55) {
                  faller.caught = true;
                  let pointValue = 100;
                  score.innerHTML = initialScore + pointValue;
                  initialScore = initialScore + pointValue;

                  let streakAdd = 1;
                  let scoreIncrease = 500;
                  streakCount.innerHTML = streakStart + streakAdd;
                  streakStart = streakStart + streakAdd;
                  if (streakStart % 9 === 0) {
                        initialScore = initialScore + scoreIncrease;
                    }
              } else if (faller.y > canvas.height && !faller.caught) {
                    livesRemaining.innerHTML = startingLives - 1;
                    startingLives = startingLives - 1;

                    streakStart = 0;
                    streakCount.innerHTML = streakStart;
                }
                if (startingLives === 0) {
                    livesRemaining.innerHTML = "GAME OVER";
                    running = false;
                }
            }
        }
    };

    const DEFAULT_PLAYER_WIDTH = 45;
    const DEFAULT_PLAYER_HEIGHT = 55;
    let DEFAULT_PLAYER_Y = canvas.height - DEFAULT_PLAYER_HEIGHT;
    let Player = function(x, y = DEFAULT_PLAYER_Y, width = DEFAULT_PLAYER_WIDTH, height = DEFAULT_PLAYER_HEIGHT) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };

    Player.prototype.draw = function() {
        game.fillStyle = "lawngreen";
        game.beginPath();
        game.moveTo(this.x - this.width / 2, this.y + this.height);
        game.lineTo(this.x, this.y);
        game.lineTo(this.x + this.width / 2, this.y + this.height);
        game.closePath();
        game.fill();

        game.fillStyle = "bisque";
        game.beginPath();
        game.moveTo(this.x - (this.width) / 2, this.y + (this.height - 25));
        game.lineTo(this.x, this.y - 30);
        game.lineTo(this.x + (this.width) / 2, this.y + (this.height - 25));
        game.closePath();
        game.fill();

        game.fillStyle = "lawngreen";
        game.beginPath();
        game.moveTo(this.x - (this.width - 10) / 2, this.y + (this.height - 55));
        game.lineTo(this.x, this.y - 40);
        game.lineTo(this.x + (this.width - 10) / 2, this.y + (this.height - 55));
        game.closePath();
        game.fill();

        game.fillStyle = "lightseagreen";
        game.beginPath();
        game.moveTo(this.x - (this.width - 15) / 2, this.y + (this.height - 50));
        game.lineTo(this.x - (this.width - 35) / 2, this.y + (this.height - 50));
        game.lineTo(this.x - (this.width - 35) / 2, this.y + (this.height - 40));
        game.closePath();
        game.fill();

        game.fillStyle = "lightseagreen";
        game.beginPath();
        game.moveTo(this.x - (this.width - 55) / 2, this.y + (this.height - 50));
        game.lineTo(this.x - (this.width - 75) / 2, this.y + (this.height - 50));
        game.lineTo(this.x - (this.width - 55) / 2, this.y + (this.height - 40));
        game.closePath();
        game.fill();

        game.fillStyle = "black";
        game.beginPath();
        game.moveTo(this.x - (this.width - 65) / 2, this.y + (this.height - 38));
        game.lineTo(this.x - (this.width - 25) / 2, this.y + (this.height - 38));
        game.lineTo(this.x - (this.width - 45) / 2, this.y + (this.height - 28));
        game.closePath();
        game.fill();
    };

    let player = new Player(canvas.width / 2);
    player.draw();
    // !!!!! You can treat this function like Khan Academy’s `draw`---just precede all
    //       drawing instructions with `game.`
    let draw = (millisecondsElapsed) => {
        game.clearRect(0, 0, canvas.width, canvas.height);

        fallers.forEach((faller) => {
            FALLER_TYPES[faller.fallerType].draw(faller);
            FALLER_TYPES[faller.fallerType].move(faller, millisecondsElapsed);
            FALLER_TYPES[faller.fallerType].caughtStatus(faller);
            // FALLER_TYPES[faller.fallerType].pointValue(faller);


        });


        player.draw();

        // Remove fallers that have hit the ground. You might have other reasons to remove fallers.
        fallers = fallers.filter((faller) => {
            return faller.y < canvas.height;
        });
    };

    // !!!!! This section is modifiable to a degree. It is responsible for generating falling objects at random.
    //       You don't want to completely eliminate this code, but you may want to revise it to modify the rate/range
    //       of objects that get generated.
    const MIN_WIDTH = 10;
    const WIDTH_RANGE = 20;
    const MIN_HEIGHT = 10;
    const HEIGHT_RANGE = 20;
    const MILLISECONDS_BETWEEN_FALLERS = 1500;
    let fallerGenerator;
    let startFallerGenerator = () => {
        fallerGenerator = setInterval(() => {
            // !!!!! This code looks really repetitive! Hmmmm, what to do...
            let fallerWidth = Math.floor(Math.random() * WIDTH_RANGE) + MIN_WIDTH;
            fallers.push(new Faller(Math.ceil(Math.random() * 4),
                Math.floor(Math.random() * (canvas.width - fallerWidth)), 0,
                fallerWidth, Math.floor(Math.random() * HEIGHT_RANGE) + MIN_HEIGHT
            ));
        }, MILLISECONDS_BETWEEN_FALLERS);
    };


    let stopFallerGenerator = () => clearInterval(fallerGenerator);

    // !!!!! This section is also modifiable to a degree: it is responsible for moving the "player" around based on
    //       mouse movement.
    let setPlayerPositionBasedOnMouse = (event) => {
        player.x = event.clientX / document.body.clientWidth * canvas.width;
    };

    document.body.addEventListener("mouseenter", setPlayerPositionBasedOnMouse);
    document.body.addEventListener("mousemove", setPlayerPositionBasedOnMouse);

    // OK, back to the no-touch zone (unless you _really_ know what you’re doing).
    let running = false;
    let nextFrame = (timestamp) => {
        if (!lastTimestamp) {
            lastTimestamp = timestamp;
        }

        if (timestamp - lastTimestamp < FRAME_DURATION) {
            if (running) {
                window.requestAnimationFrame(nextFrame);
            }

            return;
        }

        draw(timestamp - lastTimestamp);

        lastTimestamp = timestamp;
        if (running) {
            window.requestAnimationFrame(nextFrame);
        }
    };

    document.getElementById("start-button").addEventListener("click", () => {
        running = true;
        lastTimestamp = 0;
        startFallerGenerator();
        window.requestAnimationFrame(nextFrame);
    });

    document.getElementById("stop-button").addEventListener("click", () => {
        stopFallerGenerator();
        running = false;
    });
})();
