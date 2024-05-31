export function render(vdom, container) {
  const reconciler = new Reconciler();
  reconciler.diff(container, vdom);
}

export function createElement(type, props, ...children) {
  return { type, props, children };
}

function batchedUpdates(callback) {
  requestAnimationFrame(callback);
}

function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    return cache[key] || (cache[key] = fn(...args));
  };
}

class Reconciler {
  constructor() {
    this.batchUpdateQueue = [];
    this.createElementFromVdomMemoized = memoize(
      this.createElementFromVdom.bind(this)
    );
  }

  diff(container, newVdom) {
    if (!container._vdom) {
      container._vdom = newVdom;
      this.mount(newVdom, container);
    } else {
      this.batchUpdateQueue.push(() => {
        this.internalDiff(container, container._vdom, newVdom);
        container._vdom = newVdom;
      });
      this.flushBatchedUpdates();
    }
  }

  internalDiff(parentNode, oldVdom, newVdom) {
    if (oldVdom.type !== newVdom.type || typeof oldVdom !== typeof newVdom) {
      const newElement = this.createElementFromVdom(newVdom);
      console.log('Added:', newElement);
      parentNode.replaceChild(newElement, parentNode.firstChild);
    } else if (typeof newVdom === 'string' && oldVdom !== newVdom) {
      parentNode.firstChild.textContent = newVdom;
    } else {
      this.updateAttributes(parentNode, oldVdom.props, newVdom.props);

      const oldChildren = oldVdom.children || [];
      const newChildren = newVdom.children || [];

      const keyedMap = new Map();
      newChildren.forEach((child, index) => {
        const key = child.props && child.props.key;
        if (key !== undefined) keyedMap.set(key, { vdom: child, index });
      });

      let lastIndex = 0;
      oldChildren.forEach((oldChild, index) => {
        const oldKey = oldChild.props && oldChild.props.key;
        if (oldKey !== undefined) {
          const entry = keyedMap.get(oldKey);
          if (entry !== undefined) {
            const { vdom, index: newIndex } = entry;
            this.internalDiff(parentNode.childNodes[index], oldChild, vdom);
            lastIndex = Math.max(lastIndex, newIndex);
            keyedMap.delete(oldKey);
            return;
          }
        }
        parentNode.removeChild(parentNode.childNodes[index]);
      });

      const fragment = document.createDocumentFragment();
      keyedMap.forEach(({ vdom }) => {
        fragment.appendChild(this.createElementFromVdomMemoized(vdom));
      });
      parentNode.appendChild(fragment);

      while (parentNode.childNodes.length > lastIndex + 1) {
        console.log('Removed:', removedNode);
        parentNode.removeChild(parentNode.lastChild);
      }
    }
  }

  updateAttributes(element, oldProps, newProps) {
    for (const key in newProps) {
      if (oldProps[key] !== newProps[key]) {
        if (key === 'className') {
          element.className = newProps[key];
        } else if (key === 'style') {
          element.style.cssText = newProps[key];
        } else {
          element.setAttribute(key, newProps[key]);
        }
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        if (key === 'className') {
          element.className = '';
        } else if (key === 'style') {
          element.style.cssText = '';
        } else {
          element.removeAttribute(key);
        }
      }
    }
  }

  createElementFromVdom(vdom) {
    if (typeof vdom === 'string') {
      return document.createTextNode(vdom);
    }
    const el = document.createElement(vdom.type);
    this.updateAttributes(el, {}, vdom.props);
    vdom.children.forEach((child) =>
      el.appendChild(this.createElementFromVdomMemoized(child))
    );
    return el;
  }

  mount(vdom, container, beforeChild = null) {
    const el = this.createElementFromVdomMemoized(vdom);
    if (beforeChild !== null) container.insertBefore(el, beforeChild);
    else container.appendChild(el);
  }

  flushBatchedUpdates() {
    batchedUpdates(() => {
      while (this.batchUpdateQueue.length > 0) {
        const updateFn = this.batchUpdateQueue.shift();
        updateFn();
      }
    });
  }
}
