/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./dev/js/alunos-api.js":
/*!******************************!*\
  !*** ./dev/js/alunos-api.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ importCadastroAlunos; }\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction importCadastroAlunos() {\n  function showMessage(message) {\n    var isError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n    var existingMessage = document.querySelector('.message-feedback');\n    if (existingMessage) {\n      existingMessage.remove();\n    }\n    var messageDiv = document.createElement('div');\n    messageDiv.className = \"message-feedback \".concat(isError ? 'error' : 'success');\n    messageDiv.textContent = message;\n    var submitButton = document.querySelector('.addLivro_form-button');\n    submitButton.parentNode.insertBefore(messageDiv, submitButton);\n    setTimeout(function () {\n      return messageDiv.remove();\n    }, 5000);\n  }\n  function validarCampos() {\n    var camposObrigatorios = ['nome', 'cpf', 'email', 'telefone', 'matricula', 'curso', 'turma'];\n    var isValid = true;\n    var campoInvalido = '';\n    camposObrigatorios.forEach(function (campo) {\n      var elemento = document.getElementById(campo);\n      var valor = elemento.value.trim();\n      elemento.classList.remove('input-error');\n      if (!valor) {\n        elemento.classList.add('input-error');\n        isValid = false;\n        if (!campoInvalido) campoInvalido = elemento.previousElementSibling.textContent;\n      }\n    });\n    var cpf = document.getElementById('cpf').value.replace(/\\D/g, '');\n    if (cpf.length !== 11) {\n      document.getElementById('cpf').classList.add('input-error');\n      isValid = false;\n      campoInvalido = 'CPF (deve ter 11 dígitos)';\n    }\n    var telefone = document.getElementById('telefone').value.replace(/\\D/g, '');\n    if (telefone.length < 10) {\n      document.getElementById('telefone').classList.add('input-error');\n      isValid = false;\n      campoInvalido = 'Telefone (deve ter pelo menos 10 dígitos)';\n    }\n    if (!isValid) {\n      showMessage(\"Por favor, preencha corretamente o campo \".concat(campoInvalido), true);\n    }\n    return isValid;\n  }\n  document.getElementById('formCadastroAluno').addEventListener('submit', /*#__PURE__*/function () {\n    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(e) {\n      var submitButton, buttonText, dadosAluno, response;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {\n        while (1) switch (_context.prev = _context.next) {\n          case 0:\n            e.preventDefault();\n            submitButton = this.querySelector('button[type=\"submit\"]');\n            buttonText = submitButton.textContent;\n            submitButton.disabled = true;\n            submitButton.textContent = 'Cadastrando...';\n            if (validarCampos()) {\n              _context.next = 9;\n              break;\n            }\n            submitButton.disabled = false;\n            submitButton.textContent = buttonText;\n            return _context.abrupt(\"return\");\n          case 9:\n            dadosAluno = {\n              nome: document.getElementById('nome').value.trim(),\n              matricula: parseInt(document.getElementById('matricula').value),\n              cpf: document.getElementById('cpf').value.replace(/\\D/g, ''),\n              email: document.getElementById('email').value.trim(),\n              telefone: document.getElementById('telefone').value.replace(/\\D/g, ''),\n              curso: document.getElementById('curso').value.trim(),\n              turma: document.getElementById('turma').value.trim()\n            };\n            _context.prev = 10;\n            _context.next = 13;\n            return fetch('https://biblioteca-etec-abh-2.onrender.com/aluno', {\n              method: 'POST',\n              headers: {\n                'Content-Type': 'application/json'\n              },\n              body: JSON.stringify(dadosAluno)\n            });\n          case 13:\n            response = _context.sent;\n            if (response.ok) {\n              _context.next = 16;\n              break;\n            }\n            throw new Error(\"Erro ao cadastrar: \".concat(response.status));\n          case 16:\n            _context.next = 18;\n            return response.json();\n          case 18:\n            showMessage('Aluno cadastrado com sucesso! O formulário foi limpo para um novo cadastro.');\n            this.reset();\n            _context.next = 26;\n            break;\n          case 22:\n            _context.prev = 22;\n            _context.t0 = _context[\"catch\"](10);\n            console.error('Erro:', _context.t0);\n            showMessage('Erro ao cadastrar aluno. Por favor, verifique os dados e tente novamente.', true);\n          case 26:\n            _context.prev = 26;\n            submitButton.disabled = false;\n            submitButton.textContent = buttonText;\n            return _context.finish(26);\n          case 30:\n          case \"end\":\n            return _context.stop();\n        }\n      }, _callee, this, [[10, 22, 26, 30]]);\n    }));\n    return function (_x) {\n      return _ref.apply(this, arguments);\n    };\n  }());\n  document.getElementById('cpf').addEventListener('input', function (e) {\n    var value = e.target.value.replace(/\\D/g, '');\n    if (value.length > 11) value = value.slice(0, 11);\n    if (value.length > 3) {\n      value = value.replace(/^(\\d{3})/, '$1.');\n    }\n    if (value.length > 6) {\n      value = value.replace(/^(\\d{3})\\.(\\d{3})/, '$1.$2.');\n    }\n    if (value.length > 9) {\n      value = value.replace(/^(\\d{3})\\.(\\d{3})\\.(\\d{3})/, '$1.$2.$3-');\n    }\n    e.target.value = value;\n    this.classList.remove('input-error');\n  });\n  document.getElementById('telefone').addEventListener('input', function (e) {\n    var value = e.target.value.replace(/\\D/g, '');\n    if (value.length > 11) value = value.slice(0, 11);\n    if (value.length > 2) {\n      value = \"(\".concat(value.slice(0, 2), \")\").concat(value.slice(2));\n    }\n    if (value.length > 9) {\n      value = \"\".concat(value.slice(0, 9), \"-\").concat(value.slice(9));\n    }\n    e.target.value = value;\n    this.classList.remove('input-error');\n  });\n  document.getElementById('cep').addEventListener('input', function (e) {\n    var value = e.target.value.replace(/\\D/g, '');\n    if (value.length > 8) value = value.slice(0, 8);\n    if (value.length > 5) {\n      value = value.replace(/^(\\d{5})/, '$1-');\n    }\n    e.target.value = value;\n  });\n  document.getElementById('matricula').addEventListener('input', function (e) {\n    e.target.value = e.target.value.replace(/\\D/g, '');\n    this.classList.remove('input-error');\n  });\n  document.querySelectorAll('.input').forEach(function (input) {\n    input.addEventListener('input', function () {\n      this.classList.remove('input-error');\n    });\n  });\n  document.getElementById('btnListarAlunos').addEventListener('click', /*#__PURE__*/(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2() {\n    var button, listaDiv, response, alunos, table, thead, tbody;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {\n      while (1) switch (_context2.prev = _context2.next) {\n        case 0:\n          button = this;\n          listaDiv = document.getElementById('listaAlunos');\n          button.textContent = 'Carregando...';\n          button.disabled = true;\n          _context2.prev = 4;\n          _context2.next = 7;\n          return fetch('https://biblioteca-etec-abh-2.onrender.com/aluno');\n        case 7:\n          response = _context2.sent;\n          if (response.ok) {\n            _context2.next = 10;\n            break;\n          }\n          throw new Error(\"Erro ao buscar alunos: \".concat(response.status));\n        case 10:\n          _context2.next = 12;\n          return response.json();\n        case 12:\n          alunos = _context2.sent;\n          table = document.createElement('table');\n          table.className = 'tabela-alunos';\n          thead = document.createElement('thead');\n          thead.innerHTML = \"\\n          <tr>\\n              <th>Nome</th>\\n              <th>Matr\\xEDcula</th>\\n              <th>Curso</th>\\n              <th>Turma</th>\\n              <th>E-mail</th>\\n              <th>Telefone</th>\\n          </tr>\\n      \";\n          table.appendChild(thead);\n          tbody = document.createElement('tbody');\n          alunos.forEach(function (aluno) {\n            var tr = document.createElement('tr');\n            tr.innerHTML = \"\\n              <td>\".concat(aluno.nome, \"</td>\\n              <td>\").concat(aluno.matricula, \"</td>\\n              <td>\").concat(aluno.curso, \"</td>\\n              <td>\").concat(aluno.turma, \"</td>\\n              <td>\").concat(aluno.email, \"</td>\\n              <td>\").concat(aluno.telefone, \"</td>\\n          \");\n            tbody.appendChild(tr);\n          });\n          table.appendChild(tbody);\n          listaDiv.innerHTML = '';\n          listaDiv.appendChild(table);\n          _context2.next = 29;\n          break;\n        case 25:\n          _context2.prev = 25;\n          _context2.t0 = _context2[\"catch\"](4);\n          console.error('Erro:', _context2.t0);\n          listaDiv.innerHTML = '<p class=\"error\">Erro ao carregar a lista de alunos. Por favor, tente novamente.</p>';\n        case 29:\n          _context2.prev = 29;\n          button.textContent = 'Listar Alunos';\n          button.disabled = false;\n          return _context2.finish(29);\n        case 33:\n        case \"end\":\n          return _context2.stop();\n      }\n    }, _callee2, this, [[4, 25, 29, 33]]);\n  })));\n}\n\n//# sourceURL=webpack://biblioteca-etec-univesp/./dev/js/alunos-api.js?");

/***/ }),

/***/ "./dev/js/app.js":
/*!***********************!*\
  !*** ./dev/js/app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _import_page_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./import-page-html.js */ \"./dev/js/import-page-html.js\");\n/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.js */ \"./dev/js/menu.js\");\n/* harmony import */ var _alunos_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./alunos-api.js */ \"./dev/js/alunos-api.js\");\n\n\n\n(0,_import_page_html_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n(0,_menu_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n(0,_alunos_api_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n\n//# sourceURL=webpack://biblioteca-etec-univesp/./dev/js/app.js?");

/***/ }),

