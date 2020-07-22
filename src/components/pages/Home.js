import React, { Component } from "react";
import Category from '../common/Category';
import Section from '../common/Section';
import Footer from "../layout/Footer";
import { toast } from 'react-toastify';
import Loader from '../common/LoaderVer2';
import axios from "axios";

// import PropTypes from "prop-types";
// import { connect } from "react-redux";
class Home extends Component {

    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };     
    }
  
    componentDidMount() {
      localStorage.removeItem("create_id");
      localStorage.removeItem("action");
      this.mounted = true;
      axios.all([axios.get("http://178.128.83.129:3000/api/home/category"), axios.get("http://178.128.83.129:3000/api/home/post_trending"),
      axios.get("http://178.128.83.129:3000/api/home/post_new")])
            .then(axios.spread((...res) => {
                console.log(...res)
                if (this.mounted) {
                    this.setState({
                        category: res[0].data.data.categorys,
                        post_trending: res[1].data.posts,
                        post_new: res[2].data.posts,
                        loading: false
                    });
                }
            })).catch(error => {
                console.log(error)
            });

      
      if(this.props.location.state){
        var {createSuccess} = this.props.location.state;
        console.log(createSuccess);
        if(createSuccess === true){
          // swal({
          //   title: "Post created!",
          //   text: "Create successful!",
          //   icon: "success",
          //   button: "Nice!",
          // });
          toast.success('Create successfully!', {position: toast.POSITION.TOP_RIGHT});
          this.props.history.replace('', null);
        }
      }     
    }
  
    // componentWillReceiveProps(nextProps) {
    //   console.log(this.props.location.state);
    //   if(!this.props.location.state){
    //     if (nextProps.auth.isAuthenticated) {
    //       toast.success('Login successfully!', {position: toast.POSITION.TOP_RIGHT}); 
    //       this.props.history.replace('', {alerted: true});
    //     }
        
    //   }
      
    // }

    componentWillUnmount() {
      this.mounted = false;
    }
    
    render() {
      if(this.state.loading === true) return(<Loader/>)
      return(<div>
        <Category suggestions={this.state.category}/>
        <Section sectionName="TRENDING" posts={this.state.post_trending}/>
        <Section sectionName="NEW" posts={this.state.post_new}/>
        <Footer/>
      </div>);
    }
  }
  
//   Home.propTypes = {
//     auth: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//     auth: state.auth
// });

// export default connect(
//   mapStateToProps
// )(Home);

export default Home;