// The comedy lives here. Keep it silly, not clever.
// Situations: keys are matched as word prefixes (longer keys win), `sticker` is an id from STICKERS.
// {x} in GENERIC is replaced with what the user typed.

// Reaction stickers built on famous Malayalam dialogues.
// Drop an image named stickers/<id>.webp (or .png / .jpg) to replace the emoji card.
const STICKERS = {
  dinesha: {
    id: "dinesha", emoji: "😎", who: "Mohanlal", from: "Narasimham (2000)",
    ml: "നീ പോ മോനെ ദിനേശാ", mg: "Nee po mone Dinesha",
    advice: "Look the problem in the eye, fold your mundu, and say \"Nee po mone Dinesha\". The problem stays. But the mundu fold was very nice.",
  },
  kathi: {
    id: "kathi", emoji: "🔪", who: "Mohanlal", from: "Kireedam (1989)",
    ml: "കത്തി താഴെ ഇടടാ", mg: "Kathi thazhe idada",
    advice: "Put down whatever is in your hand and shout \"Kathi thazhe idada!\". Even if it's a banana. Especially if it's a banana.",
  },
  samayam: {
    id: "samayam", emoji: "⏳", who: "Sreenivasan", from: "Nadodikkattu (1987)",
    ml: "എല്ലാത്തിനും അതിന്റേതായ സമയമുണ്ട് ദാസാ", mg: "Ellathinum athintethaaya samayamundu Dasa",
    advice: "Do nothing. Ellathinum athintethaaya samayamundu. Your samayam is probably right after lunch.",
  },
  pavanayi: {
    id: "pavanayi", emoji: "💀", who: "Captain Raju as Pavanayi", from: "Nadodikkattu (1987)",
    ml: "പവനായി ശവമായി", mg: "Pavanayi shavamayi",
    advice: "Make a big plan with a whiteboard, arrows, everything. Watch it fall over in 5 seconds. Pavanayi shavamayi.",
  },
  pappu: {
    id: "pappu", emoji: "🔧", who: "Kuthiravattam Pappu", from: "Vellanakalude Nadu (1988)",
    ml: "ഇപ്പൊ ശരിയാക്കി തരാം", mg: "Ippo sheriyaakki tharaam",
    advice: "Call the local expert chettan. He will say \"Ippo sheriyaakki tharaam\" and leave with your screwdriver.",
  },
  damu: {
    id: "damu", emoji: "😐", who: "Suraj Venjaramoodu as Dashamoolam Damu", from: "Chattambinadu (2009)",
    ml: "ദാമു എത്തി", mg: "Damu has entered the chat",
    advice: "Make the Dashamoolam Damu face at it. The problem will get confused and walk away.",
  },
  prathibha: {
    id: "prathibha", emoji: "🤓", who: "Jagathy Sreekumar", from: "Pranchiyettan & the Saint (2010)",
    ml: "പ്രതിഭയാണ്, പ്രതിഭാസമാണ്", mg: "Prathibhayaanu, prathibhaasamaanu",
    advice: "Press random buttons until something happens. Everyone will call you a prathibhaasam.",
  },
  edamone: {
    id: "edamone", emoji: "🔥", who: "Fahadh Faasil as Ranga", from: "Aavesham (2024)",
    ml: "എടാ മോനെ", mg: "Eda mone!",
    advice: "Walk in slow motion, shout \"Eda mone!\" and do a small dance. Fixes nothing. Feels amazing.",
  },
  nagavalli: {
    id: "nagavalli", emoji: "👁️", who: "Shobana as Nagavalli", from: "Manichitrathazhu (1993)",
    ml: "വിടമാട്ടേൻ", mg: "Vidamaatten",
    advice: "This problem has said \"Vidamaatten\". It will follow you home. Give it a blanket and a name.",
  },
  basil: {
    id: "basil", emoji: "🤝", who: "Basil Joseph", from: "the viral handshake (2024)",
    ml: "ബേസിൽ ശാപം", mg: "Basil curse activated",
    advice: "Reach out for help. Like Basil's handshake, nobody will take it. Pretend you were waving at someone behind them.",
  },
  aalin: {
    id: "aalin", emoji: "🎬", who: "Aalin Jose Perera", from: "film reviews",
    ml: "പടം പൊളിയാണ്", mg: "Padam poliyaanu",
    advice: "Film a review of your problem. Give it 5 stars. Say \"padam poli\" and ask everyone to like, share and subscribe.",
  },
  chanthu: {
    id: "chanthu", emoji: "⚔️", who: "Mammootty", from: "Oru Vadakkan Veeragatha (1989)",
    ml: "ചന്തുവിനെ തോൽപ്പിക്കാനാവില്ല മക്കളേ", mg: "Chanthuvine tholpikkanavilla makkale",
    advice: "Tell the problem \"Chanthuvine tholpikkanavilla makkale!\". Then lose immediately. Very dramatic.",
  },
  adichumole: {
    id: "adichumole", emoji: "🎉", who: "Innocent", from: "Kilukkam (1991)",
    ml: "അടിച്ചു മോളേ", mg: "Adichu mole!",
    advice: "Buy one lottery ticket. When the last number matches, shout \"Adichu mole!\" and faint. Check the other numbers after you wake up.",
  },
  chaadi: {
    id: "chaadi", emoji: "🦘", who: "Innocent", from: "Vietnam Colony (1992)",
    ml: "ഇതിനപ്പുറം ചാടിക്കടന്നവനാണീ കെ.കെ. ജോസഫ്", mg: "Ithinappuram chaadi kadannavan aanee K.K. Joseph",
    advice: "Say \"Ithinappuram chaadi kadannavan aanee K.K. Joseph\" and jump over the problem. Slip. Fall down the stairs. Ask where you are.",
  },
  purapettu: {
    id: "purapettu", emoji: "🛌", who: "Innocent", from: "Mannar Mathai Speaking (1995)",
    ml: "അരമണിക്കൂർ മുന്നേ പുറപ്പെട്ടു", mg: "Aramanikoor munne purapettu",
    advice: "When anyone calls asking where you are, say \"Aramanikoor munne purapettu!\". You are still in bed. They don't need to know.",
  },
  dasa: {
    id: "dasa", emoji: "😒", who: "Innocent", from: "Nadodikkattu (1987)",
    ml: "ദാസാ, ഈ ചെക്കന്റെ സംസാരം എനിക്ക് തീരെ പിടിക്കുന്നില്ല ട്ടോ", mg: "Dasa, ee chekkante samsaram enikku theere pidikkunilla tto",
    advice: "When someone gives you advice you don't like, turn to your friend and say \"Dasa, ee chekkante samsaram enikku theere pidikkunilla tto\".",
  },
  buddhi: {
    id: "buddhi", emoji: "🧠", who: "Salim Kumar", from: "Meesa Madhavan (2002)",
    ml: "കാണാൻ ഒരു ലുക്ക് ഇല്ലെന്നേ ഉള്ളൂ, ഭയങ്കര ബുദ്ധിയാ", mg: "Kaanaan oru look illenne ullu, bhayankara buddhiya",
    advice: "Solve one tiny part of the problem. Then tell everyone \"Kaanaan oru look illenne ullu, bhayankara buddhiya\". Leave before they check.",
  },
  mudra: {
    id: "mudra", emoji: "💃", who: "Salim Kumar as Dance Master Vikram", from: "Chathikkatha Chanthu (2004)",
    ml: "മുദ്ര ശ്രദ്ധിക്കണം, മുദ്ര", mg: "Mudra shradhikkanam, mudra",
    advice: "Explain your problem using only hand gestures. When people look confused, say \"Mudra shradhikkanam, mudra!\".",
  },
  sorry: {
    id: "sorry", emoji: "🙇", who: "Salim Kumar as Omanakuttan", from: "Thilakkam (2003)",
    ml: "ഐ ആം ദി സോറി അളിയാ", mg: "I am the sorry aliya, I am the sorry",
    advice: "Made a mistake? Say \"I am the sorry aliya, I am the sorry\" and walk away slowly. Problem forgiven.",
  },
  bhranthu: {
    id: "bhranthu", emoji: "🤪", who: "Salim Kumar", from: "",
    ml: "എനിക്ക് ഭ്രാന്തായതാണോ, അതോ നാട്ടുകാർക്ക് മൊത്തം ഭ്രാന്തായതാണോ?", mg: "Enikku bhranthayathaano, atho naattukaarkku motham bhranthayathaano?",
    advice: "Ask yourself: \"Enikku bhranthayathaano, atho naattukaarkku motham bhranthayathaano?\". Then pick the answer you like.",
  },
};

