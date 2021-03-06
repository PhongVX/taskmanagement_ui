export const COLUMNS = [
    { name: 'id', title: 'ID' },
    { name: 'first_name', title: 'First Name' },
    { name: 'last_name', title: 'Last Name' },
    { name: 'user_name', title: 'User Name' },
    { name: 'email', title: 'Email' },
];

export const TEXT = {
    title:"Users",
    button: {
        cancel:'Cancel',
        ok:'Ok'
    },
    dialog:{ 
        dialogConfirmDeleteTitle:'Confirmation',
        dialogConfirmDeleteText:'Are you sure to delete this item?'
    },
    snackbar:{
        addSuccess:'Item is created successfully',
        addFail:'Create item failed',
        updateSuccess:'Item is updated successfully',
        updateFail:'Update item failed',
        deleteSuccess:'Item is deleted successfully',
        deleteFail:'Delete item failed',
    }
}

export const COLUMN_EXTENSIONS = [
    { columnName: 'id', editingEnabled: false},
    { columnName: 'first_name', editingEnabled: true },
    { columnName: 'last_name', editingEnabled: true},
    { columnName: 'user_name', editingEnabled: true },
    { columnName: 'email', editingEnabled: true }
]