import React, {useRef,useEffect} from 'react';

import './Map.css'

const Map = (props)=>{
    const mapRef = useRef();

    const {center,zoom} = props

    console.log(zoom)
    console.log(center)

    const mapOptions = {
        center: center,
        zoom:zoom
    }

    useEffect(()=>{
        const map = new window.google.maps.Map(mapRef.current, mapOptions);

        new window.google.maps.Marker({position:center,map:map});
    },[center,zoom,mapOptions])



    return (
        <div ref={mapRef} className={`map ${props.className}`} style={props.style}>

        </div>
    )
}

export default Map;

//AIzaSyDKyMZU-IsiZgg422xEQJebJlmKHL2ZNZM