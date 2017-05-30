/*! models : mccClient - 1.0.0 (28.02.2015 18:02) */
var app;
(function (app) {
    (function (models) {
        'use strict';

        

        var Blankoformular = (function () {
            function Blankoformular(field) {
                this.id = field && field.id || 1;
                this.name = field && field.name || "";
                this.desc = field && field.desc || "";
                this.ofage = (field && typeof field.ofage !== "undefined") ? field.ofage : false;
            }
            return Blankoformular;
        })();
        models.Blankoformular = Blankoformular;

        

        var ListBlankoformular = (function () {
            function ListBlankoformular(listOfBlankoformular) {
                this.list = [];
                if (listOfBlankoformular && listOfBlankoformular.list) {
                    this.addList(listOfBlankoformular.list);
                } else if (listOfBlankoformular) {
                    this.addList(listOfBlankoformular);
                }
            }
            ListBlankoformular.prototype.clear = function () {
                this.list = [];
            };
            ListBlankoformular.prototype.exist = function (item) {
                var result = -1;
                var test = JSON.stringify(new Blankoformular(item));

                for (var i = 0; i < this.list.length; i++) {
                    if (test === JSON.stringify(this.list[i])) {
                        result = i;
                        break;
                    }
                }
                return result;
            };
            ListBlankoformular.prototype.existID = function (id) {
                var result = -1;
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].id === id) {
                        result = i;
                        break;
                    }
                }
                return result;
            };
            ListBlankoformular.prototype.getID = function (id) {
                var idx = this.existID(id);
                if (idx > -1) {
                    return this.list[idx];
                } else {
                    return null;
                }
            };
            ListBlankoformular.prototype.getCopyID = function (id) {
                return this.getCopyItem(this.getID(id));
            };
            ListBlankoformular.prototype.delID = function (id) {
                return this.delIndex(this.existID(id));
            };
            ListBlankoformular.prototype.updID = function (id, newItem) {
                return this.updIndex(this.existID(id), newItem);
            };
            ListBlankoformular.prototype.addItem = function (item) {
                var result;
                var doExists = false;
                if (!doExists && this.existID(item.id) > -1) {
                    doExists = true;
                }
                if (!doExists) {
                    this.list.push(new Blankoformular(item));
                    result = this.list[this.list.length - 1];
                }
                return result;
            };
            ListBlankoformular.prototype.addOrUpdItem = function (item) {
                var result = this.addItem(item);
                if (!result) {
                    var idx = this.existID(item.id);
                    this.updIndex(idx, item);
                    result = this.list[idx];
                }
                return result;
            };
            ListBlankoformular.prototype.add = function (id) {
                return this.addItem(new Blankoformular({ id: id }));
            };
            ListBlankoformular.prototype.addList = function (itemList) {
                var _this = this;
                itemList.forEach(function (el) {
                    _this.addItem(el);
                });
            };
            ListBlankoformular.prototype.delIndex = function (idx) {
                var deleted = false;
                if (idx >= 0 && idx < this.list.length) {
                    this.list.splice(idx, 1);
                    deleted = true;
                }
                return deleted;
            };
            ListBlankoformular.prototype.delItem = function (item) {
                return this.delIndex(this.exist(item));
            };
            ListBlankoformular.prototype.updIndex = function (idx, newItem) {
                var updated = false;
                if (idx >= 0 && idx < this.list.length) {
                    this.list[idx] = newItem;
                    updated = true;
                }
                return updated;
            };
            ListBlankoformular.prototype.updItem = function (oldItem, newItem) {
                return this.updIndex(this.exist(oldItem), newItem);
            };
            ListBlankoformular.prototype.getIndex = function (idx) {
                var result;
                if (idx >= 0 && idx < this.list.length) {
                    result = this.list[idx];
                }
                return result;
            };
            ListBlankoformular.prototype.getByFieldname = function (fieldname, searchvalue) {
                var _this = this;
                var result;
                var found = false;
                for (var i = 0; i < this.list.length; i++) {
                    Object.getOwnPropertyNames(this.list[i]).forEach(function (el) {
                        if (fieldname === el && searchvalue == _this.list[i][el]) {
                            found = true;
                        }
                        if (el === fieldname.split('.')[0] && typeof _this.list[i][el] === 'object') {
                            Object.getOwnPropertyNames(_this.list[i][el]).forEach(function (el2) {
                                if (fieldname.split('.')[1] === el2 && searchvalue == _this.list[i][el][el2]) {
                                    found = true;
                                }
                            });
                        }
                    });
                    if (found) {
                        result = this.list[i];
                        break;
                    }
                }
                ;
                return result;
            };
            ListBlankoformular.prototype.getCopyItem = function (item) {
                return JSON.parse(JSON.stringify(item));
            };
            ListBlankoformular.prototype.getCopyIndex = function (idx) {
                return this.getCopyItem(this.getIndex(idx));
            };
            ListBlankoformular.prototype.getList = function () {
                return this.list;
            };
            ListBlankoformular.prototype.getCopyList = function () {
                return JSON.parse(JSON.stringify(this.list));
            };
            ListBlankoformular.prototype.getListByFieldname = function (fieldname, searchvalue) {
                var result = [];
                this.list.forEach(function (el) {
                    Object.getOwnPropertyNames(el).forEach(function (name) {
                        if (fieldname === name && searchvalue == el[name]) {
                            result.push(el);
                        }
                        if (fieldname.indexOf('.') > -1 && name === fieldname.split('.')[0] && typeof el === 'object') {
                            Object.getOwnPropertyNames(el[name]).forEach(function (name2) {
                                if (fieldname.split('.')[1] === name2 && searchvalue == el[name][name2]) {
                                    result.push(el);
                                }
                            });
                        }
                    });
                });
                return result;
            };
            ListBlankoformular.prototype.getCopyListByFieldname = function (fieldname, searchvalue) {
                return JSON.parse(JSON.stringify(this.getListByFieldname(fieldname, searchvalue)));
            };
            ListBlankoformular.prototype.getAsObjectList = function (fieldname1, fieldname2) {
                var result = {};
                var field1Value;
                var field2Value;
                this.list.forEach(function (el) {
                    field1Value = '';
                    field2Value = '';
                    Object.getOwnPropertyNames(el).forEach(function (name) {
                        if (fieldname1 === name) {
                            field1Value = el[name];
                        }
                        if (fieldname2 === name) {
                            field2Value = el[name];
                        }
                    });
                    if (field1Value && field2Value) {
                        result[field1Value] = field2Value;
                    }
                });
                return result;
            };
            ListBlankoformular.getObjectValue = function (obj, name) {
                var result = '';
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    if (name === el) {
                        result = obj[el];
                    }
                });
                return result;
            };
            ListBlankoformular.setObjectValue = function (obj, name, value) {
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    if (name === el) {
                        obj[el] = value;
                    }
                });
            };
            ListBlankoformular.prototype.assignFieldValues = function (item, fromfield, tofield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = '';
                if (fromfield && tofield && item) {
                    fromfield.forEach(function (field, idx) {
                        if (idx > 0 && separator) {
                            value += separator;
                        }
                        value += ListBlankoformular.getObjectValue(item, field);
                    });
                    if (value) {
                        ListBlankoformular.setObjectValue(item, tofield, value);
                    }
                }
            };
            ListBlankoformular.prototype.assignListFieldValues = function (fromfield, tofield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignFieldValues(el, fromfield, tofield, separator);
                });
            };
            ListBlankoformular.prototype.assignObjectByName = function (item, tofield, singleObj, fromfield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = '';
                if (fromfield && tofield && item && singleObj && typeof singleObj === 'object') {
                    fromfield.forEach(function (field, idx) {
                        if (idx > 0 && separator && value) {
                            value += separator;
                        }
                        value += ListBlankoformular.getObjectValue(singleObj, field);
                    });
                    if (value) {
                        ListBlankoformular.setObjectValue(item, tofield, value);
                    }
                }
            };
            ListBlankoformular.prototype.assignListObjectByName = function (tofield, singleObj, fromfield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignObjectByName(el, tofield, singleObj, fromfield, separator);
                });
            };
            ListBlankoformular.prototype.assignObjectByValue = function (item, searchfield, tofield, singleObj, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = null;
                if (searchfield && tofield && item && singleObj && typeof singleObj === 'object') {
                    value = ListBlankoformular.getObjectValue(item, searchfield);
                    if (value) {
                        if (separator && value.indexOf(separator) > -1) {
                            value = value.replace(separator, '');
                        }
                        value = ListBlankoformular.getObjectValue(singleObj, value);
                        if (value) {
                            ListBlankoformular.setObjectValue(item, tofield, value);
                        }
                    }
                }
            };
            ListBlankoformular.prototype.assignListObjectByValue = function (searchfield, tofield, singleObj, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignObjectByValue(el, searchfield, tofield, singleObj, separator);
                });
            };
            return ListBlankoformular;
        })();
        models.ListBlankoformular = ListBlankoformular;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));

