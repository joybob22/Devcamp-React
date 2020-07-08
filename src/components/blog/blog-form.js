import React, { Component } from 'react';
import axios from 'axios';

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            blog_status: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    buildForm() {
        let formData = new FormData();
        formData.append("portfolio_blog[title]", this.state.title);
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);

        return formData;
    }

    handleSubmit(event) {
        axios.post("https://braydenlemke.devcamp.space/portfolio/portfolio_blogs", this.buildForm(), {withCredentials: true})
            .then(res => {
                this.props.handleSuccessfullFormSubmission(res.data.portfolio_blog);
                this.setState({
                    title: "",
                    blog_status: ""
                });
            })
            .catch(err => {
                console.log("handleSubmit for blog error", err);
            })
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
                <div className="two-column">    
                    <input onChange={this.handleChange} 
                        type="text" 
                        name="title" 
                        value={this.state.title} 
                        placeholder="Blog Title"
                        />

                    <input onChange={this.handleChange} 
                        type="text" 
                        name="blog_status" 
                        value={this.state.blog_status} 
                        placeholder="Blog Status"
                        />
                </div>

                <button className="btn">Save</button>
            </form>
        )
    }
}