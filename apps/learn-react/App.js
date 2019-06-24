import React, { Component } from "react";

class LearnReactApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showExample: false
        }
    }
    toggleExample = () => {
        this.setState({
            showExample: !this.state.showExample
        })
    }
    render() {
        return (
            <div id="learn-react">
                <button onClick={this.toggleExample}>Show/hide</button>
                {
                    this.state.showExample ? (
                        <div className="sgds-accordion">
                            <div className="sgds-accordion-set">
                                <a className="sgds-accordion-header">
                                    accordion bar 1
                                    <i className="sgds-icon sgds-icon-chevron-down" />
                                </a>
                                <div className="sgds-accordion-body">
                                    <p>your content 1</p>
                                </div>
                            </div>
                            <div className="sgds-accordion-set">
                                <a className="sgds-accordion-header active">
                                    accordion bar 2
                                    <i className="sgds-icon sgds-icon-chevron-up" />
                                </a>
                                <div className="sgds-accordion-body is-open">
                                    <p>
                                        You can add
                                        <code>is-open</code> class to
                                        <code>sgds-accordion-body</code> to show the
                                        content on page load
                                    </p>
                                </div>
                            </div>
                            <div className="sgds-accordion-set">
                                <a className="sgds-accordion-header">
                                    accordion bar 3
                                    <i className="sgds-icon sgds-icon-chevron-down" />
                                </a>
                                <div className="sgds-accordion-body">
                                    <p>your content 3</p>
                                </div>
                            </div>
                        </div>
                    ) : ""
                }
            </div>
        );
    }
}

export default LearnReactApp;
