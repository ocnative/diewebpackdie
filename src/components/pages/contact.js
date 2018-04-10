import React from 'react';
import { Carousel, Grid, Col, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendContactMail } from '../../actions/contactActions'

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.submitContactForm = this.submitContactForm.bind(this);
    }

    submitContactForm(e) {
        e.preventDefault();

        this.props.actions.sendContactMail({
            name: this.name.value,
            email: this.email.value,
            message: this.message.value
        }).then(() => this.setState({ thanksMessage: 'Thanks for Sending an inquiry mail!!!' }))
    }

    render() {
        return (
            <Grid>
                <Row>
                    {this.state.thanksMessage ? <h1>{this.state.thanksMessage}</h1> :
                        <div>
                            <h3>Fill the fields below</h3>
                            <form>
                                Name: <input type="text" name="name" ref={(i) => this.name = i} /> <br />
                                Email: <input type="text" name="email" ref={(i) => this.email = i} /> <br />
                                Message: <textarea type="text" name="message" ref={(i) => this.message = i} /> <br />
                                <button onClick={this.submitContactForm} className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    }
                </Row>
            </Grid>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ sendContactMail }, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(ContactForm);