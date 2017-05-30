/*! directives : mccClient - 1.0.0 (10.01.2015 11:01) */
var app;
(function (app) {
    (function (directive) {
        var ValidSubmit = (function () {
            function ValidSubmit(parse) {
                var directive = {};

                directive.require = '^form';
                directive.restrict = 'A';

                directive.link = function (scope, element, attrs, form) {
                    form.$submitted = true;

                    var fn = parse(attrs.onValidSubmit);

                    element.on('submit', function (event) {
                        scope.$apply(function () {
                            element.addClass('ng-submitted');

                            form.$submitted = true;

                            if (form.$valid) {
                                if (typeof fn === 'function') {
                                    fn(scope, { $event: event });
                                }
                            }
                        });
                    });
                };

                return directive;
            }
            ValidSubmit.$inject = ['$parse'];
            return ValidSubmit;
        })();
        directive.ValidSubmit = ValidSubmit;

        app.registerDirective('onValidSubmit', ValidSubmit);
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

var app;
(function (app) {
    (function (directive) {
        var inputNumber = (function () {
            function inputNumber() {
                var directive = {};

                directive.restrict = 'A';
                directive.require = '?ngModel';

                directive.link = function (scope, element, attrs, ngModelCtrl) {
                    if (!ngModelCtrl) {
                        return;
                    }

                    if (attrs.type !== 'number') {
                        return;
                    }
                    console.log('unbind');
                    element.unbind('input');

                    ngModelCtrl.$parsers.push(function (val) {
                        console.log(val);
                        var clean = val.replace(/[^0-9]+/g, '');
                        if (val !== clean) {
                            ngModelCtrl.$setViewValue(clean);
                            ngModelCtrl.$render();
                        }
                        return clean;
                    });

                    element.bind('keypress', function (event) {
                        if (event.keyCode === 32) {
                            event.preventDefault();
                        }
                    });

                    scope.$on('$destroy', function () {
                        console.log('destroy');
                        element.unbind('keypress');
                    });
                };

                return directive;
            }
            inputNumber.$inject = [];
            return inputNumber;
        })();
        directive.inputNumber = inputNumber;

        app.registerDirective('inputNumber', inputNumber);
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

var app;
(function (app) {
    (function (directive) {
        var Validate = (function () {
            function Validate(timeout) {
                var directive = {};

                directive.require = '^form';
                directive.restrict = 'AEC';

                directive.link = function (scope, element, attrs, form) {
                    var inputs;

                    timeout(function () {
                        inputs = element.find("input");

                        for (var i = 0; i < inputs.length; i++) {
                            processInputs(inputs[i]);
                        }
                    }, 0, true);

                    var processInputs = function (input) {
                        var attributes = input.attributes;

                        var inp = angular.element(input);

                        if ((attributes.getNamedItem('data-ng-model') || attributes.getNamedItem('ng-model')) && attributes.getNamedItem('name')) {
                            scope.$watch(function (newval, oldval) {
                                if (newval != oldval) {
                                    if (inp.hasClass('ng-invalid')) {
                                        element.removeClass('has-success');
                                        element.addClass('has-error');
                                    } else {
                                        element.removeClass('has-error').addClass('has-success');
                                    }
                                }
                            }, false);
                        }
                    };
                };

                return directive;
            }
            Validate.$inject = ['$timeout'];
            return Validate;
        })();
        directive.Validate = Validate;

        app.registerDirective('validate', Validate);
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

var app;
(function (app) {
    (function (directive) {
        var Verify = (function () {
            function Verify(timeout, popup) {
                var directive = {};

                directive.restrict = 'A';

                directive.link = function (scope, element, attributes) {
                    if (element[0].nodeName !== 'INPUT' || !attributes.pbVerify) {
                        return;
                    }

                    var verifyVal = attributes.pbVerify;

                    function showPopup() {
                        if (element.val() != verifyVal) {
                            element.unbind('blur', showPopup);

                            timeout(function () {
                                element[0].focus();
                                element[0].blur();
                            }, 0, true);

                            popup.confirmNoYes(attributes.pbVerifyMsg || 'Möchten Sie das Feld ändern ?', function (res) {
                                if (res) {
                                    verifyVal = element.val();
                                } else {
                                    element.val(verifyVal);
                                }

                                timeout(function () {
                                    element[0].focus();
                                    element.bind('blur', showPopup);
                                }, 100, true);
                            });
                        }
                    }

                    element.bind('blur', showPopup);
                };

                return directive;
            }
            Verify.$inject = ['$timeout', 'ionPopupService'];
            return Verify;
        })();
        directive.Verify = Verify;

        app.registerDirective('pbVerify', Verify);
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

var app;
(function (app) {
    (function (directive) {
        var ValidNumber = (function () {
            function ValidNumber() {
                var directive = {};

                directive.require = '?ngModel';
                console.log('input');

                directive.link = function (scope, element, attrs, ngModelCtrl) {
                    if (!ngModelCtrl) {
                    }

                    ngModelCtrl.$parsers.unshift(checkForInteger);

                    function checkForInteger(viewValue) {
                        console.log(viewValue);
                    }

                    scope.$on('$destroy', function () {
                        console.log('destroy');
                        element.unbind('keypress');
                    });
                };

                return directive;
            }
            ValidNumber.$inject = [];
            return ValidNumber;
        })();
        directive.ValidNumber = ValidNumber;

        app.registerDirective('ValidNumber', ValidNumber);
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

'use strict';
var app;
(function (app) {
    (function (directive) {
        var DirectiveSign = (function () {
            function DirectiveSign($ionicGesture) {
                this.$ionicGesture = $ionicGesture;
                this.restrict = 'A';
                console.log('init directive sign -> ' + $ionicGesture);
            }
            DirectiveSign.prototype.link = function (scope, element, attrs) {
                var handleDrag = function (e) {
                    console.log('gest: ', e.gesture);
                };

                var handleStart = function (e) {
                    console.log('start: ', e);
                };

                var ctx = element[0].getContext('2d');

                var drawing = false;

                var lastX;
                var lastY;
                var currentX;
                var currentY;

                element.bind('start', function (event) {
                    lastX = event.offsetX;
                    lastY = event.offsetY;

                    ctx.beginPath();

                    drawing = true;
                });

                element.bind('move', function (event) {
                    if (drawing) {
                        currentX = event.offsetX;
                        currentY = event.offsetY;

                        draw(lastX, lastY, currentX, currentY);

                        lastX = currentX;
                        lastY = currentY;
                    }
                });

                element.bind('end', function (event) {
                    drawing = false;
                });

                function reset() {
                    element[0].width = element[0].width;
                }

                function draw(lX, lY, cX, cY) {
                    ctx.moveTo(lX, lY);

                    ctx.lineTo(cX, cY);

                    ctx.strokeStyle = "#4bf";

                    ctx.stroke();
                }
            };

            DirectiveSign.$inject = ['$ionicGesture'];
            return DirectiveSign;
        })();
        directive.DirectiveSign = DirectiveSign;
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

var app;
(function (app) {
    (function (directive) {
        var Signature = (function () {
            function Signature($timeout) {
                var directive = {};

                directive.restrict = "E";

                directive.template = '<canvas></canvas>';

                directive.scope = {
                    ngModel: '=',
                    format: '@'
                };

                directive.link = function (scope, element, attrs) {
                    var canvas = null;
                    var sign = null;

                    canvas = element.find('canvas')[0];

                    if (canvas) {
                        canvas.setAttribute('width', attrs.width || '400px');
                        canvas.setAttribute('height', attrs.height || '200px');
                    }

                    sign = new SignaturePad(canvas);

                    sign.onEnd = function () {
                        var format = 'image/' + (scope.format || 'png');

                        $timeout(function () {
                            scope.ngModel = sign.toDataURL(format);
                        });
                    };

                    scope.$watch('ngModel', function (newVal, oldVal) {
                        if (!newVal && !oldVal) {
                            return;
                        }

                        if (!newVal && oldVal) {
                            sign.clear();
                        }

                        if (newVal != oldVal) {
                        }
                    });

                    scope.$on('$destroy', function () {
                        sign = null;
                        canvas = null;
                    });
                };

                return directive;
            }
            Signature.$inject = ['$timeout'];
            return Signature;
        })();
        directive.Signature = Signature;

        app.registerDirective('sign', Signature);
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

'use strict';
var Directives;
(function (Directives) {
    var DirectiveTest = (function () {
        function DirectiveTest() {
            this.template = '<div></div>';
            this.restrict = 'A';
            console.log('init directive');
        }
        DirectiveTest.prototype.link = function (scope, element, attrs) {
            element.text('this is the directiveTest directive');
        };

        DirectiveTest.$inject = [];
        return DirectiveTest;
    })();
    Directives.DirectiveTest = DirectiveTest;
})(Directives || (Directives = {}));

var app;
(function (app) {
    (function (_directive) {
        var Watcher = (function () {
            function Watcher() {
                var directive = {};

                directive.restrict = 'A', directive.require = '?ngModel';

                directive.link = function (scope, element, attrs, ngModelCtrl) {
                    if (!ngModelCtrl) {
                        return;
                    }

                    var noValue = false;

                    var pos = [];

                    var toField = scope.$eval(attrs.pbWatch);

                    if (!toField) {
                        return;
                    }

                    if (angular.isArray(toField)) {
                        var i = 0;

                        toField.forEach(function (el) {
                            pos[i] = el.tmpidx;
                            i += 1;

                            if (angular.isUndefined(el.value)) {
                                noValue = true;
                            }
                        });
                    } else {
                        pos[0] = toField.tmpidx;

                        if (angular.isUndefined(toField.value)) {
                            noValue = true;
                        }
                    }
                    ;

                    if (noValue) {
                        pos = [];
                        return;
                    }

                    scope.$watch(attrs.ngModel, function (newval, oldval) {
                        if (angular.isArray(toField)) {
                            var i = 0;

                            toField.forEach(function (el) {
                                Watcher.setField(el, newval, pos[i]);
                                i += 1;
                            });
                        } else {
                            Watcher.setField(toField, newval, pos[0]);
                        }
                    });
                };

                return directive;
            }
            Watcher.setField = function (field, value, pos) {
                if (typeof pos === "undefined") { pos = 0; }
                if (!field.orgvalue) {
                    if (field.tmpvalue && pos) {
                        field.tmpvalue[pos] = value;

                        field.value = '';

                        var i = 0;

                        field.tmpvalue.forEach(function (el) {
                            field.value += el + (field.value ? '' : ' ');
                            i += 1;
                        });
                    } else {
                        field.value = value;
                    }
                }
            };
            Watcher.$inject = [];
            return Watcher;
        })();
        _directive.Watcher = Watcher;

        app.registerDirective('pbWatch', Watcher);
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

var directives = angular.module('directives', []);

var app;
(function (app) {
    (function (directive) {
        var Button = (function () {
            function Button() {
                var directive = {};

                directive.restrict = 'E';

                directive.compile = function (element, attributes) {
                    if (!attributes.type) {
                        element.attr('type', 'button');
                    }

                    element.addClass('button');

                    if (attributes.icon || attributes.iconLeft || attributes.iconRight) {
                        element.addClass('button-icon');
                        element.addClass('ion-' + (attributes.icon || attributes.iconLeft || attributes.iconRight));

                        if (attributes.iconRight) {
                            element.addClass('icon-right');
                        } else {
                            element.addClass('icon-left');
                        }
                    }

                    if (attributes.style) {
                        element.addClass('button-' + attributes.style);
                    }

                    if (attributes.size) {
                        element.addClass('button-' + attributes.size);
                    }

                    if (attributes.color) {
                        element.addClass('button-' + attributes.color);
                    }
                };

                return directive;
            }
            Button.$inject = [];
            return Button;
        })();
        directive.Button = Button;

        app.registerDirective('button', Button);
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

var app;
(function (app) {
    (function (directive) {
        var SelectSingle = (function () {
            function SelectSingle() {
                var directive = {};

                directive.restrict = 'E';

                directive.replace = true;

                directive.scope = {
                    model: '=',
                    options: '=',
                    defval: '='
                };

                directive.templateUrl = 'tpl_selectSingle.html';

                directive.link = function (scope, element, attrs, ngModel) {
                    scope.model = scope.model_.value;
                };

                return directive;
            }
            SelectSingle.$inject = [];
            return SelectSingle;
        })();
        directive.SelectSingle = SelectSingle;

        app.registerDirective('singleSelect', SelectSingle);
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

var app;
(function (app) {
    (function (directive) {
        var EnterIsTab = (function () {
            function EnterIsTab(timeout, parse) {
                var directive = {};

                directive.restrict = 'A';
                directive.require = '^form';
                directive.priority = 2;

                directive.link = function (scope, element, attributes, form) {
                    var fn = parse(attributes.enterIsTab);

                    if (fn) {
                        var counter;

                        if (angular.isFunction(fn)) {
                            counter = fn(scope);
                        } else {
                            counter = fn;
                        }

                        var classname = form.$name + '_tab_';

                        element.addClass(classname + counter);

                        element.bind('keydown', function (ev) {
                            if ((ev.keyCode || ev.which) === 13) {
                                var ele = angular.element(document.getElementsByClassName(classname + (counter + 1)));

                                if (ele && ele.length > 0) {
                                    ev.preventDefault();

                                    ele[0].focus();
                                } else {
                                    timeout(function () {
                                        element[0].blur();
                                    }, 0, true);
                                }
                            }
                        });
                    }
                };

                return directive;
            }
            EnterIsTab.$inject = ['$timeout', '$parse'];
            return EnterIsTab;
        })();
        directive.EnterIsTab = EnterIsTab;

        app.registerDirective('enterIsTab', EnterIsTab);
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

'use strict';
var app;
(function (app) {
    (function (directive) {
        var ngDate = (function () {
            function ngDate(dateFilter) {
                var inputDateFormat_us = 'yyyy-MM-dd';
                var inputDateFormat_de = 'dd.MM.yyyy';

                var directive = {};

                directive.require = '?ngModel';
                directive.restrict = 'E';

                function parseDateString(dateString) {
                    if (typeof dateString === 'undefined' || dateString === '') {
                        return null;
                    }

                    if (dateString.indexOf('-') > -1) {
                        var parts = dateString.split('-');
                        if (parts.length !== 3) {
                            return null;
                        }

                        var year = parseInt(parts[0], 10);
                        var month = parseInt(parts[1], 10);
                        var day = parseInt(parts[2], 10);

                        if (month < 1 || year < 1 || day < 1) {
                            return null;
                        }

                        return dateFilter(new Date(year, (month - 1), day), inputDateFormat_de);
                    } else {
                        var parts = dateString.split('.');
                        if (parts.length !== 3) {
                            return null;
                        }

                        var year = parseInt(parts[2], 10);
                        var month = parseInt(parts[1], 10);
                        var day = parseInt(parts[0], 10);

                        if (month < 1 || year < 1 || day < 1) {
                            return null;
                        }

                        return dateFilter(new Date(year, (month - 1), day), inputDateFormat_us);
                    }
                }

                directive.link = function (scope, element, attrs, ngModel) {
                    if (ngModel && typeof attrs.type !== 'undefined' && attrs.type === 'date') {
                        ngModel.$formatters.push(function (modelValue) {
                            return parseDateString(modelValue);
                        });

                        ngModel.$parsers.push(function (viewValue) {
                            return parseDateString(viewValue);
                        });
                    }
                };

                return directive;
            }
            ngDate.$inject = ['dateFilter'];
            return ngDate;
        })();
        directive.ngDate = ngDate;

        app.registerDirective('input', ngDate);
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

'use strict';
var app;
(function (app) {
    (function (directive) {
        var ngNumber = (function () {
            function ngNumber() {
                var directive = {};

                directive.require = '?ngModel';
                directive.restrict = 'E';
                directive.priority = 2;

                directive.link = function (scope, element, attrs, ngModel) {
                    if (ngModel && typeof attrs.type !== 'undefined' && attrs.type === 'number') {
                        ngModel.$formatters.push(function (modelValue) {
                            if (!modelValue) {
                                return parseInt(ngModel.$modelValue);
                            }

                            return parseInt(modelValue);
                        });

                        ngModel.$parsers.push(function (viewValue) {
                            if (viewValue) {
                                return parseInt(viewValue);
                            }

                            return null;
                        });
                    }
                };

                return directive;
            }
            ngNumber.$inject = [];
            return ngNumber;
        })();
        directive.ngNumber = ngNumber;

        app.registerDirective('input', ngNumber);
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

var app;
(function (app) {
    (function (directive) {
        var ngVisible = (function () {
            function ngVisible() {
                var directive = {};

                directive.link = function (scope, element, attrs) {
                    scope.$watch(attrs.ngVisible, function (visible) {
                        element.css('visibility', visible ? 'visible' : 'hidden');
                    });
                };

                return directive;
            }
            ngVisible.$inject = [];
            return ngVisible;
        })();
        directive.ngVisible = ngVisible;

        app.registerDirective('ngVisible', ngVisible);
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

var app;
(function (app) {
    (function (directive) {
        var onPinchIn = (function () {
            function onPinchIn(timeout, gesture) {
                var directive = {};

                directive.restrict = "A";

                directive.link = function (scope, element, attr) {
                    var handlePinchIn = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        timeout(scope.$eval(attr.onPinchIn), 250, true);
                    };

                    var pinchInGesture = gesture.on('pinchin', handlePinchIn, element);

                    scope.$on('$destroy', function () {
                        gesture.off(pinchInGesture, 'pinchin', handlePinchIn);
                    });
                };

                return directive;
            }
            onPinchIn.$inject = ['$timeout', '$ionicGesture'];
            return onPinchIn;
        })();
        directive.onPinchIn = onPinchIn;

        app.registerDirective('onPinchIn', onPinchIn);
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

var app;
(function (app) {
    (function (directive) {
        var onPinchOut = (function () {
            function onPinchOut(timeout, gesture) {
                var directive = {};

                directive.restrict = "A";

                directive.link = function (scope, element, attr) {
                    var handlePinchOut = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        timeout(scope.$eval(attr.onPinchOut), 250, true);
                    };

                    var pinchOutGesture = gesture.on('pinchout', handlePinchOut, element);

                    scope.$on('$destroy', function () {
                        gesture.off(pinchOutGesture, 'pinchout', handlePinchOut);
                    });
                };

                return directive;
            }
            onPinchOut.$inject = ['$timeout', '$ionicGesture'];
            return onPinchOut;
        })();
        directive.onPinchOut = onPinchOut;

        app.registerDirective('onPinchOut', onPinchOut);
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

var app;
(function (app) {
    (function (_directive) {
        var test = (function () {
            function test(Gesture) {
                var directive = {};

                directive.restrict = "A";

                directive.link = function (scope, element, attrs) {
                    var startGesture = Gesture.on('touchstart1', handleStart, element);
                    var moveGesture = Gesture.on('drag3', handleMove, element);
                    var endGesture = Gesture.on('dragend3', handleEnd, element);

                    element[0].addEventListener('touchstart', handleTouch);
                    element[0].addEventListener('touchmove', handleTouch);
                    element[0].addEventListener('touchcancel', handleTouch);
                    element[0].addEventListener('touchend', handleTouch);

                    var touchOriginX = 0;
                    var touchOriginY = 0;

                    var drawing = false;

                    function handleTouch(e) {
                        e.preventDefault();

                        switch (e.type) {
                            case 'touchstart':
                                console.log("touchstart");

                                if (!drawing) {
                                    touchOriginX = e.changedTouches[0].screenX;
                                    touchOriginY = e.changedTouches[0].screenY;

                                    drawing = true;
                                    alert("touchstart at: " + touchOriginX + ' / ' + touchOriginY);
                                }

                                break;

                            case 'touchmove':
                                var x = e.targetTouches[0].screenX - touchOriginX;
                                var y = e.targetTouches[0].screenY - touchOriginY;

                                break;

                            case 'touchcancel':
                                drawing = false;

                                break;

                            case 'touchend':
                                var x = e.targetTouches[0].screenX - touchOriginX;
                                var y = e.targetTouches[0].screenY - touchOriginY;

                                alert("touchend at: " + x + ' / ' + y);
                                break;
                        }
                    }

                    var ctx = element[0].getContext('2d');
                    ctx.strokeStyle = 'Black';

                    var lastX = 0;
                    var lastY = 0;
                    var currentX = 0;
                    var currentY = 0;

                    function handleStart(e) {
                        e.preventDefault();

                        console.log(e.gesture.srcEvent.offsetX);

                        lastX = e.gesture.touches[0].pageX - 276;
                        lastY = e.gesture.touches[0].pageY - 51;

                        ctx.beginPath();
                        ctx.moveTo(lastX, lastY);

                        drawing = true;

                        console.log('Dragstart: ', lastX, ' / ', lastY);
                    }

                    function handleMove(e) {
                        if (drawing) {
                            var touches = e.gesture.touches[0];
                            currentX = e.gesture.touches[0].pageX - 276;
                            currentY = e.gesture.touches[0].pageY - 51;

                            ctx.lineTo(currentX, currentY);
                            ctx.stroke();

                            lastX = currentX;
                            lastY = currentY;
                        }
                    }

                    function handleEnd(e) {
                        console.log('Dragend: ', e);

                        drawing = false;
                    }

                    function draw(lX, lY, cX, cY) {
                        ctx.moveTo(lX, lY);

                        ctx.lineTo(cX, cY);

                        ctx.strokeStyle = "#4bf";

                        ctx.stroke();
                    }

                    scope.$on('$destroy', function () {
                        Gesture.off(startGesture, 'dragstart', handleStart);
                        Gesture.off(moveGesture, 'drag', handleMove);
                        Gesture.off(endGesture, 'dragend', handleEnd);
                    });
                };

                return directive;
            }
            test.$inject = ['$ionicGesture'];
            return test;
        })();
        _directive.test = test;

        app.registerDirective('sign', test);
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));
