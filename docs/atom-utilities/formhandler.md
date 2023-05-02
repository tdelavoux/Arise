---
title: FormHandler
---

# {{ $frontmatter.title }}

You can use Atom Form Handler to add client-side controls in your forms. It may use a-input to display errors on fields or AtomNotification for global notifications. 

## Basic Usage

AtomFormHandler use classes to identify inputs to coltrol and the type expected (a-verify-XXXX) and the element able to trigger submit (a-form-handler).

<PreviewAndCopyCode>

```html
<form id="basicFormHandler" action="#" class="a-fantom-card p-2" novalidate>

	<h4 class="center">Atom Form</h4>
	<div class="a-input-group">
		<input class="a-input a-verify-text" placeholder="Michel Del Pêche"/>
		<label>Text</label>
	</div>

	<div class="a-input-group">
		<input class="a-input a-verify-email" placeholder="someone@atom.fr" />
		<label>Email</label>
	</div>

	<div class="a-input-group">
		<select class="a-input a-verify-select" required>
			<option value disabled selected>Pick a country</option>
			<option value="1">France</option>
			<option value="2">Korea</option>
		</select>
		<label><i class="fas fa-map-marker-alt"></i>Simple select</label>
	</div>

	<div class="flex jc-fe mt-1">
		<button type="submit" class="a-btn a-full-primary a-form-handler">Send</button>
	</div>

</form>

```

```html
<script>

    // Manually initialize buttons listeners. 
    //Use it only of elements are not rady after Dom Loading or ajax insertion
    AtomFormHandler.setupListeners(document.getElementById("basicFormHandler"));

</script>
```

</PreviewAndCopyCode>

## Advanced usage

<PreviewAndCopyCode>

```html
<form id="advancedFormHandler" action="#" class="a-fantom-card p-2" 
    novalidate 
    a-notify-all 
    a-input-notify-none 
    a-data-function='alert("Callback Action used instead form submission")'>

	<h4 class="center">Atom Form</h4>
	<div class="a-input-group a-count-area">
        <textarea class="a-input a-verify-textarea-with-count" 
                    a-name="Comment" 
                    name="paragraph" 
                    id="paragraph">
        </textarea>
        <label for="paragraph">Comment</label>
    </div>

	<div class="a-input-group">
        <input class="a-input a-verify-date" a-name="Custom Date Field Name" a-date-format="Y-m-d">
        <label>Date</label>
    </div>

    <div class="a-input-group">
        <input class="a-input a-verify-phone" a-name="Phone Number">
        <label>Phone</label>
    </div>

    <div class="a-input-group">
        <input class="a-input a-verify-int" a-name="Integer" a-min="5" a-max="8" >
        <label>Number (Integer)</label>
    </div>

    <div class="a-input-group">
        <input class="a-input a-verify-float" a-name="Float">
        <label>Number (Float)</label>
    </div>

	<div class="flex jc-fe mt-1">
		<button type="submit" class="a-btn a-full-primary a-form-handler">Send</button>
	</div>

</form>
```

```html
<script>
    AtomComponents.installCountAreaListeners(document.getElementById('paragraph'));
    AtomComponents.installCountAreaAutoResizeListener(document.getElementById('paragraph'));

    AtomFormHandler.setupListeners(document.getElementById("advancedFormHandler"));
</script>
```

</PreviewAndCopyCode>


## Setup Handler

Atom FormHandler use `a-form-handler` as a triger detection and apply his listeners on his closest `form` elements.

```html
<!--
* List of attributes and property you might apply on form :
* @use    optional    a-data-function       Define JS function to launch if button is not a submit. Function will be executed if not error is triggered
* @use    optional    a-check-invisible     Define to also check visible elements
* @use    optional    a-notify-none         Define to disable global noticiations.
* @use    optional    a-notify-all          Define to Notify all global errors. By default, one generic error message is triggered
* @use    optional    a-disable-color       Define to disable red color input with errors
* @use    optional    a-input-notify-none   Define to disable inputs error messages 
* @use    optional    a-data-opt-bloc       Add custom JS control function. Return true to block submit, false otherwise
-->
<form>
	<div class="flex jc-fe mt-1">
        <!-- Identify trigger with specific class a-form-handler -->
		<button type="submit" class="a-btn a-full-primary a-form-handler">Send</button>
	</div>
</form>
```

## Fields Verification

To include a verification of a fields you have to tag it with `a-verify-XXXXX` class where XXXX is the type excpected. 

Each type might have specific parameters to precise the content : 

### Text

