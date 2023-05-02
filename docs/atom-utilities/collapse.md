---
title: Collapse
---

# {{ $frontmatter.title }}

You can use Atom Collapse to hide elements when a button is clicked.

<PreviewAndCopyCode>

```html
<div class="flex-column ai-c">
	<button class="a-btn a-primary a-collapse-trigger" a-collapse-target-id="my-target">
		Cliquez-moi pour faire disparaître l'image
	</button>

	<div id="my-target" class="p-1 a-bg-primary">
		<p>Lorem ipsum</p>
		<div class="a-round-img-xl" style="background-image:url('https://picsum.photos/200')"></div>
	</div>
</div>
```

</PreviewAndCopyCode>

`a-collapse-target-id` is optional: if unset, Atom Collapse will select the sibling following the `.a-collapse-trigger` element.

<PreviewAndCopyCode>

```html
<div class="flex-column ai-c">
	<button class="a-btn a-secondary a-collapse-trigger">
		Ou cliquez-moi pour ouvrir l'élément suivant caché. D'ailleurs, par défaut,
		pas besoin de <code>a-collapse-target-id</code> : je prendrai l'élément qui me suit.
	</button>
	<div class="p-1 a-bg-secondary a-collapsed">
		<p>Lorem ipsum</p>
		<div class="a-round-img-xl" style="background-image:url('https://picsum.photos/200')"></div>
	</div>
</div>
```

</PreviewAndCopyCode>
