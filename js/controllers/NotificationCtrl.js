/// <reference path="../../scripts/typings/toastr/toastr.d.ts" />

App.service("notificationService", function () {
    toastr.options.positionClass = "toast-top-full-width";
    var notificationService = {
        addError: function (message, title) {
            if (typeof title === "undefined") { title = null; }
            toastr.error(message, title);
        },
        addWarning: function (message, title) {
            if (typeof title === "undefined") { title = null; }
            toastr.warning(message, title);
        },
        addInfo: function (message, title) {
            if (typeof title === "undefined") { title = null; }
            toastr.info(message, title);
        }
    };

    return notificationService;
});
//# sourceMappingURL=NotificationCtrl.js.map
