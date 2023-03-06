import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

export default function App() {
  const operations = [
    { value: "+", operation: "add" },
    { value: "-", operation: "subtract" },
    { value: "/", operation: "divide" },
    { value: "*", operation: "multiply" },
    { value: "=", operation: "equals" },
    { value: "AC", operation: "clear" },
  ];
  const numbers = [
    { value: 7, id: "seven" },
    { value: 8, id: "eight" },
    { value: 9, id: "nine" },
    { value: 4, id: "four" },
    { value: 5, id: "five" },
    { value: 6, id: "six" },
    { value: 1, id: "one" },
    { value: 2, id: "two" },
    { value: 3, id: "three" },
    { value: 0, id: "zero" },
  ];

  const formula = [];
  let lastType;

  const handleInput = (val, type) => {
    console.log(type);
    let display = document.getElementById("display");
    let dVal = display.innerText;

    if (numbers.find((item) => item.value === val)) {
      if (+dVal === 0) {
        if (dVal.toString().includes(".")) {
          display.innerText = dVal + val;
          lastType = { type: "number", value: val };
        } else {
          display.innerText = val;
          lastType = { type: "number", value: val };
        }
      } else if (formula.length === 0) {
        display.innerText = dVal + val;
        lastType = { type: "number", value: val };
      } else if (dVal.toString().includes(".")) {
        display.innerText = dVal + val;
        lastType = { type: "number", value: val };
      }
    } else {
      switch (val) {
        case "AC":
          display.innerText = 0;
          formula.length = 0;
          console.log(formula);
          break;
        case ".":
          dVal.toString().includes(val)
            ? null
            : (display.innerText = dVal + val);
          break;
        case "+":
          if (lastType.type === "operation" && lastType.value !== "-") {
            formula.pop();
          }
          dVal !== "" ? formula.push(dVal, val) : formula.push(val);
          display.innerText = "";
          lastType = { type: "operation", value: val };
          break;
        case "-":
          if (
            lastType.type === "operation" &&
            formula[formula.length - 1] === "-"
          ) {
            formula.pop();
          } else if (
            lastType.type === "operation" &&
            formula[formula.length - 1] === "-" &&
            dVal === ""
          ) {
            formula.push(val);
            lastType = { type: "operation", value: val };
          } else if (lastType.type === "number" && dVal === "") {
            formula.push("0", val);
            lastType = { type: "operation", value: val };
          }
          dVal !== "" ? formula.push(dVal, val) : formula.push(val);
          display.innerText = "";
          lastType = { type: "operation", value: val };
          break;
        case "*":
          if (lastType.type === "operation" && lastType.value !== "-") {
            formula.pop();
          }
          dVal !== "" ? formula.push(dVal, val) : formula.push(val);
          display.innerText = "";
          lastType = { type: "operation", value: val };
          break;
        case "/":
          if (lastType.type === "operation" && lastType.value !== "-") {
            formula.pop();
          }
          dVal !== "" ? formula.push(dVal, val) : formula.push(val);
          display.innerText = "";
          lastType = { type: "operation", value: val };
          break;
        case "=":
          if (dVal !== "") {
            formula.push(dVal);
          } else if (typeof (formula[formula.length - 1] !== "number")) {
            formula.pop();
            display.innerText = eval(formula.join(""));
          } else {
            null;
          }

          const typeArr = [];

          formula.forEach((item) => {
            if (isNaN(+item)) {
              typeArr.push(formula.indexOf(item));
            }
          });

          let result = eval(formula.join(""));

          for (let i = 0; i < typeArr.length; i++) {
            if (typeArr[i] + 1 === typeArr[i + 1]) {
              if (typeArr.length <= 4 && formula[typeArr.length - 1] !== "-") {
                display.innerText = result;
              } else {
                formula.splice(typeArr[0], typeArr[typeArr.length - 1] - 1);
              }
            } else {
              display.innerText = result;
            }
          }

          display.innerText = eval(formula.join(""));

          formula.length = 0;
          break;
      }
    }
  };

  const buttonStyles = (value) => {
    const isOperation = operations.find((item) => item.value === value);
    if (isOperation && value !== "AC") {
      return "operation";
    } else if (value === "AC") {
      return "AC";
    } else if (value !== 0) {
      return "button";
    } else {
      return "zero";
    }
  };

  const SmallBtn = ({ value, type, width }) => {
    return (
      <button
        id={type}
        onClick={(e) => handleInput(value, type, e)}
        className={buttonStyles(value)}
      >
        <p style={{ margin: "0" }}>{value}</p>
      </button>
    );
  };

  const outputStyles = {
    borderRadius: "3px 3px 0 0",
    fontSize: "1.3em",
    backgroundColor: "black",
    marginTop: "3em",
    height: "4em",
    width: "100%",
    fontWeight: "bold",
  };

  return (
    <div className="App d-flex justify-content-center align-items-center">
      <div id="calculator">
        <div
          id="output"
          className="d-flex align-items-center justify-content-end"
          style={outputStyles}
        >
          <p id="display">0</p>
        </div>

        <div id="keys-container">
          <SmallBtn width="AC" value="AC" type="clear" key={Math.random()} />
          <SmallBtn value="/" type="divide" key={Math.random()} />

          {numbers.slice(0, 3).map((item) => {
            return (
              <SmallBtn value={item.value} type={item.id} key={Math.random()} />
            );
          })}

          <SmallBtn value="*" type="multiply" key={Math.random()} />
          {numbers.slice(3, 6).map((item) => {
            if (item.value !== 0) {
              return (
                <SmallBtn
                  value={item.value}
                  type={item.id}
                  key={Math.random()}
                />
              );
            }
          })}

          <SmallBtn value="-" type="subtract" key={Math.random()} />

          {numbers.slice(6, 9).map((item) => {
            return (
              <SmallBtn value={item.value} type={item.id} key={Math.random()} />
            );
          })}
          <SmallBtn value="+" type="add" key={Math.random()} />

          <SmallBtn width="zero" value={0} type="zero" key={Math.random()} />
          <SmallBtn value="." type="decimal" key={Math.random()} />
          <SmallBtn value="=" type="equals" key={Math.random()} />
        </div>

        {/* {operations.map((item) => {
          if (item.value === "AC")
          return (
              <SmallBtn
                width="wide"
                value={item.value}
                type={item.id}
                key={Math.random()}
              />
            );
        })}
        {numbers.map((item) => {
          return (
            <SmallBtn
              width="small"
              value={item.value}
              type={item.id}
              key={Math.random()}
            />
          );
        })}

        {operations.map((item) => {
          if (item.value !== "AC")
            return (
              <SmallBtn
                width="small"
                value={item.value}
                type={item.id}
                key={Math.random()}
              />
            );
        })}

        <SmallBtn width="small" value="." type="decimal" /> */}
      </div>
    </div>
  );
}
