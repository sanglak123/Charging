import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Button, Card, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { ApiClients } from '../CallApi/ApiClient';
import { useDispatch, useSelector } from 'react-redux';
import { ListPriceSuccess } from '../redux/slice/CardSlice';
import { CardSelector } from '../redux/selector/CardSelector';
import { ClientSelector } from '../redux/selector/ClientSelector';
import Link from 'next/link';

const ListTypeCard = [
  {
    name: "Thẻ Viettel",
    img: "/img/card/the_viettel.png"
  },
  {
    name: "Thẻ Vinaphone",
    img: "/img/card/the_vinaphone.jpeg"
  },
  {
    name: "Thẻ Mobifone",
    img: "/img/card/the_mobifone.jpeg"
  },
  {
    name: "Thẻ Vietnamobile",
    img: "/img/card/the_vietnamobile.jpeg"
  },
  {
    name: "Thẻ Garena",
    img: "/img/card/the_garena.png"
  },
  {
    name: "Thẻ Appota",
    img: "/img/card/the_appota.png"
  },
  {
    name: "Thẻ Zing",
    img: "/img/card/the_zing.png"
  },
  {
    name: "Thẻ Vcoin",
    img: "/img/card/the_vcoin.png"
  },
  {
    name: "Thẻ Gate",
    img: "/img/card/the_gate.png"
  },
  {
    name: "Thẻ Cà Rốt",
    img: "/img/card/the_team.jpg"
  },
  {
    name: "Thẻ Funcard",
    img: "/img/card/the_funcard.jpg"
  },
  {
    name: "Thẻ VEGA",
    img: "/img/card/the_vega.png"
  },
  {
    name: "SOHACOIN",
    img: "/img/card/the_sohacoin.png"
  },
  {
    name: "ONCASH",
    img: "/img/card/the_oncash.jpeg"
  },
  {
    name: "BITVN",
    img: "/img/card/the_bitvn.jpg"
  },
  {
    name: "KUL",
    img: "/img/card/the_kul.jpeg"
  },
  {
    name: "GOSU",
    img: "/img/card/the_gosu.png"
  },
  {
    name: "SCOIN",
    img: "/img/card/the_scoin.jpg"
  },
]

function index(props) {
  const dispath = useDispatch();

  //Card
  const [telco, setTelco] = useState("VIETTEL");
  const [code, setCode] = useState("");
  const [seri, setSeri] = useState("");
  const [value, setValue] = useState("");


  useEffect(() => {
    const listGiaTaythe = async () => {
      await ApiClients.LayGiaTayThe(dispath, ListPriceSuccess);
    };
    listGiaTaythe();
  }, []);

  const ListPrices = useSelector(CardSelector.ListPrices);

  const accessToken = useSelector(ClientSelector.Client).accessToken;

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
  }

  const handlePostCard = async () => {
    await ApiClients.Card.PostCard(telco, code, seri, value, accessToken);
  };

  return (
    <div id='home_page'>


      <div className='doithecao'>
        <Container>
          <div className='hearder_247'>
            <h1>Đổi Thẻ Cào</h1>
          </div>

          <ul>
            <li>
              <i class="fa fa-angle-double-right"></i>
              Sai mệnh giá -50%. Sản lượng trên 2tr/ngày ib tại đây để được đại lý
            </li>
            <li>
              <i class="fa fa-angle-double-right"></i>
              Lịch sử đổi thẻ tại đây. Thông kê sản lượng tại đây
            </li>
            <li>
              <i class="fa fa-angle-double-right"></i>
              Hỗ trợ nạp rút tiền về ATM hoàn toàn miễn phí
            </li>
            <li>
              <i class="fa fa-angle-double-right"></i>
              Tin tức tăng giảm chiết khấu TELEGRAM
            </li>
            <li>
              <i class="fa fa-angle-double-right"></i>
              Lưu ý : KH hạn chế nạp quá nhiều thẻ 1 lúc, chỉ nên gửi mỗi lần 5 thẻ, chờ xử lý xong, rồi nạp tiếp, cảm ơn !
            </li>
            <li>
              Nạp tiền quên ghi nội dung hoặc ghi sai nội dung đều bị trừ 30% số tiền nạp . Kính mong quý khách hàng vui lòng cẩn thận hơn ạ , xin cảm ơn !!!
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
              <Form.Select onChange={(e) => setValue(e.target.value)} aria-label="Loại thẻ">
                <option>Mệnh giá</option>
                <option value="10000">10.000 VNĐ</option>
                <option value="20000">20.000 VNĐ</option>
                <option value="30000">30.000 VNĐ</option>
                <option value="50000">50.000 VNĐ</option>
                <option value="100000">100.000 VNĐ</option>
                <option value="200000">200.000 VNĐ</option>
                <option value="300000">300.000 VNĐ</option>
                <option value="500000">500.000 VNĐ</option>
                <option value="1000000">1.000.000 VNĐ</option>
              </Form.Select>
            </Col>

            <Col className='mt-2' xs={12}>
              <div className='btn_postcard'>
                <Button className='bgr_dark100' onClick={() => handlePostCard()}>
                  <i class="fa fa-paper-plane me-3"></i>
                  Gửi thẻ
                </Button>
              </div>

            </Col>
          </Row>


        </Container>

      </div>

      <div className='bangphidoithe bgr_dark100'>
        <Container>
          <div className='hearder_247'>
            <h1>Bảng Phí Đổi Thẻ Cào</h1>
          </div>

          <Tabs>
            <TabList>
              <Tab>Viettel</Tab>
              <Tab>Vinaphone</Tab>
              <Tab>Vietnamobile</Tab>
              <Tab>Mobifone</Tab>

              <Tab>Zing</Tab>
              <Tab>Gate</Tab>
              <Tab>Garena</Tab>
              <Tab>Vcoin</Tab>
            </TabList>

            {
              ListPrices?.map((telco, index) => {
                return (
                  <TabPanel key={index}>
                    <Table striped bordered hover>
                      <thead className={"txt_white"}>
                        <tr>
                          <th className='txt_center'>Nhóm</th>
                          {
                            telco.value.map((value, i) => {
                              return (
                                <th className='txt_center' key={i}>{value} VNĐ</th>
                              )
                            })
                          }
                        </tr>
                      </thead>
                      <tbody>
                        <tr >
                          <td className={"txt_white txt_center"}>Thành viên/API</td>
                          {
                            telco.list.map((card, j) => {
                              return (
                                <td className={"txt_white txt_center"} key={j}>{card.fees}</td>
                              )
                            })
                          }
                        </tr>
                        <tr>
                        </tr>
                      </tbody>
                    </Table>
                  </TabPanel>
                )
              })
            }
          </Tabs>
        </Container>
      </div>

      <div className='muathecao'>
        <Container>
          <div className='hearder_247'>
            <h1>MUA MÃ THẺ CÀO NHANH CHÓNG - GIÁ RẺ</h1>
          </div>
          <p>Các loại thẻ cào điện thoại, thẻ game trực tuyến, hỗ trợ thanh toán bằng ví điện tử, các ngân hàng của Việt Nam. Sau khi thanh toán thành công, thẻ sẽ đc trả ngay lập tức trên website và gửi vào điện chỉ email của bạn.</p>

          <Row>
            {
              ListTypeCard.map((card, index) => {
                return (
                  <Col key={index} xs={2}>
                    <Card className='mt-2 mb-2'>
                      <Card.Img className='img-fluid' variant="top" src={card.img} alt={card.name} />
                      <Card.Body>
                        <Button className='w-100' variant="success">
                          <Link href={"/muathecao"}>  {card.name}</Link>
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