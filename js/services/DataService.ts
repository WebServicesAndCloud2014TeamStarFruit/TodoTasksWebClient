interface IDataService {
    serverUrl: string
}

App.service("dataService", () => {

    var dataService: IDataService = {
        serverUrl: 'http://localhost:56841'
    };

    return dataService;
}); 