var app;
(function (app) {
    (function (models) {
        'use strict';

        

        

        var Clientformular = (function () {
            function Clientformular(field) {
                this.id = field && field.id || 1;
                this.name = field && field.name || "";
                this.lang = field && field.lang || "de";
                this.desc = field && field.desc || "";
                this.guid = field && field.guid || Clientformular.createGuid();
                this.scale = field && field.scale || 2;
                this.step = field && field.step || 0;
                this.customerID = field && field.customerID || 0;
                this.patientID = field && field.patientID || 0;
                this.ofage = (field && typeof field.ofage !== "undefined") ? field.ofage : false;
                this.patientMPID = field && field.patientMPID || "";
                this.fullname = field && field.fullname || "Blanko Formular";
                this.inputs = new app.models.ListFormularfieldset(field && field.inputs);
                this.signs = new app.models.ListFormularsign(field && field.signs);
                this.isfinished = (field && typeof field.isfinished !== "undefined") ? field.isfinished : false;
            }
            Clientformular.createGuid = function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            };
            return Clientformular;
        })();
        models.Clientformular = Clientformular;

        var ListClientformular = (function () {
            function ListClientformular(listOfClientformular) {
                this.list = [];
                if (listOfClientformular && listOfClientformular.list) {
                    this.addList(listOfClientformular.list);
                } else if (listOfClientformular) {
                    this.addList(listOfClientformular);
                }
            }
            ListClientformular.prototype.clear = function () {
                this.list = [];
            };
            ListClientformular.prototype.exist = function (item) {
                var result = -1;
                var test = JSON.stringify(new Clientformular(item));

                for (var i = 0; i < this.list.length; i++) {
                    if (test === JSON.stringify(this.list[i])) {
                        result = i;
                        break;
                    }
                }
                return result;
            };
            ListClientformular.prototype.addItem = function (item) {
                var result;
                var doExists = false;
                if (!doExists) {
                    this.list.push(new Clientformular(item));
                    result = this.list[this.list.length - 1];
                }
                return result;
            };
            ListClientformular.prototype.addOrUpdItem = function (item) {
                var result = this.addItem(item);
                return result;
            };
            ListClientformular.prototype.add = function (id) {
                return this.addItem(new Clientformular({ id: id }));
            };
            ListClientformular.prototype.addList = function (itemList) {
                var _this = this;
                itemList.forEach(function (el) {
                    _this.addItem(el);
                });
            };
            ListClientformular.prototype.delIndex = function (idx) {
                var deleted = false;
                if (idx >= 0 && idx < this.list.length) {
                    this.list.splice(idx, 1);
                    deleted = true;
                }
                return deleted;
            };
            ListClientformular.prototype.delItem = function (item) {
                return this.delIndex(this.exist(item));
            };
            ListClientformular.prototype.updIndex = function (idx, newItem) {
                var updated = false;
                if (idx >= 0 && idx < this.list.length) {
                    this.list[idx] = newItem;
                    updated = true;
                }
                return updated;
            };
            ListClientformular.prototype.updItem = function (oldItem, newItem) {
                return this.updIndex(this.exist(oldItem), newItem);
            };
            ListClientformular.prototype.getIndex = function (idx) {
                var result;
                if (idx >= 0 && idx < this.list.length) {
                    result = this.list[idx];
                }
                return result;
            };
            ListClientformular.prototype.getByFieldname = function (fieldname, searchvalue) {
                var _this = this;
                var result;
                var found = false;
                for (var i = 0; i < this.list.length; i++) {
                    Object.getOwnPropertyNames(this.list[i]).forEach(function (el) {
                        if (fieldname === el && searchvalue == _this.list[i][el]) {
                            found = true;
                        }
                        if (el === fieldname.split('.')[0] && typeof _this.list[i][el] === 'object') {
                            Object.getOwnPropertyNames(_this.list[i][el]).forEach(function (el2) {
                                if (fieldname.split('.')[1] === el2 && searchvalue == _this.list[i][el][el2]) {
                                    found = true;
                                }
                            });
                        }
                    });
                    if (found) {
                        result = this.list[i];
                        break;
                    }
                }
                ;
                return result;
            };
            ListClientformular.prototype.getCopyItem = function (item) {
                return JSON.parse(JSON.stringify(item));
            };
            ListClientformular.prototype.getCopyIndex = function (idx) {
                return this.getCopyItem(this.getIndex(idx));
            };
            ListClientformular.prototype.getList = function () {
                return this.list;
            };
            ListClientformular.prototype.getCopyList = function () {
                return JSON.parse(JSON.stringify(this.list));
            };
            ListClientformular.prototype.getListByFieldname = function (fieldname, searchvalue) {
                var result = [];
                this.list.forEach(function (el) {
                    Object.getOwnPropertyNames(el).forEach(function (name) {
                        if (fieldname === name && searchvalue == el[name]) {
                            result.push(el);
                        }
                        if (fieldname.indexOf('.') > -1 && name === fieldname.split('.')[0] && typeof el === 'object') {
                            Object.getOwnPropertyNames(el[name]).forEach(function (name2) {
                                if (fieldname.split('.')[1] === name2 && searchvalue == el[name][name2]) {
                                    result.push(el);
                                }
                            });
                        }
                    });
                });
                return result;
            };
            ListClientformular.prototype.getCopyListByFieldname = function (fieldname, searchvalue) {
                return JSON.parse(JSON.stringify(this.getListByFieldname(fieldname, searchvalue)));
            };
            ListClientformular.prototype.getAsObjectList = function (fieldname1, fieldname2) {
                var result = {};
                var field1Value;
                var field2Value;
                this.list.forEach(function (el) {
                    field1Value = '';
                    field2Value = '';
                    Object.getOwnPropertyNames(el).forEach(function (name) {
                        if (fieldname1 === name) {
                            field1Value = el[name];
                        }
                        if (fieldname2 === name) {
                            field2Value = el[name];
                        }
                    });
                    if (field1Value && field2Value) {
                        result[field1Value] = field2Value;
                    }
                });
                return result;
            };
            ListClientformular.getObjectValue = function (obj, name) {
                var result = null;
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    if (name === el) {
                        result = obj[el];
                    }
                });
                return result;
            };
            ListClientformular.setObjectValue = function (obj, name, value) {
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    if (name === el) {
                        obj[el] = value;
                    }
                });
            };
            ListClientformular.prototype.assignFieldValues = function (item, fromfield, tofield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = '';
                if (fromfield && tofield && item) {
                    fromfield.forEach(function (field, idx) {
                        if (idx > 0 && separator) {
                            value += separator;
                        }
                        value += ListClientformular.getObjectValue(item, field);
                    });
                    if (value) {
                        ListClientformular.setObjectValue(item, tofield, value);
                    }
                }
            };
            ListClientformular.prototype.assignListFieldValues = function (fromfield, tofield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignFieldValues(el, fromfield, tofield, separator);
                });
            };
            ListClientformular.prototype.assignObjectByName = function (item, tofield, singleObj, fromfield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = '';
                if (fromfield && tofield && item && singleObj && typeof singleObj === 'object') {
                    fromfield.forEach(function (field, idx) {
                        if (idx > 0 && separator) {
                            value += separator;
                        }
                        value += ListClientformular.getObjectValue(singleObj, field);
                    });
                    if (value) {
                        ListClientformular.setObjectValue(item, tofield, value);
                    }
                }
            };
            ListClientformular.prototype.assignListObjectByName = function (tofield, singleObj, fromfield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignObjectByName(el, tofield, singleObj, fromfield, separator);
                });
            };
            ListClientformular.prototype.assignObjectByValue = function (item, searchfield, tofield, singleObj, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = null;
                if (searchfield && tofield && item && singleObj && typeof singleObj === 'object') {
                    value = ListClientformular.getObjectValue(item, searchfield);
                    if (value) {
                        if (separator && value.indexOf(separator) > -1) {
                            value = value.replace(separator, '');
                        }
                        value = ListClientformular.getObjectValue(singleObj, value);
                        if (value) {
                            ListClientformular.setObjectValue(item, tofield, value);
                        }
                    }
                }
            };
            ListClientformular.prototype.assignListObjectByValue = function (searchfield, tofield, singleObj, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignObjectByValue(el, searchfield, tofield, singleObj, separator);
                });
            };
            return ListClientformular;
        })();
        models.ListClientformular = ListClientformular;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));

