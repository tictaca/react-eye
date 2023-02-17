type Throttle = (func: (p?:any) => void, interval: number) => (p?: any) => void;
const throttle: Throttle = (func, interval) => {   
    let lastTime = Date.now() - interval;
    return (props:any) => {
      if((lastTime + interval) < Date.now()){
        lastTime = Date.now();
        func(props);
      }
    }
}

export default throttle;
