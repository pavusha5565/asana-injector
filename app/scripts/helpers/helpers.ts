export const timeoutFunction = (
  index: number,
  button: HTMLElement,
  timeout: number = 1000
) => {
  if (!button) {
    return null;
  }
  setTimeout(() => {
    button.click();
  }, index * timeout);
};

export function filterElement<Element>(
  elements: Element[],
  filteredClassName: string
): Element[] {
  return elements.filter((element) => {
    const children = (element as any).children[0];
    if (!children) {
      return false;
    }
    return [...children.classList].some(
      (classname) => classname === filteredClassName
    );
  });
}

export function applyOptions(object: object, options: { [key: string]: any }) {
  if (!options) {
    return
  }
  const keys = Object.keys(options);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    object[key] = options[key];
  }
}