var app;
(function (app) {
    (function (models) {
        'use strict';

        var Countries = (function () {
            function Countries(field) {
                this.name = field && field.name || "";
                this.code = field && field.code || "";
            }
            return Countries;
        })();
        models.Countries = Countries;

        

        var ListCountries = (function () {
            function ListCountries(listOfCountries) {
                this.list = [];
                if (listOfCountries && listOfCountries.list) {
                    this.addList(listOfCountries.list);
                } else if (listOfCountries) {
                    this.addList(listOfCountries);
                }
            }
            ListCountries.prototype.clear = function () {
                this.list = [];
            };
            ListCountries.prototype.exist = function (item) {
                var result = -1;
                var test = JSON.stringify(new Countries(item));

                for (var i = 0; i < this.list.length; i++) {
                    if (test === JSON.stringify(this.list[i])) {
                        result = i;
                        break;
                    }
                }
                return result;
            };
            ListCountries.prototype.existID = function (name) {
                var result = -1;
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].name === name) {
                        result = i;
                        break;
                    }
                }
                return result;
            };
            ListCountries.prototype.getID = function (name) {
                var idx = this.existID(name);
                if (idx > -1) {
                    return this.list[idx];
                } else {
                    return null;
                }
            };
            ListCountries.prototype.getCopyID = function (name) {
                return this.getCopyItem(this.getID(name));
            };
            ListCountries.prototype.delID = function (name) {
                return this.delIndex(this.existID(name));
            };
            ListCountries.prototype.updID = function (name, newItem) {
                return this.updIndex(this.existID(name), newItem);
            };
            ListCountries.prototype.addItem = function (item) {
                var result;
                var doExists = false;
                if (!doExists && this.existID(item.name) > -1) {
                    doExists = true;
                }
                if (!doExists) {
                    this.list.push(new Countries(item));
                    result = this.list[this.list.length - 1];
                }
                return result;
            };
            ListCountries.prototype.addOrUpdItem = function (item) {
                var result = this.addItem(item);
                if (!result) {
                    var idx = this.existID(item.name);
                    this.updIndex(idx, item);
                    result = this.list[idx];
                }
                return result;
            };
            ListCountries.prototype.add = function (name, code) {
                return this.addItem(new Countries({ name: name, code: code }));
            };
            ListCountries.prototype.addList = function (itemList) {
                var _this = this;
                itemList.forEach(function (el) {
                    _this.addItem(el);
                });
            };
            ListCountries.prototype.delIndex = function (idx) {
                var deleted = false;
                if (idx >= 0 && idx < this.list.length) {
                    this.list.splice(idx, 1);
                    deleted = true;
                }
                return deleted;
            };
            ListCountries.prototype.delItem = function (item) {
                return this.delIndex(this.exist(item));
            };
            ListCountries.prototype.updIndex = function (idx, newItem) {
                var updated = false;
                if (idx >= 0 && idx < this.list.length) {
                    this.list[idx] = newItem;
                    updated = true;
                }
                return updated;
            };
            ListCountries.prototype.updItem = function (oldItem, newItem) {
                return this.updIndex(this.exist(oldItem), newItem);
            };
            ListCountries.prototype.getIndex = function (idx) {
                var result;
                if (idx >= 0 && idx < this.list.length) {
                    result = this.list[idx];
                }
                return result;
            };
            ListCountries.prototype.getByFieldname = function (fieldname, searchvalue) {
                var _this = this;
                var result;
                var found = false;
                for (var i = 0; i < this.list.length; i++) {
                    Object.getOwnPropertyNames(this.list[i]).forEach(function (el) {
                        if (fieldname === el && searchvalue == _this.list[i][el]) {
                            found = true;
                        }
                        if (el === fieldname.split('.')[0] && typeof _this.list[i][el] === 'object') {
                            Object.getOwnPropertyNames(_this.list[i][el]).forEach(function (el2) {
                                if (fieldname.split('.')[1] === el2 && searchvalue == _this.list[i][el][el2]) {
                                    found = true;
                                }
                            });
                        }
                    });
                    if (found) {
                        result = this.list[i];
                        break;
                    }
                }
                ;
                return result;
            };
            ListCountries.prototype.getCopyItem = function (item) {
                return JSON.parse(JSON.stringify(item));
            };
            ListCountries.prototype.getCopyIndex = function (idx) {
                return this.getCopyItem(this.getIndex(idx));
            };
            ListCountries.prototype.getList = function () {
                return this.list;
            };
            ListCountries.prototype.getCopyList = function () {
                return JSON.parse(JSON.stringify(this.list));
            };
            ListCountries.prototype.getListByFieldname = function (fieldname, searchvalue) {
                var result = [];
                this.list.forEach(function (el) {
                    Object.getOwnPropertyNames(el).forEach(function (name) {
                        if (fieldname === name && searchvalue == el[name]) {
                            result.push(el);
                        }
                        if (fieldname.indexOf('.') > -1 && name === fieldname.split('.')[0] && typeof el === 'object') {
                            Object.getOwnPropertyNames(el[name]).forEach(function (name2) {
                                if (fieldname.split('.')[1] === name2 && searchvalue == el[name][name2]) {
                                    result.push(el);
                                }
                            });
                        }
                    });
                });
                return result;
            };
            ListCountries.prototype.getCopyListByFieldname = function (fieldname, searchvalue) {
                return JSON.parse(JSON.stringify(this.getListByFieldname(fieldname, searchvalue)));
            };
            ListCountries.prototype.getAsObjectList = function (fieldname1, fieldname2) {
                var result = {};
                var field1Value;
                var field2Value;
                this.list.forEach(function (el) {
                    field1Value = '';
                    field2Value = '';
                    Object.getOwnPropertyNames(el).forEach(function (name) {
                        if (fieldname1 === name) {
                            field1Value = el[name];
                        }
                        if (fieldname2 === name) {
                            field2Value = el[name];
                        }
                    });
                    if (field1Value && field2Value) {
                        result[field1Value] = field2Value;
                    }
                });
                return result;
            };
            ListCountries.getObjectValue = function (obj, name) {
                var result = '';
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    if (name === el) {
                        result = obj[el];
                    }
                });
                return result;
            };
            ListCountries.setObjectValue = function (obj, name, value) {
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    if (name === el) {
                        obj[el] = value;
                    }
                });
            };
            ListCountries.prototype.assignFieldValues = function (item, fromfield, tofield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = '';
                if (fromfield && tofield && item) {
                    fromfield.forEach(function (field, idx) {
                        if (idx > 0 && separator) {
                            value += separator;
                        }
                        value += ListCountries.getObjectValue(item, field);
                    });
                    if (value) {
                        ListCountries.setObjectValue(item, tofield, value);
                    }
                }
            };
            ListCountries.prototype.assignListFieldValues = function (fromfield, tofield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignFieldValues(el, fromfield, tofield, separator);
                });
            };
            ListCountries.prototype.assignObjectByName = function (item, tofield, singleObj, fromfield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = '';
                if (fromfield && tofield && item && singleObj && typeof singleObj === 'object') {
                    fromfield.forEach(function (field, idx) {
                        if (idx > 0 && separator && value) {
                            value += separator;
                        }
                        value += ListCountries.getObjectValue(singleObj, field);
                    });
                    if (value) {
                        ListCountries.setObjectValue(item, tofield, value);
                    }
                }
            };
            ListCountries.prototype.assignListObjectByName = function (tofield, singleObj, fromfield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignObjectByName(el, tofield, singleObj, fromfield, separator);
                });
            };
            ListCountries.prototype.assignObjectByValue = function (item, searchfield, tofield, singleObj, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = null;
                if (searchfield && tofield && item && singleObj && typeof singleObj === 'object') {
                    value = ListCountries.getObjectValue(item, searchfield);
                    if (value) {
                        if (separator && value.indexOf(separator) > -1) {
                            value = value.replace(separator, '');
                        }
                        value = ListCountries.getObjectValue(singleObj, value);
                        if (value) {
                            ListCountries.setObjectValue(item, tofield, value);
                        }
                    }
                }
            };
            ListCountries.prototype.assignListObjectByValue = function (searchfield, tofield, singleObj, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignObjectByValue(el, searchfield, tofield, singleObj, separator);
                });
            };
            return ListCountries;
        })();
        models.ListCountries = ListCountries;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));

