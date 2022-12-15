import React, { useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { ApiClients } from '../CallApi/ApiClient';
import { useDispatch, useSelector } from 'react-redux';
import { VIETTELSuccess, MOBIFONESuccess, VINAPHONESuccess, VNMOBISuccess } from '../redux/slice/CardSlice';
import { CardSelector } from '../redux/selector/CardSelector';

function index(props) {
  const dispath = useDispatch();

  useEffect(() => {
    const listGiaTaythe = async () => {
      await ApiClients.LayGiaTayThe(dispath, VIETTELSuccess, "VIETTEL");
      await ApiClients.LayGiaTayThe(dispath, VNMOBISuccess, "VNMOBI");
      await ApiClients.LayGiaTayThe(dispath, MOBIFONESuccess, "MOBIFONE");
      await ApiClients.LayGiaTayThe(dispath, VINAPHONESuccess, "VINAPHONE");
    };
    listGiaTaythe();
  });

  const VIETTEL = useSelector(CardSelector.VIETTEL);
  const VNMOBI = useSelector(CardSelector.VNMOBI);
  const MOBIFONE = useSelector(CardSelector.MOBIFONE);
  const VINAPHONE = useSelector(CardSelector.VINAPHONE);

  return (
    <div id='home_page'>
      <Container>

        <div className='doithecao'>
          <h1>Đổi Thẻ Cào</h1>
          <ul>
            <li>
              Sai mệnh giá -50%. Sản lượng trên 2tr/ngày ib tại đây để được đại lý
            </li>
            <li>
              Lịch sử đổi thẻ tại đây. Thông kê sản lượng tại đây
            </li>
            <li>
              Hỗ trợ nạp rút tiền về ATM hoàn toàn miễn phí
            </li>
            <li>
              Tin tức tăng giảm chiết khấu TELEGRAM
            </li>
            <li>
              Lưu ý : KH hạn chế nạp quá nhiều thẻ 1 lúc, chỉ nên gửi mỗi lần 5 thẻ, chờ xử lý xong, rồi nạp tiếp, cảm ơn !
            </li>
            <li>
              Nạp tiền quên ghi nội dung hoặc ghi sai nội dung đều bị trừ 30% số tiền nạp . Kính mong quý khách hàng vui lòng cẩn thận hơn ạ , xin cảm ơn !!!
            </li>
          </ul>
          <Row>
            <Col>
              <Form.Select aria-label="">
                <option value="1">Viettel</option>
                <option value="2">Vinaphone</option>
                <option value="3">Mobifone</option>
                <option value="4">Vietnamobile</option>
              </Form.Select>
            </Col>

            <Col>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Code"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                  <i class="fa fa-copy"></i>
                </Button>
              </InputGroup>
            </Col>

            <Col>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Seri"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                  <i class="fa fa-copy"></i>
                </Button>
              </InputGroup>
            </Col>

            <Col>
              <Form.Select aria-label="Loại thẻ">
                <option>Mệnh giá</option>
                <option value="1">10.000 VNĐ</option>
                <option value="1">20.000 VNĐ</option>
                <option value="1">30.000 VNĐ</option>
                <option value="1">50.000 VNĐ</option>
                <option value="1">100.000 VNĐ</option>
                <option value="1">200.000 VNĐ</option>
                <option value="1">300.000 VNĐ</option>
                <option value="1">500.000 VNĐ</option>
                <option value="1">1.000.000 VNĐ</option>
              </Form.Select>
            </Col>
          </Row>
          <Button>Gửi thẻ</Button>
        </div>

        <div className='bangphidoithe'>
          <h1>Bảng Phí Đổi Thẻ Cào</h1>
          <Tabs>
            <TabList>
              <Tab>Viettel</Tab>
              <Tab>Vinaphone</Tab>
              <Tab>Mobifone</Tab>
              <Tab>Vietnamobile</Tab>
            </TabList>
            {/* VIETTEL */}
            <TabPanel>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nhóm</th>
                    <th>10.000 VNĐ</th>
                    <th>20.000 VNĐ</th>
                    <th>30.000 VNĐ</th>
                    <th>50.000 VNĐ</th>
                    <th>100.000 VNĐ</th>
                    <th>200.000 VNĐ</th>
                    <th>300.000 VNĐ</th>
                    <th>500.000 VNĐ</th>
                    <th>1.000.000 VNĐ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Thành viên/API</td>
                    {
                      VIETTEL.map((vt, index) => {
                        return (
                          <td key={index}>{vt.fees}</td>
                        )
                      })
                    }
                  </tr>
                  <tr>
                    <td>Đại lý</td>
                    {
                      VIETTEL.map((vt, index) => {
                        return (
                          <td key={index}>{vt.fees + 1}</td>
                        )
                      })
                    }
                  </tr>
                </tbody>
              </Table>
            </TabPanel>

            {/* VINAPHONE */}
            <TabPanel>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nhóm</th>
                    <th>10.000 VNĐ</th>
                    <th>20.000 VNĐ</th>
                    <th>30.000 VNĐ</th>
                    <th>50.000 VNĐ</th>
                    <th>100.000 VNĐ</th>
                    <th>200.000 VNĐ</th>
                    <th>300.000 VNĐ</th>
                    <th>500.000 VNĐ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Thành viên/API</td>
                    {
                      VINAPHONE.map((vt, index) => {
                        return (
                          <td key={index}>{vt.fees}</td>
                        )
                      })
                    }
                  </tr>
                  <tr>
                    <td>Đại lý</td>
                    {
                      VINAPHONE.map((vt, index) => {
                        return (
                          <td key={index}>{vt.fees + 1}</td>
                        )
                      })
                    }
                  </tr>
                </tbody>
              </Table>
            </TabPanel>

            {/* MOBIFONE */}
            <TabPanel>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nhóm</th>
                    <th>10.000 VNĐ</th>
                    <th>20.000 VNĐ</th>
                    <th>30.000 VNĐ</th>
                    <th>50.000 VNĐ</th>
                    <th>100.000 VNĐ</th>
                    <th>200.000 VNĐ</th>
                    <th>300.000 VNĐ</th>
                    <th>500.000 VNĐ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Thành viên/API</td>
                    {
                      MOBIFONE.map((vt, index) => {
                        return (
                          <td key={index}>{vt.fees}</td>
                        )
                      })
                    }
                  </tr>
                  <tr>
                    <td>Đại lý</td>
                    {
                      MOBIFONE.map((vt, index) => {
                        return (
                          <td key={index}>{vt.fees + 1}</td>
                        )
                      })
                    }
                  </tr>
                </tbody>
              </Table>
            </TabPanel>

            {/* VNMOBI */}
            <TabPanel>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nhóm</th>
                    <th>10.000 VNĐ</th>
                    <th>20.000 VNĐ</th>
                    <th>30.000 VNĐ</th>
                    <th>50.000 VNĐ</th>
                    <th>100.000 VNĐ</th>
                    <th>200.000 VNĐ</th>
                    <th>300.000 VNĐ</th>
                    <th>500.000 VNĐ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Thành viên/API</td>
                    {
                      VNMOBI.map((vt, index) => {
                        return (
                          <td key={index}>{vt.fees}</td>
                        )
                      })
                    }
                  </tr>
                  <tr>
                    <td>Đại lý</td>
                    {
                      VNMOBI.map((vt, index) => {
                        return (
                          <td key={index}>{vt.fees + 1}</td>
                        )
                      })
                    }
                  </tr>
                </tbody>
              </Table>
            </TabPanel>

          </Tabs>
        </div>

        <div className='muathecao'>
          <h1>Mua mã thẻ</h1>
          <p>Các loại thẻ cào điện thoại, thẻ game trực tuyến, hỗ trợ thanh toán bằng ví điện tử, các ngân hàng của Việt Nam. Sau khi thanh toán thành công, thẻ sẽ đc trả ngay lập tức trên website và gửi vào điện chỉ email của bạn.</p>
        </div>
        <Row>
          <Col xs={2}>
            <div className='card_item'>
              <img src='/img/card/the-viettel.png' alt='viettel'/>
              <p>Thẻ Viettel</p>
            </div>            
          </Col>

          <Col xs={2}>
            <div className='card_item'>
              <img src='/img/card/the-viettel.png' alt='viettel'/>
              <p>Thẻ Viettel</p>
            </div>            
          </Col>

          <Col xs={2}>
            <div className='card_item'>
              <img src='/img/card/the-viettel.png' alt='viettel'/>
              <p>Thẻ Viettel</p>
            </div>            
          </Col>

          <Col xs={2}>
            <div className='card_item'>
              <img src='/img/card/the-viettel.png' alt='viettel'/>
              <p>Thẻ Viettel</p>
            </div>            
          </Col>

          <Col xs={2}>
            <div className='card_item'>
              <img src='/img/card/the-viettel.png' alt='viettel'/>
              <p>Thẻ Viettel</p>
            </div>            
          </Col>

          <Col xs={2}>
            <div className='card_item'>
              <img src='/img/card/the-viettel.png' alt='viettel'/>
              <p>Thẻ Viettel</p>
            </div>            
          </Col>

          <Col xs={2}>
            <div className='card_item'>
              <img src='/img/card/the-viettel.png' alt='viettel'/>
              <p>Thẻ Viettel</p>
            </div>            
          </Col>

          <Col xs={2}>
            <div className='card_item'>
              <img src='/img/card/the-viettel.png' alt='viettel'/>
              <p>Thẻ Viettel</p>
            </div>            
          </Col>

          <Col xs={2}>
            <div className='card_item'>
              <img src='/img/card/the-viettel.png' alt='viettel'/>
              <p>Thẻ Viettel</p>
            </div>            
          </Col>

          <Col xs={2}>
            <div className='card_item'>
              <img src='/img/card/the-viettel.png' alt='viettel'/>
              <p>Thẻ Viettel</p>
            </div>            
          </Col>

          <Col xs={2}>
            <div className='card_item'>
              <img src='/img/card/the-viettel.png' alt='viettel'/>
              <p>Thẻ Viettel</p>
            </div>            
          </Col>

          <Col xs={2}>
            <div className='card_item'>
              <img src='/img/card/the-viettel.png' alt='viettel'/>
              <p>Thẻ Viettel</p>
            </div>            
          </Col>

          <Col xs={2}>
            <div className='card_item'>
              <img src='/img/card/the-viettel.png' alt='viettel'/>
              <p>Thẻ Viettel</p>
            </div>            
          </Col>

          <Col xs={2}>
            <div className='card_item'>
              <img src='/img/card/the-viettel.png' alt='viettel'/>
              <p>Thẻ Viettel</p>
            </div>            
          </Col>

          <Col xs={2}>
            <div className='card_item'>
              <img src='/img/card/the-viettel.png' alt='viettel'/>
              <p>Thẻ Viettel</p>
            </div>            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default index;