'use strict';
/**
 * 弹出层组件.
 *
 * @author Nierui <nierui@creatorblue.com>
 * @version 1.1.1
 * @since 1.0
 */

/**
 * 弹出层，这是一个实验性的功能.
 * @class
 */

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PopupsLayer =
/*#__PURE__*/
function () {
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
   * @version 1.1.1
   * @since 1.0
   */
  function PopupsLayer(_ref) {
    var layer = _ref.layer,
        title = _ref.title,
        content = _ref.content,
        _ref$after = _ref.after,
        after = _ref$after === void 0 ? null : _ref$after;

    _classCallCheck(this, PopupsLayer);

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
    this.config = {};
    this.config.layer = Object.assign(DEFAULT_CONFIG.layer, layer);
    this.config.title = Object.assign(DEFAULT_CONFIG.title, title);
    this.config.content = Object.assign(DEFAULT_CONFIG.content, content);
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

    if (after instanceof Function) {
      after();
    }
  }

  _createClass(PopupsLayer, [{
    key: "createLayer",
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

      var _arr = Object.entries(_CONFIG_.style);

      for (var _i = 0; _i < _arr.length; _i++) {
        var _arr$_i = _slicedToArray(_arr[_i], 2),
            key = _arr$_i[0],
            value = _arr$_i[1];

        this.layer.style[key] = value;
      }

      this.popupsLayer.appendChild(this.layer);
    }
  }, {
    key: "createTitle",
    value: function createTitle() {
      var _CONFIG_ = this.config.title;
      var title = document.createElement('div');
      title.classList.add('popups-layer-title');

      var _arr2 = Object.entries(_CONFIG_.style);

      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var _arr2$_i = _slicedToArray(_arr2[_i2], 2),
            key = _arr2$_i[0],
            value = _arr2$_i[1];

        title.style[key] = value;
      }

      if (_CONFIG_.text) title.innerText = _CONFIG_.text;

      if (_CONFIG_.template) {
        var temp = title.innerHTML;
        title.innerHTML = temp + _CONFIG_.template;
      }

      if (_CONFIG_.btnGroup.enable) {// todo
      }

      var _arr3 = Object.entries(_CONFIG_.style);

      for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
        var _arr3$_i = _slicedToArray(_arr3[_i3], 2),
            key = _arr3$_i[0],
            value = _arr3$_i[1];

        // 绑定函数
        if (value) {
          var i = document.createElement('i');
          i.classList.add(key);
        }
      }

      if (_CONFIG_.draggable) {
        title.style.cursor = 'all-scroll'; // title.setAttribute('draggable', true);
      }

      this.layer.appendChild(title);
    }
  }, {
    key: "createContent",
    value: function createContent() {
      var _CONFIG_ = this.config.content;
      var content = document.createElement('div');
      content.classList.add('popups-layer-content');

      var _arr4 = Object.entries(_CONFIG_.style);

      for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
        var _arr4$_i = _slicedToArray(_arr4[_i4], 2),
            key = _arr4$_i[0],
            value = _arr4$_i[1];

        content.style[key] = value;
      }

      var textBox = document.createElement('div');
      textBox.classList.add('popups-layer-text');

      if (_CONFIG_.icon) {
        var img = document.createElement('img');
        img.src = _CONFIG_.icon.src;
        img.style.cssFloat = _CONFIG_.icon.position.toLowerCase();
        textBox.appendChild(img);
      }

      if (_CONFIG_.text) {
        var p = document.createElement('p');
        p.innerText = _CONFIG_.text;
        textBox.appendChild(p);
      }

      if (_CONFIG_.template) {
        var temp = textBox.innerHTML;
        textBox.innerHTML = temp + _CONFIG_.template;
      }

      content.appendChild(textBox);

      if (_CONFIG_.btnGroup) {
        var btnGroup = document.createElement('div');
        btnGroup.classList.add('btn-box');

        var _arr5 = Object.entries(_CONFIG_.btnGroup);

        for (var _i5 = 0; _i5 < _arr5.length; _i5++) {
          var _arr5$_i = _slicedToArray(_arr5[_i5], 2),
              key = _arr5$_i[0],
              value = _arr5$_i[1];

          var btn = document.createElement('button');
          btn.classList.add('btn');
          btn.setAttribute('id', key);

          if (value.text) {
            btn.innerText = value.text;
          }

          if (value.fn) {
            btn.addEventListener('click', value.fn);
          }

          if (value.theme) {
            btn.classList.add(value.theme);
          }

          btnGroup.appendChild(btn);
        }

        content.appendChild(btnGroup);
      }

      this.layer.appendChild(content);
    }
    /**
     * @todo 拖动
     */

  }, {
    key: "dragstart",
    value: function dragstart(e) {
      e.preventDefault();
    }
  }, {
    key: "close",
    value: function close() {
      this.config = null;
      document.body.removeChild(this.popupsLayer);
    }
  }]);

  return PopupsLayer;
}();
//# sourceMappingURL=popupsLayer.js.map