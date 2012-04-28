var panel1 = {
	html : 'I am Panel1',
    id : 'panel1',
    frame : true,
    height : 100
};

var panel2 = {
    html  : '<b>I am Panel2</b>',
    id     : 'panel2',
    frame : true
};

var myWin = Ext.create('Ext.window.Window',{
    id : 'myWin',
    height : 400,
    width : 400,
    items  : [
        panel1,
        panel2
    ]
});

Ext.getCmp('myWin')

Ext.getCmp('myWin').add({
    title: 'panel3',
    html: 'hi',
    id: 'panel3'
})

Ext.getCmp('myWin').doLayout();

Ext.getCmp('myWin').remove(Ext.getCmp('panel3'), ...)

// viewport.query
// Ext.ComponentQuery

viewport.query('panel');

viewport.query('button[text="ok"]');

Ext.getCmp('centerPanel');

Ext.getCmp('centerPanel').down('helloworld');

Ext.getCmp('centerPanel').down('#btn2');

Ext.getCmp('btn2');

Ext.getCmp('btn2').up('panel');

// Ext.ComponentManager

Ext.ComponentManager.all;

