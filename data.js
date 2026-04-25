// ===== CSCA PREP DATA =====
// All content for the app: lessons, flashcards, vocab, practice questions

const DAILY_MOTIVATIONS = [
  "Tsinghua doesn't accept excuses. Open your notes NOW.",
  "Your competition studied 3 hours yesterday. What did you do?",
  "Every character you skip today is a point you lose on exam day.",
  "北京大学 isn't waiting for you to feel ready. GET UP.",
  "The gap between you and your dream school closes ONE card at a time.",
  "You think the kid who gets in is scrolling their phone right now? They're NOT.",
  "Your future self is either thanking you or cursing you. Choose.",
  "Mediocrity is comfortable. Excellence is you, studying right now.",
  "The CSCA has a 90%+ ceiling. You're going to smash through it.",
  "Top universities pick students who outwork everyone. Are you that student?",
  "Three hours of deep study beats ten hours of half-focus. Lock in.",
  "Your streak is on the line. Don't break what took weeks to build.",
  "Imagine seeing your name on the Tsinghua acceptance list. Now EARN it.",
  "The exam doesn't care about your mood. Show up anyway.",
  "One lesson today. Just one. Then another. Then another. That's how it works.",
  "Your classmates are studying right now. This is your reminder to catch up.",
  "Hard work beats talent when talent doesn't work hard. Today is your edge.",
  "The difference between 85% and 95%? About 2 hours a day of real focus.",
  "No notes study themselves. YOU have to do this. Start now.",
  "Sleep after you've earned it. Study first.",
  "You've come too far to slow down now. One more session.",
  "Dream big. Study bigger. 加油！",
  "Every flashcard is a step. Every lesson is a stride. Keep moving.",
  "Your brain grows when it's uncomfortable. Get uncomfortable.",
  "Comfort zone = average scores. Discomfort = top university. Choose.",
  "The student who reviews daily remembers 80% more. BE that student.",
  "你能做到! (You can do it!) Now prove it with action.",
  "The test is coming. Are you ready? If not, start NOW.",
  "Great scores don't happen overnight. They're built today. And tomorrow. And the day after.",
  "一步一步，你会成功。One step at a time — you will succeed."
];

const CSCA_TOPICS = [
  { id: "listening", name: "Listening Comprehension", icon: "🎧", color: "#F472B6", desc: "Audio passages, dialogues, and announcements" },
  { id: "reading", name: "Reading Comprehension", icon: "📖", color: "#60A5FA", desc: "Articles, essays, and literary passages" },
  { id: "grammar", name: "Grammar & Structure", icon: "✏️", color: "#4ADE80", desc: "Sentence patterns, particles, measure words" },
  { id: "vocab", name: "Vocabulary", icon: "🔤", color: "#FACC15", desc: "Characters, idioms, and word usage" },
  { id: "writing", name: "Writing", icon: "📝", color: "#A78BFA", desc: "Essay writing, composition, and expression" },
  { id: "culture", name: "Culture & History", icon: "🏮", color: "#FB923C", desc: "Chinese culture, traditions, and history" },
  { id: "characters", name: "Character Recognition", icon: "字", color: "#F87171", desc: "Reading and writing Chinese characters" },
  { id: "idioms", name: "Chengyu & Idioms", icon: "📜", color: "#34D399", desc: "Four-character idioms and proverbs" }
];

