// Stage checkpoints are written before generation, before publishing, and after
// publishing. Restarting never regenerates a validated stage or resets repairs.
export async function runCheckpointedPipeline({state,fingerprint,generate,publish,persist,onStage=()=>{}}){
 if(state.fingerprint!==fingerprint)throw new Error('The checkpoint does not match the current conversation, rubric, prompt, or configuration. Start a new job.');
 state.status='running';delete state.error;await persist(state);
 let previous=state.previous;
 try{
  for(const stage of state.stages){
   onStage(stage);
   if(!stage.artifact){stage.artifact=await generate(stage,previous);await persist(state);}
   if(!stage.published){await publish(stage.artifact);stage.published=true;await persist(state);}
   previous=stage.artifact;
  }
  state.status='completed';await persist(state);return previous;
 }catch(error){state.status='failed';state.error={code:error.code||error.name||'generation_error',message:error.message};await persist(state);throw error;}
}
