/**
 * @preserve AngularJS PDF viewer directive using pdf.js.
 *
 * https://github.com/akrennmair/ng-pdfviewer 
 *
 * MIT license
 */

// https://github.com/sayanee/angularjs-pdf/blob/master/dist/angular-pdf.js

// PDFJS.version = 0.8.882 build 4552654;

// https://github.com/mozilla/pdf.js/blob/gh-pages/web/viewer.js

angular.module('ngPDFViewer', []).
directive('pdfviewer', ['$parse', '$timeout', function ($parse, $timeout) {
    var canvas = null;
    var instance_id = null;
    var ctx = null;
    var pdftimer = 400;

    return {
        restrict: "E",
        template: '<canvas></canvas>',
        scope: {
            onPageLoad: '&',
            loadProgress: '&',
            src: '@',
            scale: '@',
            id: '='
        },
        controller: ['$scope', function ($scope) {
            $scope.pageNum = 1;
            $scope.pdfDoc = null;
            $scope.scale = 1.0;

            //PDFJS.disableWorker = true; //!!

            $scope.documentProgress = function (progressData) {
                console.log('progress :', progressData)
                if ($scope.loadProgress) {

                    $scope.loadProgress({ state: "loading", loaded: progressData.loaded, total: progressData.total });
                }
            };

            $scope.loadPDF = function (dataOrpath) {
                $scope.pdfDoc = null

                //
                //PDFJS.getDocument(dataOrpath, null, null, $scope.documentProgress).then(function (_pdfDoc) {
                PDFJS.getDocument(dataOrpath).then(function (_pdfDoc) {
                    $scope.pdfDoc = _pdfDoc;
                    $scope.renderPage(1);
                    $scope.onPageLoad({ page: $scope.pageNum, total: $scope.pdfDoc.numPages });
                    //$scope.renderPage($scope.pageNum);


                    /*
					$scope.renderPage($scope.pageNum, function(success) {
						if ($scope.loadProgress) {
							$scope.loadProgress({state: "finished", loaded: 0, total: 0});
						}
					});
                    */
                }, function (message, exception) {
                    //alert(message)
                    console.log("PDF load error: " + message);
                    if ($scope.loadProgress) {
                        $scope.loadProgress({ state: "error", loaded: 0, total: 0 });
                    }
                });
            };

            var isBusy = false;

            $scope.renderPage = function (num, callback) {

                if (isBusy) {
                    return
                }
                //isBusy = true;
                //console.log('renderPage')

                $scope.pdfDoc.getPage(num).then(function (page) {
                    //console.log('getPage scale is', $scope.scale)

                    canvas.scrollTop;

                    var viewport = page.getViewport($scope.scale);
                    var ctx = canvas.getContext('2d');

                    canvas.height = viewport.height;
                    canvas.width = viewport.width;



                    //page.scrollIntoView();

                    //
                    var renderContext = {
                        canvasContext: ctx,
                        viewport: viewport,
                        /*
					    continueCallback: function (cont) {
					       console.log(cont)
					        cont();
					    }
                        */

                    };

                    ///*

                    try {
                        page.render(renderContext)
                    } catch (e) {
                        console.log('error', e)
                    }

                    $timeout(function () {


                        if ($scope.loadProgress) {
                            $scope.loadProgress({ state: "finished", loaded: 0, total: 0 });
                        }

                        isBusy = false;
                    }, pdftimer);
                    //*/

                    /*
					var renderTask = page.render(renderContext)

					renderTask.promise.then(
                        function pdfPageRenderCallback() {
                            
                            console.log('renderrrrrrrrrrrrrrrrrr')
                            $scope.onPageLoad({ page: $scope.pageNum, total: $scope.pdfDoc.numPages });

                            if ($scope.loadProgress) {
                                $scope.loadProgress({ state: "finished", loaded: 0, total: 0 });
                            }
                        }
                    );
			        */

                    //console.log('ggggg')


                });

            };

            $scope.$on('pdfviewer.loadPDF', function (evt, id, data) {
                //console.log('pdfviewer.loadPDF')
                if (id !== instance_id) {
                    return;
                }

                // convert in array
                data = { data: new Uint8Array(data) }

                //console.log('load', data)
                $scope.loadPDF(data);

            });

            $scope.$on('pdfviewer.setScale', function (evt, id, scale) {
                if (id !== instance_id) {
                    return;
                }

                $scope.scale = scale || $scope.scale;
                $scope.renderPage($scope.pageNum);

            });

            $scope.$on('pdfviewer.nextPage', function (evt, id) {
                if (id !== instance_id) {
                    return;
                }

                if ($scope.pageNum < $scope.pdfDoc.numPages) {
                    $scope.pageNum++;
                    $scope.renderPage($scope.pageNum);
                }
            });

            $scope.$on('pdfviewer.prevPage', function (evt, id) {
                if (id !== instance_id) {
                    return;
                }

                if ($scope.pageNum > 1) {
                    $scope.pageNum--;
                    $scope.renderPage($scope.pageNum);
                }
            });

            $scope.$on('pdfviewer.gotoPage', function (evt, id, page) {
                if (id !== instance_id) {
                    return;
                }

                if (page >= 1 && page <= $scope.pdfDoc.numPages) {
                    $scope.pageNum = page;
                    $scope.renderPage($scope.pageNum);
                }
            });
        }],

        link: function (scope, iElement, iAttr) {
            canvas = iElement.find('canvas')[0];
            ctx = canvas.getContext('2d');

            instance_id = iAttr.id;
            //scope.scale = parseInt(iAttr.scale);


            iAttr.$observe('scale', function (v) {
                //console.log('scale attribute changed, new value is ' + v );
                if (v !== undefined && v !== null && v !== '') {
                    scope.scale = v

                    if (scope.pdfDoc) {
                        //scope.renderPage(scope.pageNum);
                    }
                }
            });

            iAttr.$observe('src', function (v) {

                console.log('src attribute changed, new value is ' + v);
                if (v !== undefined && v !== null && v !== '') {
                    scope.pageNum = 1;
                    scope.loadPDF(scope.src);
                }
            });

            // unbind
            scope.$on('$destroy', function () {
                //console.log('pdf destroyed')
            });
        }
    };
}]).
service("PDFViewerService", ['$rootScope', function ($rootScope) {

    var svc = {};

    svc.Instance = function (id) {
        var instance_id = id;

        return {
            loadPDF: function (data) {
                $rootScope.$broadcast('pdfviewer.loadPDF', instance_id, data);
            },

            prevPage: function () {
                $rootScope.$broadcast('pdfviewer.prevPage', instance_id);
            },
            nextPage: function () {
                $rootScope.$broadcast('pdfviewer.nextPage', instance_id);

            },
            gotoPage: function (page) {
                $rootScope.$broadcast('pdfviewer.gotoPage', instance_id, page);
            },

            setScale: function (scale) {
                $rootScope.$broadcast('pdfviewer.setScale', instance_id, scale);
            }
        };
    };

    return svc;
}]);
/*
 * @license
 * angular-socket-io v0.7.0
 * (c) 2014 Brian Ford http://briantford.com
 * License: MIT
 */



