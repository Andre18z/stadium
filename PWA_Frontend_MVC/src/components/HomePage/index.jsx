import React, { useState } from "react";
import { Row, Col, Container } from "reactstrap";
import LoginForm from "../LoginForm";
import styles from "./styles.module.scss";
import QrRead from "../QrCodeRead";

const HomePage = () => {
  const [showQrCode, setQrCode] = useState(false);
  const [dataQrCode, setDataQrCode] = useState({});

  return (
    <Container>
      <Row className={styles.row}>
        <Col className={styles.col}>
          <LoginForm title="Admin" role="admin" />
        </Col>
        <Col>
        <LoginForm title="User" role="user" data={dataQrCode} />
        <div className={styles.qrContainer}>
          {showQrCode && <QrRead setDataLogin={setDataQrCode}></QrRead>}
          {
            <button onClick={() => setQrCode(!showQrCode)}>
              Login with Qr Code
            </button>
          }
        </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
