import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, Button, BreadcrumbItem, ModalBody, Form, FormGroup, Input, Modal, ModalHeader, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);



class CommentForm extends Component {
    
    constructor(props) {
        super(props);
        
        
        this.state = {
            isModalOpen: false
            
        };
    
        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    
      }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    toggleModal() {
      this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
  
    handleSubmit(values) {
      this.toggleModal();
      console.log(JSON.stringify(values))
      this.props.addComment(this.props.dishId, values.rating, values.yourname, values.message);
    }

    render() {
        return(
            <div>
                <Button outline onClick = {this.toggleModal}>
                    <span className="fa fa-pencil fa-lg" aria-hidden="true"></span> Submit Comment
                </Button>

                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control" defaultValue="5">    
                                        <option value="1">1</option>    
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={12}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>                            
                            <Row className="form-group">
                                <Label htmlFor="message" md={12}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 0}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        

                        </LocalForm> 
                    </ModalBody>               
                </Modal>
            </div>
        );
    }
}




    function RenderDish({dish}) {
        if(dish!= null){
            return(
                <div>
                    <Card>
                        <CardImg width="100%" top src={dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>
                            {dish.name}
                        </CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>    
            )          
        }
        else{
            return(
                <div></div>
            )
        }
    }

    function RenderComments({comments, addComment, dishId}) {
        if(comments!=null){
            const detail = comments.map((comment) =>{
                return(
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, 
                            &nbsp;
                            {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit'
                                }).format(new Date(Date.parse(comment.date)))}
                        </p>
                    </li>
                );
            });
            
            return(
                <div >
                    <h4>Comments</h4>
                    <ul class="list-unstyled">
                        {detail}
                        
                    </ul>
                    
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            );    
        }
        else{
            return(
                <div></div>
            );
        }
    }

    const  DishDetail = (props) => {
        if(props.dish!=null){
            return (
                <div className="container">
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
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id} />
                    </div>
                </div>
                </div>
            );
        }else{
            return(<div></div>);
        }
    }


export default DishDetail;