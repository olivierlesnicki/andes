var andes = require('../');
var assert = require('assert');

describe('andes', function () {

  it ('should handle empty html', function () {
    var html = andes('');
    assert.equal(html, '');
  });

  it ('should generate elements to wrap heading tags', function () {
    var tag = 'h' + Math.round((Math.random() * 4) +  1);
    var html = andes('<' + tag + ' />');
    assert.equal(
      html,
      "<article class='article-" + tag + "'><section class='container-" + tag + "'><" + tag + "></" + tag + "><div class='content-" + tag + "'></div></section></article>"
    );
  });

  it ('should turn images placed straight after headings as background-images', function () {
    var html = andes('<h1 /><img src="/image.png"/>');
    assert.equal(
      html,
      "<article class='article-h1i'><section class='container-h1'><h1></h1><div class='img' style='background-image: url(/image.png)'></div><div class='content-h1'></div></section></article>"
    );
  });

});
