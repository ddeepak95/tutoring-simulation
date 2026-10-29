export function shouldRetryTranslation(error,beforePassages,afterPassages,attempt){
 if(attempt>=4)return false;
 const deterministic=/incomplete or misaligned|Numbers changed|URL changed|passages do not match/i.test(error.message);
 return !deterministic||afterPassages>beforePassages;
}
