import { useEffect, useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import Table from "../../../Table";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { getUsers, createUser} from "../../../../services/api/users";
import { UsersContext } from "../../../../contexts/UsersProvider/UsersContext";
import { useGetData } from "../../../AdminPage/hooks/useGetData";
import { usePostData } from "../../../AdminPage/hooks/usePostData";
import { TabContext } from "../../../../contexts/TabProvider";

const Users = () => {
  const { register, handleSubmit } = useForm();
  const { setUsers } = useContext(UsersContext);
  const { isError, isLoading, data } = useGetData(getUsers, 0, 0);
  const { isLoading: isLoadingPost, addData } = usePostData(createUser);
  const { setClicksCount, countClicks } = useContext(TabContext);

  useEffect(() => {
    setUsers(data.data);
  }, [data, setUsers]);

  const addUser = (formData) => {
    const newData = {
      ...formData,
      role: { name: "user", scope: "notMember" },
    };

    fetch("/api/users", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (response.ok) {
          getUsers(0,0);
          alert("Pedido Efetuado com sucesso");
        } else {
          alert("Error ao adicionar");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error);
      });
  };

  const handleClick = () => {
    setClicksCount(countClicks + 1);
  }

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (isError) {
    return <div>UPPSSSS</div>;
  }

  return (
    <Container>
      <Row>
        <Col className={styles.column}>
          <h3>Create User</h3>
          <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(addUser)}>
              <div className={styles.field}>
                <label className={styles.label} for="name">
                  Name:
                </label>
                <input
                  id="name"
                  type="name"
                  name="name"
                  required="required"
                  {...register("name")}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} for="password">
                  Password:
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required="required"
                  {...register("password")}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} for="email">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required="required"
                  {...register("email")}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} for="age">
                  Age :
                </label>
                <input id="age" name="age" type="number" {...register("age")} />
              </div>
              <div className={styles.field}>
                <label className={styles.label} for="address">
                  Address :
                </label>
                <input
                  id="address"
                  name="address"
                  required="required"
                  {...register("address")}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} for="country">
                  Country :
                </label>
                <input
                  id="country"
                  name="country"
                  required="required"
                  {...register("country")}
                />
              </div>
              <Row>
                <input className="submit" type="submit" />
              </Row>
            </form>
          </div>
        </Col>
        <Col>
          <Table columns={["name", "email", "age", "address"]} rows={data} />
        </Col>
      </Row>

      <button onClick={handleClick}>Nº de clicks: {countClicks}</button>
    </Container>
  );
};

export default Users;
