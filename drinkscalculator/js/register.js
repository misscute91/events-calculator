$( document ).ready(function() {

    // Javascript code starts here for each function

    //set the state name
    var state_name = $('#agent_state').find('option:selected').text();
    $('#agent_state_name').val(state_name);

    // States select on change
    $('#agent_state').on('change', function() { 
        var state = this.value;
        var website = $('#website').val();
        var state_name = $('#agent_state').find('option:selected').text();
        $('#agent_state_name').val(state_name);
        $('#agent_locals').html("<option value=''>Loading...</option>");

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
                        $('#agent_locals').html(select_html);
                        $("#agent_locals").prop('disabled', false);
                    }

                }
            });

        } else {
            $("#agent_locals").prop('disabled', true);
            $('#agent_locals').html("<option value=''>Select Local Government</option>");
        }

     });


    $("#agent_form").validate({
            rules: {
                firstname: "required",
                lastname: "required",
                password: {
                    required: true,
                    minlength: 5
                },
                confirm_password: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                firstname: "Please enter your firstname",
                lastname: "Please enter your lastname",
                username: {
                    required: "Please enter a username",
                    minlength: "Your username must consist of at least 2 characters"
                },
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                confirm_password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long",
                    equalTo: "Please enter the same password as above"
                },
                email: "Please enter a valid email address"
            }
        });

    $("#company_color").spectrum({
        color: "#F96432",
        preferredFormat: "hex",
        showInput: true,
        showPalette: true
    });

});