import * as uiCommonStateConstants  from '../constants/uiCommonStateConstants'

const init = {
    snackBar:{ 
        isOpenSnackBars:false, 
        noticeText:'',
        snackBarVariant:'error'
    }   
}
const uiCommonStateReducer = (state = init, action) => {
    switch (action.type) {
        case uiCommonStateConstants.OPEN_SNACK_BAR: {
            let {data} = action 
            return {
                ...state,
                snackBar: { 
                    isOpenSnackBars:true,
                    ...data
                }
            }
        }
        case uiCommonStateConstants.CLOSE_SNACK_BAR:{ 
            return {
                ...state,
                snackBar: { 
                    ...state.snackBar,
                    isOpenSnackBars:false
                }
            }
        }
        default: {
            return state
        }
    }
}
export default uiCommonStateReducer
