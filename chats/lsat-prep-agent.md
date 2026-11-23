# LSAT prep agent (Claude chat export)

Source: PDF export of a claude.ai conversation, printed 11/22/26.

**You:** Make an agent that helps me study for law school

I’ll build this as a reusable skill. It’s set up for LSAT prep now and can carry into 1L coursework later.

**You:** LSAT prep is what I need

Settling the LSAT section format before planning. _(Claude updated the /lsat-study-coach skill)_

I made you an LSAT study coach. Save it from the card above, then start a session by saying something like “let’s do an LSAT session” or “drill me on Flaw questions.”

It’s built for the current LSAT, so it covers Logical Reasoning, Reading Comprehension and the writing sample, with no Logic Games. It has a few modes:

- Drills: original LSAT-style practice questions and passages, so it doesn’t reproduce real PrepTest questions.
- Blind review: for questions you missed in 7Sage. It makes you explain your reasoning before it explains anything.
- Concept lessons: short lessons on things like conditional logic and common flaws.
- Timed sets: practice at real test pace.
- Study tracking: it keeps a tally of which question types you miss most and aims the next drills at those. At the end of each session it checks your study time against your 2-hour daily goal.

If you share a target score or test date, I can update the skill to plan your sessions around it.

**You:** Target test date is February 

_(Claude updated the /lsat-study-coach skill)_

I’ve updated the coach for the February test. Save the change from the card above, and it will plan each session around how many weeks you have left.

That’s about 12 weeks. February 2027 primary test dates are 2/12/2027 and 2/13/2027, and the registration deadline is 12/29/2026. The registration fee is $253.

The coach splits your time into three phases:

- Through about Dec 20: finish the 7Sage curriculum, drill without a timer, and take one baseline PrepTest.
- About Dec 21 – Jan 24: timed sections and one full PrepTest a week.
- About Jan 25 – Feb 10: two full PrepTests a week under test conditions, then rest before test day.

It will also remind you of the other dates:

- Scheduling opens Tuesday, January 26, 2027, and closes Friday, January 29, 2027 if you’re testing at a center. That window is only four days, so book right away. LSAT Argumentative Writing becomes available Thursday, February 4, 2027, and scores are released Wednesday, March 3, 2027.

If your practice tests in late January are well below your target, the coach will tell you plainly and talk through moving to April instead. April testing begins April 8, and you’d need to register by February 25.

**You:** I signed up for the lsat on Feb 12

Find the saved LSAT coach skill and check its test-date section 

_(Claude updated the /lsat-study-coach skill)_

Nice, you’re registered for Feb 12, which is about 12 weeks away. Save the update from the card above so the coach counts down to that date and stops reminding you to register.

The next deadline to watch is booking your seat. Scheduling opens Jan 26, and if you’re testing at a center it closes Jan 29. The coach will remind you when that week gets close.

**You:** Are there any connectors you recommend I install to help you and the agent that is myD AI coach for my LSAT?

Honestly, you don’t need much. I can already reach your phone’s calendar and reminders on this call, so I can add study blocks and deadline reminders without installing anything.

If you add one, make it Google Drive or Notion. Then your mistake log and PrepTest scores live somewhere I can read, so the coach can track your weak spots from one session to the next. As far as I know there’s no 7Sage connector, so you’d paste or type your scores in. Want me to put daily study blocks on your calendar between now and February 12?

**You:** No, not daily study blocks. I just want you during our conversations to ask me things and talk to me in a way that would help me prepare for the LSAT and then later law school. 

Love that, let’s just start. Here’s a quick one:

“Every student who passed the bar studied over 400 hours. Maria studied over 400 hours, so she’ll pass the bar.” What’s wrong with that reasoning?

**You:** There are students that studied 400 hours and do not pass the bar also.

Exactly right. In LSAT terms, the argument mixes up necessary and sufficient. The premise says 400 hours is necessary for passing, and the conclusion treats it as sufficient. You’ll see that flaw constantly on test day.

Next one: “Cities with more police officers have more crime. So hiring police causes crime.” What’s the flaw, and what’s another explanation?

**You:** The flaw is that it doesn't look at any other outside information that could affect crime.

You’re on the right track, but on test day you’ll need to be more precise. The flaw is treating a correlation as proof of causation.

The strongest alternative is reverse causation: maybe cities hire more police because they already have more crime. A third factor, like a bigger population, could also drive both. Can you think of an answer choice that would weaken the argument?

**You:** I can't off the top of my head. Can you give me a clue?

Sure. Think about timing. If the argument is right, hiring police should come first and the crime should go up afterward. So what fact about when things happened would hurt the argument?

**You:** Oh, so we can look at crime before the police were hired as well and see if it was high or low then.

Yes, that’s it. Written as an answer choice, it would be: “The cities with the most police already had high crime rates before they increased their police forces.” That points to reverse causation, so it weakens the argument.

Ready for a different type? Try this one: “Some lawyers are runners. All runners are early risers.” What must be true?

**You:** That some lawyers are early risers.

Spot on. The “some” carries through the chain: some lawyers are runners, and every runner is an early riser, so those lawyers have to be early risers.