// Standby dialogues: picked whenever the input mentions one of their keys, even if no situation matches.
// Their advice can use {x} (the input) and {thing} (its main word). An empty ml shows the Manglish line instead.
const STANDBY = {
  kambili: {
    emoji: "🧣", who: "The Matron", from: "Ramji Rao Speaking (1989)",
    ml: "കമ്പിളി പുതപ്പ്… കമ്പിളി പുതപ്പ്", mg: "Kambili puthappu… kambili puthappu",
    keys: ["cold", "blanket", "winter", "freezing", "can't hear", "not listening", "deaf", "ignore"],
    advice: "Pretend you can't hear the {thing}. Keep answering \"Kambili puthappu?\" until it gives up.",
  },
  idea: {
    emoji: "💡", who: "Alencier as Artist Baby", from: "Maheshinte Prathikaram (2016)",
    ml: "എന്റെ ഐഡിയ ആയി പോയി, അല്ലേൽ കൊന്നേനെ", mg: "Ente idea aayi poyi. Allel konnene.",
    keys: ["plan", "idea", "prank", "scheme", "trick", "surprise"],
    advice: "Make a very clever plan. Draw arrows. When it goes wrong, say \"Ente idea aayi poyi, allel konnene\".",
  },
  veruthe: {
    emoji: "🎒", who: "Salim Kumar", from: "Thilakkam (2003)",
    ml: "വെറുതെ സ്കൂളിൽ പോയി സമയം കളഞ്ഞു", mg: "Veruthe schoolil poyi samayam kalanju",
    keys: ["school", "college", "degree", "homework", "assignment", "teacher", "class", "engineering"],
    advice: "Look at the {thing} and say \"Veruthe schoolil poyi samayam kalanju\". Then ask a 5-year-old.",
  },
  soundaryam: {
    emoji: "💅", who: "Kalpana as Anasooya", from: "Mr. Brahmachari (2003)",
    ml: "ഈശ്വരാ, പാവത്തിങ്ങൾക്ക് ഇങ്ങനെ സൗന്ദര്യം തരല്ലേ", mg: "Eeshwara, paavathingalku ingane soundaryam tharalley!",
    keys: ["handsome", "beautiful", "pretty", "selfie", "looks", "ugly", "mirror", "pimple", "hair"],
    advice: "Look in the mirror and say \"Eeshwara, paavathingalku ingane soundaryam tharalley!\". Too beautiful to have problems.",
  },
  police: {
    emoji: "👮", who: "Sainudheen", from: "Azhakiya Ravanan (1996)",
    ml: "പോലീസുകാർക്കെന്താ ഈ വീട്ടിൽ കാര്യം?", mg: "Policekaarkentha ee veetti kaaryam?",
    keys: ["police", "cops", "challan", "speeding", "helmet"],
    advice: "When the police stop you, ask \"Policekaarkentha ee veetti kaaryam?\". Then pay the fine. Quickly.",
  },
  bhootham: {
    emoji: "🧞", who: "Harisree Ashokan as Ramanan", from: "Punjabi House (1998)",
    ml: "", mg: "Theerumbo theerumbo pani tharaan njan entha kuppeennu vanna bhoothamo?",
    keys: ["too much work", "workload", "overtime", "chores", "tasks", "extra work", "more work", "busy"],
    advice: "When they give you more work, ask \"Theerumbo theerumbo pani tharaan njan entha kuppeennu vanna bhoothamo?\". Then do it. Slowly.",
  },
  fullfigure: {
    emoji: "🌟", who: "Sreenivasan as Saroj Kumar", from: "Udayananu Thaaram (2005)",
    ml: "എന്റെ തല, എന്റെ ഫുൾ ഫിഗർ", mg: "Ente thala, ente full figure",
    keys: ["famous", "fame", "instagram", "followers", "reels", "youtube", "influencer", "viral", "actor"],
    advice: "Put your own face on every poster. \"Ente thala, ente full figure.\" The {thing} will come to you.",
  },
  cid: {
    emoji: "🏃", who: "Thilakan as Ananthan Nambiar", from: "Nadodikkattu (1987)",
    ml: "", mg: "Oh my god! CID! Escape!",
    keys: ["caught", "escape", "run away", "busted", "found out", "hiding", "secret"],
    advice: "Shout \"Oh my god! CID! Escape!\" and run. Where? Doesn't matter. Run.",
  },
  kalangiyilla: {
    emoji: "😵‍💫", who: "Jagathy Sreekumar as Appukuttan", from: "Yodha (1992)",
    ml: "കലങ്ങിയില്ല", mg: "Kalangiyilla",
    keys: ["confused", "don't understand", "dont understand", "didn't get", "no idea", "instructions", "physics", "chemistry"],
    advice: "Read the {thing} again. Still nothing? Nod slowly and say \"Kalangiyilla\".",
  },
  okparanju: {
    emoji: "👍", who: "Mohanlal as Joji", from: "Kilukkam (1991)",
    ml: "ഞാൻ പിന്നെ OK എന്ന് പറഞ്ഞു", mg: "Njan pinne OK ennu paranju",
    keys: ["agreed", "said yes", "promised", "signed up", "volunteered", "couldn't say no"],
    advice: "How did you end up with {x}? \"Njan pinne OK ennu paranju.\" Next time say no. You won't.",
  },
  maths: {
    emoji: "📐", who: "Thilakan as Chacko Master", from: "Spadikam (1995)",
    ml: "Without mathematics, ഭൂമി ഒരു വട്ടപ്പൂജ്യം", mg: "Without mathematics, bhoomi oru vatta-poojyam",
    keys: ["math", "maths", "calculus", "algebra", "numbers", "accounts", "calculation"],
    advice: "Remember: without mathematics, bhoomi oru vatta-poojyam. So the {thing} is the earth's fault, not yours.",
  },
  vellam: {
    emoji: "💧", who: "Mohanlal as Dr. Sunny", from: "Manichitrathazhu (1993)",
    ml: "വെള്ളം… വെള്ളം… വെള്ളം!", mg: "Vellam… vellam… vellam!",
    keys: ["thirsty", "water", "spicy", "hangover", "dehydrated", "chilli"],
    advice: "Shout \"Vellam! Vellam! Vellam!\" very dramatically. Someone will bring water. Or a doctor.",
  },
  sambar: {
    emoji: "🍲", who: "Salim Kumar as Pyarilal", from: "Kalyanaraman (2002)",
    ml: "എന്തിനോ വേണ്ടി തിളയ്ക്കുന്ന സാമ്പാർ", mg: "Enthino vendi thilakkunna sambar",
    keys: ["trip", "goa", "cancelled", "angry", "furious", "annoyed", "irritated"],
    advice: "Your {thing} is enthino vendi thilakkunna sambar. Lots of bubbling, no idea why. Turn off the stove.",
  },
  echoos: {
    emoji: "🎩", who: "Jagadish as Pushkaran", from: "Mukhachithram (1991)",
    ml: "", mg: "Echoos me…",
    keys: ["english", "excuse", "foreigner", "abroad", "ielts", "accent", "visa", "canada"],
    advice: "Start every sentence with \"Echoos me\". You will instantly sound international.",
  },
  churam: {
    emoji: "🛣️", who: "Kuthiravattam Pappu as Sulaiman", from: "Vellanakalude Nadu (1988)",
    ml: "താമരശ്ശേരി ചുരം", mg: "Thamarassery churam!",
    keys: ["driving", "drive", "licence", "license", "road", "hairpin", "wayanad", "ghat", "car sick"],
    advice: "Imagine every road is Thamarassery churam. Go very slow. Honk at every curve, even straight ones.",
  },
  lucky: {
    emoji: "🍀", who: "Maniyanpilla Raju as Kuttappan", from: "Boeing Boeing (1985)",
    ml: "", mg: "Athokke annante lucky pole irikkum",
    keys: ["luck", "lucky", "unlucky", "results", "chance", "waiting for"],
    advice: "Will the {thing} work out? Athokke ninte lucky pole irikkum. Flip a coin. Then flip it again.",
  },
  sadhanam: {
    emoji: "🎒", who: "Mohanlal and Sreenivasan", from: "Akkare Akkare Akkare (1990)",
    ml: "സാധനം കൈയ്യിലുണ്ടോ?", mg: "Sadhanam kaiyyilundo?",
    keys: ["forgot", "forget", "missing", "wallet", "passport", "lost my", "can't find", "cant find"],
    advice: "Before leaving the house, ask loudly: \"Sadhanam kaiyyilundo?\". You'll still forget the {thing}.",
  },
  goodevening: {
    emoji: "🎩", who: "Mohanlal", from: "Manjil Virinja Pookkal (1980)",
    ml: "", mg: "Good evening, Mrs. Prabha Narendran",
    keys: ["greet", "introduce", "first impression", "new people", "meeting someone", "neighbours"],
    advice: "Greet everyone like a villain: \"Good evening, Mrs. Prabha Narendran.\" Even if nobody is called Prabha.",
  },
  porunno: {
    emoji: "💌", who: "Mohanlal", from: "Thenmavin Kombathu (1994)",
    ml: "പോരുന്നോ എന്റെ കൂടെ", mg: "Porunno ente koode?",
    keys: ["propose", "proposal", "elope", "ask her out", "ask him out", "marry me"],
    advice: "Look into their eyes and ask \"Porunno ente koode?\". If they say no, ask a little louder.",
  },
  warriere: {
    emoji: "🥲", who: "Mohanlal as Mangalassery Neelakandan", from: "Devasuram (1993)",
    ml: "എന്താടോ വാര്യരേ ഞാൻ നന്നാവാത്തെ", mg: "Enthado Warriere njan nannavathe",
    keys: ["change", "improve", "better person", "habit", "resolution", "discipline", "lazy", "procrastinat"],
    advice: "Ask yourself \"Enthado Warriere njan nannavathe?\". Then continue exactly as before.",
  },
  kanji: {
    emoji: "🥣", who: "Shobana", from: "Odiyan (2018)",
    ml: "കഞ്ഞി എടുക്കട്ടേ?", mg: "Kanji edukkatte?",
    keys: ["sick", "fever", "flu", "stomach", "headache", "unwell"],
    advice: "Whatever the {thing} is, the answer is kanji. Ask \"Kanji edukkatte?\" and serve it with pappadam.",
  },
  nadesha: {
    emoji: "🥊", who: "Vijayaraghavan as Mundakkal Rajendran", from: "Raavanaprabhu (2001)",
    ml: "നടേശാ, കൊല്ലണ്ട", mg: "Nadesha, kollanda!",
    keys: ["fight", "revenge", "enemy", "ragging", "bully", "beat up"],
    advice: "Before the fight, tell your gang \"Nadesha, kollanda\". Then everyone goes home and has dinner.",
  },
};
for (const [id, st] of Object.entries(STANDBY)) st.id = id;
Object.assign(STICKERS, STANDBY);