const LESSONS = [
  {
    id: "l1",
    category: "grammar",
    categoryName: "Grammar & Structure",
    title: "The 把 (bǎ) Construction",
    desc: "Master the disposal construction — essential for advanced written Chinese.",
    duration: "25 min",
    xp: 50,
    content: `
      <h2>The 把 (bǎ) Construction — Disposal Sentences</h2>
      <p>The 把 sentence is one of the most important — and most tested — structures in Chinese. It allows you to move the object before the verb to emphasize what happens TO the object.</p>

      <h3>Basic Structure</h3>
      <div class="formula">Subject + 把 + Object + Verb + Complement/Resultative</div>
      <p>The key rule: after 把, the verb CANNOT stand alone. It must be followed by a complement, 了, a directional phrase, or another element.</p>

      <div class="callout"><strong>Remember:</strong> 把 sentences are about disposal — doing something TO an object that results in a change. The object must be specific (definite), not general.</div>

      <h3>Common Patterns</h3>
      <ul>
        <li><strong>把 + Object + V + 了：</strong>我把作业做了。(I finished the homework.)</li>
        <li><strong>把 + Object + V + 在 + Place：</strong>他把书放在桌子上。(He put the book on the table.)</li>
        <li><strong>把 + Object + V + 给 + Person：</strong>她把礼物给了他。(She gave the gift to him.)</li>
        <li><strong>把 + Object + V + 成：</strong>我把句子翻译成英语。(I translated the sentence into English.)</li>
        <li><strong>把 + Object + V + 得 + Complement：</strong>他把房间打扫得很干净。(He cleaned the room very clean.)</li>
      </ul>

      <h3>When You CANNOT Use 把</h3>
      <div class="example">
        <p>❌ Objects that are NOT definite: 我把一本书看完了 ✗ (一本 = indefinite)</p>
        <p>❌ Verbs of perception/cognition: 喜欢, 知道, 是, 有, 认识 cannot follow 把</p>
        <p>❌ Simple existence: "There is/are" sentences</p>
        <p>❌ Negative sentences with 不: usually use 没 instead (我没把书拿来)</p>
      </div>

      <h3>CSCA Exam Tips</h3>
      <ul>
        <li>Fill-in-the-blank: watch for 把 sentences with missing complements</li>
        <li>Error correction: naked verbs after 把 are always wrong</li>
        <li>Writing: use 把 to vary sentence structure and show advanced grammar</li>
        <li>Common mistakes: forgetting the resultative complement after the verb</li>
      </ul>

      <h2>Practice Examples</h2>
      <div class="vocab-box">
        <div class="vocab-item"><div class="vocab-char">把书读完</div><div class="vocab-pin">bǎ shū dú wán</div><div class="vocab-eng">finish reading the book</div></div>
        <div class="vocab-item"><div class="vocab-char">把饭吃了</div><div class="vocab-pin">bǎ fàn chī le</div><div class="vocab-eng">eat up the food</div></div>
        <div class="vocab-item"><div class="vocab-char">把门关上</div><div class="vocab-pin">bǎ mén guān shàng</div><div class="vocab-eng">close the door</div></div>
        <div class="vocab-item"><div class="vocab-char">把窗户打开</div><div class="vocab-pin">bǎ chuānghu dǎ kāi</div><div class="vocab-eng">open the window</div></div>
      </div>
    `
  },
  {
    id: "l2",
    category: "grammar",
    categoryName: "Grammar & Structure",
    title: "被 (bèi) Passive Construction",
    desc: "The passive voice in Chinese — how actions happen TO the subject.",
    duration: "20 min",
    xp: 45,
    content: `
      <h2>被 (bèi) — The Passive Voice</h2>
      <p>被 sentences indicate that the subject RECEIVES the action, often with a negative or undesirable outcome. This is a high-frequency exam structure.</p>

      <h3>Structure</h3>
      <div class="formula">Subject (receiver) + 被 + Agent (doer) + Verb + Complement</div>

      <h3>Key Rules</h3>
      <ul>
        <li>The agent (doer) can be omitted if unknown or obvious</li>
        <li>Like 把, the verb needs a complement — cannot stand alone</li>
        <li>Traditionally conveys negative/undesirable outcomes (被打了，被骗了)</li>
        <li>Modern Chinese increasingly uses 被 for neutral/positive events</li>
      </ul>

      <div class="callout"><strong>Cultural Note:</strong> In classical Chinese, 被 always implied something bad happened. The CSCA may test your awareness of this traditional usage alongside modern usage.</div>

      <h3>Examples</h3>
      <ul>
        <li>他被老师批评了。(He was criticized by the teacher.)</li>
        <li>那本书被我看完了。(That book was finished by me.)</li>
        <li>她的手机被偷了。(Her phone was stolen.)</li>
        <li>这个问题被解决了。(This problem was solved.)</li>
      </ul>

      <h3>Comparing 把 and 被</h3>
      <div class="example">
        <p>把: Subject is the DOER → 我把书读完了 (I finished reading the book)</p>
        <p>被: Subject is the RECEIVER → 书被我读完了 (The book was finished by me)</p>
        <p>Both sentences describe the same event, just from different perspectives!</p>
      </div>
    `
  },
  {
    id: "l3",
    category: "grammar",
    categoryName: "Grammar & Structure",
    title: "Complement Types: Resultative, Directional, Potential",
    desc: "The backbone of Chinese verb phrases — you must know all three types.",
    duration: "35 min",
    xp: 65,
    content: `
      <h2>Verb Complements — Complete Guide</h2>
      <p>Complements are one of the most tested areas on the CSCA. Unlike English, Chinese relies heavily on post-verbal complements to convey tense, direction, and result.</p>

      <h3>1. Resultative Complements (结果补语)</h3>
      <p>Indicate the RESULT of an action. Join directly to the verb with no space.</p>
      <div class="formula">Verb + Result: 写完 (finish writing), 听懂 (understand by listening), 看见 (see)</div>
      <ul>
        <li>好 (well/properly): 准备好 (prepared well)</li>
        <li>完 (finished): 做完 (finished doing)</li>
        <li>懂 (understood): 看懂 (read and understand)</li>
        <li>到 (reached goal): 找到 (found)</li>
        <li>错 (wrongly): 写错 (wrote incorrectly)</li>
      </ul>

      <h3>2. Directional Complements (趋向补语)</h3>
      <p>Indicate direction of movement. Simple (来/去) or compound (上来/下去/进来).</p>
      <div class="formula">Verb + 来/去: 走来 (walk over here), 跑去 (run over there)</div>
      <ul>
        <li>进来/进去: come in / go in</li>
        <li>出来/出去: come out / go out</li>
        <li>上来/上去: come up / go up</li>
        <li>下来/下去: come down / go down</li>
        <li>回来/回去: come back / go back</li>
      </ul>

      <h3>3. Potential Complements (可能补语)</h3>
      <p>Indicate WHETHER an action can be completed. Insert 得/不 between verb and result.</p>
      <div class="formula">Verb + 得/不 + Result: 听得懂 (can understand) / 听不懂 (cannot understand)</div>

      <div class="callout"><strong>CSCA Trap:</strong> Potential complements CANNOT be used with 了, 过, or aspect markers. This is a classic error-detection item!</div>

      <h3>Degree Complements (程度补语)</h3>
      <p>Use 得 + degree word to describe how an action is performed.</p>
      <div class="formula">Verb + 得 + Degree: 说得很流利 (speaks fluently), 写得很漂亮 (writes beautifully)</div>

      <div class="example">
        <p><strong>Object placement with 得:</strong> When there IS an object, repeat the verb:</p>
        <p>他中文说得很好 ✓ (His Chinese, he speaks it well)</p>
        <p>他说中文说得很好 ✓ (He speaks Chinese well)</p>
        <p>他说得中文很好 ✗ (WRONG — cannot place object between verb and 得)</p>
      </div>
    `
  },
  {
    id: "l4",
    category: "vocab",
    categoryName: "Vocabulary",
    title: "High-Frequency CSCA Vocabulary: Level 1",
    desc: "The 100 most tested words — master these before anything else.",
    duration: "30 min",
    xp: 55,
    content: `
      <h2>Core Vocabulary — 100 Essential Words</h2>
      <p>These characters appear on virtually every CSCA exam. Recognize them on sight. Know their usage in sentences. Some have nuanced meanings tested in context.</p>

      <h3>Category 1: Time & Sequence</h3>
      <div class="vocab-box">
        <div class="vocab-item"><div class="vocab-char">立刻</div><div class="vocab-pin">lìkè</div><div class="vocab-eng">immediately</div></div>
        <div class="vocab-item"><div class="vocab-char">逐渐</div><div class="vocab-pin">zhújiàn</div><div class="vocab-eng">gradually</div></div>
        <div class="vocab-item"><div class="vocab-char">曾经</div><div class="vocab-pin">céngjīng</div><div class="vocab-eng">once, formerly</div></div>
        <div class="vocab-item"><div class="vocab-char">终于</div><div class="vocab-pin">zhōngyú</div><div class="vocab-eng">finally, at last</div></div>
        <div class="vocab-item"><div class="vocab-char">偶尔</div><div class="vocab-pin">ǒu'ěr</div><div class="vocab-eng">occasionally</div></div>
        <div class="vocab-item"><div class="vocab-char">仍然</div><div class="vocab-pin">réngrán</div><div class="vocab-eng">still, nevertheless</div></div>
      </div>

      <h3>Category 2: Emotions & Mental States</h3>
      <div class="vocab-box">
        <div class="vocab-item"><div class="vocab-char">惊讶</div><div class="vocab-pin">jīngyà</div><div class="vocab-eng">surprised, astonished</div></div>
        <div class="vocab-item"><div class="vocab-char">遗憾</div><div class="vocab-pin">yíhàn</div><div class="vocab-eng">regret, pity</div></div>
        <div class="vocab-item"><div class="vocab-char">委屈</div><div class="vocab-pin">wěiqu</div><div class="vocab-eng">feel wronged</div></div>
        <div class="vocab-item"><div class="vocab-char">羡慕</div><div class="vocab-pin">xiànmù</div><div class="vocab-eng">envy, admire</div></div>
        <div class="vocab-item"><div class="vocab-char">尴尬</div><div class="vocab-pin">gāngà</div><div class="vocab-eng">awkward, embarrassed</div></div>
        <div class="vocab-item"><div class="vocab-char">感激</div><div class="vocab-pin">gǎnjī</div><div class="vocab-eng">grateful, thankful</div></div>
      </div>

      <h3>Category 3: Academic & Formal Vocabulary</h3>
      <div class="vocab-box">
        <div class="vocab-item"><div class="vocab-char">论述</div><div class="vocab-pin">lùnshù</div><div class="vocab-eng">discuss, elaborate</div></div>
        <div class="vocab-item"><div class="vocab-char">概念</div><div class="vocab-pin">gàiniàn</div><div class="vocab-eng">concept, idea</div></div>
        <div class="vocab-item"><div class="vocab-char">影响</div><div class="vocab-pin">yǐngxiǎng</div><div class="vocab-eng">influence, impact</div></div>
        <div class="vocab-item"><div class="vocab-char">强调</div><div class="vocab-pin">qiángdiào</div><div class="vocab-eng">emphasize, stress</div></div>
        <div class="vocab-item"><div class="vocab-char">分析</div><div class="vocab-pin">fēnxī</div><div class="vocab-eng">analyze, analysis</div></div>
        <div class="vocab-item"><div class="vocab-char">总结</div><div class="vocab-pin">zǒngjié</div><div class="vocab-eng">summarize, summary</div></div>
      </div>

      <div class="callout"><strong>Study Tip:</strong> For each word, memorize one example sentence. The CSCA doesn't test definitions alone — it tests usage in context.</div>

      <h3>Confusing Pairs — Exam Favorites</h3>
      <ul>
        <li><strong>发现 vs 发明:</strong> 发现 = discover (something already exists), 发明 = invent (create something new)</li>
        <li><strong>改变 vs 改善:</strong> 改变 = change (neutral), 改善 = improve (positive change)</li>
        <li><strong>希望 vs 盼望:</strong> 希望 = hope (general), 盼望 = yearn/long for (stronger, more emotional)</li>
        <li><strong>以为 vs 认为:</strong> 以为 = mistakenly think, 认为 = believe/consider (neutral)</li>
        <li><strong>增加 vs 增长:</strong> 增加 = add more of something, 增长 = grow/increase (rate/amount)</li>
      </ul>
    `
  },
  {
    id: "l5",
    category: "listening",
    categoryName: "Listening Comprehension",
    title: "Listening Strategies: News Broadcasts",
    desc: "The CSCA tests news-format audio — here's how to decode it fast.",
    duration: "20 min",
    xp: 40,
    content: `
      <h2>News Broadcast Listening — Strategy Guide</h2>
      <p>News-style listening is one of the hardest sections for non-native speakers. The speech is fast, vocabulary is formal, and content is dense. These strategies will help.</p>

      <h3>The 5W Framework</h3>
      <p>News always answers: WHO, WHAT, WHEN, WHERE, WHY. Train yourself to note these in real-time.</p>
      <div class="example">
        <p>WHO (谁): Names, titles, organizations</p>
        <p>WHAT (什么): Event, action, announcement</p>
        <p>WHEN (什么时候): Dates, times, sequences</p>
        <p>WHERE (哪里/何处): Locations, venues</p>
        <p>WHY (为什么/原因): Causes, explanations</p>
      </div>

      <h3>High-Frequency News Vocabulary</h3>
      <div class="vocab-box">
        <div class="vocab-item"><div class="vocab-char">据报道</div><div class="vocab-pin">jù bàodào</div><div class="vocab-eng">according to reports</div></div>
        <div class="vocab-item"><div class="vocab-char">宣布</div><div class="vocab-pin">xuānbù</div><div class="vocab-eng">announce, declare</div></div>
        <div class="vocab-item"><div class="vocab-char">表示</div><div class="vocab-pin">biǎoshì</div><div class="vocab-eng">indicate, express</div></div>
        <div class="vocab-item"><div class="vocab-char">举行</div><div class="vocab-pin">jǔxíng</div><div class="vocab-eng">hold (an event)</div></div>
        <div class="vocab-item"><div class="vocab-char">针对</div><div class="vocab-pin">zhēnduì</div><div class="vocab-eng">in response to, regarding</div></div>
        <div class="vocab-item"><div class="vocab-char">实施</div><div class="vocab-pin">shíshī</div><div class="vocab-eng">implement, carry out</div></div>
      </div>

      <h3>Prediction Strategy</h3>
      <ul>
        <li>Read the questions BEFORE listening — know what to listen for</li>
        <li>News openings contain the main point — pay maximum attention to the first 5 seconds</li>
        <li>Numbers and names are rarely paraphrased — note them verbatim</li>
        <li>Signal words predict structure: 首先 (first), 其次 (second), 最后 (finally)</li>
      </ul>

      <div class="callout"><strong>Common Trap:</strong> The CSCA often puts misleading information early and the correct answer at the end. Don't mark your answer until the passage is complete.</div>

      <h3>Practice Exercises</h3>
      <p>For each sample passage, practice:</p>
      <ol>
        <li>Write down the 5Ws immediately after listening</li>
        <li>Note any numbers, dates, and proper nouns</li>
        <li>Identify the speaker's attitude (positive/negative/neutral)</li>
        <li>Predict what question types would appear about this passage</li>
      </ol>
    `
  },
  {
    id: "l6",
    category: "writing",
    categoryName: "Writing",
    title: "Essay Writing: Structure & Argument",
    desc: "How to write a Band 9 Chinese essay under exam conditions.",
    duration: "40 min",
    xp: 70,
    content: `
      <h2>CSCA Essay Writing — Complete Framework</h2>
      <p>Chinese essays on the CSCA are scored on structure, vocabulary range, grammar accuracy, and coherence. This guide gives you the template to score 90%+ on writing.</p>

      <h3>The Three-Part Structure (三段式)</h3>
      <div class="formula">引言 (Introduction) → 主体 (Body) → 结论 (Conclusion)</div>

      <h3>Opening Patterns (引言)</h3>
      <p>Never start with "我认为..." — use one of these strong openers:</p>
      <ul>
        <li><strong>Quote/Proverb:</strong> 俗话说，"..."，这句话告诉我们...</li>
        <li><strong>Rhetorical question:</strong> 在当今社会，...难道不值得我们深思吗？</li>
        <li><strong>Data/Phenomenon:</strong> 随着...的发展，越来越多的人...</li>
        <li><strong>Contrast:</strong> 虽然...，但是现实情况是...</li>
      </ul>

      <h3>Body Paragraph Connectors</h3>
      <div class="vocab-box">
        <div class="vocab-item"><div class="vocab-char">首先</div><div class="vocab-pin">shǒuxiān</div><div class="vocab-eng">first of all</div></div>
        <div class="vocab-item"><div class="vocab-char">其次</div><div class="vocab-pin">qícì</div><div class="vocab-eng">secondly</div></div>
        <div class="vocab-item"><div class="vocab-char">此外</div><div class="vocab-pin">cǐwài</div><div class="vocab-eng">furthermore</div></div>
        <div class="vocab-item"><div class="vocab-char">最重要的是</div><div class="vocab-pin">zuì zhòng要 de shì</div><div class="vocab-eng">most importantly</div></div>
        <div class="vocab-item"><div class="vocab-char">由此可见</div><div class="vocab-pin">yóucǐ kějiàn</div><div class="vocab-eng">from this we can see</div></div>
        <div class="vocab-item"><div class="vocab-char">综上所述</div><div class="vocab-pin">zōng shàng suǒ shù</div><div class="vocab-eng">in summary</div></div>
      </div>

      <h3>Sentence Variety Checklist</h3>
      <ul>
        <li>✅ At least one 把 sentence</li>
        <li>✅ At least one 被 sentence (if appropriate)</li>
        <li>✅ One complex sentence with 虽然...但是 or 尽管...仍然</li>
        <li>✅ One sentence using a four-character idiom (成语)</li>
        <li>✅ One sentence using 不但...而且 or 不仅...还</li>
        <li>✅ A concluding sentence with 总之/综上所述</li>
      </ul>

      <div class="callout"><strong>Scoring Tip:</strong> Examiners reward RANGE. Using 10 different connectors beats using 3 correctly. Show off your vocabulary — that's what the CSCA tests.</div>

      <h3>Common Essay Topics & Key Vocabulary</h3>
      <ul>
        <li><strong>Technology & Modern Life:</strong> 科技, 网络, 人工智能, 手机依赖</li>
        <li><strong>Environment:</strong> 环境保护, 可持续发展, 全球变暖</li>
        <li><strong>Education:</strong> 应试教育, 素质教育, 学习压力</li>
        <li><strong>Tradition vs Modern:</strong> 传统文化, 继承与发展, 现代化</li>
        <li><strong>Health & Lifestyle:</strong> 生活习惯, 身心健康, 均衡饮食</li>
      </ul>
    `
  },
  {
    id: "l7",
    category: "culture",
    categoryName: "Culture & History",
    title: "Chinese Festivals & Traditions",
    desc: "Cultural knowledge tested on the CSCA — traditions, dates, and meanings.",
    duration: "25 min",
    xp: 45,
    content: `
      <h2>Chinese Festivals & Cultural Traditions</h2>
      <p>The CSCA regularly tests cultural knowledge in reading passages, listening clips, and sometimes directly. Know these cold.</p>

      <h3>Major Festivals</h3>

      <h3>🧨 春节 (Chūnjié) — Chinese New Year</h3>
      <ul>
        <li>Date: First day of the first lunar month</li>
        <li>Duration: 15 days, ending with Lantern Festival</li>
        <li>Key traditions: 贴春联 (spring couplets), 放鞭炮 (firecrackers), 包饺子 (dumplings), 红包 (red envelopes)</li>
        <li>Symbolic foods: 鱼 (fish — surplus/abundance), 年糕 (New Year cake — rising prosperity), 饺子 (dumplings — shaped like gold ingots)</li>
      </ul>

      <h3>🌕 中秋节 (Zhōngqiūjié) — Mid-Autumn Festival</h3>
      <ul>
        <li>Date: 15th day of the 8th lunar month (full moon)</li>
        <li>Key traditions: 赏月 (moon gazing), 吃月饼 (mooncakes), 提灯笼 (lanterns)</li>
        <li>Legend: 嫦娥奔月 (Chang'e flying to the moon), 吴刚伐桂 (Wu Gang chopping the cassia tree)</li>
      </ul>

      <h3>端午节 (Duānwǔjié) — Dragon Boat Festival</h3>
      <ul>
        <li>Date: 5th day of the 5th lunar month</li>
        <li>Origins: Commemoration of poet 屈原 (Qū Yuán)</li>
        <li>Traditions: 赛龙舟 (dragon boat racing), 吃粽子 (sticky rice dumplings), 挂艾草 (hanging mugwort)</li>
      </ul>

      <h3>清明节 (Qīngmíngjié) — Tomb-Sweeping Day</h3>
      <ul>
        <li>Date: 4th or 5th of April (solar calendar)</li>
        <li>Purpose: Honor ancestors, sweep tombs, remember the deceased</li>
        <li>Traditions: 扫墓 (tomb sweeping), 踏青 (spring outings)</li>
      </ul>

      <div class="callout"><strong>CSCA Note:</strong> Exam questions often ask about the origins, symbolic meanings, and associated foods/activities of each festival. Memorize the connection between each festival and its legend.</div>

      <h3>Key Cultural Concepts</h3>
      <ul>
        <li><strong>孝顺 (xiàoshùn):</strong> Filial piety — respect for parents and elders. Foundational Confucian value.</li>
        <li><strong>面子 (miànzi):</strong> "Face" — social status and dignity. Giving/losing face in social interactions.</li>
        <li><strong>四大发明 (Sì Dà Fāmíng):</strong> Four great inventions — 造纸 (paper), 印刷 (printing), 火药 (gunpowder), 指南针 (compass)</li>
        <li><strong>诸子百家 (Zhūzǐ Bǎijiā):</strong> Hundred Schools of Thought — Confucianism, Taoism, Legalism, Mohism</li>
      </ul>
    `
  },
  {
    id: "l8",
    category: "idioms",
    categoryName: "Chengyu & Idioms",
    title: "Essential 成语 (Chengyu) for the CSCA",
    desc: "Master the 50 most-tested four-character idioms. These appear EVERY year.",
    duration: "35 min",
    xp: 60,
    content: `
      <h2>成语 (Chéngyǔ) — Four-Character Idioms</h2>
      <p>Chengyu are condensed stories or wisdom from classical Chinese. The CSCA tests them in fill-in-the-blank, matching, and reading comprehension. You need at least 50.</p>

      <h3>Tier 1: Absolute Must-Knows</h3>
      <div class="vocab-box">
        <div class="vocab-item"><div class="vocab-char">一石二鸟</div><div class="vocab-pin">yī shí èr niǎo</div><div class="vocab-eng">kill two birds with one stone</div></div>
        <div class="vocab-item"><div class="vocab-char">半途而废</div><div class="vocab-pin">bàn tú ér fèi</div><div class="vocab-eng">give up halfway</div></div>
        <div class="vocab-item"><div class="vocab-char">马到成功</div><div class="vocab-pin">mǎ dào chéng gōng</div><div class="vocab-eng">immediate success</div></div>
        <div class="vocab-item"><div class="vocab-char">一帆风顺</div><div class="vocab-pin">yī fān fēng shùn</div><div class="vocab-eng">smooth sailing</div></div>
        <div class="vocab-item"><div class="vocab-char">刻苦学习</div><div class="vocab-pin">kè kǔ xué xí</div><div class="vocab-eng">study diligently</div></div>
        <div class="vocab-item"><div class="vocab-char">异口同声</div><div class="vocab-pin">yì kǒu tóng shēng</div><div class="vocab-eng">speak in unison</div></div>
        <div class="vocab-item"><div class="vocab-char">望眼欲穿</div><div class="vocab-pin">wàng yǎn yù chuān</div><div class="vocab-eng">look forward eagerly</div></div>
        <div class="vocab-item"><div class="vocab-char">前功尽弃</div><div class="vocab-pin">qián gōng jìn qì</div><div class="vocab-eng">all previous efforts wasted</div></div>
      </div>

      <h3>Tier 2: Appear Frequently</h3>
      <div class="vocab-box">
        <div class="vocab-item"><div class="vocab-char">守株待兔</div><div class="vocab-pin">shǒu zhū dài tù</div><div class="vocab-eng">wait for windfall passively</div></div>
        <div class="vocab-item"><div class="vocab-char">对牛弹琴</div><div class="vocab-pin">duì niú tán qín</div><div class="vocab-eng">cast pearls before swine</div></div>
        <div class="vocab-item"><div class="vocab-char">画蛇添足</div><div class="vocab-pin">huà shé tiān zú</div><div class="vocab-eng">ruin by overdoing</div></div>
        <div class="vocab-item"><div class="vocab-char">亡羊补牢</div><div class="vocab-pin">wáng yáng bǔ láo</div><div class="vocab-eng">better late than never</div></div>
        <div class="vocab-item"><div class="vocab-char">杞人忧天</div><div class="vocab-pin">qǐ rén yōu tiān</div><div class="vocab-eng">needless worry</div></div>
        <div class="vocab-item"><div class="vocab-char">掩耳盗铃</div><div class="vocab-pin">yǎn ěr dào líng</div><div class="vocab-eng">self-deception</div></div>
        <div class="vocab-item"><div class="vocab-char">滴水穿石</div><div class="vocab-pin">dī shuǐ chuān shí</div><div class="vocab-eng">perseverance prevails</div></div>
        <div class="vocab-item"><div class="vocab-char">脚踏实地</div><div class="vocab-pin">jiǎo tà shí dì</div><div class="vocab-eng">down-to-earth, practical</div></div>
      </div>

      <h3>How to Learn Chengyu Effectively</h3>
      <ol>
        <li><strong>Learn the story:</strong> Each idiom has an origin story. The story makes it memorable.</li>
        <li><strong>Learn the context:</strong> Which situations is it used in? Positive or negative?</li>
        <li><strong>Learn antonyms:</strong> The exam often asks you to choose between chengyu with opposite meanings.</li>
        <li><strong>Write sentences:</strong> Use each chengyu in a sentence of your own.</li>
      </ol>

      <div class="callout"><strong>Exam Pattern:</strong> Fill-in-the-blank often gives you 4-5 chengyu and you must choose the right one based on context. Focus on the NUANCE between similar chengyu — e.g., 刻苦学习 (diligent study) vs 废寝忘食 (so absorbed you forget to eat and sleep).</div>
    `
  },
  {
    id: "l9",
    category: "reading",
    categoryName: "Reading Comprehension",
    title: "Reading Strategies: Finding Main Ideas",
    desc: "Speed-read like a pro. Find answers before the clock runs out.",
    duration: "20 min",
    xp: 40,
    content: `
      <h2>Reading Comprehension Strategy Guide</h2>
      <p>Chinese reading passages on the CSCA are usually 400-800 characters. You have limited time. These strategies maximize your score per minute.</p>

      <h3>The SCAN-READ-VERIFY Method</h3>
      <ol>
        <li><strong>SCAN the questions first</strong> — 30 seconds. Note what you're looking for: dates, names, the author's opinion, specific facts.</li>
        <li><strong>READ the passage strategically</strong> — read the first sentence of every paragraph carefully. They contain the main ideas. Skim the middle. Read the last paragraph carefully.</li>
        <li><strong>VERIFY your answers</strong> — go back to the specific line in the passage. NEVER answer from memory alone on inference questions.</li>
      </ol>

      <h3>Passage Structure Signals</h3>
      <div class="example">
        <p><strong>Topic sentences:</strong> Usually first or last sentence of paragraph</p>
        <p><strong>Contrast signals:</strong> 但是, 然而, 不过, 尽管, 虽然 → often contain the KEY point</p>
        <p><strong>Conclusion signals:</strong> 总之, 因此, 由此, 可见 → answer "what is the author's conclusion?" questions</p>
        <p><strong>Example signals:</strong> 比如, 例如, 以...为例 → support details, usually NOT main idea</p>
      </div>

      <h3>Inference Question Strategy</h3>
      <p>These are the hardest question type. The answer is NOT stated directly. To answer:</p>
      <ul>
        <li>Find the relevant section (use keywords from the question)</li>
        <li>Ask: what does the author IMPLY but not say?</li>
        <li>Eliminate answers that are too extreme (never/always/completely)</li>
        <li>The correct answer is usually a reasonable extension of what's stated</li>
      </ul>

      <div class="callout"><strong>Speed Tip:</strong> Skip unfamiliar characters if the sentence meaning is still clear. The CSCA rewards overall comprehension, not word-by-word translation.</div>
    `
  },
  {
    id: "l10",
    category: "characters",
    categoryName: "Character Recognition",
    title: "Radicals: The Key to Decoding Unknown Characters",
    desc: "Know the 100 most common radicals and guess any character's meaning.",
    duration: "30 min",
    xp: 55,
    content: `
      <h2>Chinese Radicals — Your Decoding System</h2>
      <p>Radicals are semantic building blocks of characters. When you encounter an unknown character on the exam, the radical often reveals the category of meaning.</p>

      <h3>Semantic Radicals by Category</h3>

      <h3>Body Parts → Physical/Human Actions</h3>
      <div class="vocab-box">
        <div class="vocab-item"><div class="vocab-char">手 扌</div><div class="vocab-pin">shǒu</div><div class="vocab-eng">hand: 拿,打,推,抓</div></div>
        <div class="vocab-item"><div class="vocab-char">口</div><div class="vocab-pin">kǒu</div><div class="vocab-eng">mouth: 吃,喝,叫,问</div></div>
        <div class="vocab-item"><div class="vocab-char">目</div><div class="vocab-pin">mù</div><div class="vocab-eng">eye: 看,眼,睛,盲</div></div>
        <div class="vocab-item"><div class="vocab-char">耳</div><div class="vocab-pin">ěr</div><div class="vocab-eng">ear: 听,聋,聪</div></div>
        <div class="vocab-item"><div class="vocab-char">足 ⻊</div><div class="vocab-pin">zú</div><div class="vocab-eng">foot: 走,跑,跳,踢</div></div>
        <div class="vocab-item"><div class="vocab-char">心 忄</div><div class="vocab-pin">xīn</div><div class="vocab-eng">heart: 想,怕,爱,恨</div></div>
      </div>

      <h3>Nature & Elements</h3>
      <div class="vocab-box">
        <div class="vocab-item"><div class="vocab-char">水 氵</div><div class="vocab-pin">shuǐ</div><div class="vocab-eng">water: 海,河,洗,游</div></div>
        <div class="vocab-item"><div class="vocab-char">火 灬</div><div class="vocab-pin">huǒ</div><div class="vocab-eng">fire: 热,烧,炒,燃</div></div>
        <div class="vocab-item"><div class="vocab-char">木</div><div class="vocab-pin">mù</div><div class="vocab-eng">wood/tree: 树,桌,椅,森</div></div>
        <div class="vocab-item"><div class="vocab-char">草 艹</div><div class="vocab-pin">cǎo</div><div class="vocab-eng">grass/plant: 花,草,茶,菜</div></div>
        <div class="vocab-item"><div class="vocab-char">土</div><div class="vocab-pin">tǔ</div><div class="vocab-eng">earth/soil: 地,城,墙,塔</div></div>
        <div class="vocab-item"><div class="vocab-char">金 钅</div><div class="vocab-pin">jīn</div><div class="vocab-eng">metal: 钱,银,铁,钟</div></div>
      </div>

      <h3>The Phonetic Component</h3>
      <p>Most Chinese characters = Semantic radical (meaning) + Phonetic component (sound). The phonetic component gives an approximate pronunciation.</p>
      <div class="example">
        <p>清 (qīng, clear) = 氵(water) + 青 (qīng, phonetic)</p>
        <p>情 (qíng, emotion) = 忄(heart) + 青 (qīng, phonetic)</p>
        <p>请 (qǐng, please/invite) = 讠(speech) + 青 (qīng, phonetic)</p>
        <p>晴 (qíng, sunny) = 日 (sun) + 青 (qīng, phonetic)</p>
      </div>

      <div class="callout"><strong>Exam Application:</strong> When you see an unknown character, identify the radical first. If the radical is 忄(heart), the word is likely related to emotions. This narrows down multiple-choice answers dramatically.</div>
    `
  }
];

