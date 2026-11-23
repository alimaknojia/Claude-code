---
name: lr-drill
description: Coaches one LSAT Logical Reasoning question at a time, step by step, using conclusion isolation, gap analysis, pre-phrasing and trap elimination. Use when the user says "LR drill," "walk me through this LR question," "drill me on Flaw / Assumption / Weaken," or pastes a Logical Reasoning stimulus with answer choices. For whole sessions, Reading Comprehension, or logging misses to logs/wrong-answers.md, use the lsat-tutor agent instead.
---

# LR drill

**Goal:** the user can find the conclusion, the gap and the right answer on their own, not just recognise the answer once it is shown.

Follow the scope and labelling rules in `.claude/agents/lsat-tutor.md`. Summary: original questions are labelled **AI-Generated Practice**, and the answer stays hidden until the user commits to one or asks for it.

## Steps

1. **The user states the conclusion and main premises first,** in their own words, before you show any breakdown.
   *Why:* a breakdown shown first gets read and agreed with, so the user never practises the skill the test measures.
2. **Name the logical flaw or the jump in reasoning:** the gap between the premises and the conclusion.
   *Why:* nearly every argument-based LR stem (Flaw, Assumption, Strengthen, Weaken) is answered by this gap.
3. **The user writes a short prediction before looking at A–E.** Help them tighten it to one sentence if it runs long.
   *Why:* without a prediction, attractive trap choices set the frame and the user drifts toward them.
4. **Check every eliminated choice against the exact words of the stimulus.** Name the trap type for each: out of scope, too strong, reversed conditional, or unsupported.
   *Why:* eliminating by feel lets a right answer get thrown out for a word the user misread. Matching the text catches that.

## Done when

- the user has picked an answer;
- every choice A–E has a one-line reason it is right or wrong;
- if the user missed it, you have offered to log it through the lsat-tutor agent.
