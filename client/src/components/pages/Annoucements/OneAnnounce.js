import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import img from './../../../assets/images/a1.jpg';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../../service/userDataService';
import { updateUser } from '../../../service/userService';


export default function OneAnnounce(props) {
  const { announce } = props;
  const [user, setUser] = useState(getCurrentUser())

  const addToFavourite = async(id) => {
    let fav = {favourites: user.favourites};
    let good = true;
    fav.favourites.map((fav) => (
      fav == id ? good=false : good=true
    ))
    
    if(user && good){
      fav.favourites.push(id)
      const result = await updateUser(user._id, fav)
      if(result.data) {
        
        localStorage.setItem("token", result.data.token)
      }else{
        console.log("Nie dzioło");
      }
    } 
  }


  return (
    <Card style={{ background: 'rgb(245, 225, 203)' }}>
      <Row className="g-0">
        <Col md={2}>
          <Row className="g-0">
            <Col md={12} className="d-flex justify-content-center ">
              <Link to={`/announcement/${announce.title}`}>
                <img
                  className="img-fluid rounded-start"
                  src={img}
                  alt={announce.option}
                ></img>
              </Link>
            </Col>
            <Col md={12} className="d-flex justify-content-center">
              {announce.author ? (<b> {announce.author.firstName + " " + announce.author.lastName}</b>) : ""}
            </Col>
          </Row>
        </Col>
        <Col md={10}>
          <Card.Body>
            <Row className="g-0">
              <Col md={12}>
                <Card.Title>{announce.title}</Card.Title>
              </Col>
              <Col md={12}>
                <Card.Text>{announce.description}</Card.Text>
              </Col>
              <Col md={6} className=" fw-bold">
                <Card.Text>{announce.location} </Card.Text>
              </Col>
              <Col md={6} className="text-end fs-5 fw-bold ">
                {' '}
                <Card.Text> {announce.price} zł/godz</Card.Text>
              </Col>

              <Col className="">
                <Link to={`/announcement/${announce.title}`}>
                  <Button variant="warning">Wejdz do ogloszenia</Button>
                </Link>
                <Button variant="danger" onClick={() => {addToFavourite(announce._id)}}>
                  <i class="bi bi-heart-fill"></i>
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
