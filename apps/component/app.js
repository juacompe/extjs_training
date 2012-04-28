Ext.onReady(function() {
    viewport = Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [
            {
                region: 'north',
                id: 'northPanel',
                html: 'north'
            },{
                region: 'west',
                id: 'westPanel',
                html: 'west'
            },{
                region: 'center',
                id: 'centerPanel',
                tbar: [
                    {
                        text: 'button1'
                    },
                    {
                        text: 'button2',
                        id: 'btn2'
                    }
                ],
                items: [
                    {
                        id: 'child1',
                        height: 100,
                        html: 'item1'
                    },
                    {
                        id: 'child2',
                        height: 200,
                        html: 'item2'
                    },
                    {
                        xtype: 'helloworld',
                        height: 20,
                        message: 'hi hello',
                        buttonMessage: 'opendream',
                        listeners: {
                            'myclick': function() {
                                Ext.MessageBox.alert("hello", 'message')
                            }
                        }
                    }
                ],
                buttons: [
                    {
                        text: 'ok'
                    }
                ]
            },{
                region: 'south',
                xtype: 'tabpanel',
                height: 100,
                items: [
                    {
                        title: 'tab1',
                        html: 'tab1'
                    },
                    {
                        title: 'tab2',
                        items: [
                            {
                                html: 'hello1'
                            },
                            {
                                html: 'hello2'
                            }
                        ]
                    }
                ]
            }
        ]
    })
})