begin;

create or replace function public.save_assignment(p_assignment_id uuid,p_revision integer,p_annotations jsonb,p_submit boolean,p_turn_ratings jsonb) returns jsonb language plpgsql security definer set search_path = '' as $$
declare current_row public.assignments; transcript jsonb; rubric jsonb;
begin
 select * into current_row from public.assignments where id=p_assignment_id for update;
 if current_row.id is null or (current_row.annotator_id is distinct from auth.uid() and not public.is_admin()) then raise exception 'Assignment access denied' using errcode='42501'; end if;
 if current_row.revision<>p_revision then raise exception 'Revision conflict. Export your draft and reload the latest saved version before editing.' using errcode='40001'; end if;
 if current_row.status='submitted' then raise exception 'Submitted assignment is read only'; end if;
 select c.transcript into transcript from public.conversations c where id=current_row.conversation_id;
 select snapshot into rubric from public.rubric_versions where hash=current_row.rubric_hash;
 perform public.validate_annotations(transcript,p_annotations,rubric,false);
 perform public.validate_turn_ratings(transcript,p_turn_ratings,rubric,p_submit);
 update public.assignments set annotations=p_annotations,turn_ratings=p_turn_ratings,revision=revision+1,status=case when p_submit then 'submitted' else 'in_progress' end,updated_at=now(),submitted_at=case when p_submit then now() else null end where id=p_assignment_id returning * into current_row;
 insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation) values(current_row.id,current_row.revision,current_row.annotations,current_row.turn_ratings,current_row.status,auth.uid(),case when current_row.annotator_id is distinct from auth.uid() then case when p_submit then 'admin_submit' else 'admin_edit' end else 'save' end);
 return to_jsonb(current_row);
end; $$;

commit;
