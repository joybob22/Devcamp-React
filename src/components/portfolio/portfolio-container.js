import React, { Component } from 'react';
import axios from 'axios';

import PortfolioItem from './portfolio-item';

export default class PortfolioContainer extends Component {
    constructor() {
        super();
        this.state = {
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            data: []
        };
        this.handleFilter = this.handleFilter.bind(this);
    }

    getPortfolioItems(filter = null) {
        
        axios.get('https://braydenlemke.devcamp.space/portfolio/portfolio_items')
      .then(response => {
        if(filter) {
            this.setState({
                data: response.data.portfolio_items.filter(item => {
                    return item.category === filter;
                })
            });
        } else {
            this.setState({
                data: response.data.portfolio_items
            })
        }
        // handle success
        
      })
      .catch(error => {
        console.log(error);
      })
    }

    handleFilter(filter) {
        if(filter === "CLEAR_FILTERS") {
            this.getPortfolioItems();
        } else {
            this.getPortfolioItems(filter);
        }
    }

    portfolioItem() {
        return this.state.data.map(item => {
            return <PortfolioItem key={item.id} item={item} />;
        })
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        if(this.state.isLoading) {
            return <div>Loading...</div>;
        }
        
        return (
            <div className="homepage-wrapper">
                <div className="filter-links">
                    <button className="btn" onClick={() => this.handleFilter('Tech')}>Tech</button>
                    <button className="btn" onClick={() => this.handleFilter('Teaching')}>Teaching</button>
                    <button className="btn" onClick={() => this.handleFilter('School')}>School</button>
                    <button className="btn" onClick={() => this.handleFilter('CLEAR_FILTERS')}>All</button>
                </div>
                <div className="portfolio-items-wrapper">
                    
                    { this.portfolioItem() }
                </div>
            </div>
        )
    }
}