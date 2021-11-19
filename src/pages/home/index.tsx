import React, { useEffect } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Props {}

const HomePage: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  
  const connect = async () => {
    try {
      let accounts = await (window as any)?.ethereum.request({ method: 'eth_requestAccounts' });
      navigate(`/mint-nft/${accounts[0]}`);
    } catch (error) {
      console.log(error);
    }
  };

  const checkConnectWallet = () => {
    if (typeof (window as any)?.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    } else {
      console.log('not installed');
    }
  };

  useEffect(() => {
    checkConnectWallet();
  }, []);

  return (
    <Container className="justify-content-md-center">
      <Row className="justify-content-md-center">
        <Col md="auto">
          {" "}
          <Button variant="primary" onClick={connect}>Connect wallet</Button>{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