/***/ "./dev/js/import-page-html.js":
/*!************************************!*\
  !*** ./dev/js/import-page-html.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ importPageHTML; }\n/* harmony export */ });\nfunction importPageHTML() {\n  !function t() {\n    var e, n, i, o, r;\n    for (e = document.getElementsByTagName(\"*\"), n = 0; n < e.length; n++) if (o = (i = e[n]).getAttribute(\"include-html\")) return (r = new XMLHttpRequest()).onreadystatechange = function () {\n      4 == this.readyState && (200 == this.status && (i.innerHTML = this.responseText), 404 == this.status && (i.innerHTML = \"Page not found.\"), i.removeAttribute(\"include-html\"), t());\n    }, r.open(\"GET\", o, !0), void r.send();\n  }();\n}\n\n//# sourceURL=webpack://biblioteca-etec-univesp/./dev/js/import-page-html.js?");

/***/ }),

/***/ "./dev/js/menu.js":
/*!************************!*\
  !*** ./dev/js/menu.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Menu; }\n/* harmony export */ });\nfunction Menu() {\n  var btnMobile = document.getElementById('btn-mobile');\n  function toggleMenu(event) {\n    if (event.type === 'touchstart') event.preventDefault();\n    var nav = document.getElementById('nav');\n    nav.classList.toggle('active');\n    var active = nav.classList.contains('active');\n    event.currentTarget.setAttribute('aria-expanded', active);\n    if (active) {\n      event.currentTarget.setAttribute('aria-label', 'Fechar Menu');\n    } else {\n      event.currentTarget.setAttribute('aria-label', 'Abrir Menu');\n    }\n  }\n  btnMobile.addEventListener('click', toggleMenu);\n  btnMobile.addEventListener('touchstart', toggleMenu);\n}\n\n//# sourceURL=webpack://biblioteca-etec-univesp/./dev/js/menu.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var _typeof = (__webpack_require__(/*! ./typeof.js */ \"./node_modules/@babel/runtime/helpers/typeof.js\")[\"default\"]);\nfunction _regeneratorRuntime() {\n  \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */\n  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {\n    return e;\n  }, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n  var t,\n    e = {},\n    r = Object.prototype,\n    n = r.hasOwnProperty,\n    o = Object.defineProperty || function (t, e, r) {\n      t[e] = r.value;\n    },\n    i = \"function\" == typeof Symbol ? Symbol : {},\n    a = i.iterator || \"@@iterator\",\n    c = i.asyncIterator || \"@@asyncIterator\",\n    u = i.toStringTag || \"@@toStringTag\";\n  function define(t, e, r) {\n    return Object.defineProperty(t, e, {\n      value: r,\n      enumerable: !0,\n      configurable: !0,\n      writable: !0\n    }), t[e];\n  }\n  try {\n    define({}, \"\");\n  } catch (t) {\n    define = function define(t, e, r) {\n      return t[e] = r;\n    };\n  }\n  function wrap(t, e, r, n) {\n    var i = e && e.prototype instanceof Generator ? e : Generator,\n      a = Object.create(i.prototype),\n      c = new Context(n || []);\n    return o(a, \"_invoke\", {\n      value: makeInvokeMethod(t, r, c)\n    }), a;\n  }\n  function tryCatch(t, e, r) {\n    try {\n      return {\n        type: \"normal\",\n        arg: t.call(e, r)\n      };\n    } catch (t) {\n      return {\n        type: \"throw\",\n        arg: t\n      };\n    }\n  }\n  e.wrap = wrap;\n  var h = \"suspendedStart\",\n    l = \"suspendedYield\",\n    f = \"executing\",\n    s = \"completed\",\n    y = {};\n  function Generator() {}\n  function GeneratorFunction() {}\n  function GeneratorFunctionPrototype() {}\n  var p = {};\n  define(p, a, function () {\n    return this;\n  });\n  var d = Object.getPrototypeOf,\n    v = d && d(d(values([])));\n  v && v !== r && n.call(v, a) && (p = v);\n  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);\n  function defineIteratorMethods(t) {\n    [\"next\", \"throw\", \"return\"].forEach(function (e) {\n      define(t, e, function (t) {\n        return this._invoke(e, t);\n      });\n    });\n  }\n  function AsyncIterator(t, e) {\n    function invoke(r, o, i, a) {\n      var c = tryCatch(t[r], t, o);\n      if (\"throw\" !== c.type) {\n        var u = c.arg,\n          h = u.value;\n        return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) {\n          invoke(\"next\", t, i, a);\n        }, function (t) {\n          invoke(\"throw\", t, i, a);\n        }) : e.resolve(h).then(function (t) {\n          u.value = t, i(u);\n        }, function (t) {\n          return invoke(\"throw\", t, i, a);\n        });\n      }\n      a(c.arg);\n    }\n    var r;\n    o(this, \"_invoke\", {\n      value: function value(t, n) {\n        function callInvokeWithMethodAndArg() {\n          return new e(function (e, r) {\n            invoke(t, n, e, r);\n          });\n        }\n        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();\n      }\n    });\n  }\n  function makeInvokeMethod(e, r, n) {\n    var o = h;\n    return function (i, a) {\n      if (o === f) throw Error(\"Generator is already running\");\n      if (o === s) {\n        if (\"throw\" === i) throw a;\n        return {\n          value: t,\n          done: !0\n        };\n      }\n      for (n.method = i, n.arg = a;;) {\n        var c = n.delegate;\n        if (c) {\n          var u = maybeInvokeDelegate(c, n);\n          if (u) {\n            if (u === y) continue;\n            return u;\n          }\n        }\n        if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) {\n          if (o === h) throw o = s, n.arg;\n          n.dispatchException(n.arg);\n        } else \"return\" === n.method && n.abrupt(\"return\", n.arg);\n        o = f;\n        var p = tryCatch(e, r, n);\n        if (\"normal\" === p.type) {\n          if (o = n.done ? s : l, p.arg === y) continue;\n          return {\n            value: p.arg,\n            done: n.done\n          };\n        }\n        \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg);\n      }\n    };\n  }\n  function maybeInvokeDelegate(e, r) {\n    var n = r.method,\n      o = e.iterator[n];\n    if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y;\n    var i = tryCatch(o, e.iterator, r.arg);\n    if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y;\n    var a = i.arg;\n    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y);\n  }\n  function pushTryEntry(t) {\n    var e = {\n      tryLoc: t[0]\n    };\n    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);\n  }\n  function resetTryEntry(t) {\n    var e = t.completion || {};\n    e.type = \"normal\", delete e.arg, t.completion = e;\n  }\n  function Context(t) {\n    this.tryEntries = [{\n      tryLoc: \"root\"\n    }], t.forEach(pushTryEntry, this), this.reset(!0);\n  }\n  function values(e) {\n    if (e || \"\" === e) {\n      var r = e[a];\n      if (r) return r.call(e);\n      if (\"function\" == typeof e.next) return e;\n      if (!isNaN(e.length)) {\n        var o = -1,\n          i = function next() {\n            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;\n            return next.value = t, next.done = !0, next;\n          };\n        return i.next = i;\n      }\n    }\n    throw new TypeError(_typeof(e) + \" is not iterable\");\n  }\n  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", {\n    value: GeneratorFunctionPrototype,\n    configurable: !0\n  }), o(GeneratorFunctionPrototype, \"constructor\", {\n    value: GeneratorFunction,\n    configurable: !0\n  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) {\n    var e = \"function\" == typeof t && t.constructor;\n    return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name));\n  }, e.mark = function (t) {\n    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t;\n  }, e.awrap = function (t) {\n    return {\n      __await: t\n    };\n  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {\n    return this;\n  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {\n    void 0 === i && (i = Promise);\n    var a = new AsyncIterator(wrap(t, r, n, o), i);\n    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {\n      return t.done ? t.value : a.next();\n    });\n  }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () {\n    return this;\n  }), define(g, \"toString\", function () {\n    return \"[object Generator]\";\n  }), e.keys = function (t) {\n    var e = Object(t),\n      r = [];\n    for (var n in e) r.push(n);\n    return r.reverse(), function next() {\n      for (; r.length;) {\n        var t = r.pop();\n        if (t in e) return next.value = t, next.done = !1, next;\n      }\n      return next.done = !0, next;\n    };\n  }, e.values = values, Context.prototype = {\n    constructor: Context,\n    reset: function reset(e) {\n      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);\n    },\n    stop: function stop() {\n      this.done = !0;\n      var t = this.tryEntries[0].completion;\n      if (\"throw\" === t.type) throw t.arg;\n      return this.rval;\n    },\n    dispatchException: function dispatchException(e) {\n      if (this.done) throw e;\n      var r = this;\n      function handle(n, o) {\n        return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o;\n      }\n      for (var o = this.tryEntries.length - 1; o >= 0; --o) {\n        var i = this.tryEntries[o],\n          a = i.completion;\n        if (\"root\" === i.tryLoc) return handle(\"end\");\n        if (i.tryLoc <= this.prev) {\n          var c = n.call(i, \"catchLoc\"),\n            u = n.call(i, \"finallyLoc\");\n          if (c && u) {\n            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);\n            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);\n          } else if (c) {\n            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);\n          } else {\n            if (!u) throw Error(\"try statement without catch or finally\");\n            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);\n          }\n        }\n      }\n    },\n    abrupt: function abrupt(t, e) {\n      for (var r = this.tryEntries.length - 1; r >= 0; --r) {\n        var o = this.tryEntries[r];\n        if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) {\n          var i = o;\n          break;\n        }\n      }\n      i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);\n      var a = i ? i.completion : {};\n      return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a);\n    },\n    complete: function complete(t, e) {\n      if (\"throw\" === t.type) throw t.arg;\n      return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y;\n    },\n    finish: function finish(t) {\n      for (var e = this.tryEntries.length - 1; e >= 0; --e) {\n        var r = this.tryEntries[e];\n        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;\n      }\n    },\n    \"catch\": function _catch(t) {\n      for (var e = this.tryEntries.length - 1; e >= 0; --e) {\n        var r = this.tryEntries[e];\n        if (r.tryLoc === t) {\n          var n = r.completion;\n          if (\"throw\" === n.type) {\n            var o = n.arg;\n            resetTryEntry(r);\n          }\n          return o;\n        }\n      }\n      throw Error(\"illegal catch attempt\");\n    },\n    delegateYield: function delegateYield(e, r, n) {\n      return this.delegate = {\n        iterator: values(e),\n        resultName: r,\n        nextLoc: n\n      }, \"next\" === this.method && (this.arg = t), y;\n    }\n  }, e;\n}\nmodule.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://biblioteca-etec-univesp/./node_modules/@babel/runtime/helpers/regeneratorRuntime.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ (function(module) {