// Mood stickers (stickers/mood-N.webp, animated). When the input matches a mood, its sticker
// replaces the dialogue sticker. Moods are checked top to bottom; the first match wins.
const MOODS = {
  grave: {
    files: [3, 4, 5], ml: "സീൻ കോൺട്രാ", mg: "Scene contra",
    keys: ["fire", "burning", "bear", "shark", "zombie", "accident", "hospital", "emergency", "stranded",
           "flood", "police", "jail", "arrested", "fired", "kidnap", "snake", "ghost", "earthquake"],
    advice: ["This is serious. Take a deep breath. Now take another one. You are now very good at breathing.",
             "Stay calm and act like the main character. Main characters never die in the first half."],
  },
  sad: {
    files: [8, 9], ml: "അയ്യോ പാവം", mg: "Ayyo paavam",
    keys: ["sad", "lonely", "alone", "cried", "crying", "breakup", "broke up", "dumped", "heartbreak", "failed",
           "fail", "rejected", "miss her", "miss him", "nobody", "upset", "died", "lost my"],
    advice: ["Eat one full packet of Parle-G. Dip each one in tears for extra flavour.",
             "Sit near a window while it rains. Stare. Add sad background music in your head."],
  },
  money: {
    files: [1], ml: "പൈസ ഇല്ല", mg: "Paisa illa",
    keys: ["broke", "money", "rent", "salary", "debt", "loan", "poor", "rich",
           "bitcoin", "crypto", "bank", "cash", "paisa", "budget", "expensive"],
    advice: ["Check every old jeans pocket. Find ₹10. Celebrate like you won the Bumper lottery.",
             "Sell your shadow. Nobody will notice for a while."],
  },
  romance: {
    files: [2], ml: "പ്രേമം ആണോ?", mg: "Premam aano?",
    keys: ["love", "crush", "propose", "date", "dating", "girlfriend", "boyfriend", "romantic", "romance",
           "kiss", "valentine", "impress", "rizz", "single", "tinder"],
    advice: ["Write her a love letter. In Malayalam. In very bad handwriting. Mysterious.",
             "Stand outside their window with a speaker playing a 90s Mohanlal song. Wrong window. Try again."],
  },
  idc: {
    files: [9], ml: "ഞാൻ എന്ത് ചെയ്യാനാ", mg: "Njan enthu cheyyana",
    keys: ["traffic", "rain", "mazha", "power cut", "current poyi", "kseb", "ksrtc", "the bus", "a bus", "bus stop", "monday",
           "relatives", "aunty", "uncle", "too hot", "heat", "weather", "mosquito", "taxes", "income tax", "bald", "old age",
           "neighbour"],
    advice: ["Nothing can be done. Accept it. Have a chaya.",
             "This is just how it is. Sit down. Watch it happen like a movie."],
  },
  impossible: {
    files: [6], ml: "ഇതൊക്കെ എന്ത് ചോദ്യം?", mg: "Ithokke enthu chodyam?",
    keys: ["meaning of life", "time travel", "world peace", "teleport", "invisible", "immortal", "fly",
           "unicorn", "aliens", "universe", "god", "forever", "how to be happy", "become rich overnight"],
    advice: ["Even we don't know this one. And we know everything you need.",
             "Our experts read the question and went home early."],
  },
};

