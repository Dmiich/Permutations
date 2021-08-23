import React, { useState } from "react";
import { Formik, Field } from "formik";

export const App = () => {
  const [permutations, setPermutations] = useState([]);
  const [permutationsCount, setPermutationsCount] = useState(0);
  const [permutationsCountConst, setPermutationsCountConst] = useState(0);

  function delay(delayInms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }

  let findPermutations = (string, length) => {
    if (!string || typeof string !== "string") {
      return "Please enter a string";
    }

    if (!!string.length && string.length < 2) {
      return string;
    }

    let permutationsArray = [];

    for (let i = 0; i < string.length; i++) {
      let char = string[i];

      if (string.indexOf(char) != i) continue;

      let remainder = string.slice(0, i) + string.slice(i + 1, string.length);

      for (let permutation of findPermutations(remainder, length)) {
        // console.log(remainder)
        permutationsArray.push(char + permutation);
      }
    }
    
    return permutationsArray;
  };
  
  let animatePermutations = async (array) => {
    setPermutationsCountConst(array.length)
    for (let index = 0; index < array.length; index++) {
      setPermutations((prev) => [...prev, array[index]]);
      setPermutationsCount(index + 1);
      const delayCnost = await delay(2);
    }
  };

  return (
    <div>
      <h1>All possible permutations</h1>
      <h3>{`Combinations count: ${permutationsCount} --> ${permutationsCountConst}`}</h3>
      <Formik
        initialValues={{
          text: "",
        }}
        onSubmit={(data) => {
          const STRING_LENGTH = data.text.length;
          setPermutations([]);
          setPermutationsCount(0);
          // console.log(findPermutations(data.text, STRING_LENGTH));
          const permutationsArray = findPermutations(data.text, STRING_LENGTH);
          permutationsArray.sort()
          animatePermutations(permutationsArray);
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values }) => {
          return (
            <form >
              <button type={"submit"} onClick={handleSubmit}>
                RUN
              </button>
              <input
                type="text"
                name="text"
                value={values.text}
                onChange={handleChange}
                placeholder={"text"}
              ></input>
              <ul>
                {permutations.map((curr, index) => (
                  <li key={index} className="a">
                    <div
                      className={curr === values.text ? "span Message" : 'Message'}
                    >{`${curr}`}</div>
                  </li>
                ))}
              </ul>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
