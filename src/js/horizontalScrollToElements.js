/**
 * returns a callback for 'wheel' event
 * which scroll the elements under given container horizontally
 * to reach a start point of one of elements given
 *
 * @param {HTMLElement} container element to accept scroll events
 * @param {HTMLCollection} elements collection of elements that will work as scroll snap points
 *
 * @return {callback}
 */
const horizontalScrollToElements = (container, elements) => {
  let currentElement = 0;
  const maxElementNumber = elements.length - 1;

  return e => {
    if(e.deltaY > 0) {
      if(container.scrollLeft < container.scrollLeftMax)
        currentElement = Math.min(maxElementNumber, currentElement + 1);
    } else {
      do {
        currentElement = Math.max(0, currentElement - 1);
      } while(elements[currentElement].offsetLeft > container.scrollLeftMax);
    }
    container.scrollLeft = elements[currentElement].offsetLeft;
  };
};
