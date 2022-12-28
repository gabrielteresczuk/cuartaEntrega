import React from 'react'

function Estrella({cantidad}) {

        let prueba=[];
        for (let index = 0; index < 5; index++) {
            if(index < cantidad){
                prueba.push(<span key={index} className="material-symbols-outlined star_full">star</span>);
            }else{
                prueba.push(<span key={index} className="material-symbols-outlined star_empty">star</span>);
            }
        }

        
        return (
           <>{prueba}</> 
          )


}

export default Estrella