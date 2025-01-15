import { TypewriteRec } from "./lib.js";

const typeLabelCharDelay = 75;
document.addEventListener('DOMContentLoaded', (event) => {
  var labels = ["Creating Games", "Creating Experiences"];

  function ChangeLabel(i) {
    if (i >= labels.length) {
      i = 0;
    }

    TypewriteRec('typewrite-label', labels[i], 0, typeLabelCharDelay, true, () => ChangeLabel(i+1));
  }

  ChangeLabel(0);
});