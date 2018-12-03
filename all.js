! function(b) {
    "function" == typeof define && define.amd ? define(["jquery"], b) : "undefined" != typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(function(d) {
    var c = window.Slick || {};
    c = function() {
        function e(i, h) {
            var b, g = this;
            g.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: d(i),
                appendDots: d(i),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3000,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(f, j) {
                    return d('<button type="button" data-role="none" role="button" tabindex="0" />').text(j + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: 0.35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1000
            }, g.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, d.extend(g, g.initials), g.activeBreakpoint = null, g.animType = null, g.animProp = null, g.breakpoints = [], g.breakpointSettings = [], g.cssTransitions = !1, g.focussed = !1, g.interrupted = !1, g.hidden = "hidden", g.paused = !0, g.positionProp = null, g.respondTo = null, g.rowCount = 1, g.shouldClick = !0, g.$slider = d(i), g.$slidesCache = null, g.transformType = null, g.transitionType = null, g.visibilityChange = "visibilitychange", g.windowWidth = 0, g.windowTimer = null, b = d(i).data("slick") || {}, g.options = d.extend({}, g.defaults, h, b), g.currentSlide = g.options.initialSlide, g.originalSettings = g.options, "undefined" != typeof document.mozHidden ? (g.hidden = "mozHidden", g.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (g.hidden = "webkitHidden", g.visibilityChange = "webkitvisibilitychange"), g.autoPlay = d.proxy(g.autoPlay, g), g.autoPlayClear = d.proxy(g.autoPlayClear, g), g.autoPlayIterator = d.proxy(g.autoPlayIterator, g), g.changeSlide = d.proxy(g.changeSlide, g), g.clickHandler = d.proxy(g.clickHandler, g), g.selectHandler = d.proxy(g.selectHandler, g), g.setPosition = d.proxy(g.setPosition, g), g.swipeHandler = d.proxy(g.swipeHandler, g), g.dragHandler = d.proxy(g.dragHandler, g), g.keyHandler = d.proxy(g.keyHandler, g), g.instanceUid = a++, g.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, g.registerBreakpoints(), g.init(!0)
        }
        var a = 0;
        return e
    }(), c.prototype.activateADA = function() {
        var b = this;
        b.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, c.prototype.addSlide = c.prototype.slickAdd = function(a, h, g) {
        var f = this;
        if ("boolean" == typeof h) {
            g = h, h = null
        } else {
            if (0 > h || h >= f.slideCount) {
                return !1
            }
        }
        f.unload(), "number" == typeof h ? 0 === h && 0 === f.$slides.length ? d(a).appendTo(f.$slideTrack) : g ? d(a).insertBefore(f.$slides.eq(h)) : d(a).insertAfter(f.$slides.eq(h)) : g === !0 ? d(a).prependTo(f.$slideTrack) : d(a).appendTo(f.$slideTrack), f.$slides = f.$slideTrack.children(this.options.slide), f.$slideTrack.children(this.options.slide).detach(), f.$slideTrack.append(f.$slides), f.$slides.each(function(e, i) {
            d(i).attr("data-slick-index", e)
        }), f.$slidesCache = f.$slides, f.reinit()
    }, c.prototype.animateHeight = function() {
        var f = this;
        if (1 === f.options.slidesToShow && f.options.adaptiveHeight === !0 && f.options.vertical === !1) {
            var e = f.$slides.eq(f.currentSlide).outerHeight(!0);
            f.$list.animate({
                height: e
            }, f.options.speed)
        }
    }, c.prototype.animateSlide = function(a, h) {
        var g = {},
            f = this;
        f.animateHeight(), f.options.rtl === !0 && f.options.vertical === !1 && (a = -a), f.transformsEnabled === !1 ? f.options.vertical === !1 ? f.$slideTrack.animate({
            left: a
        }, f.options.speed, f.options.easing, h) : f.$slideTrack.animate({
            top: a
        }, f.options.speed, f.options.easing, h) : f.cssTransitions === !1 ? (f.options.rtl === !0 && (f.currentLeft = -f.currentLeft), d({
            animStart: f.currentLeft
        }).animate({
            animStart: a
        }, {
            duration: f.options.speed,
            easing: f.options.easing,
            step: function(b) {
                b = Math.ceil(b), f.options.vertical === !1 ? (g[f.animType] = "translate(" + b + "px, 0px)", f.$slideTrack.css(g)) : (g[f.animType] = "translate(0px," + b + "px)", f.$slideTrack.css(g))
            },
            complete: function() {
                h && h.call()
            }
        })) : (f.applyTransition(), a = Math.ceil(a), f.options.vertical === !1 ? g[f.animType] = "translate3d(" + a + "px, 0px, 0px)" : g[f.animType] = "translate3d(0px," + a + "px, 0px)", f.$slideTrack.css(g), h && setTimeout(function() {
            f.disableTransition(), h.call()
        }, f.options.speed))
    }, c.prototype.getNavTarget = function() {
        var a = this,
            e = a.options.asNavFor;
        return e && null !== e && (e = d(e).not(a.$slider)), e
    }, c.prototype.asNavFor = function(a) {
        var f = this,
            e = f.getNavTarget();
        null !== e && "object" == typeof e && e.each(function() {
            var b = d(this).slick("getSlick");
            b.unslicked || b.slideHandler(a, !0)
        })
    }, c.prototype.applyTransition = function(f) {
        var e = this,
            g = {};
        e.options.fade === !1 ? g[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : g[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(g) : e.$slides.eq(f).css(g)
    }, c.prototype.autoPlay = function() {
        var b = this;
        b.autoPlayClear(), b.slideCount > b.options.slidesToShow && (b.autoPlayTimer = setInterval(b.autoPlayIterator, b.options.autoplaySpeed))
    }, c.prototype.autoPlayClear = function() {
        var b = this;
        b.autoPlayTimer && clearInterval(b.autoPlayTimer)
    }, c.prototype.autoPlayIterator = function() {
        var f = this,
            e = f.currentSlide + f.options.slidesToScroll;
        f.paused || f.interrupted || f.focussed || (f.options.infinite === !1 && (1 === f.direction && f.currentSlide + 1 === f.slideCount - 1 ? f.direction = 0 : 0 === f.direction && (e = f.currentSlide - f.options.slidesToScroll, f.currentSlide - 1 === 0 && (f.direction = 1))), f.slideHandler(e))
    }, c.prototype.buildArrows = function() {
        var a = this;
        a.options.arrows === !0 && (a.$prevArrow = d(a.options.prevArrow).addClass("slick-arrow"), a.$nextArrow = d(a.options.nextArrow).addClass("slick-arrow"), a.slideCount > a.options.slidesToShow ? (a.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), a.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), a.htmlExpr.test(a.options.prevArrow) && a.$prevArrow.prependTo(a.options.appendArrows), a.htmlExpr.test(a.options.nextArrow) && a.$nextArrow.appendTo(a.options.appendArrows), a.options.infinite !== !0 && a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : a.$prevArrow.add(a.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, c.prototype.buildDots = function() {
        var f, e, a = this;
        if (a.options.dots === !0 && a.slideCount > a.options.slidesToShow) {
            for (a.$slider.addClass("slick-dotted"), e = d("<ul />").addClass(a.options.dotsClass), f = 0; f <= a.getDotCount(); f += 1) {
                e.append(d("<li />").append(a.options.customPaging.call(this, a, f)))
            }
            a.$dots = e.appendTo(a.options.appendDots), a.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, c.prototype.buildOut = function() {
        var a = this;
        a.$slides = a.$slider.children(a.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), a.slideCount = a.$slides.length, a.$slides.each(function(e, f) {
            d(f).attr("data-slick-index", e).data("originalStyling", d(f).attr("style") || "")
        }), a.$slider.addClass("slick-slider"), a.$slideTrack = 0 === a.slideCount ? d('<div class="slick-track"/>').appendTo(a.$slider) : a.$slides.wrapAll('<div class="slick-track"/>').parent(), a.$list = a.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), a.$slideTrack.css("opacity", 0), (a.options.centerMode === !0 || a.options.swipeToSlide === !0) && (a.options.slidesToScroll = 1), d("img[data-lazy]", a.$slider).not("[src]").addClass("slick-loading"), a.setupInfinite(), a.buildArrows(), a.buildDots(), a.updateDots(), a.setSlideClasses("number" == typeof a.currentSlide ? a.currentSlide : 0), a.options.draggable === !0 && a.$list.addClass("draggable")
    }, c.prototype.buildRows = function() {
        var u, t, s, r, q, p, o, v = this;
        if (r = document.createDocumentFragment(), p = v.$slider.children(), v.options.rows > 1) {
            for (o = v.options.slidesPerRow * v.options.rows, q = Math.ceil(p.length / o), u = 0; q > u; u++) {
                var n = document.createElement("div");
                for (t = 0; t < v.options.rows; t++) {
                    var m = document.createElement("div");
                    for (s = 0; s < v.options.slidesPerRow; s++) {
                        var l = u * o + (t * v.options.slidesPerRow + s);
                        p.get(l) && m.appendChild(p.get(l))
                    }
                    n.appendChild(m)
                }
                r.appendChild(n)
            }
            v.$slider.empty().append(r), v.$slider.children().children().children().css({
                width: 100 / v.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, c.prototype.checkResponsive = function(r, q) {
        var o, n, m, p = this,
            l = !1,
            k = p.$slider.width(),
            a = window.innerWidth || d(window).width();
        if ("window" === p.respondTo ? m = a : "slider" === p.respondTo ? m = k : "min" === p.respondTo && (m = Math.min(a, k)), p.options.responsive && p.options.responsive.length && null !== p.options.responsive) {
            n = null;
            for (o in p.breakpoints) {
                p.breakpoints.hasOwnProperty(o) && (p.originalSettings.mobileFirst === !1 ? m < p.breakpoints[o] && (n = p.breakpoints[o]) : m > p.breakpoints[o] && (n = p.breakpoints[o]))
            }
            null !== n ? null !== p.activeBreakpoint ? (n !== p.activeBreakpoint || q) && (p.activeBreakpoint = n, "unslick" === p.breakpointSettings[n] ? p.unslick(n) : (p.options = d.extend({}, p.originalSettings, p.breakpointSettings[n]), r === !0 && (p.currentSlide = p.options.initialSlide), p.refresh(r)), l = n) : (p.activeBreakpoint = n, "unslick" === p.breakpointSettings[n] ? p.unslick(n) : (p.options = d.extend({}, p.originalSettings, p.breakpointSettings[n]), r === !0 && (p.currentSlide = p.options.initialSlide), p.refresh(r)), l = n) : null !== p.activeBreakpoint && (p.activeBreakpoint = null, p.options = p.originalSettings, r === !0 && (p.currentSlide = p.options.initialSlide), p.refresh(r), l = n), r || l === !1 || p.$slider.trigger("breakpoint", [p, l])
        }
    }, c.prototype.changeSlide = function(a, p) {
        var m, l, k, o = this,
            n = d(a.currentTarget);
        switch (n.is("a") && a.preventDefault(), n.is("li") || (n = n.closest("li")), k = o.slideCount % o.options.slidesToScroll !== 0, m = k ? 0 : (o.slideCount - o.currentSlide) % o.options.slidesToScroll, a.data.message) {
            case "previous":
                l = 0 === m ? o.options.slidesToScroll : o.options.slidesToShow - m, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide - l, !1, p);
                break;
            case "next":
                l = 0 === m ? o.options.slidesToScroll : m, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide + l, !1, p);
                break;
            case "index":
                var j = 0 === a.data.index ? 0 : a.data.index || n.index() * o.options.slidesToScroll;
                o.slideHandler(o.checkNavigable(j), !1, p), n.children().trigger("focus");
                break;
            default:
                return
        }
    }, c.prototype.checkNavigable = function(g) {
        var j, i, f = this;
        if (j = f.getNavigableIndexes(), i = 0, g > j[j.length - 1]) {
            g = j[j.length - 1]
        } else {
            for (var h in j) {
                if (g < j[h]) {
                    g = i;
                    break
                }
                i = j[h]
            }
        }
        return g
    }, c.prototype.cleanUpEvents = function() {
        var a = this;
        a.options.dots && null !== a.$dots && d("li", a.$dots).off("click.slick", a.changeSlide).off("mouseenter.slick", d.proxy(a.interrupt, a, !0)).off("mouseleave.slick", d.proxy(a.interrupt, a, !1)), a.$slider.off("focus.slick blur.slick"), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow && a.$prevArrow.off("click.slick", a.changeSlide), a.$nextArrow && a.$nextArrow.off("click.slick", a.changeSlide)), a.$list.off("touchstart.slick mousedown.slick", a.swipeHandler), a.$list.off("touchmove.slick mousemove.slick", a.swipeHandler), a.$list.off("touchend.slick mouseup.slick", a.swipeHandler), a.$list.off("touchcancel.slick mouseleave.slick", a.swipeHandler), a.$list.off("click.slick", a.clickHandler), d(document).off(a.visibilityChange, a.visibility), a.cleanUpSlideEvents(), a.options.accessibility === !0 && a.$list.off("keydown.slick", a.keyHandler), a.options.focusOnSelect === !0 && d(a.$slideTrack).children().off("click.slick", a.selectHandler), d(window).off("orientationchange.slick.slick-" + a.instanceUid, a.orientationChange), d(window).off("resize.slick.slick-" + a.instanceUid, a.resize), d("[draggable!=true]", a.$slideTrack).off("dragstart", a.preventDefault), d(window).off("load.slick.slick-" + a.instanceUid, a.setPosition), d(document).off("ready.slick.slick-" + a.instanceUid, a.setPosition)
    }, c.prototype.cleanUpSlideEvents = function() {
        var a = this;
        a.$list.off("mouseenter.slick", d.proxy(a.interrupt, a, !0)), a.$list.off("mouseleave.slick", d.proxy(a.interrupt, a, !1))
    }, c.prototype.cleanUpRows = function() {
        var e, f = this;
        f.options.rows > 1 && (e = f.$slides.children().children(), e.removeAttr("style"), f.$slider.empty().append(e))
    }, c.prototype.clickHandler = function(f) {
        var e = this;
        e.shouldClick === !1 && (f.stopImmediatePropagation(), f.stopPropagation(), f.preventDefault())
    }, c.prototype.destroy = function(a) {
        var e = this;
        e.autoPlayClear(), e.touchObject = {}, e.cleanUpEvents(), d(".slick-cloned", e.$slider).detach(), e.$dots && e.$dots.remove(), e.$prevArrow && e.$prevArrow.length && (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()), e.$nextArrow && e.$nextArrow.length && (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove()), e.$slides && (e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            d(this).attr("style", d(this).data("originalStyling"))
        }), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.detach(), e.$list.detach(), e.$slider.append(e.$slides)), e.cleanUpRows(), e.$slider.removeClass("slick-slider"), e.$slider.removeClass("slick-initialized"), e.$slider.removeClass("slick-dotted"), e.unslicked = !0, a || e.$slider.trigger("destroy", [e])
    }, c.prototype.disableTransition = function(f) {
        var e = this,
            g = {};
        g[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(g) : e.$slides.eq(f).css(g)
    }, c.prototype.fadeSlide = function(f, e) {
        var g = this;
        g.cssTransitions === !1 ? (g.$slides.eq(f).css({
            zIndex: g.options.zIndex
        }), g.$slides.eq(f).animate({
            opacity: 1
        }, g.options.speed, g.options.easing, e)) : (g.applyTransition(f), g.$slides.eq(f).css({
            opacity: 1,
            zIndex: g.options.zIndex
        }), e && setTimeout(function() {
            g.disableTransition(f), e.call()
        }, g.options.speed))
    }, c.prototype.fadeSlideOut = function(f) {
        var e = this;
        e.cssTransitions === !1 ? e.$slides.eq(f).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(f), e.$slides.eq(f).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, c.prototype.filterSlides = c.prototype.slickFilter = function(f) {
        var e = this;
        null !== f && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(f).appendTo(e.$slideTrack), e.reinit())
    }, c.prototype.focusHandler = function() {
        var a = this;
        a.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(e) {
            e.stopImmediatePropagation();
            var b = d(this);
            setTimeout(function() {
                a.options.pauseOnFocus && (a.focussed = b.is(":focus"), a.autoPlay())
            }, 0)
        })
    }, c.prototype.getCurrent = c.prototype.slickCurrentSlide = function() {
        var b = this;
        return b.currentSlide
    }, c.prototype.getDotCount = function() {
        var f = this,
            e = 0,
            h = 0,
            g = 0;
        if (f.options.infinite === !0) {
            for (; e < f.slideCount;) {
                ++g, e = h + f.options.slidesToScroll, h += f.options.slidesToScroll <= f.options.slidesToShow ? f.options.slidesToScroll : f.options.slidesToShow
            }
        } else {
            if (f.options.centerMode === !0) {
                g = f.slideCount
            } else {
                if (f.options.asNavFor) {
                    for (; e < f.slideCount;) {
                        ++g, e = h + f.options.slidesToScroll, h += f.options.slidesToScroll <= f.options.slidesToShow ? f.options.slidesToScroll : f.options.slidesToShow
                    }
                } else {
                    g = 1 + Math.ceil((f.slideCount - f.options.slidesToShow) / f.options.slidesToScroll)
                }
            }
        }
        return g - 1
    }, c.prototype.getLeft = function(h) {
        var l, k, i, g = this,
            j = 0;
        return g.slideOffset = 0, k = g.$slides.first().outerHeight(!0), g.options.infinite === !0 ? (g.slideCount > g.options.slidesToShow && (g.slideOffset = g.slideWidth * g.options.slidesToShow * -1, j = k * g.options.slidesToShow * -1), g.slideCount % g.options.slidesToScroll !== 0 && h + g.options.slidesToScroll > g.slideCount && g.slideCount > g.options.slidesToShow && (h > g.slideCount ? (g.slideOffset = (g.options.slidesToShow - (h - g.slideCount)) * g.slideWidth * -1, j = (g.options.slidesToShow - (h - g.slideCount)) * k * -1) : (g.slideOffset = g.slideCount % g.options.slidesToScroll * g.slideWidth * -1, j = g.slideCount % g.options.slidesToScroll * k * -1))) : h + g.options.slidesToShow > g.slideCount && (g.slideOffset = (h + g.options.slidesToShow - g.slideCount) * g.slideWidth, j = (h + g.options.slidesToShow - g.slideCount) * k), g.slideCount <= g.options.slidesToShow && (g.slideOffset = 0, j = 0), g.options.centerMode === !0 && g.options.infinite === !0 ? g.slideOffset += g.slideWidth * Math.floor(g.options.slidesToShow / 2) - g.slideWidth : g.options.centerMode === !0 && (g.slideOffset = 0, g.slideOffset += g.slideWidth * Math.floor(g.options.slidesToShow / 2)), l = g.options.vertical === !1 ? h * g.slideWidth * -1 + g.slideOffset : h * k * -1 + j, g.options.variableWidth === !0 && (i = g.slideCount <= g.options.slidesToShow || g.options.infinite === !1 ? g.$slideTrack.children(".slick-slide").eq(h) : g.$slideTrack.children(".slick-slide").eq(h + g.options.slidesToShow), l = g.options.rtl === !0 ? i[0] ? -1 * (g.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, g.options.centerMode === !0 && (i = g.slideCount <= g.options.slidesToShow || g.options.infinite === !1 ? g.$slideTrack.children(".slick-slide").eq(h) : g.$slideTrack.children(".slick-slide").eq(h + g.options.slidesToShow + 1), l = g.options.rtl === !0 ? i[0] ? -1 * (g.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, l += (g.$list.width() - i.outerWidth()) / 2)), l
    }, c.prototype.getOption = c.prototype.slickGetOption = function(f) {
        var e = this;
        return e.options[f]
    }, c.prototype.getNavigableIndexes = function() {
        var h, g = this,
            f = 0,
            j = 0,
            i = [];
        for (g.options.infinite === !1 ? h = g.slideCount : (f = -1 * g.options.slidesToScroll, j = -1 * g.options.slidesToScroll, h = 2 * g.slideCount); h > f;) {
            i.push(f), f = j + g.options.slidesToScroll, j += g.options.slidesToScroll <= g.options.slidesToShow ? g.options.slidesToScroll : g.options.slidesToShow
        }
        return i
    }, c.prototype.getSlick = function() {
        return this
    }, c.prototype.getSlideCount = function() {
        var h, g, f, a = this;
        return f = a.options.centerMode === !0 ? a.slideWidth * Math.floor(a.options.slidesToShow / 2) : 0, a.options.swipeToSlide === !0 ? (a.$slideTrack.find(".slick-slide").each(function(e, b) {
            return b.offsetLeft - f + d(b).outerWidth() / 2 > -1 * a.swipeLeft ? (g = b, !1) : void 0
        }), h = Math.abs(d(g).attr("data-slick-index") - a.currentSlide) || 1) : a.options.slidesToScroll
    }, c.prototype.goTo = c.prototype.slickGoTo = function(f, e) {
        var g = this;
        g.changeSlide({
            data: {
                message: "index",
                index: parseInt(f)
            }
        }, e)
    }, c.prototype.init = function(a) {
        var e = this;
        d(e.$slider).hasClass("slick-initialized") || (d(e.$slider).addClass("slick-initialized"), e.buildRows(), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.updateArrows(), e.updateDots(), e.checkResponsive(!0), e.focusHandler()), a && e.$slider.trigger("init", [e]), e.options.accessibility === !0 && e.initADA(), e.options.autoplay && (e.paused = !1, e.autoPlay())
    }, c.prototype.initADA = function() {
        var a = this;
        a.$slides.add(a.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), a.$slideTrack.attr("role", "listbox"), a.$slides.not(a.$slideTrack.find(".slick-cloned")).each(function(b) {
            d(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + a.instanceUid + b
            })
        }), null !== a.$dots && a.$dots.attr("role", "tablist").find("li").each(function(b) {
            d(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + a.instanceUid + b,
                id: "slick-slide" + a.instanceUid + b
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), a.activateADA()
    }, c.prototype.initArrowEvents = function() {
        var b = this;
        b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, b.changeSlide), b.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, b.changeSlide))
    }, c.prototype.initDotEvents = function() {
        var a = this;
        a.options.dots === !0 && a.slideCount > a.options.slidesToShow && d("li", a.$dots).on("click.slick", {
            message: "index"
        }, a.changeSlide), a.options.dots === !0 && a.options.pauseOnDotsHover === !0 && d("li", a.$dots).on("mouseenter.slick", d.proxy(a.interrupt, a, !0)).on("mouseleave.slick", d.proxy(a.interrupt, a, !1))
    }, c.prototype.initSlideEvents = function() {
        var a = this;
        a.options.pauseOnHover && (a.$list.on("mouseenter.slick", d.proxy(a.interrupt, a, !0)), a.$list.on("mouseleave.slick", d.proxy(a.interrupt, a, !1)))
    }, c.prototype.initializeEvents = function() {
        var a = this;
        a.initArrowEvents(), a.initDotEvents(), a.initSlideEvents(), a.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, a.swipeHandler), a.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, a.swipeHandler), a.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, a.swipeHandler), a.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, a.swipeHandler), a.$list.on("click.slick", a.clickHandler), d(document).on(a.visibilityChange, d.proxy(a.visibility, a)), a.options.accessibility === !0 && a.$list.on("keydown.slick", a.keyHandler), a.options.focusOnSelect === !0 && d(a.$slideTrack).children().on("click.slick", a.selectHandler), d(window).on("orientationchange.slick.slick-" + a.instanceUid, d.proxy(a.orientationChange, a)), d(window).on("resize.slick.slick-" + a.instanceUid, d.proxy(a.resize, a)), d("[draggable!=true]", a.$slideTrack).on("dragstart", a.preventDefault), d(window).on("load.slick.slick-" + a.instanceUid, a.setPosition), d(document).on("ready.slick.slick-" + a.instanceUid, a.setPosition)
    }, c.prototype.initUI = function() {
        var b = this;
        b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow.show(), b.$nextArrow.show()), b.options.dots === !0 && b.slideCount > b.options.slidesToShow && b.$dots.show()
    }, c.prototype.keyHandler = function(f) {
        var e = this;
        f.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === f.keyCode && e.options.accessibility === !0 ? e.changeSlide({
            data: {
                message: e.options.rtl === !0 ? "next" : "previous"
            }
        }) : 39 === f.keyCode && e.options.accessibility === !0 && e.changeSlide({
            data: {
                message: e.options.rtl === !0 ? "previous" : "next"
            }
        }))
    }, c.prototype.lazyLoad = function() {
        function h(b) {
            d("img[data-lazy]", b).each(function() {
                var m = d(this),
                    g = d(this).attr("data-lazy"),
                    f = document.createElement("img");
                f.onload = function() {
                    m.animate({
                        opacity: 0
                    }, 100, function() {
                        m.attr("src", g).animate({
                            opacity: 1
                        }, 200, function() {
                            m.removeAttr("data-lazy").removeClass("slick-loading")
                        }), a.$slider.trigger("lazyLoaded", [a, m, g])
                    })
                }, f.onerror = function() {
                    m.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, m, g])
                }, f.src = g
            })
        }
        var l, k, j, i, a = this;
        a.options.centerMode === !0 ? a.options.infinite === !0 ? (j = a.currentSlide + (a.options.slidesToShow / 2 + 1), i = j + a.options.slidesToShow + 2) : (j = Math.max(0, a.currentSlide - (a.options.slidesToShow / 2 + 1)), i = 2 + (a.options.slidesToShow / 2 + 1) + a.currentSlide) : (j = a.options.infinite ? a.options.slidesToShow + a.currentSlide : a.currentSlide, i = Math.ceil(j + a.options.slidesToShow), a.options.fade === !0 && (j > 0 && j--, i <= a.slideCount && i++)), l = a.$slider.find(".slick-slide").slice(j, i), h(l), a.slideCount <= a.options.slidesToShow ? (k = a.$slider.find(".slick-slide"), h(k)) : a.currentSlide >= a.slideCount - a.options.slidesToShow ? (k = a.$slider.find(".slick-cloned").slice(0, a.options.slidesToShow), h(k)) : 0 === a.currentSlide && (k = a.$slider.find(".slick-cloned").slice(-1 * a.options.slidesToShow), h(k))
    }, c.prototype.loadSlider = function() {
        var b = this;
        b.setPosition(), b.$slideTrack.css({
            opacity: 1
        }), b.$slider.removeClass("slick-loading"), b.initUI(), "progressive" === b.options.lazyLoad && b.progressiveLazyLoad()
    }, c.prototype.next = c.prototype.slickNext = function() {
        var b = this;
        b.changeSlide({
            data: {
                message: "next"
            }
        })
    }, c.prototype.orientationChange = function() {
        var b = this;
        b.checkResponsive(), b.setPosition()
    }, c.prototype.pause = c.prototype.slickPause = function() {
        var b = this;
        b.autoPlayClear(), b.paused = !0
    }, c.prototype.play = c.prototype.slickPlay = function() {
        var b = this;
        b.autoPlay(), b.options.autoplay = !0, b.paused = !1, b.focussed = !1, b.interrupted = !1
    }, c.prototype.postSlide = function(f) {
        var e = this;
        e.unslicked || (e.$slider.trigger("afterChange", [e, f]), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay && e.autoPlay(), e.options.accessibility === !0 && e.initADA())
    }, c.prototype.prev = c.prototype.slickPrev = function() {
        var b = this;
        b.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, c.prototype.preventDefault = function(b) {
        b.preventDefault()
    }, c.prototype.progressiveLazyLoad = function(a) {
        a = a || 1;
        var j, i, h, l = this,
            k = d("img[data-lazy]", l.$slider);
        k.length ? (j = k.first(), i = j.attr("data-lazy"), h = document.createElement("img"), h.onload = function() {
            j.attr("src", i).removeAttr("data-lazy").removeClass("slick-loading"), l.options.adaptiveHeight === !0 && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, j, i]), l.progressiveLazyLoad()
        }, h.onerror = function() {
            3 > a ? setTimeout(function() {
                l.progressiveLazyLoad(a + 1)
            }, 500) : (j.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, j, i]), l.progressiveLazyLoad())
        }, h.src = i) : l.$slider.trigger("allImagesLoaded", [l])
    }, c.prototype.refresh = function(a) {
        var g, f, h = this;
        f = h.slideCount - h.options.slidesToShow, !h.options.infinite && h.currentSlide > f && (h.currentSlide = f), h.slideCount <= h.options.slidesToShow && (h.currentSlide = 0), g = h.currentSlide, h.destroy(!0), d.extend(h, h.initials, {
            currentSlide: g
        }), h.init(), a || h.changeSlide({
            data: {
                message: "index",
                index: g
            }
        }, !1)
    }, c.prototype.registerBreakpoints = function() {
        var j, i, h, a = this,
            g = a.options.responsive || null;
        if ("array" === d.type(g) && g.length) {
            a.respondTo = a.options.respondTo || "window";
            for (j in g) {
                if (h = a.breakpoints.length - 1, i = g[j].breakpoint, g.hasOwnProperty(j)) {
                    for (; h >= 0;) {
                        a.breakpoints[h] && a.breakpoints[h] === i && a.breakpoints.splice(h, 1), h--
                    }
                    a.breakpoints.push(i), a.breakpointSettings[i] = g[j].settings
                }
            }
            a.breakpoints.sort(function(b, e) {
                return a.options.mobileFirst ? b - e : e - b
            })
        }
    }, c.prototype.reinit = function() {
        var a = this;
        a.$slides = a.$slideTrack.children(a.options.slide).addClass("slick-slide"), a.slideCount = a.$slides.length, a.currentSlide >= a.slideCount && 0 !== a.currentSlide && (a.currentSlide = a.currentSlide - a.options.slidesToScroll), a.slideCount <= a.options.slidesToShow && (a.currentSlide = 0), a.registerBreakpoints(), a.setProps(), a.setupInfinite(), a.buildArrows(), a.updateArrows(), a.initArrowEvents(), a.buildDots(), a.updateDots(), a.initDotEvents(), a.cleanUpSlideEvents(), a.initSlideEvents(), a.checkResponsive(!1, !0), a.options.focusOnSelect === !0 && d(a.$slideTrack).children().on("click.slick", a.selectHandler), a.setSlideClasses("number" == typeof a.currentSlide ? a.currentSlide : 0), a.setPosition(), a.focusHandler(), a.paused = !a.options.autoplay, a.autoPlay(), a.$slider.trigger("reInit", [a])
    }, c.prototype.resize = function() {
        var a = this;
        d(window).width() !== a.windowWidth && (clearTimeout(a.windowDelay), a.windowDelay = window.setTimeout(function() {
            a.windowWidth = d(window).width(), a.checkResponsive(), a.unslicked || a.setPosition()
        }, 50))
    }, c.prototype.removeSlide = c.prototype.slickRemove = function(f, e, h) {
        var g = this;
        return "boolean" == typeof f ? (e = f, f = e === !0 ? 0 : g.slideCount - 1) : f = e === !0 ? --f : f, g.slideCount < 1 || 0 > f || f > g.slideCount - 1 ? !1 : (g.unload(), h === !0 ? g.$slideTrack.children().remove() : g.$slideTrack.children(this.options.slide).eq(f).remove(), g.$slides = g.$slideTrack.children(this.options.slide), g.$slideTrack.children(this.options.slide).detach(), g.$slideTrack.append(g.$slides), g.$slidesCache = g.$slides, void g.reinit())
    }, c.prototype.setCSS = function(g) {
        var i, h, f = this,
            j = {};
        f.options.rtl === !0 && (g = -g), i = "left" == f.positionProp ? Math.ceil(g) + "px" : "0px", h = "top" == f.positionProp ? Math.ceil(g) + "px" : "0px", j[f.positionProp] = g, f.transformsEnabled === !1 ? f.$slideTrack.css(j) : (j = {}, f.cssTransitions === !1 ? (j[f.animType] = "translate(" + i + ", " + h + ")", f.$slideTrack.css(j)) : (j[f.animType] = "translate3d(" + i + ", " + h + ", 0px)", f.$slideTrack.css(j)))
    }, c.prototype.setDimensions = function() {
        var f = this;
        f.options.vertical === !1 ? f.options.centerMode === !0 && f.$list.css({
            padding: "0px " + f.options.centerPadding
        }) : (f.$list.height(f.$slides.first().outerHeight(!0) * f.options.slidesToShow), f.options.centerMode === !0 && f.$list.css({
            padding: f.options.centerPadding + " 0px"
        })), f.listWidth = f.$list.width(), f.listHeight = f.$list.height(), f.options.vertical === !1 && f.options.variableWidth === !1 ? (f.slideWidth = Math.ceil(f.listWidth / f.options.slidesToShow), f.$slideTrack.width(Math.ceil(f.slideWidth * f.$slideTrack.children(".slick-slide").length))) : f.options.variableWidth === !0 ? f.$slideTrack.width(5000 * f.slideCount) : (f.slideWidth = Math.ceil(f.listWidth), f.$slideTrack.height(Math.ceil(f.$slides.first().outerHeight(!0) * f.$slideTrack.children(".slick-slide").length)));
        var e = f.$slides.first().outerWidth(!0) - f.$slides.first().width();
        f.options.variableWidth === !1 && f.$slideTrack.children(".slick-slide").width(f.slideWidth - e)
    }, c.prototype.setFade = function() {
        var e, a = this;
        a.$slides.each(function(f, b) {
            e = a.slideWidth * f * -1, a.options.rtl === !0 ? d(b).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: a.options.zIndex - 2,
                opacity: 0
            }) : d(b).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: a.options.zIndex - 2,
                opacity: 0
            })
        }), a.$slides.eq(a.currentSlide).css({
            zIndex: a.options.zIndex - 1,
            opacity: 1
        })
    }, c.prototype.setHeight = function() {
        var f = this;
        if (1 === f.options.slidesToShow && f.options.adaptiveHeight === !0 && f.options.vertical === !1) {
            var e = f.$slides.eq(f.currentSlide).outerHeight(!0);
            f.$list.css("height", e)
        }
    }, c.prototype.setOption = c.prototype.slickSetOption = function() {
        var n, m, l, k, i, a = this,
            j = !1;
        if ("object" === d.type(arguments[0]) ? (l = arguments[0], j = arguments[1], i = "multiple") : "string" === d.type(arguments[0]) && (l = arguments[0], k = arguments[1], j = arguments[2], "responsive" === arguments[0] && "array" === d.type(arguments[1]) ? i = "responsive" : "undefined" != typeof arguments[1] && (i = "single")), "single" === i) {
            a.options[l] = k
        } else {
            if ("multiple" === i) {
                d.each(l, function(b, e) {
                    a.options[b] = e
                })
            } else {
                if ("responsive" === i) {
                    for (m in k) {
                        if ("array" !== d.type(a.options.responsive)) {
                            a.options.responsive = [k[m]]
                        } else {
                            for (n = a.options.responsive.length - 1; n >= 0;) {
                                a.options.responsive[n].breakpoint === k[m].breakpoint && a.options.responsive.splice(n, 1), n--
                            }
                            a.options.responsive.push(k[m])
                        }
                    }
                }
            }
        }
        j && (a.unload(), a.reinit())
    }, c.prototype.setPosition = function() {
        var b = this;
        b.setDimensions(), b.setHeight(), b.options.fade === !1 ? b.setCSS(b.getLeft(b.currentSlide)) : b.setFade(), b.$slider.trigger("setPosition", [b])
    }, c.prototype.setProps = function() {
        var f = this,
            e = document.body.style;
        f.positionProp = f.options.vertical === !0 ? "top" : "left", "top" === f.positionProp ? f.$slider.addClass("slick-vertical") : f.$slider.removeClass("slick-vertical"), (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && f.options.useCSS === !0 && (f.cssTransitions = !0), f.options.fade && ("number" == typeof f.options.zIndex ? f.options.zIndex < 3 && (f.options.zIndex = 3) : f.options.zIndex = f.defaults.zIndex), void 0 !== e.OTransform && (f.animType = "OTransform", f.transformType = "-o-transform", f.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (f.animType = !1)), void 0 !== e.MozTransform && (f.animType = "MozTransform", f.transformType = "-moz-transform", f.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (f.animType = !1)), void 0 !== e.webkitTransform && (f.animType = "webkitTransform", f.transformType = "-webkit-transform", f.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (f.animType = !1)), void 0 !== e.msTransform && (f.animType = "msTransform", f.transformType = "-ms-transform", f.transitionType = "msTransition", void 0 === e.msTransform && (f.animType = !1)), void 0 !== e.transform && f.animType !== !1 && (f.animType = "transform", f.transformType = "transform", f.transitionType = "transition"), f.transformsEnabled = f.options.useTransform && null !== f.animType && f.animType !== !1
    }, c.prototype.setSlideClasses = function(h) {
        var l, k, j, i, g = this;
        k = g.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), g.$slides.eq(h).addClass("slick-current"), g.options.centerMode === !0 ? (l = Math.floor(g.options.slidesToShow / 2), g.options.infinite === !0 && (h >= l && h <= g.slideCount - 1 - l ? g.$slides.slice(h - l, h + l + 1).addClass("slick-active").attr("aria-hidden", "false") : (j = g.options.slidesToShow + h, k.slice(j - l + 1, j + l + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === h ? k.eq(k.length - 1 - g.options.slidesToShow).addClass("slick-center") : h === g.slideCount - 1 && k.eq(g.options.slidesToShow).addClass("slick-center")), g.$slides.eq(h).addClass("slick-center")) : h >= 0 && h <= g.slideCount - g.options.slidesToShow ? g.$slides.slice(h, h + g.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : k.length <= g.options.slidesToShow ? k.addClass("slick-active").attr("aria-hidden", "false") : (i = g.slideCount % g.options.slidesToShow, j = g.options.infinite === !0 ? g.options.slidesToShow + h : h, g.options.slidesToShow == g.options.slidesToScroll && g.slideCount - h < g.options.slidesToShow ? k.slice(j - (g.options.slidesToShow - i), j + i).addClass("slick-active").attr("aria-hidden", "false") : k.slice(j, j + g.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === g.options.lazyLoad && g.lazyLoad()
    }, c.prototype.setupInfinite = function() {
        var h, g, f, a = this;
        if (a.options.fade === !0 && (a.options.centerMode = !1), a.options.infinite === !0 && a.options.fade === !1 && (g = null, a.slideCount > a.options.slidesToShow)) {
            for (f = a.options.centerMode === !0 ? a.options.slidesToShow + 1 : a.options.slidesToShow, h = a.slideCount; h > a.slideCount - f; h -= 1) {
                g = h - 1, d(a.$slides[g]).clone(!0).attr("id", "").attr("data-slick-index", g - a.slideCount).prependTo(a.$slideTrack).addClass("slick-cloned")
            }
            for (h = 0; f > h; h += 1) {
                g = h, d(a.$slides[g]).clone(!0).attr("id", "").attr("data-slick-index", g + a.slideCount).appendTo(a.$slideTrack).addClass("slick-cloned")
            }
            a.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                d(this).attr("id", "")
            })
        }
    }, c.prototype.interrupt = function(f) {
        var e = this;
        f || e.autoPlay(), e.interrupted = f
    }, c.prototype.selectHandler = function(a) {
        var h = this,
            g = d(a.target).is(".slick-slide") ? d(a.target) : d(a.target).parents(".slick-slide"),
            f = parseInt(g.attr("data-slick-index"));
        return f || (f = 0), h.slideCount <= h.options.slidesToShow ? (h.setSlideClasses(f), void h.asNavFor(f)) : void h.slideHandler(f)
    }, c.prototype.slideHandler = function(t, s, r) {
        var q, p, o, n, k, m = null,
            l = this;
        return s = s || !1, l.animating === !0 && l.options.waitForAnimate === !0 || l.options.fade === !0 && l.currentSlide === t || l.slideCount <= l.options.slidesToShow ? void 0 : (s === !1 && l.asNavFor(t), q = t, m = l.getLeft(q), n = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? n : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (0 > t || t > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (q = l.currentSlide, r !== !0 ? l.animateSlide(n, function() {
            l.postSlide(q)
        }) : l.postSlide(q))) : l.options.infinite === !1 && l.options.centerMode === !0 && (0 > t || t > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (q = l.currentSlide, r !== !0 ? l.animateSlide(n, function() {
            l.postSlide(q)
        }) : l.postSlide(q))) : (l.options.autoplay && clearInterval(l.autoPlayTimer), p = 0 > q ? l.slideCount % l.options.slidesToScroll !== 0 ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + q : q >= l.slideCount ? l.slideCount % l.options.slidesToScroll !== 0 ? 0 : q - l.slideCount : q, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, p]), o = l.currentSlide, l.currentSlide = p, l.setSlideClasses(l.currentSlide), l.options.asNavFor && (k = l.getNavTarget(), k = k.slick("getSlick"), k.slideCount <= k.options.slidesToShow && k.setSlideClasses(l.currentSlide)), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? (r !== !0 ? (l.fadeSlideOut(o), l.fadeSlide(p, function() {
            l.postSlide(p)
        })) : l.postSlide(p), void l.animateHeight()) : void(r !== !0 ? l.animateSlide(m, function() {
            l.postSlide(p)
        }) : l.postSlide(p))))
    }, c.prototype.startLoad = function() {
        var b = this;
        b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow.hide(), b.$nextArrow.hide()), b.options.dots === !0 && b.slideCount > b.options.slidesToShow && b.$dots.hide(), b.$slider.addClass("slick-loading")
    }, c.prototype.swipeDirection = function() {
        var g, f, j, i, h = this;
        return g = h.touchObject.startX - h.touchObject.curX, f = h.touchObject.startY - h.touchObject.curY, j = Math.atan2(f, g), i = Math.round(180 * j / Math.PI), 0 > i && (i = 360 - Math.abs(i)), 45 >= i && i >= 0 ? h.options.rtl === !1 ? "left" : "right" : 360 >= i && i >= 315 ? h.options.rtl === !1 ? "left" : "right" : i >= 135 && 225 >= i ? h.options.rtl === !1 ? "right" : "left" : h.options.verticalSwiping === !0 ? i >= 35 && 135 >= i ? "down" : "up" : "vertical"
    }, c.prototype.swipeEnd = function(f) {
        var h, g, e = this;
        if (e.dragging = !1, e.interrupted = !1, e.shouldClick = e.touchObject.swipeLength > 10 ? !1 : !0, void 0 === e.touchObject.curX) {
            return !1
        }
        if (e.touchObject.edgeHit === !0 && e.$slider.trigger("edge", [e, e.swipeDirection()]), e.touchObject.swipeLength >= e.touchObject.minSwipe) {
            switch (g = e.swipeDirection()) {
                case "left":
                case "down":
                    h = e.options.swipeToSlide ? e.checkNavigable(e.currentSlide + e.getSlideCount()) : e.currentSlide + e.getSlideCount(), e.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    h = e.options.swipeToSlide ? e.checkNavigable(e.currentSlide - e.getSlideCount()) : e.currentSlide - e.getSlideCount(), e.currentDirection = 1
            }
            "vertical" != g && (e.slideHandler(h), e.touchObject = {}, e.$slider.trigger("swipe", [e, g]))
        } else {
            e.touchObject.startX !== e.touchObject.curX && (e.slideHandler(e.currentSlide), e.touchObject = {})
        }
    }, c.prototype.swipeHandler = function(f) {
        var e = this;
        if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && -1 !== f.type.indexOf("mouse"))) {
            switch (e.touchObject.fingerCount = f.originalEvent && void 0 !== f.originalEvent.touches ? f.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), f.data.action) {
                case "start":
                    e.swipeStart(f);
                    break;
                case "move":
                    e.swipeMove(f);
                    break;
                case "end":
                    e.swipeEnd(f)
            }
        }
    }, c.prototype.swipeMove = function(j) {
        var o, n, m, l, k, i = this;
        return k = void 0 !== j.originalEvent ? j.originalEvent.touches : null, !i.dragging || k && 1 !== k.length ? !1 : (o = i.getLeft(i.currentSlide), i.touchObject.curX = void 0 !== k ? k[0].pageX : j.clientX, i.touchObject.curY = void 0 !== k ? k[0].pageY : j.clientY, i.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(i.touchObject.curX - i.touchObject.startX, 2))), i.options.verticalSwiping === !0 && (i.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(i.touchObject.curY - i.touchObject.startY, 2)))), n = i.swipeDirection(), "vertical" !== n ? (void 0 !== j.originalEvent && i.touchObject.swipeLength > 4 && j.preventDefault(), l = (i.options.rtl === !1 ? 1 : -1) * (i.touchObject.curX > i.touchObject.startX ? 1 : -1), i.options.verticalSwiping === !0 && (l = i.touchObject.curY > i.touchObject.startY ? 1 : -1), m = i.touchObject.swipeLength, i.touchObject.edgeHit = !1, i.options.infinite === !1 && (0 === i.currentSlide && "right" === n || i.currentSlide >= i.getDotCount() && "left" === n) && (m = i.touchObject.swipeLength * i.options.edgeFriction, i.touchObject.edgeHit = !0), i.options.vertical === !1 ? i.swipeLeft = o + m * l : i.swipeLeft = o + m * (i.$list.height() / i.listWidth) * l, i.options.verticalSwiping === !0 && (i.swipeLeft = o + m * l), i.options.fade === !0 || i.options.touchMove === !1 ? !1 : i.animating === !0 ? (i.swipeLeft = null, !1) : void i.setCSS(i.swipeLeft)) : void 0)
    }, c.prototype.swipeStart = function(f) {
        var g, e = this;
        return e.interrupted = !0, 1 !== e.touchObject.fingerCount || e.slideCount <= e.options.slidesToShow ? (e.touchObject = {}, !1) : (void 0 !== f.originalEvent && void 0 !== f.originalEvent.touches && (g = f.originalEvent.touches[0]), e.touchObject.startX = e.touchObject.curX = void 0 !== g ? g.pageX : f.clientX, e.touchObject.startY = e.touchObject.curY = void 0 !== g ? g.pageY : f.clientY, void(e.dragging = !0))
    }, c.prototype.unfilterSlides = c.prototype.slickUnfilter = function() {
        var b = this;
        null !== b.$slidesCache && (b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.appendTo(b.$slideTrack), b.reinit())
    }, c.prototype.unload = function() {
        var a = this;
        d(".slick-cloned", a.$slider).remove(), a.$dots && a.$dots.remove(), a.$prevArrow && a.htmlExpr.test(a.options.prevArrow) && a.$prevArrow.remove(), a.$nextArrow && a.htmlExpr.test(a.options.nextArrow) && a.$nextArrow.remove(), a.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, c.prototype.unslick = function(f) {
        var e = this;
        e.$slider.trigger("unslick", [e, f]), e.destroy()
    }, c.prototype.updateArrows = function() {
        var e, f = this;
        e = Math.floor(f.options.slidesToShow / 2), f.options.arrows === !0 && f.slideCount > f.options.slidesToShow && !f.options.infinite && (f.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), f.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === f.currentSlide ? (f.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), f.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : f.currentSlide >= f.slideCount - f.options.slidesToShow && f.options.centerMode === !1 ? (f.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), f.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : f.currentSlide >= f.slideCount - 1 && f.options.centerMode === !0 && (f.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), f.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, c.prototype.updateDots = function() {
        var b = this;
        null !== b.$dots && (b.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), b.$dots.find("li").eq(Math.floor(b.currentSlide / b.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, c.prototype.visibility = function() {
        var b = this;
        b.options.autoplay && (document[b.hidden] ? b.interrupted = !0 : b.interrupted = !1)
    }, d.fn.slick = function() {
        var i, h, b = this,
            l = arguments[0],
            k = Array.prototype.slice.call(arguments, 1),
            j = b.length;
        for (i = 0; j > i; i++) {
            if ("object" == typeof l || "undefined" == typeof l ? b[i].slick = new c(b[i], l) : h = b[i].slick[l].apply(b[i].slick, k), "undefined" != typeof h) {
                return h
            }
        }
        return b
    }
});
/*! jQuery UI - v1.12.1 - 2017-03-26
 * http://jqueryui.com
 * Includes: widget.js, position.js, data.js, disable-selection.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/draggable.js, widgets/droppable.js, widgets/resizable.js, widgets/selectable.js, widgets/sortable.js, widgets/accordion.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/menu.js, widgets/mouse.js, widgets/progressbar.js, widgets/selectmenu.js, widgets/slider.js, widgets/spinner.js, widgets/tabs.js, widgets/tooltip.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */

jq(document).ready(function() {
    jq(".other-product").slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        mobileFirst: true,
        pauseOnHover: true,
        touchMove: true,
        slidesToShow: 5,
        slidesToScroll: 1
    })
});