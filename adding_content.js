    var name_of_database_photo_classes = {
        home:'homebg',
        offer:'offerbg',
        contact:'contactbg',
        about:'aboutbg',
        about_mobile:'about_mobile_bg',
        galery:'galery_p'
    };


    var name_of_php_files = {
        get_text: 'get_text.php',
        get_general_contact: 'get_general_contact.php',
        get_media_movie: 'get_media_movie.php',
        get_participant: 'get_participant.php',
        get_photo_path: 'get_photo_path.php',
        get_contact: 'get_contact.php'
    };


    function elements(page, attr){
        this.page = page;
        this.attr = attr;
    }
    
    function photo_data(photo_class, photo_places_tab, photo_attributes, photoid){
        this.photo_class = photo_class;
        this.photo_places_tab = photo_places_tab;
        this.attr = photo_attributes;
        this.photoid = photoid;
    };
    

    function places(main_place_text, main_place_photo, title_place){
        this.main_place_text = main_place_text;
        this. main_place_photo = main_place_photo;
        this.title_place = title_place;
    };

    function pathes(to_content_path, to_text_content_path, to_title_content_path){
        this.to_content_path = to_content_path;
        this.to_text_content_path = to_text_content_path;
        this.to_title_content_path = to_title_content_path;
    };
    
    
    function add_attributes(attr, element){
        $.each(attr, function(key, value){
            $(element).attr(key, value);
        })
        return element;
    }

    
    function content_init(place, path, photos_data, elements_data){
        // main_place_text - element storing and reloding text data.          type - string
        // main_place_photo - element storing and reloding photo data.          type - string
        // title_place - this is the table of pre-set elements arreanged in planned structure which just need to be filled by text       type - table
        // to_content_path - this is path to folder with files which are responsible for mechanic of realoading and storage data        type - string
        // to_text_content_path - this is the table of paths which lead to files filled text-data       type - table
        // photos-data - object whith to elements: photos_data.photo_class (which include database class of photo), photos_data.photo_places_tab which include all places to append photo
        // this is object of names of php files with needed functions       type - object
        // set of elements in a fixed order
        
        if(place){
            this.main_place = place.main_place_text;
            this.main_place_photo = place.main_place_photo;
            this.title_place = place.title_place;
        }

        if(path){
            this.to_content_path = path.to_content_path;
            this.to_text_content_path = path.to_text_content_path;
            this.to_title_content_path = path.to_title_content_path;
        }

        if(photo_data){
            this.photos_data = photos_data;
        }

        if(elements_data){
            this.elements_attr_list = elements_data.attr;
            this.page = elements_data.page;
        }
        var obj_this = this;



        // -------------------------
        function load_text(){
            $.post(obj_this.to_content_path + "/" + name_of_php_files.get_text, {path: obj_this.to_text_content_path}, function(data){
                var root = $("paragraph", data);
                
                root.each(function(index){
                    var el = $('<p id="par_' + index + '"></p>');
                    add_attributes(obj_this.elements_attr_list, el);
                    
                    $(obj_this.main_place).append(el.append($("text", root)[index].textContent));
                });


            });

        }


        // ----------------------------
        function load_participants(){
            $.post(obj_this.to_content_path + "/" + name_of_php_files.get_participant, {}, function(data){
                var root = $("participant", data);
                var table_of_photos = [];
                root.each(function(index){
                    $(obj_this.main_place).append('<span id="for_participant"' + index + '"><img class="participant_photo" src="' + obj_this.to_content_path + '/' + $("path", root)[index].textContent + '"></span><p class="participant" id="participant_' + index + '"><strong class="main_content_color1">' + $("first_name", root)[index].textContent + ' ' + $("last_name", root)[index].textContent + '</strong>' + $("description", root)[index].textContent + '</p>');
                    table_of_photos[index] = $("path", root)[index].textContent;
                });
                $(obj_this.main_place).append('<hr>');


        });}
        

        // ----------------------------
        function load_media_movies(){
            $.post(obj_this.to_content_path + "/" + name_of_php_files.get_media_movie, {}, function(data){
                var root = $("link", data);
                root.each(function(index){
                    $(obj_this.main_place).append('<div class="movie_box" id="movie' + index + '" draggable="true"><iframe src="' + $("ready_link", root)[index].textContent + '" draggable="true" id="movie_' + index + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>');
                });
            });
        }
        


        // -------------------

        function load_contact (){
            $.post(obj_this.to_content_path + "/" + name_of_php_files.get_contact, {}, function(data){
                var root = $("contact", data);
                root.each(function(i){
                    $(obj_this.main_place).append('<address id="addr_' + (i+1) + '">' + $('name', root)[i].textContent + '<br><a href="mailto:' + $('email', root)[i].textContent + '">' + $('email', root)[i].textContent + '</a><br><a href="tel:' + $('phone', root)[i].textContent + '">' + $('representative_phone', root)[i].textContent + '</a></address>');
                });
            });
        }
        


        // ------------------

        function add_photo (which_child, attr, _class){
            $.post(obj_this.to_content_path + "/" + name_of_php_files.get_photo_path, {class: _class}, function(data){
                var root = $("photo", data);
                var place = $(obj_this.main_place)[0].children[which_child];
                root.each(function(index){
                    var el = $('<img src="' + obj_this.to_content_path + '/' + $("path",this)[0].textContent + '">');
                    if(attr){
                        add_attributes(attr, el);
                    }
                        $(el).insertBefore(place);
                    
                });
            });
        }
        


        
        this.load_page = () => {
            sessionStorage.setItem('current_page', this.page);
            console.log(this.page);
            // adding text into pointed elements
            if(obj_this.title_place){
                $.post(this.to_content_path + "/" + name_of_php_files.get_text, {path: this.to_title_content_path}, function(data){
                    var root = $("paragraph", data);
                    root.each(function(){
                        var root = $("paragraph", data);
                        var el = $(obj_this.title_place);
                        root.each(function(index){
                            $(el).html($("text", root)[index].textContent);
                        });
                    });
                });
            }
            // adding prepared elements into main element with pointed text
            if(obj_this.page){
                switch(this.page){
                    case "home":
                        $.ajax({
                            url:load_text(),
                            success:function(){add_photo(0, {class: 'mobile_img'}, name_of_database_photo_classes.home);
                        }
                    });
                        break;
                    case "offer":
                        $.ajax({
                            url:load_text(),
                            success:function(){add_photo(1, {class: 'mobile_img'}, name_of_database_photo_classes.offer);
                                }
                        });
                           
                         break;
                    case "media":
                            load_media_movies();
                        break;
                    case "about":
                        $.ajax({
                            url:load_participants(),
                            success:function(){
                            load_text();
                        }
                        });
                        break;
                    case "contact":
                            load_contact();
                        break;
                    default:
                            console.log("Error of specify name of subpage in 'content_init' object.");
                        break;
                }
            }
            // adding media movies 
          

            




            // adding photos

                if(this.photos_data !== null){
                    $.post(this.to_content_path + "/" + name_of_php_files.get_photo_path, {class: this.photos_data.photo_class}, function(data){
                        var root = $("photo", data);
                        root.each(function(index){
                            var place = null;
                            var el = $("<img id='" + obj_this.photos_data.photoid + (index + 1) + "' src='" + obj_this.to_content_path + "/" + $("path",this)[0].textContent + "'>");
                            
                            if(obj_this.photos_data.attr !== null){
                                el = add_attributes(obj_this.photos_data.attr, el);
                            }
                            if(place !== null){
                                $(place[index]).insertBefore(el);
                            }
                            else{
                                $(obj_this.main_place_photo).append(el);
                            }
                        });
                    });
                }




        


        }
    }
    