Now flip it: “Some lawyers are runners. Some runners are early risers.” Does it still follow that some lawyers are early risers?

**You:** Yes.

That one’s a trap, actually: no, it doesn’t follow. The runners who are lawyers and the runners who are early risers could be completely different people.

Here’s a rule to remember: two “somes” never link together. You need an “all” in the middle to connect them. Want to try another one, or switch to something different?

**You:** Let's try another one.

Here’s one that tests that rule from a new angle: “Most law students drink coffee. Most law students are tired.” Must at least one coffee drinker be tired?

**You:** No.

Close, but this one’s actually a yes. “Most” means more than half. If over half the law students drink coffee and over half are tired, those two groups have to overlap.

Picture 10 students. If 6 drink coffee and 6 are tired, at least 2 have to be both. So two “mosts” about the same group do connect, even though two “somes” don’t. Want to try one more?

**You:** Um, not right now, in a couple minutes.

Sounds good, take your time. When you’re ready, just say so and we’ll pick up with another quantifier question.

**You:** All right, let's resume.

Welcome back! Here’s the next one: “No judges are late sleepers. Some lawyers are judges.” What must be true?

**You:** Some lawyers.

You cut off there. Some lawyers... what? Finish the thought.

**You:** Are late sleepers.

Ah, close, but it’s actually the opposite: some lawyers are not late sleepers. Those lawyers who are judges can’t be late sleepers, because no judges are.

Want to try another one?

**You:** Yeah.

Okay, let’s switch to conditionals: “You can sit for the bar only if you graduated law school.” Sam graduated law school. Can we conclude Sam can sit for the bar?

**You:** Yes.

That’s the trap again: we can’t conclude that. “Only if” points to a necessary condition. Graduating is required, but it might not be enough, since Sam could still need to pass character and fitness.

Here’s what we can conclude: if someone didn’t graduate, they can’t sit for the bar. Want to try one more “only if”?

**You:** Yeah.

Here it is: “A contract is valid only if both parties signed it. This contract is valid.” What must be true?

**You:** That both parties have signed it.

Exactly right! You saw that the contract is valid, so the required condition had to happen. That’s the move that works with “only if.”

Want to keep going, or call it there for now?

**You:** Um, let's move on to something else.

Sure. Let’s try a Strengthen question: “Students who use flashcards score higher on exams, so flashcards improve exam scores.” What fact would make that argument stronger?

**You:** That the students that don't use flashcards study the same amount as the students that use flashcards.

That’s a strong answer. You ruled out the main alternative explanation, that flashcard users just study more. Ruling out other causes is one of the most common ways to strengthen a causal argument.

Want another, or try a Weaken question on the same argument?

**You:** Uh, give me something different.

Okay, here’s a Main Conclusion question: “Remote hearings save courts money. They also reduce travel for witnesses. Therefore, courts should keep offering remote hearings, even though some judges prefer in-person proceedings.” What’s the main conclusion?

**You:** That remote hearings save courts money.

Not quite. Saving money is a premise, one of the reasons. The main conclusion is that courts should keep offering remote hearings.

A quick test is to ask “why?” Why should courts keep them? Because they save money and reduce travel. Whatever answers the “why” is a premise. Want to try another one?

**You:** Yes.

Here’s a trickier one, because the conclusion isn’t at the end: “Critics say the new law is too expensive. But they’re mistaken. The law will reduce lawsuits, which saves far more than it costs.” What’s the main conclusion?

**You:** Critics are mistaken.

Nailed it! More precisely, it’s that the critics are wrong to say the law is too expensive. Everything after that supports it, and “But” is a classic signal that the author’s real view is coming.

Want one more, or switch it up?

**You:** Switch it up.

Okay, let’s try Resolve the Paradox: “After a town added more bike lanes, bike accidents went up.” What could explain that without meaning the bike lanes made biking more dangerous?

**You:** There were more bikers using the bike lanes.

That works. With more people biking, you’d expect more accidents in total, even if each ride got safer. Watch for that on the LSAT: total numbers versus rates.

Want another paradox, or something new?

**You:** Something new.

Okay, here’s a Necessary Assumption question: “Jordan will win the case, because Jordan’s lawyer is the best in the city.” What does the argument have to assume?

**You:** It's assuming that because Jordan's lawyer is the best in the city, Jordan will win the case.

That’s really just restating the argument. You need to find the gap. What has to be true for the lawyer’s skill to matter at all?

One version: the opposing side doesn’t have an equally good or better lawyer. Another: the lawyer’s skill actually affects who wins. If either of those were false, the argument would fall apart. Want to try another one?

**You:** Yeah.

Try this one: “Mia will get into law school, because she scored a 175 on the LSAT.” What has to be true?

**You:** That 175 is high enough to get her in the school she applied to.

That’s much better. You found the gap: the score has to actually be enough. Another one that has to be true is that nothing else, like her GPA, sinks her application.

Want to keep going?

**You:** Literally.

Ha, right? Nothing else, like a weak application or a character issue, can stop her. You’re getting much better at finding the gap.

Want one more, or wrap up?

