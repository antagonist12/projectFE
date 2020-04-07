if (window.jQuery) {
  uriBase = '';
  jQuery.fn.extend({
    buttonAction: function(data) {
      key = $(this).attr(data.keyAttr);
      uriBase = data.uriParent;
      container = InnerFunctionBA.component(data.component, key);
      $(this).replaceWith(container);
    }
  });

  var InnerFunctionBA = new function() {
    var componentSupport = {
      'detail': 'detail',
      'Detail': 'detail',
      'DETAIL': 'detail',
      'edit': 'edit',
      'Edit': 'edit',
      'EDIT': 'edit',
      'delete': 'delete',
      'Delete': 'delete',
      'DELETE': 'delete',
    }
    var componentText = {
      'detail': 'Detail',
      'Detail': 'Detail',
      'DETAIL': 'Detail',
      'edit': 'Edit',
      'Edit': 'Edit',
      'EDIT': 'Edit',
      'delete': 'Delete',
      'Delete': 'Delete',
      'DELETE': 'Delete',
    }
		var createContainer = function(){
      btnContainer = document.createElement('div');
			$(btnContainer).addClass('btn-container');
			return btnContainer;
		}
		var createButton = function(type, key){
			if (componentSupport[type]) {
        paramAction = '"' + componentSupport[type] + '","' + key + '"';
				elementButton = document.createElement('button');
        $(elementButton).addClass('btn-action');
        $(elementButton).addClass('rounded');
        $(elementButton).addClass('action-' + componentSupport[type]);
        $(elementButton).attr('onclick', 'InnerFunction.action(' + paramAction + ')');
        $(elementButton).text(componentText[type]);
			}else{
				console.log(type+' undefined!');
			}
			return elementButton;
		}
    this.component = function(data, key) {
			container = createContainer();
      typeButton = data.split(',');
			typeButton.forEach(function(item, index){
        $(container).append(createButton(item, key));
			})
			return container;
    }
    this.action = function(type, key) {
      $.ajax({
  			type: "POST",
  			url: uriBase + "/" + type,
  			data: {
  				key:key,
  			},
        dataType: 'json',
  			beforeSend:function(){
  				$(".loader").show();
  				$("#tabel_cari").hide();
  			},
  			success: function(data)
  			{
  				$(".loader").hide();
  				if(data.msg == 'success'){

          }else{
            alert('')
          }
  			},
        error : function() {
  				alert("Network error!");
  			}
  		});
    }
  }
} else {
  console.error('JQuery required!');
}
