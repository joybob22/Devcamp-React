import React, {Component} from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import BlogFeaturedImage from '../blog/blog-featured-image';

export default class BlogDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentId: this.props.match.params.slug,
            blogItem: {}
        }
    }

    getBlogItem() {
        axios.get(`https://braydenlemke.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`)
            .then(res => {
                this.setState({
                    blogItem: res.data.portfolio_blog
                });
            }).catch(err => {
                console.log("getBlogErr", err);
            });
    }

    componentDidMount() {
        this.getBlogItem();
    }

    render() {
        const {
            title,
            content,
            featured_image_url,
            blog_status
        } = this.state.blogItem;
        console.log(this.state.currentId);
        return (
            <div className="blog-container">
                <div className="content-container">
                    <h1>{title}</h1>
                    <BlogFeaturedImage img={featured_image_url} />
                    
                    <div className="content">{ReactHtmlParser(content)}</div>
                </div>
            </div>
        )
    }
}