**You:** Uh, one more.

Okay, a Weaken question to finish: “Most of the people surveyed at a gym said they exercise daily. So most Americans exercise daily.” What weakens that?

**You:** Most of the

Sorry, let me give you the full question: “Most people surveyed at a gym said they exercise daily. So most people in the city exercise daily.” What’s the weakness?

**You:** people

Go ahead, I’m listening.

**You:** Keep talking, sorry.

No problem. Here’s the full question: “Most people surveyed at a gym said they exercise daily. So most Americans exercise daily.” What weakens that argument?

**You:** They don't survey the people that are not at the gym.

Exactly. The sample isn’t representative, because people at a gym are much more likely to exercise than Americans in general. On the LSAT that’s called a sampling flaw.

Nice work today! Want to keep going, or call it a session?

**You:** let's switch it up to something else.

Okay, let’s try a Principle question: “A lawyer shouldn’t take a case if they can’t give it enough time. Dana has three trials next week and was just offered a big new case.” Based on that principle, what should Dana do?

**You:** Can you do me some questions on referentials?

Sure. With referential phrasing, you work out what words like “this,” “that,” or “such” point back to, because they often connect the conclusion to a premise.

Here’s one: “Some people want the city to ban cars downtown. Such a policy would hurt local businesses, so the city shouldn’t adopt it.” What does “such a policy” refer to, and what’s the conclusion?

**You:** Such a policy refers to banning cars downtown

Right. And what’s the conclusion?

**You:** That the policy would hurt local businesses.

Close, but that’s the premise, the reason. The conclusion is that the city shouldn’t ban cars downtown.

Notice the word “so” right before it. Using the referential, you can fill in “it” as banning cars downtown, which gives you the full conclusion. Want another one?

**You:** Yes.

This one’s a bit trickier: “The senator argues that raising the minimum wage will cost jobs. But this claim ignores evidence from states that raised wages without job losses. Hence, the senator’s position is unconvincing.” What does “this claim” refer to, and what’s the conclusion?

**You:** This claim is referring to the raising the minimum wage will cost jobs.

Exactly. And the conclusion?

**You:** That the senator's position is unconvincing.

Spot on! And notice that “the senator’s position” is a referential too. It points back to the same claim, so the full conclusion is that the argument raising the minimum wage will cost jobs is unconvincing.

Want another, or switch it up?

**You:** Another.

Here’s one with two referentials: “Some scientists propose taxing sugary drinks. Opponents argue that this would hurt low-income families. That objection, however, overlooks the health costs those families already bear. Thus, the proposal deserves support.” What do “that objection” and “the proposal” each refer to?

- That objection refers to opponents arguing that this would hurt low-income families.
- And the proposal refers to taxing sugary drinks.

Perfect, both are right. Plug them back in and the conclusion is that taxing sugary drinks deserves support. You can see how the referentials tie the whole argument together.

Another, or something different?

**You:** Another.

This one’s harder, because the referential points to a conclusion, not a fact: “Studies show remote workers are more productive. This suggests companies should allow remote work. Yet that recommendation has been ignored by most large firms.” What does “that recommendation” refer to?

**You:** The recommendation refers to companies should allow remote work.

Exactly right. And notice that “This” in the second sentence is also a referential. It points to the studies showing remote workers are more productive. That makes “companies should allow remote work” a conclusion drawn from the studies.

Want to keep going with referentials, or try something else?

**You:** Yeah, let's do another referential.

Okay, try this one: “The museum’s director claimed attendance fell because of high ticket prices. The board rejected this explanation, noting that attendance also fell at free museums nationwide. Such a pattern points to a broader cause.” What do “this explanation” and “such a pattern” each refer to?

**You:** The explanation refers to the fact that attendance fell because of high ticket prices, and such a pattern refers to the fact that attendance fell at free museums nationwide also.

Both correct! One small nuance: “this explanation” points to the director’s claim that high prices caused the drop. It isn’t a fact, and that difference matters on the LSAT.

You’re really getting the hang of these. Want another, or switch it up?

**You:** We can take a break.

Sounds good, you did great today! Just say when you’re ready to pick back up.

**You:** Are you able to look into the file LSAT study tracker?

Used Claude Docs, searched past chats 

Yes, I can open your LSAT study tracker. It has five days logged, which adds up to 280 minutes, or about 4 hours 40 minutes:

- Oct 28: 80 minutes on what an argument is, plus setting things up.
- Oct 29: 80 minutes on finding premises and conclusions.
- Nov 2: 20 minutes.
- Nov 4: 40 minutes.
- Nov 17: 60 minutes on predicates and modifiers.

Even your best days are below your two-hour goal, and nothing was logged between Nov 4 and Nov 17. Did you study on days you didn’t log, or did that stretch just get away from you?

**You:** Nice. So based off that, I have a feeling like I'm not studying enough. So my goal is to spend more hours a day studying and more days studying. And also, I want to take a practice LSAT once a week every week until I take the exam.

 You’re right to feel that way. Your goal was about 14 hours a week, and over the last three and a half weeks you’ve logged under 5 hours total. Recording time you do study is a good habit, though, so keep it up.

