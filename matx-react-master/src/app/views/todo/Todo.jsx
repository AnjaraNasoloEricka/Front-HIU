import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Grid,
  IconButton,
  Icon,
} from "@mui/material";
import jwt from "jwt-decode";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import { useEffect, useState } from "react";
import { Breadcrumb, MatxLoading, SimpleCard } from "app/components";
import { render } from "react-dom";
// import MyTimeTable from "./MyTimeTable";
import FormDialogAddTodo from "app/components/MatxDialog/FormDialogAddTodo";
import { CheckBox } from "@mui/icons-material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SimpleCheckbox from "../material-kit/checkbox/SimpleCheckbox";
import { Link, useNavigate } from "react-router-dom";
import FormDialogUpdateTodo from "app/components/MatxDialog/FormDialogUpdateTodo";
import { BASE_URL, TOKEN } from "app/config";
import axios from "axios";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [isLoadingTodo, setIsLoadingTodo] = useState(false);
  const [isLoadingCheckTodo, setIsLoadingCheckTodo] = useState("");
  const [isLoadingNewTodo, setIsLoadingNewTodo] = useState(false);
  const [isLoadingDeleteTodo, setIsLoadingDeleteTodo] = useState("");
  const [isLoadingUpdateTodo, setIsLoadingUpdateTodo] = useState("");

  function initializeTodo() {
    setIsLoadingTodo(true);
    axios
      .get(`${BASE_URL}/todo`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": TOKEN,
        },
      })
      .then((e) => {
        const data = e.data;
        // console.log(data);
        setTodo(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoadingTodo(false);
      });
  }

  function changeCheck(task) {
    const newTodo = todo.map((singleTodo) => {
      if (singleTodo._id === task._id) {
        const newSingleTodo = {
          ...singleTodo,
          isDone: "yes",
        };
        return newSingleTodo;
      } else {
        return singleTodo;
      }
    });
    setTodo([...newTodo]);
    setIsLoadingCheckTodo(task._id);
    // https://mini-hiu-2023-api.vercel.app/todo/finir/
    fetch(`${BASE_URL}/todo/finir/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": TOKEN,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoadingCheckTodo("");
      });
  }

  const deleteTodo = (task) => {
    // https://mini-hiu-2023-api.vercel.app/todo/
    setIsLoadingDeleteTodo(task._id);
    fetch(`${BASE_URL}/todo/${task._id}`, {
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
      .then((data) => {
        const newTodo = todo.filter((singleTodo) => {
          return singleTodo._id !== task._id;
        });
        setTodo([...newTodo]);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoadingDeleteTodo("");
      });
  };

  useEffect(() => {
    initializeTodo();
  }, []);

  const addNewTodo = (todoToAdd) => {
    // setIsLoadingCheckTodo()
    setIsLoadingNewTodo(true);
    fetch(`${BASE_URL}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": TOKEN,
      },
      body: JSON.stringify({
        tache: todoToAdd,
      }),
    })
      .then((response) => response.json())
      .then((resp) => {
        const userToken = TOKEN;
        const user = jwt(userToken);
        // console.log(user);
        const idInserted = resp?.program?.insertedId;
        const dateToday = new Date();
        const isDone = "no";
        const tache = todoToAdd;
        const newTodoObj = {
          data_today: dateToday,
          isDone: isDone,
          tache: tache,
          _id: idInserted,
          etudiantId: user.id,
        };
        const newTodo = [...todo, { ...newTodoObj }];
        setTodo(newTodo);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoadingNewTodo(false);
      });
  };

  const updateTodo = (newTodo) => {
    setIsLoadingUpdateTodo(newTodo?._id);
    fetch(`${BASE_URL}/todo/${newTodo?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": TOKEN,
      },
      body: JSON.stringify({
        tache: newTodo?.tache,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedTodos = todo.map((singleTodo) => {
          if (singleTodo._id === newTodo._id) {
            return newTodo;
          }
          return singleTodo;
        });
        setTodo([...updatedTodos]);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoadingUpdateTodo("");
      });
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <br />
        <Grid container spacing={10}>
          <Grid item md={6} sm={6} xs={6}>
            <Breadcrumb
              routeSegments={[{ name: "To do List", path: "/todo" }]}
            />
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
            <div
              style={{
                textAlign: "center",
              }}
            >
              <h4
                style={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                A faire <FormDialogAddTodo addNewTodo={addNewTodo} />
              </h4>
            </div>
            {isLoadingTodo ? (
              <MatxLoading />
            ) : (
              <CardContent style={{ backgroundColor: "#212841" }}>
                {todo.filter((singleTodo) => singleTodo.isDone === "no")
                  .length <= 0 && (
                  <p style={{ textAlign: "center", color: "white" }}>
                    Aucune tache à faire pour le moment ...
                  </p>
                )}
                {todo &&
                  todo
                    .filter((item) => item.isDone === "no")
                    .map((item) => (
                      <>
                        <Card style={{ borderRadius: 0 }}>
                          <Grid container spacing={1}>
                            <Grid item md={1} sm={1} xs={1}></Grid>
                            <Grid item md={1} sm={1} xs={1}>
                              <h5></h5>
                            </Grid>
                            <Grid item md={8} sm={8} xs={8}>
                              <h6
                                style={{
                                  fontSize: "13px",
                                  display: "flex",
                                  justifyContent: "start",
                                  alignItems: "center",
                                }}
                              >
                                {/* Modification */}
                                {isLoadingUpdateTodo === item._id ? (
                                  <MatxLoading />
                                ) : (
                                  <>
                                    <FormDialogUpdateTodo
                                      updateTodo={updateTodo}
                                      todo={item}
                                    />
                                  </>
                                )}
                                {/* Suppression */}
                                {isLoadingDeleteTodo === item._id ? (
                                  <>
                                    <MatxLoading />
                                    <p style={{ textAlign: "center" }}>
                                      Suppression en cours de la tache{" "}
                                      {item.tache}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <IconButton
                                      onClick={() => {
                                        deleteTodo(item);
                                      }}
                                    >
                                      <Icon color="error">deleteforever</Icon>
                                    </IconButton>
                                    {item.tache}
                                  </>
                                )}
                              </h6>
                            </Grid>
                            <Grid item md={2} sm={2} xs={2}>
                              <h5>
                                {isLoadingCheckTodo === item._id ? (
                                  <MatxLoading />
                                ) : (
                                  <Checkbox
                                    color="primary"
                                    value="checkedG"
                                    onChange={() => changeCheck(item)}
                                  />
                                )}
                              </h5>
                            </Grid>
                          </Grid>
                        </Card>
                        <br />
                      </>
                    ))}
                {isLoadingNewTodo ? (
                  <>
                    <MatxLoading />
                    <p style={{ textAlign: "center", color: "white" }}>
                      Ajout de tache en cours ...
                    </p>
                  </>
                ) : (
                  <></>
                )}
              </CardContent>
            )}
          </Card>
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <Card title="To do List" style={{ width: "100%" }}>
            <center>
              <h4
                style={{
                  padding: "7px 0px",
                }}
              >
                Fait
              </h4>
            </center>
            {isLoadingTodo ? (
              <MatxLoading />
            ) : (
              <CardContent style={{ backgroundColor: "#212841" }}>
                {todo.filter((singleTodo) => singleTodo.isDone === "yes")
                  .length <= 0 && (
                  <p style={{ textAlign: "center", color: "white" }}>
                    Aucune tache terminée pour le moment ...
                  </p>
                )}
                {todo &&
                  todo
                    .filter((item) => item.isDone !== "no")
                    .map((item) => (
                      <>
                        <Card style={{ borderRadius: 0 }}>
                          <Grid container spacing={1}>
                            <Grid item md={1} sm={1} xs={1}></Grid>
                            <Grid item md={1} sm={1} xs={1}>
                              <h5></h5>
                            </Grid>
                            <Grid item md={8} sm={8} xs={8}>
                              <h6 style={{ fontSize: "13px" }}>
                                {isLoadingDeleteTodo === item._id ? (
                                  <>
                                    <MatxLoading />
                                    <p style={{ textAlign: "center" }}>
                                      Suppression en cours de la tache{" "}
                                      {item.tache}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <IconButton
                                      onClick={() => {
                                        deleteTodo(item);
                                      }}
                                    >
                                      <Icon color="error">deleteforever</Icon>
                                    </IconButton>
                                    {item.tache}
                                  </>
                                )}
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
            )}
          </Card>
        </Grid>
      </Grid>

      <br />
    </Container>
  );
};

export default Todo;
