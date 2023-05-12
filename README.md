# Live URL
https://ashiqxq.github.io/2048/

# Running the app

to run the app in dev mode

1. npm i
2. npm start

# Playing the game

1. In pc/mac -> use the arrow keys to move the tiles, and 'r' to refresh the grid

# Implementation detail

* game will not be over when all the tiles are filled, instead it will be over only if no more merging of tiles is possible,
* i.e even if the grid is filled, if there are adjacent numbers with equal values, you can still continue playing.
* The game will be over only when all tiles are filled, and there are no two similar numbers adjacent


# Game implementation logic

The logic used here is fairly easy, we use a slide and merge technique. 
i.e 
1. slide the non empty tiles into a queue
2. and then merge the consecutive pair of identical tiles in the queue