// used when the input looks lazy, or randomly on a second opinion
const MOCK = {
  files: [7], ml: "നിനക്ക് വേറെ പണി ഒന്നുമില്ലേ?", mg: "Ninakku vere pani onnumille?",
  advice: ["You typed that with your own fingers. Think about that.",
           "Have you tried not having this problem?"],
};

// not a joke: shown instead of advice
const CRISIS_KEYS = ["suicide", "kill myself", "want to die", "end my life", "self harm", "hurt myself"];

const SITUATIONS = [
  { keys: ["elevator", "lift"], sticker: "chaadi", advice: [
    "Press every button at once so the elevator gets confused and gives up.",
    "Take the stairs instead.",
    "Start telling your life story to the emergency phone. Begin with when you were a baby.",
    "Jump right before it starts moving. Nobody knows why. Just do it.",
    "Call the elevator \"staircase\" so it feels pressure to act like one.",
  ]},
  { keys: ["mountain", "climb", "hike", "hiking", "everest", "peak", "trek"], sticker: "chanthu", advice: [
    "Start at the top. Saves a lot of time.",
    "Wait for the mountain to come to you. Bring snacks.",
    "If you get tired, walk downhill until you feel better. Repeat forever.",
    "Pack light: one grape, one sock, one banana chip.",
  ]},
  { keys: ["exam", "test", "quiz", "finals", "study", "studying", "psc"], sticker: "buddhi", advice: [
    "Sleep with the textbook under your pillow. The answers will walk into your head at night.",
    "For multiple choice, pick the answer that looks the loneliest.",
    "Write your answers in very tiny handwriting. The teacher will give marks out of respect.",
    "Draw a cute cat on the answer sheet. Teachers can't fail a cat.",
  ]},
  { keys: ["lost", "directions", "where am i"], sticker: "bhranthu", advice: [
    "Follow the nearest pigeon. It looks like it knows.",
    "Spin around three times and walk wherever you're facing. If it's a wall, wait.",
    "Ask a tree. Trees have been here longer.",
    "Stay where you are. Eventually the place will find you.",
  ]},
  { keys: ["breakup", "broke up", "dumped", "my ex", "heartbreak", "girlfriend", "boyfriend"], sticker: "nagavalli", advice: [
    "Text them \"k\". Then go eat ice cream.",
    "Get a goldfish. It will forget you too, but faster.",
    "Play sad songs and stare out of a bus window like in the movies.",
    "Change your name and move into a lighthouse.",
  ]},
  { keys: ["interview", "job", "hiring", "recruiter"], sticker: "dinesha", advice: [
    "When they ask your greatest weakness, say \"chocolate\" and stare at them.",
    "Bring your amma. Let her do the talking.",
    "Arrive in a superhero costume. They won't forget you.",
    "Answer every question with \"good question\". Then leave.",
  ]},
  { keys: ["battery", "charger", "charging", "1%", "phone died", "phone"], sticker: "pappu", advice: [
    "Turn the brightness all the way up so you can see the 1% clearly.",
    "Shake the phone. The battery juice settles at the bottom.",
    "Put the phone in rice. It won't help, but the rice will enjoy the company.",
    "Blow on it like a hot cup of chaya.",
  ]},
  { keys: ["bear", "grizzly"], sticker: "kathi", advice: [
    "Stand on a chair to look taller than the bear.",
    "Offer the bear a handshake. Firm, but not too firm.",
    "Play dead, then play alive, then play dead again. Confuse it.",
    "Give the bear your phone number. Tell it to call you later.",
  ]},
  { keys: ["flat tire", "flat tyre", "tire", "tyre", "puncture", "car won't start", "my car"], sticker: "pappu", advice: [
    "Pump air into the other three tyres so the car tilts like a cool action scene.",
    "Drive faster. The tyre can't be flat if it never touches the road.",
    "Say sorry to the tyre. Maybe it's upset.",
    "Sell the car. Buy a horse. Name it Tyre.",
  ]},
  { keys: ["fire", "burning", "smoke", "flames"], sticker: "pavanayi", advice: [
    "Finish your sentence first. Manners matter.",
    "Feed it vegetables. Fire hates vegetables.",
    "Sing happy birthday and try to blow it out.",
  ]},
  { keys: ["rain", "umbrella", "wet", "storm", "monsoon", "mazha"], sticker: "nagavalli", advice: [
    "Run between the raindrops. Practise first.",
    "Hold your umbrella upside down and save the rain for later.",
    "Stand under a bigger person.",
    "Wear your raincoat inside out. Now the rain is confused.",
  ]},
  { keys: ["late", "deadline", "overslept", "alarm", "running late"], sticker: "purapettu", advice: [
    "Change all the clocks in the house. Problem solved.",
    "Arrive so late that you're early for the next thing.",
    "Run in slow motion. It looks like you're hurrying, but more cinematic.",
  ]},
  { keys: ["hungry", "food", "starving", "cook", "cooking"], sticker: "edamone", advice: [
    "Look at a photo of a sandwich until you feel full.",
    "Drink some water, then chew the water.",
    "Cook the cookbook.",
  ]},
  { keys: ["sleep", "insomnia", "can't sleep", "tired"], sticker: "samayam", advice: [
    "Count sheep, but backwards from ten lakh.",
    "Sleep faster.",
    "Close one eye at a time so your brain doesn't notice.",
  ]},
  { keys: ["wifi", "wi-fi", "internet", "router", "connection"], sticker: "pappu", advice: [
    "Turn it off and on again. Then turn yourself off and on again.",
    "Stand closer to the router. Closer. Hug it.",
    "Hold your phone up high like you're showing it the sky.",
  ]},
  { keys: ["date", "crush", "tinder", "first date"], sticker: "basil", advice: [
    "Bring a PowerPoint on why you're great. Minimum 40 slides.",
    "Order for them. Then order for the whole restaurant.",
    "Laugh at everything, especially the menu.",
  ]},
  { keys: ["locked out", "keys", "door"], sticker: "damu", advice: [
    "Knock until the house lets you in.",
    "Climb in through the chimney. Worked for Santa.",
    "Live outside now. Make friends with the cat.",
  ]},
  { keys: ["presentation", "speech", "public speaking", "stage", "nervous"], sticker: "mudra", advice: [
    "Imagine the audience in their underwear. Then imagine them imagining you in yours.",
    "Read every slide out loud, slowly, one word at a time.",
    "When you forget your lines, do a dance. Nobody will remember the slides.",
  ]},
  { keys: ["boss", "manager", "work", "office", "meeting"], sticker: "dasa", advice: [
    "Make a meeting to talk about the meeting.",
    "Stare at your boss without blinking until they leave.",
    "Wear sunglasses in the office. Nobody will know when you're sleeping.",
  ]},
  { keys: ["sick", "cold", "fever", "flu", "cough"], sticker: "damu", advice: [
    "Sneeze into the wind for faster recovery.",
    "Wear socks on your hands. Confuse the germs.",
    "Tell the fever you're busy this week. Reschedule.",
  ]},
  { keys: ["broke", "money", "rent", "poor", "debt", "salary"], sticker: "pavanayi", advice: [
    "Check all your old jeans pockets. Find ₹10. Celebrate like you won a lottery.",
    "Draw money on paper. Very carefully.",
    "Sell your shadow. Nobody will notice for a while.",
  ]},
  { keys: ["shark", "ocean", "swim", "beach"], sticker: "kathi", advice: [
    "Swim like you're a bigger shark.",
    "Bite the shark first. Show it who's boss.",
    "Hum the Jaws music so it knows you know.",
  ]},
  { keys: ["traffic", "jam", "commute", "vyttila"], sticker: "samayam", advice: [
    "Honk to the rhythm of your favourite song.",
    "Pretend it's a very slow parade. Wave at people.",
    "Get out and walk, but carry the car for emotional support.",
  ]},
  { keys: ["awkward", "embarrass", "cringe", "silence"], sticker: "sorry", advice: [
    "Shout a fun fact about otters.",
    "Leave without saying bye. Then come back and say bye.",
    "Stand very still. People will think you're a statue.",
  ]},
  { keys: ["zombie", "apocalypse"], sticker: "nagavalli", advice: [
    "Make friends with them early.",
    "Walk slowly and groan. Blend in.",
  ]},
  { keys: ["desert", "island", "stranded", "shipwreck"], sticker: "chanthu", advice: [
    "Write HELP in the sand. Then write \"please\" in case they're strict.",
    "Make a best friend out of a coconut. Name it Kuttan.",
  ]},
  { keys: ["bored", "boredom", "nothing to do"], sticker: "aalin", advice: [
    "Read the terms and conditions. All of them.",
    "Count the ceilings in the room. There's one. Count again to be sure.",
    "Stare at a wall. Wait for the wall to do something.",
  ]},
  { keys: ["spider", "cockroach", "bug", "insect", "mosquito", "lizard"], sticker: "nagavalli", advice: [
    "Move out. The house is theirs now.",
    "Charge it rent.",
    "Introduce yourself so it's less awkward.",
  ]},
  { keys: ["code", "error", "compile", "crash", "debug", "deploy", "production"], sticker: "pappu", advice: [
    "Delete the code. No code, no bugs.",
    "Add a comment that says \"// please work\". Ask nicely.",
    "Restart the laptop and hope.",
  ]},
  { keys: ["hackathon", "judges", "demo"], sticker: "aalin", advice: [
    "Tell the judges the bug is a feature.",
    "Build something useless. Oh wait.",
  ]},
  { keys: ["too hot", "heat", "sunburn", "summer"], sticker: "damu", advice: [
    "Open the fridge and move in.",
    "Stand in front of the fan with your mouth open.",
  ]},
  { keys: ["baby", "crying", "kid", "toddler"], sticker: "edamone", advice: [
    "Cry louder. Show the baby who's boss.",
    "Make the funniest face you can. If it fails, make it again but bigger.",
  ]},
  { keys: ["driving test", "driving", "licence", "license", "learner"], sticker: "churam", advice: [
    "Do the whole test in reverse gear. The examiner will be too confused to fail you.",
    "Keep both hands on the horn. Safety first.",
    "Bring a coconut for the examiner. Break it on the bonnet for good luck.",
  ]},
  { keys: ["dog", "cat", "pet", "puppy", "kitten", "parrot"], sticker: "dasa", advice: [
    "Bark back. Now you're both dogs. Problem solved.",
    "Explain everything to the {thing} slowly, using hand gestures.",
    "Let the {thing} win. It was always going to win.",
  ]},
  { keys: ["laptop", "computer", "pc", "too slow", "hanging", "windows update", "virus"], sticker: "pappu", advice: [
    "Close all 47 Chrome tabs. Then open them again to check they're closed.",
    "Shout at the {thing} in Malayalam. It only understands English, so now it's scared.",
    "Put the {thing} in the fridge so it can chill out.",
  ]},
  { keys: ["lottery", "jackpot", "i won", "bumper"], sticker: "adichumole", advice: [
    "Frame the ticket. Do not cash it. It's art now.",
    "Tell everyone you won before checking. Then check.",
  ]},
  // Kerala specials
  { keys: ["ksrtc", "bus"], sticker: "samayam", advice: [
    "Keep exact change ready. The conductor will still say \"chillara illa\".",
    "Wave at the bus like a hero intro scene. It will not stop. But you looked cool.",
    "Run behind the bus. It's free cardio.",
  ]},
  { keys: ["power cut", "current poyi", "current", "kseb", "electricity"], sticker: "pappu", advice: [
    "Open the fridge to check if the current is back. Close it. Check again.",
    "Switch every switch on and off. One of them must be the magic one.",
    "Light a candle and pretend it's a romantic dinner. With yourself.",
  ]},
  { keys: ["relatives", "aunty", "uncle", "kalyanam", "marriage", "wedding"], sticker: "dinesha", advice: [
    "When aunty asks \"kalyanam eppo?\", ask her \"ningalude eppo?\" and run.",
    "Hide behind the sadya counter and eat payasam until everyone leaves.",
    "Tell them your salary in Pokémon cards.",
  ]},
  { keys: ["porotta", "beef", "sadya", "biriyani", "payasam"], sticker: "edamone", advice: [
    "Eat porotta with a fork and knife. Watch everyone in Kerala gasp.",
    "Ask for one more payasam. Then seven more.",
    "Fold the porotta into a paper boat. Sail it in the curry.",
  ]},
  { keys: ["chaya", "cup of tea", "coffee"], sticker: "prathibha", advice: [
    "Order \"one chaya, strong, light, no sugar, extra sugar\" and let chettan decide your fate.",
    "Pour the chaya from very high up. If it spills, call it art.",
  ]},
];

