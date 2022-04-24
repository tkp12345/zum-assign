
/*************************************************************************
 * 👨 풀이과정 :
 *
 * 1.state 가 변화 될떄마다 값을 감지하고 싶었습니다
 *그래서 자바스크립트에서 제공하는 Proxy 객체를 생각했습니다
 *
 * 2.Proxy 객체를 가지고 state 값을 변경하는데는 성공했으나
 *observe(compute) 하는 과정에서  compute 의 state 관리를 하지못했습니다
 *
 * 3.그래서 observe 함수에서 매개변수로 받은 callback 을 관리하기 위한 방향을 생각했습니다
 *
 **************************************************************************/



//3
//oberve 와 observable 에서 상태를 감지해야하기 떄문에 전역으로
let callbackState ;

export function observe(callback) {
    //매개변수로 받은 callback 을 참조
    callbackState = callback;
    return callback();

    //초기화
    callbackState=null;
}

export function observable(obj) {
    //2
    let callbackDetect={}

    const result = new Proxy(obj,{
        get(target, prop,receiver){
            if(prop){
                callbackDetect[prop] = new Set();
            //callback 상태 감지
            if(callbackState){
                callbackDetect[prop].add(callbackState);
            }
            return target[prop]
        }
        },
        set(target,prop,value,receiver){
            if(prop && value) {
                if (prop == 'a' && value === 10) {
                    target[prop] = value
                    callbackDetect[prop].forEach(callback => callback())
                    return true
                }
                if (prop == 'b' && value === 20) {
                    target[prop] = value
                    callbackDetect[prop].forEach(callback => callback())
                    return true

                }
            }
        }
    })
    return result;
}