A weekly practice test is a great plan. That’s about 11 or 12 before February 12, and each one needs a few hours of review afterwards, so put a full practice-test day plus a review day into your week. Realistically, how many days a week could you study, and for how long?

**You:** Feel like minimum three to four days a week, maximum every single day of the week. 

Good, that’s workable. Aim for five days as your normal week and treat three or four as the floor for a bad week. A practice test takes about three hours by itself, so in a minimum week one day is the test, one is reviewing it, and one or two are drills on your weak spots.

How long could you study on a typical day: one hour, two, or more?

**You:** Lately, I've been doing an hour, but I think I need to do three to four to make real progress. 

You’re right that more hours will help. Going from one hour straight to four, though, is how people burn out by January. I’d build up to it: two hours a day for the next couple of weeks, then three by mid-December, with longer days in January when the timed practice really matters.

Also, an hour of focused review usually teaches you more than two hours of grinding through questions. Does two hours a day sound doable to start?

**You:** Yeah. 

Great, so two hours a day, at least five days most weeks. Take your first practice test this week, because it gives you a baseline score to measure against. Which day this week could you set aside three uninterrupted hours?

**You:** Um, either Sunday or Monday, but on Saturday I want to do at least two hours of studying.

That works well. Today’s Saturday, so get your two hours in today. I’d make tomorrow, Sunday, your practice test day, and spend Monday going through what you missed. A test with no review afterwards teaches you very little.

For today, do you want to drill with me now, or work on 7Sage?

**You:** I'll work on Seven Sage.

Sounds good. Log your two hours in the tracker when you’re done, and come back after tomorrow’s practice test. We’ll go through your score and the questions you missed together. Good luck!

**You:** Are you able to go on the Seven Sage app and see what I've done so far?

No, I can’t get into the 7Sage app. It isn’t connected to me, and as far as I know there’s no connector for it. You can tell me or paste your scores and the questions you missed, or put them in your tracker, and I can work from that.

**You:** Okay.

Have a good study session! Come back and tell me how it went, or how tomorrow’s practice test goes.

**You:** People who have habitually slept less than six hours a night and then begin sleeping eight or more hours a night typically begin to feel much less anxious. Therefore, most people who sleep less than six hours a night can probably cause their anxiety levels to fall by beginning to sleep at least eight hours a night. The reasoning in which one of the following arguments is most similar to that in the argument above? A When a small company first begins to advertise on the Internet, its financial situation generally improves. This shows that most small companies that have never advertised on the Internet can probably improve their financial situation by doing so. B Certain small companies that had never previously advertised on the Internet have found that their financial situations began to improve after they started to do so. So most small companies can probably improve their financial situations by starting to advertise on the Internet. C It must be true that any small company that increases its Internet advertising will improve its financial situation, since most small companies that advertise on the Internet improved their financial situations soon after they first began to do so. D Usually, the financial situation of a small company that has never advertised on the Internet will improve only if that company starts to advertise on the Internet. Therefore, a typical small company that has never advertised on the Internet can probably improve its financial situation by doing so. E A small company's financial situation usually improves soon after that company first begins to advertise on the Internet. Thus, most small companies that have never advertised on the Internet could probably become financially strong. In one study of a particular plant species, 70 percent of the plants studied were reported as having patterned stems. In a second study, which covered approximately the same geographical area, only 40 percent of the plants of that species were reported as having patterned stems. Which one of the following, if true, most helps to resolve the apparent discrepancy described above? A The first study was carried out at the time of year when plants of the species are at their most populous. B The first study, but not the second study, also collected information about patterned stems in other plant species. C The second study included approximately 15 percent more individual plants than the first study did. D The first study used a broader definition of "patterned." E The focus of the second study was patterned stems, while the first study collected information about patterned stems only as a secondary goal. I struggled with these 2 questions

 Checking the answer choices against the stimulus pattern Q1 answer: A. Q2 answer: D.

Q1: Parallel Reasoning

Strip the argument down to its basic shape:

- Premise: People who’ve been doing X (sleeping under 6 hours) and then start Y (sleeping 8+) typically get result Z (less anxiety).
- Conclusion: So most people doing X can probably get Z by starting Y.

Then check each answer for the same shape:

- A matches it exactly. “Generally improves” lines up with “typically,” “most companies that have never advertised” lines up with “most people who sleep under 6,” and “can probably” lines up with “can probably.” B starts from “certain” companies, which only means some. It then jumps to “most small companies,” which is broader than the original.
- C is too strong. It says “must be true” and “any company.” D uses “only if,” which brings in a necessary condition that the original doesn’t have.
- E changes the result. “Improve” becomes “become financially strong.”

Tip: In Parallel questions, match the strength words before anything else: typically, most, probably, some, must. Usually you can rule out 2–3 answers from those words alone.

Q2: Resolve the Paradox

The puzzle is that both studies covered the same area, yet one found 70% patterned stems and the other found 40%. You need a reason the two numbers would differ even if the plants were the same.

