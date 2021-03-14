import * as uiCommonStateConstants  from '../constants/uiCommonStateConstants'


export const openSnackbar = (data)=>{ 
    return { 
        type: uiCommonStateConstants.OPEN_SNACK_BAR,
        data
    }
}

export const closeSnackbar = ()=>{ 
    return { 
        type: uiCommonStateConstants.CLOSE_SNACK_BAR 
    }
}
