import { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import Qrcode from "../../../QrcodeCreate";

export const Perfil = ({ user = { name: "" } }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    reset({
      ...user,
      role: user.role?.name || "",
      scope: user.role?.scope?.[0] || "",
      password: "",
    });
  }, [user, reset]);

  return (
    <Container>
      <Row>
        <Col className={styles.column}>
          <h3>Perfil</h3>

          <div className={styles.container}>
            <form
              className={styles.form}
              onSubmit={handleSubmit((data) => {
                console.log(data);
              })}
            >
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Nome:
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: true })}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="password">
                  Password:
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="age">
                  Idade:
                </label>
                <input
                  id="age"
                  type="number"
                  {...register("age", { valueAsNumber: true })}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="address">
                  Morada:
                </label>
                <input
                  id="address"
                  type="text"
                  {...register("address", { required: true })}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="country">
                  País:
                </label>
                <input
                  id="country"
                  type="text"
                  {...register("country", { required: true })}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="role">
                  Role:
                </label>
                <input
                  id="role"
                  type="text"
                  {...register("role")}
                  disabled
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="scope">
                  Permissão:
                </label>
                <input
                  id="scope"
                  type="text"
                  {...register("scope")}
                  disabled
                />
              </div>

              <Row>
                <input
                  className="submit"
                  type="submit"
                  value="Guardar alterações"
                />
              </Row>
            </form>
          </div>
        </Col>

        <Col>
          <div className={styles.qrCodeContainer}>
            <h2>Qr Code to Login</h2>
            <Qrcode user={user} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};