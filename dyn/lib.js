const caret = '<span aria-hidden="true"></span>';

export async function FetchJSON(name) {
  return fetch(name)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Could not fetch JSON ${name}`);
      }

      return res.json();
    })
}

export function UntypeRec(query, length, delay, shouldAddCaret, callback, callbackDelay = 500) {
  const element = document.querySelector(query);

  function deleteChars(currentLength) {
    if (currentLength <= 0) {
      setTimeout(() => {
        callback && callback();
      }, callbackDelay);
      return;
    }

    let amountToDelete = -1;
    if (element.innerHTML.endsWith(caret)) {
      amountToDelete -= caret.length;
    }

    element.innerHTML = element.innerHTML.slice(0, amountToDelete);

    if (shouldAddCaret) {
      element.innerHTML += caret;
    }

    setTimeout(() => {
      deleteChars(currentLength - 1);
    }, delay);
  }

  deleteChars(length);
}

export function TypewriteRec(query, text, i, delay, shouldAddCaret, callback, callbackDelay = 1500) {
  console.log(text);
  let timer;
  const process = {
    Stop: () => clearTimeout(timer)
  };

  function type(query, text, i, delay, shouldAddCaret) {
    if (i < text.length) {
      let append = text.substring(0, i+1);
      if (shouldAddCaret) {
        append += caret;
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