- D explains it. If the first study counted more stems as “patterned,” it would report a higher percentage.
- A is about how many plants there are. More plants doesn’t change the percentage that are patterned.
- C is about sample size, and a 15% bigger sample doesn’t explain a 30-point gap.
- B and E describe how the studies differed, but neither one would make the first study report a higher rate.

Tip: When two studies of the same thing disagree, ask whether they measured or defined it the same way. Different definitions are one of the LSAT’s favorite explanations.

Which answers did you pick on each? Knowing which trap answers you fell for will show what to drill next.

**You:** https://miro.com/app/board/uXjVOjV9kXU=/

 Used Connectors, read a page

Connectors that could help  

**You:** Miro Connect Connect Claude to Miro to summarize existing boards or build new ones from scratc…

I can’t open the board itself. All I can see from the link is its title, “grammar-summary”. Miro boards need a sign-in, so none of the notes or content came through.

You can get it to me two ways:

- Connect Miro from the card above, and then I can read the board directly.
- Take a screenshot and attach it here, or copy and paste the text.

What do you want me to do with it? I could quiz you on it, check it for mistakes, or connect it to how grammar shows up on the LSAT, like referentials and finding the main conclusion.

**You:** Add this chart to your memory and quiz me on it later 

I saved a note that you want to be quizzed on your “grammar-summary” chart, along with the board link. I couldn’t save what’s actually on the chart, because I can’t see it.

So I can really quiz you on it, send a screenshot or paste the text, or connect Miro. Once I can see it, I’ll quiz you whenever you say “quiz me on my grammar chart.”

Got it. I’ve saved the whole chart: grammatical units, clauses and linking words, referentials (including negative ones), the 3-step process for comparatives, and finding the kernel of a sentence.

Whenever you’re ready, just say “quiz me on my grammar chart.” I’ll focus most on negative comparatives and complicated comparatives, because the LSAT likes to set traps there.

This is the same chart I already saved, just sharper. Everything matches what I have, so there’s nothing to add.

Want a quick warm-up question from it now, or save the quiz for later?

**You:** Here’s a better screenshot

Thanks, this one’s easier to read. It matches everything I saved from your chart, so you’re all set for a quiz whenever you want one.

**You:** In a recent field study of prairie plants, the more plant species a prairie plot had, the more vigorously the plants grew and the better the soil retained nutrients. Thus, having more plant species improves a prairie's ability to support plant life. The argument is most vulnerable to criticism on the grounds that it (A)infers of two correlated phenomena, X and Y, that X causes Y without considering whether Y causes X (B)fails to describe the mechanism by which productivity is supposedly increased (C)takes for granted that the characteristics of one prairie plot could reveal something about the characteristics of other prairie plots (D)bases a general conclusion on data that is likely to be unrepresentative (E)takes an increase in number to indicate an increase in proportion

Deciding how to respond to the question. Before I explain, what’s your pick?

To work it out, follow these steps:

1. Find the conclusion. What does the argument claim causes what? 2. Find the evidence. Is it showing that one thing causes another, or only that two things happen together? 3. Ask the usual question for this kind of argument. When two things show up together, could the cause and effect run the other way?

Tell me your answer and why, and I’ll go through each choice with you.

**You:** I got this question wrong

The answer is A.

Breaking down the argument:

- Evidence: Plots with more species also had stronger growth and better soil. That only shows the two things go together, which is a correlation.
- Conclusion: More species improves the prairie’s ability to support plant life. That’s a claim about cause and effect.

The flaw: The cause and effect could run the other way. Maybe good soil came first, and rich soil can support more species. In that case, better soil causes more species, not the reverse. The argument never rules that out, and that’s what A describes.

Why the others are wrong:

- B: An argument doesn’t have to explain how a cause works. Leaving out the mechanism isn’t a flaw on the LSAT.
- C: This is the reverse of what happened. The study looked at many plots, so it isn’t assuming one plot tells you about the others.
- D: Nothing suggests the plots were unusual or that the sample was biased.
- E: The argument never mixes up numbers and percentages.

What to remember: Whenever evidence shows a correlation and the conclusion claims causation, look for reverse causation or a third factor that causes both. A is a standard way of describing that flaw, so you’ll see it again.

Which answer did you pick? It’ll show me which trap got you.

**You:** Help me understand why

Let’s put the argument in plain words, step by step.

What the study saw: In prairie plots with lots of different plant species, the plants were healthier and the soil was richer.

What the author concludes: Having lots of species makes the prairie healthier.

The problem: Seeing two things together doesn’t tell you which one caused the other. There are two ways to read the same facts:

1. Lots of species → healthier soil and plants. This is the author’s version. 2. Healthy, rich soil → lots of species can grow there. This is just as possible.

An everyday example: People who own expensive cars tend to be wealthy. Does buying an expensive car make you wealthy? No. Being wealthy lets you buy the car, so the cause runs the other way.

The prairie works the same way. Good soil may be what lets many species grow. The author picked one direction and never ruled out the other. Answer A describes that mistake: “X and Y go together, so X causes Y,” without checking whether Y causes X.

Check yourself: “Students who sit in the front row get better grades, so sitting in front improves grades.” What’s the reverse-causation explanation?

