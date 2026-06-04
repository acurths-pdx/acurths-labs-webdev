## Code Review Exercise

Write your code review here in markdown format.

### Issue 1: Missing \<main> Landmark Element

The page has a \<header> and \<footer> but no \<main> element to wrap the primary content. Assistive technologies need this to determine where the main content begins. Currently, all the content \<div>'s are sitting directly inside the \<body>. This is easily fixed by wrapping all the divs that follow the header with a \<body> element.

Initial html:

```html
<body>
  <header>...</header>
  ...
  <!-- numerous <div> elements -->
  ...
  <footer>...</footer>
</body>
```

Updated html:

```html
<body>
  <header>...</header>
  <main>
    ...
    <!-- numerous <div> elements -->
    ...
  </main>
  <footer>...</footer>
</body>
```

### Issue 2: Navbar Buttons

The padding that makes the button visually larger sits on the \<li>, but the \<a> inside it is only as big as its text, so only the text is actually clickable. This can be fixed by moving the padding to the \<a> and adding display: block so it fills the whole \<li> list item

Initial css:

```css
.nav-list-item {
  display: block;
  padding: 10px;
  width: 170px;
  text-align: center;
  border: 2px solid var(--transparent);
}

.nav-link {
  text-decoration: none;
  color: var(--white);
}
```

Updated css:

```css
.nav-list-item {
  display: block;
  width: 170px;
  text-align: center;
  border: 2px solid var(--transparent);
}

.nav-link {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: var(--white);
}
```

### Issue 3: Landing Page Image

The main hero image of the cat is a CSS background instead of an \<img>. This is an accessiblity issue because it's invisible to screen readers and there is no alt text. If the image has meaningful content (which I believe it does in this case), it should be an \<img> element with a descriptive alt attribute.

Initial HTML:

```html
<div class="landing-image"></div>
```

Initial CSS:

```css
.landing-image {
  ...
background-image: url('./images/1920px-Adult*Scottish_Fold.jpg');
background-position: center;
background-size: cover;
}
```

Updated HTML (replace \<div> element with \<img> element):

```html
<img
  class="landing-image"
  src="./images/1920px-Adult_Scottish_Fold.jpg"
  alt="An adult Scottish Fold cat"
/>
```

Updated CSS (remove the background properties):

```css
.landing-image {
  width: 350px;
  height: 350px;
  margin: 45px;
  border-radius: 50%;
  display: block;
  align-self: start;
  object-fit: cover;
}
```

### Issue 4: Form Issue 1/2 - Missing Form Labels

The Name, Username, Email, and Phone Number input fields are missing semantic \<label> elements. The form uses <span class="form-label"> to label each input, but <span> has no semantic connection to a form control. This means clicking the label text does not focus the input, and screen readers won't announce the label when the input is focused. Each <span> should be replaced with <label for="">, where for matches the input's id. Once a proper <label> is in place, the aria-label on each input won't be needed.

Initial html:

```html
<span class="form-label">Name</span>
<input
  aria-label="name"
  class="form-input-box"
  type="text"
  id="name"
  name="name"
/>
...
```

Updated html:

```html
<label class="form-label" for="name">Name</label>
<input class="form-input-box" type="text" id="name" name="name" />
...
```

(this would need to be repeated for username, email, and phone number as well)

### Issue 5: Form Issue 2/2 - \<p> Used as a Wrapper for Form Input

The form input section is wrapped in \<p> elements, but a \<p> element semantically means a paragraph of text content. Using it as a layout container for a form label and an input field is semantically wrong. A \<div> is more appropriate wrapper/container to use in this circumstance.

Initial html:

```html
<p class="label-input-group form-element-container">
  <span class="form-label">Name</span>
  <input
    aria-label="name"
    class="form-input-box"
    type="text"
    id="name"
    name="name"
  />
</p>
```

Updated html:

```html
<div class="label-input-group form-element-container">
  <label class="form-label" for="name">Name</label>
  <input class="form-input-box" type="text" id="name" name="name" />
</div>
```

(the above example also reflects the label change previously made in issue 4)

### Issue 6: Elements Without href Used as Interactive Buttons

The "More Info" buttons and the "Load New Cat Facts" link are \<a> elements with no href attribute. An \<a> without href is not a link, so it has no semantic meaning. Since these elements trigger JavaScript actions rather than navigating to a URL, they should be \<button> elements.

Initial code:

```html
<a class="more-info-button">More Info</a>
...
<a class="more-info-button">More Info</a>
...
<a class="more-info-button">More Info</a>
...
<a class="reload-cat-facts">Load New Cats Facts</a>
```

Updated code:

```html
<button class="more-info-button">More Info</button>
...
<button class="more-info-button">More Info</button>
...
<button class="more-info-button">More Info</button>
...
<button class="reload-cat-facts">Load New Cats Facts</button>
```

### Issue 7: Checkbox Group Uses \<div> Instead of \<fieldset> and \<legend>

The "What breeds would you like to learn?" checkbox group uses a \<div> with a \<p> as its label. Form controls, like checkboxes and radio buttons, should be wrapped in a \<fieldset> with a \<legend> for assistive technologies to determine what each item in the group belongs to. Without this, a screen reader user who tabs into the "Siamese Cat" checkbox only hears that it's a siamese cat checkbox without any additional info about the question they're selecting it for.

Initial html:

```html
<div class="form-fieldset form-element-container">
  <p class="form-label">What breeds would you like to learn?</p>
  <div>
    <input type="checkbox" id="siamese" name="breed1" value="siamese" />
    <label for="siamese">Siamese Cat</label>
  </div>
  ...
</div>
```

Updated html:

```html
<fieldset class="form-fieldset form-element-container">
  <legend class="form-label">What breeds would you like to learn?</legend>
  <div>
    <input type="checkbox" id="siamese" name="breed1" value="siamese" />
    <label for="siamese">Siamese Cat</label>
  </div>
  ...
</fieldset>
```

### Issue 8: Redundant/Overwritten Background-color in .close-popup-button

In styles.css, background-color is set twice on .close-popup-button. The first declaration (var(--white)) is overridden by the second one (transparent), which means the first one has no effect. The first declaration can be removed.

Initial css:

```css
.close-popup-button {
  font-size: 2rem;
  background-color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: transparent;
  border: none;
}
```

Updated css:

```css
.close-popup-button {
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: transparent;
  border: none;
}
```

### Issue 9: Broken Cat Fact Reload / Loading Container Error

In the finally block of fetchCatFacts, loading.setAttribute('class', 'display-none') replaces the element's entire class attribute and removes the class in the process. After an initial run, any reload attempt with querySelector('.loading-container') fails to find the element. On a reload, it returns null, which causes a type error. The old facts are cleared from the page, but new ones are not loaded, leaving this section blank. To fix this, the class would need to be preserved using loading.setAttribute('class', 'loading-container display-none'). Alternatively, an even cleaner fix is to use loading.replaceChildren(), which will clear the spinner image without even touching the class attribute, so querySelector('.loading-container') will be able to find the element and won't throw an error, allowing the cat facts to properly reload.

Initial javascript:

```javascript
loading.setAttribute("class", "display-none");
```

Updated javascript:

```javascript
loading.replaceChildren();
```

(a secondary issue here is that the same facts are loaded each time, but that might be outside the scope of this assignment)
