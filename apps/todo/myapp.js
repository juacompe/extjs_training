Ext.onReady(function() {
    // Model
    Ext.define('Todo', {
          extend: 'Ext.data.Model'
        , fields: [
              {name: 'title', type: 'string'}
            , {name: 'done', type: 'boolean'} 
          ]
    });

    Ext.require('Ext.data.Store');
    var data = {
        todos: [
              { title: 'visit opendream', done: true}
            , { title: 'train extjs', done: false}
        ]
    };

    // Store
    var store = Ext.create('Ext.data.Store', {
          autoLoad: true
        , model: 'Todo'
        //, data: data // initial data would cause updateFooter begin called before loaded
        , proxy: {
            type: 'memory'
            , reader: {
                type: 'json'
                , root: 'todos'
              }
          }
        , listeners: {
            'datachanged': function(store) {
                var main = Ext.get('main');
                if(store.count() > 0) {
                    main.show();
                } else {
                    main.hide();
                }
                updateFooter();
            }
          }
        , remaining: function() {
            var remain_items = this.queryBy(function(model) {
                return !model.get('done');
            });
            return remain_items.length;
          }
        , done: function() {
            var done_items = this.queryBy(function(model) {
                return model.get('done');
            });
            return done_items.length;
          }
    });

    var todo_list = Ext.get('todo-list');

    var tpl = new Ext.XTemplate(''
        ,'<tpl for=".">'
        ,'<li class="todo-item {[ values.done ? \'done\' : \'\' ]}">'
        ,'<div class="view thumb-wrap">'
        ,      '<input class="toggle" type="checkbox" {[ values.done ? \'checked="checked"\' : \'\' ]}>'
        ,           '<label>{title}</label>'
        ,            '<a class="destroy"></a>'
        ,'</div>'
        ,'</li>'
        ,'</tpl>'
    );

    var map = new Ext.util.KeyMap({
        target: "new-todo",
        key: Ext.EventObject.ENTER,
        fn: function(e, t) {
            var title = this.getValue();
            var todo = Ext.create('Todo', { title: title })
            store.add(todo);
        },
        scope: Ext.get('new-todo') 
    });


    Ext.create('Ext.view.View', {
        store: store
        , tpl: tpl
        , itemSelector: 'li.todo-item'
        , renderTo: 'todo-list'
        , listeners: {
            'itemclick': function(view, model, htmlElm, index, event) {
                var elm = Ext.get(event.target);
                if (elm.is('input.toggle')) {
                    model.set('done', elm.dom.checked);
                } else if (elm.is('a.destroy')) {
                    store.remove(model);
                }
                updateFooter();
            }
        }
    });

    var footer_template = new Ext.XTemplate(''
        , '<tpl if="done &gt; 0">'
        ,   '<a id="clear-completed">Clear {done} completed {[values.done == 1? \'item\': \'items\' ]}</a>'
        , '</tpl>'
        , '<div id="todo-count">'
        ,   '{remaining} left'
        , '</div>');

    var updateFooter = function() {
        footer_template.overwrite(Ext.get('footer'), {
            remaining: store.remaining(),
            done: store.done()
        });
    }

    updateFooter();
});
