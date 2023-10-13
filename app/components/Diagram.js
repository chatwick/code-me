"use client";
// this is from master
import { useEffect, useState } from "react";
import DiagramFactory from "../CanvasDiagram/DiagramFactory";
import { firestore } from "../../config/firebase_config";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";

function Diagram() {
  const [FileContent, setFileContent] = useState(0);
  const [FileContentType, setFileContentType] = useState(0);
  const [data, setData] = useState(null);
  const [obj, setObj] = useState([]);
  const [objCount, setCount] = useState(0);
  const [ctx, setCtx] = useState(null);
  const [num1, setNum] = useState(0);
  // const [code, setCode] = useState(
  //   "newStack.push(12)newStack.push(23)newStack.pop()newStack.push(34)newStack.push(45)newStack.push(56)newStack.pop()newStack.pop()"
  // );

  const pushOperations = [];
  const operations = [];

  const updateContext = (obj) => {
    if (ctx) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      new DiagramFactory(ctx, 0, obj);
    }
  };

  const handlePrevious = () => {
    if (objCount === -1) return;
    setCount(objCount - 1);
    const newObj = obj[objCount - 1];
    updateContext(newObj);
  };

  const handleNext = () => {
    if (objCount === obj.length - 1) return;
    setCount(objCount + 1);
    const newObj = obj[objCount + 1];
    updateContext(newObj);
  };

  useEffect(() => {
    // Get the code data from FireStore
    // const stackName = 'myStack'
    const stackName = "newStack";
    const pushRegex = new RegExp(`${stackName}\\.push\\((\\d+)\\)`, "g");
    const operationRegex = new RegExp(
      `(${stackName}\\.push|${stackName}\\.pop)\\(`,
      "g"
    );

    const addAndFetchCode = async (code) => {
      try {
        // Add the code to Firestore and get the document reference
        const docRef = await addDoc(collection(firestore, "code"), {
          code: code,
        });

        console.log(docRef.id);
        // Use the document reference to fetch the code
        const codeDocRef = doc(firestore, "code", "0kaWl97ifllAabq0jgJM");

        // Get the document data
        const docSnapshot = await getDoc(codeDocRef);

        if (docSnapshot.exists()) {
          const codeData = docSnapshot.data().code;
          console.log(codeData);

          fetch(codeData)
            .then((response) => response.text())
            .then((data) => {
              setData(codeData);
              // get stack data from the file
              let match;
              while ((match = pushRegex.exec(codeData)) !== null) {
                pushOperations.push(parseInt(match[1]));
                console.log(pushOperations);
              }
              // get the type of the operation from the file
              let match1;
              while ((match1 = operationRegex.exec(codeData)) !== null) {
                const operationType = match1[1] === `${stackName}.push` ? 1 : 0;
                operations.push(operationType);
                console.log(operationType);
              }
              setFileContent(pushOperations);
              setFileContentType(operations);

              let mainArr = 0;
              let testMainObj = [];

              while (FileContentType.length - 1 >= mainArr) {
                let subArr = mainArr;
                let index = 0;
                let zeroTrackerIndex = 0;
                let testSubObj = [];

                while (subArr >= index) {
                  if (FileContentType[index] === 0) {
                    zeroTrackerIndex = zeroTrackerIndex + 1;
                    testSubObj.pop();
                  }

                  if (FileContentType[index] === 1) {
                    testSubObj.push(FileContent[index - zeroTrackerIndex]);
                  }

                  index = index + 1;
                }
                testMainObj.push(testSubObj);
                mainArr = mainArr + 1;
              }

              let mainObjArr = 0;
              let mainObj = [];

              while (testMainObj.length - 1 >= mainObjArr) {
                let subArr = mainObjArr;
                let subObj = [];
                let index = 0;

                while (testMainObj[mainObjArr].length - 1 >= index) {
                  let parentId = index - 1;
                  if (index === 0) parentId = null;

                  let chileId = index + 1;
                  if (index === subArr) chileId = null;

                  subObj.push({
                    id: index,
                    value: testMainObj[mainObjArr][index],
                    parent_id: parentId,
                    left_id: null,
                    right_id: chileId,
                  });

                  index = index + 1;
                }

                mainObjArr = mainObjArr + 1;
                mainObj.push(subObj);
              }
              setObj(mainObj);
            })
            .catch((error) => {
              console.error("Error fetching the file:", error);
            });

          //###############################################################################
          const canvas = document.getElementById("myCanvas");
          // Check if the canvas and 2D context are available.

          if (canvas) {
            const context = canvas.getContext("2d");
            // Perform your transformations and draw your diagram here.
            context.translate(0, 0);
            // Create a DiagramFactory and draw your diagram using the 'context' here.
            new DiagramFactory(context, 0, obj[objCount]);
            // Update the state with the 2D context.
            setCtx(context);
          }
        } else {
          console.log("Code document not found in Firestore.");
        }
      } catch (error) {
        console.error("Error adding or fetching code from Firestore:", error);
      }
    };

    // Your code to be stored
    const codeToStore = `
const stack = new Stack(10);
stack.push(12);
stack.push(23);
stack.pop();
stack.push(34);
stack.push(45);
stack.push(56);
stack.pop();
stack.pop();
stack.pop();
stack.push(67);
stack.pop();
stack.push(78);
stack.push(89);
stack.pop();
`;

    addAndFetchCode(codeToStore);
  }, [num1]);

  return (
    <div className="grid grid-cols-1">
      <div className="flex justify-center items-center">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="grid grid-cols-3 gap-3">
            <div>
              <button className="btn btn-primary" onClick={handlePrevious}>
                Previous
              </button>
            </div>
            <div>
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary"
                onClick={() => setNum(num1 + 1)}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div>
        <canvas
          id="myCanvas"
          width="500"
          height="500"
          className="border-solid border-spacing-x-1 bg-gray-600"
        ></canvas>
      </div>
    </div>
  );
}

export default Diagram;
