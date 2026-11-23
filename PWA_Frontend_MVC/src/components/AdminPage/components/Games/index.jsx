import { Container, Row, Col } from "reactstrap";
import Table from "../../../Table";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useGetData } from "../../../AdminPage/hooks/useGetData";
import { usePostData } from "../../../AdminPage/hooks/usePostData";
import { getGames, createGame } from "../../../../services/api/games";
import { TabContext } from "../../../../contexts/TabProvider/TabContext";
import { useContext, useEffect } from "react";

const Games = () => {
  const { register, handleSubmit } = useForm();
  const { isError, isLoading, data } = useGetData(getGames, 0, 0);
  const { isLoading: isLoadingPost, addData } = usePostData(createGame);
  const { setGames } = useContext(TabContext);

  useEffect(() => {
    if (data?.data) {
      setGames(data.data);
    }
  }, [data, setGames]);

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (isError) {
    return <div>UPPSSSS</div>;
  }

  return (
    <Container className={styles.container}>
      <Row>
        <Col className={styles.column}>
          <h3>Create Game</h3>

          <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(addData)}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Name:
                </label>

                <input id="name" type="text" required {...register("name")} />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="date">
                  Date:
                </label>

                <input id="date" type="date" required {...register("date")} />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="team.home">
                  Home Team:
                </label>

                <input
                  id="team.home"
                  type="text"
                  required
                  {...register("team.home")}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="team.visitor">
                  Visitor Team:
                </label>

                <input
                  id="team.visitor"
                  type="text"
                  required
                  {...register("team.visitor")}
                />
              </div>

              <Row>
                <input
                  className="submit"
                  type="submit"
                  value="Create Game"
                  disabled={isLoadingPost}
                />
              </Row>
            </form>
          </div>
        </Col>

        <Col>
          <Table
            columns={["team.home", "team.visitor", "name", "date"]}
            rows={data}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Games;
