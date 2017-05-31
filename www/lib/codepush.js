/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


function syncStatus(status) {
    switch (status) {
        
        case SyncStatus.UP_TO_DATE:
            alert("UP_TO_DATE ccc");
            // Show "downloading" modal
            break;
        case SyncStatus.UPDATE_INSTALLED:
            alert("UPDATE_INSTALLED");
            // Hide "downloading" modal
            break;
        case SyncStatus.UPDATE_IGNORED:
            alert("UPDATE_IGNORED");
            // Show "downloading" modal
            break;
        case SyncStatus.ERROR:
            alert("ERROR");
            // Hide "downloading" modal
            break;
        case SyncStatus.IN_PROGRESS:
            // Show "downloading" modal
            alert("IN_PROGRESS");
            break;
        case SyncStatus.CHECKING_FOR_UPDATE:
            alert("CHECKING_FOR_UPDATE ccc");
            // Hide "downloading" modal
            break;
        case SyncStatus.AWAITING_USER_ACTION:
            alert("AWAITING_USER_ACTION");
            // Show "downloading" modal
            break;
        case SyncStatus.DOWNLOADING_PACKAGE:
            alert("DOWNLOADING_PACKAGE");
            // Show "downloading" modal
            break;
        case SyncStatus.INSTALLING_UPDATE:
            // Hide "downloading" modal
            alert("INSTALLING_UPDATE");
            break;
    }
}

function downloadProgress(d) {
    if (d) {

        document.getElementById("bytes").innerHTML = ((d.receivedBytes / d.totalBytes) * 100).toFixed(2) + "%";
        // Update "downloading" modal with current download %
        //console.log("Downloading " + downloadProgress.receivedBytes + " of " + downloadProgress.totalBytes);
    }
}


var app2 = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {

        try {
            codePush.sync(syncStatus, null, downloadProgress);
        }
        catch (err) {
            alert(err.message)
        }

        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};