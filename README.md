**Completed-Projects** Updated April 5, 2017

# My Completed Projects Repository
Hello, and welcome to my repository!

## Intzilla.java
Intzilla is a program that I wrote for my CMSI 186 class. It allows various functions (addition, subtraction, multiplication, division, modulo, greater than, less than, and equals) to be done on arbitrarily large integers -- that is, these functions may be done to integers that contain up to Integer.MAX_INT digits!

## Factorial.java
This program allows a user to input an Intzilla in the command line and outputs the factorial value of that Intzilla.

## Fibonacci.java
This program allows a user to input some Intzilla "n" in the command line and outputs the value of the "nth" term of the Fibonacci sequence.

## Falling.js
This file includes the code that creates a small game for the user to play! In this game, the user uses their mouse to control a little elf. The goal is to catch as many falling presents as possible before running out of lives. Red presents are worth 10 points, green are worth 20, gold are worth 50, and rainbow are worth 100. 500 points are added to the score every time the user catches 10 presents in a row. The user has a total of five lives, and every time they miss a present, one life is spent. The user may click start to begin the game and stop to pause the game. To re-start the game, the user must refresh the page. (Credit to Michael Simmons for being my partner in this project).

## Falling.html
This file includes the HTML code for the Falling game.

## Falling.css
This file includes the CSS code for the Falling game.

## Coin.java
This file includes code that creates the Coin object implimented in the BagOfCoins and AlexanderHamilton classes. The entirety of this code is credited to Professor John David Dionisio who provided our CMSI186 class with this starter code.

## BagOfCoins.java
The BagOfCoins class creates an object that represents a "bag of coins," or a group of Coin objects in which every coin in the bag can be flipped. It includes the central method that allows AlexanderHamilton to function-- the getFlipHistogram method.

## AlexanderHamilton.java
AlexanderHamilton (named after the first treasury secretary of the United States) utilizes the Coin and BagOfCoins classes. It is a program that prints a histogram that shows the number of times that individual coins turned up heads out of the total number of throws. The user can input either zero or four arguments. The first argument represents the number of coins in the bag, the second represents the number of times the bag is thrown, the third represents the number of partitions the histogram results are divided into, and the fourth represents the amount of bias on the coins (the bias being a decimal amount that represents the percent chance that a coin will turn up tails). If the user wants to use the default amounts of 1000 coins, 1000 throws, 100 partitions, and a bias of 0.5, they can input a - instead of a value in their input.
