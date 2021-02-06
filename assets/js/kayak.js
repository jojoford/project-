// called whenever a keyup event happens on relevant input.  triggers autocomplete update when appropriate.
function smartyPants(e) {
    var $input = $(e.target);

    // don't update the list unless the input value has changed
    if ($input.val() == $input.data('lastVal'))
        return;

    // save the current value
    $input.data('lastVal', $input.val());		

    var $list = $('#' + $input.attr('list'));
    
    var params = {
        'f': 'p',	// jsonp
        'lc': 'en',
        'lc_cc': 'US',
        's': $input.data('smartyS'),
        'where': $input.val()
    }		
    
    $.ajax('http://www.kayak.com/f/smarty', 
                {
                    'dataType': 'jsonp',
                    'data': params,
                    'success': function(data, textStatus, jqXHR) {return fancyPants($list, data, textStatus, jqXHR);}
                });
}

// updates the datalist
function fancyPants($list, data, textStatus, jqXHR)
{
    var $data = $(data);
    
    // clear it out
    $list.empty();
    
    // repopulate
    $data.each(function(index, value) {
        var decorator = "&nbsp;";
        
        switch (value.loctype) {
            case 'ap': decorator = '&#9992;'; break;
            case 'reg': decorator = '&#10168;'; break;
            case 'ctry': decorator = '&#9872;'; break;
            case 'city': decorator = '&#10070;'; break;
            case 'hotel': decorator = '&#8962;'; break;
        }
        
        var label = decorator + '&nbsp;' + value.displayname;
        
        $list.append('<option label="'+label+'">' + value.displayname + '</option>');
    });
}

// init
$(function()
{
    $('input[data-smarty-s]').each(
        function(index, input) {
            var $input = $(input);
            
            // generate (hopefully) unique ID for datalist
            var listId = $input.attr('name') + "-" + $input.data('smartyS') + "-list";

            // create datalist and associate with this input
            $input.after('<datalist id="'+listId+'"></datalist>');
            $input.attr('list', listId);
            
            // updates the datalist
            $input.on('keyup', smartyPants);
        });
});