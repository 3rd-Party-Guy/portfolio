const audio = new (window.AudioContext || window.webkitAudioContext)();

export async function FetchJSON(name) {
  return fetch(name)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Could not fetch JSON ${name}`);
      }

      return res.json();
    })
}

export function TypewriteRec(query, text, i, delay, shouldAddCaret, callback, callbackDelay = 1500, shouldPlayTick = false) {
  let timer;
  const process = {
    Stop: () => clearTimeout(timer)
  };

  function type(query, text, i, delay, shouldAddCaret) {
    if (i < text.length) {
      let append = text.substring(0, i + 1);
      if (shouldAddCaret) {
        append += '<span aria-hidden="true"></span>';
      }
      if (shouldPlayTick) {
        PlayTick();
      }

      document.querySelector(query).innerHTML = append;
      timer = setTimeout(() => type(query, text, i + 1, delay, shouldAddCaret), delay);
    } else {
      setTimeout(() => {
        callback && callback();
      }, callbackDelay);
    }
  }

  type(query, text, i, delay, shouldAddCaret);
  return process;
}