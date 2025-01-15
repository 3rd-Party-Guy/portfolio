import { FetchJSON, TypewriteRec } from "./lib.js";

const background = document.getElementById('story-image-background');
const image = document.getElementById('story-image');

const previousButton = document.getElementById('story-back');
const nextButton = document.getElementById('story-next');

let currentStory;
let storyIndex = 0;

let paragraphTypeProcess;

function ChangeStory(story) {
  currentStory = story;
  storyIndex = 0;

  UpdateState();
}

function UpdateState() {
  UpdateStory();
  UpdateUI();
}

function UpdateStory() {
  const part = currentStory.Parts[storyIndex];
  
  background.src = part.Picture;
  image.src = part.Picture;

  if (paragraphTypeProcess) {
    paragraphTypeProcess.Stop();
  }
  paragraphTypeProcess = TypewriteRec('#story-paragraph', part.Paragraph, 0, 5, false, null);
}

function UpdateUI() {
  previousButton.classList.remove('hide');
  nextButton.classList.remove('hide');

  if (storyIndex === 0) {
    previousButton.classList.add('hide');
  }

  if (storyIndex === currentStory.Parts.length - 1) {
    nextButton.classList.add('hide');
  }
}

previousButton.addEventListener('click', () => {
  storyIndex--;
  UpdateState();
});

nextButton.addEventListener('click', () => {
  storyIndex++;
  UpdateState();
});

FetchJSON('../stories.json')
  .then((data) => {
    const elemStoryLookup = {
      'select-story-1': data.GlobalFarmer,
      'select-story-2': data.ElementFighterZ,
      'select-story-3': data.OSMLoader,
      'select-story-4': data.TraderAI,
    };

    Object.entries(elemStoryLookup).forEach(([id, story]) => {
      document.getElementById(id).addEventListener('click', () => {
        if (currentStory === story) {
          return;
        }

        ChangeStory(story);
      });
    });

    ChangeStory(data.GlobalFarmer);
  })
  .catch((err) => {
    console.error(`Error fetching stories: ${err}`);
  });