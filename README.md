# askmethat-rating

master:
[![Build Status](https://travis-ci.org/AlexTeixeira/powerful-rating.svg?branch=master)](https://travis-ci.org/AlexTeixeira/powerful-rating)
[![Coverage Status](https://coveralls.io/repos/github/AlexTeixeira/powerful-rating/badge.svg?branch=master)](https://coveralls.io/github/AlexTeixeira/powerful-rating?branch=master)

develop:
[![Build Status](https://travis-ci.org/AlexTeixeira/powerful-rating.svg?branch=develop)](https://travis-ci.org/AlexTeixeira/powerful-rating)
[![Coverage Status](https://coveralls.io/repos/github/AlexTeixeira/powerful-rating/badge.svg?branch=develop)](https://coveralls.io/github/AlexTeixeira/powerful-rating?branch=master


### Synopsis

This plugins was made to allow user to create any rating with any font ( like font-awesome or glyphicons).

## Current implementation

The plugin is in development, this is a beta version. You can use this plugin without any plugin, it's fully generated in JavaScript.

Currently the plugin have implemented : 

1. Font render as a horizontal list
2. Click and Hover listener
3. Option to customize rating fonts
4. Static method to get value of specific rating

## Motivation

This result that for a personal project, I need to have rating that not displayed as stars.
Some fonts of Font awesome answered my needs, but I did not find any complete plugin using them to display any font as rating.

## Installation

For now, you could download the repository and use gulp to generate the JavaScript files.

1. Restore the node package using [Yarn](https://yarnpkg.com/)

2. Run this gulp task

```javascript
gulp default
```
3. The javascript and css is in the folder dist.

When the plugin will be stable, it will be available to download it with npm.

## Example

### Current options

This is the current available options parameters ( this is the default options).

```javascript
var options = {
        backgroundColor : "#e5e500", //This is the color shown when a rating is not "active"
        hoverColor: "#ffff66", //This is the color shown when a rating is  "active"
        fontClass: "fa fa-star", //This is the font class you wan to use
        minRating: 1, //This is the minimum rating you want to be active
        maxRating: 5 //this is the maximum of rating you can have
      
      };
```


### Generate the rating

This example show you how to create a rating starting at 

```javascript
var container = document.getElementById("amtRating");
var amt = new AskmethatRating(container); //if you don't give options to the class, it will use the default ones
```

### Get the rating value

This method retrive the selected rating value.

#### From the JavaScript object

```javascript
var container = document.getElementById("amtRating");
var amt = new AskmethatRating(container); //if you don't give options to the class, it will use the default ones
console.log(amt.value)
```

#### From the DOM object

You just need to give the identifier or a class to get the value.

```javascript
console.log(AskmethatRating.value("#amtRating")); 
```


## Next steps

The next steps are :

1. Allow the plugins to use decimal values instead of only integer
2. Allow the plugins to use jQuery for the one user of this plugin

## Contributors

Anyone who want to contribute to the plugin can.

Just fork the project and create a pull request