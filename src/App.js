import "./App.css";
import { useEffect, useState } from "react";
import { Checkbox } from "./Checkbox";

const App = () => {
  const [data, setData] = useState([]);
  const [goal, setGoal] = useState("");
  // const [togoal, setTogoal] = useState(data)

  useEffect(() => {
    fetch("https://rahuljaim-api-express-mongodb.herokuapp.com/api/goals/")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  ///////////////////////////////
  const submitHandler = (e) => {
    fetch("https://rahuljaim-api-express-mongodb.herokuapp.com/api/goals/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: goal,
      }),
    })
      .then(
        (response) => response.json()
        //do something awesome that makes the world a better place
      )
      .then((json) => console.log(json));
  };
  ////////////////////////////////////
  const deleteTask = (e) => {
    fetch(
      `https://rahuljaim-api-express-mongodb.herokuapp.com/api/goals/${e}`,
      {
        method: "delete",
      }
    )
      .then((response) => response.json())
      .then((json) => console.log("json ", json));

    let updatedData = data.filter((item) => item._id !== e);
    setData(updatedData);
  };

  //////////////////////////////////////
  const updateCheckStatus = (index) => {
    setData(
      data.map((goal) =>
        goal._id === index ? { ...goal, checked: !goal.checked } : goal
      )
    );
  };
  //////////////////////////////////////
  const updateTask = (goal_id, newdata) => {
    fetch(
      `https://rahuljaim-api-express-mongodb.herokuapp.com/api/goals/${goal_id}`,
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newdata,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => console.log("json ", json));

    // let updatedData = data.filter(item=>item._id !==goal_id);
    // setData(updatedData);
  };

  ////////////////////////////////////////////
  return (
    <div className="App">
      {data.map((goal) => (
        <Checkbox
          key={goal._id}
          isChecked={goal.checked}
          checkHandler={() => updateCheckStatus(goal._id)}
          label={goal.text}
          index={goal._id}
          deleteHandler={() => deleteTask(goal._id)}
          submitHandler={(newdata) => updateTask(goal._id, newdata)}
        />
      ))}

      <form>
        <input
          type="text"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
        />
        <button type="submit" onClick={submitHandler}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