const FLASHCARD_DECKS = [
  {
    id: "grammar-basics",
    name: "Grammar Essentials",
    category: "grammar",
    cards: [
      { q: "What is the basic structure of a 把 sentence?", a: "Subject + 把 + Object + Verb + Complement/Result\nThe verb CANNOT stand alone after 把." },
      { q: "When can you NOT use 把?", a: "1. Object is indefinite (一本书)\n2. Verbs: 是, 有, 喜欢, 知道, 认识\n3. Existence sentences\n4. With 不 (use 没 instead)" },
      { q: "What is the structure of a 被 sentence?", a: "Subject (receiver) + 被 + Agent (doer) + Verb + Complement\nThe agent can be omitted if unknown." },
      { q: "What are the 3 types of verb complements?", a: "1. Resultative (结果补语): result of action\n2. Directional (趋向补语): direction of movement\n3. Potential (可能补语): whether action CAN be completed (得/不)" },
      { q: "How do you form a potential complement?", a: "Insert 得 or 不 between verb and result:\n听得懂 (can understand)\n听不懂 (cannot understand)\n⚠️ Cannot use with 了, 过, or aspect markers!" },
      { q: "Translate: 他把房间打扫得很干净", a: "He cleaned the room (until it was) very clean.\nStructure: 把 + Object + V + 得 + Degree complement" },
      { q: "What is the difference between 把 and 被?", a: "把: subject is the DOER (active)\n被: subject is the RECEIVER (passive)\n我把书读完了 = I finished the book\n书被我读完了 = The book was finished by me" },
      { q: "How do you use degree complements (程度补语)?", a: "Verb + 得 + Degree: 说得很流利\nIf there's an object, REPEAT the verb:\n✓ 他中文说得很好\n✓ 他说中文说得很好\n✗ 他说得中文很好 (WRONG)" }
    ]
  },
  {
    id: "vocab-core",
    name: "Core Vocabulary",
    category: "vocab",
    cards: [
      { q: "发现 vs 发明 — what's the difference?", a: "发现 (fāxiàn): discover something that already exists\n发明 (fāmíng): invent something new\n例: 他发现了问题。他发明了新技术。" },
      { q: "以为 vs 认为", a: "以为 (yǐwéi): mistakenly believe/think (implies you were wrong)\n认为 (rènwéi): believe/consider (neutral)\n例: 我以为他来了，原来没有。(I thought he came, turns out he didn't)" },
      { q: "What does 遗憾 (yíhàn) mean and in what context?", a: "Regret, pity. Used when something is unfortunate or didn't go as hoped.\n真遗憾你不能来。(It's a pity you can't come)\n我很遗憾地通知你... (I regret to inform you...)" },
      { q: "What does 尴尬 (gāngà) mean?", a: "Awkward, embarrassed, in an uncomfortable social situation.\nOften used when someone is caught in a difficult/embarrassing position.\n场面很尴尬 (the scene was very awkward)" },
      { q: "改变 vs 改善 — the key difference?", a: "改变 (gǎibiàn): change (neutral — can be positive or negative)\n改善 (gǎishàn): improve (always positive change, making something better)\n生活条件改善了 (living conditions improved)" },
      { q: "What does 综上所述 mean and when do you use it?", a: "In summary of all the above / To sum up\nUsed at the START of the concluding paragraph in formal essays.\nScores high marks in writing as a sophisticated connector." },
      { q: "希望 vs 盼望 — nuance?", a: "希望 (xīwàng): hope (general, neutral)\n盼望 (pànwàng): yearn for, long for (stronger emotional desire, often implies long-awaited)\n我盼望已久 (I've been eagerly awaiting this for a long time)" },
      { q: "增加 vs 增长", a: "增加 (zēngjiā): add/increase (countable things: 增加人数, 增加机会)\n增长 (zēngzhǎng): grow/rise (rate, amount, percentage: 经济增长, 增长了10%)" }
    ]
  },
  {
    id: "chengyu",
    name: "四字成语 (Chengyu)",
    category: "idioms",
    cards: [
      { q: "一石二鸟 (yī shí èr niǎo)", a: "One stone, two birds\n= Kill two birds with one stone\nUsed when one action achieves two goals simultaneously" },
      { q: "半途而废 (bàn tú ér fèi)", a: "Abandon halfway through\n= Give up before finishing; quit midway\nNegative — criticizes someone for not persisting\n反义词: 持之以恒 (persevere consistently)" },
      { q: "画蛇添足 (huà shé tiān zú)", a: "Add feet to a drawing of a snake\n= Ruin something by overdoing it; add unnecessary details\nStory: A man won a snake-drawing contest but lost by adding feet (snakes don't have feet)" },
      { q: "守株待兔 (shǒu zhū dài tù)", a: "Wait by a stump for a rabbit\n= Passively wait for luck instead of working\nStory: Farmer saw a rabbit hit a stump and die, then waited all day for it to happen again" },
      { q: "亡羊补牢 (wáng yáng bǔ láo)", a: "Mend the sheep pen after the sheep escapes\n= Better late than never; fix a problem after harm occurs\nCan be positive (it's still worth fixing) or cautionary (don't wait until it's too late)" },
      { q: "对牛弹琴 (duì niú tán qín)", a: "Play the lute to a cow\n= Cast pearls before swine; waste wisdom on the ignorant\nUsed when someone doesn't understand or appreciate what you're explaining" },
      { q: "滴水穿石 (dī shuǐ chuān shí)", a: "Dripping water pierces stone\n= Perseverance and persistence overcomes any obstacle\nPositive idiom about consistent effort over time" },
      { q: "掩耳盗铃 (yǎn ěr dào líng)", a: "Cover your ears while stealing a bell\n= Self-deception; ignore reality hoping the problem disappears\nStory: Man covered his ears while stealing a bell — thinking if he can't hear it, no one can" }
    ]
  },
  {
    id: "culture-facts",
    name: "Culture & History",
    category: "culture",
    cards: [
      { q: "What are the 四大发明 (Four Great Inventions)?", a: "造纸术 (papermaking) — Cai Lun, Han dynasty\n活字印刷 (movable type printing) — Bi Sheng, Song dynasty\n火药 (gunpowder) — Tang dynasty\n指南针 (compass) — Han/Song dynasty" },
      { q: "春节 — key traditions and symbolic foods", a: "🧨 贴春联 (spring couplets)\n🧨 放鞭炮 (firecrackers)\n🥟 包饺子 (dumplings = gold ingots)\n🐟 吃鱼 (fish = abundance/surplus, 年年有余)\n🎁 红包 (red envelopes = luck + money)" },
      { q: "What is 孝顺 (xiàoshùn)?", a: "Filial piety — respect, care, and obedience toward parents and elders\nFoundational Confucian value. One of the 五常 (Five Constants).\nIn literature: tested through whether characters act 孝顺 toward their family" },
      { q: "端午节 — origin story and traditions", a: "Origin: Commemoration of patriot-poet 屈原 (Qū Yuán) who drowned himself in the Miluo River\nTraditional purpose: beating drums and throwing rice dumplings to distract fish from his body\nTraditions: 赛龙舟 (dragon boat racing), 吃粽子 (sticky rice dumplings), 挂艾草 (mugwort)" },
      { q: "What is 面子 (miànzi)?", a: "Social face — one's dignity, reputation, and social standing\nCore concept in Chinese interpersonal relationships\n给面子 (give face = show respect)\n丢面子 (lose face = suffer humiliation)\nKey in business, family, and formal settings" },
      { q: "中秋节 — legend and traditions", a: "Legend: 嫦娥奔月 (Chang'e flew to the moon after drinking immortality potion)\nDate: 15th day of 8th lunar month (full moon)\nTractions: 赏月 (moon gazing), 吃月饼 (mooncakes), 提灯笼 (lanterns)" },
      { q: "诸子百家 — name the major schools", a: "Confucianism 儒家 (Kǒng zǐ/Confucius): social harmony, filial piety\nTaoism 道家 (Lǎo zǐ/Laozi): follow the natural way\nLegalism 法家 (Hán Fēi): strict laws and punishment\nMohism 墨家 (Mò zǐ): universal love, anti-war" }
    ]
  }
];

