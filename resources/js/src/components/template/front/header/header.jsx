import React from 'react'
import {connect} from "react-redux";
import {logoutCurrentUser} from "../../../../redux/user/user.actions";
import {Link} from "react-router-dom";
import {Avatar} from "antd";
import apiUrls from "../../../environment";
import Popover from "antd/es/popover";
import Button from "antd/es/button";
import './header.scss';

const HeaderTemplate = ({logoutUser,currentUser}) =>{

    return(
        <div className={`row HeaderTemplate ${currentUser && 'authUser'}`}>

            <div className="col-sm-3">


                <div className="logo">
                    <p className="h4 font-italic">
                        <Link to={'/'}>
                            OMP
                        </Link>
                    </p>
                </div>

            </div>
            <div className="col-sm-6">
                {currentUser && <div className={'links-wrapper float-left text-black'}>

                    <div className="link">
                        <Link to={'/'}>Home</Link>
                    </div>

                    <div className="link">
                        <Link to={'/create'}>Post New Pitch</Link>
                    </div>

                </div>}
            </div>
            <div className="col-sm-3 user-actions">
                {currentUser?
                    <span className={'loggedInUser'} >
                                <Popover content={
                                    <div>
                                        <Button type={'link'}>
                                        <Link to={'/profile/'+currentUser.user?.id}>Profile</Link><br/>
                                        </Button>
                                    <Button className={'href'} type={'link'}   onClick={logoutUser}>Logout</Button>
                                </div>}>
                                <Avatar gap={4} size={'large'} src={apiUrls.profile_picture.read+currentUser?.user?.profile_picture?.id}/>
                                <span className={'username'}>{currentUser.user.username}</span>
                                </Popover>
                            </span>
                    :
                    <span className="loggedOutUser">
                        <div className="links-wrapper">
                            <div className="link">

                    <Link to={'/'}>Home</Link>
                            </div>
                            <div className="link">

                    <Link to={'/login'}>Login</Link>
                            </div>
                            <div className="link">
                        <Link to={'/register'}>SignUp</Link>

                            </div>

                        </div>
                    </span>
                }
            </div>

        </div>
    )
}

const mapDispatchToProps = (dispatch)=>(
    {logoutUser:()=>dispatch(logoutCurrentUser())}
)
const mapStateToProps = ({user: {currentUser}})=>({currentUser})
export default connect(mapStateToProps,mapDispatchToProps) (HeaderTemplate)