angular.module('socket-io', []).
  provider('socket', function () {

      'use strict';

      
      // when forwarding events, prefix the event name
      var defaultPrefix = 'socket:',
        ioSocket;

      // expose to provider
      this.$get = ['$rootScope', '$timeout', function ($rootScope, $timeout) {

          var asyncAngularify = function (socket, callback) {
              return callback ? function () {
                  var args = arguments;
                  $timeout(function () {
                      callback.apply(socket, args);
                  }, 0);
              } : angular.noop;
          };

          return function socketFactory(options) {
              options = options || {};
              var socket //= options.ioSocket || io.connect();
              var prefix = options.prefix === undefined ? defaultPrefix : options.prefix;
              var defaultScope = options.scope || $rootScope;

              var addListener = function (eventName, callback) {
                  socket.on(eventName, callback.__ng = asyncAngularify(socket, callback));
              };

              var addOnceListener = function (eventName, callback) {
                  socket.once(eventName, callback.__ng = asyncAngularify(socket, callback));
              };

              var wrappedSocket = {
                  on: addListener,
                  addListener: addListener,
                  once: addOnceListener,

                  emit: function (eventName, data, callback) {
                      var lastIndex = arguments.length - 1;
                      var callback = arguments[lastIndex];
                      if (typeof callback == 'function') {
                          callback = asyncAngularify(socket, callback);
                          arguments[lastIndex] = callback;
                      }
                      return socket.emit.apply(socket, arguments);
                  },

                  removeListener: function (ev, fn) {
                      if (fn && fn.__ng) {
                          arguments[1] = fn.__ng;
                      }
                      return socket.removeListener.apply(socket, arguments);
                  },

                  removeAllListeners: function () {
                      return socket.removeAllListeners.apply(socket, arguments);
                  },

                  disconnect: function (close) {
                      return socket.disconnect(close);
                  },

                  connect: function (ip) {
                      return socket = io.connect(ip, { 'forceNew': true });
                      //return socket = io.connect(ip, { 'force new connection': true });
                      
                      //return socket.connect();
                  },

                  // when socket.on('someEvent', fn (data) { ... }),
                  // call scope.$broadcast('someEvent', data)
                  forward: function (events, scope) {
                      if (events instanceof Array === false) {
                          events = [events];
                      }
                      if (!scope) {
                          scope = defaultScope;
                      }
                      events.forEach(function (eventName) {
                          var prefixedEvent = prefix + eventName;
                          var forwardBroadcast = asyncAngularify(socket, function () {
                              Array.prototype.unshift.call(arguments, prefixedEvent);
                              scope.$broadcast.apply(scope, arguments);
                          });
                          scope.$on('$destroy', function () {
                              socket.removeListener(eventName, forwardBroadcast);
                          });
                          socket.on(eventName, forwardBroadcast);
                      });
                  }
              };

              return wrappedSocket;
          };
      }];
  });