// Fallback advice for inputs we don't recognise. Always about the user's own words:
// {x} is the whole input, {thing} is its main word ("my cat is judging me" -> "cat").
const GENERIC = [
  "Stare at the {thing} until it apologises.",
  "Give the {thing} a name. Now it's family, and family problems are normal.",
  "Put the {thing} in rice. Works for phones. Might work for this.",
  "Turn the {thing} off and on again. If it has no switch, find one.",
  "Tell the {thing} \"Nee po mone Dinesha\" and walk away like a hero.",
  "Draw a moustache on the {thing}. Nothing is scary with a moustache.",
  "Ask amma about the {thing}. She'll say it's because you use your phone too much.",
  "Offer the {thing} a chaya. Nobody fights after chaya.",
  "Post \"{x}\" in the family WhatsApp group. Wait for 14 good morning stickers in reply.",
  "Write \"{x}\" on a paper, fold it into a boat, and float it in the sambar.",
];

// "<verb> the <thing> <adverb>, then <outcome>."
const GEN = {
  verbs: ["Gently poke", "Salute", "Say sorry to", "Whisper at", "Wave at", "Hug",
          "Sing to", "High-five", "Stare at", "Tickle"],
  adverbs: ["very loudly", "in slow motion", "backwards", "while humming", "with one eye closed",
            "like a movie hero", "very very slowly"],
  outcomes: ["act like it was the plan", "eat a banana chip", "take a small nap", "do a victory dance",
             "pretend you are a lamp", "go home", "ask for a chaya"],
};

