

<section id="about-text" class="text">
    
    



    </section>
    
    
    <section id="photoBox" class="photoBox">
    </section>
    <script type="text/javascript">    
    console.log('start about script');
         var ph_data = new photo_data(name_of_database_photo_classes.about, null, null, 'about_photo');
         var place = new places("#about-text", "#photoBox", null);
         var path = new pathes("../../contents", "about", null);
         var element = new elements('about', {class: 'clickable _text'});
         var content_init_ = new content_init(place, path, ph_data, element);
         content_init_.load_page();
         console.log('end about script');
    </script>
    <script type="text/javascript">

          add_listener._click('p.html', '._text');
          
    </script>