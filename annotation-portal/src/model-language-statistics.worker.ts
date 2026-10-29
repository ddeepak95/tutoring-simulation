import {languageStatistics,type StatisticalInput} from './language-statistics';
self.onmessage=(event:MessageEvent<{model:string;input:StatisticalInput}[]>)=>{
 try{self.postMessage({reports:event.data.map(({model,input})=>({model,report:languageStatistics(input)}))});}
 catch(error){self.postMessage({error:error instanceof Error?error.message:String(error)});}
};
