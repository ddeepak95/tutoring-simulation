(function () {
  "use strict";
  const C = window.AnnotationCore, DATA = window.ANNOTATION_DATA, rubric = DATA.rubric;
  const $ = id => document.getElementById(id);
  const STORAGE = "instructional-annotation-studio-v1:" + DATA.rubric_sha256;
  let documents = DATA.samples.map(sample => ({ conversation: C.normalizeConversation(sample), annotations: [] }));
  let currentIndex = 0, annotator = "", selectedEvidence = null, popupAnnotationId = null;
  let editingPopup = false, storageAvailable = true, toastTimer;
  const current = () => documents[currentIndex];
  const featureByKey = key => rubric.find(feature => feature.key === key);
  const identity = conversation => JSON.stringify([conversation.conversation_id, conversation.messages]);
  function element(tag, text, className) {
    const el = document.createElement(tag);
    if (text !== undefined && text !== null) el.textContent = text;
    if (className) el.className = className;
    return el;
  }
  function button(text, action, className) {
    const el = element("button", text, className || "small-button");
    el.type = "button"; el.addEventListener("click", action); return el;
  }
  function featureStyle(node, feature) {
    node.style.setProperty("--feature-color", feature.color);
    node.style.setProperty("--highlight", feature.highlight); return node;
  }
  function notify(message) {
    $("toast").textContent = message; $("toast").hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { $("toast").hidden = true; }, 5000);
  }
  function persist() {
    try {
      localStorage.setItem(STORAGE, JSON.stringify({ rubric_sha256: DATA.rubric_sha256, annotator, documents }));
      storageAvailable = true; $("save-status").textContent = "Saved locally";
    } catch (error) {
      storageAvailable = false; $("save-status").textContent = "Export to save";
      notify("Browser storage is unavailable or full. Export JSON to save your annotations.");
    }
  }
  function restore() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE) || "null");
      if (!saved) return;
      if (saved.rubric_sha256 !== DATA.rubric_sha256) throw new Error("The saved rubric does not match.");
      if (!Array.isArray(saved.documents)) throw new Error("Invalid saved documents.");
      const recovered = saved.documents.map(record => {
        const conversation = C.normalizeConversation(record.conversation);
        return { conversation, annotations: C.validateAnnotations(conversation, record.annotations, rubric, { allowIncomplete: true }) };
      });
      for (const record of recovered) {
        const index = documents.findIndex(d => identity(d.conversation) === identity(record.conversation));
        if (index >= 0) documents[index] = record; else documents.push(record);
      }
      annotator = typeof saved.annotator === "string" ? saved.annotator : "";
      $("save-status").textContent = "Saved locally";
    } catch (error) {
      storageAvailable = false; $("save-status").textContent = "Export to save";
      notify("Could not restore browser data: " + error.message);
    }
  }
  function inlineMarkdown(node, text) {
    for (const token of text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)) {
      if (token.startsWith("**") && token.endsWith("**")) node.append(element("strong", token.slice(2, -2)));
      else if (token.startsWith("`") && token.endsWith("`")) node.append(element("code", token.slice(1, -1)));
      else node.append(document.createTextNode(token));
    }
  }
  function renderGuidance(node, feature) {
    node.replaceChildren();
    const description = element("p"); inlineMarkdown(description, feature.description); node.append(description);
    for (const paragraph of feature.guidance.split("<br><br>")) {
      const p = element("p");
      paragraph.split("<br>").forEach((line, index) => { if (index) p.append(element("br")); inlineMarkdown(p, line); });
      node.append(p);
    }
  }
  function populateSources() {
    $("conversation-select").replaceChildren(...documents.map((record, index) => {
      const option = element("option", record.conversation.label); option.value = String(index); return option;
    }));
    $("conversation-select").value = String(currentIndex);
  }
  function render() {
    const panel = $("conversation"), scrollTop = panel.scrollTop;
    panel.replaceChildren();
    if (!current()) return;
    const conversation = current().conversation;
    $("conversation-meta").textContent = conversation.learning_topic || conversation.label;
    $("turn-count").textContent = conversation.messages.length + " turns";
    conversation.messages.forEach((turn, index) => {
      const section = element("article", null, "turn " + turn.speaker); section.id = "turn-" + index;
      const heading = element("div", null, "turn-heading");
      heading.append(element("span", turn.speaker === "tutor" ? "T" : "S", "speaker-badge"),
        element("strong", turn.speaker === "tutor" ? "Tutor" : "Student"), element("span", turn.turn_id, "turn-id"));
      const body = element("div", null, "turn-body"); body.dataset.turnId = turn.turn_id; body.dataset.speaker = turn.speaker;
      for (const segment of C.highlightedSegments(turn.text, current().annotations, turn.turn_id)) {
        if (!segment.annotations.length) body.append(document.createTextNode(segment.text));
        else {
          const mark = featureStyle(element("mark", segment.text), featureByKey(segment.annotations[0].feature));
          mark.dataset.annotationIds = segment.annotations.map(a => a.id).join(",");
          mark.title = segment.annotations.map(a => featureByKey(a.feature).name).join(" / ");
          mark.tabIndex = 0; mark.setAttribute("role", "button"); mark.setAttribute("aria-label", "Edit " + mark.title);
          body.append(mark);
        }
      }
      section.append(heading, body); panel.append(section);
    });
    panel.scrollTop = scrollTop;
    $("annotation-total").textContent = String(current().annotations.length);
    $("feature-summary").replaceChildren(...rubric.map(feature => {
      const stat = featureStyle(element("div", null, "feature-stat"), feature);
      stat.append(element("span", "", "feature-dot"), element("span", feature.short_label),
        element("strong", String(current().annotations.filter(a => a.feature === feature.key).length)));
      return stat;
    }));
  }
  function storeAnnotation(annotation) {
    const accepted = structuredClone(annotation);
    try { C.validateAnnotations(current().conversation, [accepted], rubric, { allowIncomplete: true }); }
    catch (error) { notify(error.message); return false; }
    const index = current().annotations.findIndex(a => a.id === accepted.id);
    if (index < 0) current().annotations.push(accepted); else current().annotations[index] = accepted;
    persist(); return true;
  }
  function hideSelection() {
    $("selection-menu").hidden = true; popupAnnotationId = null; editingPopup = false;
  }
  function resetPopup(title) {
    $("selection-title").textContent = title;
    for (const id of ["selection-options", "attribute-panel", "popup-choices", "extend-button"]) $(id).hidden = true;
    $("selection-menu").hidden = false;
  }
  function positionSelectionMenu(rect) {
    const menu = $("selection-menu");
    menu.style.left = Math.max(12, Math.min(rect.left, window.innerWidth - menu.offsetWidth - 12)) + "px";
    menu.style.top = Math.max(12, Math.min(rect.bottom + 8, window.innerHeight - menu.offsetHeight - 12)) + "px";
  }
  function positionAttributePopup() {
    const anchor = [...$("conversation").querySelectorAll("mark")].find(mark => mark.dataset.annotationIds.split(",").includes(popupAnnotationId));
    if (anchor) positionSelectionMenu(anchor.getBoundingClientRect());
  }
  function showFeaturePicker() {
    popupAnnotationId = null; editingPopup = false; resetPopup("Annotate as");
    $("selection-options").hidden = false;
    $("extend-button").hidden = !current().annotations.some(a => a.feature !== "questions");
    $("selection-menu").setAttribute("aria-label", "Choose instructional feature");
  }
  function popupStatus() {
    const annotation = current().annotations.find(a => a.id === popupAnnotationId);
    if (!annotation) return;
    const missing = C.missingAttributes(annotation, rubric);
    $("popup-save-status").textContent = storageAvailable ? "Saved automatically" : "Export to save";
    if (missing.length) $("popup-save-status").textContent += " / Details needed: " +
      missing.map(key => featureByKey(annotation.feature).fields.find(field => field.key === key).label).join(", ");
  }
  function updatePopupField(id, key, value) {
    const saved = current().annotations.find(a => a.id === id);
    if (!saved || !C.formFields(featureByKey(saved.feature)).some(field => field.key === key)) return false;
    const updated = structuredClone(saved); updated.entry[key] = value.trim();
    if (updated.feature === "questions" && updated.entry.question_type === "Instructional") updated.entry.concept_checked = null;
    if (!storeAnnotation(updated)) return false;
    popupStatus(); return true;
  }
  function optionDescription(feature, field, value) {
    if (field.key === "detail_level") {
      const description = feature.guidance.split("**" + value + ":**")[1]?.split(/\*\*(?:Brief|Explained|Elaborated):\*\*|<br><br>/)[0].trim();
      return description?.split(", for example,")[0].split(" These are")[0];
    }
    if (field.key === "question_type") {
      const description = feature.guidance.split("**" + value + ":**")[1]?.trim().split(". ")[0];
      return description ? description + "." : null;
    }
    return null;
  }
  function showAttributePopup(id, editing = false) {
    const annotation = current().annotations.find(a => a.id === id); if (!annotation) return;
    const feature = featureByKey(annotation.feature);
    popupAnnotationId = id; editingPopup = editing; resetPopup(feature.name);
    $("attribute-panel").hidden = false; $("popup-feature-control").hidden = !editing;
    $("popup-edit-actions").hidden = !editing;
    $("selection-menu").setAttribute("aria-label", (editing ? "Edit " : "Set ") + feature.name + " attributes");
    $("popup-feature-select").replaceChildren(...rubric.map(item => {
      const option = element("option", item.name); option.value = item.key;
      option.disabled = item.key === "questions" && annotation.evidence.length > 1; return option;
    }));
    $("popup-feature-select").value = annotation.feature;
    const fields = $("attribute-options"); fields.replaceChildren();
    for (const field of C.formFields(feature)) {
      const group = element("div", null, "popup-field");
      const label = element(field.options ? "div" : "label", field.label, "popup-field-label");
      if (!field.options) label.htmlFor = "popup-field-" + field.key;
      group.append(label);
      if (field.options) {
        const options = element("div", null, "attribute-option-group"); options.id = "popup-field-" + field.key;
        options.setAttribute("role", "group"); options.setAttribute("aria-label", field.label);
        options.append(...field.options.map(value => {
          const choice = button("", () => {
            if (!updatePopupField(id, field.key, value)) return;
            for (const option of options.children) option.setAttribute("aria-pressed", String(option.getAttribute("aria-label") === value));
            const saved = current().annotations.find(a => a.id === id);
            if (!editingPopup && !C.missingAttributes(saved, rubric).length) hideSelection();
          }, "detail-level-choice");
          choice.setAttribute("aria-label", value); choice.setAttribute("aria-pressed", String(annotation.entry[field.key] === value));
          choice.append(element("strong", value));
          const explanation = optionDescription(feature, field, value);
          if (explanation) choice.append(element("span", explanation)); return choice;
        }));
        group.append(options);
      } else {
        const input = element("textarea"); input.id = "popup-field-" + field.key; input.rows = 2;
        input.value = annotation.entry[field.key] ?? ""; input.placeholder = "Name the substantive concept or subtopic";
        input.addEventListener("input", () => updatePopupField(id, field.key, input.value)); group.append(input);
      }
      fields.append(group);
    }
    renderPopupEvidence(annotation, editing); popupStatus();
    const menu = $("selection-menu");
    menu.style.top = Math.max(12, Math.min(parseFloat(menu.style.top) || 12, window.innerHeight - menu.offsetHeight - 12)) + "px";
  }
  function renderPopupEvidence(annotation, editing) {
    const container = $("popup-evidence"); container.replaceChildren(); if (!editing) return;
    const details = element("details", null, "popup-evidence-details");
    details.append(element("summary", "Supporting passages (" + annotation.evidence.length + ")"));
    annotation.evidence.forEach((evidence, index) => {
      const item = element("div", null, "evidence-item"), content = element("span");
      content.append(element("strong", evidence.turn_id), element("br"), document.createTextNode(evidence.quote)); item.append(content);
      if (annotation.evidence.length > 1) {
        const remove = button("Remove", () => {
          const updated = structuredClone(current().annotations.find(a => a.id === annotation.id));
          const removed = updated.evidence.splice(index, 1)[0];
          updated.entry.turn_locations = [...new Set(updated.evidence.map(e => e.turn_id))];
          const primary = featureByKey(updated.feature).fields[0].key;
          if (updated.entry[primary] === removed.quote) updated.entry[primary] = updated.evidence[0].quote;
          if (storeAnnotation(updated)) { render(); showAttributePopup(updated.id, true); positionAttributePopup(); }
        });
        remove.setAttribute("aria-label", "Remove passage " + (index + 1)); item.append(remove);
      }
      details.append(item);
    }); container.append(details);
  }
  function startNew(key) {
    if (!selectedEvidence) return;
    let annotation = current().annotations.find(a => a.feature === key && a.evidence.some(e =>
      e.turn_id === selectedEvidence.turn_id && e.start === selectedEvidence.start && e.end === selectedEvidence.end));
    if (!annotation) {
      const id = crypto.randomUUID ? crypto.randomUUID() : "annotation-" + Date.now() + "-" + Math.random().toString(36).slice(2);
      annotation = C.createAnnotation(key, selectedEvidence, rubric, id); if (!storeAnnotation(annotation)) return;
    }
    window.getSelection()?.removeAllRanges(); render(); showAttributePopup(annotation.id);
  }
  function changeFeature(key) {
    const annotation = current().annotations.find(a => a.id === popupAnnotationId); if (!annotation) return;
    if (key === annotation.feature || key === "questions" && annotation.evidence.length > 1) return;
    const changed = C.createAnnotation(key, annotation.evidence[0], rubric, annotation.id);
    changed.evidence = structuredClone(annotation.evidence);
    changed.entry.turn_locations = [...new Set(changed.evidence.map(e => e.turn_id))];
    for (const field of featureByKey(key).fields) {
      const value = annotation.entry[field.key];
      if (typeof value === "string" && value && (!field.options || field.options.includes(value))) changed.entry[field.key] = value;
    }
    if (storeAnnotation(changed)) { render(); showAttributePopup(changed.id, true); positionAttributePopup(); }
  }
  function deleteHighlight() {
    const source = current(), annotation = source.annotations.find(a => a.id === popupAnnotationId); if (!annotation) return;
    const deleted = structuredClone(annotation); source.annotations = source.annotations.filter(a => a.id !== annotation.id);
    hideSelection(); render(); persist(); notify("Highlight deleted.");
    $("toast").append(document.createTextNode(" "), button("Undo", () => {
      source.annotations.push(deleted); render(); persist(); $("toast").hidden = true;
    }));
  }
  function entryTitle(annotation) {
    return annotation.entry[featureByKey(annotation.feature).fields[0].key] || annotation.evidence[0].quote;
  }
  function showHighlightPopup(mark) {
    const annotations = mark.dataset.annotationIds.split(",").map(id => current().annotations.find(a => a.id === id)).filter(Boolean);
    const rect = mark.getBoundingClientRect();
    if (annotations.length === 1) showAttributePopup(annotations[0].id, true);
    else {
      popupAnnotationId = annotations[0].id; editingPopup = true; resetPopup("Choose a highlight to edit");
      $("popup-choices").hidden = false; $("popup-choices").replaceChildren(...annotations.map(annotation => {
        const choice = button("", () => { showAttributePopup(annotation.id, true); positionSelectionMenu(rect); }, "extend-entry");
        choice.append(element("small", featureByKey(annotation.feature).name), document.createTextNode(entryTitle(annotation))); return choice;
      }));
    }
    positionSelectionMenu(rect);
  }
  function showExtendChoices() {
    if (!selectedEvidence) return;
    const evidence = structuredClone(selectedEvidence);
    window.getSelection()?.removeAllRanges(); popupAnnotationId = null; editingPopup = false;
    resetPopup("Add supporting passage"); $("popup-choices").hidden = false;
    $("popup-choices").replaceChildren(...current().annotations.filter(a => a.feature !== "questions").map(annotation => {
      const choice = button("", () => {
        const updated = C.addEvidence(structuredClone(annotation), evidence);
        if (storeAnnotation(updated)) { render(); showAttributePopup(updated.id, true); }
      }, "extend-entry");
      choice.append(element("small", featureByKey(annotation.feature).name), document.createTextNode(entryTitle(annotation))); return choice;
    }));
  }
  function captureSelection() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    const startNode = range.startContainer.nodeType === Node.ELEMENT_NODE ? range.startContainer : range.startContainer.parentElement;
    const endNode = range.endContainer.nodeType === Node.ELEMENT_NODE ? range.endContainer : range.endContainer.parentElement;
    const startBody = startNode.closest?.(".turn-body"), endBody = endNode.closest?.(".turn-body");
    if (!startBody || startBody !== endBody || startBody.dataset.speaker !== "tutor") {
      hideSelection(); notify("Highlight a passage within a single tutor turn. Add supporting passages from other turns separately."); return;
    }
    try {
      const prefix = range.cloneRange(); prefix.selectNodeContents(startBody); prefix.setEnd(range.startContainer, range.startOffset);
      const start = prefix.toString().length;
      selectedEvidence = C.makeEvidence(current().conversation, startBody.dataset.turnId, start, start + range.toString().length);
      showFeaturePicker(); positionSelectionMenu(range.getBoundingClientRect());
    } catch (error) { hideSelection(); notify(error.message); }
  }
  async function importFile(file) {
    try {
      const text = (await file.text()).replace(/^\uFEFF/, "");
      let conversation, annotations = [], importedAnnotator, project = false;
      if (file.name.toLowerCase().endsWith(".json")) {
        const input = JSON.parse(text); project = input.format_version === C.FORMAT_VERSION;
        if (project) {
          conversation = C.normalizeConversation(input.conversation, file.name);
          annotations = C.validateAnnotations(conversation, input.annotations, rubric, { allowIncomplete: true });
          importedAnnotator = input.annotator;
        } else conversation = C.normalizeConversation(input, file.name);
      } else conversation = C.parseTranscript(text, file.name);
      const index = documents.findIndex(d => identity(d.conversation) === identity(conversation));
      if (index >= 0) {
        if (project) {
          if (documents[index].annotations.length && !window.confirm("Replace this conversation's existing annotations with the imported project? Export your current work first to keep both.")) return;
          documents[index].annotations = annotations;
        }
        currentIndex = index;
      } else { documents.push({ conversation, annotations }); currentIndex = documents.length - 1; }
      if (typeof importedAnnotator === "string") { annotator = importedAnnotator; $("annotator").value = annotator; }
      hideSelection(); populateSources(); render(); $("conversation").scrollTop = 0; persist();
      notify("Loaded " + conversation.messages.length + " turns and " + current().annotations.length + " annotations.");
    } catch (error) { notify("Could not import file: " + error.message); }
  }
  function exportProject() {
    if (!current()) { notify("Import a conversation first."); return; }
    try {
      const project = C.buildExport(current().conversation, current().annotations, rubric, annotator);
      const url = URL.createObjectURL(new Blob([JSON.stringify(project, null, 2) + "\n"], { type: "application/json;charset=utf-8" }));
      const link = element("a"); link.href = url;
      link.download = (current().conversation.label.replace(/[^\p{L}\p{N}._-]+/gu, "-") || "conversation") + ".annotations.json";
      document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
      notify(project.incomplete_annotations.length ? "All highlights exported. " + project.incomplete_annotations.length + " entries still need details." : "Annotation JSON exported.");
    } catch (error) { notify("Export failed: " + error.message); }
  }
  for (const feature of rubric) {
    const option = element("option", feature.name); option.value = feature.key; $("guide-select").append(option);
    $("selection-options").append(featureStyle(button(feature.short_label, () => startNew(feature.key), ""), feature));
  }
  $("guide-select").addEventListener("change", () => renderGuidance($("guide-content"), featureByKey($("guide-select").value)));
  $("guide-button").addEventListener("click", () => {
    $("guide-panel").hidden = !$("guide-panel").hidden;
    $("guide-button").setAttribute("aria-expanded", String(!$("guide-panel").hidden));
  });
  $("conversation-select").addEventListener("change", () => { currentIndex = Number($("conversation-select").value); hideSelection(); render(); $("conversation").scrollTop = 0; });
  $("annotator").addEventListener("input", event => { annotator = event.target.value; persist(); });
  $("import-button").addEventListener("click", () => $("file-input").click());
  $("file-input").addEventListener("change", event => { if (event.target.files[0]) importFile(event.target.files[0]); event.target.value = ""; });
  $("export-button").addEventListener("click", exportProject);
  $("extend-button").addEventListener("click", showExtendChoices);
  $("dismiss-selection").addEventListener("click", hideSelection);
  $("popup-feature-select").addEventListener("change", event => changeFeature(event.target.value));
  $("delete-highlight").addEventListener("click", deleteHighlight);
  $("selection-menu").addEventListener("mousedown", event => { if (event.target.closest("button")) event.preventDefault(); });
  $("conversation").addEventListener("mouseup", () => setTimeout(captureSelection, 0));
  $("conversation").addEventListener("keyup", event => { if (event.shiftKey) captureSelection(); });
  $("conversation").addEventListener("click", event => {
    if (!window.getSelection()?.isCollapsed) return;
    const mark = event.target.closest("mark"); if (mark) showHighlightPopup(mark); else hideSelection();
  });
  $("conversation").addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches("mark")) {
      event.preventDefault(); showHighlightPopup(event.target);
    }
  });
  document.addEventListener("keydown", event => { if (event.key === "Escape") hideSelection(); });
  document.addEventListener("mousedown", event => { if (!event.target.closest("#selection-menu") && !event.target.closest("#conversation")) hideSelection(); });
  $("conversation").addEventListener("scroll", () => { if (popupAnnotationId) positionAttributePopup(); else hideSelection(); });
  window.addEventListener("resize", () => { if (popupAnnotationId) positionAttributePopup(); });
  restore(); $("annotator").value = annotator; populateSources(); render(); renderGuidance($("guide-content"), rubric[0]);
})();
