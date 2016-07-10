# andes [![Build Status](https://travis-ci.org/olivierlesnicki/andes.svg?branch=master)](https://travis-ci.org/olivierlesnicki/andes)

Shallow nested HTML documents often limit styling options. **andes** unflatten HTML documents and generate the minimum amount of wrapper elements to enable infinite styling options.

```
npm install --save andes
```

### Usage

```js
const andes = require('andes');
const html = '<h1>Heading</h1><p>Lorem ipsum dolore</p>';
andes(html);
```

### Example

**andes** will turn this document

```html
<h1>First heading 1</h1>
<img src="/image.png" />
<h1>Second heading 1</h1>
<h2>First Heading 2</h2>
<p>Lorem ipsum</p>
<h2>Second Heading 2</h2>
<p>Lorem ipsum</p>
```

Into this one

```html
<article class='article-h1i'>
  <section class='container-h1'>
    <h1>First heading 1</h1>
    <div class='img' style='background-image: url(/image.png)'></div>
    <div class='content-h1'></div>
  </section>
</article>
<article class='article-h1h2xh2x'>
  <section class='container-h1'>
    <h1>Second heading 1</h1>
    <div class='content-h1'>
      <section class='container-h2'>
        <h2>First Heading 2</h2>
        <div class='content-h2'>
          <p>Lorem ipsum</p>
        </div>
      </section>
      <section class='container-h2'>
        <h2>Second Heading 2</h2>
        <div class='content-h2'>
          <p>Lorem ipsum</p>
        </div>
      </section>
    </div>
  </section>
</article>
```
