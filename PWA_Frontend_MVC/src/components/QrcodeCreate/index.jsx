import { useEffect, useState } from "react";
import QrCode from "react-qr-code";
import styles from "./styles.module.scss";

function Qrcode({ user = { name: "", password: "" } }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const newWord = encodeURI(`${user.name}&&${user.password}`);
    setValue(newWord);
  }, [user]);

  return (
    <div className={styles.qrCodeCreate}>
      <QrCode
        size={64}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={value}
        viewBox={`0 0 64 64`}   
      />
    </div>
  );
}

export default Qrcode;
