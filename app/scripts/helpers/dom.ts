import {applyOptions, filterElement, timeoutFunction} from "./helpers";

export enum buttonType {
  subtask = "subtask",
  section = "section",
}

export interface buttonsNameType {
  classname: string;
  type: buttonType;
  iconType: string;
  openedClass: string;
  closedClass: string;
}

export const expandButtonOptions = {
  [buttonType.subtask]: {
    classname: "ProjectSpreadsheetGridRow-subtaskToggleButton",
    type: buttonType.subtask,
    iconType: "svg",
    openedClass: "DownTriangleIcon",
    closedClass: "RightTriangleIcon",
  },
  [buttonType.section]: {
    classname: "TaskGroupHeader-toggleButton",
    type: buttonType.section,
    iconType: "svg",
    openedClass: "DownTriangleIcon",
    closedClass: "RightTriangleIcon",
  },
};
export const getButtonElements = (
  name: string,
  element: HTMLElement = document.body
) => {
  let index = 0;
  const nodeArray = [];
  element.getElementsByClassName(name)
  for (let subtaskExpandButton of Array.from(element.getElementsByClassName(name))) {
    index = index + 1;
    nodeArray.push(subtaskExpandButton);
  }
  return nodeArray;
};

export enum switchState {
  open = "open",
  close = "close",
}

export function switchSubtaskExpand(
  sourceElement: HTMLElement,
  options: buttonsNameType,
  nextState: switchState,
  limit: number = 20,
  delay: number = 1000
) {
  let buttons = getButtonElements(options.classname, sourceElement);
  if (nextState === switchState.open) {
    // options.closedClass текущий class у button, при состоянии закрыто
    buttons = filterElement<HTMLElement>(buttons, options.closedClass);
  } else if (nextState === switchState.close) {
    // options.openedClass текущий class у button, при состоянии открыто
    buttons = filterElement<HTMLElement>(buttons, options.openedClass);
  }
  if (limit) {
    buttons = buttons.slice(0, limit);
  }
  buttons.forEach((element, index) => {
    timeoutFunction(index, element, delay);
  });
}

interface buttonOptionsType {
  style?: Partial<CSSStyleDeclaration>,
  name?: string,
  className?: string,
}

export function createButton(
  handleClick,
  options: buttonOptionsType = {}
): HTMLElement {
  const {
    style,
    name = 'Развернуть',
    className = 'customExpandButton'
  } = options;
  const button = document.createElement("div");
  button.onclick = handleClick;
  button.textContent = name;
  button.classList.add(className);
  applyOptions(
    button.style,
    {
      marginLeft: '12px',
      cursor: "pointer", ...(style ?? {})
    }
  );
  return button;
}
