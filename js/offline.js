(function () {
    'use strict';

    //Setelah DOM Loaded
    document.addEventListener('DOMContentLoaded', function (event) {
        //Di loading awal mengecek konektivitas
        if (!navigator.onLine) {
            updateNetworkStatus();
        }

        window.addEventListener('online', updateNetworkStatus, false);
        window.addEventListener('offline', updateNetworkStatus, false);
    });

    //Mutakhirkan status network
    function updateNetworkStatus() {
        if (navigator.onLine) {
            console.log('online..');
        } else {
            console.log('offline..');
        }
    }
})();