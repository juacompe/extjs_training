Ext.onReady(function() {

    Ext.define('Todo',{
        extend: 'Ext.data.Model',
        fields: [
            'title',
            {
                name: 'done',
                type: 'boolean'
            }
        ],
        clear: function() {
            this.set('done', true);
        }
    })

    var editor = new Ext.Editor({
        updateEl: true, // update the innerHTML of the bound element when editing completes
        offsets: [50, 5],
        field: {
            xtype: 'textfield'
        }
    });

    store = Ext.create('Ext.data.Store', {
        model: 'Todo',
        proxy: {
            type: 'memory'
        },
        listeners: {
            'datachanged': function(store) {
                var main = Ext.get('main');
                if (store.count() > 0) {
                    main.show();
                } else {
                    main.hide();
                }
                updateFooter();
            }
        },
        remaining: function() {
            var arr = this.queryBy(function(model) {
                return !model.get('done');
            })
            return arr.length;
        },
        done: function() {
            var arr = this.queryBy(function(model) {
                return model.get('done');
            })
            return arr.length;
        },
        clear: function() {
            var arr = this.queryBy(function(model) {
                return model.get('done');
            })
            this.remove(arr.items);
        }
    });

    var todoTpl = new Ext.XTemplate(
        '<tpl for=".">',
        '<div class="view thumb-wrap">',
        '  <input class="toggle" type="checkbox" {[ values.done ? \'checked="checked"\' : \'\' ]}/>',
        '  <label>{title}</label>',
        '  <a class="destroy"></a>',
        '</div>',
        '</tpl>'
    )

    var todoList = Ext.create('Ext.view.View', {
        store: store,
        tpl: todoTpl,
        itemSelector: 'div.thumb-wrap',
        renderTo: Ext.get('todo-list'),
        listeners: {
            'itemmouseenter': function(view, model, item) {
                Ext.fly(item).down('.destroy').show();
            },
            'itemmouseleave': function(view, model, item) {
                Ext.fly(item).down('.destroy').hide();
            },
            'itemclick': function(view, model, item, index, e) {
                var elm = Ext.fly(e.target);
                if (elm.is('a.destroy')) {
                    store.remove(model);
                } else if (elm.is('input.toggle')) {
                    model.set('done', elm.dom.checked);
                    updateFooter();
                }
            },
            'itemdblclick': function(view, model, item, index, e) {
                var label = Ext.fly(item).down('label');
                editor.on('complete', function(editor, value) {
                    this.set('title', value);
                }, model,
                {
                    single: true
                })
                editor.startEdit(label);
            }
        }
    });

    var footerTpl = new Ext.XTemplate(
        '<tpl if="done &gt; 0">',
        '<a id="clear-completed">Clear {done} completed {[values.done == 1 ? \'item\' : \'items\' ]}</a>',
        '</tpl>',
        '<div id="todo-count">',
            '{remaining} left',
        '</div>'
    )


    var updateFooter = function() {
        footerTpl.overwrite(Ext.get('footer'), {
            remaining: store.remaining(),
            done: store.done()
        });
    }

    Ext.get('footer').on('click', store.clear, store, {
        delegate: 'a'
    });

    Ext.addBehaviors({
        '#new-todo @keypress': function(e, t) {
            if (e.keyCode == 13) {
                var todo = Ext.create('Todo', {
                    title: t.value
                });

                store.add(todo);
                t.value = '';
            }
        },
        '#toggle-all @click': function(e, t) {
            var flag = t.checked;
            store.each(function(model) {
                model.set('done', flag);
            })
        }
    });
});