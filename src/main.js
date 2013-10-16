(function() {

  xtag.register('x-qr', {
    lifecycle: {
      created: function() {
        console.log('x-qr has been created', this);
        this.innerHTML = '<div>' + this.attributes['label'].value + '</div>';
        new QRCode(this, this.attributes['href'].value);
      },
      inserted: function() {},
      removed: function() {},
      attributeChanged: function() {}
    },
    events: {
      'tap:delegate(div)': function() {
        console.log('x-qr tapped', this);
      }
    },
    accessors: {
      href: {
        set: function() {
          console.log('x-qr href has changed', this);
        }
      }
    },
    methods: {
    }
  });

})();
