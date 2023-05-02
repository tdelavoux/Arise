---
title: Form elements
---

# {{ $frontmatter.title }}

## Textarea with characters count and auto-resize

These textareas come with an auto-resize feature, allowing the content to always been shown, and with a characters count based on the [HTML `maxlength` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-maxlength).

<PreviewAndCopyCode>

```html
<div class="a-input-group a-count-area">
    <textarea class="a-input a-verify-textarea-with-count" name="paragraph" id="paragraph" maxlength="256">Vous savez, moi je ne crois pas qu’il y ait de bonne ou de mauvaise situation. Moi, si je devais résumer ma vie aujourd’hui avec vous, je dirais que c’est d’abord des rencontres…</textarea>
    <label for="paragraph">Quel est votre avis ?</label>
</div>
```

```html
<script>
    // It is already automatically setup by default for all textarea on a page by calling this function
    // AtomComponents.installCountAreaListeners();

    // If you want to setup for one particular textarea
    AtomComponents.installCountAreaListeners(document.getElementById('paragraph'));
    AtomComponents.installCountAreaAutoResizeListener(document.getElementById('paragraph'));
</script>
```

</PreviewAndCopyCode>
