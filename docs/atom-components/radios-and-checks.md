---
title: Radios & Checks
---

# {{ $frontmatter.title }}

## Atom Radio Buttons

<PreviewAndCopyCode>

```html
<div class="a-docs-example-line">
  <label>
    <input name="language-web" type="radio" class="a-check" value="css" checked>
    <span class="a-btn a-primary" role="button">CSS</span>
  </label>
  <label>
    <input name="language-web" type="radio" class="a-check" value="html">
    <span class="a-btn a-secondary" role="button">HTML</span>
  </label>
  <label>
    <input name="language-web" type="radio" class="a-check" value="php">
    <span class="a-btn a-light" role="button">PHP</span>
  </label>
</div>
<div class="a-docs-example-line">
  <label>
    <input name="language-other" type="radio" class="a-check" value="c++" checked>
    <span class="a-btn" role="button">C++</span>
  </label>
  <label>
    <input name="language-other" type="radio" class="a-check" value="go">
    <span class="a-btn" role="button">GO</span>
  </label>
  <label>
    <input name="language-other" type="radio" class="a-check" value="python">
    <span class="a-btn" role="button">Python</span>
  </label>
  <label>
    <input name="language-other" type="radio" class="a-check" value="c">
    <span class="a-btn" role="button">C</span>
  </label>
  <label>
    <input name="language-other" type="radio" class="a-check" value="swift">
    <span class="a-btn" role="button">Swift</span>
  </label>
</div>
```

</PreviewAndCopyCode>


## Atom Checkboxes

<PreviewAndCopyCode>

```html
<div class="a-docs-example-line">
	<label>
		<input name="language[]" type="checkbox" class="a-check" value="css" checked>
		<span class="a-btn a-primary" role="button">CSS</span>
	</label>
	<label>
		<input name="language[]" type="checkbox" class="a-check" value="html" checked>
		<span class="a-btn a-secondary" role="button">HTML</span>
	</label>
	<label>
		<input name="language[]" type="checkbox" class="a-check" value="php" checked>
		<span class="a-btn a-light" role="button">PHP</span>
	</label>
	<label>
		<input name="language[]" type="checkbox" class="a-check" value="c++">
		<span class="a-btn a-success" role="button">C++</span>
	</label>
	<label>
		<input name="language[]" type="checkbox" class="a-check" value="go">
		<span class="a-btn a-info" role="button">GO</span>
	</label>
	<label>
		<input name="language[]" type="checkbox" class="a-check" value="python">
		<span class="a-btn" role="button">Python</span>
	</label>
	<label>
		<input name="language[]" type="checkbox" class="a-check" value="c">
		<span class="a-btn" role="button">C</span>
	</label>
	<label>
		<input name="language[]" type="checkbox" class="a-check" value="switft">
		<span class="a-btn" role="button">Swift</span>
	</label>
</div>
```

</PreviewAndCopyCode>


## Radio buttons group

<PreviewAndCopyCode>

```html
<div class="a-docs-example-line">
  <div class="a-btn-group">
    <label>
      <input name="favorite-language" type="radio" class="a-check a-check-iconless" value="css" checked>
      <span class="a-btn a-primary" role="button">CSS</span>
    </label>
    <label>
      <input name="favorite-language" type="radio" class="a-check a-check-iconless" value="html">
      <span class="a-btn a-primary" role="button">HTML</span>
    </label>
    <label>
      <input name="favorite-language" type="radio" class="a-check a-check-iconless" value="php">
      <span class="a-btn a-primary" role="button">PHP</span>
    </label>
  </div>

  <div class="a-btn-group">
    <label>
      <input name="yesorno" type="radio" class="a-check a-check-iconless" value="on" checked>
      <span class="a-btn a-success" role="button"><i class="far fa-eye"></i></span>
    </label>
    <label>
      <input name="yesorno" type="radio" class="a-check a-check-iconless" value="off">
      <span class="a-btn a-danger" role="button"><i class="far fa-eye-slash"></i></span>
    </label>
  </div>
</div>
```

</PreviewAndCopyCode>
