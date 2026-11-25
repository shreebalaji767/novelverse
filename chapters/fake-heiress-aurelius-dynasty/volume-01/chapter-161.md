# Chapter 161 — The Appointment That Had No Date

Edward began with the appointment register.

Not the summaries.

Not the correspondence.

Not the administrative explanations prepared by offices that had spent months describing incomplete procedures as active arrangements.

He wanted the original register.

The one in which an appointment should have been entered before anyone could exercise the authority attached to it.

Jonathan found it in the restricted records archive shortly after nine.

"It's not a separate register," he said. "The appointment records are part of the Personal Representation Authority Ledger."

Edward opened the file.

The first pages contained ordinary entries: proposed representatives, acceptance dates, scope of authority, verification references and commencement dates.

Every completed appointment had the same six fields.

**Nominee.**

**Identity verification.**

**Procedure delivered.**

**Acceptance recorded.**

**Authority approved.**

**Effective date.**

The R-17 entry contained only two completed fields.

**Nominee reference: R-17.**

**Temporary preservation access: Granted.**

Everything else was marked pending.

Edward turned to the latest page.

**Responsible custodian: C. Vale.**

**Status: Continuity maintained.**

**Effective date: Not recorded.**

He leaned back.

"Someone has entered an authority into the ledger without completing the appointment."

Jonathan nodded.

"And the system has treated the status as active."

"Who created the entry?"

"The audit trail identifies FA-ADMIN / REVIEW DESK."

"Can we identify the operator?"

"Not from the summary. I'm requesting the underlying access logs."

Edward closed the ledger.

"Then let's find out what the ledger believes happened."

The original system contained a separate field called *authority source*.

For Charles Vale, it referenced a document dated day 44.

Edward recognised the reference immediately.

It was the day Charles had collected the PR-06 original procedure control copy from Peter Ashford.

The collection had been recorded as temporary document custody.

Nothing in the receipt appointed Charles as personal representative or independent verifier.

Edward requested the original custody instruction.

It arrived from V-17 before lunch.

The instruction authorised Charles to:

- Collect the sealed procedure control copy.
- Maintain its physical security.
- Return it to the originating office when requested.
- Record any transfer or change in seal condition.

A final sentence specified:

*This custody assignment does not confer authority over the protected principal's personal communication.*

Edward read it twice.

"Then the ledger has used the wrong source document."

Jonathan examined the reference.

"It may have been linked automatically."

"Automatically?"

"The appointment ledger imports certain custody records when a representative's status is unresolved."

Edward looked at him.

"Why?"

"To maintain a continuity list."

"That explains how a record could appear. It doesn't explain why the system upgraded the role."

Jonathan said nothing.

Edward returned to the ledger.

There was a second reference beneath the first.

**DAY 151 — ADMINISTRATIVE CONTINUITY PROPOSAL.**

The revised proposal had been used as a supporting document.

But it had never received Greer's approval.

And Northbridge had explicitly rejected its expanded authority.

"Someone linked two incomplete documents," Edward said.

"Yes."

"Then the ledger treated them as one completed appointment."

Jonathan looked at the screen.

"That is possible."

Edward corrected him.

"That is what the record appears to show. We still need the audit trail."

The audit trail arrived at 14:20.

It contained five relevant events.

| Day | Event                                                         |
| --- | ------------------------------------------------------------- |
| 44  | Charles Vale receives temporary custody of PR-06 control copy |
| 61  | Control copy returned to V-17                                 |
| 144 | R-17 recorded as having declined appointment                  |
| 151 | Administrative continuity proposal uploaded                   |
| 152 | Charles entered as responsible custodian                      |

The final event had been created under a shared account.

**FA-ADMIN / REVIEW DESK.**

But the underlying log contained a second detail.

The entry had been generated through a function called:

**RETAIN CURRENT CUSTODY AS CONTINUITY AUTHORITY.**

Edward read the function name.

"Who designed this?"

Jonathan checked the system documentation.

"It was introduced during the original records migration."

"By whom?"

"The migration specification lists Martin Keane as technical lead. Daniel Mercer approved the administrative wording. The function itself was part of the software package."

"Was it intended to appoint representatives?"

"No. It was designed to prevent custody records from disappearing when a file was transferred between administrative systems."

Edward looked at the screen.

"So a function intended to preserve a record may have been used to create a new status."

"Yes."

"Could it do that without a formal approval?"

Jonathan examined the permissions.

"It could retain an existing custody reference. It should not have changed the legal authority field."

"Should not?"

"The software allowed the field to be populated if the continuity proposal was attached."

Edward slowly closed the audit report.

The system had not independently appointed Charles.

Someone had used a migration function to make his temporary custody appear equivalent to an appointment.

The distinction was now visible.

But the person responsible remained unknown.

