import { useState } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Spinner,
  ListGroup,
  Image,
} from "react-bootstrap";

import imagePlaceholder from "./download.png";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { HttpClient } from "api/axiosClients";
import { MyStorage } from "helper/local_storage";

interface AssetResponse {
  result: Asset[];
  cursor: string;
  remaining: number;
}

interface Asset {
  token_address: string;
  token_id: string;
  id: string;
  user: string;
  status: string;
  uri: null;
  name: string;
  description: null;
  image_url: null;
  metadata: Metadata;
  collection: Collection;
  created_at: string;
  updated_at: string;
}

interface Collection {
  name: string;
  icon_url: string;
}

interface Metadata {
  name: string;
  skin: string;
  collectable: boolean;
}

const MintNFT = () => {
  const [total, setTotal] = useState<number>(1);
  const [isCheckTransaction, setCheckTransaction] = useState<boolean>(false);
  const [dataAsset, setDataAssets] = useState<Asset[]>([]);
  const params = useParams();

  const mintNft = () => {
    (window as any)?.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: params.user_address,
            to: "0x3b77265B999E4D2595b6f960510905BBfFCEf149",
            value: ethers.utils.parseEther((total * 0.001).toString())._hex,
          },
        ],
      })
      .then((txHash: any) => {
        console.log('txHash: ', txHash);
        loadAssetsUser();
      })
      .catch((error: any) => console.error);
  };



  const loadAssetsUser = async () => {
    setCheckTransaction(true);
    
    try {
      await new HttpClient({ route: '/pre-buy-nft' }).post({
        'user_address': params.user_address,
        'total': total,
        'current_id': MyStorage.idAsset,
      }).then(() => {
        MyStorage.idAsset = MyStorage.idAsset + total;
      });

      setInterval(() => {
        // fetch(
        //   `https://api.ropsten.x.immutable.com/v1/assets?collection=0xe1B322d47b9c40801D1EE84E73Fea7FEF778F6EE&user=${params.user_address}`
        // ).then(async (response) => {
        //   if (response.status === 200) {
        //     let data: AssetResponse = await response.json();
        //     setDataAssets(data.result);
        //   }
        // });
        setCheckTransaction(false);

      }, 5000);
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <Container>
      {dataAsset.length === 0 && (
        <Row className="justify-content-md-center">
          {!isCheckTransaction && (
            <>
              <Col md="auto">
                <Button variant="primary" onClick={mintNft}>
                  Mint
                </Button>{" "}
              </Col>
              <Col md="auto">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  <FormControl
                    onChange={(event) => {
                      setTotal(+(event.nativeEvent as any).data);
                      console.log((event.nativeEvent as any).data);
                    }}
                    placeholder="Total"
                    aria-label="Total"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </Col>
            </>
          )}
          {isCheckTransaction && (
            <Col md="auto">
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Checking transaction...
              </Button>
            </Col>
          )}
        </Row>
      )}

      <ListGroup horizontal>
        {dataAsset.map((item) => (
          <ListGroup.Item key={item.id}>
            <Image src={item.uri ?? imagePlaceholder} rounded />
            <div>{item.name}</div>
            <div>{item.collection.name}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default MintNFT;
