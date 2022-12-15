

<label for="input_galery-file" class="button_3">Dodaj zdjęcie</label>
<input id="input_galery-file" style="display: none" type="file" name="background_brightness" id="background_brightness">
<progress value="0" max="100"></progress>

<section id="photo-space">
</section>
<script type="text/javascript">
         var ph_data = new photo_data(name_of_database_photo_classes.galery, null, {loadind: 'lazy', class: 'grabable', draggable: 'true'}, 'galery_photo_');
         var path = new pathes("../../contents", null, null);
         var place = new places("#photo-space", "#photo-space", null);
         var element = new elements('galery', null);
         var content_init_ = new content_init(place, path, ph_data, element);
        content_init_.load_page();
        set_ph_events('.grabable', '../php/change_ph_order.php');

        add_listener._click('delete_photo.html', '.grabable');
        var pointer = setInterval(function(){
                if($('.grabable')[0]){
                        $('.grabable').click(function(){
                                var th_path = $(this).attr('src');
                                console.log(th_path);
                                sessionStorage.setItem('path', th_path);
                        });
                        clearTimeout(pointer);
                }
        })
</script>
