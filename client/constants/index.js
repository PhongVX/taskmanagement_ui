//export const API_URL = process.env.API_URL || ''
export const API_URL = 'http://localhost:8585'

export const URL = { 
    login:'/#/login'
}

export const WARNING_TYPE = { 
    success:'success',
    error:'error'
}

export const TEXT = {
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
