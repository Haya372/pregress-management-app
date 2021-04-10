const tasks = {
    "進行中": [
        {
            id : "task1",
            task: "Task1 Example",
            state: "進行中",
            created_at: new Date(),
            updated_at: new Date(),
            ploblems: [
                "subtask1", "subtask2", "subtask3"
            ]
        },
        {
            id : "task2",
            task: "Task2 Example",
            state: "進行中",
            created_at: new Date(),
            updated_at: new Date(),
            ploblems: [
                "subtask1", "subtask2", "subtask3"
            ]
        },
        {
            id : "task3",
            task: "Task3 Example",
            state: "進行中",
            created_at: new Date(),
            updated_at: new Date(),
            ploblems: [
                "subtask1", "subtask2", "subtask3"
            ]
        },
    ],
    "保留": [
        {
            id : "task1",
            task: "Task1 Example",
            state: "保留",
            created_at: new Date(),
            updated_at: new Date(),
            ploblems: [
                "subtask1", "subtask2", "subtask3"
            ]
        },
        {
            id : "task2",
            task: "Task2 Example",
            state: "保留",
            created_at: new Date(),
            updated_at: new Date(),
            ploblems: [
                "subtask1", "subtask2", "subtask3"
            ]
        },
    ],
    "終了済み": [
        {
            id : "task1",
            task: "Task1 Example",
            state: "終了済み",
            created_at: new Date(),
            updated_at: new Date(),
            ploblems: [
                "subtask1", "subtask2", "subtask3"
            ]
        },
    ]
};


const problems = [
    {
        id : "problem1",
        problem: "Problem1 Example",
        solved: false,
        created_at: new Date(),
        updated_at: new Date(),
        memos: [
            "memo1", "memo2", "memo3"
        ]
    },
    {
        id : "problem2",
        problem: "Problem2 Example",
        solved: false,
        created_at: new Date(),
        updated_at: new Date(),
        memos: [
            "memo1", "memo2", "memo3"
        ]
    },
    {
        id : "problem3",
        problem: "Problem3 Example",
        solved: true,
        created_at: new Date(),
        updated_at: new Date(),
        memos: [
            "memo1", "memo2", "memo3"
        ]
    },
];

const memos = [
    {
        id: "memo1",
        memo: "Memo1 sample",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: "memo2",
        memo: "Memo2 sample",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: "memo3",
        memo: "Memo3 sample",
        created_at: new Date(),
        updated_at: new Date(),
    },
]

module.exports = {
    tasks,
    problems,
    memos
};