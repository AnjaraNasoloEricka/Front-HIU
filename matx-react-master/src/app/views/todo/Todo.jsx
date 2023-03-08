import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Grid,
} from "@mui/material";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import { useEffect, useState } from "react";
import { Breadcrumb, SimpleCard } from "app/components";
import { render } from "react-dom";
// import MyTimeTable from "./MyTimeTable";
import FormDialogAddTodo from "app/components/MatxDialog/FormDialogAddTodo";
import { CheckBox } from "@mui/icons-material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SimpleCheckbox from "../material-kit/checkbox/SimpleCheckbox";
import { Link, useNavigate } from "react-router-dom";
import FormDialogUpdateTodo from "app/components/MatxDialog/FormDialogUpdateTodo";
import { TOKEN } from "app/config";

function todoData(setter) {
  fetch("https://mini-hiu-2023-api.vercel.app/todo", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": TOKEN,
    },
  })
    .then((response) => {
      console.log(response.status);
      if (response.status === 200) response.json();
      else {
        console.error("Error status");
      }
    })
    .then((data) => {
      if (data) {
        setter(data);
      }
    })
    .catch((error) => console.error(error));
}

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const navigate = useNavigate();

  function changeCheck(task) {
    fetch("https://mini-hiu-2023-api.vercel.app/todo/finir/" + task._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": TOKEN,
      },
    })
      .then((response) => response.json())
      .then((data) => navigate(0))
      .catch((error) => console.error(error));
  }

  const deleteTodo = (task) => {
    fetch("https://mini-hiu-2023-api.vercel.app/todo/" + task._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": TOKEN,
      },
      body: JSON.stringify({
        tache: task.tache,
      }),
    })
      .then((response) => response.json())
      .then((data) => navigate(0))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    todoData(setTodo);
  }, []);

  return (
    <Container>
      <Box className="breadcrumb">
        <br />
        <Grid container spacing={10}>
          <Grid item md={6} sm={6} xs={6}>
            <Breadcrumb
              routeSegments={[{ name: "To do List", path: "/todo" }]}
            />
            <FormDialogAddTodo />
          </Grid>
          <Grid item md={2} sm={2} xs={2}></Grid>
          <Grid item md={4} sm={4} xs={4}>
            <p>
              <Link to="/suggestion">
                <Button variant="outlined" color="secondary">
                  Simuler emploi du temps
                </Button>
              </Link>
            </p>
          </Grid>
        </Grid>
        <br />
      </Box>
      <Grid container spacing={3}>
        <Grid item md={6} sm={6} xs={6}>
          <Card title="To do List" style={{ width: "100%" }}>
            <center>
              <h4>A faire</h4>
            </center>
            <CardContent style={{ backgroundColor: "#212841" }}>
              {todo &&
                todo
                  .filter((item) => item.isDone === "no")
                  .map((item) => (
                    <>
                      <Card>
                        <Grid container spacing={1}>
                          <Grid item md={1} sm={1} xs={1}></Grid>
                          <Grid item md={1} sm={1} xs={1}>
                            <h5></h5>
                          </Grid>
                          <Grid item md={8} sm={8} xs={8}>
                            <h6 style={{ fontSize: "13px" }}>
                              {item.tache}
                              <p>
                                <Grid container spacing={2}>
                                  <Grid item md={4} sm={4} xs={4}>
                                    <FormDialogUpdateTodo todo={item} />
                                  </Grid>
                                  <Grid item md={6} sm={6} xs={6}>
                                    <Button
                                      variant="outlined"
                                      color="inherit"
                                      style={{ color: "red" }}
                                      onClick={() => deleteTodo(item)}
                                    >
                                      Supprimer
                                    </Button>
                                  </Grid>
                                </Grid>
                              </p>
                            </h6>
                          </Grid>
                          <Grid item md={2} sm={2} xs={2}>
                            <h5>
                              <Checkbox
                                color="primary"
                                value="checkedG"
                                onChange={() => changeCheck(item)}
                              />
                            </h5>
                          </Grid>
                        </Grid>
                      </Card>
                      <br />
                    </>
                  ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <Card title="To do List" style={{ width: "100%" }}>
            <center>
              <h4>Fait</h4>
            </center>
            <CardContent style={{ backgroundColor: "#212841" }}>
              {todo &&
                todo
                  .filter((item) => item.isDone !== "no")
                  .map((item) => (
                    <>
                      <Card>
                        <Grid container spacing={1}>
                          <Grid item md={1} sm={1} xs={1}></Grid>
                          <Grid item md={1} sm={1} xs={1}>
                            <h5></h5>
                          </Grid>
                          <Grid item md={8} sm={8} xs={8}>
                            <h6 style={{ fontSize: "13px" }}>
                              {item.tache}
                              <p>
                                <Grid container spacing={2}>
                                  <Grid item md={4} sm={4} xs={4}>
                                    <FormDialogUpdateTodo todo={item} />
                                  </Grid>
                                  <Grid item md={6} sm={6} xs={6}>
                                    <Button
                                      variant="outlined"
                                      color="inherit"
                                      style={{ color: "red" }}
                                      onClick={() => deleteTodo(item)}
                                    >
                                      Supprimer
                                    </Button>
                                  </Grid>
                                </Grid>
                              </p>
                            </h6>
                          </Grid>
                          <Grid item md={2} sm={2} xs={2}>
                            <h5></h5>
                          </Grid>
                        </Grid>
                      </Card>
                      <br />
                    </>
                  ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <br />
    </Container>
  );
};

export default Todo;
