import { useState } from "react";
export default function Player ({initialName,symbol,isActive,onChangeName}){
   const[playerName,setPlayerName]= useState(initialName);
    const[ isEditing,setIsEditing]= useState(false);

    function handleEditClick(){
      setIsEditing((editing )=>!isEditing);
      if (isEditing){
        onChangeName(symbol,playerName);
      }
     

    }
    function handleChange(event){
      
        setPlayerName(event.target.value);
    }
    let  editablePlayerName =  <span className="player-name">{playerName}</span>;
    let btnCaption='edit';
    if (isEditing){
        editablePlayerName=<input type="text" required Value={playerName} onChange={handleChange}/>;
        btnCaption='Save';
    }
   
    return  (
    <li className={isActive ?'active' :undefined}>
    <span className="player">
      {editablePlayerName}
   <span className="player-symbol">{symbol}</span>
    </span>
   <button onClick={handleEditClick}>{isEditing ? "save" :'Edit'}</button>
   </li>
    );
}