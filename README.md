# Visualize the Hough Transform process

## Description

The Hough transform is a simple algorithm commonly used in computer vision to
detect lines. This is an implementation in JS using the vector graphics library PaperJS.

## Features
- Draw lines on the left and see the corresponding Hough space on the right
- Put your cursor in Hough space to see how it relates to what you've drawn (hover over the bright spots to see the lines detected)

## Todo
- Ability to clear the canvas without refreshing the screen
- Fix screen resize to work in narrow windows
- Address performance issues when too many paths have been drawn
- Better colour scheme
- Ability to select the paths in Hough space and remove/highlight corresponding paths in the canvas

Inspired by [this video](https://www.youtube.com/watch?v=ebfi7qOFLuo) and [gmarty/hough-transform-js](https://github.com/gmarty/hough-transform-js)

## License

The MIT License (MIT)

Copyright (c) 2016 Steven Huang

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
