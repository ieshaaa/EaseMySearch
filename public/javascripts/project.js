$(document).ready(function(){
    $.getJSON('/flight/fetchallstates',function(data){
        data.map((item)=>{
            $('#sourcestate').append(
                $('<option>').text(item.statename).val(item.stateid)
                );
            
        });
        $('#sourcestate').formSelect();
    });


   $('#sourcestate').change(function(){

    $('#sourcecity').empty()
    $('#sourcecity').append(
        $('<option disabled selected>').text('Choose City')
        );
    $.getJSON('/flight/fetchallcity',{stateid:$('#sourcestate').val()},function(data){

            data.map((item)=>{
                $('#sourcecity').append(
                    $('<option>').text(item.cityname).val(item.cityid)
                    );
                
            });

            $('#sourcecity').formSelect();
        });
   })
    

   $.getJSON('/flight/fetchallstates',function(data){
    data.map((item)=>{
        $('#desstate').append(
            $('<option>').text(item.statename).val(item.stateid)
            );
        
    });
    $('#desstate').formSelect();
});

$('#desstate').change(function(){

    $('#descity').empty()
    $('#descity').append(
        $('<option disabled selected>').text('Choose City')
        );
    $.getJSON('/flight/fetchallcity',{stateid:$('#desstate').val()},function(data){

            data.map((item)=>{
                $('#descity').append(
                    $('<option>').text(item.cityname).val(item.cityid)
                    );
                
            });

            $('#descity').formSelect();
        });
   })


});