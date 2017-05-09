/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = angular.module("pomodoro", []);
app.controller("mainCtrl", function ($scope, $interval) {
    $scope.sessionName = "SESSION";
    $scope.sessionLength = 25;
    $scope.breakLength = 5;
    $scope.timeLeft = $scope.sessionLength;
    var run = false;
    var secs = 60 * $scope.timeLeft;
    var running;

    function secsToHms(secs) {
        secs = Number(secs);
        var h = Math.floor(secs / 3600);
        var m = Math.floor(secs % 3600 / 60);
        var s = Math.floor(secs % 3600 % 60);
        return (h > 0 ? h + ":" : "") + ((m < 10 ? "0" : "") + m + ":") + ((s < 10 ? "0" : "") + s);
    }

    $scope.sessionLengthChange = function (min) {
        if (!run || $scope.sessionName === "BREAK") {
            $scope.sessionLength += min;
            if ($scope.sessionLength < 1) {
                $scope.sessionLength = 1;
            }
            if ($scope.sessionName === "SESSION") {
                $scope.timeLeft = $scope.sessionLength;
                secs = 60 * $scope.timeLeft;
            }

        }
    };
    $scope.breakLengthChange = function (min) {
        if (!run || $scope.sessionName === "SESSION") {
            $scope.breakLength += min;
            if ($scope.breakLength < 1) {
                $scope.breakLength = 1;
            }
            if ($scope.sessionName === "BREAK") {
                $scope.timeLeft = $scope.breakLength;
                secs = 60 * $scope.timeLeft;
            }


        }
    };
    $scope.toggleTimer = function () {
        if (!run) {
            run = true;
            running = $interval(updateTimer, 1000);
        } else {
            $interval.cancel(running);
            run = false;
        }
    };

    function updateTimer() {
        secs -= 1;
        if (secs >= 0) {
            $scope.timeLeft = secsToHms(secs);
            if (secs === 0) {
                var wav = "http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3";
                var audio = new Audio(wav);
                audio.play();
            }
        } else {
            if ($scope.sessionName === "BREAK") {
                $scope.sessionName = "SESSION";
                $("#timer").addClass("timer_session");
                $("#timer").removeClass("timer_break");
                $scope.timeLeft = $scope.sessionLength;
                secs = 60 * $scope.timeLeft;
            } else {
                $scope.sessionName = "BREAK";
                $("#timer").addClass("timer_break");
                $("#timer").removeClass("timer_session");
                $scope.timeLeft = $scope.breakLength;
                secs = 60 * $scope.timeLeft;
            }
        }
    }

});