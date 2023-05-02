---
title: Inputs
---

# {{ $frontmatter.title }}

## Basic inputs

<PreviewAndCopyCode>

```html
<div class="a-fantom-card mw-400 pl-2 pr-2">
    <h4 class="center">Atom Form</h4>
    <div class="a-input-group">
        <input class="a-input" placeholder="Michel Del Pêche" />
        <label><i class="far fa-address-card"></i>Text</label>
    </div>

    <div class="a-input-group">
        <span role="button" class="a-input-button"><i class="fas fa-search"></i></span>
        <input class="a-input" placeholder="Michel Del Pêche" />
        <label><i class="far fa-address-card"></i>Search</label>
    </div>

    <div class="a-input-group a-input-load">
        <input class="a-input" placeholder="loading in progress" />
        <label><i class="fab fa-searchengin"></i>Spinner</label>
    </div>

    <div class="a-input-group">
        <select class="a-input" required>
            <option value="" disabled selected>Pick a country</option>
            <option value="1">France</option>
            <option value="2">Korea</option>
        </select>
        <label><i class="fas fa-map-marker-alt"></i>Simple select</label>
    </div>

    <div class="a-input-group">
        <input type="text" class="a-input" placeholder="22 rue de la Raye" readonly />
        <label><i class="fas fa-mobile-alt"></i>Readonly</label>
    </div>

    <div class="a-input-group">
        <input type="text" class="a-input" placeholder="22 rue de la Raye" disabled />
        <label><i class="fas fa-mobile-alt"></i>Disabled</label>
    </div>

    <div class="col-md-4 a-input-group">
        <input class="a-input" placeholder="***" type="password" />
        <label><i class="far fa-credit-card"></i>Password</label>
    </div>

    <div class="flex jc-fe mt-1">
        <button class="a-btn a-link-primary">Cancel</button>
        <button class="a-btn a-full-primary">Send</button>
    </div>
</div>
```

</PreviewAndCopyCode>


## Borderless inputs

<PreviewAndCopyCode>

```html
<div class="a-fantom-card mw-400 pl-2 pr-2">
    <h4 class="center">Atom Form</h4>
    <div class="a-input-group">
        <input class="a-input a-borderless" placeholder="Michel Del Pêche" />
        <label><i class="far fa-address-card"></i>Text</label>
    </div>

    <div class="a-input-group">
        <span role="button" class="a-input-button"><i class="fas fa-search"></i></span>
        <input class="a-input a-borderless" placeholder="Michel Del Pêche" />
        <label><i class="far fa-address-card"></i>Search</label>
    </div>

    <div class="a-input-group a-input-load">
        <input class="a-input a-borderless" placeholder="loading in progress" />
        <label><i class="fab fa-searchengin"></i>Spinner</label>
    </div>

    <div class="a-input-group">
        <select class="a-input a-borderless" required>
            <option value="" disabled selected>Pick a country</option>
            <option value="1">France</option>
            <option value="2">Korea</option>
        </select>
        <label><i class="fas fa-map-marker-alt"></i>Simple select</label>
    </div>

    <div class="a-input-group">
        <input type="text" class="a-input a-borderless" placeholder="22 rue de la Raye" readonly="" />
        <label><i class="fas fa-mobile-alt"></i>Readonly</label>
    </div>

    <div class="a-input-group">
        <input type="text" class="a-input a-borderless" placeholder="22 rue de la Raye" disabled />
        <label><i class="fas fa-mobile-alt"></i>Disabled</label>
    </div>

    <div class="col-md-4 a-input-group">
        <input class="a-input a-borderless" type="password" placeholder="***" />
        <label><i class="far fa-credit-card"></i>Password</label>
    </div>

    <div class="flex jc-fe mt-1">
        <button class="a-btn a-link-primary">Cancel</button>
        <button class="a-btn a-full-primary">Send</button>
    </div>
</div>
```

</PreviewAndCopyCode>


## Material inputs

<PreviewAndCopyCode>

