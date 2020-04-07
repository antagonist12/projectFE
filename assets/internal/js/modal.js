if (window.jQuery) {
  uriBase = '';
  jQuery.fn.extend({
    createModal: function() {
      container = InnerFunctionModal.component();
      $(this).replaceWith(container);
    }
  });

  var InnerFunctionModal = new function() {
		var createContainer = function(){
      btnContainer = document.createElement('div');
			$(btnContainer).addClass('btn-container');
			return btnContainer;
		}
    this.component = function(data, key) {
      modal = document.createElement('div');
      $(modal).attr('id', 'modal-notif');
			$(modal).addClass('modal-notif');

      container = document.createElement('div');
      $(container).addClass('modal-container');

      header = document.createElement('div');
      $(header).addClass('modal-notif-header');

			content = document.createElement('div');
      $(content).addClass('modal-notif-content');

      footer = document.createElement('div');
      $(footer).addClass('modal-notif-footer');

      btn_info = document.createElement('a');
      $(btn_info).attr('href', '#');
      $(btn_info).hide();
      $(btn_info).addClass('btn pull-right btn-info modal-dismiss');

      btn_success = document.createElement('a');
      $(btn_success).attr('href', '#');
      $(btn_success).hide();
      $(btn_success).addClass('btn pull-right btn-success modal-dismiss');

      btn_warning = document.createElement('a');
      $(btn_warning).attr('href', '#');
      $(btn_warning).hide();
      $(btn_warning).addClass('btn pull-right btn-warning modal-dismiss');

      btn_danger = document.createElement('a');
      $(btn_danger).attr('href', '#');
      $(btn_danger).hide();
      $(btn_danger).addClass('btn pull-right btn-danger modal-dismiss');

      $(footer).append(btn_danger);
      $(footer).append(btn_warning);
      $(footer).append(btn_success);
      $(footer).append(btn_info);

      $(container).append(header);
      $(container).append(content);
      $(container).append(footer);

      $(modal).append(container);

      return modal;
    }
  }
} else {
  console.error('JQuery required!');
}