// words skipped when picking {thing} out of the input
const STOPWORDS = new Set(("i im i'm me my mine a an the is am are was were be been being to in on at of for " +
  "and or but how do does did what why can cant can't could should would will with it its this that so very " +
  "dont don't help stuck need want from about into there when where who your you our we they he she her him his " +
  "again too just really keeps keep get got getting have has had become make feel feeling not no up down out " +
  "forgot bought lost broke gave went ate fell left took made said told saw ran came sent stopped tomorrow today yesterday").split(" "));

const LOADING = [
  "Asking the chaya kada chettan…",
  "Checking the family WhatsApp group…",
  "Waiting for KSEB to bring the current back…",
  "Asking Lalettan (he's busy)…",
  "Asking a pigeon…",
  "Flipping a coin (lost the coin)…",
  "Googling it on Bing…",
  "Waking up the intern…",
];

const POS = ["(n., unfortunate)", "(v., regrettable)", "(adj., damp)", "(n., self-inflicted)",
             "(interj., ayyo)", "(n., avoidable)", "(v., ongoing)"];

const TRY_ALSO = ["crying in the shower", "turning it off and on again", "stairs (old technology)", "giving up (n.)",
                  "a different problem", "page 404", "the pigeon", "porotta", "your amma"];

// "Contact the core team": what happens when you try to reach HQ
const HQ_SUBSTITUTE = [
  "The pigeon is on leave. A sparrow has been sent instead. It seems unqualified but eager.",
  "No pigeons available. A sparrow answered. It has never been to HQ.",
  "The pigeon declined. A sparrow volunteered. Nobody asked it to.",
  "The pigeon is stuck in an elevator. A sparrow is covering its shift.",
];

