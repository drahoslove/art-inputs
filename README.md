# art-inputs
components allowing inserting piano notes (and more in future) as text into textarea

### demo
https://drahoslove.github.io/art-inputs/example.html

### usage
  - link `piano.js` and `piano.css` files to your page
  - call `pianoInput(elementId, onClickCallback)`

### example
```html
<div id="keyboardContainer" class="letters scroll"></div>
<textarea id="textarea" rows="10"></textarea>
<script>
  const textarea = document.getElementById('textarea')
  pianoInput('#keyboardContainer', function(data) {
    console.log('note', data.note, data.midi)
    textarea.value += note + ' '
  })
</script>
```

You may omit the `letters` and `scroll` classes to hide letters and disable scrolling.