const CHINESE_VOCAB = [
  // Basic Greetings
  { char: "你好", pin: "nǐ hǎo", eng: "hello", tone: "3,3", category: "Greetings" },
  { char: "再见", pin: "zàijiàn", eng: "goodbye", tone: "4,4", category: "Greetings" },
  { char: "谢谢", pin: "xièxie", eng: "thank you", tone: "4,n", category: "Greetings" },
  { char: "对不起", pin: "duìbuqǐ", eng: "sorry, excuse me", tone: "4,n,3", category: "Greetings" },
  { char: "没关系", pin: "méiguānxi", eng: "it's okay / no problem", tone: "2,1,n", category: "Greetings" },
  { char: "请问", pin: "qǐngwèn", eng: "excuse me / may I ask", tone: "3,4", category: "Greetings" },

  // School & Academic
  { char: "作业", pin: "zuòyè", eng: "homework, assignment", tone: "4,4", category: "Academic" },
  { char: "考试", pin: "kǎoshì", eng: "exam, to take a test", tone: "3,4", category: "Academic" },
  { char: "成绩", pin: "chéngjì", eng: "grades, results", tone: "2,4", category: "Academic" },
  { char: "努力", pin: "nǔlì", eng: "work hard, strive", tone: "3,4", category: "Academic" },
  { char: "认真", pin: "rènzhēn", eng: "serious, conscientious", tone: "4,1", category: "Academic" },
  { char: "复习", pin: "fùxí", eng: "review, revise", tone: "4,2", category: "Academic" },
  { char: "预习", pin: "yùxí", eng: "preview, prepare in advance", tone: "4,2", category: "Academic" },
  { char: "笔记", pin: "bǐjì", eng: "notes (written)", tone: "3,4", category: "Academic" },
  { char: "课程", pin: "kèchéng", eng: "curriculum, course", tone: "4,2", category: "Academic" },
  { char: "毕业", pin: "bìyè", eng: "graduate, graduation", tone: "4,4", category: "Academic" },

  // Emotions
  { char: "高兴", pin: "gāoxìng", eng: "happy, pleased", tone: "1,4", category: "Emotions" },
  { char: "难过", pin: "nánguò", eng: "sad, upset", tone: "2,4", category: "Emotions" },
  { char: "担心", pin: "dānxīn", eng: "worry, be anxious", tone: "1,1", category: "Emotions" },
  { char: "紧张", pin: "jǐnzhāng", eng: "nervous, tense", tone: "3,1", category: "Emotions" },
  { char: "骄傲", pin: "jiāo'ào", eng: "proud (can be arrogant)", tone: "1,4", category: "Emotions" },
  { char: "后悔", pin: "hòuhuǐ", eng: "regret, feel remorse", tone: "4,3", category: "Emotions" },
  { char: "失望", pin: "shīwàng", eng: "disappointed", tone: "1,4", category: "Emotions" },
  { char: "满意", pin: "mǎnyì", eng: "satisfied, content", tone: "3,4", category: "Emotions" },
  { char: "害怕", pin: "hàipà", eng: "afraid, scared", tone: "4,4", category: "Emotions" },
  { char: "开心", pin: "kāixīn", eng: "happy, joyful", tone: "1,1", category: "Emotions" },

  // Time Expressions
  { char: "立刻", pin: "lìkè", eng: "immediately, at once", tone: "4,4", category: "Time" },
  { char: "偶尔", pin: "ǒu'ěr", eng: "occasionally, once in a while", tone: "3,3", category: "Time" },
  { char: "经常", pin: "jīngcháng", eng: "often, frequently", tone: "1,2", category: "Time" },
  { char: "终于", pin: "zhōngyú", eng: "finally, at last", tone: "1,2", category: "Time" },
  { char: "曾经", pin: "céngjīng", eng: "once, formerly, in the past", tone: "2,1", category: "Time" },
  { char: "逐渐", pin: "zhújiàn", eng: "gradually, little by little", tone: "2,4", category: "Time" },
  { char: "仍然", pin: "réngrán", eng: "still, yet, nevertheless", tone: "2,2", category: "Time" },
  { char: "已经", pin: "yǐjīng", eng: "already", tone: "3,1", category: "Time" },

  // Connectors & Conjunctions
  { char: "虽然", pin: "suīrán", eng: "although, even though", tone: "1,2", category: "Connectors" },
  { char: "尽管", pin: "jǐnguǎn", eng: "despite, in spite of", tone: "3,3", category: "Connectors" },
  { char: "然而", pin: "rán'ér", eng: "however, nevertheless", tone: "2,2", category: "Connectors" },
  { char: "因此", pin: "yīncǐ", eng: "therefore, as a result", tone: "1,3", category: "Connectors" },
  { char: "此外", pin: "cǐwài", eng: "in addition, besides", tone: "3,4", category: "Connectors" },
  { char: "总之", pin: "zǒngzhī", eng: "in short, in a word", tone: "3,1", category: "Connectors" },
  { char: "首先", pin: "shǒuxiān", eng: "first of all, firstly", tone: "3,1", category: "Connectors" },
  { char: "其次", pin: "qícì", eng: "secondly, next", tone: "2,4", category: "Connectors" },
  { char: "不但", pin: "bùdàn", eng: "not only...", tone: "4,4", category: "Connectors" },
  { char: "而且", pin: "érqiě", eng: "...but also / furthermore", tone: "2,3", category: "Connectors" },

  // Advanced Academic
  { char: "影响", pin: "yǐngxiǎng", eng: "influence, impact, affect", tone: "3,3", category: "Academic Advanced" },
  { char: "分析", pin: "fēnxī", eng: "analyze, analysis", tone: "1,1", category: "Academic Advanced" },
  { char: "强调", pin: "qiángdiào", eng: "emphasize, stress", tone: "2,4", category: "Academic Advanced" },
  { char: "概念", pin: "gàiniàn", eng: "concept, idea, notion", tone: "4,4", category: "Academic Advanced" },
  { char: "论述", pin: "lùnshù", eng: "discuss, elaborate on", tone: "4,4", category: "Academic Advanced" },
  { char: "总结", pin: "zǒngjié", eng: "summarize, summary", tone: "3,2", category: "Academic Advanced" },
  { char: "观点", pin: "guāndiǎn", eng: "viewpoint, opinion, standpoint", tone: "1,3", category: "Academic Advanced" },
  { char: "现象", pin: "xiànxiàng", eng: "phenomenon, appearance", tone: "4,4", category: "Academic Advanced" },
  { char: "解决", pin: "jiějué", eng: "solve, resolve", tone: "3,2", category: "Academic Advanced" },
  { char: "实现", pin: "shíxiàn", eng: "realize, achieve, accomplish", tone: "2,4", category: "Academic Advanced" }
];

