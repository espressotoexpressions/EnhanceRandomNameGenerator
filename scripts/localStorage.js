
function addName(nameToAdd){
    let nameList=retrieveNames();

    if (nameList !=null){
        if (!nameList.some(nameItem=>nameItem.name.toLowerCase()===nameToAdd.toLowerCase() ))//check if name exists in the list
            {

                nameList.push({id: nameList.length+1,name :nameToAdd});
                localStorage.setItem('Names',JSON.stringify(nameList));
            }
            else{
                console.log("you cannot add the same name");
                return false;
            }
        
       }
       else 
       {    // to catch if no localstorage exist yet
            nameList=[];// initialize to an array
           nameList.push({id:1,name :nameToAdd});
           localStorage.setItem('Names',JSON.stringify(nameList));
       }
       return true;
     
}

function deleteName(idToDelete){
    let nameList=retrieveNames();
    let index =nameList.findIndex(nameItem=>nameItem.id==idToDelete);// find the index of the item wewant to delete
    console.log("INDEX TO DELETE" +index);
    nameList.splice(index, 1); //remove it from the list based on index
    console.log(nameList);
    localStorage.setItem('Names', JSON.stringify(nameList));
}


function retrieveNames(){
   
    let namesData = localStorage.getItem('Names');
    // console.log("NAMES DATA DATA" +(namesData));
    return JSON.parse(namesData);

}


export{addName, deleteName,retrieveNames}