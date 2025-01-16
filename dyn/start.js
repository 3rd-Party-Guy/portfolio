import { TypewriteRec, UntypeRec } from "./lib.js";

const typeLabelCharDelay = 75;
const deleteLabelCharDelay = 45;
const appends = ["Games", "Experiences"];

let appendIndex = 0;
let shouldAppend = true;

let currentAppend = appends[appendIndex];
let currentLabel = `Creating ${currentAppend}`;

function UpdateState() {
  appendIndex = (appendIndex + 1) % appends.length;

  currentAppend = appends[appendIndex];
  currentLabel = `Creating ${currentAppend}`;
}

function ChangeLabel() {
  shouldAppend = !shouldAppend;

  if (shouldAppend) {
    TypewriteRec('typewrite-label', currentLabel, 'Creating '.length - 1, typeLabelCharDelay, true, () => {
        ChangeLabel();
      }
    );
  } else {
    UntypeRec('typewrite-label', currentAppend.length, deleteLabelCharDelay, true, () => {
        UpdateState();
        ChangeLabel();
      }
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  shouldAppend = false;
  ChangeLabel();
});
