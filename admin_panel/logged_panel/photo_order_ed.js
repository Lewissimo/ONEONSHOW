
    var php_path = '../php/change_ph_order.php';

function swap_elemenets(el_1, el_2, path){
    var start = $('<span class="first_of_children" id="start"></span>');
    var end = $('<span class="last_of_children" id="end"></span>');
    var parent_el_1 = $('#' + (el_1.element).attr('id'))[0].parentElement;
    var parent_el_2 = (el_2.element).parentElement;

        
        $(parent_el_1).append(end);
        $(parent_el_1).prepend(start);
        $(parent_el_2).append(end);
        $(parent_el_2).prepend(start);

    if(el_1.position >= el_2.position){
   


        let previous_el2 = $('#' + (el_2.element).attr('id'))[0].previousElementSibling;
        let after_el1 = $('#' + (el_1.element).attr('id'))[0].nextElementSibling;
        (el_1.element).remove();
        (el_2.element).remove();
        (el_1.element).insertAfter($(previous_el2));
        (el_2.element).insertBefore($(after_el1));
        
    }
    else{
        let previous_el1 = $('#' + (el_1.element).attr('id'))[0].previousElementSibling;
        let after_el2 = $('#' + (el_2.element).attr('id'))[0].nextElementSibling;
        (el_1.element).remove();
        (el_2.element).remove();
        (el_2.element).insertAfter($(previous_el1));
        (el_1.element).insertBefore($(after_el2));
        
    }
   
            async function async_box(){
                await set_ph_events($('#' + (el_1.element).attr('id'))[0], path);
                console.log('done');
                set_ph_events($('#' + (el_2.element).attr('id'))[0], path);
            }

            async_box();

        
    $('#' + start.attr('id')).remove();
    $('#' + end.attr('id')).remove();

}

var set_ph_events = (element, path) =>{
    return new Promise((resolve) => {
    this.element = element;
const pointer = setInterval(function(){
    console.log(this.element);

    if(this.element){
        
        $(this.element).dragstart(function(e){
        sessionStorage.setItem('id', $(this).attr('id'));

    }).dragover(function(e){
        e.preventDefault();
        if($(this).attr('id') !== sessionStorage.getItem('id')){        
            $(this).css({border: '5px solid green'});
        }
    }).dragleave(function(e){
        $(this).css({border: 'none'});
    }).drop(function(e){
        e.preventDefault();
        console.log(this);
        var id_1 = $(this).attr('id');
        var id_2 = sessionStorage.getItem('id');
        var item2 = $('#'+sessionStorage.getItem('id'));
        var item1 = $(this);
        $(this).css({border: 'none'});
        console.log(path);
        $.post(path, {photo1: id_1, photo2: id_2}, function(data){
            var position_1 = id_1.match(/[0-9]+/);
            var position_2 = id_2.match(/[0-9]+/); 
            position_1 = position_1.toString();          
            position_2 = position_2.toString();
            position_1 -= 1;          
            position_2 -= 1;
            item2[0].id = item1.attr('id');
            item1[0].id = sessionStorage.getItem('id');
            console.log(data);
            swap_elemenets({element: item1, position: position_1}, {element: item2, position: position_2}, path);            
            

        });               

        
        });
    clearInterval(pointer);
}
resolve();
},100);
});
}

