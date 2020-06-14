import React,{useEffect,useState} from'react';
import {useParams} from 'react-router-dom';

import PlaceList from '../components/PlaceList'
import {useHttpClient} from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";




const UserPlaces = (props)=>{
    const userId = useParams().userId;
    const {isLoading,error,sendRequest,clearError} = useHttpClient()
    const [loadedPlaces,setLoadedPlaces] = useState()
    useEffect(()=>{
        const fetchPlaces = async ()=>{
            try{
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL+`/places/user/${userId}`)
                setLoadedPlaces(responseData.places)
            }catch(error){

            }
        };
        fetchPlaces()
    },[sendRequest,userId])

    const placeDeletedHandler = (deletedPlaceId)=>{
        setLoadedPlaces((prevPlaces)=>{
            return prevPlaces.filter((place)=> {
                return place.id !== deletedPlaceId
            })
        })
    }


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay/>
                </div>
            )}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler}/>}
        </React.Fragment>

    )
}

export default UserPlaces;