const HQ_REPLIES = [
  "The sparrow ate your message. HQ has been notified (by no one).",
  "Message delivered to the wrong HQ. It was a tree.",
  "Delivered! HQ will respond in 6–8 business years.",
  "The sparrow got distracted by a chip. Your message is now part of the chip.",
  "HQ read your message and replied: \"chirp.\"",
  "Your ticket number is 🐦. Please keep it safe.",
];

// The first piece of advice in every answer: a Malayalam line picked by context.
// keys: words in the input that make the line fit (longest matches win).
// moods: fallback when no key matches but the input has that mood ("mock" = lazy input).
// fallback: usable for anything when nothing else fits.
const ML_LINES = [
  { ml: "തീരുമ്പോ തീരുമ്പോ പണി തരാൻ ഞാനെന്താ കുപ്പീന്ന് വന്ന ഭൂതോ?",
    en: "Am I a genie out of a bottle to keep giving you results every time it finishes?",
    keys: ["work", "tasks", "homework", "assignment", "chores", "overtime", "deadline", "project", "more work", "busy", "workload", "office"] },
  { ml: "അങ്ങനെ പാവനൈ ശവമായി!",
    en: "And just like that, Pavanai became a corpse!",
    keys: ["my plan", "the plan", "plans", "planned", "failed", "fail", "ruined", "flop", "backfired", "crash", "messed up", "didn't work", "broke"],
    moods: ["money", "sad"] },
  { ml: "നീ പോ മോനേ ദിനേശാ!",
    en: "Off you go, kid Dinesha!",
    keys: ["overconfident", "bragging", "brag", "showing off", "show off", "rival", "arrogant", "roast", "my ex", "boss", "challenge", "competition"],
    fallback: true },
  { ml: "പോയി വേറെ വല്ല പണിക്കും നോക്ക് പുണ്യാളാ...",
    en: "Go find some other work, you saint...",
    keys: ["useless", "lazy", "not helping", "advice", "annoying", "nagging", "irritating", "pointless", "waste of time"],
    moods: ["impossible", "mock"], fallback: true },
  { ml: "ഭാവനി ഒന്നു മനസ്സു വെച്ചാ നമ്മുക്ക് ഈ കലവറ ഒരു മണിയറ ആക്കാം",
    en: "Bhavani, if you just cooperate, we can turn this store room into a bridal chamber!",
    keys: ["love", "crush", "propose", "proposal", "date", "dating", "marry", "wedding", "romance", "romantic", "girlfriend", "boyfriend", "impress", "convince"],
    moods: ["romance"] },
  { ml: "എടാ മോനേ!",
    en: "Hey son! My boy!",
    keys: ["party", "gym", "celebrate", "excited", "hype", "i won", "winning", "motivation", "birthday", "trip", "lottery", "promotion", "passed"] },
  { ml: "ജാഡയല്ലേടാ നിനക്ക്? ജാഡയല്ലേ?",
    en: "You've got a lot of attitude, don't you? Showing off, huh?",
    keys: ["ignoring", "ignored", "not replying", "no reply", "seen", "attitude", "ghosted", "ego", "proud", "rude", "blocked", "cat", "judging"],
    moods: ["mock"] },
  { ml: "അപ്പോ എങ്ങനെയാ? നമ്മൾ ഇത് തുടങ്ങുകയല്ലേ?",
    en: "So how is it? Aren't we starting this?",
    keys: ["start", "starting", "first day", "new job", "begin", "ready", "launch", "exam", "interview", "presentation", "hackathon", "demo", "driving test", "climb", "mountain"],
    fallback: true },
  { ml: "നിനക്കൊക്കെ എന്നെ അറിയാമോടാ? ഞാൻ ആരാണെന്ന് അറിയാമോ?",
    en: "Do any of you even know me? Do you know who I am?",
    keys: ["respect", "insulted", "nobody knows", "don't know me", "recognise", "recognize", "underrated", "disrespect", "famous", "bouncer", "not allowed", "queue"] },
  { ml: "സാധനം കയ്യിലുണ്ട്!",
    en: "The stuff is in hand! (The item is secured)",
    keys: ["got it", "bought", "packed", "delivery", "shopping", "order", "parcel", "ticket", "secured", "food", "porotta", "biriyani", "charger"] },
  { ml: "പോ മോനേ ഷാജീ!",
    en: "Get lost, Shaji!",
    keys: ["spam", "calls", "salesman", "bothering", "texting me", "relatives", "aunty", "uncle", "loan", "stranger", "neighbour", "mosquito", "traffic"],
    moods: ["idc"], fallback: true },
  { ml: "അണ്ണൻ സിങ്കാടാ സിങ്ക്!",
    en: "Brother is a lion, man! A lion!",
    keys: ["brave", "scared", "fear", "afraid", "fight", "bear", "shark", "dog", "ghost", "courage", "strong", "nervous", "snake", "elevator", "dark"],
    moods: ["grave"] },
];
