import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import foodImage from '../../Images/food.jpg';
import './RestaurantCard.css';

const RestaurantCard = (props) => {
    const { Name, Area, cuisine, Opening_hours, Closing_hours, url } = props.data;

    return (
        // <div id = "RestaurantCard" className="relative flex ba bw1 br4 shadow-5 ma3 pa3 bg-washed-red">
        //     <div className='flex flex-column w-80'>
        //         <h1 className = 'f3 black'>
        //                 <Link to={`/restaurants/${url}`}>
        //                     {Name}
        //                 </Link>
        //         </h1>
        //         <div><b>Cuisine: </b>{cuisine}</div>
        //         <div><b>Area: </b>{Area}</div>
        //         <div><b>Operating Hours: </b>{Opening_hours} to {Closing_hours}</div>
        //         {/* <div><b>Price: </b>{price}</div> */}
        //     </div>
        //     <div className = 'w-20 flex items-center justify-center'>
        //         <Button className = ''>Book Now</Button>
        //     </div>
        // </div>
        <Card className = 'ResCard'>
            <Image src={foodImage} wrapped ui={false} />
            <Card.Content>
                <Card.Header className = 'NameHeader'>
                    <Link to={`/restaurants/${url}`}>
                        {Name}
                    </Link>
                </Card.Header>
                
                <div>
                    <Card.Meta>
                        <span>Cuisine: {cuisine}</span>
                    </Card.Meta>
                    <Card.Meta>
                        <span>Area: {Area}</span>
                    </Card.Meta>
                </div>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='clock' />
                    Operating Hours: {Opening_hours} to {Closing_hours}
                </a>
            </Card.Content>
        </Card>
    )
}

export default RestaurantCard;