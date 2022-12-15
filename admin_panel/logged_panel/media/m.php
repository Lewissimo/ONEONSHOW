Dodaj nowy film: <input type="text" placeholder="adres URL" id="new_movie" name="new_movie_URL"><br>
<button class="button_3" id="add_media_movie">Dodaj</button><br>
<section id="movies-box">
</section>

<script type="text/javascript">

    $('#add_media_movie').click(function(){
        var m_address = $('#new_movie')[0].value;
        console.log(m_address)
        $.post('media/append_m.php', {addr: m_address}, function(data){
            location.reload();
        });
    })
    var place = new places("#movies-box", null, null);
    var path = new pathes("../../contents", "media_movies", null);
    var element = new elements("media", {dragable: true});
    var content_init_ = new content_init(place, path, null, element);
    content_init_.load_page();
    set_ph_events('.movie_box', '../php/change_mov_order.php');
    add_listener._click('delete.html', '.movie_box');
</script>
