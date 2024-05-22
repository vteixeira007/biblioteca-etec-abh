export default function importPageHTML() {
  !function t() {
    let e, n, i, o, r;
    for (e = document.getElementsByTagName("*"),
      n = 0; n < e.length; n++)
      if (o = (i = e[n]).getAttribute("include-html"))
        return (r = new XMLHttpRequest).onreadystatechange = function () {
          4 == this.readyState && (200 == this.status && (i.innerHTML = this.responseText),
            404 == this.status && (i.innerHTML = "Page not found."),
            i.removeAttribute("include-html"),
            t())
        }
          ,
          r.open("GET", o, !0),
          void r.send()
  }()
}