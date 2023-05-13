---
title: Panels
---

# {{ $frontmatter.title }}

## Basic panels

<PreviewAndCopyCode>

```html
<div class="a-panel a-panel-primary">
	<div class="a-panel-header">Titre du panneau</div>
	<div class="a-panel-content">Lorem ipsum sic dolor amet...</div>
</div>
```

```html
<div class="a-panel a-panel-secondary">
	<div class="a-panel-header">Titre du panneau</div>
	<div class="a-panel-content">Lorem ipsum sic dolor amet...</div>
</div>
```

```html
<div class="a-panel a-panel-success">
	<div class="a-panel-header">Titre du panneau</div>
	<div class="a-panel-content">Lorem ipsum sic dolor amet...</div>
</div>
```

```html
<div class="a-panel a-panel-danger">
	<div class="a-panel-header">Titre du panneau</div>
	<div class="a-panel-content">Lorem ipsum sic dolor amet...</div>
</div>
```

</PreviewAndCopyCode>

## Panels with footer

<PreviewAndCopyCode>

```html
<div class="a-panel a-panel-warning">
	<div class="a-panel-header">Titre du panneau</div>
	<div class="a-panel-content">Lorem ipsum sic dolor amet...</div>
  <div class="a-panel-footer"><em>Footer</em> du panneau</div>
</div>
```

</PreviewAndCopyCode>


## Collapsable panels

<PreviewAndCopyCode>

```html
<div class="a-panel a-panel-primary a-panel-collapsable">
	<div class="a-panel-header a-collapse-trigger">Titre du panneau</div>
	<div class="a-panel-content">Lorem ipsum sic dolor amet...</div>
</div>
```

```html
<div class="a-panel a-panel-secondary a-panel-collapsable">
	<div class="a-panel-header a-collapse-trigger">
		Panneau replié par défaut
	</div>
	<div class="a-panel-content a-collapsed">
		Et me voilà, je suis le contenu !
	</div>
</div>
```

</PreviewAndCopyCode>

If you want to collapse a custom part of the panel,
you can define `a-collapse-target-id` on the `.a-collapse-trigger` element.

<PreviewAndCopyCode>

```html
<div class="a-panel a-panel-success a-panel-collapsable">
	<div class="a-panel-header a-collapse-trigger" a-collapse-target-id="target">
		Titre du panneau
	</div>
	<div class="a-panel-content">
		Si vous voulez replier une partie personnalisé du panneau,
		vous pouvez définir la propriété <code>a-collapse-target-id="targetId"</code>
		sur l'élément <code>.a-collapse-trigger</code>.
	</div>
	<div class="a-panel-content" id="target">
		Et voici le contenu à replier.
	</div>
</div>
```

</PreviewAndCopyCode>
