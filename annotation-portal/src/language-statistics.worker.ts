import {languageStatistics,type StatisticalInput} from './language-statistics';
self.onmessage=(event:MessageEvent<StatisticalInput>)=>{
 try{self.postMessage({report:languageStatistics(event.data)});}catch(error){self.postMessage({error:error instanceof Error?error.message:String(error)});}
};
