"use client";
import { useEffect, useState } from "react";
import DiagramFactory from "../CanvasDiagram/DiagramFactory";

function Diagram({ code }) {
  const [FileContent, setFileContent] = useState(0);
  const [FileContentType, setFileContentType] = useState(0);
  const [data, setData] = useState(null);
  const [obj, setObj] = useState([]);
  const [objCount, setCount] = useState(0);
  const [ctx, setCtx] = useState(null);

  const pushOperations = [];
  const operations = [];

  const updateContext = (obj) => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    new DiagramFactory(ctx, 0, obj);
    console.log(data);
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

  //  useEffect(() => {
  //     // const stackName = 'myStack'
  //     const stackName = 'newStack'
  //     const pushRegex = new RegExp(`${stackName}\\.push\\((\\d+)\\)`, 'g');
  //     const operationRegex = new RegExp(`(${stackName}\\.push|${stackName}\\.pop)\\(`, 'g');

  //     setData(code)
  //     console.log('data in code : ',code);
  //       console.log('data in data : ',data);

  //       let match;
  //       while ((match = pushRegex.exec(data)) !== null) {
  //         pushOperations.push(parseInt(match[1]));
  //       }
  //       // get the type of the operation from the file
  //       let match1;
  //       while ((match1 = operationRegex.exec(data)) !== null) {
  //         const operationType = match1[1] === `${stackName}.push` ? 1 : 0;
  //         operations.push(operationType);
  //       }
  //       setFileContent(pushOperations)
  //       setFileContentType(operations)

  //       let mainArr = 0
  //       let testMainObj = []

  //       while(FileContentType.length-1 >= mainArr){

  //       let subArr = mainArr
  //       let index = 0
  //       let zeroTrackerIndex = 0
  //       let testSubObj = []

  //       while(subArr >= index){

  //         if(FileContentType[index] === 0){
  //           zeroTrackerIndex=zeroTrackerIndex+1
  //           testSubObj.pop()
  //         }

  //         if(FileContentType[index] === 1){
  //           testSubObj.push(FileContent[index-zeroTrackerIndex])
  //         }

  //         index = index + 1;
  //       }
  //       testMainObj.push(testSubObj)
  //       mainArr = mainArr + 1
  //     }

  //     let mainObjArr = 0
  //     let mainObj = []

  //     while(testMainObj.length-1 >= mainObjArr){
  //       let subArr = mainObjArr
  //       let subObj = []
  //       let index = 0

  //       while(testMainObj[mainObjArr].length-1 >= index){
  //         let parentId = index - 1;
  //         if(index === 0) parentId = null;

  //         let chileId = index + 1;
  //         if(index === subArr) chileId = null;

  //         subObj.push({
  //           "id":index,
  //           "value":testMainObj[mainObjArr][index],
  //           "parent_id":parentId,
  //           "left_id":null,
  //           "right_id":chileId
  //         })

  //         index = index + 1;
  //       }

  //       mainObjArr = mainObjArr + 1
  //       mainObj.push(subObj)
  //     }
  //     setObj(mainObj)

  //   //###############################################################################
  //   const canvas = document.getElementById("myCanvas");
  //   // Check if the canvas and 2D context are available.

  //   if (canvas) {
  //     const context = canvas.getContext("2d");
  //     // Perform your transformations and draw your diagram here.
  //     context.translate(0, 0);
  //     // Create a DiagramFactory and draw your diagram using the 'context' here.
  //     new DiagramFactory(context, 0, obj[objCount]);
  //     // Update the state with the 2D context.
  //     setCtx(context);
  //   }

  // },[data]);

  useEffect(() => {
    // const stackName = 'myStack'
    const stackName = "newStack";
    const pushRegex = new RegExp(`${stackName}\\.push\\((\\d+)\\)`, "g");
    const operationRegex = new RegExp(
      `(${stackName}\\.push|${stackName}\\.pop)\\(`,
      "g"
    );

    // fetch('/code.java')
    fetch(code)
      // .then((response) => response.text())
      .then((data) => {
        // setData(fileData)
        // setData(code)
        setData(data);
        // get stack data from the file
        // console.log(data);

        let match;
        while ((match = pushRegex.exec(data)) !== null) {
          pushOperations.push(parseInt(match[1]));
        }
        // get the type of the operation from the file
        let match1;
        while ((match1 = operationRegex.exec(data)) !== null) {
          const operationType = match1[1] === `${stackName}.push` ? 1 : 0;
          operations.push(operationType);
        }
        setFileContent(pushOperations);
        setFileContentType(operations);

        // let zeroTracker = []

        // if(Array.isArray(FileContentType)){
        // FileContentType.forEach(function callback(value, index) {
        //     if(value === 0){
        //       zeroTracker.push(index)
        //     }
        //   });
        // }

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
  }, [data]);

  return (
    <div className="grid grid-cols-1">
      <div className="grid grid-cols-2 gap-3 ml-5 mr-5">
        <button className="btn btn-secondary" onClick={handlePrevious}>
          Previous
        </button>
        <button className="btn btn-secondary" onClick={handleNext}>
          Next
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info w-full max-w-xs ml-5"
        />
        <button className="btn btn-secondary ml-5" onClick={handleNext}>
          Visualize
        </button>
      </div>
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

// useEffect(() => {
//       // const stackName = 'myStack'
//       const stackName = 'newStack'
//       const pushRegex = new RegExp(`${stackName}\\.push\\((\\d+)\\)`, 'g');
//       const operationRegex = new RegExp(`(${stackName}\\.push|${stackName}\\.pop)\\(`, 'g');

//       fetch('/code.java')
//       .then((response) => response.text())
//       .then((data) => {

//         // setData(fileData)
//         // setData(code)
//         setData(data)
//         // get stack data from the file
//         // console.log(data);

//         let match;
//         while ((match = pushRegex.exec(data)) !== null) {
//           pushOperations.push(parseInt(match[1]));
//         }
//         // get the type of the operation from the file
//         let match1;
//         while ((match1 = operationRegex.exec(data)) !== null) {
//           const operationType = match1[1] === `${stackName}.push` ? 1 : 0;
//           operations.push(operationType);
//         }
//         setFileContent(pushOperations)
//         setFileContentType(operations)

//         // let zeroTracker = []

//         // if(Array.isArray(FileContentType)){
//         // FileContentType.forEach(function callback(value, index) {
//         //     if(value === 0){
//         //       zeroTracker.push(index)
//         //     }
//         //   });
//         // }

//         let mainArr = 0
//         let testMainObj = []

//         while(FileContentType.length-1 >= mainArr){

//         let subArr = mainArr
//         let index = 0
//         let zeroTrackerIndex = 0
//         let testSubObj = []

//         while(subArr >= index){

//           if(FileContentType[index] === 0){
//             zeroTrackerIndex=zeroTrackerIndex+1
//             testSubObj.pop()
//           }

//           if(FileContentType[index] === 1){
//             testSubObj.push(FileContent[index-zeroTrackerIndex])
//           }

//           index = index + 1;
//         }
//         testMainObj.push(testSubObj)
//         mainArr = mainArr + 1
//       }

//       let mainObjArr = 0
//       let mainObj = []

//       while(testMainObj.length-1 >= mainObjArr){
//         let subArr = mainObjArr
//         let subObj = []
//         let index = 0

//         while(testMainObj[mainObjArr].length-1 >= index){
//           let parentId = index - 1;
//           if(index === 0) parentId = null;

//           let chileId = index + 1;
//           if(index === subArr) chileId = null;

//           subObj.push({
//             "id":index,
//             "value":testMainObj[mainObjArr][index],
//             "parent_id":parentId,
//             "left_id":null,
//             "right_id":chileId
//           })

//           index = index + 1;
//         }

//         mainObjArr = mainObjArr + 1
//         mainObj.push(subObj)
//       }
//       setObj(mainObj)

//     })
//     .catch((error) => {
//       console.error('Error fetching the file:', error);
//     });

//     //###############################################################################
//     const canvas = document.getElementById("myCanvas");
//     // Check if the canvas and 2D context are available.

//     if (canvas) {
//       const context = canvas.getContext("2d");
//       // Perform your transformations and draw your diagram here.
//       context.translate(0, 0);
//       // Create a DiagramFactory and draw your diagram using the 'context' here.
//       new DiagramFactory(context, 0, obj[objCount]);
//       // Update the state with the 2D context.
//       setCtx(context);
//     }

//   },[data]);
