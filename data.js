// ===== XueXi4CSCA — COMPLETE DATA =====
// Subjects: Chinese, Math, Physics, Chemistry
// Lesson format: array of "steps" each with type: teach | mc | fill | match | input

const DAILY_MOTIVATIONS = [
  "Tsinghua doesn't accept excuses. Open your notes NOW.",
  "Your competition studied 3 hours yesterday. What did you do?",
  "Every formula you skip today is a mark you lose on exam day.",
  "北京大学 isn't waiting for you to feel ready. GET UP.",
  "The gap between you and your dream school closes ONE problem at a time.",
  "Top 1% students don't feel like studying. They do it anyway. Be them.",
  "Your future self is either thanking you or cursing you. Choose.",
  "Mediocrity is comfortable. Excellence is you, solving this problem right now.",
  "Hard work beats talent when talent doesn't work hard. Today is your edge.",
  "The exam doesn't care about your mood. Show up anyway.",
  "Dream big. Study bigger. 加油！",
  "Sleep after you've earned it. Study first.",
  "你能做到! (You can do it!) Now prove it with action.",
  "One more problem. Just one more. That's how legends are made.",
  "The student who reviews daily remembers 80% more. BE that student."
];

// ============================================================
//  SUBJECT & TOPIC DEFINITIONS
// ============================================================
const SUBJECTS = {
  chinese: {
    name: "Chinese", icon: "🀄", color: "#EF4444",
    topics: [
      { id: "c-grammar1",  name: "把 & 被 Constructions",   icon: "✏️", desc: "Disposal & passive voice" },
      { id: "c-grammar2",  name: "Complements",             icon: "🔧", desc: "Result, direction, potential, degree" },
      { id: "c-vocab1",    name: "Core Vocabulary 1",       icon: "🔤", desc: "Time, emotion, academic words" },
      { id: "c-vocab2",    name: "Confusing Word Pairs",    icon: "🔀", desc: "发现/发明, 以为/认为 and more" },
      { id: "c-chengyu",   name: "成语 Chengyu",             icon: "📜", desc: "50 essential 4-char idioms" },
      { id: "c-reading",   name: "Reading Strategies",      icon: "📖", desc: "Passages, inference, speed" },
      { id: "c-writing",   name: "Essay Writing",           icon: "📝", desc: "Structure, connectors, scoring" },
      { id: "c-culture",   name: "Culture & Festivals",     icon: "🏮", desc: "Traditions, history, 四大发明" },
      { id: "c-acad",      name: "Academic Chinese Terms",  icon: "🎓", desc: "Subject-specific Chinese vocab" },
      { id: "c-chars",     name: "Radicals & Characters",   icon: "字",  desc: "Decompose any character" },
    ]
  },
  math: {
    name: "Mathematics", icon: "📐", color: "#3B82F6",
    topics: [
      { id: "m-algebra1",  name: "Equations & Inequalities", icon: "⚖️",  desc: "Linear, quadratic, systems" },
      { id: "m-functions", name: "Functions & Graphs",       icon: "📈",  desc: "Domain, range, transformations" },
      { id: "m-trig",      name: "Trigonometry",             icon: "🔺",  desc: "SOH-CAH-TOA, identities, waves" },
      { id: "m-calc1",     name: "Differentiation",          icon: "∂",   desc: "Rules, chain, product, quotient" },
      { id: "m-calc2",     name: "Integration",              icon: "∫",   desc: "Indefinite, definite, area" },
      { id: "m-vectors",   name: "Vectors & Matrices",       icon: "🧮",  desc: "Operations, determinants, eigenvalues" },
      { id: "m-stats",     name: "Statistics & Probability", icon: "📊",  desc: "Distributions, hypothesis testing" },
      { id: "m-geometry",  name: "Coordinate Geometry",      icon: "📏",  desc: "Conic sections, lines, circles" },
      { id: "m-sequences", name: "Sequences & Series",       icon: "∑",   desc: "AP, GP, convergence, sigma" },
      { id: "m-proofs",    name: "Proof & Logic",            icon: "🧠",  desc: "Induction, contradiction, direct" },
    ]
  },
  physics: {
    name: "Physics", icon: "⚛️", color: "#8B5CF6",
    topics: [
      { id: "p-mechanics1", name: "Kinematics",              icon: "🚀",  desc: "Displacement, velocity, acceleration" },
      { id: "p-mechanics2", name: "Newton's Laws",           icon: "🍎",  desc: "Forces, friction, circular motion" },
      { id: "p-energy",     name: "Energy & Momentum",       icon: "⚡",  desc: "Work, KE, PE, conservation laws" },
      { id: "p-waves",      name: "Waves & Optics",          icon: "🌊",  desc: "SHM, EM spectrum, refraction" },
      { id: "p-thermo",     name: "Thermodynamics",          icon: "🔥",  desc: "Heat, gas laws, entropy" },
      { id: "p-em1",        name: "Electric Fields",         icon: "⚡",  desc: "Coulomb's law, E-field, potential" },
      { id: "p-em2",        name: "Magnetic Fields",         icon: "🧲",  desc: "Biot-Savart, Faraday, induction" },
      { id: "p-modern",     name: "Modern Physics",          icon: "☢️",  desc: "Photoelectric, de Broglie, nuclear" },
      { id: "p-circuits",   name: "Circuits & Electronics",  icon: "🔌",  desc: "Ohm's law, Kirchhoff, RC circuits" },
      { id: "p-astro",      name: "Astrophysics & Gravity",  icon: "🌌",  desc: "Gravitation, orbital motion, dark matter" },
    ]
  },
  chemistry: {
    name: "Chemistry", icon: "🧪", color: "#10B981",
    topics: [
      { id: "ch-atomic",    name: "Atomic Structure",        icon: "⚛️",  desc: "Orbitals, quantum numbers, electron config" },
      { id: "ch-bonding",   name: "Chemical Bonding",        icon: "🔗",  desc: "Ionic, covalent, metallic, VSEPR" },
      { id: "ch-stoich",    name: "Stoichiometry",           icon: "⚖️",  desc: "Moles, limiting reagent, yield" },
      { id: "ch-kinetics",  name: "Chemical Kinetics",       icon: "⏱️",  desc: "Rate laws, activation energy, Arrhenius" },
      { id: "ch-equilib",   name: "Equilibrium",             icon: "⚖️",  desc: "Le Chatelier, Kc/Kp, ICE tables" },
      { id: "ch-acids",     name: "Acids, Bases & pH",       icon: "🧴",  desc: "Brønsted-Lowry, buffer, titration" },
      { id: "ch-thermo",    name: "Thermochemistry",         icon: "🌡️",  desc: "Enthalpy, Hess's law, entropy, Gibbs" },
      { id: "ch-organic",   name: "Organic Chemistry",       icon: "🧬",  desc: "Functional groups, mechanisms, IUPAC" },
      { id: "ch-redox",     name: "Redox & Electrochemistry",icon: "🔋",  desc: "Half-equations, EMF, electrolysis" },
      { id: "ch-periodic",  name: "Periodic Trends",         icon: "📋",  desc: "Ionization, electronegativity, radii" },
    ]
  }
};

