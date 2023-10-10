"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _reactLeaflet = require("react-leaflet");
require("leaflet/dist/leaflet.css");
var _DraggableMarker = _interopRequireDefault(require("./DraggableMarker"));
var _axios = _interopRequireDefault(require("axios"));
var _material = require("@mui/material");
var _Map = _interopRequireDefault(require("@mui/icons-material/Map"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
require("./style.css");
var _reactI18next = require("react-i18next");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function MyMap(_ref) {
  var _ref$defaultLoc = _ref.defaultLoc,
    defaultLoc = _ref$defaultLoc === void 0 ? {} : _ref$defaultLoc,
    setAddressLoading = _ref.setAddressLoading,
    getMapData = _ref.getMapData;
  var _useState = (0, _react.useState)({}),
    _useState2 = _slicedToArray(_useState, 2),
    currentPos = _useState2[0],
    setCurrentPos = _useState2[1];
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    t = _useTranslation.t,
    i18n = _useTranslation.i18n;
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    open = _useState4[0],
    setOpen = _useState4[1];
  var handleOpen = function handleOpen() {
    return setOpen(true);
  };
  var handleClose = function handleClose() {
    return setOpen(false);
  };
  var style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 0
  };
  function sendMapData() {
    if (Object.keys(currentPos).length) {
      setAddressLoading(true);
      _axios["default"].get("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=".concat(currentPos === null || currentPos === void 0 ? void 0 : currentPos.lat, "&lon=").concat(currentPos === null || currentPos === void 0 ? void 0 : currentPos.lng, "&accept-language=fa")).then(function (res) {
        var _res$data, _res$data2, _res$data3, _res$data4, _res$data5, _res$data6, _res$data7;
        var country = res === null || res === void 0 || (_res$data = res.data) === null || _res$data === void 0 || (_res$data = _res$data.address) === null || _res$data === void 0 ? void 0 : _res$data.country;
        var city = res !== null && res !== void 0 && (_res$data2 = res.data) !== null && _res$data2 !== void 0 && (_res$data2 = _res$data2.address) !== null && _res$data2 !== void 0 && _res$data2.city ? '،' + (res === null || res === void 0 || (_res$data3 = res.data) === null || _res$data3 === void 0 || (_res$data3 = _res$data3.address) === null || _res$data3 === void 0 ? void 0 : _res$data3.city) : '';
        var state = res !== null && res !== void 0 && (_res$data4 = res.data) !== null && _res$data4 !== void 0 && (_res$data4 = _res$data4.address) !== null && _res$data4 !== void 0 && _res$data4.state ? '،' + (res === null || res === void 0 || (_res$data5 = res.data) === null || _res$data5 === void 0 || (_res$data5 = _res$data5.address) === null || _res$data5 === void 0 ? void 0 : _res$data5.state) : '';
        var road = res !== null && res !== void 0 && (_res$data6 = res.data) !== null && _res$data6 !== void 0 && (_res$data6 = _res$data6.address) !== null && _res$data6 !== void 0 && _res$data6.road ? '،' + (res === null || res === void 0 || (_res$data7 = res.data) === null || _res$data7 === void 0 || (_res$data7 = _res$data7.address) === null || _res$data7 === void 0 ? void 0 : _res$data7.road) : '';
        var fullAddress = "".concat(country, " ").concat(state, " ").concat(city, " ").concat(road);
        getMapData(fullAddress, currentPos);
      })["catch"](function (e) {
        return console.log(e);
      })["finally"](function () {
        setAddressLoading(false);
      });
    }
    handleClose();
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_material.Button, {
    onClick: handleOpen
  }, /*#__PURE__*/React.createElement(_Map["default"], null)), /*#__PURE__*/React.createElement(_material.Modal, {
    open: open,
    onClose: handleClose,
    "aria-labelledby": "modal-modal-title",
    "aria-describedby": "modal-modal-description"
  }, /*#__PURE__*/React.createElement(_material.Box, {
    sx: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header ".concat(i18n.dir() == "ltr" ? 'header-ltr' : '')
  }, /*#__PURE__*/React.createElement("h2", null, t('نمایش روی نقشه')), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "close-btn",
    onClick: handleClose
  }, /*#__PURE__*/React.createElement(_Close["default"], null))), /*#__PURE__*/React.createElement("div", {
    className: "map-modal-content"
  }, /*#__PURE__*/React.createElement(_reactLeaflet.MapContainer, {
    center: Object.keys(defaultLoc).length ? [defaultLoc === null || defaultLoc === void 0 ? void 0 : defaultLoc.lat, defaultLoc === null || defaultLoc === void 0 ? void 0 : defaultLoc.lng] : [35.69958174823983, 51.338381767272956],
    zoom: 15,
    style: {
      height: "70vh",
      width: "70vw"
    }
  }, /*#__PURE__*/React.createElement(_reactLeaflet.TileLayer, {
    attribution: "\xA9 <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }), /*#__PURE__*/React.createElement(_DraggableMarker["default"], {
    setCurrentPos: setCurrentPos,
    defaultLoc: defaultLoc
  }))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center justify-content-center pb-3"
  }, /*#__PURE__*/React.createElement(_material.Button, {
    variant: "contained",
    onClick: sendMapData
  }, t('ثبت موقعیت'))))));
}
var _default = exports["default"] = MyMap;