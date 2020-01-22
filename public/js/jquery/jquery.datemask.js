/**
 * datemask.js
 *
 * @author toma@etree.org
 * @revision 1.2
 *
 * etreedb.org
 * Copyright 1999-2011 (c) Tom Anderson
 *
 * You are permitted and encouraged to use this code in your own
 * programs for fun or for profit as you see fit. A simple comment
 * in the code giving credit would be courteous but is not required.
 *
 * usage:
 *      $(field).datemask();
 *
 *  To force a good date you can try playing with
 *  onBlur="Javascript: checkDate(this.value);");
 *
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

var DateMask = (function () {
    function DateMask(element, options) {
        var defaults = {
            cursorKeys: [
                17,
                8,
                46,
                37,
                38,
                39,
                40,
                33,
                34,
                35,
                36,
                45
            ]
        };

        this.$element = $(element);
        this.options = $.extend({
        }, defaults, options);
        this.listen();
    }

    DateMask.prototype.keypress = function (event) {
        if (this.options.cursorKeys.indexOf(event.keyCode) != -1) return;

        var m0 = /(^\?$)/;
        var m1 = /(^[2-9]$)|(^1\/$)/;
        var m2 = /^[1-2][3-9]$/;
        var m3a = /^[0][0]$/;
        var m3 = /(^[0-1][0-9]$)|(^[1-9]\/$)/;
        var m4 = /(^[0-1][0-9]\/[4-9]$)|(^[0-1][0-9]\/[1-9]\/$)/;
        var m5 = /^[0-1?][0-9?]\/[4-9][0-9]$/;
        var m6 = /^[0-1?][0-9?]\/[3-9][2-9]$/;
        var m7a = /^[0-1?][0-9?]\/[0]{2}$/;
        var m7 = /^[0-1?][0-9?]\/[0-3][0-9]$/;
        var m8 = /^[0-1?][0-9?]\/[0-3?][0-9?]\/([0][0-9]|[1][0-3])$/;
        var m9 = /^[0-1?][0-9?]\/[0-3?][0-9?]\/([02-9][1-9]|[1][4-7])$/;

        if (m0.test(this.$element.val())) {
            // Check for unknown
            this.$element.val("?" + this.$element.val().substring(0,1) + "/");
        } else if (m1.test(this.$element.val())) {
            // Check for Mar-Dec date
            this.$element.val("0" + this.$element.val().substring(0,1) + "/");
        } else if (m2.test(this.$element.val())) {
            // Check for invalid month
            this.$element.val("1");
        } else if (m3a.test(this.$element.val())) {
            // If valid month, advance
            this.$element.val(this.$element.val().substr(0, 1));
        } else if (m3.test(this.$element.val())) {
            // If valid month, advance
            this.$element.val(this.$element.val() + '/');
        } else if (m4.test(this.$element.val())) {
            // Check for day < 10
            this.$element.val(this.$element.val().substring(0,3) + "0" + this.$element.val().substring(3) + "/");
        } else if (m5.test(this.$element.val())) {
            // Check for invalid day
            this.$element.val(this.$element.val().substring(0,3));
        } else if (m6.test(this.$element.val())) {
            // Verify date < 32
            this.$element.val(this.$element.val().substring(0,4));
        } else if (m7a.test(this.$element.val())) {
            this.$element.val(this.$element.val().substring(0, 4));
        } else if (m7.test(this.$element.val())) {
            this.$element.val(this.$element.val() + "/");
        } else if (m8.test(this.$element.val())) {
            // Prepend 20 to year
            this.$element.val(this.$element.val().substring(0,6) + "20" + this.$element.val().substring(6));
        } else if (m9.test(this.$element.val())) {
            // Prepend 19 to year
            this.$element.val(this.$element.val().substring(0,6) + "19" + this.$element.val().substring(6));
        }

        if (this.$element.val().substring(this.$element.val().length - 2) == '//') {
            this.$element.val(this.$element.val().substring(0, this.$element.val().length - 1));
        }

        return true;
    }

    DateMask.prototype.listen = function () {
        this.$element.on('keyup', $.proxy(this.keypress, this));
    }

    return DateMask;
})();

$.fn.datemask = function (option) {
    return this.each(function() {
        var $this = $(this),
            data = $this.data('datemask'),
            options = typeof option == 'object' && option;
        if(!data) {
            $this.data('datemask', (data = new DateMask(this, options)));
        }
        if(typeof option == 'string') {
            data[option]();
        }
    });
};