const PRACTICE_QUESTIONS = {
  grammar: [
    {
      id: "g1",
      type: "multiple_choice",
      question: "选择正确的句子 (Choose the correct sentence):",
      options: [
        "我把一本书看完了。",
        "他把门关上了。",
        "她把喜欢了猫。",
        "我们把是完成了。"
      ],
      correct: 1,
      explanation: "把 sentences require a DEFINITE/SPECIFIC object. 一本书 is indefinite (wrong for 把). 喜欢 and 是 are stative verbs that cannot follow 把. Option B is correct: 把 + 门 (definite) + 关上了 (verb + result complement)."
    },
    {
      id: "g2",
      type: "multiple_choice",
      question: "Complete the sentence: 这道题太难了，我___解决。",
      options: [
        "不能",
        "解决不了",
        "不了解决",
        "解决不得"
      ],
      correct: 1,
      explanation: "This is a potential complement. 解决不了 = cannot solve/resolve. The structure is Verb + 不 + Complement. '不了' here means 'unable to complete the action'. Note: 解决不得 is not standard modern Chinese."
    },
    {
      id: "g3",
      type: "multiple_choice",
      question: "Which sentence correctly uses 被?",
      options: [
        "书被了我看完。",
        "她被批评老师了。",
        "那封信被秘书寄出去了。",
        "我被喜欢他。"
      ],
      correct: 2,
      explanation: "Correct structure: Subject (那封信) + 被 + Agent (秘书) + Verb (寄) + Directional complement (出去了). Option A has 了 in wrong position. Option B has wrong word order. Option D uses a stative verb 喜欢 which cannot follow 被."
    },
    {
      id: "g4",
      type: "multiple_choice",
      question: "她中文说得___。 (degree complement)",
      options: [
        "很流利她",
        "她很流利",
        "很流利",
        "流利得很"
      ],
      correct: 2,
      explanation: "Degree complement structure: Verb + 得 + Degree. When the subject precedes the verb with its object already clear from context, the complement follows directly: 说得很流利. '流利得很' is not standard."
    },
    {
      id: "g5",
      type: "multiple_choice",
      question: "Fill in the blank: 老师的话，他一点都听___。",
      options: [
        "不懂",
        "得懂",
        "懂不了",
        "没懂到"
      ],
      correct: 0,
      explanation: "听不懂 is a potential complement meaning 'cannot understand (by listening)'. The structure Verb + 不 + Result indicates inability. 得懂 would mean 'can understand' (positive). 懂不了 is not standard. 没懂到 is incorrect."
    }
  ],
  vocab: [
    {
      id: "v1",
      type: "multiple_choice",
      question: "选择正确答案：爱因斯坦___了相对论。",
      options: ["发现", "发明", "创造", "制造"],
      correct: 1,
      explanation: "发明 (fāmíng) = invent (create something new). Relativity theory was invented/created by Einstein — it didn't exist before. 发现 (discover) is for finding things that already exist. 创造 can also work but 发明 is more specific to scientific theories/inventions."
    },
    {
      id: "v2",
      type: "multiple_choice",
      question: "我___他今天不来，结果他来了。",
      options: ["认为", "以为", "觉得", "想"],
      correct: 1,
      explanation: "以为 (yǐwéi) = mistakenly believe. This sentence shows the speaker was WRONG — 结果他来了 (but he actually came). 以为 always implies the belief turned out to be incorrect. 认为 is neutral belief with no implication of being wrong."
    },
    {
      id: "v3",
      type: "multiple_choice",
      question: "经过努力，经济___了很多。",
      options: ["增加", "增长", "增多", "添加"],
      correct: 1,
      explanation: "增长 (zēngzhǎng) = grow/rise (for rates, percentages, economic indicators). 经济增长 is a fixed collocation. 增加 is for adding quantities of things. 增多 is less formal. 添加 means add/supplement."
    },
    {
      id: "v4",
      type: "multiple_choice",
      question: "他工作很努力，所以老板对他很___。",
      options: ["满意", "高兴", "喜欢", "赞赏"],
      correct: 0,
      explanation: "满意 (mǎnyì) = satisfied, content with performance/results. It's the most natural colocation with 对...很满意. While 高兴 and 喜欢 could work contextually, 满意 specifically addresses work performance satisfaction."
    }
  ],
  reading: [
    {
      id: "r1",
      type: "reading",
      passage: "随着科技的迅速发展，人们的生活发生了深刻的变化。智能手机的普及使人们的通信变得更加便利，但同时也带来了新的问题。许多人，尤其是年轻人，对手机产生了过度依赖，甚至在与家人聚餐时也不放下手机。专家指出，这种现象可能导致人际关系淡化，影响家庭和谐。",
      question: "根据文章，智能手机带来了什么问题？",
      options: [
        "通信变得不便利",
        "科技发展减慢了",
        "人们过度依赖手机，影响人际关系",
        "年轻人不喜欢与家人聚餐"
      ],
      correct: 2,
      explanation: "The passage states that smartphones brought '新的问题' (new problems): people became overly dependent (过度依赖), even during family meals, which experts say may lead to 人际关系淡化 (weakening of interpersonal relationships) and 影响家庭和谐 (affecting family harmony). Option C best captures both problems mentioned."
    },
    {
      id: "r2",
      type: "reading",
      passage: "中国传统节日春节，又称农历新年，是中国最重要的传统节日之一。在春节期间，家人会聚在一起，共享团圆饭，长辈会给晚辈发红包，象征着祝福和好运。春节的习俗丰富多彩，包括贴春联、放鞭炮、舞龙舞狮等。这些传统不仅体现了中华文化的深厚底蕴，也加强了家庭和社会的凝聚力。",
      question: "根据文章，长辈给晚辈红包的意义是什么？",
      options: [
        "庆祝新年的到来",
        "象征祝福和好运",
        "加强家庭关系",
        "传承中华文化"
      ],
      correct: 1,
      explanation: "The passage directly states: '长辈会给晚辈发红包，象征着祝福和好运' (elders give red envelopes to younger generations, symbolizing blessings and good luck). This is directly stated in the text, making B the correct answer."
    }
  ],
  listening: [
    {
      id: "li1",
      type: "listening_sim",
      transcript: "[Audio: 男：你好，请问图书馆怎么走？女：从这里直走，然后右转，就在你的左边。大约五分钟的路程。男：谢谢您！女：不客气，祝你找到你要的书！]",
      question: "图书馆在哪个方向？",
      options: [
        "直走左转",
        "直走右转后在左边",
        "右转直走",
        "直走在右边"
      ],
      correct: 1,
      explanation: "The woman says: 从这里直走 (go straight from here), 然后右转 (then turn right), 就在你的左边 (it's on your left). So: straight → turn right → on the left."
    }
  ]
};

