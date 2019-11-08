import React from 'react';
import { Button } from 'semantic-ui-react';

const LoadMoreButton = ({ loadMore }) => {
    return (
        <div className='flex justify-center relative mb4'>
            <Button
                onClick={() => loadMore()}
                size='large' className='w-40 f5 button'>
                See More
            </Button>
        </div>
    );
}

export default LoadMoreButton;