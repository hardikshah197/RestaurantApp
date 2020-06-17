import React, {Component} from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle,BreadcrumbItem,Breadcrumb, Button,Modal,ModalHeader,ModalBody, FormGroup, Label,
    Form,Input, Row,Col, FormFeedback} from 'reactstrap';
import { Link } from 'react-router-dom';


class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            name:'',
            isModalOpen:false,
            touched : {
                name:''
            }
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched : { ...this.state.touched, [field]: true}
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleComment(event) {
        this.toggleModal();
        console.log("Hellolo")
        alert("Your Rating: "+this.rating.value+"Your name: "+this.name.value+"Comment: "+this.message.value);
        event.preventDefault();
    }

    validate(name) {
        const errors = {
            name: ''
        };
        if(this.state.touched.name && name.length < 3)
            errors.name = 'Name should be greater than 2 characters'
        else if(this.state.touched.name && name.length > 15)
            errors.name= 'Name should be less than 15 characters'
    
        return errors
    }
    render(){
        const errors = this.validate(this.state.name);
        return(
        <div className="container">
        <Button outline onClick={this.toggleModal}>
            <span className="fa fa-edit fa-lg">Submit Comment</span>
        </Button>
            <React.Fragment>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> 
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleComment}>
                            <FormGroup row>
                                <Col md={12}>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Input type="select" id="rating" name="rating" 
                                    innerRef={(input) => this.rating = input}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={12}>
                                    <Label htmlFor="name">Your Name</Label>
                                    <Input type="text" id="name" name="name" 
                                    value={this.state.name} 
                                    valid={errors.name === ''}
                                    invalid={errors.name !== ''}
                                    onBlur={this.handleBlur('name')}
                                    onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={12}>
                                    <Label htmlFor="message">Comment</Label>
                                    <Input type="textarea" id="message" name="message" 
                                    innerRef={(input) => this.message = input} rows="6" />
                                </Col>
                            </FormGroup>
                            <Button type="submit" value="submit" className="bg-primary">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        </div>
        )
    }
    
}

function RenderComments ({comments}) {
    if (comments == null) {
        return (<div></div>)
    }
    const cmnts = comments.map(comment => {
        return (
        <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>-- {comment.author},
            &nbsp;
            {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit'
                }).format(new Date(comment.date))}
            </p>
        </li>
        )
    })
    return (
        <div className='col-12 col-md-5 m-1'>
            <h4> Comments </h4>
            <ul className='list-unstyled'>
                {cmnts}
            </ul>
            <div className="col-12 mt-3">
                <CommentForm/>
            </div>
        </div>
    )
    
}


function RenderDish({dish}) {
    if (dish != null) {
        return (
            <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
    else {
        return (<div></div>)
    }
}

const  DishDetail = (props) => {
    return (
            <div className='container'>
                <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                <div className='row'>
                    <RenderDish dish={props.dish} />
                    <RenderComments comments = {props.comments} />
                    {/* {this.RenderDish(this.props.dish)}
                    {this.RenderComments(this.props.comments)} */}
                </div>
            </div>
    )
}

export default DishDetail;