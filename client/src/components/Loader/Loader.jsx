import React from 'react';
import { LineWave } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className='loader grid place-items-center'>
      <LineWave
        height='300'
        width='300'
        color='#4fa94d'
        ariaLabel='line-wave'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
        firstLineColor=''
        middleLineColor=''
        lastLineColor=''
      />
    </div>
  );
};

export default Loader;
