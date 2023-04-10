export class Section {
    constructor(renderer, selector) {
        this._renderer = renderer;
        this._container = selector;
    }
    
    setItemAppend(element) {
        this._container.append(element);
    }
    
    setItemPrepend(element) {
        this._container.prepend(element);
    }
    
    renderItems(items) {
        items.forEach(item => {
          this._renderer(item);
        });
    }    
}