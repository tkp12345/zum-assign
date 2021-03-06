
/*************************************************************************
 * π¨ νμ΄κ³Όμ  :
 *
 * 1.state κ° λ³ν λ λλ§λ€ κ°μ κ°μ§νκ³  μΆμμ΅λλ€
 *κ·Έλμ μλ°μ€ν¬λ¦½νΈμμ μ κ³΅νλ Proxy κ°μ²΄λ₯Ό μκ°νμ΅λλ€
 *
 * 2.Proxy κ°μ²΄λ₯Ό κ°μ§κ³  state κ°μ λ³κ²½νλλ°λ μ±κ³΅νμΌλ
 *observe(compute) νλ κ³Όμ μμ  compute μ state κ΄λ¦¬λ₯Ό νμ§λͺ»νμ΅λλ€
 *
 * 3.κ·Έλμ observe ν¨μμμ λ§€κ°λ³μλ‘ λ°μ callback μ κ΄λ¦¬νκΈ° μν λ°©ν₯μ μκ°νμ΅λλ€
 *
 **************************************************************************/


//oberve μ observable μμ μ μ­μΌλ‘ μνλ₯Ό κ°μ§ν΄μΌνκΈ° λλ¬Έμ ν λΉ
let callbackState ;
//μ΄μ  ν λΉκ° μ μ₯ κ°μ²΄
let prevValue={};

//μνλ³κ²½ κ°μ§  check ν¨μ
function sameValCheck(prevValue,target , prop, value){
    if(Object.keys(prevValue).length){
        if(prevValue[prop] === value)
            return true;
    }
    return false;
}

export function observe(callback) {
    //λ§€κ°λ³μλ‘ λ°μ callback μ μ°Έμ‘°
    callbackState = callback;
    return callback();

    //μ΄κΈ°ν
    callbackState=null;
}

export function observable(obj) {

    let callbackDetect={}

    const result = new Proxy(obj,{
        get(target, prop,receiver){
            if(prop){
                callbackDetect[prop] = new Set();
            //callback μν κ°μ§
            if(callbackState){
                callbackDetect[prop].add(callbackState);
            }
            return target[prop]
        }
        },
        set(target,prop,value,receiver){
            if( !sameValCheck(prevValue,target , prop, value)){
            if(prop && value) {
                if (prop == 'a' && value === 10) {
                    target[prop] = value
                    prevValue[prop]=value
                    callbackDetect[prop].forEach(callback => callback())
                    return true
                }
                if (prop == 'b' && value === 20) {
                    target[prop] = value
                    prevValue[prop]=value
                    callbackDetect[prop].forEach(callback => callback())
                    return true
                }
            }

            }
            return true
        }
    })
    return result;
}

