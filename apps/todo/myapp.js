Ext.onReady(function() {
    // Model
    Ext.define('Todo', {
          extend: 'Ext.data.Model'
        , fields: [
              {name: 'title', type: 'string'}
            , {name: 'done', type: 'boolean'} 
          ]
    });

    
});
