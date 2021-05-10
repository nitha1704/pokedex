import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const ErrorPage = () => {



    useEffect(()=>{
        const progressPercentage = document.querySelectorAll(
          ".progress-percentage"
        );
        // progressPercentage.forEach((item)=>{
        //     let i = 0;
        //     const dataNumber = +item.getAttribute('data-number');
        //     const innerNumber = +item.innerText;
        //     if (innerNumber > dataNumber) {
        //         item.innerText = i++
        //     } else {
        //         item.innerText = dataNumber;
        //     }

        //     console.log(innerNumber);
            
            
        // })


        const demo = document.querySelector('.demo');
        let i = 0;

        if(i > 3000) {
            setTimeout(()=>{
                i++
                
            },100)
            demo.innerText = i;
        } else {
            demo.innerText = 5000;
        }

        
    })

    

    return (
      <ErrorContainer>
        <h1>404 Page Not Found</h1>

        <div className="wrap-status">
          <div className="status hp">
            <div className="text">HP:</div>
            <div className="percentage">
              <div className="progress-percentage" data-number="80">0</div>
            </div>
          </div>
          <div className="status attack">
            <div className="text">Attack:</div>
            <div className="percentage">
              <div className="progress-percentage" data-number="40">0</div>
            </div>
          </div>
        </div>

        <div className="demo">0</div>
      </ErrorContainer>
    );
}

const ErrorContainer = styled.div`
  .wrap-status {
    .status {
      display: grid;
      grid-template-columns: 100px 1fr;
      margin-bottom: 1%;
    }
    .percentage {
      max-width: 300px;
      height: 30px;
    }
    .progress-percentage {
      background: red;
      width: 0%;
      height: 100%;
    }
  }
`;

export default ErrorPage