var app;
(function (app) {
    (function (models) {
        'use strict';

        

        var Formularfield = (function () {
            function Formularfield(field) {
                this.name = field && field.name || "";
                this.value = (field && typeof field.value !== "undefined") ? field.value : null;
                this.orgvalue = (field && typeof field.orgvalue !== "undefined") ? field.orgvalue : null;
                this.tmpvalue = field && field.tmpvalue || [];
                this.tmpidx = field && field.tmpidx || 0;
                this.tofield = field && field.tofield || "";
                this.separator = field && field.separator || " ";
                this.label = (field && typeof field.label !== "undefined") ? field.label : this.name;
                this.type = field && field.type || "text";
                this.ngclass = field && field.ngclass || "";
                this.mask = field && field.mask || "";
                this.cleanmask = (field && typeof field.cleanmask !== "undefined") ? field.cleanmask : true;
                this.min = field && field.min || 0;
                this.max = field && field.max || 0;
                this.minval = field && field.minval || "";
                this.maxval = field && field.maxval || "";
                this.defval = field && field.defval || "";
                this.hint = field && field.hint || "";
                this.verifymsg = field && field.verifymsg || "";
                this.verify = (field && typeof field.verify !== "undefined") ? field.verify : false;
                this.disabled = (field && typeof field.disabled !== "undefined") ? field.disabled : false;
                this.hidden = (field && typeof field.hidden !== "undefined") ? field.hidden : false;
                this.required = (field && typeof field.required !== "undefined") ? field.required : false;
            }
            return Formularfield;
        })();
        models.Formularfield = Formularfield;

        

        var ListFormularfield = (function () {
            function ListFormularfield(listOfFormularfield) {
                this.list = [];
                if (listOfFormularfield && listOfFormularfield.list) {
                    this.addList(listOfFormularfield.list);
                } else if (listOfFormularfield) {
                    this.addList(listOfFormularfield);
                }
            }
            ListFormularfield.prototype.clear = function () {
                this.list = [];
            };
            ListFormularfield.prototype.exist = function (item) {
                var result = -1;
                var test = JSON.stringify(new Formularfield(item));

                for (var i = 0; i < this.list.length; i++) {
                    if (test === JSON.stringify(this.list[i])) {
                        result = i;
                        break;
                    }
                }
                return result;
            };
            ListFormularfield.prototype.existID = function (name) {
                var result = -1;
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].name === name) {
                        result = i;
                        break;
                    }
                }
                return result;
            };
            ListFormularfield.prototype.getID = function (name) {
                var idx = this.existID(name);
                if (idx > -1) {
                    return this.list[idx];
                } else {
                    return null;
                }
            };
            ListFormularfield.prototype.getCopyID = function (name) {
                return this.getCopyItem(this.getID(name));
            };
            ListFormularfield.prototype.delID = function (name) {
                return this.delIndex(this.existID(name));
            };
            ListFormularfield.prototype.updID = function (name, newItem) {
                return this.updIndex(this.existID(name), newItem);
            };
            ListFormularfield.prototype.addItem = function (item) {
                var result;
                var doExists = false;
                if (!doExists && this.existID(item.name) > -1) {
                    doExists = true;
                }
                if (!doExists) {
                    this.list.push(new Formularfield(item));
                    result = this.list[this.list.length - 1];
                }
                return result;
            };
            ListFormularfield.prototype.addOrUpdItem = function (item) {
                var result = this.addItem(item);
                if (!result) {
                    var idx = this.existID(item.name);
                    this.updIndex(idx, item);
                    result = this.list[idx];
                }
                return result;
            };
            ListFormularfield.prototype.add = function (name, value) {
                return this.addItem(new Formularfield({ name: name, value: value }));
            };
            ListFormularfield.prototype.addList = function (itemList) {
                var _this = this;
                itemList.forEach(function (el) {
                    _this.addItem(el);
                });
            };
            ListFormularfield.prototype.delIndex = function (idx) {
                var deleted = false;
                if (idx >= 0 && idx < this.list.length) {
                    this.list.splice(idx, 1);
                    deleted = true;
                }
                return deleted;
            };
            ListFormularfield.prototype.delItem = function (item) {
                return this.delIndex(this.exist(item));
            };
            ListFormularfield.prototype.updIndex = function (idx, newItem) {
                var updated = false;
                if (idx >= 0 && idx < this.list.length) {
                    this.list[idx] = newItem;
                    updated = true;
                }
                return updated;
            };
            ListFormularfield.prototype.updItem = function (oldItem, newItem) {
                return this.updIndex(this.exist(oldItem), newItem);
            };
            ListFormularfield.prototype.getIndex = function (idx) {
                var result;
                if (idx >= 0 && idx < this.list.length) {
                    result = this.list[idx];
                }
                return result;
            };
            ListFormularfield.prototype.getByFieldname = function (fieldname, searchvalue) {
                var _this = this;
                var result;
                var found = false;
                for (var i = 0; i < this.list.length; i++) {
                    Object.getOwnPropertyNames(this.list[i]).forEach(function (el) {
                        if (fieldname === el && searchvalue == _this.list[i][el]) {
                            found = true;
                        }
                        if (el === fieldname.split('.')[0] && typeof _this.list[i][el] === 'object') {
                            Object.getOwnPropertyNames(_this.list[i][el]).forEach(function (el2) {
                                if (fieldname.split('.')[1] === el2 && searchvalue == _this.list[i][el][el2]) {
                                    found = true;
                                }
                            });
                        }
                    });
                    if (found) {
                        result = this.list[i];
                        break;
                    }
                }
                ;
                return result;
            };
            ListFormularfield.prototype.getCopyItem = function (item) {
                return JSON.parse(JSON.stringify(item));
            };
            ListFormularfield.prototype.getCopyIndex = function (idx) {
                return this.getCopyItem(this.getIndex(idx));
            };
            ListFormularfield.prototype.getList = function () {
                return this.list;
            };
            ListFormularfield.prototype.getCopyList = function () {
                return JSON.parse(JSON.stringify(this.list));
            };
            ListFormularfield.prototype.getListByFieldname = function (fieldname, searchvalue) {
                var result = [];
                this.list.forEach(function (el) {
                    Object.getOwnPropertyNames(el).forEach(function (name) {
                        if (fieldname === name && searchvalue == el[name]) {
                            result.push(el);
                        }
                        if (fieldname.indexOf('.') > -1 && name === fieldname.split('.')[0] && typeof el === 'object') {
                            Object.getOwnPropertyNames(el[name]).forEach(function (name2) {
                                if (fieldname.split('.')[1] === name2 && searchvalue == el[name][name2]) {
                                    result.push(el);
                                }
                            });
                        }
                    });
                });
                return result;
            };
            ListFormularfield.prototype.getCopyListByFieldname = function (fieldname, searchvalue) {
                return JSON.parse(JSON.stringify(this.getListByFieldname(fieldname, searchvalue)));
            };
            ListFormularfield.prototype.getAsObjectList = function (fieldname1, fieldname2) {
                var result = {};
                var field1Value;
                var field2Value;
                this.list.forEach(function (el) {
                    field1Value = '';
                    field2Value = '';
                    Object.getOwnPropertyNames(el).forEach(function (name) {
                        if (fieldname1 === name) {
                            field1Value = el[name];
                        }
                        if (fieldname2 === name) {
                            field2Value = el[name];
                        }
                    });
                    if (field1Value && field2Value) {
                        result[field1Value] = field2Value;
                    }
                });
                return result;
            };
            ListFormularfield.getObjectValue = function (obj, name) {
                var result = null;
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    if (name === el) {
                        result = obj[el];
                    }
                });
                return result;
            };
            ListFormularfield.setObjectValue = function (obj, name, value) {
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    if (name === el) {
                        obj[el] = value;
                    }
                });
            };
            ListFormularfield.prototype.assignFieldValues = function (item, fromfield, tofield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = '';
                if (fromfield && tofield && item) {
                    fromfield.forEach(function (field, idx) {
                        if (idx > 0 && separator) {
                            value += separator;
                        }
                        value += ListFormularfield.getObjectValue(item, field);
                    });
                    if (value) {
                        ListFormularfield.setObjectValue(item, tofield, value);
                    }
                }
            };
            ListFormularfield.prototype.assignListFieldValues = function (fromfield, tofield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignFieldValues(el, fromfield, tofield, separator);
                });
            };
            ListFormularfield.prototype.assignObjectByName = function (item, tofield, singleObj, fromfield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = '';
                if (fromfield && tofield && item && singleObj && typeof singleObj === 'object') {
                    fromfield.forEach(function (field, idx) {
                        if (idx > 0 && separator) {
                            value += separator;
                        }
                        value += ListFormularfield.getObjectValue(singleObj, field);
                    });
                    if (value) {
                        ListFormularfield.setObjectValue(item, tofield, value);
                    }
                }
            };
            ListFormularfield.prototype.assignListObjectByName = function (tofield, singleObj, fromfield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignObjectByName(el, tofield, singleObj, fromfield, separator);
                });
            };
            ListFormularfield.prototype.assignObjectByValue = function (item, searchfield, tofield, singleObj, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = null;
                if (searchfield && tofield && item && singleObj && typeof singleObj === 'object') {
                    value = ListFormularfield.getObjectValue(item, searchfield);
                    if (value) {
                        if (separator && value.indexOf(separator) > -1) {
                            value = value.replace(separator, '');
                        }
                        value = ListFormularfield.getObjectValue(singleObj, value);
                        if (value) {
                            ListFormularfield.setObjectValue(item, tofield, value);
                        }
                    }
                }
            };
            ListFormularfield.prototype.assignListObjectByValue = function (searchfield, tofield, singleObj, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignObjectByValue(el, searchfield, tofield, singleObj, separator);
                });
            };
            return ListFormularfield;
        })();
        models.ListFormularfield = ListFormularfield;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));

