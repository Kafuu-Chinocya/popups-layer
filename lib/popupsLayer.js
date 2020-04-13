'use strict';
/**
 * 弹出层组件.
 *
 * @author Kafuu_Chino <japan_sakurayuki@qq.com>
 * @version 1.1.2
 */

/**
 * 弹出层对象
 * @class
 * @since 1.0
 */

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PopupsLayer = /*#__PURE__*/function () {
  /**
   * 配置并生成弹出层父元素.
   * @constructor
   *
   * @param {Object} layer - 弹出层的外层盒子配置信息，目前有以下参数
   * @todo @param type - 指定弹出层的类型
   *
   * @param {String<'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM' | 'CENTER'>} [layer.position = 'CENTER'] - 指定弹出层的位置.
   *
   * @param {Object} layer.style - 样式配置信息，你可以在这个对象中传递自定义的样式，命名规范遵从HTML DOM Style对象，有以下默认配置参数
   * @param {String} [title.style.background = #ffffff] - 背景颜色.
   * @param {String} [layer.style.borderRadius = 5px] - 指定圆角大小.
   * @param {String} [layer.style.maxWidth = none] - 指定盒子最大宽度.
   *
   * @param {Object} title - 对标题栏的配置信息，目前有以下参数
   * @todo @param {Object} icon - 标题栏加入一个图标.
   * @param {Boolean} [title.enable = true] - 指定是否需要标题栏.
   * @param {Boolean} [title.draggable = true] - 指定标题栏是否可以拖拽移动(内容窗口也将跟随移动).
   * @param {String} title.text - 标题栏文字.
   * @param {String} title.template - 你可能需要更灵活的方式控制标题栏，可以自己传入一个HTML模板加入标题栏.
   *
   * @param {Object} title.btnGroup - 指定标题栏右侧的按钮组，以下参数仅为样式中提供预设的一些按钮，你可以自己在样式写入自己喜欢的
   *                                      按钮样式，并将样式名加入配置对象，仅支持class类名，不支持id.
   * @param {Boolean} [title.btnGroup.enable = true] - 是否开启右侧按钮.
   * @param {Boolean} [title.btnGroup.close = true] - 关闭按钮.
   * @todo @param {Boolean} title.btnGroup.maximize - 最大化按钮.
   *
   * @param {Object} title.style - 样式配置信息，你可以在这个对象中传递自定义的样式，命名规范遵从HTML DOM Style对象，有以下默认配置参数
   * @param {String} [title.style.color = #666666] - 标题栏字体颜色.
   * @param {String} [title.style.fontSize = 14px] - 标题栏字体大小.
   * @param {String} [title.style.borderBottom = '.4px solid rgba(75, 97, 124, 0.53)'] - 标题的下边框样式，取值同border-bottom
   *
   * @param {String} {Object} content - 对内容区域的配置信息，目前有以下参数
   * @param {String} content.text - 指定要在内容区域显示的文本.
   * @param {String} content.template - 你可能需要更灵活的方式控制内容，自己传入一个HTML模板加入弹出层，它会在文本下方展示.
   *
   * @param {Object} content.icon - 传入一个图标显示在内容区域，目前有以下参数
   * @param {String} content.icon.src - 图标地址.
   * @param {String<'LEFT' | 'RIGHT'>} [content.icon.position = 'LEFT'] - 指定图标在弹出层的文本左边还是右边.
   *
   * @param {Object} content.btnGroup - 指定按钮
   * @param {Object} content.btnGroup.* - 自定义命名，此命名将成为按钮id属性名.
   * @param {Object} content.btnGroup.*.text - 按钮内容文本.
   * @param {Function} content.btnGroup.*.fn - 指定按钮点击事件函数.
   * @param {String<ok | cancel>} content.btnGroup.*.theme - 使用样式表预设的按钮主题，此参数为主题类名，你也可以依据id属性名事先
   *                                                          在样式表预设主题，但是请注意，这个参数只支持class类名.
   *
   * @param {Object} content.style - 样式配置信息，你可以在这个对象中传递自定义的样式，命名规范遵从HTML DOM Style对象，有以下默认配置参数
   * @param {String} [content.style.color = #666666] - 内容区域字体颜色.
   * @param {String} [content.style.fontSize = 14px] - 内容区域字体大小
   *
   * @param {Function} [after = null] - 指定生成弹出层后需要进行的操作.
   *
   * @since 1.0
   */
  function PopupsLayer(_ref) {
    var layer = _ref.layer,
        title = _ref.title,
        content = _ref.content,
        _ref$after = _ref.after,
        after = _ref$after === void 0 ? null : _ref$after;

    _classCallCheck(this, PopupsLayer);

    /**
     * 创建UI对象
     * @class
     * @since 1.1.2
     */
    var UI = /*#__PURE__*/function () {
      function UI(_ref2) {
        var layer = _ref2.layer,
            title = _ref2.title,
            content = _ref2.content,
            _ref2$after = _ref2.after,
            after = _ref2$after === void 0 ? null : _ref2$after;

        _classCallCheck(this, UI);

        // 配置文件
        var DEFAULT_CONFIG = {
          layer: {
            position: 'CENTER',
            style: {
              background: '#ffffff',
              borderRadius: '5px',
              maxWidth: 'none'
            }
          },
          title: {
            enable: true,
            draggable: true,
            btnGroup: {
              enable: true,
              close: true
            },
            style: {
              color: '#666666',
              fontSize: '14px',
              borderBottom: '.4px solid rgba(75, 97, 124, 0.53)'
            }
          },
          content: {
            style: {
              color: '#666666',
              fontSize: '14px'
            }
          }
        };
        this.config = UI.objectDeepCopy(DEFAULT_CONFIG, {
          layer: layer,
          title: title,
          content: content
        });
        this.popupsLayer = document.createElement('div');
        this.popupsLayer.classList.add('popups-layer');
        this.createLayer();
        if (this.config.title.enable) this.createTitle();
        this.createContent();

        if (document.querySelectorAll('.popups-layer').length) {
          var oldLayer = document.querySelectorAll('.popups-layer');
          var targetEle = oldLayer[oldLayer.length - 1].nextElementSibling;
          document.body.insertBefore(this.popupsLayer, targetEle);
        } else {
          document.body.insertBefore(this.popupsLayer, document.body.firstElementChild);
        }

        if (after instanceof Function) after();
      }
      /**
       * 深拷贝/合并方法，如果在retObj中存在obj中相同属性，则retObj属性保留，此方法会直接在retObj上进行操作
       * @param {Object} obj - 进行深拷贝/合并的参考对象.
       * @param {Object} [retObj = {}] - 进行深拷贝/合并的处理对象，未指定参数将会生成一个空对象.
       * @return {Object} retObj - 返回深拷贝/合并后的处理对象.
       * @since 1.1.2
       */


      _createClass(UI, [{
        key: "createLayer",

        /**
         * 创建弹出层外层盒子
         * @since 1.0
         */
        value: function createLayer() {
          var _CONFIG_ = this.config.layer;
          var _POSITION_ = {
            'LEFT': 'left: 0',
            'RIGHT': 'right: 0',
            'BOTTOM': 'bottom: 0',
            'CENTER': 'top: 50%; left: 50%; transform: translate(-50%, -50%);'
          };
          this.layer = document.createElement('div');
          this.layer.classList.add('popups-layer-box');
          this.layer.setAttribute('style', "".concat(_POSITION_[_CONFIG_.position]));

          for (var _i = 0, _Object$entries = Object.entries(_CONFIG_.style); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                key = _Object$entries$_i[0],
                value = _Object$entries$_i[1];

            this.layer.style[key] = value;
          }

          this.popupsLayer.appendChild(this.layer);
        }
        /**
         * 创建弹出层标题栏盒子
         * @since 1.0
         */

      }, {
        key: "createTitle",
        value: function createTitle() {
          var _CONFIG_ = this.config.title;
          var title = document.createElement('div');
          title.classList.add('popups-layer-title');

          for (var _i2 = 0, _Object$entries2 = Object.entries(_CONFIG_.style); _i2 < _Object$entries2.length; _i2++) {
            var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
                key = _Object$entries2$_i[0],
                value = _Object$entries2$_i[1];

            title.style[key] = value;
          }

          if (_CONFIG_.hasOwnProperty('text')) title.innerText = _CONFIG_.text;

          if (_CONFIG_.hasOwnProperty('template')) {
            title.innerHTML += _CONFIG_.template;
          }

          if (_CONFIG_.btnGroup.enable) {
            var that = this;
            var btnGroup = document.createElement('div');
            btnGroup.classList.add('popups-layer-btn-group');
            var logic = {
              close: function close() {
                var icon = document.createElement('i');
                icon.classList.add('iconfont');
                icon.classList.add('icon-guanbi');
                btnGroup.appendChild(icon);
                icon.addEventListener('click', function () {
                  that.close();
                });
              }
            };

            for (var _i3 = 0, _Object$entries3 = Object.entries(_CONFIG_.btnGroup); _i3 < _Object$entries3.length; _i3++) {
              var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
                  _key = _Object$entries3$_i[0],
                  _value = _Object$entries3$_i[1];

              if (Object.is(_key, 'enable')) continue;

              if (_value) {
                logic[_key]();
              }
            }

            title.appendChild(btnGroup);
          }

          for (var _i4 = 0, _Object$entries4 = Object.entries(_CONFIG_.style); _i4 < _Object$entries4.length; _i4++) {
            var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
                _key2 = _Object$entries4$_i[0],
                _value2 = _Object$entries4$_i[1];

            // 绑定函数
            if (_value2) {
              var i = document.createElement('i');
              i.classList.add(_key2);
            }
          }

          if (_CONFIG_.draggable) this.dragLayer(title);
          this.layer.appendChild(title);
        }
        /**
         * 创建弹出层内容区盒子
         * @version 1.0
         * @since 1.0
         */

      }, {
        key: "createContent",
        value: function createContent() {
          var _CONFIG_ = this.config.content;
          var content = document.createElement('div');
          content.classList.add('popups-layer-content');

          for (var _i5 = 0, _Object$entries5 = Object.entries(_CONFIG_.style); _i5 < _Object$entries5.length; _i5++) {
            var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i5], 2),
                key = _Object$entries5$_i[0],
                value = _Object$entries5$_i[1];

            content.style[key] = value;
          }

          var textBox = document.createElement('div');
          textBox.classList.add('popups-layer-text');

          if (_CONFIG_.hasOwnProperty('icon')) {
            var img = document.createElement('img');
            img.src = _CONFIG_.icon.src;
            img.style.cssFloat = _CONFIG_.icon.position.toLowerCase();
            textBox.appendChild(img);
          }

          if (_CONFIG_.hasOwnProperty('text')) {
            var p = document.createElement('p');
            p.innerText = _CONFIG_.text;
            textBox.appendChild(p);
          }

          if (_CONFIG_.hasOwnProperty('template')) {
            var temp = textBox.innerHTML;
            textBox.innerHTML = temp + _CONFIG_.template;
          }

          content.appendChild(textBox);

          if (_CONFIG_.hasOwnProperty('btnGroup')) {
            var btnGroup = document.createElement('div');
            btnGroup.classList.add('btn-box');

            for (var _i6 = 0, _Object$entries6 = Object.entries(_CONFIG_.btnGroup); _i6 < _Object$entries6.length; _i6++) {
              var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i6], 2),
                  _key3 = _Object$entries6$_i[0],
                  _value3 = _Object$entries6$_i[1];

              var btn = document.createElement('button');
              btn.classList.add('btn');
              btn.setAttribute('id', _key3);

              if (_value3.text) {
                btn.innerText = _value3.text;
              }

              if (_value3.fn) {
                btn.addEventListener('click', _value3.fn);
              }

              if (_value3.theme) {
                btn.classList.add(_value3.theme);
              }

              btnGroup.appendChild(btn);
            }

            content.appendChild(btnGroup);
          }

          this.layer.appendChild(content);
        }
        /**
         * 拖动窗口方法
         * @param {HTMLElement} title - 标题元素
         * @version 1.0
         * @since 1.0
         */

      }, {
        key: "dragLayer",
        value: function dragLayer(title) {
          var _this = this;

          var isDrag = false;
          title.style.cursor = 'all-scroll';
          title.addEventListener('mousedown', function (e) {
            e.preventDefault();
            isDrag = true;
          });
          this.popupsLayer.addEventListener('mouseup', function (e) {
            e.preventDefault();
            isDrag = false;
          });
          this.popupsLayer.addEventListener('mousemove', function (e) {
            e.preventDefault();

            if (isDrag) {
              _this.layer.style.left = "".concat(_this.layer.offsetLeft + e.movementX, "px");
              _this.layer.style.top = "".concat(_this.layer.offsetTop + e.movementY, "px");
            }
          });
        }
        /**
         * 关闭弹出层方法
         * @todo 允许关闭过渡动画
         * @since 1.0
         */

      }, {
        key: "close",
        value: function close() {
          document.body.removeChild(this.popupsLayer);
        }
      }], [{
        key: "objectDeepCopy",
        value: function objectDeepCopy(obj) {
          var retObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var keys = Object.keys(obj);

          if (keys.length) {
            for (var i = 0; i < keys.length; i++) {
              if (!retObj.hasOwnProperty(keys[i])) retObj[keys[i]] = {};
              if (Object.prototype.toString.call(obj[keys[i]]) === '[object Object]') this.objectDeepCopy(obj[keys[i]], retObj[keys[i]]);
              if (retObj[keys[i]] === '' || JSON.stringify(retObj[keys[i]]) !== '{}') continue;
              retObj[keys[i]] = obj[keys[i]];
            }
          }

          return retObj;
        }
      }]);

      return UI;
    }();

    this._ui = new UI({
      layer: layer,
      title: title,
      content: content,
      after: after
    });
  }
  /**
   * 关闭弹出层方法
   * @todo 允许关闭过渡动画
   * @since 1.0
   */


  _createClass(PopupsLayer, [{
    key: "close",
    value: function close() {
      this._ui.close();
    }
    /**
     * 销毁UI对象
     * @since 1.1.2
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this._ui = null;
    }
  }]);

  return PopupsLayer;
}();
//# sourceMappingURL=popupsLayer.js.map