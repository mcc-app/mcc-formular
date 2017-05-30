var app;
(function (app) {
    (function (datas) {
        datas.countries = [
            {
                name: 'Deutschland',
                code: 'DE'
            },
            {
                name: 'Schweiz',
                code: 'CH'
            }
        ];

        datas.menu = [
            {
                "name": "MCC-FORMULARE",
                "icon": "ion-compose",
                "hasBadge": false,
                "countBadge": 0,
                "items": {
                    "list": [
                        {
                            "name": "angeforderte Formulare",
                            "icon": "ion-ios7-arrow-right",
                            "hasBadge": true,
                            "countBadge": 0,
                            "state": "formular"
                        },
                        {
                            "name": "standard Formulare",
                            "icon": "ion-ios7-arrow-right",
                            "hasBadge": false,
                            "countBadge": 0,
                            "state": "standard"
                        },
                        {
                            "name": "blanko Formulare",
                            "icon": "ion-ios7-arrow-right",
                            "hasBadge": false,
                            "countBadge": 0,
                            "state": "blanko"
                        }
                    ]
                }
            },
            {
                "name": "BENUTZER",
                "icon": "ion-person",
                "hasBadge": false,
                "countBadge": 0,
                "items": {
                    "list": [
                        {
                            "name": "Einstellungen",
                            "icon": "ion-ios7-arrow-right",
                            "hasBadge": false,
                            "countBadge": 0,
                            "state": "setting"
                        },
                        {
                            "name": "Abmelden",
                            "icon": "ion-ios7-arrow-right",
                            "hasBadge": false,
                            "countBadge": 0,
                            "state": "logout"
                        }
                    ]
                }
            },
            {
                "name": "MCC-DIREKT",
                "icon": "ion-home",
                "hasBadge": false,
                "countBadge": 0,
                "items": {
                    "list": [
                        {
                            "name": "Kontakt",
                            "icon": "ion-ios7-arrow-right",
                            "hasBadge": false,
                            "countBadge": 0,
                            "state": "contact"
                        },
                        {
                            "name": "Hilfe",
                            "icon": "ion-ios7-arrow-right",
                            "hasBadge": false,
                            "countBadge": 0,
                            "state": "help"
                        },
                        {
                            "name": "Impressum",
                            "icon": "ion-ios7-arrow-right",
                            "hasBadge": false,
                            "countBadge": 0,
                            "state": "imprint"
                        }
                    ]
                }
            }
        ];
    })(app.datas || (app.datas = {}));
    var datas = app.datas;
})(app || (app = {}));
