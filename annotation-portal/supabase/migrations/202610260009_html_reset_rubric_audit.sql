begin;
-- Rubric-upgrade audit rows predate cascading conversation deletion. They are
-- part of the annotation work being reset, rather than global rubric records.
do $$declare definition text;begin
 definition:=pg_get_functiondef('public.reset_to_html_pilot(uuid,uuid,uuid,uuid[],jsonb)'::regprocedure);
 if position('delete from public.assignment_rubric_upgrades' in definition)=0 then
  definition:=replace(definition,'delete from public.annotation_revisions r using public.assignments a',
   'delete from public.assignment_rubric_upgrades u using public.assignments a where u.assignment_id=a.id and a.conversation_id=any(actual); delete from public.annotation_revisions r using public.assignments a');
  execute definition;
 end if;
end;$$;
commit;
