
class add_par{
     hide_b = new add_events();

    #textarea = $('<textarea class="text_box"></textarea>');
    #element = $('<p class="clickable _text"></p>');
    
     #which_position(el){
          var position;
          $(document).find('._text').each(function(index){
               if(el.attr('id') == $(this).attr('id')){
                    position = index;
                    return
               }
          });
          return position;
     }
    #enter_text(element, el, function_, label){
              
              let txt = element[0].value;
              el.append(txt);
              var amount_of_added = sessionStorage.getItem('added');
              el.attr("id", "added" + amount_of_added);
              add_listener.add_singleText_click_event('added' + amount_of_added, "ac_box_content/p.html");
              amount_of_added++;
              sessionStorage.setItem('added', amount_of_added);
              
              element.wrap(el);
              $(element).remove();
              var position_ = function_(el);
              var page_ = sessionStorage.getItem('current_page');
              
               console.log("page: " + page_ + " position: " + position_)
              $.post('../php/edit_texts.php', {page: page_, position: position_, action: label, new_text: txt}, function(data){
               console.log(data);
              });
         }     


    #add_ev(txa, label, element, position){
     var obj_this = this;
          this.hide_b.hide_ac_box();
         var function_ = this.#enter_text;
         var function_2 = this.#which_position; 
         var el = this.#element;
    txa.focusout(function(){
         if($(this)[0].value == ''){
              $(this).remove();
              if(element){ 
                    obj_this.delete_p(element, position);
              }
          }
         else{
          console.log('2');
              function_($(this), el, function_2, label);
         }

    });
    }
    

   add_below(element) {
        console.log(element[0]);
        let txa = (this.#textarea).clone();
        this.#add_ev(txa, "add", null, null);
        txa.insertAfter($(element));
   }

   add_above(element) {
       console.log(element);
       let txa = (this.#textarea).clone();
       this.#add_ev(txa, "add", null, null);
       txa.insertBefore($(element));
   }

   delete_p(element, position){
     this.hide_b.hide_ac_box();
     if(position == null){
          var position_ = this.#which_position(element);
     }
     else{
          var position_ = position;
     }
     var page_ = sessionStorage.getItem('current_page');
     console.log('p: '+page_+' pos: '+position_)
     $.post('../php/edit_texts.php', {page: page_, position: position_, action: 'remove'}, function(data){
          
     });

        console.log(element);

       $(element).remove();

   }

   Edit_element(element){
     var position = this.#which_position(element);
       let con = $(element).html();
       let txa = (this.#textarea).clone();
       this.#add_ev(txa, "edit", element, position);
       txa[0].value = con;
       $(element).wrap(txa);
       $(element).remove();
   }
}