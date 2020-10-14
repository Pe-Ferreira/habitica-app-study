let app = angular.module("app", []);
app.controller('tasksController', ($scope, $http) => {
    const xClient = 'ac6f6aee-ee28-469d-a84d-ebf5aeea7ea2-HabiticaAppStudy';
    const userId = 'ac6f6aee-ee28-469d-a84d-ebf5aeea7ea2';
    const apiKey = '252a11ff-1f3a-4416-8361-fcad31896d29';

    $http({
        method: 'GET',
        url: 'https://habitica.com/api/v3/tasks/user',
        headers: {
            'x-client': xClient,
            'x-api-user': userId,
            'x-api-key': apiKey
        }
    }).then((res) => {
        let userDailies = [];
        if (res.data.data.length >= 1) {
            res.data.data.forEach((task) => {
                task.type === 'daily' ? userDailies.push({
                    name: task.text,
                    score: task.value
                }) : '';
            });
        }
        userDailies = setCssClasses(userDailies);
        console.log(userDailies)
        $scope.dailies = userDailies;
    }, (res) => {
        alert("Error. Somenthing bad happenned with the Habitica's API.");
    });

    function setCssClasses(dailies) {
        dailies.forEach((daily) => {
            if (daily.score < 0) {
                daily.cssClass = 'bad-score';
            } else if (daily.score > 0 && daily.score < 10) {
                daily.cssClass = 'regular-score';
            } else if (daily.score > 10 && daily.score < 20) {
                daily.cssClass = 'good-score';
            } else if (daily.score > 20) {
                daily.cssClass = 'high-score';
            }
        });
        return dailies;
    };
});