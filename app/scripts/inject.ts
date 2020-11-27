import {
  buttonsNameType,
  buttonType,
  createButton,
  expandButtonOptions,
  getButtonElements,
  switchState,
  switchSubtaskExpand
} from "./helpers/dom";

const egg = [
  "А ты милашка :) ♡ ♥",
  "Ну честно, милаха)",
  "Не веришь?",
  "А мне все равно, ты все равно милашка :)",
];

function injectExpanders() {
  let section = getButtonElements("SortableItem");
  section = section.filter(
    (element) =>
      element.getElementsByClassName("DropTargetTaskGroupHeader").length !== 0
  );
  section.forEach((element) => {
    const target = element.getElementsByClassName(
      "PotColumnName-nameButton"
    )[0];

    const hasButton = element.getElementsByClassName("customExpandButton")[0];
    if (hasButton) {
      return null;
    }

    const handleClick = (
      element,
      options: buttonsNameType,
      state: switchState,
      switchState,
      iconSrc: { opened: string, closed: string }
    ) => {
      let currentState = state;
      return (event) => {
        switchSubtaskExpand(
          element,
          options,
          currentState,
          20,
          currentState === switchState.open ? 1000 : 0
        );
        // event.target.textContent =
        //   currentState === switchState.open ? "Закрыть задачи" : "Раскрыть задачи";
        if (currentState === switchState.open) {
          currentState = switchState.close;
          event.target.style.backgroundImage = iconSrc.closed;
        } else {
          currentState = switchState.open;
          event.target.style.backgroundImage = iconSrc.opened;
        }
      };
    };

    const button = createButton(
      handleClick(
        element,
        expandButtonOptions[buttonType.subtask],
        switchState.open,
        switchState,
        {
          opened: `url(${chrome.extension.getURL('images/expand.png')})`,
          closed: `url(${chrome.extension.getURL('images/collapse.png')})`
        },
      ),
      {
        name: "",
        style: {
          width: '16px',
          height: "16px",
          minWidth: '16px',
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundImage: `url(${chrome.extension.getURL('images/expand.png')})`
        }
      }
    );

    target.parentNode.insertBefore(button, target.nextSibling);
  });
}

function collapseSection() {
  switchSubtaskExpand(
    document.body,
    expandButtonOptions[buttonType.section],
    switchState.close,
    20,
    0
  );
}

function injectButtons() {
  const element = document.getElementsByClassName(
    "PageToolbarStructure-leftChildren"
  )[0];

  const collapseWithEgg = () => {
    let index = 0;
    return () => {
      if (index >= 2) {
        if (egg[index - 2]) {
          confirm(egg[index - 2]);
        }
      }
      collapseSection();
      index++;
    };
  };

  const hasHideSectionElement = element.getElementsByClassName('proscom-hideSections')[0];
  if (!hasHideSectionElement) {
    element.appendChild(
      createButton(
        collapseWithEgg(),
        {
          className: 'proscom-hideSections',
          name: "Свернуть секции",
          style: {
            border: "1px solid #9ca6af",
            padding: "4px",
            borderRadius: "4px"
          }
        },
      ));
  }
  injectExpanders();
}

injectButtons();
