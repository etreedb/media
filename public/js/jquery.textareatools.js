/**
 * jQuery Textarea Tools
 *
 * @usage
    // Run texttools on all textareas
    jQuery('textarea').textareaTools();
 *
 * @author Tom Anderson <tom.h.anderson@gmail.com>
 */

var charmapField = '';

jQuery(function() {
  jQuery.fn.textareaTools = function(options) {

    // Create the containing div
    f = this; // used like a use() in helper pattern

    if (options === undefined) {
      options = {
        include: {
          timings: true,
          tracks: true,
          proper: true,
          unescape: true,
          nobr: true,
          tokenize: true,
          map: true
        }
      };
    }

    if (this.context.nodeName.toLowerCase() != 'textarea') {
        // alert(this.context.nodeName.toLowerCase());
        // alert('reject');
        return;
    }

    dock = jQuery('<div class="textareatools"></div>');

    /**
     * This is a helper bucket pattern.
     * The buttons array is a collection of helper
     * classes.  These helpers define how to create
     * their element and contains the functions
     * bound to the element events.
     */
    buttons = new Array();

    if (options.include.timings) {
      buttons[buttons.length] = {
        title: "No Timings",
        field: f,
        direct: function() {
          // /[\[\( ][0-9]{1-2}[\.:][0-9]{1-2}/mg
          jQuery(this).data('helper').field.val(jQuery(this).data('helper').field.val().replace(/[\[\( ]*\d{1,2}[\.:]\d{1,2}?(.\d\d)[\]\) ]*/g, '').replace(/[\[\( ]*\d{1,2}[\.:]\d{1,2}[\]\) ]*/g, ''));
          jQuery(this).data('helper').field.trigger('keyup');
        },
        test: function() {
          return this.field.val() == this.field.val().replace(/[\[\( ]*\d{1,2}[\.:]\d{1,2}?(.\d\d)[\]\) ]*/g, '').replace(/[\[\( ]*\d{1,2}[\.:]\d{1,2}[\]\) ]*/g, '');
        }
      }
    }

    if (options.include.tracks) {
      buttons[buttons.length] = {
        title: "No Track #'s",
        field: f,
        direct: function() {
          jQuery(this).data('helper').field.val(jQuery(this).data('helper').field.val().replace(/^[0-9]{1,3}[:\)-\.\t ][-:]?[ \t]*/mg, '').replace(/^[dsDS][0-9][tT][0-9]{1,2}[:\)-\.\t ][-:]?[ \t]*/mg, ''));
          jQuery(this).data('helper').field.trigger('keyup');
        },
        test: function() {
          return (this.field.val() == this.field.val().replace(/^[0-9]{1,3}[:\)-\.\t ][-:]?[ \t]*/mg, '').replace(/^[dsDS][0-9][Tt][0-9]{1,2}[:\)-\.\t ][-:]?[ \t]*/mg, ''));
        }
      }
    }

    if (options.include.proper) {
      buttons[buttons.length] = {
        title: "Proper Case",
        field: f,
        direct: function() {
          jQuery(this).data('helper').field.val(jQuery(this).data('helper').field.val().ucFirst());
          jQuery(this).data('helper').field.trigger('keyup');
        },
        test: function() {
          return this.field.val().trim() == this.field.val().ucFirst().trim();
        }
      }
    }

    if (options.include.unescape) {
      buttons[buttons.length] = {
        title: "Unescape Quotes",
        tooltop: "Remove \' and \"",
        field: f,
        direct: function() {
          f = jQuery(this).data('helper').field;
          jQuery(f).val(jQuery(f).val().replace(/(\\')/g,"'").replace(/(\\")/g, '"'));

          jQuery(this).data('helper').field.trigger('keyup');
        },
        test: function() {
          return this.field.val() == this.field.val().replace(/(\\')/g,"").replace(/(\\")/g, '"');
        }
      }
    }

    if (options.include.nobr) {
      buttons[buttons.length] = {
        title: "No &lt;br&gt;",
        field: f,
        direct: function() {
          jQuery(this).data('helper').field.val(jQuery(this).data('helper').field.val().replace(/(\<[BRbr]{2}.?\/?\>)/g,""));
          jQuery(this).data('helper').field.trigger('keyup');
        },
        test: function() {
          return this.field.val() == this.field.val().replace(/(\<[BRbr]{2}.?\/?\>)/g,"");
        }
      }
    }

    if (options.include.tokenize) {
      buttons[buttons.length] = {
        title: "Tokenize Slashes",
        field: f,
        direct: function() {
          jQuery(this).data('helper').field.val(jQuery(this).data('helper').field.val().replace(/[\/\\]/g,"\n"));
          jQuery(this).data('helper').field.trigger('keyup');
        },
        test: function() {
          return this.field.val() == this.field.val().replace(/[\/\\]/g,"\n");
        }
      }
    }

    if (options.include.map) {
      buttons[buttons.length] = {
        title: "Character Map",
        field: f,
        limited: true,
        direct: function() {
          charmapField = jQuery(f).context;
          handle = window.open("/charmap.html", 'charmap','toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,width=420,height=490,resizable=1');
          handle.focus();
        },
        test: function() {
          return true;
        }
      }
    }

    // Build <li> for each tool
    ul = jQuery('<ul style="margin-bottom: 0; padding-left: 0" class="btn-group" />');
    for (button = 0; button < buttons.length; button++) {
      li = jQuery('<li class="btn btn-sm btn-outline-primary">' + buttons[button].title.replace(/ /g, "&nbsp;") + '</li>');

      li.attr('title', buttons[button].tooltip);
      jQuery(li).data('helper', buttons[button])
      li.click(jQuery(li).data('helper').direct);
      ul.append(li);
    }

    // Build and position container
    jQuery(dock).append(ul);
    jQuery(dock).insertBefore(this);
    jQuery(this).data('helper', ul);

    // Bind keyup to data checking functions of tools
    jQuery(this).keyup(function(event) {
      jQuery(this).data('helper').find('li').each(function(index, node) {
        if(!jQuery(node).data('helper').test()) {
          jQuery(this).addClass('btn-danger');
          jQuery(this).removeClass('btn-outline-primary');
        } else {
          jQuery(this).removeClass('btn-danger');
          jQuery(this).addClass('btn-outline-primary');
        }
      });
    });
  }
});
