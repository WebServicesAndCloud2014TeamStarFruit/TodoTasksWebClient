/// <reference path="../../scripts/typings/toastr/toastr.d.ts" />
interface INotificationService {
	addError: (message: string, title?: string) => void;
	addWarning: (message: string, title?: string) => void;
	addInfo: (message: string, title?: string) => void;
}

App.service("notificationService", () => {
	toastr.options.positionClass = "toast-top-full-width";
	var notificationService: INotificationService = {
		addError: (message: string, title: string = null) => {
			toastr.error(message, title);
		},
		addWarning: (message: string, title: string = null) => {
			toastr.warning(message, title);
		},
		addInfo: (message: string, title: string = null) => {
			toastr.info(message, title);
		}
	};

	return notificationService;
}); 