Ext.define('HelloWorld', {
    extend: 'Ext.Component',
    alias: 'widget.helloworld',
    requires: [
        'Ext.window.MessageBox'
    ],
    message: 'hello !!!!',
    buttonMessage: 'click me',
    initComponent: function() {
        var me = this;
        me.addEvents (
            'myclick'
        )
        me.callParent();
    },
    onRender: function(el) {
        this.callParent();
        el.createChild({
            tag: 'p',
            children: [
                {tag: 'b', html: this.message}
            ]
        })
        var anchor = el.createChild({
            tag: 'a',
            href: '#',
            html: this.buttonMessage
        });
        this.mon(anchor, 'click', function(e, t) {
            this.fireEvent('myclick');
        }, this)

    }
})