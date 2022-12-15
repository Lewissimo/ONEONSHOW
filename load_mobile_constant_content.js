
function load_mobile_constant_content(width_limit = 700, to_content_path = "contents"){

    this.width_limit = width_limit;
    this.to_content_path = to_content_path;

    var obj_this = this;

    this.mobile_const_content_load = () => { 

        // needed variables
        // --------------------------------

        var helpers_variables = {
            switcher: null,
            width: $(window).width(),
            menu_switch: 0,
            switch_mob_con: 0
        }

        var PC_cosnt_content = {
            menu: $("#main-nav"),
            menu_parent: $("#page")

        };

        var mobile_const_content = {
            menu_button: $("<div id='menu_button'></div>"),
            mob_clicker: $("<li><span>&#9776;<span></li>"),
            menu_mob: PC_cosnt_content.menu.clone(),
            box_media_mob: $("<aside id='mobile_media'></aside>"),
            hidden_tel: $("<div id='hidden_tel'></div>")
        };

        // --------------------------------------

        // -------------------------------------
        // adding events
            
            mobile_const_content.menu_button[0].onclick = () => {
                if(helpers_variables.menu_switch == 0){
                    $('#menu_button').css("height", "500px");
                    helpers_variables.menu_switch = 1;
                }
                else{
                    $('#menu_button').css("height", "68px");
                    helpers_variables.menu_switch = 0;
                }
            }
        // ---------------------------------------



        // creating structure
        // ---------------------------------------
        // (div)menu_button > (nav)main_nav_mobile > (ul)main-nav-list > (li):first - button' (li):rest - options
            mobile_const_content.menu_mob.attr("id", "main_nav_mobile");
            mobile_const_content.mob_clicker.append(mobile_const_content.box_media_mob);
            $(mobile_const_content.menu_mob[0].firstElementChild).prepend(mobile_const_content.mob_clicker);
            mobile_const_content.menu_button.append(mobile_const_content.menu_mob);
        // --------------------------------------

        // filling mobile-media-elements with content
        // ----------------------------------
            $.post(to_content_path + '/../' + 'mobile_media/hidden_tel.html', {}, function(data){
                mobile_const_content.hidden_tel.append(data);
            });
            
            
            
            $.post(to_content_path + '/../' + 'mobile_media/mobile_med.html', {}, function(data){
                mobile_const_content.box_media_mob.append(data);
            });
            
            $("#page").click(function(){
                delete_tel_hidden();
                helpers_variables.switch_mob_con = 0;
            });
            
            // ---------------------------------------
            
            setInterval(function(){
                if(($(window).width() < width_limit)&&(helpers_variables.switcher !== 0)){
                    $("#page").append(mobile_const_content.hidden_tel);
                    PC_cosnt_content.menu.remove();
                    PC_cosnt_content.menu_parent.prepend(mobile_const_content.menu_button);
                    helpers_variables.switcher = 0;

                    mobile_const_content.box_media_mob.click(function(e){
                        e.stopPropagation();
                    });
                    $(mobile_const_content.box_media_mob[0].firstElementChild.firstElementChild).click(function(){
                        if(helpers_variables.switch_mob_con === 0){
                            show_hide_element($("#hidden_tel")[0], 0, 0, 1, "show");
                            helpers_variables.switch_mob_con = 1;
                        }
                        else{
                            delete_tel_hidden();
                            helpers_variables.switch_mob_con = 0;
                        }
                    });
                    
                }
                if(($(window).width() > width_limit)&&(helpers_variables.switcher === 0)){
                    mobile_const_content.hidden_tel.remove();
                    mobile_const_content.menu_button.remove();
                    PC_cosnt_content.menu_parent.append(PC_cosnt_content.menu);
                    helpers_variables.switcher = 1;
                }
            }, 100);

    }

}