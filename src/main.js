(function() {

  var qrcode;
  var qrelement;

  xtag.register('x-qr', {
    lifecycle: {
      created: function() {
        qrelement = xtag.createFragment('<div></div>');
        this.makeCode();
        console.log('x-qr has been created', this);
      },
      inserted: function() {},
      removed: function() {},
      attributeChanged: function() {
        this.makeCode();
      }
    },
    events: {
      'tap:delegate(div)': function() {
        console.log('x-qr tapped', this);
      }
    },
    accessors: {
      text: {
        set: function() {
          console.log('x-qr href has changed', this);
        }
      },
      width: {
        set: function() {
          console.log('width changed', this);
        }
      },
      height: {
        set: function() {
          console.log('height changed', this);
        }
      },
      colorDark: {
        set: function() {
          console.log('color dark changed', this);
        }
      },
      colorLight: {
        set: function() {
          console.log('color light changed', this);
        }
      }
    },
    methods: {
      clear: function() {
        if (qrcode) {
          qrcode.clear();
        }
      },
      makeCode: function() {
        this.clear();
        qrcode = new QRCode(qrelement, this.attributes);
      }
    }
  });

})();
