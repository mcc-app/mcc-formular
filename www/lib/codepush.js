
var cp = {

    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        // Migrate data from older versions
        window.codePush.getCurrentPackage(function (currentPackage) {
            // getCurrentPackage returns null if no update was installed (app store version)
            if (currentPackage && currentPackage.isFirstRun) {
                // First run after an update, migrate data
                if (currentPackage.appVersion === "1.0.0") {
                    // migrate data from store version to version 1.0.0
                } else if (currentPackage.appVersion === "2.0.0") {
                    // migrate data to version 2.0.0
                }
            }
            
            // continue application initialization
            cp.receivedEvent('deviceready');
            
            // Wait for 5s after the application started and check for updates.
            setTimeout(cp.checkAndInstallUpdates, 5000);
            
            // Notify the plugin that update succeeded.
            window.codePush.notifyApplicationReady();

        }, cp.getErrorHandler("Error while retrieving the current package."));
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        /*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        */

        console.log('Received Event: ' + id);
    },
    // Uses the CodePush service configured in config.xml to check for updates, prompt the user and install them.
    checkAndInstallUpdates: function () {
        
        // Check the CodePush server for updates.
        console.log("Checking for updates...");
        window.codePush.checkForUpdate(cp.checkSuccess, cp.getErrorHandler("Checking for update failed."));
    },
    // Called after the CodePush server responded the checkForUpdate call
    checkSuccess: function (remotePackage) {
        if (!remotePackage) {
            // A null remotePackage means that the server successfully responded, but there is no update available.
            console.log("The application is up to date.");
        }
        else {
            console.log("There is an update available. Remote package:" + JSON.stringify(remotePackage));
                
            // Called after the user confirmed or canceled the update 
            function onConfirm(buttonIndex) {
                switch (buttonIndex) {
                    case 1:
                        /* Install */
                        console.log("Downloading package...");
                        remotePackage.download(cp.onDownloadSuccess, cp.getErrorHandler("Downloading the update package failed."));
                        break;
                    case 2:
                        /* Cancel */
                        /* nothing to do */
                        break;
                }
            }

            // Ask the user if they want to download and install the update
            navigator.notification.confirm(
                'Ein Update ist verfügbar. möchten Sie es jetzt installieren?',
                onConfirm,
                'Update'
                ['Installieren', 'Abbruch']);
        }
    },
    // Called after an update package was downloaded sucessfully.
    onDownloadSuccess: function (localPackage) {
        console.log("Local package downloaded. Local package: " + localPackage.localPath);

        var installCallback = function () {
            console.log("Install succeeded");
        };

        console.log("Installing package...");
        localPackage.install(installCallback, cp.getErrorHandler("Installation failed."), { installMode: InstallMode.IMMEDIATE });
    },
    // Returns an error handler that logs the error to the console and displays a notification containing the error message.
    getErrorHandler: function (message) {
        // Displays a dialog containing a message.
        var displayErrorMessage = function (message) {
            navigator.notification.alert(
                message,
                null,
                'CodePush',
                'OK');
        };

        return function (error) {
            console.log(message + ":" + error.message);
            displayErrorMessage(message + ":" + error.message);
        }
    }
};