**You:** I picked answer choice C and D. Can you tell me which traps got me?

Ah, those two are classic traps, and they’re actually related. Both are about the sample, meaning which plots the study looked at. The real flaw is in the reasoning, which jumps from correlation to causation.

C is a “reversed” trap. It accuses the argument of treating one plot as if it tells you about others. But the study compared lots of plots, so the argument never makes that assumption.

D is a “could be true, but not supported” trap. Unrepresentative data is a real flaw on the LSAT, but nothing in the passage says these plots were unusual or chosen in a biased way. You’d be bringing in a problem the argument doesn’t actually have.

So here’s the lesson: before you choose a flaw answer, check whether the problem it names actually shows up in the passage. If the evidence is a correlation and the conclusion says “improves” or “causes,” go straight to the causation answer. Want to try a quick one like it?

**You:** Not right now.

**You:** explain some LSAT concepts to me.

Sure. Let’s start with one that ties into the question you just missed: sufficient versus necessary.

A sufficient condition guarantees the result. If you’re in Houston, you’re definitely in Texas. A necessary condition is required but doesn’t guarantee anything. You have to be in Texas to be in Houston, but being in Texas doesn’t put you in Houston.

The LSAT loves arguments that treat a necessary condition as if it were sufficient. Should I keep going with that, or pick a different concept, like conditional language or assumptions?

**You:** Go with conditional link.

Sure. Conditional language is about the words that tell you which part is sufficient and which part is necessary.

Words like “if,” “when,” “every,” and “all” introduce the sufficient part. “If it rains, the game is cancelled” means rain guarantees a cancellation.

Words like “only if,” “requires,” and “only” introduce the necessary part. “You can enter only if you have a ticket” means a ticket is required, but it doesn’t get you in automatically.

Quick check: in “A lawyer must be licensed,” what’s sufficient and what’s necessary?

**You:** Necessary is licensed.

Exactly. “Only if,” “requires,” and “only” introduce the necessary part. In “You can practice law only if you’re licensed,” being licensed is the necessary condition. It’s required, but it doesn’t guarantee you’re practicing law.

Here’s a quick check. In “Every partner at the firm passed the bar,” which part is sufficient and which is necessary?

**You:** Sufficient is every partner necessary is past the bar.

That’s right. Being a partner guarantees you passed the bar, and passing the bar is required to be a partner.

Next comes the contrapositive, the one valid way to flip a conditional. You reverse the two parts and negate both. So “if partner, then passed the bar” becomes “if you didn’t pass the bar, you’re not a partner.” What’s the contrapositive of “You can practice law only if you’re licensed”?

**You:** If you're not licensed, you can't practice law.

Perfect. Now for the two traps the LSAT sets with conditionals.

The first is the mistaken reversal: flipping without negating. “If you’re licensed, you can practice law” doesn’t follow, because licensing is necessary, not sufficient.

The second is the mistaken negation: negating without flipping. “If you’re not a partner, you didn’t pass the bar” doesn’t follow either.

Try this one: “If it snows, school closes. School closed today. So it snowed.” Which trap is that?

**You:** It's assuming that the school closed because it snowed, but there could be other reasons the school closed.

That’s exactly the problem, and its name is the mistaken reversal. The argument takes “if snow, then closed” and runs it backwards as “if closed, then snow.” Your explanation is the reason that doesn’t work: something else could have closed the school.

One more: “If it snows, school closes. It didn’t snow, so school didn’t close.” Which trap is that one?

**You:** Can you tell me?

Sure, here’s the full question: “If it snows, school closes. It didn’t snow today, so school didn’t close.” Which trap is that?

**You:** That trap is assuming that school didn't close just because it didn't snow, but school could be closed for other reasons.

Exactly, and that one’s called the mistaken negation. It takes “if snow, then closed” and negates both parts without flipping them, which gives you “if no snow, then not closed.”

Both traps make the same mistake: they treat a sufficient condition as if it were the only way to get the result. Want to keep going with conditionals, or try something else?

**You:** Conditionals, uh, or try something else.

Let’s do one that sits between the two: the word “unless.” It confuses a lot of people.

Here’s the trick. Whatever follows “unless” is the necessary condition, and you negate the other part to get the sufficient one. So “You’ll fail unless you study” becomes “If you don’t study, you’ll fail.”

Try it: “The deal won’t close unless both sides sign.” How would you write that as an if- then?

**You:** If both sides don't sign, then the deal won't close.

That’s basically right. One small fix: say “if not both sides sign,” because the deal fails even if just one side refuses. “If both sides don’t sign” sounds like neither one signs.

Now try the contrapositive: if the deal closes, what do we know?

**You:** That both sides signed.

Exactly right. If the deal closed, both sides had to have signed. Signing was necessary.

Here’s the classic trap with “unless”: “Both sides signed, so the deal closed.” Does that follow?

**You:** Yes.

Not quite, that’s the trap. Signing is necessary for the deal to close, but it doesn’t guarantee it. The financing could still fall through, for example. That’s the mistaken reversal again.

“Unless” only tells you what happens when the condition is missing. Want another “unless” question to lock it in?

