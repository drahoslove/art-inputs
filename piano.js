(function (global) {
  const NOTE_NAMES = [] // define all 88 piano notes from A0 to C8
  NOTE_NAMES.push("A0","A#0","B0")
  ;[1,2,3,4,5,6,7].forEach(octave => {
    "CDEFGAB".split('').forEach(letter => {
      NOTE_NAMES.push(`${letter}${octave}`)
      if (letter !== 'E' && letter !== 'B') {
        NOTE_NAMES.push(`${letter}#${octave}`)
      }
    })
  })
  NOTE_NAMES.push('C8')

  // convert note name to midi int value of that note
  const noteNameToMidi = noteName => NOTE_NAMES.indexOf(noteName) + 21

  // crate buttons representing keas and append them to the keyboard
  const craeteKeys = (wrapperEl, notes) => {
    wrapperEl.classList.add('piano-keyboard-container')
    wrapperEl.innerHTML = `
      <div class="piano-keyboard">
        <div class="piano-bottom-keys"></div>
        <div class="piano-top-keys"></div>
      </div>
    `
    const keys = []
    notes.forEach((note, i) => {
      const key = document.createElement('button')
      key.dataset.note = note
      key.innerHTML = note.replace(/([A-G])(#?)(\d)/g, (_, n, s, i) => `<div><span>${n}${s&&'♯'}<sub>${i}</sub></span></div>`)
      wrapperEl.querySelector('.piano-top-keys').appendChild(key)
      const hue = 360*((i-3)/(12*4))
      key.style.setProperty('--hue', hue)
      if (!note.includes('#')) {
        const wideKey = key.cloneNode(true)
        key.style.visibility="hidden"
        wrapperEl.querySelector('.piano-bottom-keys').appendChild(wideKey)
        keys.push(wideKey)
      } else {
        keys.push(key)
      }
    })
    document.querySelector("[data-note='C4']").scrollIntoView({block: 'center', inline: 'center'})
    return keys
  }

  function pianoInput(element, callback, [startNote=0, endNote=87]=[]) {
    if (typeof element === 'string') {
      element = document.querySelector(element)
    }
    const keys = craeteKeys(element, NOTE_NAMES.filter((note, i) => i >= startNote && i <= endNote))
    keys.forEach(key => {
      const { note } = key.dataset
      key.onmousedown = (e) => {
        callback({
          note: note,
          midi: noteNameToMidi(note),
          timestamp: performance.now()
        })
      }
    })
    return keys
  }
  global.pianoInput = pianoInput
})(window)