// ============================================================
//  DUOLINGO-STYLE LESSONS
//  Each lesson = array of steps
//  Step types: teach | mc | fill | match | input
// ============================================================
const LESSONS = {

  // ==================== CHINESE ====================

  "c-grammar1": [
    {
      type: "teach",
      title: "The 把 (bǎ) Disposal Construction",
      content: `
        <h3>What is 把?</h3>
        <p>The 把 sentence moves a <strong>definite object</strong> before the verb to emphasize what happens TO it. It shows "disposal" — doing something to an object with a result.</p>
        <div class="teach-formula">Subject + 把 + [Definite Object] + Verb + Complement</div>
        <h3>Critical Rules</h3>
        <ul>
          <li>The object MUST be specific/definite (这本书 ✓, 一本书 ✗)</li>
          <li>The verb CANNOT stand alone — it needs: 了, result complement, direction, or degree</li>
          <li>Cannot use with: 是、有、喜欢、知道、认识 (stative verbs)</li>
          <li>Negative: 没有把... NOT 不把...</li>
        </ul>
        <div class="teach-vocab-grid">
          <div class="tvc"><div class="tvc-zh">把书读完了</div><div class="tvc-pin">bǎ shū dú wán le</div><div class="tvc-eng">finished reading the book</div></div>
          <div class="tvc"><div class="tvc-zh">把门关上</div><div class="tvc-pin">bǎ mén guān shàng</div><div class="tvc-eng">close the door</div></div>
          <div class="tvc"><div class="tvc-zh">把房间打扫干净</div><div class="tvc-pin">bǎ fángjiān dǎsǎo gānjìng</div><div class="tvc-eng">clean the room clean</div></div>
          <div class="tvc"><div class="tvc-zh">把礼物给了他</div><div class="tvc-pin">bǎ lǐwù gěi le tā</div><div class="tvc-eng">gave the gift to him</div></div>
        </div>
        <div class="teach-callout">⚠️ CSCA Trap: 我把一本书看完了 is WRONG because 一本书 is indefinite. Use 我把那本书看完了.</div>
      `
    },
    {
      type: "mc",
      question: "Which sentence correctly uses 把?",
      options: ["我把一本书看完了。", "他把门关上了。", "她把喜欢了那只猫。", "我们把是完成了。"],
      correct: 1,
      explanation: "把 needs a DEFINITE object and a complement. '把门关上了' = definite object 门 + verb 关 + complement 上了. Option A has indefinite 一本书. Options C & D use stative verbs."
    },
    {
      type: "teach",
      title: "The 被 (bèi) Passive Construction",
      content: `
        <h3>What is 被?</h3>
        <p>被 sentences indicate the subject RECEIVES the action. The same complement rule applies — verb cannot stand alone.</p>
        <div class="teach-formula">Subject (receiver) + 被 + Agent (doer) + Verb + Complement</div>
        <div class="teach-callout">The agent (doer) can be omitted if unknown: 书被偷了 (the book was stolen)</div>
        <h3>把 vs 被 — Side by Side</h3>
        <div class="teach-example">
          <strong>把:</strong> 我把书读完了 — I (doer) finished the book<br>
          <strong>被:</strong> 书被我读完了 — The book (receiver) was finished by me<br>
          Same event, different perspective!
        </div>
        <h3>Common Examples</h3>
        <ul>
          <li>他被老师批评了。(He was criticized by the teacher.)</li>
          <li>这个问题被解决了。(This problem was solved.)</li>
          <li>她的手机被偷了。(Her phone was stolen.)</li>
          <li>那封信被秘书寄出去了。(That letter was sent out by the secretary.)</li>
        </ul>
      `
    },
    {
      type: "fill",
      sentence: "他___老师批评了，因为他没做作业。",
      blanks: ["被"],
      options: ["把", "被", "让", "给"],
      correct: ["被"],
      explanation: "他 (subject/receiver) + 被 + 老师 (agent) + 批评了 (V+complement). The subject RECEIVED the action of being criticized, so 被 is correct."
    },
    {
      type: "match",
      instruction: "Match each sentence pattern with its type",
      pairs: [
        { left: "我把作业做完了", right: "把 (disposal)" },
        { left: "作业被我做完了", right: "被 (passive)" },
        { left: "门被风关上了", right: "被 (passive)" },
        { left: "他把礼物送出去了", right: "把 (disposal)" },
      ]
    },
    {
      type: "mc",
      question: "Which sentence correctly uses 被?",
      options: [
        "那封信被了秘书寄出去。",
        "她被表扬老师了。",
        "那封信被秘书寄出去了。",
        "我被喜欢他。"
      ],
      correct: 2,
      explanation: "Correct: Subject (信) + 被 + Agent (秘书) + Verb (寄) + Complement (出去了). Option A has 了 in wrong position. Option D uses stative verb 喜欢."
    },
    {
      type: "input",
      prompt: "Translate into Chinese using 把: 'Please close the window.' (请 / 窗户 / 关上)",
      answer: "请把窗户关上",
      hint: "请 + 把 + 窗户 + 关上",
      explanation: "请把窗户关上 — Request (请) + 把 + definite object (窗户) + V + complement (关上)"
    }
  ],

  "c-grammar2": [
    {
      type: "teach",
      title: "The 4 Types of Chinese Complements",
      content: `
        <h3>1. Resultative Complements (结果补语)</h3>
        <p>Show the RESULT of an action. Attach directly to the verb.</p>
        <div class="teach-formula">V + Result: 做完 / 听懂 / 看见 / 写错 / 找到</div>
        <table class="teach-table">
          <tr><th>Complement</th><th>Meaning</th><th>Example</th></tr>
          <tr><td>完</td><td>finish</td><td>做完作业 (finish the homework)</td></tr>
          <tr><td>懂</td><td>understand</td><td>听懂了 (understood by listening)</td></tr>
          <tr><td>到</td><td>reach/achieve</td><td>找到了 (found it)</td></tr>
          <tr><td>错</td><td>wrongly</td><td>写错了 (wrote incorrectly)</td></tr>
          <tr><td>好</td><td>well/properly</td><td>准备好了 (prepared well)</td></tr>
        </table>
        <h3>2. Directional Complements (趋向补语)</h3>
        <p>Simple: 来/去 &nbsp;|&nbsp; Compound: 进来, 出去, 上来, 下去, 回来</p>
        <div class="teach-formula">V + Direction: 走进来 / 拿出去 / 跑回来</div>
        <h3>3. Potential Complements (可能补语) ⭐ MOST TESTED</h3>
        <p>Insert 得 (CAN) or 不 (CANNOT) between verb and result.</p>
        <div class="teach-formula">V + 得/不 + Result: 听得懂 / 听不懂 / 做得完 / 做不完</div>
        <div class="teach-callout">⚠️ Potential complements CANNOT co-occur with 了 or 过. This is a classic CSCA error detection item!</div>
        <h3>4. Degree Complements (程度补语)</h3>
        <div class="teach-formula">V + 得 + Degree: 说得很流利 / 写得漂亮</div>
        <div class="teach-example">Object placement: Repeat the verb!<br>✓ 他说中文说得很流利<br>✗ 他说得中文很流利 (WRONG)</div>
      `
    },
    {
      type: "mc",
      question: "这道题太难了，我___解决。",
      options: ["不能", "解决不了", "不了解决", "解决不得"],
      correct: 1,
      explanation: "解决不了 is a potential complement: V + 不 + Complement (了 = able to complete). It means 'cannot solve.' 不能 is grammatically possible but potential complement is the target structure here."
    },
    {
      type: "fill",
      sentence: "他中文说___很流利。",
      blanks: ["得"],
      options: ["了", "得", "过", "不"],
      correct: ["得"],
      explanation: "Degree complement uses 得: 说得很流利. The structure is V + 得 + Degree adjective."
    },
    {
      type: "match",
      instruction: "Match complement type to example",
      pairs: [
        { left: "听得懂 / 听不懂", right: "Potential Complement" },
        { left: "说得很流利", right: "Degree Complement" },
        { left: "走进来 / 跑出去", right: "Directional Complement" },
        { left: "写完 / 找到", right: "Resultative Complement" },
      ]
    },
    {
      type: "mc",
      question: "Which sentence has a grammatical error?",
      options: [
        "我今天做完作业了。",
        "他听不懂老师说的话。",
        "她听得懂了这首歌。",
        "我写错了那个字。"
      ],
      correct: 2,
      explanation: "Option C is wrong: potential complement 听得懂 CANNOT co-occur with 了. Potential complements express general ability, not a completed action. Remove 了 to fix it: 她听得懂这首歌."
    }
  ],

  "c-vocab1": [
    {
      type: "teach",
      title: "Time Expressions — High Frequency CSCA Words",
      content: `
        <p>These time adverbs appear in reading passages, listening clips, and fill-in-the-blanks. Know ALL of them.</p>
        <div class="teach-vocab-grid">
          <div class="tvc"><div class="tvc-zh">立刻</div><div class="tvc-pin">lìkè</div><div class="tvc-eng">immediately, at once</div></div>
          <div class="tvc"><div class="tvc-zh">逐渐</div><div class="tvc-pin">zhújiàn</div><div class="tvc-eng">gradually, little by little</div></div>
          <div class="tvc"><div class="tvc-zh">曾经</div><div class="tvc-pin">céngjīng</div><div class="tvc-eng">once, formerly, used to</div></div>
          <div class="tvc"><div class="tvc-zh">终于</div><div class="tvc-pin">zhōngyú</div><div class="tvc-eng">finally, at last</div></div>
          <div class="tvc"><div class="tvc-zh">偶尔</div><div class="tvc-pin">ǒu'ěr</div><div class="tvc-eng">occasionally, once in a while</div></div>
          <div class="tvc"><div class="tvc-zh">仍然</div><div class="tvc-pin">réngrán</div><div class="tvc-eng">still, yet, nevertheless</div></div>
          <div class="tvc"><div class="tvc-zh">已经</div><div class="tvc-pin">yǐjīng</div><div class="tvc-eng">already</div></div>
          <div class="tvc"><div class="tvc-zh">即将</div><div class="tvc-pin">jíjiāng</div><div class="tvc-eng">about to, soon (formal)</div></div>
        </div>
      `
    },
    {
      type: "mc",
      question: "经过多年努力，他___考上了北京大学。",
      options: ["立刻", "偶尔", "终于", "逐渐"],
      correct: 2,
      explanation: "终于 (finally) is used when a long-awaited result is achieved after sustained effort. 经过多年努力 (after years of effort) signals this is the right choice."
    },
    {
      type: "teach",
      title: "Emotion Vocabulary — Express Nuance",
      content: `
        <p>The CSCA tests subtle emotional vocabulary. Choosing the wrong emotion word loses marks even when the meaning is close.</p>
        <div class="teach-vocab-grid">
          <div class="tvc"><div class="tvc-zh">遗憾</div><div class="tvc-pin">yíhàn</div><div class="tvc-eng">regret, pity</div></div>
          <div class="tvc"><div class="tvc-zh">尴尬</div><div class="tvc-pin">gāngà</div><div class="tvc-eng">awkward, embarrassed</div></div>
          <div class="tvc"><div class="tvc-zh">委屈</div><div class="tvc-pin">wěiqu</div><div class="tvc-eng">feel wronged/grieved</div></div>
          <div class="tvc"><div class="tvc-zh">羡慕</div><div class="tvc-pin">xiànmù</div><div class="tvc-eng">envy, admire</div></div>
          <div class="tvc"><div class="tvc-zh">感激</div><div class="tvc-pin">gǎnjī</div><div class="tvc-eng">grateful, thankful</div></div>
          <div class="tvc"><div class="tvc-zh">惊讶</div><div class="tvc-pin">jīngyà</div><div class="tvc-eng">surprised, astonished</div></div>
          <div class="tvc"><div class="tvc-zh">后悔</div><div class="tvc-pin">hòuhuǐ</div><div class="tvc-eng">regret (own mistake)</div></div>
          <div class="tvc"><div class="tvc-zh">盼望</div><div class="tvc-pin">pànwàng</div><div class="tvc-eng">yearn for, long for</div></div>
        </div>
        <div class="teach-callout">遗憾 vs 后悔: 遗憾 = regret about something unfortunate (outside your control). 后悔 = regret your OWN action/decision.</div>
      `
    },
    {
      type: "match",
      instruction: "Match the Chinese character to its English meaning",
      pairs: [
        { left: "遗憾", right: "regret / pity" },
        { left: "尴尬", right: "awkward / embarrassed" },
        { left: "羡慕", right: "envy / admire" },
        { left: "惊讶", right: "surprised / astonished" },
      ]
    },
    {
      type: "mc",
      question: "他做错了决定，现在非常___。",
      options: ["遗憾", "后悔", "委屈", "尴尬"],
      correct: 1,
      explanation: "后悔 = regret your OWN action/decision. He made a wrong decision (his own action), so 后悔 is correct. 遗憾 is for unfortunate situations outside your control."
    }
  ],

  "c-vocab2": [
    {
      type: "teach",
      title: "Confusing Word Pairs — CSCA Favourites",
      content: `
        <p>These pairs look similar but have critical nuance differences. The CSCA tests them constantly.</p>
        <table class="teach-table">
          <tr><th>Pair</th><th>Difference</th><th>Memory Trick</th></tr>
          <tr><td>发现 vs 发明</td><td>发现 = discover (already exists). 发明 = invent (create new)</td><td>Newton 发现d gravity. Edison 发明d the bulb.</td></tr>
          <tr><td>以为 vs 认为</td><td>以为 = mistakenly believe (you were wrong). 认为 = believe/think (neutral)</td><td>以为 always pairs with "结果" or "原来"</td></tr>
          <tr><td>改变 vs 改善</td><td>改变 = change (neutral). 改善 = improve (always positive)</td><td>改善 contains 善 (good) → always better</td></tr>
          <tr><td>增加 vs 增长</td><td>增加 = add more things. 增长 = grow/rise (rate, %, economy)</td><td>经济增长 is a fixed collocation</td></tr>
          <tr><td>希望 vs 盼望</td><td>希望 = hope (general). 盼望 = yearn/long for (emotional, long-awaited)</td><td>盼望 is stronger longing</td></tr>
        </table>
      `
    },
    {
      type: "mc",
      question: "爱因斯坦___了相对论。",
      options: ["发现", "发明", "创造", "制造"],
      correct: 1,
      explanation: "发明 = invent something NEW that didn't exist before. Relativity theory was Einstein's invention. 发现 would mean he discovered something already existing in nature (like Newton discovering gravity)."
    },
    {
      type: "mc",
      question: "我___他今天不来了，结果他来了。",
      options: ["认为", "以为", "觉得", "想到"],
      correct: 1,
      explanation: "以为 = mistakenly believe. The key signal is 结果... (but actually...) which shows the belief was WRONG. 认为 is neutral and doesn't imply being incorrect."
    },
    {
      type: "fill",
      sentence: "经过努力，我们的生活质量___了很多。",
      blanks: ["改善"],
      options: ["改变", "改善", "改正", "增加"],
      correct: ["改善"],
      explanation: "改善 = improve/get better. 生活质量 (quality of life) improving is a positive change, so 改善 (always positive) is correct. 改变 is neutral and doesn't specify improvement."
    },
    {
      type: "match",
      instruction: "Match the word to the correct usage context",
      pairs: [
        { left: "发现", right: "科学家___了新元素" },
        { left: "发明", right: "莱特兄弟___了飞机" },
        { left: "以为", right: "我___他是老师，原来他是学生" },
        { left: "认为", right: "我___这个方法很好" },
      ]
    }
  ],

  // ==================== MATH ====================

  "m-algebra1": [
    {
      type: "teach",
      title: "Solving Quadratic Equations",
      content: `
        <h3>Three Methods</h3>
        <div class="teach-formula">ax² + bx + c = 0</div>
        <h3>Method 1: Factoring</h3>
        <p>Find two numbers that multiply to ac and add to b.</p>
        <div class="teach-example">x² - 5x + 6 = 0 → (x - 2)(x - 3) = 0 → x = 2 or x = 3</div>
        <h3>Method 2: Quadratic Formula</h3>
        <div class="teach-formula">x = (-b ± √(b² - 4ac)) / 2a</div>
        <p>The <strong>discriminant</strong> Δ = b² - 4ac tells you:</p>
        <ul>
          <li>Δ > 0 → Two distinct real roots</li>
          <li>Δ = 0 → One repeated real root (x = -b/2a)</li>
          <li>Δ < 0 → No real roots (complex/imaginary)</li>
        </ul>
        <h3>Method 3: Completing the Square</h3>
        <div class="teach-example">x² + 6x + 5 = 0<br>(x + 3)² - 9 + 5 = 0<br>(x + 3)² = 4<br>x + 3 = ±2 → x = -1 or x = -5</div>
        <div class="teach-callout">⚠️ CSCA Tip: Always check your discriminant first! If Δ < 0, state "no real solutions" immediately.</div>
      `
    },
    {
      type: "mc",
      question: "For the equation 2x² - 4x + 5 = 0, the discriminant is:",
      options: ["Δ = -24  (no real roots)", "Δ = 56  (two real roots)", "Δ = -56  (no real roots)", "Δ = 24  (two real roots)"],
      correct: 0,
      explanation: "Δ = b² - 4ac = (-4)² - 4(2)(5) = 16 - 40 = -24. Since Δ < 0, there are no real roots."
    },
    {
      type: "teach",
      title: "Systems of Equations",
      content: `
        <h3>Substitution Method</h3>
        <p>Isolate one variable, substitute into the other equation.</p>
        <div class="teach-example">
          y = 2x + 1 ... (i)<br>
          3x + y = 16 ... (ii)<br>
          Sub (i) into (ii): 3x + 2x + 1 = 16 → 5x = 15 → x = 3<br>
          ∴ y = 2(3) + 1 = 7
        </div>
        <h3>Elimination Method</h3>
        <p>Multiply equations so one variable cancels.</p>
        <div class="teach-example">
          2x + 3y = 12 ... (i)<br>
          4x - y = 10 ... (ii)<br>
          Multiply (ii) by 3: 12x - 3y = 30<br>
          Add to (i): 14x = 42 → x = 3, y = 2
        </div>
        <div class="teach-callout">For three-variable systems: eliminate one variable twice to get a 2×2 system, then solve normally.</div>
      `
    },
    {
      type: "mc",
      question: "Solve: x² - 7x + 12 = 0. The solutions are:",
      options: ["x = 3 and x = 4", "x = -3 and x = -4", "x = 6 and x = 2", "x = 1 and x = 12"],
      correct: 0,
      explanation: "Factor: (x - 3)(x - 4) = 0. Check: -3 × -4 = 12 ✓, -3 + (-4) = -7 ✓. Therefore x = 3 or x = 4."
    },
    {
      type: "fill",
      sentence: "The discriminant Δ = b² - ___ determines the nature of roots.",
      blanks: ["4ac"],
      options: ["4ac", "2ac", "4bc", "b²"],
      correct: ["4ac"],
      explanation: "The quadratic formula discriminant is Δ = b² - 4ac. This appears in the quadratic formula: x = (-b ± √Δ) / 2a"
    },
    {
      type: "input",
      prompt: "Using the quadratic formula, find x if x² + 2x - 8 = 0. (Type the larger root only)",
      answer: "2",
      hint: "a=1, b=2, c=-8. Δ = 4+32 = 36. x = (-2 ± 6) / 2",
      explanation: "Δ = 4 - 4(1)(-8) = 36. x = (-2 ± 6)/2. So x = 2 or x = -4. Larger root = 2."
    }
  ],

  "m-calc1": [
    {
      type: "teach",
      title: "Differentiation Rules",
      content: `
        <h3>Core Rules — Memorize These</h3>
        <table class="teach-table">
          <tr><th>Rule</th><th>Formula</th><th>Example</th></tr>
          <tr><td>Power Rule</td><td>d/dx [xⁿ] = nxⁿ⁻¹</td><td>d/dx [x⁵] = 5x⁴</td></tr>
          <tr><td>Constant</td><td>d/dx [c] = 0</td><td>d/dx [7] = 0</td></tr>
          <tr><td>Sum/Difference</td><td>(f ± g)' = f' ± g'</td><td>(x³ + x²)' = 3x² + 2x</td></tr>
          <tr><td>Product Rule</td><td>(fg)' = f'g + fg'</td><td>(x²)(sin x)' = 2x·sin x + x²·cos x</td></tr>
          <tr><td>Quotient Rule</td><td>(f/g)' = (f'g - fg')/g²</td><td>d/dx[x/sin x] = (sin x - x cos x)/sin²x</td></tr>
          <tr><td>Chain Rule</td><td>d/dx[f(g(x))] = f'(g(x))·g'(x)</td><td>d/dx[(x²+1)⁵] = 5(x²+1)⁴·2x</td></tr>
        </table>
        <h3>Standard Derivatives</h3>
        <div class="teach-formula">sin x → cos x | cos x → -sin x | eˣ → eˣ | ln x → 1/x | aˣ → aˣ ln a</div>
        <div class="teach-callout">⚠️ Chain Rule is tested most. Always identify the outer function f and inner function g, then multiply their derivatives.</div>
      `
    },
    {
      type: "mc",
      question: "Find dy/dx if y = (3x² + 2)⁴",
      options: ["4(3x² + 2)³", "4(3x² + 2)³ · 6x", "24x(3x² + 2)³", "Both B and C are correct"],
      correct: 3,
      explanation: "Chain Rule: dy/dx = 4(3x² + 2)³ · d/dx(3x² + 2) = 4(3x² + 2)³ · 6x = 24x(3x² + 2)³. Options B and C both express the same thing, so D is correct."
    },
    {
      type: "fill",
      sentence: "d/dx [x⁷] = ___x⁶ (by the Power Rule)",
      blanks: ["7"],
      options: ["5", "6", "7", "8"],
      correct: ["7"],
      explanation: "Power Rule: d/dx [xⁿ] = nxⁿ⁻¹. Here n = 7, so d/dx [x⁷] = 7x⁶."
    },
    {
      type: "mc",
      question: "Using the Product Rule, find d/dx [x³ · eˣ]",
      options: ["3x² · eˣ", "x³ · eˣ", "3x²eˣ + x³eˣ", "3x²eˣ - x³eˣ"],
      correct: 2,
      explanation: "Product Rule: (fg)' = f'g + fg'. Here f = x³, f' = 3x², g = eˣ, g' = eˣ. Answer = 3x²·eˣ + x³·eˣ = eˣ(3x² + x³)."
    },
    {
      type: "match",
      instruction: "Match each function to its derivative",
      pairs: [
        { left: "f(x) = sin x", right: "f'(x) = cos x" },
        { left: "f(x) = eˣ", right: "f'(x) = eˣ" },
        { left: "f(x) = ln x", right: "f'(x) = 1/x" },
        { left: "f(x) = cos x", right: "f'(x) = -sin x" },
      ]
    }
  ],

  "m-trig": [
    {
      type: "teach",
      title: "Trigonometric Ratios & CAST Diagram",
      content: `
        <h3>SOH-CAH-TOA</h3>
        <div class="teach-formula">sin θ = Opposite/Hypotenuse | cos θ = Adjacent/Hypotenuse | tan θ = Opposite/Adjacent</div>
        <h3>CAST Diagram — Signs in Each Quadrant</h3>
        <table class="teach-table">
          <tr><th>Quadrant</th><th>Angle Range</th><th>Positive Functions</th></tr>
          <tr><td>Q1 (All)</td><td>0° – 90°</td><td>sin, cos, tan all positive</td></tr>
          <tr><td>Q2 (Sine)</td><td>90° – 180°</td><td>sin only positive</td></tr>
          <tr><td>Q3 (Tan)</td><td>180° – 270°</td><td>tan only positive</td></tr>
          <tr><td>Q4 (Cos)</td><td>270° – 360°</td><td>cos only positive</td></tr>
        </table>
        <h3>Key Identities — Must Memorize</h3>
        <div class="teach-formula">sin²θ + cos²θ = 1 | tan θ = sin θ / cos θ | 1 + tan²θ = sec²θ</div>
        <div class="teach-formula">sin(A±B) = sinA cosB ± cosA sinB</div>
        <div class="teach-formula">cos(A±B) = cosA cosB ∓ sinA sinB</div>
        <div class="teach-callout">⚠️ Double angle: sin 2θ = 2 sin θ cos θ | cos 2θ = cos²θ - sin²θ = 1 - 2sin²θ = 2cos²θ - 1</div>
      `
    },
    {
      type: "mc",
      question: "If sin θ = 3/5 and θ is in the second quadrant, what is cos θ?",
      options: ["4/5", "-4/5", "3/4", "-3/4"],
      correct: 1,
      explanation: "From sin²θ + cos²θ = 1: cos²θ = 1 - 9/25 = 16/25, so cos θ = ±4/5. In Q2, cosine is NEGATIVE (only sine is positive). Therefore cos θ = -4/5."
    },
    {
      type: "fill",
      sentence: "sin²θ + cos²θ = ___  (Pythagorean identity)",
      blanks: ["1"],
      options: ["0", "1", "2", "sin 2θ"],
      correct: ["1"],
      explanation: "The fundamental Pythagorean identity: sin²θ + cos²θ = 1. This is derived from the unit circle definition."
    }
  ],

  // ==================== PHYSICS ====================

  "p-mechanics1": [
    {
      type: "teach",
      title: "Kinematics: SUVAT Equations",
      content: `
        <h3>The 5 SUVAT Variables</h3>
        <table class="teach-table">
          <tr><th>Variable</th><th>Symbol</th><th>Unit</th></tr>
          <tr><td>Displacement</td><td>s</td><td>metres (m)</td></tr>
          <tr><td>Initial velocity</td><td>u</td><td>m/s</td></tr>
          <tr><td>Final velocity</td><td>v</td><td>m/s</td></tr>
          <tr><td>Acceleration</td><td>a</td><td>m/s²</td></tr>
          <tr><td>Time</td><td>t</td><td>seconds (s)</td></tr>
        </table>
        <h3>The 4 SUVAT Equations</h3>
        <div class="teach-formula">v = u + at</div>
        <div class="teach-formula">s = ut + ½at²</div>
        <div class="teach-formula">v² = u² + 2as</div>
        <div class="teach-formula">s = ½(u + v)t</div>
        <div class="teach-callout">Strategy: Identify 3 known variables → choose the equation with those 3 + your unknown. Constant acceleration only!</div>
        <h3>Projectile Motion</h3>
        <p>Split into horizontal (constant velocity, a=0) and vertical (a = -9.8 m/s²) components.</p>
        <div class="teach-example">Horizontal: x = u·cos(θ)·t | Vertical: y = u·sin(θ)·t - ½gt²</div>
      `
    },
    {
      type: "mc",
      question: "A car accelerates from rest at 3 m/s². What is its velocity after 8 seconds?",
      options: ["11 m/s", "24 m/s", "96 m/s", "3 m/s"],
      correct: 1,
      explanation: "Use v = u + at. u = 0 (from rest), a = 3, t = 8. v = 0 + 3×8 = 24 m/s."
    },
    {
      type: "mc",
      question: "A ball is dropped from rest. How far does it fall in 4 seconds? (g = 10 m/s²)",
      options: ["40 m", "80 m", "160 m", "20 m"],
      correct: 1,
      explanation: "s = ut + ½at². u=0, a=10, t=4. s = 0 + ½(10)(16) = 80 m."
    },
    {
      type: "fill",
      sentence: "The SUVAT equation that does NOT use time is: v² = u² + ___",
      blanks: ["2as"],
      options: ["2as", "at²", "½at²", "2us"],
      correct: ["2as"],
      explanation: "v² = u² + 2as is the SUVAT equation independent of time t. Very useful when time is not given or required."
    },
    {
      type: "match",
      instruction: "Match each SUVAT equation to the variable it does NOT contain",
      pairs: [
        { left: "v = u + at", right: "Doesn't use s" },
        { left: "s = ut + ½at²", right: "Doesn't use v" },
        { left: "v² = u² + 2as", right: "Doesn't use t" },
        { left: "s = ½(u+v)t", right: "Doesn't use a" },
      ]
    }
  ],

  "p-mechanics2": [
    {
      type: "teach",
      title: "Newton's Three Laws of Motion",
      content: `
        <h3>Newton's First Law — Inertia</h3>
        <p>An object remains at rest or in uniform motion unless acted on by a net external force.</p>
        <div class="teach-callout">∑F = 0 ↔ constant velocity (including v = 0)</div>
        <h3>Newton's Second Law — F = ma</h3>
        <div class="teach-formula">∑F = ma</div>
        <p>The net force on an object equals its mass × acceleration. Direction matters — force and acceleration are vectors.</p>
        <h3>Newton's Third Law — Action-Reaction</h3>
        <p>For every action there is an equal and opposite reaction. Force pairs act on DIFFERENT objects.</p>
        <div class="teach-example">Earth pulls you down (gravity) → You pull Earth up (same magnitude, opposite direction)</div>
        <h3>Common Forces to Know</h3>
        <table class="teach-table">
          <tr><th>Force</th><th>Formula</th><th>Notes</th></tr>
          <tr><td>Weight</td><td>W = mg</td><td>g = 9.8 m/s² near Earth's surface</td></tr>
          <tr><td>Friction</td><td>f = μN</td><td>μ = coefficient, N = normal force</td></tr>
          <tr><td>Normal</td><td>N = mg cos θ</td><td>Perpendicular to surface</td></tr>
          <tr><td>Tension</td><td>T</td><td>Along the string/rope</td></tr>
        </table>
      `
    },
    {
      type: "mc",
      question: "A 5 kg box is pushed with 30 N force on a surface with friction force 10 N. What is the acceleration?",
      options: ["6 m/s²", "4 m/s²", "2 m/s²", "8 m/s²"],
      correct: 1,
      explanation: "Net force = 30 - 10 = 20 N. a = F/m = 20/5 = 4 m/s²."
    },
    {
      type: "mc",
      question: "Which statement is correct about Newton's Third Law?",
      options: [
        "The action and reaction forces act on the same object",
        "The reaction force is always smaller than the action force",
        "Action and reaction forces act on different objects",
        "Newton's Third Law only applies to stationary objects"
      ],
      correct: 2,
      explanation: "Newton's Third Law: action-reaction pairs act on DIFFERENT objects. This is the most commonly confused aspect of this law."
    }
  ],

  "p-energy": [
    {
      type: "teach",
      title: "Energy, Work & Conservation Laws",
      content: `
        <h3>Work Done</h3>
        <div class="teach-formula">W = F · d · cos θ</div>
        <p>Where θ is the angle between force and displacement. If perpendicular (θ=90°), no work is done!</p>
        <h3>Kinetic & Potential Energy</h3>
        <div class="teach-formula">KE = ½mv²    |    GPE = mgh    |    EPE = ½kx²</div>
        <h3>Conservation of Energy</h3>
        <div class="teach-formula">Total Energy = KE + PE = constant (no friction)</div>
        <div class="teach-example">Ball dropped from h: mgh = ½mv² at bottom → v = √(2gh)</div>
        <h3>Power</h3>
        <div class="teach-formula">P = W/t = F·v</div>
        <h3>Momentum & Impulse</h3>
        <div class="teach-formula">p = mv    |    J = Ft = Δp</div>
        <div class="teach-callout">Conservation of Momentum: ∑p_before = ∑p_after (no external forces). Elastic collision: KE conserved. Inelastic: KE not conserved.</div>
      `
    },
    {
      type: "mc",
      question: "A 2 kg ball falls from 20 m height. What is its speed just before hitting the ground? (g = 10 m/s²)",
      options: ["10 m/s", "20 m/s", "200 m/s", "14.1 m/s"],
      correct: 1,
      explanation: "Conservation of energy: mgh = ½mv². Cancel m: v = √(2gh) = √(2×10×20) = √400 = 20 m/s."
    },
    {
      type: "fill",
      sentence: "Work done = Force × displacement × cos(___), where ___ is the angle between F and d.",
      blanks: ["θ"],
      options: ["θ", "α", "φ", "90°"],
      correct: ["θ"],
      explanation: "W = F·d·cos θ where θ is the angle between the force vector and displacement vector."
    }
  ],

  "p-em1": [
    {
      type: "teach",
      title: "Electric Fields & Coulomb's Law",
      content: `
        <h3>Coulomb's Law</h3>
        <div class="teach-formula">F = kq₁q₂/r²   where k = 8.99×10⁹ N·m²/C²</div>
        <p>Force is attractive if charges are opposite, repulsive if same sign.</p>
        <h3>Electric Field</h3>
        <div class="teach-formula">E = F/q = kQ/r²</div>
        <p>Direction: away from positive charge, toward negative charge.</p>
        <h3>Electric Potential</h3>
        <div class="teach-formula">V = kQ/r    |    W = qV    |    E = -dV/dx</div>
        <div class="teach-callout">V is a scalar. E is a vector. E field points from HIGH to LOW potential.</div>
        <h3>Capacitors</h3>
        <div class="teach-formula">C = Q/V = ε₀A/d    |    U = ½CV² = Q²/2C</div>
        <table class="teach-table">
          <tr><th>Config</th><th>Formula</th></tr>
          <tr><td>Series</td><td>1/C_total = 1/C₁ + 1/C₂ + ...</td></tr>
          <tr><td>Parallel</td><td>C_total = C₁ + C₂ + ...</td></tr>
        </table>
      `
    },
    {
      type: "mc",
      question: "Two charges +2μC and +8μC are 3m apart. What is the electrostatic force between them?",
      options: ["16×10⁻³ N", "16×10⁻⁶ N", "1.6×10⁻² N", "Approximately 0.016 N"],
      correct: 3,
      explanation: "F = kq₁q₂/r² = (9×10⁹)(2×10⁻⁶)(8×10⁻⁶)/9 = (9×10⁹)(16×10⁻¹²)/9 = 16×10⁻³ N = 0.016 N."
    }
  ],

  "p-thermo": [
    {
      type: "teach",
      title: "Thermodynamics & Gas Laws",
      content: `
        <h3>The Gas Laws</h3>
        <table class="teach-table">
          <tr><th>Law</th><th>Formula</th><th>Constant</th></tr>
          <tr><td>Boyle's</td><td>P₁V₁ = P₂V₂</td><td>T constant</td></tr>
          <tr><td>Charles's</td><td>V₁/T₁ = V₂/T₂</td><td>P constant</td></tr>
          <tr><td>Gay-Lussac's</td><td>P₁/T₁ = P₂/T₂</td><td>V constant</td></tr>
          <tr><td>Ideal Gas</td><td>PV = nRT</td><td>R = 8.314 J/mol·K</td></tr>
        </table>
        <div class="teach-callout">⚠️ Always use Kelvin (K) in gas law calculations! T(K) = T(°C) + 273</div>
        <h3>Laws of Thermodynamics</h3>
        <ul>
          <li><strong>0th:</strong> Thermal equilibrium is transitive</li>
          <li><strong>1st:</strong> ΔU = Q - W (energy conservation)</li>
          <li><strong>2nd:</strong> Entropy of isolated system never decreases</li>
          <li><strong>3rd:</strong> Absolute zero is unattainable</li>
        </ul>
        <div class="teach-formula">ΔU = Q - W   (Q = heat added, W = work done by system)</div>
      `
    },
    {
      type: "mc",
      question: "A gas at 27°C is heated to 127°C at constant pressure. If initial volume is 2L, what is the final volume?",
      options: ["2.67 L", "1.5 L", "9.4 L", "2.0 L"],
      correct: 0,
      explanation: "Charles's Law: V₁/T₁ = V₂/T₂. Convert to Kelvin: T₁ = 300K, T₂ = 400K. V₂ = V₁ × T₂/T₁ = 2 × 400/300 = 2.67 L."
    }
  ],

  // ==================== CHEMISTRY ====================

  "ch-atomic": [
    {
      type: "teach",
      title: "Atomic Structure & Electron Configuration",
      content: `
        <h3>Subatomic Particles</h3>
        <table class="teach-table">
          <tr><th>Particle</th><th>Symbol</th><th>Charge</th><th>Mass</th><th>Location</th></tr>
          <tr><td>Proton</td><td>p⁺</td><td>+1</td><td>1 amu</td><td>Nucleus</td></tr>
          <tr><td>Neutron</td><td>n⁰</td><td>0</td><td>1 amu</td><td>Nucleus</td></tr>
          <tr><td>Electron</td><td>e⁻</td><td>-1</td><td>≈0</td><td>Electron shells</td></tr>
        </table>
        <h3>Electron Configuration</h3>
        <div class="teach-formula">1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ ...</div>
        <p>Fill in order: 1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s → 4d → 5p ...</p>
        <div class="teach-callout">⚠️ 4s fills BEFORE 3d! This catches everyone. Fe = [Ar] 3d⁶ 4s² NOT [Ar] 4s² 3d⁶ (though both notations appear)</div>
        <h3>Quantum Numbers</h3>
        <table class="teach-table">
          <tr><th>Number</th><th>Symbol</th><th>Values</th><th>Meaning</th></tr>
          <tr><td>Principal</td><td>n</td><td>1, 2, 3...</td><td>Shell / energy level</td></tr>
          <tr><td>Azimuthal</td><td>l</td><td>0 to n-1</td><td>Subshell (s,p,d,f)</td></tr>
          <tr><td>Magnetic</td><td>mₗ</td><td>-l to +l</td><td>Orbital orientation</td></tr>
          <tr><td>Spin</td><td>mₛ</td><td>+½ or -½</td><td>Electron spin</td></tr>
        </table>
      `
    },
    {
      type: "mc",
      question: "What is the electron configuration of Fe (Z=26)?",
      options: [
        "[Ar] 3d⁸",
        "[Ar] 4s² 3d⁶",
        "[Ar] 3d⁶ 4s² 4p²",
        "[Ne] 3s² 3p⁶ 3d⁸"
      ],
      correct: 1,
      explanation: "[Ar] = 1s²2s²2p⁶3s²3p⁶ (18 electrons). Fe has 26 electrons, so 8 more: 4s² (2) + 3d⁶ (6) = 8. Configuration: [Ar] 4s² 3d⁶."
    },
    {
      type: "fill",
      sentence: "The number of protons in an atom equals its atomic ___ (Z).",
      blanks: ["number"],
      options: ["number", "mass", "weight", "charge"],
      correct: ["number"],
      explanation: "The atomic number Z = number of protons. This defines the element. Number of neutrons = mass number - Z."
    },
    {
      type: "match",
      instruction: "Match each quantum number to what it describes",
      pairs: [
        { left: "Principal (n)", right: "Energy level / shell" },
        { left: "Azimuthal (l)", right: "Subshell shape (s, p, d, f)" },
        { left: "Magnetic (mₗ)", right: "Orbital orientation" },
        { left: "Spin (mₛ)", right: "+½ or -½ direction" },
      ]
    }
  ],

  "ch-stoich": [
    {
      type: "teach",
      title: "The Mole & Stoichiometry",
      content: `
        <h3>The Mole</h3>
        <div class="teach-formula">1 mol = 6.022 × 10²³ particles (Avogadro's number)</div>
        <div class="teach-formula">Moles = mass (g) / molar mass (g/mol)</div>
        <div class="teach-formula">Moles = volume (L) / 22.4  (at STP)</div>
        <div class="teach-formula">Moles = concentration (mol/L) × volume (L)</div>
        <h3>Balancing Equations</h3>
        <p>Count atoms on each side. Adjust coefficients (not subscripts!) to balance.</p>
        <div class="teach-example">Fe + O₂ → Fe₂O₃ (unbalanced)<br>4Fe + 3O₂ → 2Fe₂O₃ (balanced ✓)</div>
        <h3>Limiting Reagent</h3>
        <p>Find which reactant runs out first — it limits the yield.</p>
        <div class="teach-example">
          A + 2B → C. You have 3 mol A and 4 mol B.<br>
          For 3 mol A you need 6 mol B, but only have 4.<br>
          ∴ B is the limiting reagent. Max yield = 4/2 = 2 mol C.
        </div>
        <div class="teach-formula">% Yield = (actual yield / theoretical yield) × 100%</div>
      `
    },
    {
      type: "mc",
      question: "How many moles are in 44g of CO₂? (Molar mass CO₂ = 44 g/mol)",
      options: ["0.5 mol", "1 mol", "2 mol", "44 mol"],
      correct: 1,
      explanation: "Moles = mass / molar mass = 44/44 = 1 mol."
    },
    {
      type: "mc",
      question: "In the reaction N₂ + 3H₂ → 2NH₃, if 2 mol N₂ reacts completely, how many moles of NH₃ are produced?",
      options: ["2 mol", "3 mol", "4 mol", "6 mol"],
      correct: 2,
      explanation: "Molar ratio N₂:NH₃ = 1:2. So 2 mol N₂ → 2×2 = 4 mol NH₃."
    },
    {
      type: "fill",
      sentence: "Avogadro's number = 6.022 × 10___ particles per mole.",
      blanks: ["²³"],
      options: ["²²", "²³", "²⁴", "²⁵"],
      correct: ["²³"],
      explanation: "Avogadro's number NA = 6.022 × 10²³ mol⁻¹. This is the number of particles (atoms, molecules, ions) in one mole of any substance."
    }
  ],

  "ch-acids": [
    {
      type: "teach",
      title: "Acids, Bases & pH",
      content: `
        <h3>Definitions</h3>
        <table class="teach-table">
          <tr><th>Theory</th><th>Acid</th><th>Base</th></tr>
          <tr><td>Arrhenius</td><td>Produces H⁺ in water</td><td>Produces OH⁻ in water</td></tr>
          <tr><td>Brønsted-Lowry</td><td>Proton (H⁺) donor</td><td>Proton (H⁺) acceptor</td></tr>
          <tr><td>Lewis</td><td>Electron pair acceptor</td><td>Electron pair donor</td></tr>
        </table>
        <h3>pH Scale</h3>
        <div class="teach-formula">pH = -log[H⁺]    |    pOH = -log[OH⁻]    |    pH + pOH = 14</div>
        <p>pH < 7: acidic | pH = 7: neutral | pH > 7: basic</p>
        <div class="teach-example">0.01 mol/L HCl → [H⁺] = 0.01 = 10⁻² → pH = 2</div>
        <h3>Strong vs Weak Acids/Bases</h3>
        <div class="teach-callout">Strong acids FULLY dissociate: HCl, H₂SO₄, HNO₃, HClO₄, HBr, HI. Weak acids partially dissociate (Ka expression needed).</div>
        <div class="teach-formula">Ka = [H⁺][A⁻] / [HA]    |    pKa = -log Ka</div>
        <h3>Buffer Solutions</h3>
        <p>Resist pH changes. Contain weak acid + conjugate base (or weak base + conjugate acid).</p>
        <div class="teach-formula">Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA])</div>
      `
    },
    {
      type: "mc",
      question: "What is the pH of 0.001 mol/L HCl solution?",
      options: ["1", "2", "3", "4"],
      correct: 2,
      explanation: "HCl is a strong acid, fully dissociates: [H⁺] = 0.001 = 10⁻³. pH = -log(10⁻³) = 3."
    },
    {
      type: "match",
      instruction: "Match the acid/base theory to its definition",
      pairs: [
        { left: "Arrhenius Acid", right: "Releases H⁺ in water" },
        { left: "Brønsted-Lowry Base", right: "Accepts H⁺ (proton)" },
        { left: "Lewis Acid", right: "Accepts electron pair" },
        { left: "Conjugate Base", right: "Formed after acid loses H⁺" },
      ]
    }
  ],

  "ch-equilib": [
    {
      type: "teach",
      title: "Chemical Equilibrium & Le Chatelier's Principle",
      content: `
        <h3>Equilibrium Constant</h3>
        <p>For: aA + bB ⇌ cC + dD</p>
        <div class="teach-formula">Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ   (pure solids/liquids excluded)</div>
        <p>K > 1: products favoured. K < 1: reactants favoured. K = 1: equal.</p>
        <h3>Le Chatelier's Principle</h3>
        <p>If a system at equilibrium is stressed, it shifts to relieve that stress.</p>
        <table class="teach-table">
          <tr><th>Stress</th><th>Shift Direction</th></tr>
          <tr><td>Add reactant</td><td>→ Forward (toward products)</td></tr>
          <tr><td>Remove product</td><td>→ Forward (toward products)</td></tr>
          <tr><td>Increase pressure</td><td>→ Side with fewer moles of gas</td></tr>
          <tr><td>Increase temperature</td><td>→ Endothermic direction</td></tr>
          <tr><td>Add catalyst</td><td>No shift — reaches equilibrium faster</td></tr>
        </table>
        <div class="teach-callout">⚠️ Adding a catalyst does NOT shift equilibrium. It just speeds up BOTH forward and reverse reactions equally.</div>
        <h3>ICE Tables</h3>
        <div class="teach-example">Initial / Change / Equilibrium — set up for any equilibrium calculation</div>
      `
    },
    {
      type: "mc",
      question: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)  ΔH = -92 kJ/mol. To increase yield of NH₃, you should:",
      options: [
        "Increase temperature",
        "Decrease pressure",
        "Increase pressure and decrease temperature",
        "Add a catalyst"
      ],
      correct: 2,
      explanation: "Increase pressure: shifts to side with fewer gas moles (2 vs 4) → forward → more NH₃. Decrease temperature: reaction is exothermic, so lower T favors forward → more NH₃. Catalyst doesn't increase yield, only speed."
    },
    {
      type: "mc",
      question: "For the reaction: H₂(g) + I₂(g) ⇌ 2HI(g). If [H₂]=0.5, [I₂]=0.5, [HI]=2, what is Kc?",
      options: ["8", "16", "4", "2"],
      correct: 1,
      explanation: "Kc = [HI]² / [H₂][I₂] = (2)² / (0.5)(0.5) = 4 / 0.25 = 16."
    }
  ],

  "ch-organic": [
    {
      type: "teach",
      title: "Organic Chemistry: Functional Groups",
      content: `
        <h3>Key Functional Groups</h3>
        <table class="teach-table">
          <tr><th>Group</th><th>Structure</th><th>Class</th><th>Suffix</th></tr>
          <tr><td>Hydroxyl</td><td>-OH</td><td>Alcohol</td><td>-ol</td></tr>
          <tr><td>Carbonyl (end)</td><td>-CHO</td><td>Aldehyde</td><td>-al</td></tr>
          <tr><td>Carbonyl (mid)</td><td>-C=O-</td><td>Ketone</td><td>-one</td></tr>
          <tr><td>Carboxyl</td><td>-COOH</td><td>Carboxylic acid</td><td>-oic acid</td></tr>
          <tr><td>Ester</td><td>-COO-</td><td>Ester</td><td>-anoate</td></tr>
          <tr><td>Amino</td><td>-NH₂</td><td>Amine</td><td>-amine</td></tr>
          <tr><td>Halide</td><td>-X (F,Cl,Br,I)</td><td>Haloalkane</td><td>halo-prefix</td></tr>
        </table>
        <h3>Reaction Types</h3>
        <ul>
          <li><strong>Addition:</strong> Double bond + molecule → single bond (alkenes)</li>
          <li><strong>Substitution:</strong> One atom/group replaces another (haloalkanes)</li>
          <li><strong>Elimination:</strong> Remove atoms → form double bond</li>
          <li><strong>Oxidation/Reduction:</strong> alcohol → aldehyde → carboxylic acid</li>
          <li><strong>Esterification:</strong> alcohol + acid → ester + water (H₂SO₄ catalyst)</li>
        </ul>
        <div class="teach-callout">Oxidation series: Primary alcohol → Aldehyde → Carboxylic acid. Secondary alcohol → Ketone (cannot oxidise further).</div>
      `
    },
    {
      type: "mc",
      question: "Which functional group is present in ethanol (CH₃CH₂OH)?",
      options: ["Carbonyl", "Hydroxyl", "Carboxyl", "Amino"],
      correct: 1,
      explanation: "Ethanol contains -OH (hydroxyl group). This makes it an alcohol. Carbonyl is C=O, Carboxyl is -COOH, Amino is -NH₂."
    },
    {
      type: "match",
      instruction: "Match functional group to its chemical class",
      pairs: [
        { left: "-OH", right: "Alcohol" },
        { left: "-CHO", right: "Aldehyde" },
        { left: "-COOH", right: "Carboxylic acid" },
        { left: "-NH₂", right: "Amine" },
      ]
    }
  ],

  "c-acad": [
    {
      type: "teach",
      title: "Academic Chinese — Science & Math Terms",
      content: `
        <p>These terms appear in Chinese-language science papers, university entrance interviews, and CSCA reading passages.</p>
        <h3>Mathematics (数学) Terms</h3>
        <div class="teach-vocab-grid">
          <div class="tvc"><div class="tvc-zh">方程式</div><div class="tvc-pin">fāngchéngshì</div><div class="tvc-eng">equation</div></div>
          <div class="tvc"><div class="tvc-zh">微积分</div><div class="tvc-pin">wēijīfēn</div><div class="tvc-eng">calculus</div></div>
          <div class="tvc"><div class="tvc-zh">导数</div><div class="tvc-pin">dǎoshù</div><div class="tvc-eng">derivative</div></div>
          <div class="tvc"><div class="tvc-zh">积分</div><div class="tvc-pin">jīfēn</div><div class="tvc-eng">integral</div></div>
          <div class="tvc"><div class="tvc-zh">函数</div><div class="tvc-pin">hánshù</div><div class="tvc-eng">function</div></div>
          <div class="tvc"><div class="tvc-zh">概率</div><div class="tvc-pin">gàilǜ</div><div class="tvc-eng">probability</div></div>
        </div>
        <h3>Physics (物理) Terms</h3>
        <div class="teach-vocab-grid">
          <div class="tvc"><div class="tvc-zh">加速度</div><div class="tvc-pin">jiāsùdù</div><div class="tvc-eng">acceleration</div></div>
          <div class="tvc"><div class="tvc-zh">动能</div><div class="tvc-pin">dòngnéng</div><div class="tvc-eng">kinetic energy</div></div>
          <div class="tvc"><div class="tvc-zh">势能</div><div class="tvc-pin">shìnéng</div><div class="tvc-eng">potential energy</div></div>
          <div class="tvc"><div class="tvc-zh">电磁场</div><div class="tvc-pin">diàncí chǎng</div><div class="tvc-eng">electromagnetic field</div></div>
          <div class="tvc"><div class="tvc-zh">波长</div><div class="tvc-pin">bōcháng</div><div class="tvc-eng">wavelength</div></div>
          <div class="tvc"><div class="tvc-zh">热力学</div><div class="tvc-pin">rèlìxué</div><div class="tvc-eng">thermodynamics</div></div>
        </div>
        <h3>Chemistry (化学) Terms</h3>
        <div class="teach-vocab-grid">
          <div class="tvc"><div class="tvc-zh">原子结构</div><div class="tvc-pin">yuánzǐ jiégòu</div><div class="tvc-eng">atomic structure</div></div>
          <div class="tvc"><div class="tvc-zh">化学键</div><div class="tvc-pin">huàxué jiàn</div><div class="tvc-eng">chemical bond</div></div>
          <div class="tvc"><div class="tvc-zh">氧化还原</div><div class="tvc-pin">yǎnghuà huányuán</div><div class="tvc-eng">redox (oxidation-reduction)</div></div>
          <div class="tvc"><div class="tvc-zh">有机化学</div><div class="tvc-pin">yǒujī huàxué</div><div class="tvc-eng">organic chemistry</div></div>
          <div class="tvc"><div class="tvc-zh">摩尔</div><div class="tvc-pin">mó'ěr</div><div class="tvc-eng">mole</div></div>
          <div class="tvc"><div class="tvc-zh">平衡常数</div><div class="tvc-pin">pínghéng chángshù</div><div class="tvc-eng">equilibrium constant</div></div>
        </div>
      `
    },
    {
      type: "match",
      instruction: "Match the Chinese term to its English equivalent",
      pairs: [
        { left: "导数", right: "derivative" },
        { left: "加速度", right: "acceleration" },
        { left: "摩尔", right: "mole" },
        { left: "概率", right: "probability" },
      ]
    },
    {
      type: "mc",
      question: "What is 动能 (dòngnéng) in Physics?",
      options: ["Potential Energy", "Kinetic Energy", "Thermal Energy", "Electromagnetic Energy"],
      correct: 1,
      explanation: "动 = motion/movement, 能 = energy. 动能 = kinetic energy (energy of motion). KE = ½mv²."
    }
  ]
};