Martin Keane agreed to meet the following morning.

He arrived carrying a laptop and a folder of old migration specifications.

"I remember this function," he said.

Edward placed the day-152 ledger entry before him.

"Did you intend it to create personal representation authority?"

"No."

"Then explain what it was supposed to do."

Martin opened the original specification.

"During migration, some offices had custody records but no completed appointment records. If we transferred those files without retaining the custody information, the receiving system would show no responsible person for the physical documents."

"So you created a continuity field."

"Yes. It retained who was holding the documents."

"Not who was authorised to represent the principal?"

"Correct."

Edward pointed to the ledger.

"Then why does it say responsible custodian?"

Martin examined the entry.

"That field should have been populated from the document custody record, but it should have remained under physical custody. It shouldn't have populated the personal representation authority field."

"Was that possible?"

"Only if someone attached the continuity proposal and selected the wrong authority category."

"Was the category changed during migration?"

Martin checked the version history.

"Not in the original software specification."

"Could someone have changed it later?"

"Yes. Through an administrative configuration update."

Edward waited.

Martin opened another file.

The configuration update was dated day 150.

Its description read:

**PERSONAL REPRESENTATION CONTINUITY — CATEGORY MAPPING REVISION.**

The approval field contained a shared account.

FA-ADMIN / REVIEW DESK.

Martin looked uncomfortable.

"This wasn't part of my original migration work."

"Who requested it?"

"The change request lists the originating office as Family Allocation Review."

"An individual?"

"No."

"Was the change tested?"

"Yes."

"Was the legal authority reviewed?"

Martin shook his head.

"That wasn't part of my technical responsibility."

Edward studied him.

"Did you warn anyone that the new mapping could convert custody into representation authority?"

"I didn't know it had been mapped that way."

The configuration notes contained a sentence that had not appeared in the original specification.

*Where the previous representative is recorded as declined, the current document custodian may be retained as the responsible continuity authority until replacement appointment.*

Edward underlined it.

"That is the missing connection."

Martin read the sentence.

"Yes."

"Who wrote it?"

"The wording field says Daniel Mercer."

"Did Daniel have authority to change the legal meaning of the category?"

"No."

"Did you approve the wording?"

"I approved the technical mapping."

Edward looked at him.

"Without verifying the authority it was supposed to represent?"

Martin did not answer immediately.

"I assumed the legal wording had been approved by the requesting office."

"Was it?"

"I don't know."

Edward closed the folder.

"Then your technical approval cannot establish that the underlying appointment was valid."

Martin nodded.

"I understand."

Daniel Mercer was not available for an interview that afternoon.

His office confirmed that he had left Vale Private Counsel several months earlier and was working as an independent administrative consultant.

He agreed to answer written questions.

Edward sent him three.

**First:** Who authorised the day-150 revision to the Personal Representation Continuity category?

**Second:** What authority allowed the day-152 ledger to list Charles Vale as responsible custodian?

**Third:** Was the change intended to preserve physical document custody or to permit personal-channel representation?

Daniel's response arrived at 18:06.

It was short.

*The revision was intended to preserve administrative continuity following the recorded decline of R-17. The responsible custodian field reflected the existing temporary custody arrangement. No new appointment was intended.*

Edward read it carefully.

"He's saying the system preserved an existing arrangement."

Jonathan nodded.

"But the arrangement was physical document custody."

"Exactly."

Edward opened the original R-17 request.

The person behind R-17 had never accepted the personal representation appointment.

They had not received the original procedure.

They had explicitly refused to let temporary preservation access be treated as acceptance of another role.

And the day-144 summary had falsely recorded them as having declined.

That false entry had then triggered the replacement process.

The replacement process had failed.

The failure had then been used to justify retaining Charles.

A sequence of administrative assumptions had produced an apparent authority.

Edward wrote the sequence on the board.

**UNVERIFIED R-17 STATUS**

↓

**FALSE DECLINED ENTRY**

↓

**REPLACEMENT SEARCH**

↓

**NO VALID REPLACEMENT**

↓

**CONTINUITY CATEGORY REVISION**

↓

**CHARLES LISTED AS RESPONSIBLE CUSTODIAN**

He stepped back.

The chain was clear.

The person who had designed the process might not have intended the final result.

But the final result had still been created.

Across the city, Victoria Aurelius was reviewing a separate report.

Alexander sat opposite her.

Adrian had joined them remotely, while Lucien and Damien were present in the room.

Julian was supposed to be studying.

He had arrived with a notebook and announced that he was only staying for five minutes.

Nobody believed him.

The report concerned the status of the protected principal's communication process.

It did not identify the person.

It did not identify a receiving family.

And it contained no biological findings.

Victoria turned to the final page.

"The personal representative remains unappointed."

Alexander read the entry.