var app;
(function (app) {
    (function (models) {
        'use strict';

        

        

        var Formularfieldset = (function () {
            function Formularfieldset(field) {
                this.divider = field && field.divider || "";
                this.fields = new app.models.ListFormularfield(field && field.fields);
            }
            return Formularfieldset;
        })();
        models.Formularfieldset = Formularfieldset;

        var ListFormularfieldset = (function () {
            function ListFormularfieldset(listOfFormularfieldset) {
                this.list = [];
                if (listOfFormularfieldset && listOfFormularfieldset.list) {
                    this.addList(listOfFormularfieldset.list);
                } else if (listOfFormularfieldset) {
                    this.addList(listOfFormularfieldset);
                }
            }
            ListFormularfieldset.prototype.clear = function () {
                this.list = [];
            };
            ListFormularfieldset.prototype.exist = function (item) {
                var result = -1;
                var test = JSON.stringify(new Formularfieldset(item));

                for (var i = 0; i < this.list.length; i++) {
                    if (test === JSON.stringify(this.list[i])) {
                        result = i;
                        break;
                    }
                }
                return result;
            };
            ListFormularfieldset.prototype.addItem = function (item) {
                var result;
                var doExists = false;
                if (!doExists) {
                    this.list.push(new Formularfieldset(item));
                    result = this.list[this.list.length - 1];
                }
                return result;
            };
            ListFormularfieldset.prototype.addOrUpdItem = function (item) {
                var result = this.addItem(item);
                return result;
            };
            ListFormularfieldset.prototype.add = function (divider, fields) {
                return this.addItem(new Formularfieldset({ divider: divider, fields: fields }));
            };
            ListFormularfieldset.prototype.addList = function (itemList) {
                var _this = this;
                itemList.forEach(function (el) {
                    _this.addItem(el);
                });
            };
            ListFormularfieldset.prototype.delIndex = function (idx) {
                var deleted = false;
                if (idx >= 0 && idx < this.list.length) {
                    this.list.splice(idx, 1);
                    deleted = true;
                }
                return deleted;
            };
            ListFormularfieldset.prototype.delItem = function (item) {
                return this.delIndex(this.exist(item));
            };
            ListFormularfieldset.prototype.updIndex = function (idx, newItem) {
                var updated = false;
                if (idx >= 0 && idx < this.list.length) {
                    this.list[idx] = newItem;
                    updated = true;
                }
                return updated;
            };
            ListFormularfieldset.prototype.updItem = function (oldItem, newItem) {
                return this.updIndex(this.exist(oldItem), newItem);
            };
            ListFormularfieldset.prototype.getIndex = function (idx) {
                var result;
                if (idx >= 0 && idx < this.list.length) {
                    result = this.list[idx];
                }
                return result;
            };
            ListFormularfieldset.prototype.getByFieldname = function (fieldname, searchvalue) {
                var _this = this;
                var result;
                var found = false;
                for (var i = 0; i < this.list.length; i++) {
                    Object.getOwnPropertyNames(this.list[i]).forEach(function (el) {
                        if (fieldname === el && searchvalue == _this.list[i][el]) {
                            found = true;
                        }
                        if (el === fieldname.split('.')[0] && typeof _this.list[i][el] === 'object') {
                            Object.getOwnPropertyNames(_this.list[i][el]).forEach(function (el2) {
                                if (fieldname.split('.')[1] === el2 && searchvalue == _this.list[i][el][el2]) {
                                    found = true;
                                }
                            });
                        }
                    });
                    if (found) {
                        result = this.list[i];
                        break;
                    }
                }
                ;
                return result;
            };
            ListFormularfieldset.prototype.getCopyItem = function (item) {
                return JSON.parse(JSON.stringify(item));
            };
            ListFormularfieldset.prototype.getCopyIndex = function (idx) {
                return this.getCopyItem(this.getIndex(idx));
            };
            ListFormularfieldset.prototype.getList = function () {
                return this.list;
            };
            ListFormularfieldset.prototype.getCopyList = function () {
                return JSON.parse(JSON.stringify(this.list));
            };
            ListFormularfieldset.prototype.getListByFieldname = function (fieldname, searchvalue) {
                var result = [];
                this.list.forEach(function (el) {
                    Object.getOwnPropertyNames(el).forEach(function (name) {
                        if (fieldname === name && searchvalue == el[name]) {
                            result.push(el);
                        }
                        if (fieldname.indexOf('.') > -1 && name === fieldname.split('.')[0] && typeof el === 'object') {
                            Object.getOwnPropertyNames(el[name]).forEach(function (name2) {
                                if (fieldname.split('.')[1] === name2 && searchvalue == el[name][name2]) {
                                    result.push(el);
                                }
                            });
                        }
                    });
                });
                return result;
            };
            ListFormularfieldset.prototype.getCopyListByFieldname = function (fieldname, searchvalue) {
                return JSON.parse(JSON.stringify(this.getListByFieldname(fieldname, searchvalue)));
            };
            ListFormularfieldset.prototype.getAsObjectList = function (fieldname1, fieldname2) {
                var result = {};
                var field1Value;
                var field2Value;
                this.list.forEach(function (el) {
                    field1Value = '';
                    field2Value = '';
                    Object.getOwnPropertyNames(el).forEach(function (name) {
                        if (fieldname1 === name) {
                            field1Value = el[name];
                        }
                        if (fieldname2 === name) {
                            field2Value = el[name];
                        }
                    });
                    if (field1Value && field2Value) {
                        result[field1Value] = field2Value;
                    }
                });
                return result;
            };
            ListFormularfieldset.getObjectValue = function (obj, name) {
                var result = null;
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    if (name === el) {
                        result = obj[el];
                    }
                });
                return result;
            };
            ListFormularfieldset.setObjectValue = function (obj, name, value) {
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    if (name === el) {
                        obj[el] = value;
                    }
                });
            };
            ListFormularfieldset.prototype.assignFieldValues = function (item, fromfield, tofield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = '';
                if (fromfield && tofield && item) {
                    fromfield.forEach(function (field, idx) {
                        if (idx > 0 && separator) {
                            value += separator;
                        }
                        value += ListFormularfieldset.getObjectValue(item, field);
                    });
                    if (value) {
                        ListFormularfieldset.setObjectValue(item, tofield, value);
                    }
                }
            };
            ListFormularfieldset.prototype.assignListFieldValues = function (fromfield, tofield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignFieldValues(el, fromfield, tofield, separator);
                });
            };
            ListFormularfieldset.prototype.assignObjectByName = function (item, tofield, singleObj, fromfield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = '';
                if (fromfield && tofield && item && singleObj && typeof singleObj === 'object') {
                    fromfield.forEach(function (field, idx) {
                        if (idx > 0 && separator) {
                            value += separator;
                        }
                        value += ListFormularfieldset.getObjectValue(singleObj, field);
                    });
                    if (value) {
                        ListFormularfieldset.setObjectValue(item, tofield, value);
                    }
                }
            };
            ListFormularfieldset.prototype.assignListObjectByName = function (tofield, singleObj, fromfield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignObjectByName(el, tofield, singleObj, fromfield, separator);
                });
            };
            ListFormularfieldset.prototype.assignObjectByValue = function (item, searchfield, tofield, singleObj, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = null;
                if (searchfield && tofield && item && singleObj && typeof singleObj === 'object') {
                    value = ListFormularfieldset.getObjectValue(item, searchfield);
                    if (value) {
                        if (separator && value.indexOf(separator) > -1) {
                            value = value.replace(separator, '');
                        }
                        value = ListFormularfieldset.getObjectValue(singleObj, value);
                        if (value) {
                            ListFormularfieldset.setObjectValue(item, tofield, value);
                        }
                    }
                }
            };
            ListFormularfieldset.prototype.assignListObjectByValue = function (searchfield, tofield, singleObj, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignObjectByValue(el, searchfield, tofield, singleObj, separator);
                });
            };
            return ListFormularfieldset;
        })();
        models.ListFormularfieldset = ListFormularfieldset;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));

