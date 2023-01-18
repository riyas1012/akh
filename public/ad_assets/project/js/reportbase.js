var reportProductTable;

$(document).ready(function() {
	// top nav bar 
    $('#navProduct').addClass('active');
    $('#navHome').removeClass('active');
    $.fn.dataTable.moment( 'D-MMM-YYYY HH:mm A' );

	// manage product data table
        reportProductTable = $('#reportBaseProductTable').DataTable({
           // "scrollY": 200,
            "scrollX": true,
            ajax: 'php_action/fetchBaseReport.php',
            order: [],
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
                    buttons: [
                        'copy',
                        'excel',
                        'csv'
                    ]
                }
            ]
    
/*             buttons: [
                'csv', 'excel'
            ] */
           // responsive: true
        });
/*     $("#quantity, #editQuantity").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
           //display error message
           $("#digitsOnlyerrmsg, #editDigitsOnlyerrmsg").html("Digits Only").show().fadeOut("slow");
                  return false;
       }
    }); */
});

