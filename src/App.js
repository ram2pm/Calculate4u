import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

import { isFunctionTypeNode } from "typescript";

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
    { value: 7, id: "nine" },
    { value: 8, id: "eight" },
    { value: 9, id: "seven" },
    { value: 4, id: "six" },
    { value: 5, id: "five" },
    { value: 6, id: "four" },
    { value: 1, id: "three" },
    { value: 2, id: "two" },
    { value: 3, id: "one" },
    { value: 0, id: "zero" },
  ];

  const formula = [];
  let lastType;

  const handleInput = (val, type) => {
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

  const SmallBtn = ({ value, type }) => {
    return (
      <button
        id={type}
        onClick={(e) => handleInput(value, type, e)}
        className="col-3 d-flex justify-content-center align-items-center"
        style={{
          borderRight: "1px solid grey",
          borderBottom: "1px solid grey",
          height: "3em",
          backgroundColor: "#151515",
          padding: "0",
        }}
      >
        <p style={{ margin: "0" }}>{value}</p>
      </button>
    );
  };

  return (
    <div className="App d-flex justify-content-center align-items-center">
      <div className="container w-25 h-75 bg-white rounded d-flex flex-column p-0">
        <div
          id="output"
          className="d-flex align-items-center justify-content-end pe-3"
          style={{
            fontSize: "1.3em",
            backgroundColor: "black",
            height: "2.5em",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          <p id="display" style={{ margin: "0" }}>
            0
          </p>
        </div>

        <div className="d-flex flex-column">
          <div
            className="row p-0 ms-3 d-flex w-75 flex-start"
            style={{ marginTop: "1em", width: "95%" }}
          >
            {numbers.map((item) => {
              return (
                <SmallBtn
                  value={item.value}
                  type={item.id}
                  key={Math.random()}
                />
              );
            })}

            <SmallBtn value="." type="decimal" />

            {/* {operations.map((item) => {
              return (
                <SmallBtn
                  value={item.value}
                  type={item.operation}
                  key={Math.random()}
                />
              );
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}