var app;
(function (app) {
    (function (models) {
        'use strict';

        

        

        var Formularsign = (function () {
            function Formularsign(field) {
                this.name = field && field.name || "";
                this.value = field && field.value || "";
                this.divider = field && field.divider || "";
                this.desc = field && field.desc || "";
                this.required = (field && typeof field.required !== "undefined") ? field.required : false;
            }
            return Formularsign;
        })();
        models.Formularsign = Formularsign;

        var ListFormularsign = (function () {
            function ListFormularsign(listOfFormularsign) {
                this.list = [];
                if (listOfFormularsign && listOfFormularsign.list) {
                    this.addList(listOfFormularsign.list);
                } else if (listOfFormularsign) {
                    this.addList(listOfFormularsign);
                }
            }
            ListFormularsign.prototype.clear = function () {
                this.list = [];
            };
            ListFormularsign.prototype.exist = function (item) {
                var result = -1;
                var test = JSON.stringify(new Formularsign(item));

                for (var i = 0; i < this.list.length; i++) {
                    if (test === JSON.stringify(this.list[i])) {
                        result = i;
                        break;
                    }
                }
                return result;
            };
            ListFormularsign.prototype.existID = function (name) {
                var result = -1;
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].name === name) {
                        result = i;
                        break;
                    }
                }
                return result;
            };
            ListFormularsign.prototype.getID = function (name) {
                var idx = this.existID(name);
                if (idx > -1) {
                    return this.list[idx];
                } else {
                    return null;
                }
            };
            ListFormularsign.prototype.getCopyID = function (name) {
                return this.getCopyItem(this.getID(name));
            };
            ListFormularsign.prototype.delID = function (name) {
                return this.delIndex(this.existID(name));
            };
            ListFormularsign.prototype.updID = function (name, newItem) {
                return this.updIndex(this.existID(name), newItem);
            };
            ListFormularsign.prototype.addItem = function (item) {
                var result;
                var doExists = false;
                if (!doExists && this.existID(item.name) > -1) {
                    doExists = true;
                }
                if (!doExists) {
                    this.list.push(new Formularsign(item));
                    result = this.list[this.list.length - 1];
                }
                return result;
            };
            ListFormularsign.prototype.addOrUpdItem = function (item) {
                var result = this.addItem(item);
                if (!result) {
                    var idx = this.existID(item.name);
                    this.updIndex(idx, item);
                    result = this.list[idx];
                }
                return result;
            };
            ListFormularsign.prototype.add = function (name) {
                return this.addItem(new Formularsign({ name: name }));
            };
            ListFormularsign.prototype.addList = function (itemList) {
                var _this = this;
                itemList.forEach(function (el) {
                    _this.addItem(el);
                });
            };
            ListFormularsign.prototype.delIndex = function (idx) {
                var deleted = false;
                if (idx >= 0 && idx < this.list.length) {
                    this.list.splice(idx, 1);
                    deleted = true;
                }
                return deleted;
            };
            ListFormularsign.prototype.delItem = function (item) {
                return this.delIndex(this.exist(item));
            };
            ListFormularsign.prototype.updIndex = function (idx, newItem) {
                var updated = false;
                if (idx >= 0 && idx < this.list.length) {
                    this.list[idx] = newItem;
                    updated = true;
                }
                return updated;
            };
            ListFormularsign.prototype.updItem = function (oldItem, newItem) {
                return this.updIndex(this.exist(oldItem), newItem);
            };
            ListFormularsign.prototype.getIndex = function (idx) {
                var result;
                if (idx >= 0 && idx < this.list.length) {
                    result = this.list[idx];
                }
                return result;
            };
            ListFormularsign.prototype.getByFieldname = function (fieldname, searchvalue) {
                var _this = this;
                var result;
                var found = false;
                for (var i = 0; i < this.list.length; i++) {
                    Object.getOwnPropertyNames(this.list[i]).forEach(function (el) {
                        if (fieldname === el && searchvalue == _this.list[i][el]) {
                            found = true;
                        }
                        if (el === fieldname.split('.')[0] && typeof _this.list[i][el] === 'object') {
                            Object.getOwnPropertyNames(_this.list[i][el]).forEach(function (el2) {
                                if (fieldname.split('.')[1] === el2 && searchvalue == _this.list[i][el][el2]) {
                                    found = true;
                                }
                            });
                        }
                    });
                    if (found) {
                        result = this.list[i];
                        break;
                    }
                }
                ;
                return result;
            };
            ListFormularsign.prototype.getCopyItem = function (item) {
                return JSON.parse(JSON.stringify(item));
            };
            ListFormularsign.prototype.getCopyIndex = function (idx) {
                return this.getCopyItem(this.getIndex(idx));
            };
            ListFormularsign.prototype.getList = function () {
                return this.list;
            };
            ListFormularsign.prototype.getCopyList = function () {
                return JSON.parse(JSON.stringify(this.list));
            };
            ListFormularsign.prototype.getListByFieldname = function (fieldname, searchvalue) {
                var result = [];
                this.list.forEach(function (el) {
                    Object.getOwnPropertyNames(el).forEach(function (name) {
                        if (fieldname === name && searchvalue == el[name]) {
                            result.push(el);
                        }
                        if (fieldname.indexOf('.') > -1 && name === fieldname.split('.')[0] && typeof el === 'object') {
                            Object.getOwnPropertyNames(el[name]).forEach(function (name2) {
                                if (fieldname.split('.')[1] === name2 && searchvalue == el[name][name2]) {
                                    result.push(el);
                                }
                            });
                        }
                    });
                });
                return result;
            };
            ListFormularsign.prototype.getCopyListByFieldname = function (fieldname, searchvalue) {
                return JSON.parse(JSON.stringify(this.getListByFieldname(fieldname, searchvalue)));
            };
            ListFormularsign.prototype.getAsObjectList = function (fieldname1, fieldname2) {
                var result = {};
                var field1Value;
                var field2Value;
                this.list.forEach(function (el) {
                    field1Value = '';
                    field2Value = '';
                    Object.getOwnPropertyNames(el).forEach(function (name) {
                        if (fieldname1 === name) {
                            field1Value = el[name];
                        }
                        if (fieldname2 === name) {
                            field2Value = el[name];
                        }
                    });
                    if (field1Value && field2Value) {
                        result[field1Value] = field2Value;
                    }
                });
                return result;
            };
            ListFormularsign.getObjectValue = function (obj, name) {
                var result = null;
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    if (name === el) {
                        result = obj[el];
                    }
                });
                return result;
            };
            ListFormularsign.setObjectValue = function (obj, name, value) {
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    if (name === el) {
                        obj[el] = value;
                    }
                });
            };
            ListFormularsign.prototype.assignFieldValues = function (item, fromfield, tofield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = '';
                if (fromfield && tofield && item) {
                    fromfield.forEach(function (field, idx) {
                        if (idx > 0 && separator) {
                            value += separator;
                        }
                        value += ListFormularsign.getObjectValue(item, field);
                    });
                    if (value) {
                        ListFormularsign.setObjectValue(item, tofield, value);
                    }
                }
            };
            ListFormularsign.prototype.assignListFieldValues = function (fromfield, tofield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignFieldValues(el, fromfield, tofield, separator);
                });
            };
            ListFormularsign.prototype.assignObjectByName = function (item, tofield, singleObj, fromfield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = '';
                if (fromfield && tofield && item && singleObj && typeof singleObj === 'object') {
                    fromfield.forEach(function (field, idx) {
                        if (idx > 0 && separator) {
                            value += separator;
                        }
                        value += ListFormularsign.getObjectValue(singleObj, field);
                    });
                    if (value) {
                        ListFormularsign.setObjectValue(item, tofield, value);
                    }
                }
            };
            ListFormularsign.prototype.assignListObjectByName = function (tofield, singleObj, fromfield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignObjectByName(el, tofield, singleObj, fromfield, separator);
                });
            };
            ListFormularsign.prototype.assignObjectByValue = function (item, searchfield, tofield, singleObj, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = null;
                if (searchfield && tofield && item && singleObj && typeof singleObj === 'object') {
                    value = ListFormularsign.getObjectValue(item, searchfield);
                    if (value) {
                        if (separator && value.indexOf(separator) > -1) {
                            value = value.replace(separator, '');
                        }
                        value = ListFormularsign.getObjectValue(singleObj, value);
                        if (value) {
                            ListFormularsign.setObjectValue(item, tofield, value);
                        }
                    }
                }
            };
            ListFormularsign.prototype.assignListObjectByValue = function (searchfield, tofield, singleObj, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignObjectByValue(el, searchfield, tofield, singleObj, separator);
                });
            };
            return ListFormularsign;
        })();
        models.ListFormularsign = ListFormularsign;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));

