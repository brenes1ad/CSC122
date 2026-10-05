
function sleep(s){
    return new Promise(resolve => setTimeout(resolve, s*1000))
}
async function addup(x,y){
    let s=x+y;
    console.log('Adding up...');
    await sleep(4); //sleep 4 sec.
    console.log('... added up!');
    return s;
}

let r = await addup(1,2);
console.log('RESULT',r);

async function addup2(x,y){
    let s=x+y;
    console.log('Adding up...');
    await sleep(4); //sleep 4 sec.
    console.log('... added up!');
    return s;
}

let t = await addup2(1,3).then(
    v => {console.log('RESULT',v);}
);