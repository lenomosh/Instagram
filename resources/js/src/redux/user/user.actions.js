import USER_ACTION_TYPES from "./user.action.types";

export const setCurrentUser=user=>(
    {
        type:USER_ACTION_TYPES.SET_CURRENT_USER,
        payload:user
    }
)
export const logoutCurrentUser=()=>(
    {
        type:USER_ACTION_TYPES.LOUGOUT_USER
    }
)
