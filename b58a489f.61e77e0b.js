/*! For license information please see b58a489f.61e77e0b.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{173:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return s}));var r=n(2),o=n(9),a=(n(191),n(190)),i={id:"advanced-topics-editorstate-race-conditions",title:"EditorState Race Conditions"},c={id:"advanced-topics-editorstate-race-conditions",title:"EditorState Race Conditions",description:"Draft Editor is a controlled input component (you can read about this in detail in the API Basics section), meaning that changes made to the Editor state are propagated upwards through onChange and it's up to the app to feed it back to the Editor component.",source:"@site/../docs/Advanced-Topics-EditorState-Race-Conditions.md",permalink:"/docs/advanced-topics-editorstate-race-conditions",editUrl:"https://github.com/facebook/draft-js/edit/master/docs/../docs/Advanced-Topics-EditorState-Race-Conditions.md",lastUpdatedBy:"Dominic Gannaway",lastUpdatedAt:1599231950,sidebar:"docs",previous:{title:"Text Direction",permalink:"/docs/advanced-topics-text-direction"},next:{title:"Issues and Pitfalls",permalink:"/docs/advanced-topics-issues-and-pitfalls"}},l=[{value:"Best Practices",id:"best-practices",children:[]}],u={rightToc:l};function s(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Draft ",Object(a.b)("inlineCode",{parentName:"p"},"Editor")," is a ",Object(a.b)("em",{parentName:"p"},"controlled input")," component (you can read about this in detail in the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/quickstart-api-basics"}),"API Basics")," section), meaning that changes made to the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor")," state are propagated upwards through ",Object(a.b)("inlineCode",{parentName:"p"},"onChange")," and it's up to the app to feed it back to the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor")," component."),Object(a.b)("p",null,"This cycle usually looks like:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),'...\nthis.onChange = function(editorState) {\n  this.setState({editorState: editorState});\n}\n...\n<Editor\n  editorState={this.state.editorState}\n  onChange={this.onChange}\n  placeholder="Enter some text..."\n/>\n')),Object(a.b)("p",null,"Different browser events can trigger the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor")," to create a new state and call ",Object(a.b)("inlineCode",{parentName:"p"},"onChange"),". For instance, when the user pastes text into it, Draft parses the new content and creates the necessary data structure to represent it."),Object(a.b)("p",null,"This cycle works great, however, it is an asynchronous operation because of the ",Object(a.b)("inlineCode",{parentName:"p"},"setState")," call. This introduces a delay between setting the state and rendering the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor")," with the new state. During this time period other JS code can be executed."),Object(a.b)("p",null,Object(a.b)("img",Object(r.a)({parentName:"p"},{src:"/img/editorstate-race-condition-1-handler.png",alt:"Race condition diagram 1"}))),Object(a.b)("p",null,"Non-atomic operations like this can potentially introduce race conditions.\nHere's an example: Suppose you want to remove all the text styles that come from the paste. This can be implemented by listening to the onPaste event and removing all styles from the ",Object(a.b)("inlineCode",{parentName:"p"},"EditorState"),":"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"this.onPaste = function() {\n  this.setState({\n    editorState: removeEditorStyles(this.state.editorState),\n  });\n};\n")),Object(a.b)("p",null,"However, this won't work as expected. You now have two event handlers that set a new ",Object(a.b)("inlineCode",{parentName:"p"},"EditorState")," in the exact same browser event. Since the event handlers will run one after the other only the last ",Object(a.b)("inlineCode",{parentName:"p"},"setState")," will prevail. Here's how it looks like in the JS timeline:"),Object(a.b)("p",null,Object(a.b)("img",Object(r.a)({parentName:"p"},{src:"/img/editorstate-race-condition-2-handlers.png",alt:"Race condition diagram 2"}))),Object(a.b)("p",null,"As you can see, since ",Object(a.b)("inlineCode",{parentName:"p"},"setState")," is an asynchronous operation, the second ",Object(a.b)("inlineCode",{parentName:"p"},"setState")," will override whatever it was set on the first one making the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor")," lose all the contents from the pasted text."),Object(a.b)("p",null,"You can observe and explore the race condition in ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://jsfiddle.net/qecccw3r/"}),"this running example"),". The example also has logging to highlight the JS timeline so make sure to open the developer tools."),Object(a.b)("p",null,"As a rule of thumb avoid having different event handlers for the same event that manipulate the ",Object(a.b)("inlineCode",{parentName:"p"},"EditorState"),". Using setTimeout to run ",Object(a.b)("inlineCode",{parentName:"p"},"setState")," might also land you in the same situation.\nAnytime you feel you're \u201closing state\u201d make sure you're not overriding it before the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor")," re-rendering."),Object(a.b)("h2",{id:"best-practices"},"Best Practices"),Object(a.b)("p",null,"Now that you understand the problem, what can you do to avoid it? In general be mindful of where you're getting the ",Object(a.b)("inlineCode",{parentName:"p"},"EditorState")," from. If you're using a local one (stored in ",Object(a.b)("inlineCode",{parentName:"p"},"this.state"),") then there's the potential for it to not be up to date.\nTo minimize this problem Draft offers the latest ",Object(a.b)("inlineCode",{parentName:"p"},"EditorState")," instance in most of its callback functions. In your code you should use the provided ",Object(a.b)("inlineCode",{parentName:"p"},"EditorState")," instead of your local one to make sure you're basing your changes on the latest one.\nHere's a list of supported callbacks on the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor"),":"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"handleReturn(event, editorState)")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"handleKeyCommand(command, editorState)")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"handleBeforeInput(chars, editorState)")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"handlePastedText(text, html, editorState)"))),Object(a.b)("p",null,"The paste example can then be re-written in a race condition free way by using these methods:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),'this.handlePastedText = (text, styles, editorState) => {\n  this.setState({\n    editorState: removeEditorStyles(text, editorState),\n  });\n};\n//...\n<Editor\n  editorState={this.state.editorState}\n  onChange={this.onChange}\n  handlePastedText={this.handlePastedText}\n  placeholder="Enter some text..."\n/>;\n')),Object(a.b)("p",null,"With ",Object(a.b)("inlineCode",{parentName:"p"},"handlePastedText")," you can implement the paste behavior by yourself."),Object(a.b)("p",null,"NOTE: If you need to have this behavior in your Editor, you can achieve it by setting the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor"),"'s ",Object(a.b)("inlineCode",{parentName:"p"},"stripPastedStyles")," property to ",Object(a.b)("inlineCode",{parentName:"p"},"true"),"."))}s.isMDXComponent=!0},190:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return b}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=o.a.createContext({}),s=function(e){var t=o.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=s(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},f=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=s(n),f=r,b=p["".concat(i,".").concat(f)]||p[f]||d[f]||a;return n?o.a.createElement(b,c(c({ref:t},u),{},{components:n})):o.a.createElement(b,c({ref:t},u))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=f;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var u=2;u<a;u++)i[u]=n[u];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},191:function(e,t,n){"use strict";e.exports=n(192)},192:function(e,t,n){"use strict";var r=n(193),o="function"==typeof Symbol&&Symbol.for,a=o?Symbol.for("react.element"):60103,i=o?Symbol.for("react.portal"):60106,c=o?Symbol.for("react.fragment"):60107,l=o?Symbol.for("react.strict_mode"):60108,u=o?Symbol.for("react.profiler"):60114,s=o?Symbol.for("react.provider"):60109,p=o?Symbol.for("react.context"):60110,d=o?Symbol.for("react.forward_ref"):60112,f=o?Symbol.for("react.suspense"):60113,b=o?Symbol.for("react.memo"):60115,h=o?Symbol.for("react.lazy"):60116,m="function"==typeof Symbol&&Symbol.iterator;function y(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var O={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},j={};function g(e,t,n){this.props=e,this.context=t,this.refs=j,this.updater=n||O}function v(){}function w(e,t,n){this.props=e,this.context=t,this.refs=j,this.updater=n||O}g.prototype.isReactComponent={},g.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(y(85));this.updater.enqueueSetState(this,e,t,"setState")},g.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},v.prototype=g.prototype;var S=w.prototype=new v;S.constructor=w,r(S,g.prototype),S.isPureReactComponent=!0;var C={current:null},E=Object.prototype.hasOwnProperty,N={key:!0,ref:!0,__self:!0,__source:!0};function x(e,t,n){var r,o={},i=null,c=null;if(null!=t)for(r in void 0!==t.ref&&(c=t.ref),void 0!==t.key&&(i=""+t.key),t)E.call(t,r)&&!N.hasOwnProperty(r)&&(o[r]=t[r]);var l=arguments.length-2;if(1===l)o.children=n;else if(1<l){for(var u=Array(l),s=0;s<l;s++)u[s]=arguments[s+2];o.children=u}if(e&&e.defaultProps)for(r in l=e.defaultProps)void 0===o[r]&&(o[r]=l[r]);return{$$typeof:a,type:e,key:i,ref:c,props:o,_owner:C.current}}function k(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var P=/\/+/g,T=[];function _(e,t,n,r){if(T.length){var o=T.pop();return o.result=e,o.keyPrefix=t,o.func=n,o.context=r,o.count=0,o}return{result:e,keyPrefix:t,func:n,context:r,count:0}}function R(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,10>T.length&&T.push(e)}function $(e,t,n){return null==e?0:function e(t,n,r,o){var c=typeof t;"undefined"!==c&&"boolean"!==c||(t=null);var l=!1;if(null===t)l=!0;else switch(c){case"string":case"number":l=!0;break;case"object":switch(t.$$typeof){case a:case i:l=!0}}if(l)return r(o,t,""===n?"."+D(t,0):n),1;if(l=0,n=""===n?".":n+":",Array.isArray(t))for(var u=0;u<t.length;u++){var s=n+D(c=t[u],u);l+=e(c,s,r,o)}else if(null===t||"object"!=typeof t?s=null:s="function"==typeof(s=m&&t[m]||t["@@iterator"])?s:null,"function"==typeof s)for(t=s.call(t),u=0;!(c=t.next()).done;)l+=e(c=c.value,s=n+D(c,u++),r,o);else if("object"===c)throw r=""+t,Error(y(31,"[object Object]"===r?"object with keys {"+Object.keys(t).join(", ")+"}":r,""));return l}(e,"",t,n)}function D(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,(function(e){return t[e]}))}(e.key):t.toString(36)}function A(e,t){e.func.call(e.context,t,e.count++)}function I(e,t,n){var r=e.result,o=e.keyPrefix;e=e.func.call(e.context,t,e.count++),Array.isArray(e)?U(e,r,n,(function(e){return e})):null!=e&&(k(e)&&(e=function(e,t){return{$$typeof:a,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(e,o+(!e.key||t&&t.key===e.key?"":(""+e.key).replace(P,"$&/")+"/")+n)),r.push(e))}function U(e,t,n,r,o){var a="";null!=n&&(a=(""+n).replace(P,"$&/")+"/"),$(e,I,t=_(t,a,r,o)),R(t)}var q={current:null};function B(){var e=q.current;if(null===e)throw Error(y(321));return e}var M={ReactCurrentDispatcher:q,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:C,IsSomeRendererActing:{current:!1},assign:r};t.Children={map:function(e,t,n){if(null==e)return e;var r=[];return U(e,r,null,t,n),r},forEach:function(e,t,n){if(null==e)return e;$(e,A,t=_(null,null,t,n)),R(t)},count:function(e){return $(e,(function(){return null}),null)},toArray:function(e){var t=[];return U(e,t,null,(function(e){return e})),t},only:function(e){if(!k(e))throw Error(y(143));return e}},t.Component=g,t.Fragment=c,t.Profiler=u,t.PureComponent=w,t.StrictMode=l,t.Suspense=f,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=M,t.cloneElement=function(e,t,n){if(null==e)throw Error(y(267,e));var o=r({},e.props),i=e.key,c=e.ref,l=e._owner;if(null!=t){if(void 0!==t.ref&&(c=t.ref,l=C.current),void 0!==t.key&&(i=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(s in t)E.call(t,s)&&!N.hasOwnProperty(s)&&(o[s]=void 0===t[s]&&void 0!==u?u[s]:t[s])}var s=arguments.length-2;if(1===s)o.children=n;else if(1<s){u=Array(s);for(var p=0;p<s;p++)u[p]=arguments[p+2];o.children=u}return{$$typeof:a,type:e.type,key:i,ref:c,props:o,_owner:l}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:p,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:s,_context:e},e.Consumer=e},t.createElement=x,t.createFactory=function(e){var t=x.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:d,render:e}},t.isValidElement=k,t.lazy=function(e){return{$$typeof:h,_ctor:e,_status:-1,_result:null}},t.memo=function(e,t){return{$$typeof:b,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return B().useCallback(e,t)},t.useContext=function(e,t){return B().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return B().useEffect(e,t)},t.useImperativeHandle=function(e,t,n){return B().useImperativeHandle(e,t,n)},t.useLayoutEffect=function(e,t){return B().useLayoutEffect(e,t)},t.useMemo=function(e,t){return B().useMemo(e,t)},t.useReducer=function(e,t,n){return B().useReducer(e,t,n)},t.useRef=function(e){return B().useRef(e)},t.useState=function(e){return B().useState(e)},t.version="16.13.1"},193:function(e,t,n){"use strict";var r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;function i(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(o){return!1}}()?Object.assign:function(e,t){for(var n,c,l=i(e),u=1;u<arguments.length;u++){for(var s in n=Object(arguments[u]))o.call(n,s)&&(l[s]=n[s]);if(r){c=r(n);for(var p=0;p<c.length;p++)a.call(n,c[p])&&(l[c[p]]=n[c[p]])}}return l}}}]);