
class add_events{
    

    
    
    
    add_click_events(el, func){
        const pointer = setInterval(function(){
            if($(document).find(el).length){
                clearInterval(pointer);
            
                $(el).click(function(e){
                    e.stopPropagation();
                    func(e, this);
                });
            }
        }, 300); 
    }
    #show_action_box(e){

        var ac_box = $("#action_box");
        var mouseX = e.clientX;
        var mouseY = e.clientY;
        var horizontal_border = $(window).height()/2;
        var vertical_border = $(window).width()/2;
        var box_width = ac_box.width();
        var box_heigth = ac_box.height();
        
        if(mouseY < horizontal_border){
            $("#action_box").css({top: mouseY});
        }
        else{
            $("#action_box").css({top: mouseY - box_heigth});
        }
        
        if(mouseX < vertical_border){
            $("#action_box").css({left: mouseX});
        }
        else{
            $("#action_box").css({left: mouseX - box_width});
        }
    
        ac_box.show(400);
        added_object.action_box = true;
    }

    hide_ac_box(){
        $('#ac_box_content').remove();
        added_object.action_box = false;
        $("#action_box").hide(0);
    }
    
    _click(path, element){
        
        var obj_this = this;
       
        
        document.querySelector('#page').onscroll = function(){
            obj_this.hide_ac_box();
        }
        
        $('#page').click(function(){       
            if(added_object.action_box){
                obj_this.hide_ac_box();
            }
        });
        
        
        this.add_click_events(element, function(e, element){
            sessionStorage.setItem("paragraph_id", $(element).attr('id'))
            if(added_object.action_box){
                 obj_this.hide_ac_box();
            } 
            $.post("ac_box_content/" + path, {}, function(data){
                 $('#action_box').append(data);
            });
            const pointer = setInterval(function(){
                 if($('#ac_box_content')){
                      $('#ac_box_content').animate({
                           opacity: 1
                      }, 1200);
                      clearInterval(pointer);
                      obj_this.#show_action_box(e);
                 }
            },10);}
            );
        
            $('#action_box_off').click(function(){
                obj_this.hide_ac_box();
            });

        
        
        
        
    }


    add_singleText_click_event(id_el, path){
        var function_ = this.#show_action_box;
        var function_2 = this.hide_ac_box;
        this.add_click_events('#' + id_el, function(e, el){
            sessionStorage.setItem("paragraph_id", $(el).attr('id'))
            if(added_object.action_box){
                 function_2();
            } 
            $.post(path, {}, function(data){
                 $('#action_box').append(data);
            });
            const pointer = setInterval(function(){
                 if($('#ac_box_content')){
                      $('#ac_box_content').animate({
                           opacity: 1
                      }, 1200);
                      clearInterval(pointer);
                      function_(e);
                 }
            },10);}
            );
    }




}












