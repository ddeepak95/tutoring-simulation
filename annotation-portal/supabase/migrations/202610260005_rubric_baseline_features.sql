begin;
-- Dispatch feature admission through the pinned rubric instead of the retired
-- hardcoded taxonomy. Historical rubrics continue to validate their own keys.
do $$
declare signature text; definition text; updated text;
begin
 foreach signature in array array[
  'public.import_llm_baseline(uuid,uuid,text,jsonb,text,text,text,jsonb,uuid)',
  'public.complete_llm_generation(uuid,text,jsonb,text,text,text,jsonb)'
 ] loop
  definition:=pg_get_functiondef(signature::regprocedure);
  updated:=regexp_replace(definition,'a->>''feature'' not in \([^)]*\)','not exists(select 1 from jsonb_array_elements(rubric->''rubric'') feature where feature->>''key''=a->>''feature'')','g');
  if updated=definition then raise exception 'Expected legacy feature guard in %',signature; end if;
  if signature like 'public.import%' then
   updated:=replace(updated,'baseline.annotations is distinct from p_annotations','baseline.annotations is distinct from public.store_section_annotations(p_conversation_id,p_annotations)');
   updated:=replace(updated,'perform public.validate_annotations(conversation,p_annotations,rubric,true);','p_annotations:=public.hydrate_section_annotations(p_conversation_id,p_annotations); perform public.validate_annotations(conversation,p_annotations,rubric,true);');
  else
   updated:=replace(updated,'perform public.validate_annotations(conversation,p_annotations,rubric,true);','p_annotations:=public.hydrate_section_annotations(run.conversation_id,p_annotations); perform public.validate_annotations(conversation,p_annotations,rubric,true);');
  end if;
  execute updated;
 end loop;
end; $$;
commit;
