import React from 'react'
import HeaderTemplate from "../template/front/header/header";
import {Route,Redirect, Switch} from "react-router-dom";
import PitchIndex from "../Pitch/Index";
import PitchCreate from "../Pitch/create/Create";
import {Layout} from "antd";
import UserProfile from "../ProfilePage/UserProfile.component";
import GetCategoryPitches from "../helpers/GetPitchCategories/GetPitchCategories.component";
import PitchesFromCategory from "../Comment/Category/PitchesFromCategory.component";
import {useSelector} from "react-redux";
import PublicHomepage from "./PublicHomepage";
import PageNotFound from "../../Pages/PageNotFound/PageNotFound";
const { Content, Footer } = Layout;

const AuthHomepage = ({currentUser})=>{
    const  user = useSelector(state=>state.user.currentUser)

    return (
        <Layout className="layout">
            <HeaderTemplate/>
            <Switch>
                    <Route exact path={'/profile/:user_id'} render={()=>
                        <div className="container">
                            <UserProfile/>
                        </div>}/>
            <Content style={{ padding: '50px' }}>
                <div className="row m-auto">
                    <div className="col-sm-3">
                        <div className="card">
                            <div className="card-header">
                                <p className="h4">Categories</p>
                            </div>
                            <div className="card-body">
                                <GetCategoryPitches/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                            <Route exact path={'/'} render={()=><PitchIndex/>}/>
                            <Route exact path={'/create'} render={()=><PitchCreate/>}/>
                            <Route exact path={'/categories/:category_id'} render={()=><PitchesFromCategory/>}/>

                    </div>
                    <div className="col-sm-3">

                    </div>
                </div>
            </Content>

            </Switch>
            <Footer style={{ textAlign: 'center' }}>One Minute Pitch ©2020 Created by <a href="https://linkedin.com/in/lenomosh" target={'_blank'}>Lennox Omondi</a></Footer>
        </Layout>
    )
}
export default AuthHomepage
