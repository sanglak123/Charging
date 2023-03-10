import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Button, Card, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { ApiClients } from '../CallApi/ApiClient';
import { useDispatch, useSelector } from 'react-redux';
import { ClientSelector } from '../redux/selector/ClientSelector';
import Link from 'next/link';
import { ListTypeCard } from '../redux/store';
import { toast } from 'react-toastify';
import { HistoryChangeCardSuccess } from '../redux/slice/ClientSlice';
import { DataSuccess } from '../redux/slice/DataSlice';
import { DataSelector } from '../redux/selector/DataSelector';
import TablePrice from '../components/TablePrice';

function index(props) {
  const dispatch = useDispatch();

  //Card
  const [telco, setTelco] = useState("VIETTEL");
  const [code, setCode] = useState("");
  const [seri, setSeri] = useState("");
  const [value, setValue] = useState("");

  //Loading Data
  useEffect(() => {
    const LoadingData = async () => {
      await ApiClients.Data.LoadingData(dispatch, DataSuccess)
    };
    LoadingData();
  }, []);

  const TypeCards = useSelector(DataSelector.TypeCards);

  const PhoneCards = TypeCards.filter(card => card.type === "phone");
  const [phoneCard, setPhoneCard] = useState("Viettel");

  const [gameCard, setGameCard] = useState("Garena");
  const GameCards = TypeCards.filter(card => card.type === "game");

  const accessToken = useSelector(ClientSelector.accessToken);
  const user = useSelector(ClientSelector.Client);

  const handleCoppy = (id) => {
    const ele = window.document.getElementById(id);
    ele.focus();
    ele.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  };


  const handlePostCard = async () => {
    const idToast = toast.loading("Please wait...")
    await ApiClients.Card.PostCard(telco, code, seri, value, accessToken, user.id)
    await ApiClients.Card.HistoryChangeCard(dispatch, HistoryChangeCardSuccess, user?.id)
    setTimeout(() => {
      toast.dismiss(idToast)
    }, 3000)
  };

  return (
    <div id='home_page'>
      <div className='doithecao'>
        <Container>
          <div className='hearder_247'>
            <h1>?????i Th??? C??o</h1>
          </div>
          <ul>
            <li>
              <i className="fa fa-angle-double-right"></i>
              Sai m???nh gi?? -50%. S???n l?????ng tr??n 2tr/ng??y ib t???i ????y ????? ???????c ?????i l??
            </li>
            <li>
              <i className="fa fa-angle-double-right"></i>
              L???ch s??? ?????i th??? t???i ????y. Th??ng k?? s???n l?????ng t???i ????y
            </li>
            <li>
              <i className="fa fa-angle-double-right"></i>
              H??? tr??? n???p r??t ti???n v??? ATM ho??n to??n mi???n ph??
            </li>
            <li>
              <i className="fa fa-angle-double-right"></i>
              Tin t???c t??ng gi???m chi???t kh???u TELEGRAM
            </li>
            <li>
              <i className="fa fa-angle-double-right"></i>
              L??u ?? : KH h???n ch??? n???p qu?? nhi???u th??? 1 l??c, ch??? n??n g???i m???i l???n 5 th???, ch??? x??? l?? xong, r???i n???p ti???p, c???m ??n !
            </li>
            <li>
              N???p ti???n qu??n ghi n???i dung ho???c ghi sai n???i dung ?????u b??? tr??? 30% s??? ti???n n???p . K??nh mong qu?? kh??ch h??ng vui l??ng c???n th???n h??n ??? , xin c???m ??n !!!
            </li>
          </ul>

          <Row>
            <Col className='mt-3' xs={12} md={6} xl={3}>
              <Form.Select
                onChange={(e) => setTelco(e.target.value)}
              >
                <option value="VIETTEL">Viettel</option>
                <option value="VINAPHONE">Vinaphone</option>
                <option value="MOBIFONE">Mobifone</option>
                <option value="VNMOBI">Vietnamobile</option>
              </Form.Select>
            </Col>

            <Col className='mt-3' xs={12} md={6} xl={3} >
              <InputGroup className="mb-3">
                <Form.Control
                  id='input_code'
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                  placeholder="Code"
                  aria-label="Code"
                  aria-describedby="basic-addon2"
                />
                <Button onClick={() => handleCoppy("input_code")} variant="outline-secondary" id="button-code">
                  <i className="fa fa-copy"></i>
                </Button>
              </InputGroup>
            </Col>

            <Col className='mt-3' xs={12} md={6} xl={3}>
              <InputGroup className="mb-3">
                <Form.Control
                  id='input_seri'
                  onChange={(e) => setSeri(e.target.value)}
                  value={seri}
                  placeholder="Serial"
                  aria-label="Seri"
                  aria-describedby="basic-seri"
                />
                <Button onClick={() => handleCoppy("input_seri")} variant="outline-secondary" id="button-seri">
                  <i className="fa fa-copy"></i>
                </Button>
              </InputGroup>
            </Col>

            <Col className='mt-3' xs={12} md={6} xl={3}>
              <Form.Select onChange={(e) => setValue(e.target.value)} aria-label="Lo???i th???">
                <option>M???nh gi??</option>
                <option value="10000">10.000 VN??</option>
                <option value="20000">20.000 VN??</option>
                <option value="30000">30.000 VN??</option>
                <option value="50000">50.000 VN??</option>
                <option value="100000">100.000 VN??</option>
                <option value="200000">200.000 VN??</option>
                <option value="300000">300.000 VN??</option>
                <option value="500000">500.000 VN??</option>
                <option value="1000000">1.000.000 VN??</option>
              </Form.Select>
            </Col>

            <Col className='mt-2' xs={12}>
              <div className='btn_postcard'>
                <Button className='bgr_dark100' onClick={() => handlePostCard()}>
                  <i className="fa fa-paper-plane me-3"></i>
                  G???i th???
                </Button>
              </div>

            </Col>
          </Row>


        </Container>

      </div>

      <div className='table_price bgr_dark100 p-4'>
        <Container>
          <div className='hearder_247'>
            <h1>B???ng Ph?? ?????i Th??? C??o</h1>
          </div>
          {/* PhoneCards */}
          <div className='table_price_item d-flex'>
            {
              PhoneCards.map((card, index) => {
                return (
                  <Button className='btn_feesCard' variant={phoneCard === card.telco ? "success" : "outline-success"} key={index} onClick={() => setPhoneCard(card.telco)}>
                    {card.telco}
                  </Button>
                )
              })
            }
          </div>
          <TablePrice
            telco={phoneCard}
          />

          {/* GameCard */}
          <div className='table_price_item d-flex'>
            {
              GameCards.map((card, index) => {
                return (
                  <Button className='btn_feesCard' key={index} onClick={() => setGameCard(card.telco)} variant={gameCard === card.telco ? "success" : "outline-success"}>
                    {card.telco}
                  </Button>
                )
              })
            }
          </div>
          <TablePrice
            telco={gameCard}
          />

        </Container>
      </div>

      <div className='muathecao'>
        <Container>
          <div className='hearder_247'>
            <h1>MUA M?? TH??? C??O NHANH CH??NG - GI?? R???</h1>
          </div>
          <p>C??c lo???i th??? c??o ??i???n tho???i, th??? game tr???c tuy???n, h??? tr??? thanh to??n b???ng v?? ??i???n t???, c??c ng??n h??ng c???a Vi???t Nam. Sau khi thanh to??n th??nh c??ng, th??? s??? ??c tr??? ngay l???p t???c tr??n website v?? g???i v??o ??i???n ch??? email c???a b???n.</p>

          <Row>
            {
              ListTypeCard.map((card, index) => {
                return (
                  <Col key={index} xs={6} sm={6} md={3} xl={3} xxl={2}>
                    <Card className='mt-2 mb-2'>
                      <Card.Img className='img-fluid' variant="top" src={card.img} alt={card.name} />
                      <Card.Body>
                        <Button className='w-100' variant="outline-success">
                          <Link className='txt_black' href={"/muathecao"}>  {card.name}</Link>
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
        </Container>

      </div>
    </div>
  );
}

export default index;