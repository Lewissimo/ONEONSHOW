<section id="offer-text" class="text">
        <h3 class="main_content_color2 clickable" id="header_"></h3>
        
</section>

 <section id="offer-photo" class="photoBox">

</section>
 <script type="text/javascript">


     
     var ph_data = new photo_data(name_of_database_photo_classes.offer, null, {loadind: 'lazy'}, 'offer_photo');
     var place = new places("#offer-text", "#offer-photo", "#header_");
     var path = new pathes("../../contents", "offer/offer_text", "offer/offer_title");
     var element = new elements('offer', {class: "clickable _text"});
     var content_init_ = new content_init(place, path, ph_data, element);
     content_init_.load_page();
     
</script>
    <script type="text/javascript">
          add_listener._click('p.html', '._text');
          
    </script>