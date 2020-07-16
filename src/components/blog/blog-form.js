import React, { Component } from 'react';
import axios from 'axios';
import RichTextEditor from '../forms/rich-text-editor';
import DropzoneComponent from 'react-dropzone-component';

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            title: "",
            blog_status: "",
            content: "",
            featured_image: "",
            api_url: "https://braydenlemke.devcamp.space/portfolio/portfolio_blogs",
            apiAction: "post"
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        this.featuredImageRef = React.createRef();
    }

    deleteImage(imageType) {
        axios.delete(`https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blog.id}?image_type=${imageType}`, {withCredentials: true})
            .then(res => {
                this.props.handleFeaturedImageDelete();
            })
            .catch(err => {
                console.log("deleteImageERR", err);
            })
    }

    componentWillMount() {
        if(this.props.editMode) {
            this.setState({
                id: this.props.blog.id,
                title: this.props.blog.title,
                blog_status: this.props.blog.blog_status,
                content: this.props.blog.content,
                api_url: `https://braydenlemke.devcamp.space/portfolio/portfolio_blogs/${this.props.blog.id}`,
                apiAction: "patch"
            })
        }
    }

    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    handleFeaturedImageDrop() {
        return {
            addedfile: file => this.setState({featured_image: file})
        }
    }

    handleRichTextEditorChange(content) {
        this.setState({ content })
    }

    buildForm() {
        let formData = new FormData();
        formData.append("portfolio_blog[title]", this.state.title);
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);
        formData.append("portfolio_blog[content]", this.state.content);

        if(this.state.featured_image) {
            formData.append("portfolio_blog[featured_image]", this.state.featured_image);
        }

        return formData;
    }

    handleSubmit(event) {
        axios({
            method: this.state.apiAction,
            url: this.state.api_url,
            data: this.buildForm(),
            withCredentials: true
        })
            .then(res => {
                if(this.state.featured_image) {
                    this.featuredImageRef.current.dropzone.removeAllFiles();
                }

                this.setState({
                    title: "",
                    blog_status: "",
                    content: "",
                    featured_image: ""
                });

                if(this.props.editMode) {
                    //update blog detail
                    this.props.handleUpdateFormSubmission(res.data.portfolio_blog);
                } else {
                    this.props.handleSuccessfullFormSubmission(res.data.portfolio_blog);
                }
                
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

                <div className="one-column">
                    <RichTextEditor 
                        handleRichTextEditorChange={this.handleRichTextEditorChange} 
                        editMode={this.props.editMode}
                        contentToEdit={this.props.editMode && this.props.blog.content ? this.props.blog.content : null}

                    />
                </div>

                <div className="image-uploaders">
                    {this.props.editMode && this.props.blog.featured_image_url ?
                    
                    <div className="portfolio-manager-image-wrapper">
                                <img src={this.props.blog.featured_image_url} />
                                <div className="image-removal-link">
                                    <a onClick={() => this.deleteImage("featured_image")}>
                                        Remove File
                                    </a>
                                </div>
                            </div>

                    : 
                    
                   
                    <DropzoneComponent
                        config={this.componentConfig()}
                        djsConfig={this.djsConfig()}
                        eventHandlers={this.handleFeaturedImageDrop()}
                        ref={this.featuredImageRef}
                    >
                        <div className="dz-message">Featured Image</div>
                    </DropzoneComponent>
                    }         
                </div>

                <button className="btn">Save</button>
            </form>
        )
    }
}