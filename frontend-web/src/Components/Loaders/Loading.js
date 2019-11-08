import React from 'react';
import Loader from 'react-loader-spinner'

const Loading = () => (
    <div className = 'flex justify-center'>
        <Loader type="Audio" color="#FFFFFF" height={200} width={300} />
    </div>
);

export default Loading