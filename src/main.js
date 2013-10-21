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

  /*
   * load qrcode settings from attributes of provided dom element
   */
  function _loadSettings(element) {
    Array.prototype.slice.call(element.attributes).forEach(function(item) {
      // convert attribute name to camelCase
      var name = item.name.replace(/-([a-z])/g, function(g) {
          return g[1].toUpperCase();
        });
      settings[name] = item.value;
    });
  }

  xtag.register('x-qr', {
    lifecycle: {
      created: function() {
        //qrelement = xtag.createFragment('<div></div>');
        _loadSettings(this);
        qrelement = document.createElement('div');
        this.appendChild(qrelement);
        this.refresh();
        console.log('x-qr has been created', this);
      },
      inserted: function() {},
      removed: function() {},
      attributeChanged: function(attr, oldVal) {
        console.log(attr + ' attribute changed from ' + oldVal);
        settings[attr] = this.getAttribute(attr);
        console.log('to ' + settings[attr]);
        this.refresh();
      }
    },
    events: {
      'tap:delegate(div)': function() {
        console.log('x-qr tapped', this);
      }
      /*,
      'change:delegate(div)': function(e) {
        console.log('»» CHANGE IS HAPPENING øø', this);
        e.stopPropagation();
        xtag.fireEvent(e.currentTarget, 'change');
      }*/
    },
    accessors: {},
    methods: {
      clear: function() {
        if (qrcode) {
          qrcode.clear();
        }
      },
      refresh: function() {
        console.log('[re]making the code');
        this.clear();
        qrelement.innerHTML = '';
        qrcode = new QRCode(qrelement, settings);
      }
    }
  });

})();
