import React from 'react';
import LoadMoreButton from '../Button/LoadMoreButton';
import RestaurantCard from '../Cards/RestaurantCard';
import './RestaurantDisplayBulletin.css';
import Loading from '../Loaders/Loading';

const RestaurantDisplayBulletin = ({ loading, resDisplay, visibleItemsNum, totalLength, loadMore }) => {
    return (loading
        ? <Loading />
        : <div>
            <div id='RDB'>
                {resDisplay.slice(0, visibleItemsNum).map((data) => {
                    return <RestaurantCard
                        data={data}
                        key={data.name + data.area} />
                })}
            </div>

            {visibleItemsNum < totalLength &&
                <LoadMoreButton loadMore={loadMore} />
            }
        </div>
    );
};

export default RestaurantDisplayBulletin;