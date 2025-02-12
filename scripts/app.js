import { addName, deleteName, retrieveNames } from "./localStorage.js";

let addNameField = document.getElementById("addNameField");
let addNameMsg = document.getElementById("addNameMsg");
let grpCntInput = document.getElementById("grpCnt");
let generateGroupsBtn = document.getElementById("generateGroups");
let groupItemsSection = document.getElementById("groupItemsSection")
let nameItemsSection=document.getElementById("nameItemsSection");

function populateNamesSection() {
    nameItemsSection.innerText="";
  let nameData = retrieveNames();

  if (nameData != null) {
    nameData.map((nameDataItem) => {
      console.log("ID" + nameDataItem.id);
      console.log("Name" + nameDataItem.name);

      const nameEntryTr = document.createElement("tr"); // name item  create
      nameEntryTr.classList.add("border-b", "dark:border-gray-700");

      const nameTxtTh = document.createElement("th");
      nameTxtTh.value = `${nameDataItem.name}`;
     
      nameTxtTh.classList.add(
        "px-4",
        "py-3",
        "font-medium",
        "text-gray-900",
        "whitespace-nowrap",
        "dark:text-white"
      );
      nameTxtTh.innerText=nameDataItem.name;
      nameEntryTr.appendChild(nameTxtTh); // Add the text to the <tr>

      const deleteBtnTd = document.createElement("td");
      deleteBtnTd.classList.add("px-4","py-3", "flex", "items-center");
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtnTd.classList.add("inline-flex",
        "items-center",
        "p-0.5",
        "text-sm",
        "font-medium",
        "text-center",
        "text-gray-500",
        "hover:text-gray-800",
        "rounded-lg" ,
        "focus:outline-none",
        "dark:text-gray-400",
        "dark:hover:text-gray-100"
      );
      deleteBtnTd.appendChild(deleteBtn);

      nameEntryTr.appendChild(deleteBtnTd)

    //   nameItems.appendChild(expenseAmount); // Add the amount to the <li>

     
      // Append the <li> to the parent container
      nameItemsSection.appendChild(nameEntryTr);

    }); //end of mapping from expensesdata from local storage
  } // end of if json data return is null/ expense list is not null
  else
  {
    const emptyNameList=document.createElement('tr');
    emptyNameList.classList.add("border-b", "dark:border-gray-700","font-bold", "text-center");
    emptyNameList.innerText ="No Names Added yet";
    nameItemsSection.appendChild(emptyNameList);

  }
}

addNameField.addEventListener("keydown", (e) => {
  console.log("Name val" + addNameField.value);
  if (e.key == "Enter") {
    console.log("ENTERED");
    if (addNameField.value == "") {
      // if field is empty
      addNameMsg.classList.remove("text-blue-600");
      addNameMsg.classList.add("text-red-700");
      addNameMsg.innerText = "*Please enter a name to add";
    } else {
      if (addName(addNameField.value)) {
        //if name is added to local storage
        addNameMsg.classList.remove("text-red-700");
        addNameMsg.classList.add("text-blue-600");
        addNameMsg.innerText = "Name added!";
        populateNamesSection();
      } else {
        //update message
        addNameMsg.classList.remove("text-blue-600");
        addNameMsg.classList.add("text-red-700");
        addNameMsg.innerText = "Sorry, You cannot add a duplicate name.";
      }
    }
  }
});

function generateGroups(grpCnt){
    groupItemsSection.innerText=""; //reset to not keep appending
    let nameData= retrieveNames();
    let nameArr=[]
    //pull data and put in array for easy access
    if (nameData != null) {
        nameData.map(nameDataItem=> nameArr.push(nameDataItem.name));
        
        let numItemsInGrp  =  Math.ceil((nameArr.length)/grpCnt);
        console.log("num of ITEMS IN GROUP"+numItemsInGrp);
    
        let groupsArr =[]; // array to hold the groups
        for (let i =0; i<grpCnt ;i++) {
                let group=[];
                for (let j=0; j<numItemsInGrp;j++)
                    {
                        let randomIndex= Math.floor(Math.random() * ((nameArr.length-1) - 0 + 1) + 0);
                        console.log("RANDOM INDEX"+ randomIndex);        
                        let namePicked = nameArr[randomIndex];
                        console.log("NAME PICKED" + namePicked);
                        group.push(namePicked);
                        console.log("GROUP LIST "+ group);
                        nameArr.splice(randomIndex, 1)
                        console.log("NAME ARR"+ nameArr);
                        
                    }
                    groupsArr.push (group);
                    console.log("Group ARR"+[i]+". "+groupsArr[i]);    
                    console.log("NAME ARR" +nameArr);
             
            
                        const groupEntryTr = document.createElement("tr"); // name item  create
                        groupEntryTr.classList.add("border-b", "dark:border-gray-700");
                        
                        const groupTxtTh = document.createElement("th");
                        groupTxtTh.innerText = `GROUP #${i}`;
                        groupTxtTh.classList.add(
                            "px-4",
                            "py-3",
                            "font-medium",
                            "text-gray-900",
                            "whitespace-nowrap",
                            "dark:text-white"
                          );
                         groupEntryTr.appendChild(groupTxtTh); // Add the text to the <tr>
            
                          const membersTxtTh = document.createElement("th");
                          membersTxtTh.innerText = groupsArr[i].join(",");
                          membersTxtTh.classList.add(
                              "px-4",
                              "py-3",
                              "font-medium",
                              "text-gray-900",
                              "whitespace-nowrap",
                              "dark:text-white"
                            );
              
                            groupEntryTr.appendChild(membersTxtTh); // Add the text to the <t
                             
                             // Append the <groupEntryTr> to the parent container
                            groupItemsSection.appendChild(groupEntryTr);
                    
            }

       
    }//end of if nameData !=null
    else {
        console.log("Name Array is empty. no names added yet");
    }






}

populateNamesSection();


generateGroupsBtn.addEventListener('click',()=>{
    generateGroups(grpCntInput.value);
})