var app;
(function (app) {
    (function (models) {
        'use strict';

        

        

        var Menu = (function () {
            function Menu(field) {
                this.name = field && field.name || "";
                this.icon = field && field.icon || "";
                this.hasBadge = (field && typeof field.hasBadge !== "undefined") ? field.hasBadge : false;
                this.countBadge = field && field.countBadge || 0;
                this.items = new app.models.ListMenuitem(field && field.items);
            }
            return Menu;
        })();
        models.Menu = Menu;

        var ListMenu = (function () {
            function ListMenu(listOfMenu) {
                this.list = [];
                if (listOfMenu && listOfMenu.list) {
                    this.addList(listOfMenu.list);
                } else if (listOfMenu) {
                    this.addList(listOfMenu);
                }
            }
            ListMenu.prototype.clear = function () {
                this.list = [];
            };
            ListMenu.prototype.exist = function (item) {
                var result = -1;
                var test = JSON.stringify(new Menu(item));

                for (var i = 0; i < this.list.length; i++) {
                    if (test === JSON.stringify(this.list[i])) {
                        result = i;
                        break;
                    }
                }
                return result;
            };
            ListMenu.prototype.existID = function (name) {
                var result = -1;
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].name === name) {
                        result = i;
                        break;
                    }
                }
                return result;
            };
            ListMenu.prototype.getID = function (name) {
                var idx = this.existID(name);
                if (idx > -1) {
                    return this.list[idx];
                } else {
                    return null;
                }
            };
            ListMenu.prototype.getCopyID = function (name) {
                return this.getCopyItem(this.getID(name));
            };
            ListMenu.prototype.delID = function (name) {
                return this.delIndex(this.existID(name));
            };
            ListMenu.prototype.updID = function (name, newItem) {
                return this.updIndex(this.existID(name), newItem);
            };
            ListMenu.prototype.addItem = function (item) {
                var result;
                var doExists = false;
                if (!doExists && this.existID(item.name) > -1) {
                    doExists = true;
                }
                if (!doExists) {
                    this.list.push(new Menu(item));
                    result = this.list[this.list.length - 1];
                }
                return result;
            };
            ListMenu.prototype.addOrUpdItem = function (item) {
                var result = this.addItem(item);
                if (!result) {
                    var idx = this.existID(item.name);
                    this.updIndex(idx, item);
                    result = this.list[idx];
                }
                return result;
            };
            ListMenu.prototype.add = function (name) {
                return this.addItem(new Menu({ name: name }));
            };
            ListMenu.prototype.addList = function (itemList) {
                var _this = this;
                itemList.forEach(function (el) {
                    _this.addItem(el);
                });
            };
            ListMenu.prototype.delIndex = function (idx) {
                var deleted = false;
                if (idx >= 0 && idx < this.list.length) {
                    this.list.splice(idx, 1);
                    deleted = true;
                }
                return deleted;
            };
            ListMenu.prototype.delItem = function (item) {
                return this.delIndex(this.exist(item));
            };
            ListMenu.prototype.updIndex = function (idx, newItem) {
                var updated = false;
                if (idx >= 0 && idx < this.list.length) {
                    this.list[idx] = newItem;
                    updated = true;
                }
                return updated;
            };
            ListMenu.prototype.updItem = function (oldItem, newItem) {
                return this.updIndex(this.exist(oldItem), newItem);
            };
            ListMenu.prototype.getIndex = function (idx) {
                var result;
                if (idx >= 0 && idx < this.list.length) {
                    result = this.list[idx];
                }
                return result;
            };
            ListMenu.prototype.getByFieldname = function (fieldname, searchvalue) {
                var _this = this;
                var result;
                var found = false;
                for (var i = 0; i < this.list.length; i++) {
                    Object.getOwnPropertyNames(this.list[i]).forEach(function (el) {
                        if (fieldname === el && searchvalue == _this.list[i][el]) {
                            found = true;
                        }
                        if (el === fieldname.split('.')[0] && typeof _this.list[i][el] === 'object') {
                            Object.getOwnPropertyNames(_this.list[i][el]).forEach(function (el2) {
                                if (fieldname.split('.')[1] === el2 && searchvalue == _this.list[i][el][el2]) {
                                    found = true;
                                }
                            });
                        }
                    });
                    if (found) {
                        result = this.list[i];
                        break;
                    }
                }
                ;
                return result;
            };
            ListMenu.prototype.getCopyItem = function (item) {
                return JSON.parse(JSON.stringify(item));
            };
            ListMenu.prototype.getCopyIndex = function (idx) {
                return this.getCopyItem(this.getIndex(idx));
            };
            ListMenu.prototype.getList = function () {
                return this.list;
            };
            ListMenu.prototype.getCopyList = function () {
                return JSON.parse(JSON.stringify(this.list));
            };
            ListMenu.prototype.getListByFieldname = function (fieldname, searchvalue) {
                var result = [];
                this.list.forEach(function (el) {
                    Object.getOwnPropertyNames(el).forEach(function (name) {
                        if (fieldname === name && searchvalue == el[name]) {
                            result.push(el);
                        }
                        if (fieldname.indexOf('.') > -1 && name === fieldname.split('.')[0] && typeof el === 'object') {
                            Object.getOwnPropertyNames(el[name]).forEach(function (name2) {
                                if (fieldname.split('.')[1] === name2 && searchvalue == el[name][name2]) {
                                    result.push(el);
                                }
                            });
                        }
                    });
                });
                return result;
            };
            ListMenu.prototype.getCopyListByFieldname = function (fieldname, searchvalue) {
                return JSON.parse(JSON.stringify(this.getListByFieldname(fieldname, searchvalue)));
            };
            ListMenu.prototype.getAsObjectList = function (fieldname1, fieldname2) {
                var result = {};
                var field1Value;
                var field2Value;
                this.list.forEach(function (el) {
                    field1Value = '';
                    field2Value = '';
                    Object.getOwnPropertyNames(el).forEach(function (name) {
                        if (fieldname1 === name) {
                            field1Value = el[name];
                        }
                        if (fieldname2 === name) {
                            field2Value = el[name];
                        }
                    });
                    if (field1Value && field2Value) {
                        result[field1Value] = field2Value;
                    }
                });
                return result;
            };
            ListMenu.getObjectValue = function (obj, name) {
                var result = null;
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    if (name === el) {
                        result = obj[el];
                    }
                });
                return result;
            };
            ListMenu.setObjectValue = function (obj, name, value) {
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    if (name === el) {
                        obj[el] = value;
                    }
                });
            };
            ListMenu.prototype.assignFieldValues = function (item, fromfield, tofield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = '';
                if (fromfield && tofield && item) {
                    fromfield.forEach(function (field, idx) {
                        if (idx > 0 && separator) {
                            value += separator;
                        }
                        value += ListMenu.getObjectValue(item, field);
                    });
                    if (value) {
                        ListMenu.setObjectValue(item, tofield, value);
                    }
                }
            };
            ListMenu.prototype.assignListFieldValues = function (fromfield, tofield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignFieldValues(el, fromfield, tofield, separator);
                });
            };
            ListMenu.prototype.assignObjectByName = function (item, tofield, singleObj, fromfield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = '';
                if (fromfield && tofield && item && singleObj && typeof singleObj === 'object') {
                    fromfield.forEach(function (field, idx) {
                        if (idx > 0 && separator) {
                            value += separator;
                        }
                        value += ListMenu.getObjectValue(singleObj, field);
                    });
                    if (value) {
                        ListMenu.setObjectValue(item, tofield, value);
                    }
                }
            };
            ListMenu.prototype.assignListObjectByName = function (tofield, singleObj, fromfield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignObjectByName(el, tofield, singleObj, fromfield, separator);
                });
            };
            ListMenu.prototype.assignObjectByValue = function (item, searchfield, tofield, singleObj, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = null;
                if (searchfield && tofield && item && singleObj && typeof singleObj === 'object') {
                    value = ListMenu.getObjectValue(item, searchfield);
                    if (value) {
                        if (separator && value.indexOf(separator) > -1) {
                            value = value.replace(separator, '');
                        }
                        value = ListMenu.getObjectValue(singleObj, value);
                        if (value) {
                            ListMenu.setObjectValue(item, tofield, value);
                        }
                    }
                }
            };
            ListMenu.prototype.assignListObjectByValue = function (searchfield, tofield, singleObj, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignObjectByValue(el, searchfield, tofield, singleObj, separator);
                });
            };
            return ListMenu;
        })();
        models.ListMenu = ListMenu;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));

