---
title: Shuffle
---

# {{ $frontmatter.title }}

Atom Shuffle provide a 💪 performant and 🧠 simple item's filter. Used by AtomDatatable, it remains efficient with large data corpus.

## Basic Usage

You can instanciate quickly a shuffler giving it the input used and optionnaly a class (atomShuffleItem by default) used to identify items `new AtomShuffleInstance(htmlElement, classIdentifier)`

<PreviewAndCopyCode>

```html

<div class="a-input-group">
  <span role="button" class="a-input-button"><i class="fas fa-search"></i></span>
  <input id="shuffleInput" class="a-input" placeholder="Forest"/>
  <label><i class="fa-solid fa-location-dot"></i> Search</label>
</div>

<div class="a-docs-example-line">
  <div class="a-fantom-card a-docs-card atomShuffleItem" data-title="Sea" style="background-image:url('https://picsum.photos/id/16/200');">
    <span class="mask"></span>
    <span class="title">Sea</span>
  </div>

  <div class="a-fantom-card a-docs-card atomShuffleItem" data-title="Desert" style="background-image:url('https://picsum.photos/id/46/200');">
    <span class="mask"></span>
    <span class="title">Desert</span>
  </div>

  <div class="a-fantom-card a-docs-card atomShuffleItem" data-title="City" style="background-image:url('https://picsum.photos/id/57/200');">
    <span class="mask"></span>
    <span class="title">City</span>
  </div>

  <div class="a-fantom-card a-docs-card atomShuffleItem" data-title="Forest" style="background-image:url('https://picsum.photos/id/412/200');">
    <span class="mask"></span>
    <span class="title">Forest</span>
  </div>
</div>

```

```html
<script>
    new AtomShuffleInstance(document.getElementById("shuffleInput"), "atomShuffleItem");
</script>
```

</PreviewAndCopyCode>

## Customize and Rules

The `AtomShuffle` component will allow you to define when to trigger a shuffle and the rules using the options as Object `new AtomShuffleInstance(Options)`.

In the example below you may search by matching names and by category

<PreviewAndCopyCode>

```html

<div class="a-docs-example-line">
    <div class="a-input-group">
        <span role="button" class="a-input-button"><i class="fas fa-search"></i></span>
        <input id="shuffleInput2" class="a-input" placeholder="Forest"/>
        <label><i class="fa-solid fa-location-dot"></i> Search</label>
    </div>
    <label>
		<input name="category" type="checkbox" class="a-check" value="outdoor" checked>
		<span class="a-btn" role="button">Outdoor</span>
	</label>
	<label>
		<input name="category" type="checkbox" class="a-check" value="animal" checked>
		<span class="a-btn" role="button">Animal</span>
	</label>
</div>

<div class="a-docs-example-line">
  <div class="a-fantom-card a-docs-card customShuffleIdentifier" data-title="Italy" data-category="outdoor" style="background-image:url('https://picsum.photos/id/16/200');">
    <span class="mask"></span>
    <span class="title">Italy</span>
  </div>

  <div class="a-fantom-card a-docs-card customShuffleIdentifier" data-title="France" data-category="outdoor" style="background-image:url('https://picsum.photos/id/46/200');">
    <span class="mask"></span>
    <span class="title">France</span>
  </div>

  <div class="a-fantom-card a-docs-card customShuffleIdentifier" data-title="Belgium" data-category="outdoor" style="background-image:url('https://picsum.photos/id/57/200');">
    <span class="mask"></span>
    <span class="title">Belgium</span>
  </div>

  <div class="a-fantom-card a-docs-card customShuffleIdentifier" data-title="USA" data-category="outdoor" style="background-image:url('https://picsum.photos/id/412/200');">
    <span class="mask"></span>
    <span class="title">USA</span>
  </div>

  <div class="a-fantom-card a-docs-card customShuffleIdentifier" data-title="Italy" data-category="animal" style="background-image:url('https://picsum.photos/id/718/200');">
    <span class="mask"></span>
    <span class="title">Italy</span>
  </div>

  <div class="a-fantom-card a-docs-card customShuffleIdentifier" data-title="France" data-category="animal" style="background-image:url('https://picsum.photos/id/659/200');">
    <span class="mask"></span>
    <span class="title">France</span>
  </div>

  <div class="a-fantom-card a-docs-card customShuffleIdentifier" data-title="Belgium" data-category="animal" style="background-image:url('https://picsum.photos/id/790/200');">
    <span class="mask"></span>
    <span class="title">Belgium</span>
  </div>

  <div class="a-fantom-card a-docs-card customShuffleIdentifier" data-title="USA" data-category="animal" style="background-image:url('https://picsum.photos/id/783/200');">
    <span class="mask"></span>
    <span class="title">USA</span>
  </div>
</div>
```


```html
<script>

    // Create Shuffler
    const shuffler = new AtomShuffle({
        itemSelector : "customShuffleIdentifier",
        animationTime: 300,
    });

    // Prepare items and listen to it to launch shuffle
    const inputShuffle = document.getElementById("shuffleInput2");
    inputShuffle.addEventListener("keyup", launchShuffle, false);

    const checkboxs = document.querySelectorAll('input[name="category"]');
    [...checkboxs].forEach((el) => { el.addEventListener("change", launchShuffle, false) });

    // shuffle defining specific rules. Return true if element should be visible, false otherwise.
    function launchShuffle(){
        const inputValue = inputShuffle.value.toLowerCase();
        const catValues = [...document.querySelectorAll('input[name="category"]:checked')].map((el) => { return el.value.toLowerCase() });

        shuffler.filter((element) => {
            return (!inputValue || element.dataset.title?.toLowerCase().includes(inputValue)) && catValues.includes(element.dataset.category?.toLowerCase())
        });
    }

</script>
```

</PreviewAndCopyCode>


### Shuffle Options

Options should be passed to AtomShuffle's constructor as Object (see exemple above)

| Name                  | Type              | Description                                                                                              | Default Value             |
| -------------------   | ----------------- | -------------------------------------------------------------------------------------------------------- | ------------------------- |
| itemSelector          | string            | class to identify elements to shuffle                                                                    | atomShuffleItem           |
| animationTime         | integer           | Animation time (both show and hide)                                                                      | true                      |
| visibility            | boolean           | ignore current visibility test of element                                                                | false                     |