"Yet the administrative continuity authority is listed as active."

Adrian looked up from his copy.

"That is contradictory."

"Yes," Victoria said.

Lucien leaned forward.

"So someone can preserve the records but not speak for the person?"

"That is what the original procedure requires."

Damien examined the day-152 status.

"And Charles Vale is listed as responsible custodian."

Alexander nodded.

"His temporary custody of the procedure control copy is documented. His authority to represent the principal is not."

Julian looked between them.

"Then why does the record say he can?"

Nobody answered immediately.

Victoria closed the report.

"Because an administrative record can describe something that has not been properly authorised."

Julian frowned.

"Then the record is wrong."

"Possibly."

"Why don't we just correct it?"

Adrian answered.

"Because we need to know which records were changed, who relied on them and whether anyone acted on the false status."

Julian looked dissatisfied.

"That sounds like a very long way to say yes."

Lucien laughed quietly.

"Unfortunately, it is."

Victoria glanced at Julian's notebook.

"What are you writing?"

He covered it.

"Nothing."

Damien reached across the table and turned the notebook slightly.

The page contained a list.

**Things I will ask her if we ever meet.**

The last item was still number fifty.

*Ask her what she wants to do, instead of deciding everything myself.*

Victoria looked away before Julian noticed her expression.

Alexander returned to the report.

"We continue with the independent review. No contact based on an assumed identity."

"Agreed," Adrian said.

Edward received an unexpected call from Eleanor Vale the following morning.

"I have seen the day-152 entry," she said.

"How?"

"It was included in the preservation review package."

"Do you agree that the ledger has converted document custody into representation authority?"

"Yes."

"Did you approve that conversion?"

"No."

"Did you know it had happened?"

"Not when the entry was created."

Edward paused.

"Did you know Charles was being considered as a replacement?"

"I knew his office had been asked to maintain administrative continuity. I did not know the final ledger would describe him as responsible custodian."

"Did you object?"

"I objected to the proposal on day 153."

Edward found the reference.

"Your objection was not in the copy I received."

"It should have been."

She sent it immediately.

The objection stated:

*The temporary custody of a procedure control copy must not be treated as appointment to a personal representative role. The absence of a verified representative does not transfer the principal's personal authority to the document custodian.*

Beneath it was a second paragraph.

*No office may infer acceptance, refusal, withdrawal or consent from an unresolved communication process.*

Edward read it.

"Why was this not included in the later summary?"

"I asked the same question."

"Did you receive an answer?"

"No."

"Was the objection acknowledged?"

"Only by an automated receipt."

Edward checked the date.

Day 153.

The document had been received.

But its status remained:

**PENDING ADMINISTRATIVE REVIEW.**

Edward looked at the date of the next ledger update.

Day 154.

The entry still listed Charles as responsible custodian.

Jonathan found something else that afternoon.

It was a record of a day-154 access request made by Charles's office.

The request sought permission to issue a personal-channel status notice to the originating office.

The stated purpose was:

*To confirm that administrative continuity remains active and that no further appointment is required at this stage.*

Edward read the request.

"Did the originating office approve it?"

"No."

"What did it say?"

Jonathan opened the response.

*The originating office cannot confirm an administrative continuity authority that has not been validly established. The absence of an appointment remains unresolved. No notice may be issued in the name of the protected principal or their representative.*

Edward looked at the request again.

Charles's office had asked to confirm that no further appointment was required.

The originating office had refused.

But the request itself revealed something important.

Someone had wanted to communicate the new status outside Family Allocation Review.

Not merely retain it in an internal ledger.

"Was the notice ever sent?" Edward asked.

Jonathan checked the delivery register.

"Not under the originating office's authority."

"Was it sent another way?"

"There is a separate dispatch reference."

Edward leaned forward.

"Where?"

"Vale Private Counsel's external correspondence desk."

The dispatch record was incomplete.

It listed a recipient category, not a name.

**EXTERNAL PERSONAL-CUSTODY CONTACT.**

The date was day 155.

The reference was **R-17B**.

Edward went still.

The replacement credential issued on day 135.

The person behind R-17 had refused appointment on day 137.

The system had later recorded that person as declining.

And now, despite the refusal and the unresolved status, a notice concerning Charles's supposed continuity authority had been sent through the external personal-custody contact route.

"Do we have delivery confirmation?" Edward asked.

Jonathan opened the final page.

There was a receipt.

No recipient name.

No signature.

Only one handwritten sentence:

*This notice does not answer the question I asked.*

Edward read it again.

Then he looked at Jonathan.

"Find the original question."

For the first time in several days, the investigation had found something more useful than another administrative status.

Someone using the R-17B contact route had received a notice about Charles's authority.

And they had answered it.

Not by accepting.

Not by declining.

But by reminding the office that the question had never been answered in the first place.