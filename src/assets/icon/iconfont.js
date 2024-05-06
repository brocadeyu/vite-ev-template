/* eslint-disable no-redeclare */
/* eslint-disable no-self-assign */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
;(window._iconfont_svg_string_4442162 =
  '<svg><symbol id="icon-ziyuanxhdpi" viewBox="0 0 1024 1024"><path d="M3.303226 122.350979h1017.389347v52.851394H3.303226z" fill="#231815" ></path><path d="M798.452459 127.107604h-52.851395V105.702789a52.851395 52.851395 0 0 0-52.851395-52.851394H360.578654a52.851395 52.851395 0 0 0-52.851395 52.851394v21.404815h-52.851395V105.702789a105.702789 105.702789 0 0 1 105.70279-105.702789h332.171015a105.702789 105.702789 0 0 1 105.70279 105.702789z" fill="#231815" ></path><path d="M790.52475 1023.995772H281.830076a132.128487 132.128487 0 0 1-132.128487-132.128487l-26.425697-769.516306h826.860069l-26.425697 770.573334a132.128487 132.128487 0 0 1-133.185514 131.071459zM177.184314 175.202373l26.425698 715.872141a79.277092 79.277092 0 0 0 79.277092 79.277092h507.637646a79.277092 79.277092 0 0 0 79.277092-79.277092l26.425697-716.664912z" fill="#231815" ></path><path d="M351.858174 334.285071h48.359026v477.776608h-48.359026zM513.583441 334.285071h48.359027v477.776608h-48.359027zM675.572966 334.285071h48.359026v477.776608h-48.359026z" fill="#231815" ></path></symbol><symbol id="icon-bianji" viewBox="0 0 1024 1024"><path d="M870.4 909.409524H85.333333V124.342857H653.409524a36.571429 36.571429 0 1 0 0-73.142857H48.761905a36.571429 36.571429 0 0 0-36.571429 36.571429v858.209523c0 20.187429 16.384 36.571429 36.571429 36.571429h858.209524a36.571429 36.571429 0 0 0 36.571428-36.571429V341.333333a36.571429 36.571429 0 1 0-73.142857 0v568.076191z" fill="#2c2c2c" ></path><path d="M503.710476 585.191619l510.585905-510.537143A36.571429 36.571429 0 0 0 962.608762 22.918095L452.022857 533.455238a36.571429 36.571429 0 0 0 51.687619 51.736381z" fill="#2c2c2c" ></path></symbol></svg>'),
  (function (n) {
    var t = (t = document.getElementsByTagName('script'))[t.length - 1],
      e = t.getAttribute('data-injectcss'),
      t = t.getAttribute('data-disable-injectsvg')
    if (!t) {
      var i,
        o,
        a,
        l,
        c,
        d = function (t, e) {
          e.parentNode.insertBefore(t, e)
        }
      if (e && !n.__iconfont__svg__cssinject__) {
        n.__iconfont__svg__cssinject__ = !0
        try {
          document.write(
            '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
          )
        } catch (t) {
          // console && console.log(t)
        }
      }
      ;(i = function () {
        var t,
          e = document.createElement('div')
        ;(e.innerHTML = n._iconfont_svg_string_4442162),
          (e = e.getElementsByTagName('svg')[0]) &&
            (e.setAttribute('aria-hidden', 'true'),
            (e.style.position = 'absolute'),
            (e.style.width = 0),
            (e.style.height = 0),
            (e.style.overflow = 'hidden'),
            (e = e),
            (t = document.body).firstChild
              ? d(e, t.firstChild)
              : t.appendChild(e))
      }),
        document.addEventListener
          ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
            ? setTimeout(i, 0)
            : ((o = function () {
                document.removeEventListener('DOMContentLoaded', o, !1), i()
              }),
              document.addEventListener('DOMContentLoaded', o, !1))
          : document.attachEvent &&
            ((a = i),
            (l = n.document),
            (c = !1),
            h(),
            (l.onreadystatechange = function () {
              'complete' == l.readyState && ((l.onreadystatechange = null), s())
            }))
    }
    function s() {
      c || ((c = !0), a())
    }
    function h() {
      try {
        l.documentElement.doScroll('left')
      } catch (t) {
        return void setTimeout(h, 50)
      }
      s()
    }
  })(window)
