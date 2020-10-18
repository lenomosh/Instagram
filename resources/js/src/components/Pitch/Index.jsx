import React,{useState,useEffect} from 'react'
import Axios from "axios";
import PitchRead from "./read/read";
import apiUrls, {axiosHeader} from "../environment";
import {connect} from "react-redux";
import {Spin} from "antd";
export const PitchAction = ({data,onFinishedSubmit, onErrorOccurred,access_token})=>{
    Axios.post(apiUrls.action.create,data,{
        headers:{
            ...axiosHeader,
            Authorization:`Bearer ${access_token}`
        }
    })
        .then(res =>onFinishedSubmit(res.data))
        .catch(err=>onErrorOccurred(err))
}

const PitchIndex = ({currentUser})=>{
    const [pitches, setPitches] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!pitches){
            setLoading(true)
            Axios
                .get(apiUrls.pitch.index,{
                    headers:{
                        ...axiosHeader,
                        Authorization:'Bearer '+ currentUser.access_token
                    }
                })
                .then(res=> {
                    setPitches(res.data)
                    setLoading(false)
                })
                .catch(err=> {
                    setLoading(false)
                    // console.log(err)
                })
        }
    }, );
    // console.log('Pitchtes from pitch index',pitches)

    return (
        <Spin spinning={loading} className={'pitchIndex'}>
            {pitches && pitches.map(pitch=><PitchRead key={pitch.id} pitch ={pitch}/>
            )}
        </Spin>
    )
}
const mapStateToProps =({user:{currentUser}})=>({currentUser})
export default connect(mapStateToProps)  (PitchIndex)
