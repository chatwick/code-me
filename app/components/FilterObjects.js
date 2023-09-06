import { useEffect, useState } from 'react';

const FilterObjects = (stack) => {
  // const [ObjectFile, setObjectFile] = useState([]);
  const [FileContent, setFileContent] = useState(0);
  const [FileContentType, setFileContentType] = useState(0);
  const [File, setFile] = useState([]);
  const [data, setData] = useState(null);

  const pushOperations = [];
  const operations = [];

  useEffect(() => {
      const stackName = stack
      const pushRegex = new RegExp(`${stackName}\\.push\\((\\d+)\\)`, 'g');
      const operationRegex = new RegExp(`(${stackName}\\.push|${stackName}\\.pop)\\(`, 'g');
      
      fetch('/code.java')
      .then((response) => response.text())
      .then((data) => {
        // console.log(data);
        setData(data)
        // get stack data from the file
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
        setFileContent(pushOperations)
        setFileContentType(operations)
        
        let mainObj = []
        let mainArr = 0 
      
        while(FileContent.length-1 >= mainArr){
          
          let subArr = mainArr
        let subObj = []
        let index = 0
        
        while(subArr >= index){
          
          let parentId = index - 1;
          if(index === 0) parentId = null;
          
          let chileId = index + 1;
          if(index === subArr) chileId = null;
          
          subObj.push({
            "id":index,
            "value":FileContent[index],
            "parent_id":parentId,
            "left_id":null,
            "right_id":chileId
          })
          
          index = index + 1;
        }
        
        mainObj.push(subObj) 
        mainArr = mainArr + 1
        // console.log('Main index : ',mainArr,'Object : ',subObj);
      }
      
      // console.log('Main object : ',mainObj);
      console.log('Object in FilerObject : ',mainObj);
      setFile(mainObj)
      
      // return mainObj
      // }
    })
    .catch((error) => {
      console.error('Error fetching the file:', error);
    });
    
  }, [data]);
  
  return File

}
export default FilterObjects

        // const mainObj1 = []
        // mainObj1.push([
          //   {
            //     "id":0,
            //     "value":87,
            //     "parent_id":null,
            //     "left_id":null,
            //     "right_id":null
            //   }
            // ])
            // mainObj1.push(
              //   [
                //     {
                  //       "id":0,
                  //       "value":87,
                  //       "parent_id":null,
                  //       "left_id":null,
                  //       "right_id":1
                  //     },
                  //     {
                    //       "id":1,
                    //       "value":24,
                    //       "parent_id":0,
                    //       "left_id":null,
                    //       "right_id":null
                    //     }
                    //     ]
                    //   )
                    //   mainObj1.push(
                      //   [
                        //     {
                          //       "id":0,
                          //       "value":87,
                          //       "parent_id":null,
                          //       "left_id":null,
                          //       "right_id":1
                          //     },
                          //     {
                            //       "id":1,
                            //       "value":24,
      //       "parent_id":0,
      //       "left_id":null,
      //       "right_id":2
      //     },
      //     {
        //       "id":2,
        //       "value":14,
        //       "parent_id":1,
        //       "left_id":null,
        //       "right_id":null
        //     }
        //     ]
        //   )
        // console.log(mainObj1);
        // return mainObj1