var app;
(function (app) {
    (function (models) {
        'use strict';

        

        

        var Menuitem = (function () {
            function Menuitem(field) {
                this.name = field && field.name || "";
                this.icon = field && field.icon || "";
                this.hasBadge = (field && typeof field.hasBadge !== "undefined") ? field.hasBadge : false;
                this.countBadge = field && field.countBadge || 0;
                this.state = field && field.state || "";
            }
            return Menuitem;
        })();
        models.Menuitem = Menuitem;

        var ListMenuitem = (function () {
            function ListMenuitem(listOfMenuitem) {
                this.list = [];
                if (listOfMenuitem && listOfMenuitem.list) {
                    this.addList(listOfMenuitem.list);
                } else if (listOfMenuitem) {
                    this.addList(listOfMenuitem);
                }
            }
            ListMenuitem.prototype.clear = function () {
                this.list = [];
            };
            ListMenuitem.prototype.exist = function (item) {
                var result = -1;
                var test = JSON.stringify(new Menuitem(item));

                for (var i = 0; i < this.list.length; i++) {
                    if (test === JSON.stringify(this.list[i])) {
                        result = i;
                        break;
                    }
                }
                return result;
            };
            ListMenuitem.prototype.existID = function (name) {
                var result = -1;
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].name === name) {
                        result = i;
                        break;
                    }
                }
                return result;
            };
            ListMenuitem.prototype.getID = function (name) {
                var idx = this.existID(name);
                if (idx > -1) {
                    return this.list[idx];
                } else {
                    return null;
                }
            };
            ListMenuitem.prototype.getCopyID = function (name) {
                return this.getCopyItem(this.getID(name));
            };
            ListMenuitem.prototype.delID = function (name) {
                return this.delIndex(this.existID(name));
            };
            ListMenuitem.prototype.updID = function (name, newItem) {
                return this.updIndex(this.existID(name), newItem);
            };
            ListMenuitem.prototype.addItem = function (item) {
                var result;
                var doExists = false;
                if (!doExists && this.existID(item.name) > -1) {
                    doExists = true;
                }
                if (!doExists) {
                    this.list.push(new Menuitem(item));
                    result = this.list[this.list.length - 1];
                }
                return result;
            };
            ListMenuitem.prototype.addOrUpdItem = function (item) {
                var result = this.addItem(item);
                if (!result) {
                    var idx = this.existID(item.name);
                    this.updIndex(idx, item);
                    result = this.list[idx];
                }
                return result;
            };
            ListMenuitem.prototype.add = function (name) {
                return this.addItem(new Menuitem({ name: name }));
            };
            ListMenuitem.prototype.addList = function (itemList) {
                var _this = this;
                itemList.forEach(function (el) {
                    _this.addItem(el);
                });
            };
            ListMenuitem.prototype.delIndex = function (idx) {
                var deleted = false;
                if (idx >= 0 && idx < this.list.length) {
                    this.list.splice(idx, 1);
                    deleted = true;
                }
                return deleted;
            };
            ListMenuitem.prototype.delItem = function (item) {
                return this.delIndex(this.exist(item));
            };
            ListMenuitem.prototype.updIndex = function (idx, newItem) {
                var updated = false;
                if (idx >= 0 && idx < this.list.length) {
                    this.list[idx] = newItem;
                    updated = true;
                }
                return updated;
            };
            ListMenuitem.prototype.updItem = function (oldItem, newItem) {
                return this.updIndex(this.exist(oldItem), newItem);
            };
            ListMenuitem.prototype.getIndex = function (idx) {
                var result;
                if (idx >= 0 && idx < this.list.length) {
                    result = this.list[idx];
                }
                return result;
            };
            ListMenuitem.prototype.getByFieldname = function (fieldname, searchvalue) {
                var _this = this;
                var result;
                var found = false;
                for (var i = 0; i < this.list.length; i++) {
                    Object.getOwnPropertyNames(this.list[i]).forEach(function (el) {
                        if (fieldname === el && searchvalue == _this.list[i][el]) {
                            found = true;
                        }
                        if (el === fieldname.split('.')[0] && typeof _this.list[i][el] === 'object') {
                            Object.getOwnPropertyNames(_this.list[i][el]).forEach(function (el2) {
                                if (fieldname.split('.')[1] === el2 && searchvalue == _this.list[i][el][el2]) {
                                    found = true;
                                }
                            });
                        }
                    });
                    if (found) {
                        result = this.list[i];
                        break;
                    }
                }
                ;
                return result;
            };
            ListMenuitem.prototype.getCopyItem = function (item) {
                return JSON.parse(JSON.stringify(item));
            };
            ListMenuitem.prototype.getCopyIndex = function (idx) {
                return this.getCopyItem(this.getIndex(idx));
            };
            ListMenuitem.prototype.getList = function () {
                return this.list;
            };
            ListMenuitem.prototype.getCopyList = function () {
                return JSON.parse(JSON.stringify(this.list));
            };
            ListMenuitem.prototype.getListByFieldname = function (fieldname, searchvalue) {
                var result = [];
                this.list.forEach(function (el) {
                    Object.getOwnPropertyNames(el).forEach(function (name) {
                        if (fieldname === name && searchvalue == el[name]) {
                            result.push(el);
                        }
                        if (fieldname.indexOf('.') > -1 && name === fieldname.split('.')[0] && typeof el === 'object') {
                            Object.getOwnPropertyNames(el[name]).forEach(function (name2) {
                                if (fieldname.split('.')[1] === name2 && searchvalue == el[name][name2]) {
                                    result.push(el);
                                }
                            });
                        }
                    });
                });
                return result;
            };
            ListMenuitem.prototype.getCopyListByFieldname = function (fieldname, searchvalue) {
                return JSON.parse(JSON.stringify(this.getListByFieldname(fieldname, searchvalue)));
            };
            ListMenuitem.prototype.getAsObjectList = function (fieldname1, fieldname2) {
                var result = {};
                var field1Value;
                var field2Value;
                this.list.forEach(function (el) {
                    field1Value = '';
                    field2Value = '';
                    Object.getOwnPropertyNames(el).forEach(function (name) {
                        if (fieldname1 === name) {
                            field1Value = el[name];
                        }
                        if (fieldname2 === name) {
                            field2Value = el[name];
                        }
                    });
                    if (field1Value && field2Value) {
                        result[field1Value] = field2Value;
                    }
                });
                return result;
            };
            ListMenuitem.getObjectValue = function (obj, name) {
                var result = null;
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    if (name === el) {
                        result = obj[el];
                    }
                });
                return result;
            };
            ListMenuitem.setObjectValue = function (obj, name, value) {
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    if (name === el) {
                        obj[el] = value;
                    }
                });
            };
            ListMenuitem.prototype.assignFieldValues = function (item, fromfield, tofield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = '';
                if (fromfield && tofield && item) {
                    fromfield.forEach(function (field, idx) {
                        if (idx > 0 && separator) {
                            value += separator;
                        }
                        value += ListMenuitem.getObjectValue(item, field);
                    });
                    if (value) {
                        ListMenuitem.setObjectValue(item, tofield, value);
                    }
                }
            };
            ListMenuitem.prototype.assignListFieldValues = function (fromfield, tofield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignFieldValues(el, fromfield, tofield, separator);
                });
            };
            ListMenuitem.prototype.assignObjectByName = function (item, tofield, singleObj, fromfield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = '';
                if (fromfield && tofield && item && singleObj && typeof singleObj === 'object') {
                    fromfield.forEach(function (field, idx) {
                        if (idx > 0 && separator) {
                            value += separator;
                        }
                        value += ListMenuitem.getObjectValue(singleObj, field);
                    });
                    if (value) {
                        ListMenuitem.setObjectValue(item, tofield, value);
                    }
                }
            };
            ListMenuitem.prototype.assignListObjectByName = function (tofield, singleObj, fromfield, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignObjectByName(el, tofield, singleObj, fromfield, separator);
                });
            };
            ListMenuitem.prototype.assignObjectByValue = function (item, searchfield, tofield, singleObj, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var value = null;
                if (searchfield && tofield && item && singleObj && typeof singleObj === 'object') {
                    value = ListMenuitem.getObjectValue(item, searchfield);
                    if (value) {
                        if (separator && value.indexOf(separator) > -1) {
                            value = value.replace(separator, '');
                        }
                        value = ListMenuitem.getObjectValue(singleObj, value);
                        if (value) {
                            ListMenuitem.setObjectValue(item, tofield, value);
                        }
                    }
                }
            };
            ListMenuitem.prototype.assignListObjectByValue = function (searchfield, tofield, singleObj, separator) {
                if (typeof separator === "undefined") { separator = null; }
                var _this = this;
                this.list.forEach(function (el) {
                    _this.assignObjectByValue(el, searchfield, tofield, singleObj, separator);
                });
            };
            return ListMenuitem;
        })();
        models.ListMenuitem = ListMenuitem;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));

'use strict';
var app;
(function (app) {
    var models;
    (function (models) {
        var Stamp = (function () {
            function Stamp(field) {
                this.location = field && field.location || "";
                this.stamp1 = field && field.stamp1 || "";
                this.stamp2 = field && field.stamp2 || "";
                this.stamp3 = field && field.stamp3 || "";
                this.stamp4 = field && field.stamp4 || "";
                this.stamp5 = field && field.stamp5 || "";
                this.standard = field && field.standard || 0;
                this.ev_auto = (field && typeof field.ev_auto !== "undefined") ? field.ev_auto : false;
            }
            return Stamp;
        })();
        models.Stamp = Stamp;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

var app;
(function (app) {
    (function (models) {
        'use strict';

        

        var User = (function () {
            function User(field) {
                this.isLogin = (field && typeof field.isLogin !== "undefined") ? field.isLogin : false;
                this.name = field && field.name || 0;
                this.pw = field && field.pw || "";
                this.pin = field && field.pin || 1234;
            }
            return User;
        })();
        models.User = User;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));

'use strict';
var app;
(function (app) {
    var models_wrapper;
    (function (models_wrapper) {
        var model;
        (function (model) {
            model.Blankoformular = app.models.Blankoformular;
            model.BlankoformularList = app.models.ListBlankoformular;
            model.Clientformular = app.models.Clientformular;
            model.ClientformularList = app.models.ListClientformular;
            model.Countries = app.models.Countries;
            model.CountriesList = app.models.ListCountries;
            model.Formularfield = app.models.Formularfield;
            model.FormularfieldList = app.models.ListFormularfield;
            model.Formularfieldset = app.models.Formularfieldset;
            model.FormularfieldsetList = app.models.ListFormularfieldset;
            model.Formularsign = app.models.Formularsign;
            model.FormularsignList = app.models.ListFormularsign;
            model.Menu = app.models.Menu;
            model.MenuList = app.models.ListMenu;
            model.Menuitem = app.models.Menuitem;
            model.MenuitemList = app.models.ListMenuitem;
            model.Stamp = app.models.Stamp;
            model.User = app.models.User;
        })(model = models_wrapper.model || (models_wrapper.model = {}));
        function getModelByName(name) {
            switch (name.toLowerCase()) {
                case 'blankoformular':
                    return model.Blankoformular;
                    break;
                case 'blankoformularlist':
                    return model.BlankoformularList;
                    break;
                case 'clientformular':
                    return model.Clientformular;
                    break;
                case 'clientformularlist':
                    return model.ClientformularList;
                    break;
                case 'countries':
                    return model.Countries;
                    break;
                case 'countrieslist':
                    return model.CountriesList;
                    break;
                case 'formularfield':
                    return model.Formularfield;
                    break;
                case 'formularfieldlist':
                    return model.FormularfieldList;
                    break;
                case 'formularfieldset':
                    return model.Formularfieldset;
                    break;
                case 'formularfieldsetlist':
                    return model.FormularfieldsetList;
                    break;
                case 'formularsign':
                    return model.Formularsign;
                    break;
                case 'formularsignlist':
                    return model.FormularsignList;
                    break;
                case 'menu':
                    return model.Menu;
                    break;
                case 'menulist':
                    return model.MenuList;
                    break;
                case 'menuitem':
                    return model.Menuitem;
                    break;
                case 'menuitemlist':
                    return model.MenuitemList;
                    break;
                case 'stamp':
                    return model.Stamp;
                    break;
                case 'user':
                    return model.User;
                    break;
                default:
                    return null;
                    break;
            }
        }
        models_wrapper.getModelByName = getModelByName;
    })(models_wrapper = app.models_wrapper || (app.models_wrapper = {}));
})(app || (app = {}));
