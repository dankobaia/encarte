import React from "react";
import LoadingOverlay from 'react-loading-overlay';


export const Loading = (props) => (
    <LoadingOverlay
    {...props}
    styles={{
        overlay: (base) => ({
          ...base,
          background: 'rgba(100, 100, 100, 0.3)'
        })
      }}
    >
    {props.children}
    </LoadingOverlay>
);
