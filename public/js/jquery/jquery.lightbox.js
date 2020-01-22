Lightbox: {
    init: function() {
        /**
         * Add the lightbox
         */
        $('body').append('<div id="light" class="dbLightboxBody">'
                         + '<div class="close"><button class="close">Close</button></div>'
                         + '<span class="content">This is the lightbox content. </span></div>');

        $('body').append('<div id="fade" class="dbLightboxMask"></div>');

       /**
        * Move the lightbox on resize
        */
       $(window).resize(function(node) {
            // Center the centering div
            $('.dbLightboxBody').css('left', (($(window).width() - $('.dbLightboxBody').width()) / 2));
            $('.dbLightboxMask').css('height', $(window.document).height());

            // Center vertically
            var minTop = 30;
            var top = (($(window).height()  - $('.dbLightboxBody').height()) / 2);
            if (top < minTop) top = minTop;
            top += $(document).scrollTop();
            $('.dbLightboxBody').css('top', top);
        });

        // Close the lightbox
        $('.close').live('click', function(event) {
            Lightbox.close();
        });
    },

    show: function(content) {
        this.empty();

        $('#light .content').append(content);
        var copy = '<p class="copy about">'
                   + '&copy ' + new Date().getFullYear() + ' <a href="#" class="about">etreedb.org</a></p>';

        $('#light .content').append(copy);

        // Bind [esc] to close lightbox
        $(document).bind('keypress', function(event) {
            if (event.keyCode == 27) {
                $('.close').click();
            }
        });

        $('#light').show();
        $('#fade').show();
        $(window).resize();
    },

    empty: function() {
        $('#light .content').empty();
    },

    close: function() {
        $(document).unbind('keypress', false);
        $('#light').hide();
        $('#fade').hide();
    }
}
