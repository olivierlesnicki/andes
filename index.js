'use strict';

const himalaya = require('himalaya');
const toHTML = require('himalaya/translate').toHTML;
const isNumeric = require("isnumeric");

const HEADING_REGEX = /^h(\d*)$/i;

module.exports = function (html) {

  html = html || '';

  if (!html) {
    return '';
  }

  var oldNodes = himalaya.parse(html);

  var nodes = [{
    level: 0,
    parent: null,
    tagName: 'div',
    type: 'Element',
    children: []
  }];
  var root = nodes[0];
  var parent = root;
  var cursor = -1;

  oldNodes.forEach(originalNode => {
    var level = Number((originalNode.tagName.match(HEADING_REGEX) || [0, 0])[1]);
    if (level) {
        while (parent.parent && parent.level >= level) {
            parent = parent.parent;
        }
        var node = {
            level: level,
            parent: parent,
            tagName: 'section',
            attributes: {
                className: ['container-' + originalNode.tagName]
            },
            type: 'Element',
            children: []
        };

        if (!parent.parent) {
          var article = {
            level: level,
            parent: parent,
            tagName: 'article',
            children: [node],
            attributes: {
              className: ['article-']
            }
          };
          parent.children.push(article);
          cursor = parent.children.length - 1;
        } else {
          parent.children.push(node);
        }

        node.children.push(originalNode);
        parent = {
            level: level,
            parent: node,
            tagName: 'div',
            attributes: {
                className: ['content-' + originalNode.tagName]
            },
            type: 'Element',
            children: []
        };
        node.children.push(parent);
        root.children[cursor].attributes.className[0] += originalNode.tagName;
    } else if (originalNode.type === 'Element') {
      let newNode = originalNode;
      if (cursor > -1) {
          var className = root.children[cursor].attributes.className[0];
          var lastElement = className.slice(-1);
          if (lastElement !== 'x') {
            if (originalNode.tagName === 'img' && isNumeric(lastElement)) {
              root.children[cursor].attributes.className[0] += 'i';
              newNode = {
                tagName: 'div',
                attributes: {
                  className: ['img'],
                  style: {
                    'background-image': `url(${originalNode.attributes.src})`
                  }
                },
                type: 'Element',
                children: []
              };
              parent.parent.children.splice(parent.parent.children.length - 1, 0, newNode);
            } else {
              root.children[cursor].attributes.className[0] += 'x';
              parent.children.push(newNode);
            }
          } else {
            parent.children.push(newNode);
          }
      } else {
        parent.children.push(newNode);
      }
    }
  });

  return toHTML(nodes[0].children);

};
