loading_count = 0;
temp_table = [];
temp_data = [];

$('.i-date').attr('onfocus', '(this.type="date")');
$('.i-date').attr('onblur', '(this.type="text")');

$('.button-action').buttonAction({
	component: "detail,edit,delete",
	keyAttr: "value",
});
$('.modal-item').createModal();

$('.modal-dismiss').click(function () {
	$('#modal-notif').hide();
})
$('.coming-soon').click(function () {
	$(this).attr('href', '#');
	show_modal('basic', '', 'notification', 'Coming Soon!', '');
})

$('.logout-btn').click(function () {
	link = $(this).data('link');
	show_modal('logout', 'warning', 'Logout', 'Apakah anda yakin akan keluar dari akun ini ?', link);
})
$('.stepper').click(function () {
	$('.stepper').removeClass('active');
	$(this).addClass('active');
	$('.stepper-container').find('.step').hide();
	$('.stepper-container').find('#' + $(this).data('id')).show();
})


setInterval(function () {
	get_time();
	get_date();
}, 1000);

function loading(type) {
	if (type == 'show') {
		if (loading_count == 0) {
			$(".loading").show();
		}
		loading_count++;
	} else {
		if (loading_count == 1) {
			$(".loading").hide();
		}
		loading_count--;
	}
}

function f_digit(val) {
	if (val < 10) {
		return '0' + val;
	} else {
		return val;
	}
}

function bulan_indo(val) {
	if (val == 0) {
		return 'Januari';
	} else if (val == 1) {
		return 'Februari';
	} else if (val == 2) {
		return 'Maret';
	} else if (val == 3) {
		return 'April';
	} else if (val == 4) {
		return 'Mei';
	} else if (val == 5) {
		return 'Juni';
	} else if (val == 6) {
		return 'Juli';
	} else if (val == 7) {
		return 'Agustus';
	} else if (val == 8) {
		return 'September';
	} else if (val == 9) {
		return 'Oktober';
	} else if (val == 10) {
		return 'November';
	} else if (val == 11) {
		return 'Desember';
	}
}

function get_time() {
	var today = new Date();
	var time = f_digit(today.getHours()) + ' : ' + f_digit(today.getMinutes()) + ' : ' + f_digit(today.getSeconds());
	$('.running-time').text(time);
}

function get_date() {
	var today = new Date();
	var time = today.getDate() + ' ' + bulan_indo(today.getMonth()) + ' ' + today.getFullYear();
	$('.running-date').text(time);
}

function show_modal(type, header_type, header, isi, link) {
	$('#modal-notif').find('.modal-notif-header').text(header.toUpperCase());
	$('#modal-notif').find('.modal-notif-content').text(isi);

	if (header_type != '') {
		header_type = 'header-' + header_type;
		$('#modal-notif').find('.modal-notif-header').addClass(header_type);
	}
	if (type == 'basic') {
		$('#modal-notif').find('.btn-info').text('OK');
		$('#modal-notif').find('.btn-info').show();
		$('#modal-notif').show();
	}
	if (type == 'logout') {
		$('#modal-notif').find('.btn-info').text('Batal');
		$('#modal-notif').find('.btn-danger').text('OK');
		$('#modal-notif').find('.btn-danger').attr('href', link);
		$('#modal-notif').find('.btn-info').show();
		$('#modal-notif').find('.btn-danger').show();
		$('#modal-notif').show();
	}
}


function data_table_handler(obj) {
	container = document.createElement('div');
	table = document.createElement('div');
	table_page = document.createElement('ul');

	$(container).addClass('data-table-container');
	$(table).addClass('table-container');
	$(table_page).addClass('table-page');

	$(obj).wrap(table);
	obj2 = $(obj).parent();
	$(obj2).wrap(container);
	obj3 = $(obj2).parent();
	$(obj3).append(table_page);

	table_pagination_handler(obj);
}

function table_pagination_handler(obj) {
	page = 1;
	limit = 20;
	iCount = 0;
	table_page = $(obj).parent().parent().find('.table-page');

	item = $(obj).find('tbody').find('tr');
	item.each(function (i, obj2) {
		$(obj2).attr('class', 'ff-item');
		if (iCount < limit) {
			$(obj2).addClass('tblPage-' + page);
			iCount++;
		} else {
			page++;
			$(obj2).addClass('tblPage-' + page);
			iCount = 1;
		}
	});
	$(obj).find('tbody').find('tr').hide();
	$(obj).find('tbody').find('.tblPage-1').show();

	$(table_page).html('');
	for (var i = 1; i <= page; i++) {
		if (i == 1) {
			$(table_page).append('<li class="active" onclick="table_page_act(this, ' + i + ')" data-key="' + i + '"><a href="#">' + i + '</a></li>');
		} else {
			$(table_page).append('<li onclick="table_page_act(this, ' + i + ')" data-key="' + i + '"><a href="#">' + i + '</a></li>');
		}
	}
	simple_pagination(table_page, 1);
}

