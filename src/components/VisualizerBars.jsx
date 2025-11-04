import React from 'react';
import './VisualizerBars.css';

const VisualizerBars = ({ array, pivot = null, comparing = [], sorted = [] }) => {
  console.log(array)
  return (
    <div className='array-container'>
      {
        array.map((value, index) => {
          // console.log(value);
          var barClass = 'array-bar default';
          if(pivot === index) {
            barClass = 'array-bar pivot';
          }
          else if (comparing.includes(index)) {
            barClass = 'array-bar comparing';
          } else if (sorted.includes(index)) {
            barClass = 'array-bar sorted';
          }
          return (
            <div 
              className={barClass} 
              key={index} 
              style={{height: `${value}px`}}
            >
              {value > 10 && (<span className="bar-number">{value}</span>)}
            </div>
          );
        })
      }
    </div>
  )
}

export default VisualizerBars