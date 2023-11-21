import React from 'react';
import Title from '../Pages/Title'; 

const VisionSection = () => {
    return (
        <section className='vision'>
        <div className='vision__box'>
            <Title
            titleText={"Visão"}
            clor='white'
            additionalClass='vision_title'/>

            <p className='vision_-text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime repellat in molestiae
             quisquam sed, iure voluptas. 
            Molestias illo quo amet itaque, cupiditate ipsum consectetur, iste impedit praesentium, fugit laborum autem?</p>
        </div>
        </section>
    );
};

export default VisionSection;