```html
<div class="a-fantom-card mw-400 pl-2 pr-2">
    <h4 class="center">Atom Form</h4>
    <div class="a-input-group">
        <input class="a-input a-material-input" placeholder="Michel Del Pêche" />
        <label><i class="far fa-address-card"></i>Text</label>
    </div>

    <div class="a-input-group">
        <span role="button" class="a-input-button"><i class="fas fa-search"></i></span>
        <input class="a-input a-material-input" placeholder="Michel Del Pêche" />
        <label><i class="far fa-address-card"></i>Search</label>
    </div>

    <div class="a-input-group a-input-load">
        <input class="a-input a-material-input" placeholder="loading in progress" />
        <label><i class="fab fa-searchengin"></i>Spinner</label>
    </div>

    <div class="a-input-group">
        <select class="a-input a-material-input" required>
            <option value="" disabled selected>Pick a country</option>
            <option value="1">France</option>
            <option value="2">Korea</option>
        </select>
        <label><i class="fas fa-map-marker-alt"></i>Simple select</label>
    </div>

    <div class="a-input-group">
        <input type="text" class="a-input a-material-input" placeholder="22 rue de la Raye" readonly />
        <label><i class="fas fa-mobile-alt"></i>Readonly</label>
    </div>

    <div class="a-input-group">
        <input type="text" class="a-input a-material-input" placeholder="22 rue de la Raye" disabled />
        <label><i class="fas fa-mobile-alt"></i>Disabled</label>
    </div>

    <div class="col-md-4 a-input-group">
        <input class="a-input a-material-input" placeholder="***" type="password" />
        <label><i class="far fa-credit-card"></i>Password</label>
    </div>

    <div class="flex jc-fe mt-1">
        <button class="a-btn a-link-primary">Cancel</button>
        <button class="a-btn a-full-primary">Send</button>
    </div>
</div>
```

</PreviewAndCopyCode>

## File inputs

<PreviewAndCopyCode>

```html
<div class="a-fantom-card mw-400 pl-2 pr-2">
    <h4 class="center">Atom Form</h4>
    
    <div class="a-input-group">
        <label class="a-input a-input-label-file">
            <input type="file" name="file" class="a-input-file">
            <i class="fas fa-cloud-upload-alt"></i>
            <span class="js-fileName">Choisissez un fichier</span>
        </label>
        <label><i class="far fa-credit-card"></i>Basic input</label>
    </div>

    <div class="a-input-group">
        <label class="a-input a-borderless a-input-label-file">
            <input type="file" name="file" class="a-input-file">
            <i class="fas fa-cloud-upload-alt"></i>
            <span class="js-fileName">Choisissez un fichier</span>
        </label>
        <label><i class="far fa-credit-card"></i>Borderless input</label>
    </div>
    
    <div class="a-input-group">
        <label class="a-input a-material-input a-input-label-file">
            <input type="file" name="file" class="a-input-file">
            <i class="fas fa-cloud-upload-alt"></i>
            <span class="js-fileName">Choisissez un fichier</span>
        </label>
        <label><i class="far fa-credit-card"></i>Material input</label>
    </div>
    
</div>
    
<script>
    new AtomFile(document.getElementsByClassName('a-input-file'));
</script>
```

</PreviewAndCopyCode>

## Dropzone input

<PreviewAndCopyCode>

```html
<div class="a-file-drop">
    <div class="file-bloc">
        <input class="file-upload" type="file" name="fileUpload">
        <label  class="file-upload-label">
            <div class="file-start">
                <i class="fa fa-upload" aria-hidden="true"></i>
                <div>Déposez l'archive ici ou :</div>
                <span class="btn btn-primary file-upload-btn">Sélectionner un fichier</span>
            </div>
        </label>
    </div>
    <div class="file-bloc-result" style="display: none;">
        <p class="file-recap small-text"></p>
        <button class="a-btn-return"> Annuler </button>
    </div>
</div>
    
<script>
    new AtomFileDrop(document.getElementsByClassName('a-file-drop'));
</script>
```

</PreviewAndCopyCode>
