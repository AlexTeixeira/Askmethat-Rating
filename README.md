# askmethat-rating


### develop:
[![Build Status](https://travis-ci.org/AlexTeixeira/Askmethat-Rating.svg?branch=develop)](https://travis-ci.org/AlexTeixeira/Askmethat-Rating)
[![Coverage Status](https://coveralls.io/repos/github/AlexTeixeira/Askmethat-Rating/badge.svg?branch=develop)](https://coveralls.io/github/AlexTeixeira/Askmethat-Rating?branch=develop)

### master:
[![Build Status](https://travis-ci.org/AlexTeixeira/Askmethat-Rating.svg?branch=master)](https://travis-ci.org/AlexTeixeira/Askmethat-Rating)
[![Coverage Status](https://coveralls.io/repos/github/AlexTeixeira/Askmethat-Rating/badge.svg?branch=master)](https://coveralls.io/github/AlexTeixeira/Askmethat-Rating?branch=master)

### package information:
[![Bower version](https://badge.fury.io/bo/askmethat-rating.svg)](https://github.com/AlexTeixeira/Askmethat-Rating)
<br/>
[![NPM](https://nodei.co/npm/askmethat-rating.png?compact=true)](https://nodei.co/npm/askmethat-rating/)
<br/>
[![NPM](https://nodei.co/npm-dl/askmethat-rating.png)](https://nodei.co/npm/askmethat-rating/)

## Synopsis

This plugins was made to allow user to create any rating with any font ( like Font-Awesome or Glyphicons).

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

### From Source Code
For now, you could download the repository and use gulp to generate the JavaScript files.

1. Restore the node package using [Yarn](https://yarnpkg.com/)

2. Run this npm task for production generation

```javascript
npm run build:prod
```
3. The javascript and css is in the folder dist.

When the plugin will be stable, it will be available to download it with npm.

### From NPM

```javascript
npm i askmethat-rating
```

### From Bower

```javascript
bower install askmethat-rating
```

## TypeScript

My plugin have now is Definition file in the [DefinitelyTyped repository](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/askmethat-rating)

You can install it with this npm command 

```javascript
  npm install -D @types/askmethat-rating
```

Or this yarn one : 

```javascript
  yarn add -D @types/askmethat-rating
```

## Example

### Current options

This is the current available options parameters ( this is the default options).

```javascript
var options = {
        backgroundColor : "#e5e500", //This is the color shown when a rating is not "active"
        hoverColor: "#ffff66", //This is the color shown when a rating is  "active"
        fontClass: "fa fa-star", //This is the font class you wan to use
        minRating: 1, //This is the minimum rating you want to be active
        maxRating: 5, //this is the maximum of rating you can have,
        readonly: false, // disable all events if is true,
        step : 0 // change the step on mouse over,
        inputName : "AskmethatRating" // name for the generated input
      
      };
```


### Generate the rating

This example show you how to create a rating starting with default options and using as default value minRating

```javascript
var container = document.getElementById("amtRating");
var amt = new Askmethat.AskmethatRating(container); //if you don't give options to the class, it will use the default ones
```

If you want to set a custom default value, call the plugin with this additional parameter

```javascript
var container = document.getElementById("amtRating");
var amt = new Askmethat.AskmethatRating(container, 2); //if you don't give options to the class, it will use the default ones
```

### Get the rating value

This method retrieve the selected rating value.

#### From the JavaScript object

```javascript
var container = document.getElementById("amtRating");
var amt = new Askmethat.AskmethatRating(container); //if you don't give options to the class, it will use the default ones
console.log(amt.value)
```

#### From the DOM object

You just need to give the identifier or a class to get the value.

```javascript
console.log(Askmethat.AskmethatRating.value("#amtRating")); 
```

## Contributors

Anyone who want to contribute to the plugin according to MIT License.
