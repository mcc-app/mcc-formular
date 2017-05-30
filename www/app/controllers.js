var app;
(function (app) {
    (function (controller) {
        'use strict';

        

        

        var CtrlBlanko = (function () {
            function CtrlBlanko(scope, $state, loadingMsg, data) {
                this.scope = scope;
                this.$state = $state;
                this.loadingMsg = loadingMsg;
                this.data = data;
                scope.vm = this;

                this.shownGroup = data.groups['de'];
            }
            CtrlBlanko.prototype.toggleGroup = function (group) {
                if (this.isGroupShown(group)) {
                    this.shownGroup = null;
                } else {
                    this.shownGroup = group;
                }
            };

            CtrlBlanko.prototype.isGroupShown = function (group) {
                return this.shownGroup === group;
            };

            CtrlBlanko.prototype.selectFormular = function (id) {
                var _this = this;
                this.loadingMsg.show('Formular wird angefordert ...');

                this.data.apiBlankoFormular(id, function (err) {
                    _this.loadingMsg.hide();

                    if (!err) {
                        _this.$state.transitionTo('formular');
                    }
                });
            };
            CtrlBlanko.$inject = ['$scope', '$state', 'ionLoading', 'dataService'];
            return CtrlBlanko;
        })();
        controller.CtrlBlanko = CtrlBlanko;

        app.registerController('blankoCtrl', CtrlBlanko);
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

var app;
(function (app) {
    (function (controller) {
        'use strict';

        

        

        var CtrlContact = (function () {
            function CtrlContact(scope, forgetModal) {
                this.scope = scope;
                this.forgetModal = forgetModal;
                scope.vm = this;
            }
            CtrlContact.prototype.showForgetPWDlg = function () {
                this.forgetModal.show();
            };
            CtrlContact.$inject = ['$scope', 'modalForgetPWService'];
            return CtrlContact;
        })();
        controller.CtrlContact = CtrlContact;

        app.registerController('contactCtrl', CtrlContact);
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

var app;
(function (app) {
    (function (controller) {
        'use strict';

        

        

        var ForgetPW = (function () {
            function ForgetPW($scope, loadingMsg, popup, data, forgetModal) {
                this.$scope = $scope;
                this.loadingMsg = loadingMsg;
                this.popup = popup;
                this.data = data;
                this.forgetModal = forgetModal;
                $scope.vm = this;

                this.name = data.user.name;
            }
            ForgetPW.prototype.cancel = function () {
                this.forgetModal.close();
            };

            ForgetPW.prototype.doRequest = function () {
                this.forgetModal.close();

                this.popup.info('Die Zugangsdaten werden Ihnen zugesandt', function (res) {
                });
            };
            ForgetPW.$inject = ['$scope', 'ionLoading', 'ionPopupService', 'dataService', 'modalForgetPWService'];
            return ForgetPW;
        })();
        controller.ForgetPW = ForgetPW;

        app.registerController('forgetPWCtrl', ForgetPW);
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

var app;
(function (app) {
    (function (controller) {
        'use strict';

        

        

        var Formular = (function () {
            function Formular($scope, loadingMsg, popup, popover, scroll, data, rowsModal, patientModal) {
                var _this = this;
                this.$scope = $scope;
                this.loadingMsg = loadingMsg;
                this.popup = popup;
                this.popover = popover;
                this.scroll = scroll;
                this.data = data;
                this.rowsModal = rowsModal;
                this.patientModal = patientModal;
                this.isDeleteMode = false;
                this.isDeleteEnabled = true;
                $scope.vm = this;

                $scope.$on('$ionicView.loaded', function (evt, args) {
                });

                $scope.$on('$ionicView.afterEnter', function (evt, args) {
                });

                $scope.$on('$destroy', function () {
                });

                $scope.$on('modalPatientService::close', function (ev, args) {
                    _this.rowsModal.show();
                });
            }
            Formular.prototype.toogleDeleteMode = function () {
                this.isDeleteMode = !this.isDeleteMode;
                this.shownFormular = null;
            };

            Formular.prototype.toggleFormular = function (item) {
                if (this.isDeleteMode) {
                    this.shownFormular = null;
                    return;
                }

                this.shownGroup = null;

                if (this.isFormularShown(item)) {
                    this.shownFormular = null;
                } else {
                    this.shownGroup = this.data.groups['de'];
                    this.shownFormular = item;
                }
            };

            Formular.prototype.isFormularShown = function (item) {
                return this.shownFormular === item;
            };

            Formular.prototype.toggleGroup = function (group) {
                if (this.isGroupShown(group)) {
                    this.shownGroup = null;
                } else {
                    this.shownGroup = group;
                }
            };

            Formular.prototype.isGroupShown = function (group) {
                return this.shownGroup === group;
            };

            Formular.prototype.deleteFormular = function (guid) {
                var _this = this;
                if (!this.isDeleteEnabled) {
                    return;
                }

                this.isDeleteEnabled = false;

                this.popup.confirmNoYes('Möchten Sie dieses Formular löschen ?', function (res) {
                    if (res) {
                        _this.shownFormular = null;

                        _this.loadingMsg.show('Lösche Formular ...');

                        _this.data.apiFormular_delete(guid, function (err) {
                            _this.loadingMsg.hide();
                        });
                    }

                    _this.isDeleteEnabled = true;
                });
            };

            Formular.prototype.selectFormular = function (guid, id) {
                var _this = this;
                if (id) {
                    this.popover.hide('formularlist_popover');
                    this.shownGroup = null;
                }

                this.shownFormular = null;
                this.searchField = '';

                if (this.isDeleteMode) {
                    return;
                }

                this.loadingMsg.show('Lade Formulardaten ...');

                this.data.apiFormular(guid, id, function (err) {
                    _this.loadingMsg.hide();

                    if (!err) {
                        _this.data.user.isLogin = false;

                        if (_this.data.clientformular.customerID == 0 && _this.data.clientformular.patientID == 0 && _this.data.clientformular.patientMPID == '') {
                            _this.patientModal.show();
                        } else {
                            _this.rowsModal.show();
                        }
                    }
                });
            };

            Formular.prototype.selectPopover = function (item, event) {
                var _this = this;
                Object.getOwnPropertyNames(this.data.groups).forEach(function (el) {
                    Object.getOwnPropertyNames(_this.data.groups[el]).forEach(function (formular) {
                        if (typeof _this.data.groups[el][formular] === 'object') {
                            _this.data.groups[el][formular].forEach(function (form) {
                                if (form.name === item.desc) {
                                    _this.shownGroup = _this.data.groups[el];
                                }
                            });
                        }
                    });
                });

                if (!this.shownGroup) {
                    this.shownGroup = this.data.groups['de'];
                }

                this.shownFormular = item;
                this.scroll.scrollTop('formularlist_popover');
                this.popover.show('formularlist_popover', event);
            };
            Formular.$inject = ['$scope', 'ionLoading', 'ionPopupService', 'serviceIonicPopover', 'ionScroll', 'dataService', 'modalRowsService', 'modalPatientService'];
            return Formular;
        })();
        controller.Formular = Formular;

        app.registerController('formularCtrl', Formular);
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

var app;
(function (app) {
    (function (controller) {
        'use strict';

        

        

        var CtrlHelp = (function () {
            function CtrlHelp(scope) {
                this.scope = scope;
                scope.vm = this;
            }
            CtrlHelp.$inject = ['$scope'];
            return CtrlHelp;
        })();
        controller.CtrlHelp = CtrlHelp;

        app.registerController('helpCtrl', CtrlHelp);
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

var app;
(function (app) {
    (function (controller) {
        'use strict';

        

        

        var Login = (function () {
            function Login($scope, $state, loadingMsg, popup, data, loginModal, forgetModal) {
                this.$scope = $scope;
                this.$state = $state;
                this.loadingMsg = loadingMsg;
                this.popup = popup;
                this.data = data;
                this.loginModal = loginModal;
                this.forgetModal = forgetModal;
                this.loginCount = 0;
                this.loginMax = 3;
                $scope.vm = this;
            }
            Login.prototype.cancelLogin = function () {
                this.loginModal.close();
            };

            Login.prototype.showForgetPWDlg = function () {
                this.loginModal.close();
                this.forgetModal.show();
            };

            Login.prototype.doLogin = function () {
                var _this = this;
                this.loginCount += 1;
                if (this.loginCount < this.loginMax) {
                    this.loadingMsg.show('Anmeldung MCC ...');

                    this.data.apiLogin(this.data.user.name.toString(), this.data.user.pw, function (err) {
                        _this.loadingMsg.hide();

                        _this.loginModal.close();

                        if (!err) {
                            _this.loginCount = 0;

                            _this.$state.transitionTo(_this.loginModal.redirectTo);
                        } else {
                            _this.popup.alert('Der Benutzername oder das Passwort ist falsch !', function (res) {
                                _this.loginModal.show();
                            });
                        }
                    });
                } else {
                    this.loginCount = 0;
                    this.loginModal.close();

                    this.forgetModal.show();
                }
            };
            Login.$inject = ['$scope', '$state', 'ionLoading', 'ionPopupService', 'dataService', 'modalLoginService', 'modalForgetPWService'];
            return Login;
        })();
        controller.Login = Login;

        app.registerController('loginCtrl', Login);
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

var app;
(function (app) {
    (function (controller) {
        'use strict';

        

        

        var Menu = (function () {
            function Menu($scope, $rootScope, $timeout, $state, sideMenu, data) {
                var _this = this;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$timeout = $timeout;
                this.$state = $state;
                this.sideMenu = sideMenu;
                this.data = data;
                this.selected = null;
                this.menu = new app.models.ListMenu();
                $scope.vm = this;

                this.menu = data.menu;

                this.$rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
                    if (!_this.selected) {
                        _this.sideMenu.open();
                    }

                    _this.$timeout(function () {
                        _this.sideMenu.close();
                    }, 0, true);

                    if (toParams && toParams.id) {
                        _this.selected = to.name + '/' + toParams.id;
                    } else {
                        _this.selected = to.name;
                    }

                    if (to.name === 'main') {
                        _this.sideMenu.open();
                    }
                });
            }
            Menu.prototype.setAside = function (aside) {
                this.sideMenu.aside = aside;
                return aside;
            };

            Menu.prototype.clickURL = function (url) {
                var _this = this;
                if (url === 'logout') {
                    this.data.apiLogout(function () {
                        _this.$state.transitionTo('main');
                    });
                } else {
                }
            };

            Menu.prototype.checkVisible = function (url) {
                var result = true;

                if (url === 'logout') {
                    result = this.data.user.isLogin;
                }

                if (url === 'contact') {
                    result = !this.data.user.isLogin;
                }

                return result;
            };

            Menu.prototype.setSelected = function () {
            };

            Menu.prototype.getSelected = function () {
                return true;
            };

            Menu.prototype.toggleSlide = function () {
                this.sideMenu.toggle();
            };
            Menu.$inject = ['$scope', '$rootScope', '$timeout', '$state', 'ionSideMenuService', 'dataService'];
            return Menu;
        })();
        controller.Menu = Menu;

        app.registerController('menuCtrl', Menu);
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

var app;
(function (app) {
    (function (controller) {
        'use strict';

        

        

        var Patient = (function () {
            function Patient($scope, data, patientModal) {
                this.$scope = $scope;
                this.data = data;
                this.patientModal = patientModal;
                this.id = '';
                $scope.vm = this;
            }
            Patient.prototype.setID = function () {
                this.data.clientformular.patientMPID = this.id;
                this.id = '';
                this.patientModal.close();
            };

            Patient.prototype.cancel = function () {
                this.id = '';
                this.patientModal.close();
            };
            Patient.$inject = ['$scope', 'dataService', 'modalPatientService'];
            return Patient;
        })();
        controller.Patient = Patient;

        app.registerController('patientCtrl', Patient);
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

var app;
(function (app) {
    (function (controller) {
        'use strict';

        

        

        var Pdf = (function () {
            function Pdf($scope, loadingMsg, popup, scroll, pdfViewer, data, pdfModal, signModal) {
                var _this = this;
                this.$scope = $scope;
                this.loadingMsg = loadingMsg;
                this.popup = popup;
                this.scroll = scroll;
                this.pdfViewer = pdfViewer;
                this.data = data;
                this.pdfModal = pdfModal;
                this.signModal = signModal;
                this.isReady = false;
                this.isLoading = false;
                this.scale = 0;
                this.currentPage = 0;
                this.totalPages = 0;
                $scope.vm = this;

                this.pdfInstance = null;

                $scope.$on('modalPdfService::show', function (ev, parm) {
                    if (!_this.pdfInstance) {
                        _this.pdfInstance = pdfViewer.Instance('viewer');
                    }
                    _this.render();
                });

                $scope.$on('modalSignService::finish', function (ev, parm) {
                    _this.render();
                });
            }
            Pdf.prototype.onProgress = function (loaded, total, state) {
                if (state == 'loading' && !this.isLoading) {
                    this.isLoading = true;
                }

                if (state == 'error') {
                    this.loadingMsg.hide();
                    this.isLoading = false;
                }

                if (state == 'finished') {
                    this.loadingMsg.hide();
                    this.isLoading = false;
                    this.isReady = true;
                }
            };

            Pdf.prototype.onLoaded = function (page, total) {
                this.currentPage = page;
                this.totalPages = total;

                this.isLoading = false;
            };

            Pdf.prototype.render = function () {
                var _this = this;
                this.loadingMsg.show('sende Formulardaten...');

                this.pdfURL = '';
                this.isReady = false;
                this.currentPage = 0;
                this.totalPages = 0;
                this.scroll.scrollTop('pdfviewer');

                this.data.apiRenderFormular(this.data.clientformular, function (err, pdfname) {
                    console.log('call controller render done ...', pdfname);

                    _this.loadingMsg.hide();

                    if (!err) {
                        _this.data.clientformular.signs.getList().forEach(function (sign) {
                            sign.value = '';
                        });

                        if (!_this.scale) {
                            _this.scale = _this.data.clientformular.scale;
                        }

                        _this.loadingMsg.show('erzeuge Formular...');

                        _this.data.apiStreamPDF(pdfname, function (err_1, pdfdata) {
                            if (!err_1) {
                                _this.pdfInstance.loadPDF(pdfdata);
                            }
                        });
                    }
                });
            };

            Pdf.prototype.cancel = function () {
                this.data.clientformular.isfinished = false;
                this.scale = 0;

                this.pdfModal.close();

                this.pdfURL = '';
            };

            Pdf.prototype.finish = function () {
                var _this = this;
                this.loadingMsg.show('sende Formulardaten ...');

                console.log('call controller finish');

                this.data.apiFinishFormular(this.data.clientformular, function (err) {
                    console.log('call controller finish', err);

                    _this.loadingMsg.hide();

                    if (!err) {
                        _this.scale = 0;

                        _this.pdfModal.close();

                        _this.pdfURL = '';

                        _this.pdfModal.sendMsgDelay(500, 'finish');
                    } else {
                    }
                });
            };

            Pdf.prototype.showSign = function () {
                this.signModal.show();
            };

            Pdf.prototype.nextPage = function () {
                if (!this.isLoading) {
                    this.isLoading = true;

                    this.scroll.scrollTop('pdfviewer');

                    this.pdfInstance.nextPage();
                }
            };

            Pdf.prototype.prevPage = function () {
                if (!this.isLoading) {
                    this.isLoading = true;

                    this.scroll.scrollTop('pdfviewer');

                    this.pdfInstance.prevPage();
                }
            };

            Pdf.prototype.scaleUp = function () {
                if (!this.isLoading && this.scale <= 3) {
                    this.isLoading = true;

                    this.scale += .5;
                    this.pdfInstance.setScale(this.scale);
                }
            };

            Pdf.prototype.scaleDown = function () {
                if (!this.isLoading && this.scale > 1) {
                    this.isLoading = true;

                    this.scale -= .5;
                    this.pdfInstance.setScale(this.scale);
                }
            };
            Pdf.$inject = ['$scope', 'ionLoading', 'ionPopupService', 'ionScroll', 'PDFViewerService', 'dataService', 'modalPdfService', 'modalSignService'];
            return Pdf;
        })();
        controller.Pdf = Pdf;

        app.registerController('pdfCtrl', Pdf);
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

var app;
(function (app) {
    (function (controller) {
        'use strict';

        

        

        var Pincode = (function () {
            function Pincode($scope, popup, data, pinModal) {
                this.$scope = $scope;
                this.popup = popup;
                this.data = data;
                this.pinModal = pinModal;
                this.pin = null;
                $scope.vm = this;
            }
            Pincode.prototype.checkPin = function () {
                var _this = this;
                if (this.pin == this.data.user.pin) {
                    this.pin = null;

                    this.data.user.isLogin = true;

                    this.pinModal.close();
                } else {
                    this.pin = null;
                    this.pinModal.close();
                    this.popup.alert('Der eingegebene Pincode ist falsch !', function (res) {
                        _this.pinModal.show();
                    });
                }
            };
            Pincode.$inject = ['$scope', 'ionPopupService', 'dataService', 'modalPinService'];
            return Pincode;
        })();
        controller.Pincode = Pincode;

        app.registerController('pincodeCtrl', Pincode);
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

var app;
(function (app) {
    (function (controller) {
        'use strict';

        

        

        var Rows = (function () {
            function Rows($scope, popup, data, rowsModal, pdfModal, pinModal) {
                var _this = this;
                this.$scope = $scope;
                this.popup = popup;
                this.data = data;
                this.rowsModal = rowsModal;
                this.pdfModal = pdfModal;
                this.pinModal = pinModal;
                this.counter = 0;
                $scope.vm = this;

                $scope.$on('modalPdfService::finish', function (ev, parm) {
                    _this.rowsModal.close();

                    _this.data.clientformular = null;

                    _this.pinModal.show();
                });
            }
            Rows.prototype.addCounter = function () {
                this.counter += 1;
                return this.counter;
            };

            Rows.prototype.onWatcher = function (fields) {
                var _this = this;
                var result = null;

                if (fields) {
                    fields.split(';').forEach(function (el) {
                        var pos = el.indexOf('#');
                        var idx = 0;
                        var name = el;

                        if (pos > -1) {
                            idx = parseInt(el.substring(pos + 1, el.length));
                            name = el.substring(0, pos);
                        }

                        var field = null;

                        _this.data.clientformular.inputs.getList().forEach(function (input) {
                            input.fields.getList().forEach(function (f) {
                                if (f.name === name) {
                                    field = f;
                                }
                            });
                        });

                        if (field) {
                            if (!result) {
                                result = [];
                            }

                            if (idx) {
                                if (!field.tmpvalue) {
                                    field.tmpvalue = [];
                                }

                                field.tmpidx = idx;
                                field.tmpvalue[idx] = '';
                            }

                            result.push(field);
                        }
                    });
                }

                return result;
            };

            Rows.prototype.cancelRow = function () {
                var _this = this;
                this.popup.confirmNoYes('Möchten Sie die Bearbeitung abbrechen ?', function (res) {
                    if (res) {
                        _this.rowsModal.close();

                        _this.data.apiFormular_reset(_this.data.clientformular.guid, _this.data.clientformular.step == 449 ? 100 : 0, function (err) {
                        });

                        _this.data.clientformular = null;

                        _this.pinModal.show();
                    }
                });
            };

            Rows.prototype.showPDF = function () {
                this.pdfModal.show();
            };
            Rows.$inject = ['$scope', 'ionPopupService', 'dataService', 'modalRowsService', 'modalPdfService', 'modalPinService'];
            return Rows;
        })();
        controller.Rows = Rows;

        app.registerController('rowsCtrl', Rows);
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

var app;
(function (app) {
    (function (controller) {
        'use strict';

        

        

        var CtrlSetting = (function () {
            function CtrlSetting(scope, loadingMsg, data) {
                var _this = this;
                this.scope = scope;
                this.loadingMsg = loadingMsg;
                this.data = data;
                this.changedStamp = false;
                this.changedPin = false;
                this.yesNo = [{ text: 'ja', value: true }, { text: 'nein', value: false }];
                scope.vm = this;

                this.user = data.user;

                scope.$watch('vm.user.pin', function (newval, oldval) {
                    if (oldval !== newval) {
                        _this.changedPin = true;
                    }
                });

                scope.$watch('vm.data.stamp', function (newval, oldval) {
                    if (oldval !== newval) {
                        if (oldval) {
                            _this.changedStamp = true;
                        }
                    }
                }, true);
            }
            CtrlSetting.prototype.changeStandard = function () {
                var _this = this;
                this.data.standardformularList.clear();

                this.data.blankformularList.getList().forEach(function (blanko) {
                    if (blanko.id === _this.data.stamp.standard) {
                        _this.data.standardformularList.addItem(blanko);
                    }
                });
            };

            CtrlSetting.prototype.saveChanges = function () {
                var _this = this;
                this.loadingMsg.show('speicher Änderungen ...');

                if (this.changedStamp) {
                    this.data.apiStamp_put(this.data.stamp, function (err) {
                        _this.changedStamp = false;
                    });
                }

                if (this.changedPin) {
                    var pw = this.user.pw;
                    this.user.pw = '';

                    localStorage.setItem('user', JSON.stringify(this.user));

                    this.changedPin = false;

                    this.user.pw = pw;
                }

                this.loadingMsg.hide();
            };
            CtrlSetting.$inject = ['$scope', 'ionLoading', 'dataService'];
            return CtrlSetting;
        })();
        controller.CtrlSetting = CtrlSetting;

        app.registerController('settingCtrl', CtrlSetting);
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

var app;
(function (app) {
    (function (controller) {
        'use strict';

        

        

        var Sign = (function () {
            function Sign($scope, data, signModal) {
                this.$scope = $scope;
                this.data = data;
                this.signModal = signModal;
                $scope.vm = this;
            }
            Sign.prototype.check = function () {
                var result = true;

                if (this.data.clientformular && this.data.clientformular.signs) {
                    this.data.clientformular.signs.getList().forEach(function (sign) {
                        if (sign.required && sign.value === '') {
                            result = false;
                        }
                    });
                }

                return result;
            };

            Sign.prototype.cancel = function () {
                this.data.clientformular.signs.getList().forEach(function (sign) {
                    sign.value = '';
                });

                this.data.clientformular.isfinished = false;

                this.signModal.close();
            };

            Sign.prototype.finished = function () {
                this.data.clientformular.isfinished = true;

                this.signModal.close();

                this.signModal.sendMsgDelay(250, 'finish');
            };
            Sign.$inject = ['$scope', 'dataService', 'modalSignService'];
            return Sign;
        })();
        controller.Sign = Sign;

        app.registerController('signCtrl', Sign);
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

var app;
(function (app) {
    (function (controller) {
        'use strict';

        

        

        var CtrlSimple = (function () {
            function CtrlSimple(scope) {
                this.scope = scope;
                scope.vm = this;
            }
            CtrlSimple.$inject = ['$scope'];
            return CtrlSimple;
        })();
        controller.CtrlSimple = CtrlSimple;

        app.registerController('simpleCtrl', CtrlSimple);
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

var app;
(function (app) {
    (function (controller) {
        'use strict';

        

        

        var CtrlStandard = (function () {
            function CtrlStandard(scope, $state, loadingMsg, data) {
                this.scope = scope;
                this.$state = $state;
                this.loadingMsg = loadingMsg;
                this.data = data;
                scope.vm = this;
            }
            CtrlStandard.prototype.selectFormular = function (id) {
                var _this = this;
                this.loadingMsg.show('Formular wird angefordert ...');

                this.data.apiBlankoFormular(id, function (err) {
                    _this.loadingMsg.hide();

                    if (!err) {
                        _this.$state.transitionTo('formular');
                    }
                });
            };
            CtrlStandard.$inject = ['$scope', '$state', 'ionLoading', 'dataService'];
            return CtrlStandard;
        })();
        controller.CtrlStandard = CtrlStandard;

        app.registerController('standardCtrl', CtrlStandard);
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));
