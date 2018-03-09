# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

### My contribution

Memory Game can be played when the page is completely loaded. Each turn, one player can click on two cards. If they have the same symbol, then gets a match. Otherwise, these two cards flip face down.
When all cards are matched, then a modal box pops up congratulating and shows how many moves and time were necessary to finish the game. It also shows how many stars were obtained.

#### Counting STARS
Each game starts with three stars. According to the number of moves, the number of stars decreases:

- 3 stars: between 8 and 12 moves;
- 2 stars: between 13 and 18 moves; and
- 1 star: above 19 moves; 

#### Comparing scores
Playing two games or more, a table with older scores will appear in "congratulations" modal box. For example:

| Try | Moves | Time | Stars |
|:---:| :---: |:---: | :---: |
|  0  |   24  |00:56 |   1   |
|  1  |   18  |01:22 |   2   |

If reset button is clicked, this table will be deleted.

#### "Congratulations!" Modal Box
- Clicking on "Play again?" will start a new game and save the information from the previous one.
- Clicking on "x - close button" will close the modal box, but it won't start a new game or save the previous information. If one wants to play again, it is necessary to click on reset button.
