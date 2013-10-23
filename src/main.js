(function() {

  var qrcode;
  var qrelement;

  // initialize qr settings with default values
  var settings = {
    text: 'some address',
    width: 128,
    height: 128,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  };

  // load qrcode settings from attributes of provided dom element
  function _loadSettings(element) {
    Array.prototype.slice.call(element.attributes).forEach(function(item) {
      // convert attribute name to camelCase
      var name = _camelCase(item.name);
      settings[name] = item.value;
    });
  }

  // convert attr-name to attrName and return it
  function _camelCase(name) {
    return name.replace(/-([a-z])/g, function(g) {
      return g[1].toUpperCase();
    });
  }

  xtag.register('x-qr', {
    lifecycle: {
      created: function() {
        //qrelement = xtag.createFragment('<div></div>');
        var xqr = this;
        _loadSettings(xqr);
        xqr.refresh();
        console.log('x-qr has been created', this);

        xtag.addObserver(xqr, 'inserted', function(e) {
          console.log('inserted this element: ', e);
        });

        xtag.addObserver(xqr, 'removed', function(e) {
          if (e.tagName == 'DIV' && e.classList.contains('qrcode-wrapper')) {
            // QR code has been removed, so regenerate it with new content
            console.log('qr code was removed, refreshing', e);
            xqr.refresh();
          }
        });

      },
      attributeChanged: function(attr, oldVal) {
        console.log(attr + ' attribute changed from ' + oldVal);
        switch (attr) {
          case 'text':
            // text should be set via innerHTML
            // returning here to avoid recursive loop with refresh
            return;
            break;
          case 'width':
          case 'height':
          case 'color-light':
          case 'color-dark':
            settings[_camelCase(attr)] = this.getAttribute(attr);
            // text attribute has been set when element was last refreshed
            // resetting the innerHTML will trigger a refresh
            this.innerHTML = this.getAttribute('text');
            console.log('changed attr to ' + settings[attr]);
            break;
        }
      }
    },
    events: {
      'tap:delegate(div)': function() {
        console.log('x-qr tapped', this);
      }
    },
    accessors: {},
    methods: {
      // remove all content of this x-qr tag
      clear: function() {
        if (qrcode) {
          qrcode.clear();
        }
        this.innerHTML = '';
      },
      // replace the current content of the x-qr tag with a qrcode
      // the qrcode is generated from the innerHTML content before removing it
      refresh: function() {
        var content = this.innerHTML;

        // store current content in case we need to update attributes later
        this.setAttribute('text', content);

        this.clear();
        qrelement = document.createElement('div');
        qrelement.classList.add('qrcode-wrapper');
        this.appendChild(qrelement);
        settings.text = content;
        qrcode = new QRCode(qrelement, settings);
        console.log('refreshed qrcode');
      }
    }
  });

})();
