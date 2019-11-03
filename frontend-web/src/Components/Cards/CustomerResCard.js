import React, { Component } from 'react';
import { Icon, Image } from 'semantic-ui-react';
import foodImage from '../../Images/food.jpg';
import RateModal from '../Modals/RateModal'
import DeleteModal from '../Modals/DeleteModal'
import './CustomerResCard.css';

class CustomerResCard extends Component{
    constructor() {
        super();
        this.state = {
            clicked: false,
            authFailed: false,
        }
    }

    render() {

        const {data, isCurrent} = this.props;
        const { Name, Area, DateTime , Pax } = data;

        // const currentDate = new Date(); 
        
        // if (currentDate.getTime > new Date(DateTime).getTime) {
        //     this.setState({isPast: true});
        // } else {
        //     this.setState({isPast: false});
        // }
        // console.log(isPast)

        return (
            <div class="ui card" id='ResvCard'>
                <Image
                    fluid
                    src={foodImage}
                    alt="Error" className="w-100" id="cardImage"
                />
                <div class="NameHeader"> {Name} </div>
                <div class="content">
                    <div class="meta"> Area: {Area} </div>
                </div>                           
                <div class="extra content">
                    <Icon name='clock' /> 
                    
                    {/* Date and time of the booking */}
                </div> 
                { isCurrent
                        ? <DeleteModal /> 
                        : <RateModal />
                }
            </div>
        )
    }
}

export default CustomerResCard;