// edit profile
$('.modal-item').createModal();

$('.modal-dismiss').click(function () {
    $('#modal-notif').hide();
})

$('.simpan-btn').click(function () {
    link = $(this).data('link');
    show_modal_edit('basic', 'success', '', 'Perubahan profil anda telah berhasil di simpan', link);
})

function show_modal_edit(type, header_type, header, isi, link) {

    $('#modal-notif').find('.modal-notif-header').append("<div id='modal-header' class='f-col pad-sm'>");
    $('#modal-notif').find('#modal-header').append("<img src='assets/image/materiDesign/centang Putih.png' class='image-round' style='width:80px; height: auto;'> ");
    $('#modal-notif').find('.modal-notif-content').text(isi);

    if (header_type != '') {
        header_type = 'header-' + header_type;
        flex = 'flex'
        $('#modal-notif').find('.modal-notif-header').addClass(header_type);
        $('#modal-notif').find('.modal-notif-header').addClass(flex);
    }
    if (type == 'basic') {
        $('#modal-notif').find('.btn-info').text('OK');
        $('#modal-notif').find('.btn-info').attr('href', link);
        $('#modal-notif').find('.btn-info').show();
        $('#modal-notif').show();
    }
}