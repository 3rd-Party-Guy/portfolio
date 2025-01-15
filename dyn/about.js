import { FetchJSON, TypewriteRec } from "./lib.js";

let writingProcess;

FetchJSON('./about-paragraphs.json')
  .then((data) => {
    console.log(`DATA: ${data}`);
    const buttons = {
      'about-story': data.story,
      'about-philosophy': data.philosophy,
      'about-interests': data.interests,
    };

    Object.entries(buttons).forEach(([id, content]) => {
      document.getElementById(id).addEventListener('click', () => {
        if (writingProcess) {
          writingProcess.Stop();
        }

        writingProcess = TypewriteRec('about-paragraph', content, 0, null);
      });
    });
  })
  .catch((err) => {
    console.error(`Could not fetch about paragraphs: ${err}`);
  });