eval("function _typeof(o) {\n  \"@babel/helpers - typeof\";\n\n  return (module.exports = _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) {\n    return typeof o;\n  } : function (o) {\n    return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o;\n  }, module.exports.__esModule = true, module.exports[\"default\"] = module.exports), _typeof(o);\n}\nmodule.exports = _typeof, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://biblioteca-etec-univesp/./node_modules/@babel/runtime/helpers/typeof.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// TODO(Babel 8): Remove this file.\n\nvar runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ \"./node_modules/@babel/runtime/helpers/regeneratorRuntime.js\")();\nmodule.exports = runtime;\n\n// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=\ntry {\n  regeneratorRuntime = runtime;\n} catch (accidentalStrictMode) {\n  if (typeof globalThis === \"object\") {\n    globalThis.regeneratorRuntime = runtime;\n  } else {\n    Function(\"r\", \"regeneratorRuntime = r\")(runtime);\n  }\n}\n\n\n//# sourceURL=webpack://biblioteca-etec-univesp/./node_modules/@babel/runtime/regenerator/index.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ _asyncToGenerator; }\n/* harmony export */ });\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n  try {\n    var info = gen[key](arg);\n    var value = info.value;\n  } catch (error) {\n    reject(error);\n    return;\n  }\n  if (info.done) {\n    resolve(value);\n  } else {\n    Promise.resolve(value).then(_next, _throw);\n  }\n}\nfunction _asyncToGenerator(fn) {\n  return function () {\n    var self = this,\n      args = arguments;\n    return new Promise(function (resolve, reject) {\n      var gen = fn.apply(self, args);\n      function _next(value) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n      }\n      function _throw(err) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n      }\n      _next(undefined);\n    });\n  };\n}\n\n//# sourceURL=webpack://biblioteca-etec-univesp/./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./dev/js/app.js");
/******/ 	
/******/ })()
;