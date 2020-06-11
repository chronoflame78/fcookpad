import React, { Component } from "react";
import '../css/Section.css';
import axios from "axios";

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            itemsToShow: 4
        }
        this.showMore = this.showMore.bind(this);
    }

    getFormattedDate(date) {
        var today = new Date(date);
        return today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    }

    showMore() {
        this.state.itemsToShow === 4 ? (
          this.setState({ itemsToShow: 8 })
        ) : (
          this.setState({ itemsToShow: 4})
        )
      }

    componentDidMount() {
        this.mounted = true;
        axios.get("http://3.133.113.96:2000/api/home/" + this.props.tail).then(res => {
            if (this.mounted) {
                this.setState({
                    posts: res.data.data.posts,
                });
            }
        }).catch(error => {
            console.log(error);
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        var topFourPosts = [];
        if (this.state.posts.length > 4) {
            topFourPosts = this.state.posts.slice(0, this.state.itemsToShow);
        }
        return (
            <div className="container container-max-custom">
                <div className="row section-title">{this.props.sectionName}</div>
                <div className="row">
                    {topFourPosts && topFourPosts.map((x, index) => (
                        <div key={index} className="col-sm-6 col-md-3 p-4">
                            <div className="item-cover" style={{backgroundImage: "url("+x.images[0]+")"}}></div>
                            <div className="item-title">{x.title}</div>
                            <div className="item-author-name">{x.author_name}</div>
                            <div><i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <span className="item-date"> {this.getFormattedDate(x.datetime)}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row see-more" onClick={this.showMore} >
                    {this.state.itemsToShow===4 && "Xem thêm"}
                    {this.state.itemsToShow!==4 && "Thu gọn"}
                    </div>
            </div>

        );
    }
}

export default Section;