$(document).ready(function () {
    $("#loading-wrapper").fadeOut(500);
    $(".content").fadeIn('slow');
    $('#wifiInfo').hide();
    $('.loader').hide();
    getDate();
})

function getDate() {
    var d = new Date();
    var hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    $('#format-hari').text(hari[d.getDay()] + ',')
    $('#format-tanggal').text(d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear())
}

$(".btn-scan").on("click", function () {
    $('#wifiInfo').hide();
    $('.loader').show();
    $('.text-scan').hide();
    $.ajax({
        type: 'GET',
        url: '/scan',
        success: function (data) {
            $('#wifiInfo').show();
            $('.text-scan').show();
            $('.loader').hide();
            var html = `
            <h5 class="text-center">INFORMASI WIFI</h5>
            <table>                
                <tr>
                    <td>SSID</td>
                    <td> : </td>
                    <td>${data.detail[0].ssid}</td>
                </tr>
                <tr>
                    <td>BSSID</td>
                    <td> : </td>
                    <td>${data.detail[0].bssid}</td>
                </tr>
                <tr>
                    <td>Mac Address</td>
                    <td> : </td>
                    <td>${data.detail[0].mac}</td>
                </tr>
                <tr>
                    <td>Kekuatan Sinyal</td>
                    <td> : </td>
                    <td>${data.detail[0].quality}</td>
                </tr>
                <tr>
                    <td>Keamanan</td>
                    <td> : </td>
                    <td>${data.detail[0].security}</td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td>:</td>
                    <td>${data.passWifi}</td>
                </tr>
            </table>`;
            $('#wifi-detail').html(html);
        }
    });
});