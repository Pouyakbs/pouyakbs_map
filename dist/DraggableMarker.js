"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _reactLeaflet = require("react-leaflet");
var _leaflet = _interopRequireDefault(require("leaflet"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var LeafIcon = _leaflet["default"].Icon.extend({
  options: {
    iconSize: [25, 41],
    shadowSize: [50, 64],
    iconAnchor: [25, 41],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76]
  }
});
var streamingIcon = new LeafIcon({
  iconUrl: require("./marker-icon.png")
});
console.log("hello guys");
function DraggableMarker(_ref) {
  var setCurrentPos = _ref.setCurrentPos,
    _ref$defaultLoc = _ref.defaultLoc,
    defaultLoc = _ref$defaultLoc === void 0 ? {} : _ref$defaultLoc;
  var _useState = (0, _react.useState)(Object.keys(defaultLoc).length ? defaultLoc : null),
    _useState2 = _slicedToArray(_useState, 2),
    position = _useState2[0],
    setPosition = _useState2[1];
  var markerRef = (0, _react.useRef)(null);
  var eventHandlers = (0, _react.useMemo)(function () {
    return {
      dragend: function dragend() {
        var marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          setCurrentPos(marker.getLatLng());
        }
      }
    };
  }, []);
  var map = (0, _reactLeaflet.useMapEvents)({
    click: function click(e) {
      setPosition(e.latlng);
      setCurrentPos(e.latlng);
    }
  });
  return position && /*#__PURE__*/React.createElement(_reactLeaflet.Marker, {
    draggable: true,
    position: position,
    icon: streamingIcon,
    ref: markerRef,
    eventHandlers: eventHandlers
  });
}
var _default = exports["default"] = DraggableMarker;