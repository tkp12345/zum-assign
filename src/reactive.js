//state 가 변화 될떄마다 값을 감지하고 싶었습니다
//그래서 자바스크립트에서 제공하는 Proxy 객체를 생각했습니다

export function observe(callback) {

  return callback();
}

function observable(obj) {

    let result = new Proxy(obj,{

        set(target,prop,value){
            if(prop =='a' && value === 10){
                target[prop] = value
                // return target
            }
            if(prop =='b' && value === 20){
                target[prop] = value
            }
        }
    })
    return result;
}


