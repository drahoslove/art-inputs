# art-inputs
components allowing inserting piano notes (and more in future) as text into textarea

example: https://drahoslove.github.io/art-inputs/example.html


```
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
