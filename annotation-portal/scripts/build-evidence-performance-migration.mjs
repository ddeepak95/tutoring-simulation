import fs from 'node:fs';
const source=fs.readFileSync('supabase/migrations/202610090002_remove_issue_correction_status.sql','utf8');
const start=source.indexOf('create or replace function public.validate_annotations('),end=source.indexOf('end; $$;',start)+8;
let validator=source.slice(start,end);
const old="for i in 0..start_position loop if substr(source, i + 1, char_length(ev->>'quote')) = ev->>'quote' then matches := matches + 1; end if; end loop;";
if(!validator.includes(old))throw new Error('Unexpected evidence validator; review required.');
validator=validator.replace(old,"matches := public.evidence_occurrence(source,ev->>'quote',start_position);");
const helpers=`create or replace function public.utf16_offset(source text, units integer) returns integer language plpgsql immutable strict set search_path='' as $$
declare consumed integer:=0; position integer:=0; character text;
begin
 if units<0 then raise exception 'Invalid evidence offset'; end if;
 if units=0 then return 0; end if;
 for character in select regexp_split_to_table(source,'') loop
  exit when consumed>=units;
  if character='' then continue; end if;
  consumed:=consumed+case when ascii(character)>65535 then 2 else 1 end;
  position:=position+1;
 end loop;
 if consumed<>units then raise exception 'Evidence offset is outside text or splits a Unicode character'; end if;
 return position;
end; $$;
create function public.evidence_occurrence(source text, quote text, start_position integer) returns integer language plpgsql immutable strict set search_path='' as $$
declare remaining text:=left(source,start_position+char_length(quote)); candidate integer; matches integer:=0;
begin
 if quote='' or start_position<0 then raise exception 'Invalid evidence quotation or position'; end if;
 candidate:=strpos(remaining,quote);
 while candidate>0 loop
  matches:=matches+1;
  remaining:=substr(remaining,candidate+1);
  candidate:=strpos(remaining,quote);
 end loop;
 return matches;
end; $$;
`;
fs.writeFileSync('supabase/migrations/202610100005_evidence_performance.sql','-- Preserve exact UTF-16 evidence and overlapping occurrences while avoiding per-character source slicing.\nbegin;\n'+helpers+validator+'\nrevoke all on function public.utf16_offset(text,integer),public.evidence_occurrence(text,text,integer),public.validate_annotations(jsonb,jsonb,jsonb,boolean) from public,anon,authenticated;\ncommit;\n');
let runner=fs.readFileSync('scripts/migrate-admin-edits.mjs','utf8').replaceAll('202610100003','202610100005').replaceAll('admin_edit_annotations.sql','evidence_performance.sql');
runner=runner.replace("position('admin_edit' in prosrc)>0 and position('public.is_admin()' in prosrc)>0 and prosecdef and proconfig @> array['search_path=\"\"'] and has_function_privilege('authenticated',oid,'EXECUTE')", "position('evidence_occurrence' in prosrc)>0 and proconfig @> array['search_path=\"\"'] and not has_function_privilege('authenticated',oid,'EXECUTE')").replaceAll('public.save_assignment(uuid,integer,jsonb,boolean,jsonb)','public.validate_annotations(jsonb,jsonb,jsonb,boolean)');
fs.writeFileSync('scripts/migrate-evidence-performance.mjs',runner);
