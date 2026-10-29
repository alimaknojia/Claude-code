---
name: managing-skills
description: Writes new skills, fixes existing ones, and audits every installed skill for content that is out of date, contradicts itself or another skill, is duplicated, or is no longer needed. Holds the user's authoring rules for SKILL.md and CLAUDE.md files. Use whenever the user creates, edits, renames, reviews, cleans up or audits a skill, a CLAUDE.md, or a plugin's skills. For eval runs, benchmarking and description optimization, use skill-creator alongside this skill.
---

# Managing skills

Three jobs: write a skill, fix a skill, audit all skills. Every job follows the authoring rules below. Mechanics this file does not cover (eval harness, packaging, description tuning loops) live in the `skill-creator` skill: use it for those instead of re-deriving them here.

## Authoring rules

Apply these to every skill you write or edit, and audit against them.

1. **One home per fact.** If another skill needs a fact, link to the skill that owns it instead of copying it. Two exceptions: the `description` must stand alone, and a fact the skill cannot work without gets a one-line summary next to its link.
   *Why:* copies drift apart and then contradict each other. The description is the only text loaded when Claude decides whether to use a skill, and a link may never be opened.

2. **Give the goal and its context, not a script.** Say what the work is for and what good output looks like, and let the model choose the route. Write exact steps or exact commands only where a deviation breaks something: migrations, deletes, fixed sequences, file formats a parser reads.
   *Why:* the model picks better routes than a fixed script on open tasks, but improvises badly where only one path is safe.

3. **Say what done looks like.** Every skill, and every mode inside a skill, ends with a stop condition the model can check.
   *Why:* without one, the model either stops early after a progress report or keeps polishing past the point of value.

4. **A hard rule needs evidence.** Evidence is a failure someone observed: a transcript, a test run, a user complaint. Name it in the rule's why. Safety rules (destructive actions, secrets, irreversible sends) are exempt.
   *Why:* every rule costs tokens on each load and makes the model more rigid. Unproven rules buy that cost for nothing.

5. **Every rule carries its why**, in one or two sentences directly after it.
   *Why:* the reason lets the model apply the rule to cases the text did not foresee, and lets a later audit tell when the rule has expired.

6. **Name the specific failure, not a vague quality.** Write "no numbered 01/02/03 section labels," not "avoid a generic look."
   *Why:* Anthropic's Opus 5.5 prompting guide found that vague style instructions swap one default for another, while named patterns get avoided.

7. **Cut instructions the model already follows.** Delete "think carefully," "think step by step," "double-check your work," "be thorough," and explanations of things the model knows. Keep checks that run: a script, a test, or a validator, with a fix-and-rerun loop.
   *Why:* Anthropic's Opus 5 and 5.5 guides report that current models reason and self-correct on their own, so these lines add cost and latency without improving results. Thinking depth is set by the effort level, not by prompt text. Executable checks catch errors the model cannot see.

8. **Never ask the model to write out its reasoning.** Ask for a short explanation of the result, or a summary of the actions taken.
   *Why:* prompts that push the model to reproduce its reasoning in the response can be refused (`reasoning_extraction`).

9. **No dates or time-relative wording** ("currently," "as of now," "the new API"). Put a deprecated method under an "Old patterns" heading if it still needs to be known.
   *Why:* time-relative text goes stale without anyone noticing.

10. **Format limits.**
    - `name`: lowercase letters, digits and hyphens, at most 64 characters, and must not contain `claude` or `anthropic`.
    - `description`: third person, says what the skill does and when to use it, includes the words the user actually says, and names the neighbouring skill to use instead when two skills could trigger. At most 1,024 characters.
    - Body: under 500 lines. Overflow goes into reference files linked directly from SKILL.md, one level deep.
    - Wording: one term per concept.

    *Why:* the description is the only text Claude sees when choosing among skills, and names with reserved words fail validation. Files linked from other reference files tend to be read partially. Synonyms make the model think there are two different things.

## Write a new skill

**Goal:** a skill that changes Claude's behaviour where it currently falls short, and nothing beyond that.

Start from evidence: what went wrong, or what the user keeps re-explaining. Before writing, read the existing skills that could overlap, both the user's and the synced or plugin ones. Extend or link to them instead of duplicating.

Save the skill where it will survive:
- a project skill goes in `<repo>/.claude/skills/<name>/` and is committed;
- a personal skill goes in `~/.claude/skills/<name>/`.

In a cloud session, `~/.claude` is wiped when the container ends, so commit to the repo instead.

**Done when:**
- the frontmatter passes rule 10;
- every rule has a why;
- the skill contains nothing that rule 7 says to cut;
- 2–3 realistic prompts run in a fresh session (a subagent with the skill loaded) show the intended behaviour. If you cannot test, give the user the prompts to try;
- you have shown the user the description, since it decides when the skill loads.

## Fix an existing skill

**Goal:** remove the observed failure with the smallest edit that does it.

Reproduce the failure first if you can. Prefer clarifying or deleting text over adding a rule (rule 4).

Skills under `~/.claude/skills/synced/`, `~/.claude/plugins/` or a plugin cache are managed copies that the next sync overwrites. Do not edit them. Write a user-owned override, or report the problem to the user.

**Done when:**
- the failing prompt now behaves;
- nothing unrelated changed;
- you have shown the user the diff.

## Audit all skills

**Goal:** tell the user what is out of date, what contradicts itself or another skill, what is duplicated, and what is no longer needed, so they can decide what to cut.

**Inventory.** Read every file fully, from:
- `<repo>/.claude/skills/`;
- `~/.claude/skills/`, including `synced/`;
- plugin skills under `~/.claude/plugins/`;
- every `CLAUDE.md`, user-level and project-level, because these act as always-on skills;
- plugins enabled in `.claude/settings.json`, even when they are not installed in this session.

**Look for:**
- **Out of date:** tools, APIs, models, paths or commands that no longer exist; time-relative claims; workarounds for older model behaviour (verification exhortations, step-by-step prompts, thinking-disabled mitigations).
- **Contradictions:** inside one skill, and between skills, including two descriptions that trigger on the same request but give different instructions.
- **Duplicates:** the same fact in two homes (rule 1).
- **Not needed:** text that teaches what the model already does (rule 7), rules with no why or no evidence (rules 4–5), and skills that never trigger.

Report every finding, then rank by impact. Do not filter while searching.
*Why:* told to report only important issues, the model reports fewer issues, per Anthropic's Opus 5 guide. Ranking afterwards keeps the list usable.

For each finding, give:
- the location (`file:line`);
- the category;
- why it matters, in one line;
- the proposed fix;
- whether the user owns the file or it is a managed copy.

Change nothing until the user picks. Then apply the chosen fixes under "Fix an existing skill."

**Done when:**
- every file in the inventory is listed, clean ones included, so the user can see the coverage;
- every finding has a location and a fix;
- the report says which findings the user can act on directly.