// ============================================================
//  FLASHCARD DECKS
// ============================================================
const FC_DECKS = [
  {
    id: "chinese-grammar",
    name: "Chinese Grammar", subject: "chinese", icon: "✏️",
    cards: [
      { q: "Structure of a 把 sentence?", a: "Subject + 把 + [Definite Object] + Verb + Complement\n⚠️ Verb cannot stand alone!" },
      { q: "When can you NOT use 把?", a: "1. Indefinite object (一本书)\n2. Stative verbs: 是,有,喜欢,知道\n3. Negative: use 没有把 not 不把" },
      { q: "What does 被 indicate?", a: "Passive voice — subject RECEIVES the action.\nSubject + 被 + Agent + V + Complement\nAgent can be omitted." },
      { q: "Potential complement: how to form?", a: "V + 得 + Result = CAN do\nV + 不 + Result = CANNOT do\nEx: 听得懂 / 听不懂\n⚠️ Cannot use with 了 or 过!" },
      { q: "Degree complement: structure?", a: "V + 得 + Degree\n说得很流利\nWith object: repeat verb!\n他说中文说得很流利 ✓" },
      { q: "Resultative complement examples?", a: "做完 (finish doing)\n听懂 (understand by listening)\n找到 (find/reach goal)\n写错 (write wrongly)" }
    ]
  },
  {
    id: "chinese-vocab",
    name: "Chinese Vocabulary", subject: "chinese", icon: "🔤",
    cards: [
      { q: "发现 vs 发明", a: "发现 fāxiàn = discover (already exists)\n发明 fāmíng = invent (create new)\nNewton 发现'd gravity. Edison 发明'd light bulb." },
      { q: "以为 vs 认为", a: "以为 yǐwéi = mistakenly believe (you were WRONG)\n认为 rènwéi = think/believe (neutral)\n以为 pairs with 结果/原来..." },
      { q: "What is 遗憾?", a: "遗憾 (yíhàn) = regret, pity\nFor unfortunate situations (outside your control)\nvs 后悔 = regret YOUR OWN mistake" },
      { q: "改变 vs 改善", a: "改变 gǎibiàn = change (neutral)\n改善 gǎishàn = improve (ALWAYS positive)\n改善 contains 善 = good" },
      { q: "What is 逐渐?", a: "逐渐 zhújiàn = gradually, little by little\n情况逐渐好转 = the situation gradually improved" },
      { q: "增加 vs 增长", a: "增加 zēngjiā = add/increase (things)\n增长 zēngzhǎng = grow/rise (rate, economy, %)\n经济增长 is a fixed collocation!" }
    ]
  },
  {
    id: "chengyu",
    name: "成语 Chengyu", subject: "chinese", icon: "📜",
    cards: [
      { q: "一石二鸟 yī shí èr niǎo", a: "Kill two birds with one stone\nOne action achieves two goals" },
      { q: "半途而废 bàn tú ér fèi", a: "Give up halfway\nNegative — criticizes not finishing\nOpposite: 持之以恒" },
      { q: "画蛇添足 huà shé tiān zú", a: "Add feet to a snake drawing\n= Ruin something by overdoing it" },
      { q: "守株待兔 shǒu zhū dài tù", a: "Wait by a stump for a rabbit\n= Wait passively for luck; don't work" },
      { q: "亡羊补牢 wáng yáng bǔ láo", a: "Mend pen after sheep escapes\n= Better late than never" },
      { q: "滴水穿石 dī shuǐ chuān shí", a: "Dripping water pierces stone\n= Perseverance overcomes any obstacle" }
    ]
  },
  {
    id: "math-formulas",
    name: "Math Formulas", subject: "math", icon: "📐",
    cards: [
      { q: "Quadratic Formula", a: "x = (-b ± √(b² - 4ac)) / 2a\nDiscriminant Δ = b² - 4ac\nΔ>0: 2 real roots | Δ=0: 1 root | Δ<0: no real roots" },
      { q: "Power Rule (differentiation)", a: "d/dx [xⁿ] = nxⁿ⁻¹\nEx: d/dx [x⁵] = 5x⁴" },
      { q: "Chain Rule", a: "d/dx[f(g(x))] = f'(g(x)) · g'(x)\nEx: d/dx[(x²+1)⁵] = 5(x²+1)⁴ · 2x" },
      { q: "Product Rule", a: "(fg)' = f'g + fg'\nEx: d/dx[x² · eˣ] = 2x·eˣ + x²·eˣ" },
      { q: "SUVAT equations (all 4)", a: "v = u + at\ns = ut + ½at²\nv² = u² + 2as\ns = ½(u+v)t" },
      { q: "sin²θ + cos²θ = ?", a: "= 1 (Pythagorean identity)\nAlso: 1 + tan²θ = sec²θ\n1 + cot²θ = csc²θ" },
      { q: "Integration: ∫xⁿ dx = ?", a: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C  (n ≠ -1)\n∫eˣ dx = eˣ + C\n∫1/x dx = ln|x| + C" }
    ]
  },
  {
    id: "physics-laws",
    name: "Physics Laws", subject: "physics", icon: "⚛️",
    cards: [
      { q: "Newton's Second Law", a: "∑F = ma\nNet force = mass × acceleration\nDirection: force and acceleration are vectors" },
      { q: "Conservation of Energy (no friction)", a: "KE + PE = constant\n½mv² + mgh = constant\nBall dropped: v = √(2gh)" },
      { q: "Coulomb's Law", a: "F = kq₁q₂/r²\nk = 8.99×10⁹ N·m²/C²\n+/+ or -/-: repel | +/-: attract" },
      { q: "Ideal Gas Law", a: "PV = nRT\nR = 8.314 J/mol·K\nAlways use KELVIN! T(K) = T(°C) + 273" },
      { q: "First Law of Thermodynamics", a: "ΔU = Q - W\nΔU = change in internal energy\nQ = heat added to system\nW = work done BY system" },
      { q: "de Broglie wavelength", a: "λ = h/mv = h/p\nh = 6.626×10⁻³⁴ J·s (Planck's constant)\nAll matter has wave properties!" }
    ]
  },
  {
    id: "chem-reactions",
    name: "Chemistry Reactions", subject: "chemistry", icon: "🧪",
    cards: [
      { q: "Kc expression for aA+bB⇌cC+dD", a: "Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ\nPure solids and liquids EXCLUDED\nK>1: products favored" },
      { q: "Henderson-Hasselbalch equation", a: "pH = pKa + log([A⁻]/[HA])\nUsed for buffer calculations\nAt equal concentrations: pH = pKa" },
      { q: "Le Chatelier — Increasing T", a: "Shifts to ENDOTHERMIC direction\nIf ΔH < 0 (exothermic): shifts backward\nIf ΔH > 0 (endothermic): shifts forward" },
      { q: "% Yield formula", a: "% Yield = (actual yield / theoretical yield) × 100%\nLimiting reagent sets the theoretical yield" },
      { q: "pH formula", a: "pH = -log[H⁺]\n[H⁺][OH⁻] = 10⁻¹⁴ at 25°C\npH + pOH = 14" },
      { q: "Strong acids (memorize all 6)", a: "HCl, HBr, HI\nH₂SO₄, HNO₃, HClO₄\nAll others are WEAK acids (partial dissociation)" }
    ]
  }
];

// ============================================================
//  NOTES DATA
// ============================================================
const NOTES = {
  chinese: [
    {
      title: "把 & 被 Complete Reference",
      content: `
        <h3>把 — Disposal Construction</h3>
        <p>The 把 sentence is used to emphasize the "disposal" of a specific, definite object. The verb must be followed by a complement.</p>
        <div class="formula-box">Subject + 把 + Definite Object + Verb + Complement</div>
        <p><strong>Cannot use 把 when:</strong></p>
        <ul>
          <li>Object is indefinite: ✗ 我把一本书看完了 → ✓ 我把那本书看完了</li>
          <li>Verb is stative: 是、有、喜欢、知道、认识、感觉</li>
          <li>Negative: 没有把... (not 不把...)</li>
        </ul>
        <h3>被 — Passive Construction</h3>
        <div class="formula-box">Subject (receiver) + 被 + [Agent] + Verb + Complement</div>
        <ul>
          <li>Agent can be omitted: 书被偷了</li>
          <li>Traditional: implies undesirable outcome</li>
          <li>Same complement rule: verb cannot stand alone</li>
        </ul>
        <div class="hl">⭐ Key test item: 把 and 被 sentences describing the same event — compare perspective!</div>
      `
    },
    {
      title: "Complement Types Reference Sheet",
      content: `
        <h3>1. Resultative (结果补语)</h3>
        <div class="formula-box">V + Result: 做完 / 听懂 / 找到 / 写错 / 关上</div>
        <h3>2. Directional (趋向补语)</h3>
        <div class="formula-box">Simple: V + 来/去 | Compound: V + 进来/出去/上来/下去/回来/过来</div>
        <h3>3. Potential (可能补语) ⭐ MOST TESTED</h3>
        <div class="formula-box">V + 得 + Result (CAN) | V + 不 + Result (CANNOT)</div>
        <p>⚠️ CANNOT co-occur with 了 or 过</p>
        <h3>4. Degree (程度补语)</h3>
        <div class="formula-box">V + 得 + Degree: 说得很流利</div>
        <p>With object, repeat the verb: 他说中文说得很流利 ✓</p>
      `
    }
  ],
  math: [
    {
      title: "Calculus — Differentiation Quick Reference",
      content: `
        <h3>Rules Summary</h3>
        <table>
          <tr><th>Rule</th><th>Formula</th></tr>
          <tr><td>Power</td><td>d/dx[xⁿ] = nxⁿ⁻¹</td></tr>
          <tr><td>Product</td><td>(fg)' = f'g + fg'</td></tr>
          <tr><td>Quotient</td><td>(f/g)' = (f'g - fg') / g²</td></tr>
          <tr><td>Chain</td><td>[f(g(x))]' = f'(g(x)) · g'(x)</td></tr>
        </table>
        <h3>Standard Derivatives</h3>
        <div class="formula-box">sin x → cos x | cos x → -sin x | tan x → sec²x | eˣ → eˣ | ln x → 1/x</div>
        <div class="hl">⚠️ Chain Rule tip: identify OUTER and INNER functions first. Always multiply by the inner derivative.</div>
      `
    },
    {
      title: "Algebra — Equations & Factoring",
      content: `
        <h3>Quadratic Formula</h3>
        <div class="formula-box">x = (-b ± √(b² - 4ac)) / 2a</div>
        <h3>Discriminant (Δ = b² - 4ac)</h3>
        <ul>
          <li>Δ > 0 → Two distinct real roots</li>
          <li>Δ = 0 → One repeated root: x = -b/2a</li>
          <li>Δ < 0 → No real roots</li>
        </ul>
        <h3>Completing the Square</h3>
        <div class="formula-box">x² + bx = (x + b/2)² - (b/2)²</div>
      `
    }
  ],
  physics: [
    {
      title: "SUVAT & Kinematics Reference",
      content: `
        <h3>Variables</h3>
        <p>s = displacement (m) | u = initial velocity (m/s) | v = final velocity (m/s) | a = acceleration (m/s²) | t = time (s)</p>
        <h3>The 4 Equations</h3>
        <div class="formula-box">v = u + at (no s)</div>
        <div class="formula-box">s = ut + ½at² (no v)</div>
        <div class="formula-box">v² = u² + 2as (no t)</div>
        <div class="formula-box">s = ½(u+v)t (no a)</div>
        <div class="hl">g = 9.8 m/s² (or 10 m/s² for estimates). Downward is negative when up = positive.</div>
      `
    },
    {
      title: "Energy & Momentum Laws",
      content: `
        <div class="formula-box">KE = ½mv² | GPE = mgh | EPE = ½kx²</div>
        <div class="formula-box">W = Fd cos θ | P = W/t = Fv</div>
        <div class="formula-box">p = mv | Impulse J = Ft = Δp</div>
        <h3>Conservation Laws</h3>
        <ul>
          <li>Energy: KE + PE = const (no friction)</li>
          <li>Momentum: ∑p_before = ∑p_after (no external force)</li>
          <li>Elastic: KE also conserved | Inelastic: KE not conserved</li>
        </ul>
      `
    }
  ],
  chemistry: [
    {
      title: "Equilibrium & Le Chatelier Reference",
      content: `
        <div class="formula-box">Kc = [products]ᵖ / [reactants]ʳ (exclude pure solids/liquids)</div>
        <h3>Le Chatelier's Shifts</h3>
        <table>
          <tr><th>Stress</th><th>Shift</th></tr>
          <tr><td>Add reactant / remove product</td><td>→ Forward</td></tr>
          <tr><td>Add product / remove reactant</td><td>→ Reverse</td></tr>
          <tr><td>Increase P (gas)</td><td>→ Fewer moles gas side</td></tr>
          <tr><td>Increase T</td><td>→ Endothermic direction</td></tr>
          <tr><td>Add catalyst</td><td>No shift — just faster</td></tr>
        </table>
      `
    },
    {
      title: "Acids, Bases & pH Reference",
      content: `
        <div class="formula-box">pH = -log[H⁺] | pOH = -log[OH⁻] | pH + pOH = 14</div>
        <h3>Strong Acids (memorize)</h3>
        <p>HCl, HBr, HI, H₂SO₄, HNO₃, HClO₄</p>
        <div class="formula-box">Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA])</div>
        <div class="hl">⚠️ Weak acid Ka expression: Ka = [H⁺][A⁻] / [HA]. Strong acids: assume 100% dissociation.</div>
      `
    }
  ]
};

// ============================================================
//  PRACTICE TEST QUESTIONS (per subject)
// ============================================================
const TEST_QUESTIONS = {
  chinese: [
    { q: "Which sentence correctly uses 把?", opts: ["我把一本书看完了。","他把门关上了。","她把喜欢了猫。","我被把作业做完。"], ans: 1, exp: "把 needs a definite object + V + complement. '把门关上了' is correct. Option A has indefinite object. Options C/D are wrong structures." },
    { q: "我___他是老师，结果他是学生。", opts: ["认为","以为","觉得","认识"], ans: 1, exp: "以为 = mistakenly believe. The signal 结果 (but actually) shows the belief was wrong." },
    { q: "这道题太难，我___解决。", opts: ["不能","解决不了","不了","解决不得"], ans: 1, exp: "Potential complement: 解决不了 = V + 不 + Complement meaning 'cannot solve'." },
    { q: "画蛇添足 means:", opts: ["Kill two birds with one stone","Ruin by adding unnecessary things","Persevere until success","Give up halfway"], ans: 1, exp: "画蛇添足: draw a snake and add feet (which don't exist) = ruin something by overdoing it." },
    { q: "发现 vs 发明: 爱因斯坦___了相对论", opts: ["发现","发明","创造","发展"], ans: 1, exp: "发明 = invent something NEW. Relativity didn't exist before Einstein created it. 发现 = discover something already existing." }
  ],
  math: [
    { q: "For 2x² - 3x + 1 = 0, the discriminant Δ = ?", opts: ["1","7","9","-1"], ans: 0, exp: "Δ = b² - 4ac = (-3)² - 4(2)(1) = 9 - 8 = 1." },
    { q: "d/dx [x⁴] = ?", opts: ["4x⁵","4x³","x⁵/5","3x³"], ans: 1, exp: "Power Rule: d/dx[xⁿ] = nxⁿ⁻¹. d/dx[x⁴] = 4x³." },
    { q: "d/dx [(2x + 1)⁵] = ?", opts: ["5(2x+1)⁴","10(2x+1)⁴","5(2x+1)⁴ · 2","Both B and C are equal"], ans: 3, exp: "Chain Rule: 5(2x+1)⁴ × 2 = 10(2x+1)⁴. Both B and C express the same value." },
    { q: "If sin θ = 0.6 and θ is in Q2, cos θ = ?", opts: ["0.8","-0.8","0.6","-0.6"], ans: 1, exp: "sin²θ + cos²θ = 1 → cos²θ = 1 - 0.36 = 0.64 → cos θ = ±0.8. In Q2, cos is negative → -0.8." },
    { q: "A car starts from rest and accelerates at 4 m/s² for 5s. Final velocity = ?", opts: ["9 m/s","20 m/s","100 m/s","40 m/s"], ans: 1, exp: "v = u + at = 0 + 4×5 = 20 m/s." }
  ],
  physics: [
    { q: "A 4 kg object accelerates at 3 m/s². Net force = ?", opts: ["1.3 N","7 N","12 N","0.75 N"], ans: 2, exp: "F = ma = 4 × 3 = 12 N." },
    { q: "A ball is dropped from 80m (g=10). Speed at ground = ?", opts:["20 m/s","40 m/s","80 m/s","800 m/s"], ans: 1, exp: "v² = u² + 2as = 0 + 2(10)(80) = 1600. v = 40 m/s." },
    { q: "Coulomb's law: doubling both charges multiplies force by:", opts: ["2","4","8","½"], ans: 1, exp: "F = kq₁q₂/r². If q₁→2q₁ and q₂→2q₂: F becomes k(2q₁)(2q₂)/r² = 4F." },
    { q: "Ideal gas law: at constant T, doubling V causes P to:", opts: ["Double","Halve","Stay same","Quadruple"], ans: 1, exp: "Boyle's Law (constant T): P₁V₁ = P₂V₂. If V doubles, P must halve." },
    { q: "The 1st Law of Thermodynamics: ΔU = ?", opts: ["Q + W","Q - W","W - Q","Q × W"], ans: 1, exp: "ΔU = Q - W. ΔU = change in internal energy, Q = heat added to system, W = work done BY system." }
  ],
  chemistry: [
    { q: "How many moles in 88g of CO₂? (M = 44 g/mol)", opts: ["1","2","4","0.5"], ans: 1, exp: "moles = mass/Mr = 88/44 = 2 mol." },
    { q: "N₂ + 3H₂ → 2NH₃. 3mol N₂ → how many mol NH₃?", opts: ["3","4","6","2"], ans: 2, exp: "N₂:NH₃ ratio = 1:2. So 3 mol N₂ → 6 mol NH₃." },
    { q: "Le Chatelier: Adding catalyst to equilibrium...", opts: ["Shifts forward","Shifts backward","Increases yield","Does not shift equilibrium"], ans: 3, exp: "A catalyst speeds up BOTH forward and reverse reactions equally. It does not shift equilibrium or change yield — only how fast equilibrium is reached." },
    { q: "pH of 0.1 mol/L HCl solution = ?", opts: ["0","1","2","7"], ans: 1, exp: "HCl is a strong acid. [H⁺] = 0.1 = 10⁻¹. pH = -log(10⁻¹) = 1." },
    { q: "Which orbital subshell fills BEFORE 3d?", opts: ["3p","4s","4p","3f"], ans: 1, exp: "Aufbau principle: 4s fills before 3d. This is one of the most common electron configuration mistakes." }
  ]
};
