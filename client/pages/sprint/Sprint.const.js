export const TEXT = {
    title:"Sprints",
    searchUserID:'UserID...',
    button:{
        createSprint:'Create Sprint'
    }
}

export const COLUMNS = [
    // { name: 'id', title: 'ID' },
    { name: 'title', title: 'Title' },
    { name: 'description', title: 'Description' },
    { name: 'status', title: 'Status' },
    { name: 'created_at', title: 'Create At' },
    { name: 'updated_at', title: 'Update At' },
    { name: 'action', title:' '}
];

export const COLUMN_EXTENSIONS = [
    { columnName: 'title', width:300, editingEnabled: true},
    { columnName: 'description',  width:600, editingEnabled: true },
    { columnName: 'status',  width:100, editingEnabled: false},
    { columnName: 'created_at',  width:300, editingEnabled: false },
    { columnName: 'updated_at',  width:300, editingEnabled: false },
    { columnName: 'action',  width:40, editingEnabled: false },
]