```css
/**
* a-alternate-verif: Additionnal custom function to verify content. Return true to block, false otherwise
* a-min-length     : Minimal text length
* a-max-length     : Maximal text length
* a-error-message  : Error message to display raised by custom a-alternate-verif
* a-name           : Name used to identify in error notification displayed
* a-nullable       : The field might be null. Keep others control when value is provided
* a-disable-message: Disable error message notification for this input
*/
.a-verify-text
```

### Select

```css
/**
* a-alternate-verif: Additionnal custom function to verify content. Return true to block, false otherwise
* a-error-message  : Error message to display raised by custom a-alternate-verif
* a-verif          : Value lancant une erreur. par défaut aucune value
* a-name           : Name used to identify in error notification displayed
* a-nullable       : The field might be null. Keep others control when value is provided
* a-disable-message: Disable error message notification for this input
*/
.a-verify-select
```

### Textarea

```css
/**
* a-alternate-verif: Additionnal custom function to verify content. Return true to block, false otherwise
* a-min-length     : Minimal text length
* a-max-length     : Maximal text length
* a-error-message  : Error message to display raised by custom a-alternate-verif
* a-name           : Name used to identify in error notification displayed
* a-nullable       : The field might be null. Keep others control when value is provided
* a-disable-message: Disable error message notification for this input
*/
.a-verify-textarea-with-count
```


### Dates

```css
/**
* a-alternate-verif: Additionnal custom function to verify content. Return true to block, false otherwise
* a-date-format    : Accepted date format (accept d, m, y, Y, /, -)
* a-error-message  : Error message to display raised by custom a-alternate-verif
* a-name           : Name used to identify in error notification displayed
* a-nullable       : The field might be null. Keep others control when value is provided
* a-disable-message: Disable error message notification for this input
*/
.a-verify-date
```

### Phone Number

```css
/**
* a-alternate-verif: Additionnal custom function to verify content. Return true to block, false otherwise
* a-phone-format   : Accepted format. Default XX.XX.XX.XX.XX. 'accept X . - / +
* a-error-message  : Error message to display raised by custom a-alternate-verif
* a-name           : Name used to identify in error notification displayed
* a-nullable       : The field might be null. Keep others control when value is provided
* a-disable-message: Disable error message notification for this input
*/
.a-verify-phone
```

### Email

```css
/**
* a-alternate-verif: Additionnal custom function to verify content. Return true to block, false otherwise
* a-error-message  : Error message to display raised by custom a-alternate-verif
* a-name           : Name used to identify in error notification displayed
* a-nullable       : The field might be null. Keep others control when value is provided
* a-disable-message: Disable error message notification for this input
*/
.a-verify-email
```

### Integer

```css
/**
* a-alternate-verif: Additionnal custom function to verify content. Return true to block, false otherwise
* a-error-message  : Error message to display raised by custom a-alternate-verif
* a-name           : Name used to identify in error notification displayed
* a-nullable       : The field might be null. Keep others control when value is provided
* a-disable-message: Disable error message notification for this input
* a-min            : Min value accepted. Default 0
* a-max			   : Max value accepted. Default 2147483647
*/
.a-verify-int
```


### Float

```css
/**
* a-alternate-verif : Additionnal custom function to verify content. Return true to block, false otherwise
* a-error-message   : Error message to display raised by custom a-alternate-verif
* a-name            : Name used to identify in error notification displayed
* a-nullable        : The field might be null. Keep others control when value is provided
* a-disable-message : Disable error message notification for this input
* a-min             : Min value accepted. Default 0
* a-max			    : Max value accepted. Default 2147483647
*/
.a-verify-float
```

### Checkbox

```css
/**
* a-alternate-verif: Additionnal custom function to verify content. Return true to block, false otherwise
* a-error-message  : Error message to display raised by custom a-alternate-verif
* a-nullable       : The field might be null. Keep others control when value is provided
* a-name           : Name used to identify in error notification displayed
* a-disable-message: Disable error message notification for this input
*/
.a-verify-checked
```

### Multiple Checkbox and Radio

```css
/**
* a-alternate-verif : Additionnal custom function to verify content. Return true to block, false otherwise
* a-error-message   : Error message to display raised by custom a-alternate-verif
* a-name            : Name used to identify in error notification displayed
a-shared-name       : Shared name use to identify the group
* a-disable-message : Disable error message notification for this input
*/
.a-verify-one-in-list, .a-verify-radio
```

### Files

```css
/**
* a-alternate-verif: Additionnal custom function to verify content. Return true to block, false otherwise
* a-error-message  : Error message to display raised by custom a-alternate-verif
* a-name           : Name used to identify in error notification displayed
* a-disable-message: Disable error message notification for this input
*/
.a-verify-file
```