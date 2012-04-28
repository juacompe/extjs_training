
// return Ext.dom.Element
var box1 = Ext.get('box1');

// set width, height
box1.setWidth(800);
box1.setHeight(800);

// assign css class
box1.addCls('rotate');
box1.removeCls('rotate');

Ext.getBody();

// keymap
Ext.require('Ext.util.KeyMap');

var i = 0;
var map = new Ext.util.KeyMap({
    target: document,
    key: "ijkl",
    fn: function(keyCode) {
        console.log(i++);
        var box = box1.getBox();
        var x = box.x;
        var y = box.y;
        switch(keyCode) {
            case 73:
                box1.setY(y - 5);
                break;
            case 74:
                box1.setX(x - 5);
                break;
            case 75:
                box1.setY(y + 5);
                break;
            case 76:
                box1.setX(x + 5);
                break;
        }
    }
});

// remove reference
Ext.enableGarbageCollector;

// require
Ext.require('Ext.fx.Anim');

box1.setSize(350, 350, {duration: 2000, easing:'bounceOut'});

// up & down
Ext.get('content').down('#title').setHTML('test');
Ext.get('title').up('#content').highlight();
Ext.get('title').up('#content').highlight("0000ff");
Ext.get('title').up('#content').highlight("0000ff", {
    attr: 'color',
    duration: 2000
});


// domHelper
Ext.DomHelper.append(Ext.get('body'), {
    tag: 'ul',
    children: [
        {tag: 'li', html: 'item 1'},
        {tag: 'li', html: 'item 2'}
    ]
})

box1.createChild({tag: 'div', html: 'easy'})

// Require template
Ext.require("Ext.Template")

var html = '<a id="{0}" href="{1}" class="nav">{2}</a>';

var tpl = Ext.DomHelper.createTemplate(html);
tpl.append('content', ['link1', 'http://www.edspencer.net/', "Ed's Site"]);
tpl.append('content', ['link2', 'http://www.dustindiaz.com/', "Dustin's Site"]);


// compositeElement
Ext.select('li').highlight();


// dom event
// Ext.EventObject
box1.on('click', function(e, t) {
    console.log(e, t);
    Ext.fly(t).highlight();
})

box1.un('click');

// require
Ext.require('Ext.util.KeyNav');

// many way to do one thing
var nav = new Ext.util.KeyNav({
    target: document,
    left: function(e) {
        this.move('left', 10);
    },
    right: function(e) {
        this.move('right', 10);
    },
    up: function() {
        this.move('up', 10);
    },
    down: function() {
        this.move('down', 10);
    },
    scope: Ext.get('box1')
})
