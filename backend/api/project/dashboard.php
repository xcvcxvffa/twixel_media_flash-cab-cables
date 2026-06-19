<?php
/**
 * GET /api/project/dashboard-data
 * Returns static mock dashboard data (same as original MERN version)
 */
require_once __DIR__ . '/../../helpers/response.php';

setCorsHeaders();
handlePreflight();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonError('Method not allowed', 405);
}

jsonSuccess([
    'userName'  => 'Admin',
    'taskCount' => 5,
    'projectOverviewData' => [
        'chart' => [
            'daily' => [
                'onGoing' => 13,
                'finished' => 9,
                'total' => 21,
                'series' => [
                    ['name' => 'On Going', 'data' => [20, 19, 18, 14, 12, 10]],
                    ['name' => 'Finished', 'data' => [1, 4, 8, 15, 16, 18]],
                ],
                'range' => ['6:00am', '9:00am', '12:00pm', '03:00pm', '06:00pm', '09:00pm'],
            ],
            'weekly' => [
                'onGoing' => 126,
                'finished' => 87,
                'total' => 213,
                'series' => [
                    ['name' => 'On Going', 'data' => [45, 52, 68, 84, 103, 112, 126]],
                    ['name' => 'Finished', 'data' => [35, 41, 62, 62, 75, 81, 87]],
                ],
                'range' => ['21 Jan', '22 Jan', '23 Jan', '24 Jan', '25 Jan', '26 Jan', '27 Jan'],
            ],
            'monthly' => [
                'onGoing' => 270,
                'finished' => 113,
                'total' => 383,
                'series' => [
                    ['name' => 'On Going', 'data' => [28, 52, 91, 154, 227, 256, 270]],
                    ['name' => 'Finished', 'data' => [22, 31, 74, 88, 97, 107, 113]],
                ],
                'range' => ['01 Jan', '05 Jan', '10 Jan', '15 Jan', '20 Jan', '25 Jan', '27 Jan'],
            ],
        ],
    ],
    'myTasksData' => [
        [
            'taskId' => 'KCM-1393',
            'taskSubject' => 'Design sign up flow',
            'priority' => 0,
            'assignees' => [
                ['id' => '1', 'name' => 'Admin', 'email' => 'admin@flashcab.com', 'img' => '/img/avatars/thumb-1.jpg'],
            ],
        ],
        [
            'taskId' => 'KCM-2039',
            'taskSubject' => 'Update product catalog',
            'priority' => 1,
            'assignees' => [
                ['id' => '1', 'name' => 'Admin', 'email' => 'admin@flashcab.com', 'img' => '/img/avatars/thumb-1.jpg'],
            ],
        ],
    ],
    'scheduleData' => [
        ['id' => '0', 'time' => '10:00am', 'eventName' => 'Product Review',    'desciption' => 'Internal',              'type' => 'meeting'],
        ['id' => '1', 'time' => '1:00pm',  'eventName' => 'Design Discussion', 'desciption' => 'via Microsoft Teams',   'type' => 'meeting'],
        ['id' => '2', 'time' => '3:00pm',  'eventName' => 'Daily Report',      'desciption' => 'Daily task',            'type' => 'task'],
    ],
    'projectsData' => [
        [
            'id' => 1,
            'name' => 'FlashCab Website',
            'category' => 'Web Application',
            'desc' => 'Cable manufacturer website with admin panel',
            'attachmentCount' => 5,
            'totalTask' => 20,
            'completedTask' => 18,
            'progression' => 90,
            'dayleft' => 5,
            'status' => 'none',
            'member' => [
                ['name' => 'Admin', 'img' => '/img/avatars/thumb-1.jpg'],
            ],
        ],
    ],
    'activitiesData' => [
        ['type' => 'UPDATE-TICKET', 'dateTime' => time() - 3600, 'ticket' => 'PD-001', 'status' => 0, 'userName' => 'Admin', 'userImg' => ''],
    ],
]);
