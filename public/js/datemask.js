/**
 * datemask.js
 *
 * The function datemask is used to quickly enter a mm/dd/yyyy date
 * into a text field.
 *
 * Coded for jQuery for db.
 *
 * etree.org
 * Copyright 1999-2018 (c) Tom H Anderson; All Rights Reserved
 */

// Check for valid mm/dd/yyyy date format
function checkDate(as_date) {
    var reg = new RegExp("([0-9?]{1,2})[/]([0-9?]{1,2})[/]([0-9?]{4})");
    var regArray = reg.exec(as_date);
    var index = -1;
    var lastIndex = -1;

    if (navigator.userAgent.toLowerCase().indexOf("msie") != -1) {
        index = RegExp.index;
        lastIndex = RegExp.lastIndex;
    } else {
        index = 0;
        lastIndex = as_date.length;
    }

    // Check for mm/dd/yyyy
    if (!regArray || index != 0 || lastIndex != as_date.length) {
        return false ;
    } else {
        var check_date = new Date(Number(regArray[3]), Number(regArray[1]) - 1, Number(regArray[2]));
        // If any part of the date is a '?' assume good
        if (regArray[1] == '??' || regArray[2] == '??') {
            return true;
        }
        // check for month or day out of range
        if (check_date.getMonth() != Number(regArray[1]) - 1 || check_date.getDate() != Number(regArray[2])) {
            return false;
        }
    }

    // Date checks passed
    return true
}


// Mask the passed field to mm/dd/yyyy
jQuery(function() {
    jQuery.fn.extend ({
      datemask: function($event)
        {
          const cursorKeys = '17;8;46;37;38;39;40;33;34;35;36;45;';
          if (cursorKeys.indexOf($event.keyCode + ';') !== -1) {
            return true;
          }

          const debug = false;
          const target = ($event.target);

          // Verify only valid characters
          const mA = /([^0-9^\/^\?])$/;

          // Check for question mark only
          const m0 = /(^\?$)/;

          // Check for day question mark
          const m0a = /^.{2}\/\?$/;

          // Check for day question mark
          const m0b = /^.{2}\/.\?$/;

          // Check for Mar-Dec date
          const m1 = /(^[2-9]$)|(^1\/$)/;

          // Check for invalid month
          const m2 = /^[1-2][3-9]$/;

          // If valid month, advance
          const m3a = /^[0][0]$/;

          // If valid month, advance
          const m3 = /(^[0-1][0-9]$)|(^[1-9]\/$)/;

          // Check for day < 10
          const m4 = /(^[0-1][0-9]\/[4-9]$)|(^[0-1][0-9]\/[1-9]\/$)/;

          // Check for invalid day
          const m5 = /^[0-1?][0-9?]\/[4-9][0-9]$/;

          // Verify date < 32
          const m6 = /^[0-1?][0-9?]\/[3-9][2-9]$/;

          // Check for day > 10
          const m4a = /^.{5}$/;

          const m7a = /^[0-1?][0-9?]\/[0]{2}$/;
          const m7 = /^[0-1?][0-9?]\/[0-3][0-9][\/]$/;

          // Prepend 20 to year
          const m8 = /^[0-1?][0-9?]\/[0-3?][0-9?]\/([0][0-9]|[1][0-8]|[2][1])$/;

          // Prepend 19 to year
          const m9 = /^[0-1?][0-9?]\/[0-3?][0-9?]\/([03-9][0-9]|[2][2-9])$/;

          if (mA.test(target.value)) {
            if (debug) {
              alert('mA');
            }
            target.value = target.value.substring(0, target.value.length - 1);
          } else if (m0.test(target.value)) {
            if (debug) {
              alert('m0');
            }
            target.value = '?' + target.value.substring(0, 1) + '/';
          } else if (m0a.test(target.value)) {
            if (debug) {
              alert('m0a');
            }
            target.value = target.value + '?/';
          } else if (m0b.test(target.value)) {
            if (debug) {
              alert('m0b');
            }
            target.value = target.value + '/';
          } else if (m1.test(target.value)) {
            if (debug) {
              alert('m1');
            }
            target.value = '0' + target.value.substring(0, 1) + '/';
          } else if (m2.test(target.value)) {
            if (debug) {
              alert('m2');
            }
            target.value = '1';
          } else if (m3a.test(target.value)) {
            if (debug) {
              alert('m3a');
            }
            target.value = target.value.substr(0, 1);
          } else if (m3.test(target.value)) {
            if (debug) {
              alert('m3');
            }
            target.value = target.value + '/';
          } else if (m4.test(target.value)) {
            if (debug) {
              alert('m4');
            }
            target.value = target.value.substring(0, 3) + '0'
              + target.value.substring(3) + '/';
            } else if (m5.test(target.value)) {
            if (debug) {
              alert('m5');
            }
            target.value = target.value.substring(0, 3);
          } else if (m6.test(target.value)) {
            if (debug) {
              alert('m6');
            }
            target.value = target.value.substring(0, 4);
          } else if (m4a.test(target.value)) {
            if (debug) {
              alert('m4a');
            }
            target.value = target.value + '/';
        } else if (m7a.test(target.value)) {
            if (debug) {
              alert('m7a');
            }
            target.value = target.value.substring(0, 4);
          } else if (m7.test(target.value)) {
            if (debug) {
              alert('m7');
            }
            target.value = target.value + '/';
          } else if (m8.test(target.value)) {
            if (debug) {
              alert('m8');
            }
            target.value = target.value.substring(0, 6) + '20' + target.value.substring(6);
          } else if (m9.test(target.value)) {
            if (debug) {
              alert('m9');
            }
            target.value = target.value.substring(0, 6) + '19' + target.value.substring(6);
          }

          if (target.value.substring(target.value.length - 2) === '\/\/') {
              target.value = target.value.substring(0, target.value.length - 1);
          }

          return true;
        }
    });
});
