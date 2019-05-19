/**
 * jquery.byteFormat.js
 *
 * A plugin to display an integer field in abbreviated bytes
 *
 * @author tom.h.anderson@gmail.com
 * @author bytesToSize http://codeaid.net/javascript/convert-size-in-bytes-to-human-readable-format-%28javascript%29
 *
 */


function bytesToSize(bytes, precision)
{
  var kilobyte = 1024;
  var megabyte = kilobyte * 1024;
  var gigabyte = megabyte * 1024;
  var terabyte = gigabyte * 1024;

  if ((bytes >= 0) && (bytes < kilobyte)) {
    return bytes + ' B';
  } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
    return (bytes / kilobyte).toFixed(precision) + ' KB';

  } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
    return (bytes / megabyte).toFixed(precision) + ' MB';

  } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
    return (bytes / gigabyte).toFixed(precision) + ' GB';

  } else if (bytes >= terabyte) {
    return (bytes / terabyte).toFixed(precision) + ' TB';
  } else {
    return bytes + ' B';
  }
}

jQuery(function() {
  jQuery.fn.byteFormat = function(options) {
    div = jQuery('<div style="display: inline; font-weight: bold;"> '
      + bytesToSize(Number(jQuery(this).val()), 2) + '</div>');

    jQuery(this).data('view', div);
    jQuery(div).insertAfter(jQuery(this));

    const calculate = function(event) {
      val = Number(jQuery(this).val().replace(/\,/g,'').replace(/\ /g,''));

      if (val < 1000) {
          jQuery(this).data('view').html(' ' + val + ' MB');
      } else if (val >= 1000 && val < 100000) {
          jQuery(this).data('view').html(' ' + bytesToSize(val * 1000000, 2));
      } else {
          jQuery(this).data('view').html(' ' + bytesToSize(val, 2));
      }
    }

    jQuery(this).keyup(calculate());
    jQuery(this).blur(calculate());
  }
});