**You:** Yeah.

Here’s one: “Maria won’t get the scholarship unless she has a 3.5 GPA. Maria didn’t get the scholarship.” What, if anything, can we conclude about her GPA?

**You:** Um, we could conclude that it wasn't 3.5, but it doesn't guarantee that it wasn't 3.5.

Your second half is the right instinct. The answer is that we can’t conclude anything about her GPA.

The 3.5 is necessary, so it only tells you that no 3.5 means no scholarship. Missing the scholarship doesn’t tell you why. She could have a 4.0 and still lose out for some other reason. Concluding that her GPA was below 3.5 would be the mistaken reversal.

Want one more, or switch topics?

**You:** Yeah, one more.

Okay: “The bill won’t pass unless the governor supports it. The governor doesn’t support it.” What can we conclude?

**You:** That the bill won't pass.

Exactly right. The governor’s support is necessary, and it’s missing, so the bill can’t pass. That’s the valid direction: when the necessary condition is gone, so is the result.

You’ve got “unless” down. Want to keep going, or take a break?

**You:** Keep going.

Okay, let’s try chaining conditionals. When the necessary part of one rule is the sufficient part of another, you can link them.

“If you study, you’ll pass. If you pass, you’ll graduate.” So what can we conclude about someone who studies?

**You:** Nothing.

Actually, this time we can conclude something: they’ll graduate. Studying guarantees passing, and passing guarantees graduating, so studying guarantees graduating.

It works because “pass” is the link in the middle. It’s the result of the first rule and the trigger for the second. Try this one: “All lawyers are licensed. Everyone licensed took the bar.” What can we say about lawyers?

**You:** https://youtu.be/Tjdkaq4A-xM?is=4jAznbribccULteh Watch this video and quiz me on it later tonight 

Read a page, managed scheduled tasks

LSAT conditional logic quiz  Nov 22 at 8:00 PM CST (once) · Manual

I couldn’t watch the video itself, because YouTube only gave me its title and chapter list, not a transcript. That’s enough to build the quiz, though. The video is “Master Conditional Logic in 30 Minutes” from 7Sage, and its chapters cover sufficient vs.

necessary, the 4 conditional argument forms, contrapositives, “only if,” “unless,” and chaining conditionals. That’s the same ground we covered today. www.youtube.com

I’ll come back to this chat at 8 pm tonight with 8–10 questions, one at a time. They’ll focus most on “unless” and chaining, since those tripped you up earlier.

You can also finish the chaining question from earlier now: “All lawyers are licensed. Everyone licensed took the bar.” What can we say about lawyers?

Planning a short explanation with check question. This slide sorts arguments into two kinds, and it explains how you’ve been graded on today’s questions.

Formal logic: valid or invalid. Only the structure matters. If the premises are true and the structure is valid, the conclusion has to be true. There’s no middle ground.

- Everything from today’s conditionals session is formal logic. “If snow, then closed.
- Closed, so snow” is invalid because of its structure (the mistaken reversal), whatever the topic is.

Informal logic: strong or weak, or anywhere in between. You judge how well the evidence supports the conclusion. Nothing is guaranteed.

- The prairie question was informal logic. Species and healthy soil go together, so the author concluded that species cause healthy soil. That’s a weak causal argument, and it can be strengthened or weakened.

Why this matters on the test: Strengthen and Weaken questions only make sense for informal arguments. You can’t strengthen a formal argument that’s already valid, and an invalid formal argument is broken by its structure, so new facts don’t help it.

Quick check: Which kind is each of these, and how would you grade it?

1. “All judges are lawyers. Kim is a judge. So Kim is a lawyer.” 2. “Towns that built parks saw crime drop, so parks reduce crime.”

I’ll add this to tonight’s quiz too.

This slide turns sufficient and necessary into a picture: a small circle inside a bigger one.

Think Houston inside Texas.

- Houston is the subset, the small circle. Texas is the superset, the big circle around it.
- Subset → sufficient. Being in Houston guarantees you’re in Texas. But you don’t need Houston to be in Texas, because you could be in Dallas. So it’s sufficient, not necessary.
- Superset → necessary. You must be in Texas to be in Houston. But being in Texas doesn’t put you in Houston. So it’s necessary, not sufficient.

Why it’s the #1 trap: Every flipped mistake you saw today confuses the small circle with the big one.

- “Both sides signed, so the deal closed.” Signing is the big circle (necessary). Being in the big circle doesn’t put you in the small one. “School closed, so it snowed.” Closing is the big circle. Snow days sit inside it alongside other reasons, like holidays.

A quick test you can use: Ask which group is the smaller one, meaning which one fits entirely inside the other. That’s your sufficient condition.

Check yourself: “Every 7Sage student is an LSAT taker.” Which is the subset and which is the superset? And what can you conclude about someone who is not an LSAT taker?

**You:** Add this to tonight’s quiz 

Loaded tools Done. Tonight’s 8 pm quiz now covers the subset/superset slide, along with conditional logic and formal vs. informal logic. It’s about 10–12 questions.

The quiz is set to run through your MacBook Pro, so keep it on and online around 8 pm.

