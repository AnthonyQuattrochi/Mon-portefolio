var _images = {};
const T = 35;
score = 0;
length = 15;
var sources = {
    blue: "asset/tuile1.png",
    green: "asset/tuile2.png",
    yellow: "asset/tuile3.png",
    red: "asset/tuile4.png",
    white: "asset/tuile5.png"
};
/**
 * Load the array _images of images
 */
var isReady = ImageLoader(sources,
    function(images) {
        _images = images;
    }
);

/**
 * Get a random value in a array
 * @param {array} object 
 * @returns 
 */
var randomProperty = function(object) {
    var keys = Object.keys(object);
    value = Math.floor(keys.length * Math.random())
    if (value != 0) {
        value = value - 1;
    }
    return object[keys[value]];
};

/**
 * Function to initialize the js
 */
function init() {
    isReady;
    var matrix = [];
    var canvas = document.getElementById("chargement");
    var x_canvas = canvas.getBoundingClientRect().left;
    var y_canvas = canvas.getBoundingClientRect().top;

    canvas.onclick = function(event) {
        var x = Math.floor((event.clientX - x_canvas) / T);
        var y = Math.floor((event.clientY - y_canvas) / T);

        if (brickGotFriends(y, x, matrix)) {
            score = score + givePoints(getAllyGroup(x, y, matrix));
            document.getElementById("score").innerText = score;
            DrawMatrix(TuileGoesDown(matrix));
            while (moveAllBricksOnTheLeft(matrix)) {
                length--;
            };
            if (!testIfEnded(matrix)) {} else {
                for (i = 0; i < 15; i++) {
                    for (y = 0; y < 15; y++) {
                        if (matrix[y][x].im != _images['white']) {
                            score = score - 10;
                        }
                    }
                }
                document.getElementById("score").innerText = score;
            }
        }

    }
    matrix = createMat(matrix);
    DrawMatrix(matrix);
}

/**
 * Delete a group of bricks that own the same color, also tell how many of them the function destroyed it.
 * @param {int} y 
 * @param {int} x 
 * @param {matrix} mx 
 * @returns number of blocks deleted by the clic. 
 */
function getAllyGroup(y, x, mx) {
    if (mx[x][y].im != _images['white']) {
        color = mx[x][y].im;
        cpt = 1;
        mx[x][y].im = _images['white'];
        if (y != 0 && color == mx[x][y - 1].im) {

            cpt = cpt + getAllyGroup(y - 1, x, mx);
        }
        if (y != 14 && color == mx[x][y + 1].im) {
            cpt = cpt + getAllyGroup(y + 1, x, mx);
        }
        if (x != 0 && color == mx[x - 1][y].im) {
            cpt = cpt + getAllyGroup(y, x - 1, mx);
        }
        if (x != 14 && color == mx[x + 1][y].im) {
            cpt = cpt + getAllyGroup(y, x + 1, mx);
        }
        DrawMatrix(mx);
        return cpt;
    } else {
        return 0;
    }
}
/**
 * Tell if the bricks have friends around it.
 * @param {int} x 
 * @param {int} y 
 * @param {matrix} mx 
 */
function brickGotFriends(x, y, mx) {
    gotFriend = false;
    if (mx[x][y].im != _images['white']) {
        color = mx[x][y].im;
        if (y != 0 && color == mx[x][y - 1].im) {
            gotFriend = true;
        }
        if (y != 14 && color == mx[x][y + 1].im) {
            gotFriend = true;
        }
        if (x != 0 && color == mx[x - 1][y].im) {
            gotFriend = true;
        }
        if (x != 14 && color == mx[x + 1][y].im) {
            gotFriend = true;
        }
    }
    return gotFriend;
}
/**
 * Function that give the points value for the number of blocks destroyed at once.
 * @param {int} nb 
 * @returns 
 */
function givePoints(nb) {
    switch (nb) {
        case 1:
            return -10;
        case 2:
            return 0;
        case 3:
            return 10;
        default:
            return (nb * 18) + 10;
    }
}

/**
 * Function that build a Tuile.
 * @param {int} i 
 * @param {int} j 
 */
function tuile(i, j) {
    this.i = i; // ligne dans la grille
    this.j = j; //colonne
    this.y = i * T; // position en Pixel ( T est la hauteur et la largeur de la tuile )
    this.x = j * T; // idem
    this.im = null; // l'image à afficher dans le canvas
};

/**
 * Function that create the matrix for the game.
 * @param {matrix} matrix 
 */
function createMat(matrix) {
    for (i = 0; i < 15; i++) {
        matrix[i] = [];
        for (j = 0; j < 15; j++) {
            var cel = new tuile(i, j);
            cel.im = randomProperty(_images);
            matrix[i][j] = cel;
        }
    }
    return matrix;
}
/**
 * This function is used to load images
 * @param {Object} sources 
 * @param {Object} callback 
 */
function ImageLoader(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
};

/**
 * Draw the matrix on the canvas in the html
 * @param {matric} matrix 
 */
function DrawMatrix(matrix) {
    var canvas = document.getElementById("chargement");
    var ctx = canvas.getContext("2d");
    for (i = 0; i < 15; i++) {
        for (j = 0; j < 15; j++) {
            ctx.drawImage(matrix[i][j].im, matrix[i][j].x, matrix[i][j].y, T, T);
        }
    }
}

/**
 * The gravity for bricks.
 * @param {matrix} matrix 
 * @returns the matrix which have changed, yeah it's maybe not really the best idea.
 */
function TuileGoesDown(matrix) {
    for (x = 14; x > 0; x--) {
        for (y = 0; y < 15; y++) {
            if (matrix[x][y].im == _images['white']) {
                for (col = 1; col < 15; col++) {
                    if (matrix[col][y].im == _images['white']) {
                        imTMP = matrix[col][y].im;
                        matrix[col][y].im = matrix[col - 1][y].im;
                        matrix[col - 1][y].im = imTMP;
                    }

                }
            }
        }
    }
    return matrix;
};

/**
 * Function that moves every column on the left
 * @param {matrix} matrix 
 * @returns if the matrix changed during the process of the function.
 */
function moveAllBricksOnTheLeft(matrix) {
    doesItmoved = false;
    for (y = 0; y < length; y++) {
        if (matrix[14][y].im == _images['white']) {
            doesItmoved = true;
            for (i = 0; i < 15; i++) {
                for (j = y; j < length - 1; j++) {
                    imgTMP = matrix[i][j].im;
                    matrix[i][j].im = matrix[i][j + 1].im;
                    matrix[i][j + 1].im = imgTMP;
                }
            }
        }
    }
    DrawMatrix(matrix);
    return doesItmoved;
}

/**
 * Tell if the game is ended.
 * @param {matrix} matrix 
 * @returns 
 */
function testIfEnded(matrix) {
    for (x = 0; x < 15; x++) {
        for (y = 0; y < 15; y++) {
            if (brickGotFriends(y, x, matrix)) {
                return false;
            }
        }
    }
    return true;
}