// https://github.com/angular-ui/ui-utils/issues/189

'use strict';
/*
 Attaches input mask onto input element
 */
angular.module('ui.mask', []).value('uiMaskConfig', {
  'maskDefinitions': {
      '9': /[0-9]/,
      '8': /[0-8]/,
      '7': /[0-7]/,
      '6': /[0-6]/,
      '5': /[0-5]/,
      '4': /[0-4]/,
      '3': /[0-3]/,
      '2': /[0-2]/,
      '1': /[0-1]/,
      '0': /[0]/,
      '*': /./,
      
      'A': /[A-Z]/,
      'a': /[a-z]/,
      'Z': /[A-ZÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/,
      'z': /[a-zçáàãâéèêẽíìĩîóòôõúùũüû]/,

      '@': /[a-zA-Z]/,
      '#': /[a-zA-ZçáàãâéèêẽíìĩîóòôõúùũüûÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/,
      '%': /[0-9a-zA-zçáàãâéèêẽíìĩîóòôõúùũüûÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/
  }
}).directive('uiMask', [
  'uiMaskConfig',
  '$parse',
  function (maskConfig, $parse) {
    return {
      priority: 100,
      require: 'ngModel',
      restrict: 'A',
      compile: function uiMaskCompilingFunction() {
        var options = maskConfig;
        return function uiMaskLinkingFunction(scope, iElement, iAttrs, controller) {
          var maskProcessed = false, eventsBound = false, maskCaretMap, maskPatterns, maskPlaceholder, maskComponents,
            // Minimum required length of the value to be considered valid
            minRequiredLength, value, valueMasked, isValid,
            // Vars for initializing/uninitializing
            originalPlaceholder = iAttrs.placeholder, originalMaxlength = iAttrs.maxlength,
            // Vars used exclusively in eventHandler()
            oldValue, oldValueUnmasked, oldCaretPosition, oldSelectionLength;

          //
          var clean = iAttrs.uiMaskClean == 'false' ? false : true
          var defPH = iAttrs.uiMaskPlaceholder || ' '

          function initialize(maskAttr) {
            if (!angular.isDefined(maskAttr)) {
              return uninitialize();
            }
            processRawMask(maskAttr);
            if (!maskProcessed) {
              return uninitialize();
            }
            initializeElement();
            bindEventListeners();
            return true;
          }
          function initPlaceholder(placeholderAttr) {
            if (!angular.isDefined(placeholderAttr)) {
              return;
            }
            maskPlaceholder = placeholderAttr;
            // If the mask is processed, then we need to update the value
            if (maskProcessed) {
              eventHandler();
            }
          }
          function formatter(fromModelValue) {
            if (!maskProcessed) {
              return fromModelValue;
            }
            value = unmaskValue(fromModelValue || '');
            isValid = validateValue(value);
            controller.$setValidity('mask', isValid);
            return isValid && value.length ? maskValue(value) : undefined;
          }
          function parser(fromViewValue) {
            if (!maskProcessed) {
              return fromViewValue;
            }
            value = unmaskValue(fromViewValue || '');
            isValid = validateValue(value);
            // We have to set viewValue manually as the reformatting of the input
            // value performed by eventHandler() doesn't happen until after
            // this parser is called, which causes what the user sees in the input
            // to be out-of-sync with what the controller's $viewValue is set to.
            controller.$viewValue = value.length ? maskValue(value) : '';
            controller.$setValidity('mask', isValid);
            if (value === '' && iAttrs.required) {
              controller.$setValidity('required', false);
            }

              
              //return isValid ? value : undefined;
              // if not clean return maskValue
            return isValid ? (clean === true ? value : maskValue(value)) : undefined;
          }
          var linkOptions = {};
          if (iAttrs.uiOptions) {
            linkOptions = scope.$eval('[' + iAttrs.uiOptions + ']');
            if (angular.isObject(linkOptions[0])) {
              // we can't use angular.copy nor angular.extend, they lack the power to do a deep merge
              linkOptions = function (original, current) {
                for (var i in original) {
                  if (Object.prototype.hasOwnProperty.call(original, i)) {
                    if (!current[i]) {
                      current[i] = angular.copy(original[i]);
                    } else {
                      angular.extend(current[i], original[i]);
                    }
                  }
                }
                return current;
              }(options, linkOptions[0]);
            }
          } else {
            linkOptions = options;
          }
          iAttrs.$observe('uiMask', initialize);
          iAttrs.$observe('placeholder', initPlaceholder);
          var modelViewValue = false;
          iAttrs.$observe('modelViewValue', function (val) {
            if (val === 'true') {
              modelViewValue = true;
            }
          });
          scope.$watch(iAttrs.ngModel, function (val) {
            if (modelViewValue && val) {
              var model = $parse(iAttrs.ngModel);
              model.assign(scope, controller.$viewValue);
            }
          });
          controller.$formatters.push(formatter);
          controller.$parsers.push(parser);
          function uninitialize() {
            maskProcessed = false;
            unbindEventListeners();
            if (angular.isDefined(originalPlaceholder)) {
              iElement.attr('placeholder', originalPlaceholder);
            } else {
              iElement.removeAttr('placeholder');
            }
            if (angular.isDefined(originalMaxlength)) {
              iElement.attr('maxlength', originalMaxlength);
            } else {
              iElement.removeAttr('maxlength');
            }
            iElement.val(controller.$modelValue);
            controller.$viewValue = controller.$modelValue;
            return false;
          }
          function initializeElement() {
            value = oldValueUnmasked = unmaskValue(controller.$modelValue || '');
            valueMasked = oldValue = maskValue(value);
            isValid = validateValue(value);
            var viewValue = isValid && value.length ? valueMasked : '';
            if (iAttrs.maxlength) {
              // Double maxlength to allow pasting new val at end of mask
              iElement.attr('maxlength', maskCaretMap[maskCaretMap.length - 1] * 2);
            }
            iElement.attr('placeholder', maskPlaceholder);
            iElement.val(viewValue);
            controller.$viewValue = viewValue;  // Not using $setViewValue so we don't clobber the model value and dirty the form
                                                // without any kind of user interaction.
          }
          function bindEventListeners() {
            if (eventsBound) {
              return;
            }
            iElement.bind('blur', blurHandler);
            iElement.bind('mousedown mouseup', mouseDownUpHandler);
            iElement.bind('input keyup click focus', eventHandler);
            eventsBound = true;
          }
          function unbindEventListeners() {
            if (!eventsBound) {
              return;
            }
            iElement.unbind('blur', blurHandler);
            iElement.unbind('mousedown', mouseDownUpHandler);
            iElement.unbind('mouseup', mouseDownUpHandler);
            iElement.unbind('input', eventHandler);
            iElement.unbind('keyup', eventHandler);
            iElement.unbind('click', eventHandler);
            iElement.unbind('focus', eventHandler);
            eventsBound = false;
          }
          function validateValue(value) {
            // Zero-length value validity is ngRequired's determination
            return value.length ? value.length >= minRequiredLength : true;
          }
          function unmaskValue(value) {
            var valueUnmasked = '', maskPatternsCopy = maskPatterns.slice();
            // Preprocess by stripping mask components from value
            value = value.toString();
            angular.forEach(maskComponents, function (component) {
              value = value.replace(component, '');
            });
            angular.forEach(value.split(''), function (chr) {
              if (maskPatternsCopy.length && maskPatternsCopy[0].test(chr)) {
                valueUnmasked += chr;
                maskPatternsCopy.shift();
              }
            });
            return valueUnmasked;
          }
          function maskValue(unmaskedValue) {
            var valueMasked = '', maskCaretMapCopy = maskCaretMap.slice();
            angular.forEach(maskPlaceholder.split(''), function (chr, i) {
              if (unmaskedValue.length && i === maskCaretMapCopy[0]) {
                  //valueMasked += unmaskedValue.charAt(0) || '_';

                  // defPH
                  valueMasked += unmaskedValue.charAt(0) || defPH;

                unmaskedValue = unmaskedValue.substr(1);
                maskCaretMapCopy.shift();
              } else {
                valueMasked += chr;
              }
            });
            return valueMasked;
          }
          function getPlaceholderChar(i) {
            var placeholder = iAttrs.placeholder;
            if (typeof placeholder !== 'undefined' && placeholder[i]) {
              return placeholder[i];
            } else {
                //return '_';

                // return
                return defPH
            }
          }
          // Generate array of mask components that will be stripped from a masked value
          // before processing to prevent mask components from being added to the unmasked value.
          // E.g., a mask pattern of '+7 9999' won't have the 7 bleed into the unmasked value.
          // If a maskable char is followed by a mask char and has a mask
          // char behind it, we'll split it into it's own component so if
          // a user is aggressively deleting in the input and a char ahead
          // of the maskable char gets deleted, we'll still be able to strip
          // it in the unmaskValue() preprocessing.
          function getMaskComponents() {
              //return maskPlaceholder.replace(/[_]+/g, '_').replace(/([^_]+)([a-zA-Z0-9])([^_])/g, '$1$2_$3').split('_');
              //
              return maskPlaceholder.replace(/[defPH]+/g, defPH).replace(/([^defPH]+)([a-zA-Z0-9])([^defPH])/g, '$1$2defPH$3').split('defPH');
          }
          function processRawMask(mask) {
            var characterCount = 0;
            maskCaretMap = [];
            maskPatterns = [];
            maskPlaceholder = '';
            if (typeof mask === 'string') {
              minRequiredLength = 0;
              var isOptional = false, splitMask = mask.split('');
              angular.forEach(splitMask, function (chr, i) {
                if (linkOptions.maskDefinitions[chr]) {
                  maskCaretMap.push(characterCount);
                  maskPlaceholder += getPlaceholderChar(i);
                  maskPatterns.push(linkOptions.maskDefinitions[chr]);
                  characterCount++;
                  if (!isOptional) {
                    minRequiredLength++;
                  }
                } else if (chr === '?') {
                  isOptional = true;
                } else {
                  maskPlaceholder += chr;
                  characterCount++;
                }
              });
            }
            // Caret position immediately following last position is valid.
            maskCaretMap.push(maskCaretMap.slice().pop() + 1);
            maskComponents = getMaskComponents();
            maskProcessed = maskCaretMap.length > 1 ? true : false;
          }
          function blurHandler() {
            oldCaretPosition = 0;
            oldSelectionLength = 0;
            if (!isValid || value.length === 0) {
              valueMasked = '';
              iElement.val('');
              scope.$apply(function () {
                controller.$setViewValue('');
              });
            }
          }
          function mouseDownUpHandler(e) {
            if (e.type === 'mousedown') {
              iElement.bind('mouseout', mouseoutHandler);
            } else {
              iElement.unbind('mouseout', mouseoutHandler);
            }
          }
          iElement.bind('mousedown mouseup', mouseDownUpHandler);
          function mouseoutHandler() {
            /*jshint validthis: true */
            oldSelectionLength = getSelectionLength(this);
            iElement.unbind('mouseout', mouseoutHandler);
          }
          function eventHandler(e) {
            /*jshint validthis: true */
            e = e || {};
            // Allows more efficient minification
            var eventWhich = e.which, eventType = e.type;
            // Prevent shift and ctrl from mucking with old values
            if (eventWhich === 16 || eventWhich === 91) {
              return;
            }
            var val = iElement.val(), valOld = oldValue, valMasked, valUnmasked = unmaskValue(val), valUnmaskedOld = oldValueUnmasked, valAltered = false, caretPos = getCaretPosition(this) || 0, caretPosOld = oldCaretPosition || 0, caretPosDelta = caretPos - caretPosOld, caretPosMin = maskCaretMap[0], caretPosMax = maskCaretMap[valUnmasked.length] || maskCaretMap.slice().shift(), selectionLenOld = oldSelectionLength || 0, isSelected = getSelectionLength(this) > 0, wasSelected = selectionLenOld > 0,
              // Case: Typing a character to overwrite a selection
              isAddition = val.length > valOld.length || selectionLenOld && val.length > valOld.length - selectionLenOld,
              // Case: Delete and backspace behave identically on a selection
              isDeletion = val.length < valOld.length || selectionLenOld && val.length === valOld.length - selectionLenOld, isSelection = eventWhich >= 37 && eventWhich <= 40 && e.shiftKey,
              // Arrow key codes
              isKeyLeftArrow = eventWhich === 37,
              // Necessary due to "input" event not providing a key code
              isKeyBackspace = eventWhich === 8 || eventType !== 'keyup' && isDeletion && caretPosDelta === -1, isKeyDelete = eventWhich === 46 || eventType !== 'keyup' && isDeletion && caretPosDelta === 0 && !wasSelected,
              // Handles cases where caret is moved and placed in front of invalid maskCaretMap position. Logic below
              // ensures that, on click or leftward caret placement, caret is moved leftward until directly right of
              // non-mask character. Also applied to click since users are (arguably) more likely to backspace
              // a character when clicking within a filled input.
              caretBumpBack = (isKeyLeftArrow || isKeyBackspace || eventType === 'click') && caretPos > caretPosMin;
            oldSelectionLength = getSelectionLength(this);
            // These events don't require any action
            if (isSelection || isSelected && (eventType === 'click' || eventType === 'keyup')) {
              return;
            }
            // Value Handling
            // ==============
            // User attempted to delete but raw value was unaffected--correct this grievous offense
            if (eventType === 'input' && isDeletion && !wasSelected && valUnmasked === valUnmaskedOld) {
              while (isKeyBackspace && caretPos > caretPosMin && !isValidCaretPosition(caretPos)) {
                caretPos--;
              }
              while (isKeyDelete && caretPos < caretPosMax && maskCaretMap.indexOf(caretPos) === -1) {
                caretPos++;
              }
              var charIndex = maskCaretMap.indexOf(caretPos);
              // Strip out non-mask character that user would have deleted if mask hadn't been in the way.
              valUnmasked = valUnmasked.substring(0, charIndex) + valUnmasked.substring(charIndex + 1);
              valAltered = true;
            }
            // Update values
            valMasked = maskValue(valUnmasked);
            oldValue = valMasked;
            oldValueUnmasked = valUnmasked;
            iElement.val(valMasked);
            if (valAltered) {
              // We've altered the raw value after it's been $digest'ed, we need to $apply the new value.
              scope.$apply(function () {
                controller.$setViewValue(valUnmasked);
              });
            }
            // Caret Repositioning
            // ===================
            // Ensure that typing always places caret ahead of typed character in cases where the first char of
            // the input is a mask char and the caret is placed at the 0 position.
            if (isAddition && caretPos <= caretPosMin) {
              caretPos = caretPosMin + 1;
            }
            if (caretBumpBack) {
              caretPos--;
            }
            // Make sure caret is within min and max position limits
            caretPos = caretPos > caretPosMax ? caretPosMax : caretPos < caretPosMin ? caretPosMin : caretPos;
            // Scoot the caret back or forth until it's in a non-mask position and within min/max position limits
            while (!isValidCaretPosition(caretPos) && caretPos > caretPosMin && caretPos < caretPosMax) {
              caretPos += caretBumpBack ? -1 : 1;
            }
            if (caretBumpBack && caretPos < caretPosMax || isAddition && !isValidCaretPosition(caretPosOld)) {
              caretPos++;
            }
            oldCaretPosition = caretPos;
            setCaretPosition(this, caretPos);
          }
          function isValidCaretPosition(pos) {
            return maskCaretMap.indexOf(pos) > -1;
          }
          function getCaretPosition(input) {
            if (!input)
              return 0;
            if (input.selectionStart !== undefined) {
              return input.selectionStart;
            } else if (document.selection) {
              // Curse you IE
              input.focus();
              var selection = document.selection.createRange();
              selection.moveStart('character', input.value ? -input.value.length : 0);
              return selection.text.length;
            }
            return 0;
          }
          function setCaretPosition(input, pos) {
            if (!input)
              return 0;
            if (input.offsetWidth === 0 || input.offsetHeight === 0) {
              return;  // Input's hidden
            }
            if (input.setSelectionRange) {
              input.focus();
              input.setSelectionRange(pos, pos);
            } else if (input.createTextRange) {
              // Curse you IE
              var range = input.createTextRange();
              range.collapse(true);
              range.moveEnd('character', pos);
              range.moveStart('character', pos);
              range.select();
            }
          }
          function getSelectionLength(input) {
            if (!input)
              return 0;
            if (input.selectionStart !== undefined) {
              return input.selectionEnd - input.selectionStart;
            }
            if (document.selection) {
              return document.selection.createRange().text.length;
            }
            return 0;
          }
          // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
          if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (searchElement) {
              if (this === null) {
                throw new TypeError();
              }
              var t = Object(this);
              var len = t.length >>> 0;
              if (len === 0) {
                return -1;
              }
              var n = 0;
              if (arguments.length > 1) {
                n = Number(arguments[1]);
                if (n !== n) {
                  // shortcut for verifying if it's NaN
                  n = 0;
                } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                  n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
              }
              if (n >= len) {
                return -1;
              }
              var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
              for (; k < len; k++) {
                if (k in t && t[k] === searchElement) {
                  return k;
                }
              }
              return -1;
            };
          }
        };
      }
    };
  }
]);