/*! services : mccClient - 1.0.0 (02.03.2015 11:03) */
var app;
(function (app) {
    (function (service) {
        'use strict';

        

        var Api = (function () {
            function Api(http) {
                this.http = http;
            }
            Api.prototype.serverError = function (name, data, status, cb) {
                console.log('server error ->', name);
                console.log('data', data);
                console.log('status', status);

                if (data && data.error) {
                    cb(data.error, null);
                } else if (data) {
                    cb(data, null);
                } else {
                    cb('server error', null);
                }
            };

            Api.prototype.apiError = function (name, error, cb) {
                console.log('api error ->', name);
                console.log('error', error);

                cb(error, null);
            };

            Api.prototype.login = function (username, password, cb) {
                var _this = this;
                this.http.post(this.serverIP + '/login/user', { username: username, password: password }).success(function (data, status) {
                    if (data && data.error) {
                        _this.apiError('login', data.error, cb);
                    } else {
                        cb(null, data.result);
                    }
                }).error(function (data, status) {
                    _this.serverError('login', data, status, cb);
                });
            };

            Api.prototype.logout = function (cb) {
                var _this = this;
                this.http.get(this.serverIP + '/user/logout', null).success(function (data, status) {
                    if (data && data.error) {
                        _this.apiError('logout', data.error, cb);
                    } else {
                        cb(null, data.result);
                    }
                }).error(function (data, status) {
                    _this.serverError('logout', data, status, cb);
                });
            };

            Api.prototype.stamp_get = function (cb) {
                var _this = this;
                this.http.get(this.serverIP + '/user/stamp', null).success(function (data, status) {
                    if (data && data.error) {
                        _this.apiError('stamp', data.error, cb);
                    } else {
                        cb(null, data.result);
                    }
                }).error(function (data, status) {
                    _this.serverError('stamp', data, status, cb);
                });
            };

            Api.prototype.stamp_put = function (stamp, cb) {
                var _this = this;
                this.http.put(this.serverIP + '/user/updstamp', { stampData: JSON.stringify(stamp) }).success(function (data, status) {
                    if (data && data.error) {
                        _this.apiError('updstamp', data.error, cb);
                    } else {
                        cb(null, data.result);
                    }
                }).error(function (data, status) {
                    _this.serverError('updstamp', data, status, cb);
                });
            };

            Api.prototype.formularList = function (cb) {
                var _this = this;
                this.http.get(this.serverIP + '/user/formularlist', {}).success(function (data, status) {
                    if (data && data.error) {
                        _this.apiError('formularlist', data.error, cb);
                    } else {
                        cb(null, data.result);
                    }
                }).error(function (data, status) {
                    _this.serverError('formularlist', data, status, cb);
                });
            };

            Api.prototype.formular = function (guid, id, cb) {
                var _this = this;
                this.http.post(this.serverIP + '/user/formular', { guid: guid, id: id }).success(function (data, status) {
                    if (data && data.error) {
                        _this.apiError('formular', data.error, cb);
                    } else {
                        cb(null, data.result);
                    }
                }).error(function (data, status) {
                    _this.serverError('formular', data, status, cb);
                });
            };

            Api.prototype.formular_delete = function (guid, cb) {
                var _this = this;
                this.http.put(this.serverIP + '/user/formular', { guid: guid }).success(function (data, status) {
                    if (data && data.error) {
                        _this.apiError('formular(del)', data.error, cb);
                    } else {
                        cb(null, data.result);
                    }
                }).error(function (data, status) {
                    _this.serverError('formular(del)', data, status, cb);
                });
            };

            Api.prototype.formular_reset = function (guid, id, cb) {
                var _this = this;
                this.http.post(this.serverIP + '/user/reset', { guid: guid, id: id }).success(function (data, status) {
                    if (data && data.error) {
                        _this.apiError('reset', data.error, cb);
                    } else {
                        cb(null, data.result);
                    }
                }).error(function (data, status) {
                    _this.serverError('reset', data, status, cb);
                });
            };

            Api.prototype.renderFormular = function (clientData, cb) {
                var _this = this;
                console.log('call api-render', clientData);
                try  {
                    this.http.post(this.serverIP + '/user/renderPDF', { clientData: JSON.stringify(clientData) }).success(function (data, status) {
                        console.log('call api-render done ...', status);

                        if (data) {
                            console.log(data);
                        }

                        if (data && data.error) {
                            _this.apiError('renderPDF', data.error, cb);
                        } else {
                            cb(null, _this.serverIP + '/' + data.result);
                        }
                    }).error(function (data, status) {
                        _this.serverError('renderPDF', data, status, cb);
                    });
                } catch (error) {
                    console.log('server error', error);
                }
            };

            Api.prototype.streamPDF = function (ip, cb) {
                var _this = this;
                console.log('call api-streamPDF', ip);
                try  {
                    this.http.get(ip, { responseType: 'arraybuffer' }).success(function (data, status) {
                        console.log('call api-streamPDF done ...', status);

                        if (data) {
                            console.log(data);
                        }

                        if (data && data.error) {
                            _this.apiError('streamPDF', data.error, cb);
                        } else {
                            cb(null, data);
                        }
                    }).error(function (data, status) {
                        _this.serverError('streamPDF', data, status, cb);
                    });
                } catch (error) {
                    console.log('server error', error);
                }
            };

            Api.prototype.finishFormular = function (clientData, cb) {
                var _this = this;
                console.log('call api-finish', clientData);
                try  {
                    this.http.put(this.serverIP + '/user/finishPDF', { clientData: JSON.stringify(clientData) }).success(function (data, status) {
                        console.log('call api-finish done...', status);

                        if (data && data.error) {
                            _this.apiError('finishPDF', data.error, cb);
                        } else {
                            cb(null, data.result);
                        }
                    }).error(function (data, status) {
                        _this.serverError('finishPDF', data, status, cb);
                    });
                } catch (error) {
                    console.log('server error', error);
                }
            };

            Api.prototype.blankoList = function (cb) {
                var _this = this;
                this.http.get(this.serverIP + '/user/blankolist', {}).success(function (data, status) {
                    if (data && data.error) {
                        _this.apiError('blankolist', data.error, cb);
                    } else {
                        cb(null, data.result);
                    }
                }).error(function (data, status) {
                    _this.serverError('blankolist', data, status, cb);
                });
            };

            Api.prototype.blankoFormular = function (id, cb) {
                var _this = this;
                this.http.post(this.serverIP + '/user/blankoFormular', { id: id }).success(function (data, status) {
                    if (data && data.error) {
                        _this.apiError('blankoFormular', data.error, cb);
                    } else {
                        cb(null, data.result);
                    }
                }).error(function (data, status) {
                    _this.serverError('blankoFormular', data, status, cb);
                });
            };
            Api.$inject = ['$http'];
            return Api;
        })();
        service.Api = Api;

        app.registerService('apiService', Api);
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

var app;
(function (app) {
    (function (service) {
        'use strict';

        

        var Data = (function () {
            function Data(api, socket) {
                this.api = api;
                this.socket = socket;
                this.groups = {};
                this.standards = [];
                this.api.serverIP = 'https://app.carecapital-online.de:443';

                Data.mySocket = socket();

                if (!this.menu) {
                    this.menu = new app.models.ListMenu(app.datas.menu);
                }

                if (!this.countries) {
                    this.countries = new app.models.ListCountries(app.datas.countries);
                }

                var user = localStorage.getItem('user');
                if (user) {
                    try  {
                        user = JSON.parse(user);
                    } catch (error) {
                        user = null;
                        console.log('local Storage error');
                    }
                }

                if (!this.user) {
                    this.user = new app.models.User();
                    this.user.name = user && user.name;
                    this.user.pin = (user && user.pin) || 1234;
                }
            }
            Data.prototype.apiSilentLogin = function (cb) {
                var _this = this;
                if (this.user.isLogin || (this.user.name && this.user.pw)) {
                    Data.mySocket.removeListener('refreshList', null);
                    Data.mySocket.removeListener('connect', null);

                    Data.mySocket.disconnect();

                    this.api.logout(function (err, data) {
                        _this.api.login(_this.user.name.toString(), _this.user.pw, function (err, data) {
                            if (!err) {
                                Data.mySocket.connect(_this.api.serverIP);

                                Data.mySocket.addListener('connect', function (e, d) {
                                    _this.apiFormularList(function (err) {
                                    });
                                });

                                Data.mySocket.addListener('refreshList', function (e, d) {
                                    _this.apiFormularList(function (err) {
                                    });
                                });

                                cb(null);
                            } else {
                                _this.user.pw = '';
                                _this.user.isLogin = false;
                                _this.stamp = null;
                                _this.clientformular = null;
                                _this.clientformularList = null;
                                _this.menu.getID('MCC-FORMULARE').items.getID('angeforderte Formulare').countBadge = 0;
                                cb(err);
                            }
                        });
                    });
                } else {
                    cb(null);
                }
            };

            Data.prototype.apiLogin = function (username, password, cb) {
                var _this = this;
                this.api.login(username, password, function (err, data) {
                    if (!err) {
                        _this.user.name = parseInt(username);
                        _this.user.pw = '';

                        localStorage.setItem('user', JSON.stringify(_this.user));

                        _this.user.pw = password;

                        _this.user.isLogin = true;

                        Data.mySocket.connect(_this.api.serverIP);

                        Data.mySocket.addListener('refreshList', function (e, d) {
                            _this.apiFormularList(function (err) {
                            });
                        });

                        Data.mySocket.addListener('connect', function (e, d) {
                            _this.apiFormularList(function (err) {
                            });
                        });

                        _this.apiStamp_get(function (err) {
                            if (!err) {
                                _this.apiBlankoList(function (err) {
                                    _this.groups = {};

                                    _this.standards = [];
                                    _this.standards.push({ text: '-- kein Formular --', value: 0 });

                                    _this.standardformularList = new app.models.ListBlankoformular();

                                    if (!err) {
                                        _this.blankformularList.getList().forEach(function (blanko) {
                                            _this.standards.push({ text: blanko.name, value: blanko.id });

                                            if (blanko.id === _this.stamp.standard) {
                                                _this.standardformularList.addItem(blanko);
                                            }

                                            var language;

                                            switch (blanko.desc) {
                                                case 'de':
                                                    language = 'deutscher';
                                                    break;

                                                case 'en':
                                                    language = 'englischer';
                                                    break;

                                                case 'tk':
                                                    language = 'türkischer';
                                                    break;
                                            }

                                            if (!_this.groups[blanko.desc]) {
                                                _this.groups[blanko.desc] = {
                                                    name: 'Formulare in ' + language + ' Sprache',
                                                    forms: []
                                                };
                                            }

                                            _this.groups[blanko.desc].forms.push({ id: blanko.id, name: blanko.name, ofage: blanko.ofage });
                                        });
                                    }
                                });
                            }
                        });

                        cb(null);
                    } else {
                        _this.user.isLogin = false;
                        cb(err);
                    }
                });
            };

            Data.prototype.apiLogout = function (cb) {
                var _this = this;
                this.api.logout(function (err, data) {
                    Data.mySocket.removeListener('refreshList', null);
                    Data.mySocket.removeListener('connect', null);

                    Data.mySocket.disconnect();

                    _this.user.pw = '';
                    _this.user.isLogin = false;

                    _this.stamp = null;
                    _this.clientformular = null;
                    _this.clientformularList = null;
                    _this.menu.getID('MCC-FORMULARE').items.getID('angeforderte Formulare').countBadge = 0;

                    if (!err) {
                        cb(null);
                    } else {
                        cb(err);
                    }
                });
            };

            Data.prototype.apiStamp_get = function (cb) {
                var _this = this;
                this.stamp = null;

                this.api.stamp_get(function (err, data) {
                    if (!err) {
                        _this.stamp = new app.models.Stamp(data);

                        cb(null);
                    } else {
                        cb(err);
                    }
                });
            };

            Data.prototype.apiStamp_put = function (stamp, cb) {
                this.api.stamp_put(stamp, function (err, data) {
                    if (!err) {
                        cb(null);
                    } else {
                        cb(err);
                    }
                });
            };

            Data.prototype.apiFormularList = function (cb) {
                var _this = this;
                this.clientformularList = null;

                this.api.formularList(function (err, data) {
                    if (!err) {
                        _this.clientformularList = new app.models.ListClientformular(data);

                        _this.menu.getID('MCC-FORMULARE').items.getID('angeforderte Formulare').countBadge = _this.clientformularList.getList().length;

                        cb(null);
                    } else {
                        _this.clientformularList = null;
                        _this.menu.getID('MCC-FORMULARE').items.getID('angeforderte Formulare').countBadge = 0;
                        cb(err);
                    }
                });
            };

            Data.prototype.apiFormular = function (guid, id, cb) {
                var _this = this;
                this.api.formular(guid, id, function (err, data) {
                    _this.clientformular = null;

                    if (!err) {
                        _this.clientformular = new app.models.Clientformular(data);

                        cb(null);
                    } else {
                        cb(err);
                    }
                });
            };

            Data.prototype.apiFormular_delete = function (guid, cb) {
                this.api.formular_delete(guid, function (err, data) {
                    if (!err) {
                        cb(null);
                    } else {
                        cb(err);
                    }
                });
            };

            Data.prototype.apiFormular_reset = function (guid, id, cb) {
                this.api.formular_reset(guid, id, function (err, data) {
                    if (!err) {
                        cb(null, data);
                    } else {
                        cb(err, data);
                    }
                });
            };

            Data.prototype.apiRenderFormular = function (clientData, cb) {
                console.log('call data-render');
                this.api.renderFormular(clientData, function (err, data) {
                    console.log('call data-render done ...');

                    if (!err) {
                        cb(null, data);
                    } else {
                        cb(err, data);
                    }
                });
            };

            Data.prototype.apiFinishFormular = function (clientData, cb) {
                console.log('call data-finish');
                this.api.finishFormular(clientData, function (err, data) {
                    console.log('call data-finish done ...');

                    if (!err) {
                        cb(null);
                    } else {
                        cb(err);
                    }
                });
            };

            Data.prototype.apiBlankoList = function (cb) {
                var _this = this;
                this.api.blankoList(function (err, data) {
                    if (!err) {
                        _this.blankformularList = new app.models.ListBlankoformular(data);
                        cb(null);
                    } else {
                        cb(err);
                    }
                });
            };

            Data.prototype.apiBlankoFormular = function (id, cb) {
                this.api.blankoFormular(id, function (err, data) {
                    if (!err) {
                        cb(null);
                    } else {
                        cb(err);
                    }
                });
            };

            Data.prototype.apiStreamPDF = function (ip, cb) {
                console.log('call data-streamPDF');
                this.api.streamPDF(ip, function (err, data) {
                    console.log('call data-streamPDF done ...');

                    if (!err) {
                        cb(null, data);
                    } else {
                        cb(err, null);
                    }
                });
            };
            Data.$inject = ['apiService', 'socket'];
            return Data;
        })();
        service.Data = Data;

        app.registerService('dataService', Data);
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

var app;
(function (app) {
    (function (service) {
        'use strict';

        

        var IonGesture = (function () {
            function IonGesture(gesture) {
                this.gesture = gesture;
            }
            IonGesture.prototype.addPinchIn = function (element, cb) {
                var t = this.gesture.on('tap', cb, element);
            };

            IonGesture.prototype.removePinchIn = function (element, cb) {
            };
            IonGesture.$inject = ['$ionicGesture'];
            return IonGesture;
        })();
        service.IonGesture = IonGesture;

        app.registerService('ionGesture', IonGesture);
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

var app;
(function (app) {
    (function (service) {
        'use strict';

        

        var IonLoading = (function () {
            function IonLoading(loading) {
                this.loading = loading;
            }
            IonLoading.prototype.show = function (msg) {
                this.loading.hide();

                IonLoading.isVisible = true;

                this.loading.show({
                    template: msg,
                    noBackdrop: false,
                    delay: 0
                });
            };

            IonLoading.prototype.hide = function () {
                this.loading.hide();
                return;

                if (IonLoading.isVisible) {
                    IonLoading.isVisible = false;
                    this.loading.hide();
                }
            };
            IonLoading.isVisible = false;

            IonLoading.$inject = ['$ionicLoading'];
            return IonLoading;
        })();
        service.IonLoading = IonLoading;

        app.registerService('ionLoading', IonLoading);
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

var app;
(function (app) {
    (function (service) {
        'use strict';

        

        var IonPopup = (function () {
            function IonPopup(popup) {
                this.popup = popup;
            }
            IonPopup.prototype.confirmNoYes = function (msg, cb) {
                this.popup.confirm({
                    title: 'Bitte Bestätigen',
                    template: msg,
                    cancelText: 'Nein',
                    okText: 'Ja',
                    okType: 'button-energized'
                }).then(function (res) {
                    cb(res);
                });
            };

            IonPopup.prototype.info = function (msg, cb) {
                this.popup.alert({
                    title: 'Information',
                    subTitle: '',
                    template: msg,
                    okType: 'button-energized'
                }).then(function (res) {
                    cb(res);
                });
            };

            IonPopup.prototype.alert = function (msg, cb) {
                this.popup.alert({
                    title: 'Fehler',
                    subTitle: '',
                    template: msg,
                    okType: 'button-energized'
                }).then(function (res) {
                    cb(res);
                });
            };
            IonPopup.$inject = ['$ionicPopup'];
            return IonPopup;
        })();
        service.IonPopup = IonPopup;

        app.registerService('ionPopupService', IonPopup);
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

var app;
(function (app) {
    (function (service) {
        'use strict';

        

        var IonScroll = (function () {
            function IonScroll(scroll) {
                this.scroll = scroll;
            }
            IonScroll.prototype.scrollTop = function (handle) {
                if (!handle) {
                    this.scroll.scrollTop();
                } else {
                    this.scroll.$getByHandle(handle).scrollTop();
                }
            };
            IonScroll.$inject = ['$ionicScrollDelegate'];
            return IonScroll;
        })();
        service.IonScroll = IonScroll;

        app.registerService('ionScroll', IonScroll);
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

var app;
(function (app) {
    (function (service) {
        'use strict';

        

        var IonSideMenu = (function () {
            function IonSideMenu(sideMenu) {
                this.sideMenu = sideMenu;
                this.position = 'left';
                this.aside = true;
            }
            IonSideMenu.prototype.toggle = function () {
                if (!this.aside) {
                    switch (this.position) {
                        case "left":
                            this.sideMenu.toggleLeft();
                            break;

                        case 'right':
                            this.sideMenu.toggleRight();
                            break;
                    }
                }
            };

            IonSideMenu.prototype.open = function () {
                if (!this.aside) {
                    switch (this.position) {
                        case "left":
                            this.sideMenu.toggleLeft(true);
                            break;

                        case 'right':
                            this.sideMenu.toggleRight(true);
                            break;
                    }
                }
            };

            IonSideMenu.prototype.close = function () {
                if (!this.aside) {
                    switch (this.position) {
                        case "left":
                            this.sideMenu.toggleLeft(false);
                            break;

                        case 'right':
                            this.sideMenu.toggleRight(false);
                            break;
                    }
                }
            };

            IonSideMenu.prototype.isOpen = function () {
                return this.sideMenu.isOpenLeft() || this.sideMenu.isOpenRight() || this.aside;
            };
            IonSideMenu.$inject = ['$ionicSideMenuDelegate'];
            return IonSideMenu;
        })();
        service.IonSideMenu = IonSideMenu;

        app.registerService('ionSideMenuService', IonSideMenu);
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

var app;
(function (app) {
    (function (service) {
        'use strict';

        

        var IonSlideBox = (function () {
            function IonSlideBox(slideBox) {
                this.slideBox = slideBox;
            }
            IonSlideBox.prototype.slide = function (to, speed) {
                if (typeof speed === "undefined") { speed = 0; }
            };

            IonSlideBox.prototype.next = function () {
            };

            IonSlideBox.prototype.previous = function () {
            };

            IonSlideBox.prototype.update = function () {
            };

            IonSlideBox.prototype.start = function () {
            };

            IonSlideBox.prototype.stop = function () {
            };
            IonSlideBox.$inject = ['$ionicSlideBoxDelegate'];
            return IonSlideBox;
        })();
        service.IonSlideBox = IonSlideBox;

        app.registerService('ionSlideBoxService', IonSlideBox);
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

var app;
(function (app) {
    (function (service) {
        'use strict';

        

        var ModalForgetPW = (function () {
            function ModalForgetPW(modal) {
                this.modal = modal;
                this.create();
            }
            ModalForgetPW.prototype.create = function () {
                var _this = this;
                if (this.dialogModal) {
                    return;
                }

                if (!this.dialogModal) {
                    this.modal.fromTemplateUrl('modal_forget_pw.html', function (modal) {
                        _this.dialogModal = modal;
                    }, {
                        animation: 'slide-in-up'
                    });
                }
            };

            ModalForgetPW.prototype.show = function () {
                if (this.dialogModal) {
                    this.dialogModal.show();
                }
            };

            ModalForgetPW.prototype.close = function () {
                if (this.dialogModal) {
                    this.dialogModal.hide();
                }
            };
            ModalForgetPW.$inject = ['$ionicModal'];
            return ModalForgetPW;
        })();
        service.ModalForgetPW = ModalForgetPW;

        app.registerService('modalForgetPWService', ModalForgetPW);
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

var app;
(function (app) {
    (function (service) {
        'use strict';

        

        var ModalLogin = (function () {
            function ModalLogin(modal) {
                this.modal = modal;
                this.create();
            }
            ModalLogin.prototype.create = function () {
                var _this = this;
                if (this.dialogModal) {
                    return;
                }

                if (!this.dialogModal) {
                    this.modal.fromTemplateUrl('modal_login.html', {
                        animation: 'slide-in-up',
                        focusFirstInput: true,
                        backdropClickToClose: false,
                        hardwareBackButtonClose: false
                    }).then(function (modal) {
                        _this.dialogModal = modal;
                    });
                }
            };

            ModalLogin.prototype.show = function () {
                if (this.dialogModal) {
                    this.dialogModal.show();
                }
            };

            ModalLogin.prototype.close = function () {
                if (this.dialogModal) {
                    this.dialogModal.hide();
                }
            };

            ModalLogin.prototype.destroy = function () {
                if (this.dialogModal) {
                    this.dialogModal.remove();
                    this.dialogModal = null;
                }
            };
            ModalLogin.$inject = ['$ionicModal'];
            return ModalLogin;
        })();
        service.ModalLogin = ModalLogin;

        app.registerService('modalLoginService', ModalLogin);
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

var app;
(function (app) {
    (function (service) {
        'use strict';

        

        var ModalPatient = (function () {
            function ModalPatient($rootScope, $timeout, modal) {
                this.$rootScope = $rootScope;
                this.$timeout = $timeout;
                this.modal = modal;
                this.create();
            }
            ModalPatient.prototype.create = function () {
                var _this = this;
                if (this.dialogModal) {
                    return;
                }

                if (!this.dialogModal) {
                    this.modal.fromTemplateUrl('modal_patient.html', {
                        animation: 'slide-in-up',
                        focusFirstInput: true,
                        backdropClickToClose: false,
                        hardwareBackButtonClose: false
                    }).then(function (modal) {
                        _this.dialogModal = modal;
                    });
                }
            };

            ModalPatient.prototype.show = function () {
                var _this = this;
                if (this.dialogModal) {
                    this.dialogModal.show();

                    this.$timeout(function () {
                        _this.$rootScope.$broadcast('modalPatientService::show');
                    }, 250, true);
                }
            };

            ModalPatient.prototype.close = function () {
                if (this.dialogModal) {
                    this.dialogModal.hide();
                    this.$rootScope.$broadcast('modalPatientService::close');
                }
            };

            ModalPatient.prototype.destroy = function () {
                if (this.dialogModal) {
                    this.dialogModal.remove();
                    this.dialogModal = null;
                    this.$rootScope.$broadcast('modalPatientService::destroy');
                }
            };
            ModalPatient.$inject = ['$rootScope', '$timeout', '$ionicModal'];
            return ModalPatient;
        })();
        service.ModalPatient = ModalPatient;

        app.registerService('modalPatientService', ModalPatient);
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

var app;
(function (app) {
    (function (service) {
        'use strict';

        

        var ModalPdf = (function () {
            function ModalPdf($rootScope, $timeout, modal) {
                this.$rootScope = $rootScope;
                this.$timeout = $timeout;
                this.modal = modal;
                this.create();
            }
            ModalPdf.prototype.create = function () {
                var _this = this;
                if (this.dialogModal) {
                    this.destroy();
                }

                this.modal.fromTemplateUrl('modal_pdf.html', {
                    animation: 'slide-in-up',
                    focusFirstInput: true,
                    backdropClickToClose: false,
                    hardwareBackButtonClose: false
                }).then(function (modal) {
                    _this.dialogModal = modal;
                    _this.sendMsg('create');
                });
            };

            ModalPdf.prototype.show = function () {
                if (this.dialogModal) {
                    this.dialogModal.show();
                    this.sendMsgDelay(250, 'show');
                }
            };

            ModalPdf.prototype.close = function () {
                if (this.dialogModal) {
                    this.dialogModal.hide();
                    this.sendMsg('close');
                }
            };

            ModalPdf.prototype.destroy = function () {
                if (this.dialogModal) {
                    this.dialogModal.remove();
                    this.dialogModal = null;
                    this.sendMsg('destroy');
                }
            };

            ModalPdf.prototype.sendMsg = function (id, msg) {
                if (this.dialogModal) {
                    this.$rootScope.$broadcast('modalPdfService::' + id, msg);
                }
            };

            ModalPdf.prototype.sendMsgDelay = function (delay, id, msg) {
                var _this = this;
                this.$timeout(function () {
                    _this.sendMsg(id, msg);
                }, delay, true);
            };
            ModalPdf.$inject = ['$rootScope', '$timeout', '$ionicModal'];
            return ModalPdf;
        })();
        service.ModalPdf = ModalPdf;

        app.registerService('modalPdfService', ModalPdf);
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

var app;
(function (app) {
    (function (service) {
        'use strict';

        

        var ModalPin = (function () {
            function ModalPin(modal) {
                this.modal = modal;
                this.create();
            }
            ModalPin.prototype.create = function () {
                var _this = this;
                if (this.dialogModal) {
                    return;
                }

                if (!this.dialogModal) {
                    this.modal.fromTemplateUrl('modal_pincode.html', {
                        animation: 'slide-in-up',
                        focusFirstInput: true,
                        backdropClickToClose: false,
                        hardwareBackButtonClose: false
                    }).then(function (modal) {
                        _this.dialogModal = modal;
                    });
                }
            };

            ModalPin.prototype.show = function () {
                if (this.dialogModal) {
                    this.dialogModal.show();
                }
            };

            ModalPin.prototype.close = function () {
                if (this.dialogModal) {
                    this.dialogModal.hide();
                }
            };

            ModalPin.prototype.destroy = function () {
                if (this.dialogModal) {
                    this.dialogModal.remove();
                    this.dialogModal = null;
                }
            };
            ModalPin.$inject = ['$ionicModal'];
            return ModalPin;
        })();
        service.ModalPin = ModalPin;

        app.registerService('modalPinService', ModalPin);
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

var app;
(function (app) {
    (function (service) {
        'use strict';

        

        var ModalRows = (function () {
            function ModalRows($rootScope, $timeout, modal) {
                this.$rootScope = $rootScope;
                this.$timeout = $timeout;
                this.modal = modal;
                this.create();
            }
            ModalRows.prototype.create = function () {
                var _this = this;
                if (this.dialogModal) {
                    this.destroy();
                }

                this.modal.fromTemplateUrl('modal_rows.html', {
                    animation: 'slide-in-up',
                    focusFirstInput: true,
                    backdropClickToClose: false,
                    hardwareBackButtonClose: false
                }).then(function (modal) {
                    _this.dialogModal = modal;
                    _this.sendMsg('create');
                });
            };

            ModalRows.prototype.show = function () {
                if (this.dialogModal) {
                    this.dialogModal.show();
                    this.sendMsgDelay(250, 'show');
                }
            };

            ModalRows.prototype.close = function () {
                if (this.dialogModal) {
                    this.dialogModal.hide();
                    this.sendMsg('close');
                }
            };

            ModalRows.prototype.destroy = function () {
                if (this.dialogModal) {
                    this.dialogModal.remove();
                    this.dialogModal = null;
                    this.sendMsg('destroy');
                }
            };

            ModalRows.prototype.sendMsg = function (id, msg) {
                if (this.dialogModal) {
                    this.$rootScope.$broadcast('modalRowsService::' + id, msg);
                }
            };

            ModalRows.prototype.sendMsgDelay = function (delay, id, msg) {
                var _this = this;
                this.$timeout(function () {
                    _this.sendMsg(id, msg);
                }, delay, true);
            };
            ModalRows.$inject = ['$rootScope', '$timeout', '$ionicModal'];
            return ModalRows;
        })();
        service.ModalRows = ModalRows;

        app.registerService('modalRowsService', ModalRows);
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

var app;
(function (app) {
    (function (service) {
        'use strict';

        

        var ModalSign = (function () {
            function ModalSign($rootScope, $timeout, modal) {
                this.$rootScope = $rootScope;
                this.$timeout = $timeout;
                this.modal = modal;
                this.create();
            }
            ModalSign.prototype.create = function () {
                var _this = this;
                if (this.dialogModal) {
                    this.destroy();
                }
                this.modal.fromTemplateUrl('modal_sign.html', {
                    animation: 'slide-in-up',
                    focusFirstInput: true,
                    backdropClickToClose: false,
                    hardwareBackButtonClose: false
                }).then(function (modal) {
                    _this.dialogModal = modal;
                    _this.sendMsg('create');
                });
            };

            ModalSign.prototype.show = function () {
                if (this.dialogModal) {
                    this.dialogModal.show();

                    this.sendMsgDelay(250, 'show');
                }
            };

            ModalSign.prototype.close = function () {
                if (this.dialogModal) {
                    this.dialogModal.hide();
                    this.sendMsg('close');
                }
            };

            ModalSign.prototype.destroy = function () {
                if (this.dialogModal) {
                    this.dialogModal.remove();
                    this.dialogModal = null;
                    this.sendMsg('destroy');
                }
            };

            ModalSign.prototype.sendMsg = function (id, msg) {
                if (this.dialogModal) {
                    this.$rootScope.$broadcast('modalSignService::' + id, msg);
                }
            };

            ModalSign.prototype.sendMsgDelay = function (delay, id, msg) {
                var _this = this;
                this.$timeout(function () {
                    _this.sendMsg(id, msg);
                }, delay, true);
            };
            ModalSign.$inject = ['$rootScope', '$timeout', '$ionicModal'];
            return ModalSign;
        })();
        service.ModalSign = ModalSign;

        app.registerService('modalSignService', ModalSign);
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));
