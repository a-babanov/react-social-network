import React from "react"
import Preloader from "../components/Common/Preloader/Preloader"


export const withSuspense = (Component) => {

    return (props) => {
        return <React.Suspense fallback={<div>Loader... <Preloader /> </div>}> <Component {...props} /> </React.Suspense>
    }
}