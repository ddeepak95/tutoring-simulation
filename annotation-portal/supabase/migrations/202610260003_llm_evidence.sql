begin;
-- Optional model justification is separate from canonical source evidence.
alter function public.validate_annotations(jsonb,jsonb,jsonb,boolean) rename to validate_annotations_without_llm_evidence;
create function public.validate_annotations(transcript jsonb, annotations jsonb, rubric jsonb, complete boolean) returns void language plpgsql set search_path = '' as $$
declare a jsonb;
begin
 perform public.validate_annotations_without_llm_evidence(transcript,annotations,rubric,complete);
 for a in select value from jsonb_array_elements(annotations) loop
  if a ? 'llm_evidence' and (jsonb_typeof(a->'llm_evidence') is distinct from 'string'
    or length(btrim(a->>'llm_evidence'))=0 or length(a->>'llm_evidence')>1000
    or a->>'llm_evidence' ~ E'[\r\n]' or position(chr(8232) in a->>'llm_evidence')>0 or position(chr(8233) in a->>'llm_evidence')>0)
   then raise exception 'LLM evidence must be a single nonempty line of at most 1000 characters'; end if;
 end loop;
end; $$;
revoke all on function public.validate_annotations(jsonb,jsonb,jsonb,boolean),public.validate_annotations_without_llm_evidence(jsonb,jsonb,jsonb,boolean) from public,anon,authenticated;
commit;