function table_page_act(obj, page) {
	table_page = $(obj).parent();
	table = $(obj).parent().prev().find('tbody');
	$(table).find('tr').hide();
	$(table).find('.tblPage-' + page).show();
	$(table_page).find('li').removeClass('active');
	$(obj).addClass('active');
	simple_pagination(table_page, page);
}

function simple_pagination(obj, page) {
	page_li = $(obj).find('li');
	page_ori = $(obj).find('li > a');
	count_li = page_ori.length;

	batas_bawah = page - 2;
	batas_atas = page + 2;

	page_li.each(function (i, obj_li) {
		$(obj_li).show();
		key = $(obj_li).data('key');
		if (key == '...') {
			$(obj_li).remove();
		}

		if ((key < batas_bawah || key > batas_atas)) {
			$(obj_li).hide();
		}
		if (batas_bawah >= 1 && key == 1) {
			$(obj_li).show();
			if (batas_bawah > 2) {
				$(obj_li).after('<li data-key="...">...</li>');
			}
		}
		if (batas_atas <= count_li && key == count_li) {
			if (batas_atas < (count_li - 1)) {
				$(obj_li).before('<li data-key="...">...</li>');
			}
			$(obj_li).show();
		}
	});
}

$('.inp-find').keyup(function () {
	targetFInd = $(this).data('target');
	keyword = $(this).val();

	$(targetFInd).find('.ff-item').attr('class', 'ff-item');
	if (!temp_table[targetFInd]) {
		temp_table[targetFInd] = $(targetFInd).find('.ff-item');
	}
	$(targetFInd).find('.ff-item').remove();

	temp_table[targetFInd].each(function (i, obj) {
		ff_str = $(obj).text().toLowerCase();
		if (ff_str.includes(keyword.toLowerCase())) {
			$(targetFInd).append(obj);
		}
	});
	table_pagination_handler($(targetFInd));
});


$('.form-ajax').submit(function () {
	uri_redirect = $(this).data('redirect');
	$.ajax({
		type: 'post',
		url: $(this).data('uri'),
		data: $(this).serialize(),
		dataType: 'json',
		beforeSend: function () {
			loading('show');
		},
		success: function (data) {
			if (data.res == 'success') {
				window.location = uri_redirect;
			} else {
				loading('hide');
				show_modal('basic', 'fail', 'notification', data.msg, '');
			}
		},
		error: function () {
			loading('hide');
			show_modal('basic', 'fail', 'notification', 'Network error!', '');
		}
	});
	return false;
});

$('.comp-data').each(function (i, obj) {
	$.ajax({
		type: 'post',
		url: $(obj).data('source'),
		beforeSend: function () {
			loading('show');
		},
		success: function (data) {
			loading('hide');
			$(obj).html(data);
		},
		error: function () {
			loading('hide');
			show_modal('basic', 'fail', 'notification', 'Network error!', '');
		}
	});
});

$('.data-table').each(function (i, obj) {
	$.ajax({
		type: 'post',
		url: $(obj).data('source'),
		beforeSend: function () {
			loading('show');
		},
		success: function (data) {
			if ($(obj).attr('id')) {
				targetId = $(obj).attr('id');
			} else {
				targetId = 'data-table' + i;
				$(this).attr('id', targetId);
			}
			loading('hide');
			$(obj).find('tbody').html(data);
			data_table_handler(obj);
		},
		error: function () {
			loading('hide');
			show_modal('basic', 'fail', 'notification', 'Network error!', '');
		}
	});
});

Highcharts.chart('container-chart', {
	chart: {
		type: 'bar'
	},
	title: {
		text: 'Historic World Population by Region'
	},
	subtitle: {
		text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
	},
	xAxis: {
		categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
		title: {
			text: null
		}
	},
	yAxis: {
		min: 0,
		title: {
			text: 'Population (millions)',
			align: 'high'
		},
		labels: {
			overflow: 'justify'
		}
	},
	tooltip: {
		valueSuffix: ' millions'
	},
	plotOptions: {
		bar: {
			dataLabels: {
				enabled: true
			}
		}
	},
	legend: {
		layout: 'vertical',
		align: 'right',
		verticalAlign: 'top',
		x: -40,
		y: 80,
		floating: true,
		borderWidth: 1,
		backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
		shadow: true
	},
	credits: {
		enabled: false
	},
	series: [{
		data: [107, 31, 635, 203, 2]
	}]
});