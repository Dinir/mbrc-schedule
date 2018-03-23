"use strict";

/**
 * returns a callback for 'wheel' event
 * which scroll the elements under given container horizontally
 * to reach a start point of one of elements given
 *
 * @param {HTMLElement} container element to accept scroll events
 * @param {HTMLCollection} elements collection of elements that will work as scroll snap points
 * @param {number} startPosition if specified the callback will work with this number as the default position
 *
 * @return {callback}
 */
var horizontalScrollToElements = function horizontalScrollToElements(container, elements) {
  var startPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var currentElement = startPosition;
  var maxElementNumber = elements.length - 1;

  container.scrollLeft = elements[currentElement].offsetLeft;

  return function (e) {
    e.preventDefault();
    var scrollLeftMax = container.scrollLeftMax || container.scrollWidth - container.clientWidth;
    if (e.deltaY > 0) {
      if (container.scrollLeft < scrollLeftMax) currentElement = Math.min(maxElementNumber, currentElement + 1);
    } else {
      do {
        currentElement = Math.max(0, currentElement - 1);
      } while (elements[currentElement].offsetLeft > scrollLeftMax);
    }
    container.scrollLeft = elements[currentElement].offsetLeft;
  };
};
//# sourceMappingURL=horizontalScrollToElements.js.map