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
         , data: data
         , proxy: {
               type: 'memory'
             , reader: {
                   type: 'json'
                 , root: 'todos'
               }
           }
    });

    var todo_list = Ext.get('todo-list');

    var tpl = new Ext.XTemplate(''
        ,'<tpl for=".">'
        ,'<li>'
        ,'<div class="view thumb-wrap">'
        ,      '<input class="toggle" type="checkbox" {[ values.done ? \'checked="checked"\' : \'\']}>'
        ,           '<label>{title}</label>'
        ,            '<a class="destroy"></a>'
        ,'</div>'
        ,'</li>'
        ,'</tpl>'
    );

    Ext.create('Ext.view.View', {
        store: store
        , tpl: tpl
        , itemSelector: 'div.thumb-wrap'
        , renderTo: 'todo-list'
    });

    Ext.get('main').show();
});