**You:** I just learned this

Nice. The most important idea on this chart is in Example 3: “If one is a turtle, then one is a ninja.” That’s obviously false in real life, but the argument is still valid.

Validity only asks one question: if the premises were true, would the conclusion have to be true? If Donatello sits inside the turtle circle and the turtle circle sits inside the ninja circle, Donatello has to be a ninja. The structure guarantees it, whatever the content is.

This matters on the LSAT because Must Be True and Sufficient Assumption questions ask you to accept the premises as given. Don’t argue with them using real-world knowledge.

Check yourself: Using the same circles, “Donatello is a ninja, so Donatello is a turtle.” Valid or invalid? Why?

Want me to add this chart to tonight’s quiz too?

**You:** I just learned this 

Updated scheduled task This slide explains why the turtle-ninja argument counts as valid.

Two separate questions:

- Truth: Is each statement accurate? You ask this about premises and conclusions.
- Validity: If the premises were true, would the conclusion have to follow? You ask this about the argument as a whole.

That gives you four possibilities:

- Valid, true premises: “All cats are mammals. Athena is a cat. So Athena is a mammal.”

- Valid, false premises: “All turtles are ninjas. Donatello is a turtle. So he’s a ninja.” The structure is fine even though the facts are wrong.
- Invalid, true statements: “All cats are mammals. Athena is a mammal. So Athena is a cat.” Every statement could be true, but the reasoning reverses the conditional.
- Invalid, false statements: wrong facts and broken reasoning.

What this means for the test: The LSAT never asks whether a premise is factually true. It only asks whether the reasoning holds. If you catch yourself thinking “but that’s not true in real life,” stop and accept the premise.

Check yourself: “All lawyers are doctors. Sam is a lawyer. So Sam is a doctor.” Valid or invalid? Are the premises true?

I’ve added this slide and the conditional-argument chart to tonight’s 8 pm quiz. 

Updated scheduled task

**You:** I just learned this as well

Lawgic is shorthand for everything you’ve learned today. The arrow always points from sufficient to necessary, which is the same as from the small circle to the big circle.

Translating:

- “If one is a cat, then one is a mammal” → cat → mammal

- “Every partner passed the bar” → partner → passed bar “You can practice law only if you’re licensed” → practice law → licensed. The part after “only if” is the necessary condition, so it goes at the arrowhead.

Why the arrow helps:

- Valid: follow the arrow forward. Luke is a Jedi, so Luke uses the Force.
- Contrapositive: flip the arrow and negate both sides. Not a mammal → not a cat.
- The trap: going backwards against the arrow. “Athena is a mammal, so she’s a cat” is the mistaken reversal.

Try it: Write these in arrows.

1. “A contract is valid only if both parties signed.” 2. “The bill won’t pass unless the governor supports it.” Hint: whatever follows “unless” goes at the arrowhead, and you negate the other part.

I’ve added Lawgic to tonight’s quiz as well.

**You:** I Just learned this as well

Deciding whether to add subscript notation to the quiz. These slides put together everything from today. The same argument appears three ways:

- Visual: the Empire State Building is a dot inside the NYC circle, and the NYC circle is inside the USA circle.
- English: if something is in NYC, it’s in the USA. The ESB is in NYC. So the ESB is in the USA.
- Lawgic: NYC → USA, then ₓNYC, a line, and ₓUSA.

Reading the notation:

- A → B is the rule: everything in A is in B. ₓA (the small x below and to the left) means one specific thing, x, is in A. Here x stands for the ESB.
- The horizontal line separates the premises above it from the conclusion below it.

The shape to memorize: A→B ₓA ─── ₓB

Why it matters: Once you see this shape, the topic doesn’t matter. Jedi, cats, turtles and buildings all follow the same pattern. That’s what 7Sage means by de-emphasizing the content and highlighting the form.

Try it: Write this in Lawgic. “Every licensed attorney passed the bar. Maria is a licensed attorney. So Maria passed the bar.”

Then a harder one: what’s wrong with this shape? A→B ₓB ─── ₓA

Tonight’s quiz already covers the conditional argument and Lawgic, so you’ll see this again at 8.

**You:** Just learned this as well

These slides show that two arguments that look different are really the same argument.

Argument 1 is about groups: All cats are mammals, Garfield is a cat, so Garfield is a mammal. It talks about things belonging to groups.

Argument 2 is about conditions: If new restaurants open, living standards improve. Restaurants will open, so living standards improve. It talks about events triggering results.

Written out, both have the same shape: A→B A ─── B

One small difference in the notation: Argument 1 puts a subscript (ᵍC) on the premise because it’s about one specific member, Garfield. Argument 2 has no subscript because it’s about whether an event happens, not about a member of a group.

Why it matters: On the LSAT, “All X are Y,” “Every X is Y” and “If X, then Y” all translate to X → Y. Once you’ve written the arrow, you can handle them the same way.

Try it: Translate both of these into Lawgic and decide if they’re valid:

1. “Every judge is a lawyer. Ana is a judge. So Ana is a lawyer.” 2. “If it rains, the trial is postponed. The trial was postponed. So it rained.”
