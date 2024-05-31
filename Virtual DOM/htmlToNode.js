// Function to convert HTML elements to virtual DOM
export function htmlToVDom(node) {
  if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'SCRIPT') {
    const { tagName, id, className } = node;
    const props = { id, className };
    const children = Array.from(node.childNodes)
      .map(htmlToVDom)
      .filter((child) => child !== null);
    return createElement(tagName.toLowerCase(), props, ...children);
  } else if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent.trim() !== '' ? node.textContent : null;
  } else {
    return null;
  }
}

// Function to create virtual DOM element
function createElement(type, props, ...children) {
  return { type, props, children };
}

// Function to fetch HTML content asynchronously
export async function fetchHTMLContent() {
  try {
    const response = await fetch('../app.html');
    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const vdom = htmlToVDom(doc.body);
    return vdom;
  } catch (error) {
    console.error('Error fetching or parsing HTML:', error);
  }
}
