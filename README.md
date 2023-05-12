# Live URL
https://ashiqxq.github.io/2048/

# Running the app

to run the app in dev mode

1. npm i
2. npm start

# Playing the game

1. In pc/mac -> use the arrow keys to move the tiles, and 'r' to refresh the grid


# Game implementation logic

The logic used here is fairly easy, we use a slide and merge technique. 
i.e 
1. slide the non empty tiles into a queue
2. and then merge the consecutive pair of identical tiles in the queue
