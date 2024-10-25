import Cookies from "js-cookie";
import { createContext, useState } from "react";
import { TOKEN } from "../../constants";
import PropTypes from 'prop-types'

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const token = Cookies.get(TOKEN);
    const [isAuth, setIsAuth]  = useState(Boolean(token));
    const state = {isAuth , setIsAuth};
    return <AuthContext.Provider value={state} >
        {children}
    </AuthContext.Provider>
}

AuthContextProvider.prototype  = {
    children: PropTypes.node
}

export default AuthContextProvider;