const STUDY_NOTES_DATA = [
  {
    id: "n1",
    title: "Grammar: Complete 把 and 被 Reference",
    icon: "✏️",
    sections: [
      {
        heading: "把 Construction — Full Reference",
        content: `The 把 (disposal) construction moves the object before the verb to show that the subject "disposes of" the object — doing something TO it with a result.`,
        rules: [
          "Object MUST be definite/specific (not 一本书, but 这本书)",
          "Verb CANNOT stand alone — needs complement (了, result, direction, or degree)",
          "Cannot use with: 是, 有, 喜欢, 知道, 认识, 感觉 (stative/cognitive verbs)",
          "Negative: usually 没有把... (not 不把...)"
        ],
        examples: [
          "我把作业做完了。(I finished the homework.)",
          "请把窗户关上。(Please close the window.)",
          "他把书放在桌子上了。(He put the book on the table.)",
          "她把房间打扫得很干净。(She cleaned the room very clean.)"
        ]
      },
      {
        heading: "被 Construction — Full Reference",
        content: `The 被 passive construction. Subject receives the action. Agent (doer) can be omitted.`,
        rules: [
          "Same complement rule as 把 — verb cannot stand alone",
          "Traditional usage: undesirable outcome (被批评, 被骗)",
          "Modern usage: increasingly neutral/positive",
          "Agent can be omitted: 书被偷了 (book was stolen [by someone])"
        ],
        examples: [
          "他被老师批评了。(He was criticized by the teacher.)",
          "这个问题被解决了。(This problem was solved.)",
          "她的作业被表扬了。(Her homework was praised.)"
        ]
      }
    ]
  },
  {
    id: "n2",
    title: "Vocabulary: Confusing Word Pairs",
    icon: "🔤",
    sections: [
      {
        heading: "Frequently Confused — CSCA Favorites",
        content: "These word pairs appear constantly on the CSCA. Learn the nuance.",
        pairs: [
          { w1: "发现", p1: "fāxiàn", e1: "discover (already exists)", w2: "发明", p2: "fāmíng", e2: "invent (new creation)" },
          { w1: "以为", p1: "yǐwéi", e1: "mistakenly believe", w2: "认为", p2: "rènwéi", e2: "believe/think (neutral)" },
          { w1: "改变", p1: "gǎibiàn", e1: "change (neutral)", w2: "改善", p2: "gǎishàn", e2: "improve (positive change)" },
          { w1: "增加", p1: "zēngjiā", e1: "add/increase (things)", w2: "增长", p2: "zēngzhǎng", e2: "grow/rise (rate/amount)" },
          { w1: "希望", p1: "xīwàng", e1: "hope (general)", w2: "盼望", p2: "pànwàng", e2: "yearn for (emotional)" },
          { w1: "感谢", p1: "gǎnxiè", e1: "grateful, thank (formal)", w2: "谢谢", p2: "xièxie", e2: "thank you (informal)" }
        ]
      }
    ]
  }
];