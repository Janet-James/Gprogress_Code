//List box: Multiselected start*************************
! function(a) {
    function b(b, c) {
        if (b.wrapper.selected.html(""), b.wrapper.non_selected.html(""), b.wrapper.search) var d = b.wrapper.search.val();
        var e = [];
        b.find("option").each(function() {
            var b = a(this),
                c = b.prop("value"),
                d = b.text(),
                f = b.is(":selected");
            e.push({
                value: c,
                label: d,
                selected: f,
                element: b
            })
        }), e.forEach(function(c) {
            var e = a('<a tabindex="0" role="button" class="item"></a>').text(c.label).data("value", c.value);
            if (c.selected) {
                e.addClass("selected");
                var f = e.clone();
                f.click(function() {
                    c.element.prop("selected", !1), b.change()
                }), f.keypress(function() {
                    32 !== event.keyCode && 13 !== event.keyCode || (event.preventDefault(), c.element.prop("selected", !1), b.change())
                }), b.wrapper.selected.append(f)
            }
            e.click(function() {
                c.element.prop("selected", "selected"), b.change()
            }), e.keypress(function() {
                32 !== event.keyCode && 13 !== event.keyCode || (event.preventDefault(), c.element.prop("selected", "selected"), b.change())
            }), d && "" != d && c.label.toLowerCase().indexOf(d.toLowerCase()) === -1 || b.wrapper.non_selected.append(e)
        })
    }
    a.fn.multi = function(c) {
        var d = a.extend({
            enable_search: !0,
            search_placeholder: "Search..."
        }, c);
        return this.each(function() {
            var c = a(this);
            if (!c.data("multijs") && c.prop("multiple")) {
                c.css("display", "none"), c.data("multijs", !0);
                var e = a('<div class="listbox-multi">');
                if (d.enable_search) {
                    var f = a('<input class="search-input" id="permission_search" type="text" /><i class="nf nf-search"></i>').prop("placeholder", d.search_placeholder);
                    f.on("input change keyup", function() {
                        b(c, d)
                    }), e.append(f), e.search = f
                }
                var g = a('<div class="list-mulit-selected">'),
                    h = a('<div class="selected-wrapper">');
                e.append(g), e.append(h), e.non_selected = g, e.selected = h, c.wrapper = e, c.after(e), b(c, d), c.change(function() {
                    b(c, d);
                    
                })
            }
        })
    }
}(jQuery);
//************************************************