var is_member_editor_shown = false;
sessionStorage.setItem('added', 0);
var added_object = {
    member_editor: false,
    edit_con: false,
    action_box: false
};

// var add_listener = new add_events();



(function($) {
    $.fn.clickToggle = function(func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function() {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };
}(jQuery));


function show_hide_member_editor(value){
    if(value === 'hide'){
        $('#member_editor').css("transform", "translateX(105%)");
        is_member_editor_shown = false;
    }
    else{
        $('#member_editor').css("transform", "translateX(0)");
        is_member_editor_shown = true;
    }
}

function show_hide_admin_panel(value){
    
    if(value === 'hide'){
        $('#main-panel').css("transform", "translateY(378px)");
        $("#but_box").html('&#129089;');
        
    }
    else{
        $('#main-panel').css("transform", "translateY(0)");
        $("#but_box").html('&#129091;');
    }
}








function add_paragraph(state){
    var _text_tab = $(document).find('._text');

    var area = $('<textarea id="new_text_area"></textarea>');
    area.focusout(function(){
        
        $('#new_text_area').remove();
    })
    switch (state) {
        case 'after':
            $(area).insertAfter($(this));
            break;
        case 'before':
            $(area).insertBefore($(this));                
            break;
        case 'at_end':
            area.insertAfter(_text_tab[_text_tab.length -1]);
            break;
        case 'at_start':
            $(area).insertBefore(_text_tab[0]);                
            break;
            default:
                console.log('ADD_PARAGRAPH() ARGUMENT ERROR ' + state + ' is not corect value'); 
            break;
            }
                    
                    
    }
                
                
                
                
                
                
    function which_position(el_id, el_class){
        var position = 0;
        $(document).find('.' + el_class).each(function(index){
            console.log(' ' + el_class);
            if(el_id == $(this).attr('id')){
                 position = index;
            }
        })
        return position;
    }
                
                
    $(document).ready(function(){


    
    
    $('#edit_members_').click(function(){
        if(!added_object.member_editor){
            added_object.member_editor = true;
            
            if(added_object.edit_con){
                added_object.edit_con = false;
                remove_mem_edit();
            }
            $.post('member_editor/edit_mem.html', {}, function(data){
                $('#member_list_box').append(data);
                
            });
        }
        show_hide_member_editor('show');
        added_object.member_editor = true;
    });

    
    $('.person_edit').each(function(){ $(this).click(function(){
        $('#edit_box').show(2);
    });});
    $("#but_box").clickToggle(
        function(){
            show_hide_admin_panel('show');
        },
        function(){
            show_hide_admin_panel('hide');
        }
        
        );
        
        function remove_mem_edit(x = false){
            
            $('#mem_list').remove();
            
            if(x){
                show_hide_member_editor('hide');
            }
        }
        
        $("#member_editor_off").click(function(){
            added_object.member_editor = false;
            added_object.edit_con = false;
            remove_mem_edit(true);
        });
        
        $('#edit_contacts_').click(function(){
            show_hide_member_editor('show');
            if(added_object.edit_con === false){
                added_object.edit_con = true;
                if(added_object.member_editor){
                    added_object.member_editor = false;
                    remove_mem_edit();
                }
                $.post('member_editor/edit_con.html', {}, function(data){
                    $('#member_list_box').append(data);
                });
            }
            
        });
        
        
        
        
        
        
    });
    