import { Box, Button, Container } from "@mui/material";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import { useState } from "react";
import { Breadcrumb, SimpleCard } from "app/components";
import { render } from "react-dom";

const board = {
    columns: [
      {
        id: 1,
        title: "A faire",
        backgroundColor: "#000",
        cards: [
          {
            id: 1,
            title: "Card title 1",
            content: "huhu"
          },
          {
            id: 2,
            title: "Card title 2",
            content: "huhu"
          }
        ]
      },
      {
        id: 2,
        title: "En cours",
        backgroundColor: "#000",
        cards: [
          {
            id: 1,
            title: "Card title 3",
            content: "huhu"
          },
          {
            id: 2,
            title: "Card title 4",
            content: "huhu"
          }
        ]
      },
      {
        id: 3,
        title: "Terminé",
        backgroundColor: "#000",
        cards: [
          {
            id: 1,
            title: "Card title 5",
            content: "huhu"
          },
          {
            id: 2,
            title: "Card title 6",
            content: "huhu"
          }
        ]
      }
    ]
  };


  function UncontrolledBoard() {
    return (
      <Board
        allowRemoveLane
        allowRenameColumn
        allowRemoveCard
        onLaneRemove={console.log}
        onCardRemove={console.log}
        onLaneRename={console.log}
        initialBoard={board}
        allowAddCard={{ on: "top" }}
        onNewCardConfirm={(draftCard) => ({
          id: new Date().getTime(),
          ...draftCard
        })}
        onCardNew={console.log}
      />
    );
  }

  function ControlledBoard() {
    // You need to control the state yourself.
    const [controlledBoard, setBoard] = useState(board);
  
    function handleCardMove(_card, source, destination) {
      const updatedBoard = moveCard(controlledBoard, source, destination);
      setBoard(updatedBoard);
    }
  
    return (
      <Board onCardDragEnd={handleCardMove} disableColumnDrag>
        {controlledBoard}
      </Board>
    );
  }

const Todo=()=>{
    return (      
        <Container>
                <Box className="breadcrumb">
                         <br/>
                         <Breadcrumb routeSegments={[{ name: "Programme", path: "/programme" }]} /> 
                         <br/> 
                </Box>
                <SimpleCard title="To do List">
                    <UncontrolledBoard />
                </SimpleCard> 
                <br/> 
        </Container>

    )
}

export default Todo;

