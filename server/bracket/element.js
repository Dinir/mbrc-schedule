class Element {
  constructor(tag, className, content) {
    const el = document.createElement(tag);
    el.className = className? className: '';
    el.innerHTML = content? content: '';

    this._el = el;
  }

  append(childs, propertyNames) {
    if(
      !childs.length ||
      (
        propertyNames &&
        typeof propertyNames !== 'string' &&
        childs.length !== propertyNames.length
      )
    )
      return this;

    if(childs.length === 1) {
      this._el.appendChild(childs[0]._el);
      if(propertyNames) {
        if(typeof propertyNames === 'string') {
          const propertyName = propertyNames;
          if(!this[propertyName]) this[propertyName] = [];
          this[propertyName].push(childs[0]);
        } else {
          const propertyName = propertyNames[0];
          this[propertyName] = childs[0];
        }
      } else {
        const propertyName = childs[0]._el.className;
        this[propertyName] = childs[0];
      }
    } else {
      if(propertyNames) {
        if(typeof propertyNames === 'string') {
          const propertyName = propertyNames;
          if(!this[propertyName])
            this[propertyName] = [];
          while(childs.length) {
            this._el.appendChild(childs[0]._el);
            this[propertyName].push(childs.shift());
          }
        } else {
          while(childs.length) {
            this._el.appendChild(childs[0]._el);
            this[propertyNames.shift()] = childs.shift();
          }
        }
      } else {
        while(childs.length) {
          this._el.appendChild(childs[0]._el);
          this[childs[0]._el.className] = childs.shift();
        }
      }
    }
    return this;
  }
}

module.exports = {Element};
