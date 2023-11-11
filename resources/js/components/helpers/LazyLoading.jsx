import React from "react";

const LazyLoading = ({children}) => {
    return <React.Suspense fallback={<>...</>}>
        {children}
    </React.Suspense>
}

export default LazyLoading;