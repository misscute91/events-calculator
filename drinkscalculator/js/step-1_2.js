$( document ).ready(function() {

    // Javascript code starts here for each function

    //set the state name
    var state_name = $('#state').find('option:selected').text();
    $('#state_name').val(state_name);

    // States select on change
    $('#state').on('change', function() {
        var state = this.value;
        var website = $('#website').val();
        var state_name = $('#state').find('option:selected').text();
        $('#state_name').val(state_name);
        $('#locals').html("<option value=''>Loading...</option>");

        if(state != ""){
            $.ajax({
                type: 'GET',
                url: website + "/ajax-locals",
                contentType: "application/json; charset=utf-8",
                data:{
                    state_id: "" + state + ""
                },
                success: function (data){
                    var str = $.trim((data));
                    if(str != ""){
                        var locals = str.split(',');
                        var select_html = "";
                        select_html += "<option value=''>Select Local Government</option>";
                        for (var i = 0; i < locals.length; i++) {
                            select_html += "<option value='" + locals[i] + "'>" + locals[i] + "</option>";
                        }
                        $('#locals').html(select_html);
                        $("#locals").prop('disabled', false);
                    } 

                },
                 error: function (request, status, error) {
                    //alert(formatErrorMessage(status, error));
                }
            });

        } else {
            $("#locals").prop('disabled', true);
            $('#locals').html("<option value=''>Select Local Government</option>");
        }

     });


    // location_of_event select on change
    $('#locals').on('change', function() {
        var local = this.value;
        var website = $('#website').val();
        var state_name = $('#location_of_event').find('option:selected').text();
        $('#location_of_event').html("<option value=''>Loading...</option>");

        if(state != ""){
            $.ajax({
                type: 'GET',
                url: website + "/ajax-location-event",
                contentType: "application/json; charset=utf-8",
                data:{
                    local_id: "" + local + ""
                },
                success: function (data){
                    var str = $.trim((data));
                    if(str != ""){
                        var local_event = str.split(',');
                        var select_html = "";
                        select_html += "<option value=''>Select Location of Event</option>";
                        for (var i = 0; i < local_event.length; i++) {
                            var str = local_event[i].replace(/'/g, "").replace(/\\/g, '');
                            select_html += "<option value='" + str + "'>" + str + "</option>";
                        }
                        $('#location_of_event').show();
                        $('#location_of_event').html(select_html);
                        $("#location_of_event").prop('disabled', false);
                        $('#location_of_event_text').css("display", "none");
                        // $('#location_of_event_text').prop("required", false);
                        

                    } else {

                        // var select_html = "";
                        // select_html += "<option value=''>No Local Government Found</option>";
                        // $('#location_of_event').html(select_html);
                        // $("#location_of_event").prop('disabled', false);
                        // $('#location_of_event').removeAttr('required');
                        $("#location_of_event").prop('disabled', true);
                        $('#location_of_event').hide();
                        $('#location_of_event_text').css("display", "block");
                        // $('#location_of_event_text').prop("required", true);

                    }
                },
                 error: function (request, status, error) {
                    //alert(formatErrorMessage(status, error));
                }
            });

        } else {
            $("#location_of_event").prop('disabled', true);
        }

     });

    $(".allow_numbers_only").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl/cmd+A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: Ctrl/cmd+C
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: Ctrl/cmd+X
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    // Powers the datatable for step 3
    $('#event_date').datepicker({ minDate : 0, dateFormat: 'dd-mm-yy' }).val();

    $('#no_of_guest').keyup(function(event) {
          // skip for arrow keys
          if(event.which >= 37 && event.which <= 40) return;

          // format number
          $(this).val(function(index, value) {
            return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          });
    });

    $('#budget').keyup(function(event) {
          // skip for arrow keys
          if(event.which >= 37 && event.which <= 40) return;

          // format number
          $(this).val(function(index, value) {
            return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          });
    });

    $("#step-one").submit(function(e){
        var budget = $('#budget').val();
        budget = budget.replace(/,/g, '');
        if(budget < 499999){
            alert("Budget cannot be less than 500,000 Naira, Please increase your budget");
            return false;
        }
    });

    function formatErrorMessage(jqXHR, exception) {
        if (jqXHR.status === 0) {
            return ('Network Error, Please check your internet connection');
        } else {
            return ('Error occured, please try again\n');
        }
    }

});