//state 가 변화 될떄마다 값을 감지하고 싶었습니다
//그래서 자바스크립트에서 제공하는 Proxy 객체를 생각했습니다

export function observe(callback) {

  return callback();
}

function observable(obj) {

    let result = new Proxy(obj,{

        set(target,prop){
            console.log(`접근대상 ${prop}`)
            console.log(`접근대상 ${target}`)
            if(prop ==='a'){
                console.log(prop)

            }

            if(prop in target){
                return target[prop];
            }else {
                console.log('hi');
            }
        }
    })
    return result;
}


