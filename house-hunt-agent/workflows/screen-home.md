# Workflow: Screen a home

## Goal

Decide in under a minute of reading whether a home is worth a visit.

## Input

An address or a listing link.

## Steps

1. Show me the plan and any questions. Wait for "go".
2. Look up the home: price, beds, baths, square feet, year built, HOA, taxes, Zestimate, rent estimate.
3. Check deal-breakers from `CLAUDE.md`. If one hits, verdict is "Skip" and go to step 6.
4. Check must-haves, budget and estimated monthly payment.
5. List up to 3 pros and up to 3 concerns.
6. Save the report to `homes/<street-address>.md` using the format below.

## Result format

```
# <Address>

**Verdict:** Visit / Maybe / Skip — <one-line reason>

| Price | Est. monthly | Beds/Baths | Sq ft | Year | HOA |
|-------|--------------|------------|-------|------|-----|
|       |              |            |       |      |     |

**Price check:** list price vs Zestimate (over/under by $X)

**Deal-breakers:** none / <which one>
**Must-haves missing:** none / <list>

**Pros**
1.
2.
3.

**Concerns**
1.
2.
3.

**Questions to ask the agent:** up to 3
```
