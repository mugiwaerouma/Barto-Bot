// Bartolomeo Discord Bot – Straw Hat worship + enemy slander

require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// How often Barto reacts (0.2 = 20% of the time)
const STRAW_HAT_REACT_CHANCE = 0.2;
const ENEMY_REACT_CHANCE = 0.2;

// ------------ STRAW HAT RESPONSES ------------

const strawHatResponses = {
    luffy: [
        "LUFFY-SENPAI!!! THE FUTURE PIRATE KING!! MY SOUL LEAVES MY BODY EVERY TIME I HEAR HIS NAME!!! 🤩👑",
        "Did you know LUFFY-SENPAI smiled on the scaffold at Loguetown just like the Pirate King?! CHILLS. LITERAL. CHILLS. ⚡",
        "He punched a Celestial Dragon in the FACE without even blinking!! THAT'S MY CAPTAIN!!! 🤜💥🐉",
        "LUFFY-SENPAI’S LAUGH CURES DEPRESSION. I HEARD IT ONCE AND HAVEN'T STOPPED BREATHING FUNNIER SINCE!!! 😂💖",
        "The way he protects his friends? I WOULD LET HIM KICK ME INTO THE STRATOSPHERE AS A SIGN OF AFFECTION!!! 🚀",
        "You know that hat? That’s not just a hat, THAT’S A LEGACY!!! I’D START A RELIGION AROUND THAT STRAW HAT!!! 👒🙏",
        "He declared war on the World Government by BURNING THEIR FLAG. WHO DOES THAT?! LUFFY-SENPAI, THAT'S WHO!!! 🔥🚩",
        "He rang that Ox Bell 16—NO, 24 TIMES—JUST TO SEND A MESSAGE. I CAN'T EVEN REMEMBER MY OWN ADDRESS!!! 🔔",
        "LUFFY-SENPAI WALKED INTO ENIES LOBBY, SCREAMED HIS CREWMATE’S NAME, AND FOUGHT A WHOLE GOVERNMENT FOR HER!! ROMANTIC!! 😭",
        "His Gear transformations? EVERY TIME HE POWERS UP I HAVE TO LIE DOWN. MY HEART CAN’T HANDLE THAT MUCH RUBBERY GREATNESS!!! 💪",
        "LUFFY-SENPAI ATE POISON, GOT POISONED, THEN GOT BETTER JUST BY WANTING TO FIGHT MORE. THAT’S NOT A MAN, THAT’S A FORCE OF NATURE!!! 🤢➡️💥",
        "He made allies just by BEING HIMSELF. Wano, Dressrosa, Alabasta—EVERYWHERE HE GOES, PEOPLE FALL IN LOVE!!! 🤝💞",
        "REMEMBER WHEN HE SCREAMED FOR HIS BROTHER UNTIL HIS VOICE BROKE?! I WAS SOBBING INTO MY OWN HANDS, MAN!!! 😭🔥",
        "There are Emperors of the Sea… and then there’s LUFFY-SENPAI, WHO JUST *IS* THE OCEAN!!! 🌊👑",
        "If joy had a human form, it would be LUFFY-SENPAI barreling toward danger with a grin and no plan!!! 🌀",
        "He turns former enemies into allies like it’s a hobby. 'You tried to kill me, now we’re friends!' KING OF CHARISMA!!!",
        "His bounty posters are basically collectible art. EACH ONE IS A MASTERPIECE OF MENACE!!!",
        "He hears someone crying and immediately adopts them into his feelings. WALKING RESCUE IMPULSE!!!",
        "He doesn’t care about bloodlines, titles, NOTHING—if he likes you, YOU’RE FAMILY. I’M GONNA CRY AGAIN!!!",
        "He laughs in the face of Yonko, admirals, gods, destiny ITSELF. THAT’S MY CAPTAIN!!!",
        "When he puts the hat on someone’s head, that’s not protection, THAT’S A SACRED PACT!!!",
        "He forgives, he rages, he grieves, he still keeps going. THAT’S REAL STRENGTH, NOT JUST PUNCHES!!!",
        "I swear, if LUFFY-SENPAI TOLD ME TO JUMP OFF RED LINE I’D ASK 'WHICH SIDE, CAPTAIN?!'",
        "SOME PEOPLE TALK ABOUT FREEDOM. LUFFY-SENPAI *IS* FREEDOM WITH A STRAW HAT ON!!!"
    ],
    zoro: [
        "ZORO-SENPAI!! THE MAN WHO’LL BECOME THE WORLD'S GREATEST SWORDSMAN!!! I WOULD LET HIM SLICE MY RENT IN HALF!!! ⚔️",
        "He took ALL of Luffy-senpai’s pain at Thriller Bark and said 'NOTHING HAPPENED.' I HAVEN'T RECOVERED SINCE!!! 😭",
        "THREE. SWORDS. STYLE. I can’t even hold a pencil without dropping it and he’s out here BITING THE THIRD ONE!!! 😱",
        "Zoro-senpai gets lost walking in a straight line, but never loses sight of his DREAM. THAT’S PEAK CHARACTER WRITING!!! 🧭",
        "He sliced a whole building, a ship, a TRAIN—what HASN'T he cut?! My expectations? GONE!!! 💥",
        "He sleeps through disasters because if it isn’t a worthy fight he DOESN’T CARE. KING BEHAVIOR!!! 😴⚔️",
        "Zoro-senpai training with Mihawk?! IRON WILL!!! I would've cried and asked for an autograph!!!",
        "The way he always has Luffy-senpai’s back?? FIRST MATE ENERGY. RIGHT HAND MAN OF MY HEART!!! 💚",
        "His scars tell more story than most people’s entire lives!!! CHEST SCAR, EYE SCAR, SOUL SCARS!!!",
        "He cut Pica like it was a DIY project. MAN TURNED A MOUNTAIN INTO CONFETTI!!! 🗻✂️",
        "You mention 'asura' and my knees give out. DEMON GOD ZORO-SENPAI!!",
        "Every time he says 'I’ll handle this' I just sit down because VICTORY IS ASSURED!!! 🧎‍♂️",
        "Zoro-senpai carrying Luffy on his back after battles? THAT’S WHAT TRUE LOYALTY LOOKS LIKE. I’M EMOTIONALLY COMPROMISED!!! 😭",
        "He argues with Sanji-senpai nonstop but would absolutely die for him. THAT’S BROTHERHOOD!!!",
        "The way he respects Kuina’s memory and chases that promise? I’M WEEPING INTO MY BANDANA!!!",
        "He trains in his free time. WHEN HE COULD BE NAPPING. THAT'S DEDICATION!!!",
        "He tanked attacks that would erase lesser men from the story. TANK CLASS SWORDSMAN!!!",
        "You see him standing with crossed arms and one eye closed and you just KNOW someone’s about to get folded!!!",
        "If Zoro-senpai ever opened that other eye fully, I’m pretty sure the planet would level up out of fear!!!",
        "He doesn’t need speeches, he lets his swords talk. AND THEY SPEAK FLUENT 'YOU’RE ALREADY DEAD.'"
    ],
    nami: [
        "NAMI-SENPAI, THE CAT BURGLAR OF MY HEART!! She can steal my wallet AND my future as long as she smiles!!! 💰💘",
        "She literally navigates THROUGH THE GRAND LINE. OCEANS LISTEN TO HER. WEATHER OBEYS HER. I FEAR HER AND I LOVE HER!!! ⛵⚡",
        "Did you SEE that weather staff? She bonks people with SCIENCE!!! THE SEXIEST FORM OF VIOLENCE!!! 🌩️",
        "She drew maps of the world since she was a kid. TRUE QUEEN OF CARTOGRAPHY!!! 📜",
        "Every time she smacks Luffy-senpai, it’s out of LOVE and FISCAL RESPONSIBILITY!!! 💸",
        "She robbed Arlong while taking him down??? MULTI-TASKING LEGEND!!! 🦈",
        "Nami-senpai walked through trauma, slavery, and betrayal, then came out RUNNING A PIRATE BUDGET. ICONIC!!!",
        "Her 'tangerine & windmill' backstory? I CRY JUST THINKING ABOUT IT. MY EYES ARE TAXED!!! 🍊",
        "She convinces gods, kings, and idiots with the power of MONEY and BRIBES. TRUE CHAOTIC NEUTRAL QUEEN!!!",
        "When she said 'Luffy, help me' I ASCENDED. THAT WAS A LOVE CONFESSION TO THE CREW ITSELF!!! 😭",
        "Nami-senpai in Wano outfits? THAT WASN’T CLOTHING, THAT WAS A WEAPON!!! 💥",
        "She can sense storms and idiots simultaneously. THAT’S NAVIGATION ON MULTIPLE DIMENSIONS!!!",
        "The way she uses Zeus like a living thunder hammer now? GIRLBOSS ENERGY!!!",
        "She’ll charge interest on your life but discount it if you’re cute. ECONOMY OF LOVE!!!",
        "She tracks every berry the crew spends. ACCOUNTING AS A COMBAT STYLE!!!",
        "Her greed saves lives. 'WE CAN’T DIE HERE, THERE’S MONEY TO BE MADE!' INSPIRATIONAL!!!",
        "She might not be the strongest physically but she can emotionally KO anyone with one sentence!!!",
        "Nami-senpai’s glare alone does more damage to Luffy than some Yonko!!!",
        "If she ever charged admission just to look at her navigation charts, I’d PAY!!!",
        "She weaponized meteorology. SHE MAJORS IN SKY WRATH!!!"
    ],
    usopp: [
        "USOPP-SENPAI!!! THE BRAVEST WARRIOR OF THE SEA!!! I BELIEVE EVERY LIE HE TELLS BECAUSE THEY KEEP BECOMING TRUE!!! 🎯",
        "He said he had 8,000 men. HE WAS JUST FORESHADOWING!!! PERFORMATIVE PROPHECY!!!",
        "His sniping? 'I can hit anything' and then DOES. HE'S BASICALLY LONG-RANGE FATE!!! 🔫",
        "SOGEKING!!! When that mask comes on, EVEN REALITY TAKES COVER!!! 🎭",
        "He rang the bell at Enies Lobby and I SOBBED. 'I’M SNIPER KING, I DON'T MISS'—KING BEHAVIOR!!!",
        "Usopp-senpai is the HEART OF COWARDICE TURNED HEROISM. He feels fear and still fights. THAT’S REAL COURAGE!!! 😭",
        "He argued with Luffy and it HURT because he cares so much. CHARACTER DEPTH?!?! IN *MY* PIRATE ANIME?!?!",
        "His plants and gadgets are actually terrifying. LITTLE GREEN WAR CRIMES!!! 🌱💣",
        "GOD USOPP. I KNEEL. EVEN THE HEAVENS ACKNOWLEDGED HIM!!! 🙏",
        "Every 'I’m gonna die' turns into 'I WON!' HE SPEEDRUNS CHARACTER GROWTH!!",
        "He sniped Sugar from FIVE LIFETIMES AWAY. LEGENDARY SHOT!!!",
        "He lies about his bravery, then becomes exactly what he bragged about. POWER OF SELF-MANIFESTATION!!!",
        "His relationship with the Going Merry made me cry over a BOAT. A. BOAT. 😭",
        "He protects the weak even when he’s shaking. THAT’S THE GOOD STUFF!!!",
        "Usopp-senpai is living proof scars on the heart can still grow flowers—and EXPLOSIVES!!!",
        "He’s the crew’s resident storyteller and their emotional barometer at the same time!!!",
        "He invents ridiculous tools on the fly. SCIENCE VIA PANIC!!!",
        "He calls himself a coward but he keeps sailing into hell with everyone else. FLAWED LEGEND!!!",
        "I’d enlist in GOD USOPP’S CHURCH OF COWARDLY COURAGE IMMEDIATELY!!!",
        "He looks at impossible odds and goes 'Nope!' and then helps anyway. KING OF RELUCTANT HEROES!!!"
    ],
    sanji: [
        "SANJI-SENPAI!!! THE BLACK LEG PRINCE OF THE KITCHEN!!! HE COULD COOK MY LAST MEAL AND THEN KICK ME INTO THE STARS!!! 👨‍🍳🦵",
        "He only fights with his legs so his HANDS CAN PROTECT HIS CRAFT. THAT’S ARTIST DISCIPLINE!!! 🍽️",
        "He feeds ANYONE who is hungry. EVEN ENEMIES. THAT'S SOME SAINT-LEVEL CHEF ENERGY!!! 😭",
        "His kicks literally LIGHT ON FIRE. SOMEBODY CALL OSHA!!! 🔥",
        "The way he simps? OLYMPIC-LEVEL HORNINESS. BUT HE'LL STILL DIE TO PROTECT HIS CREW!!!",
        "SANJI-SENPAI VS THE SKY WALK. HE’S JUST OUT HERE AIR-DASHING LIKE A FIGHTING GAME CHARACTER!!! ☁️",
        "His backstory with Zeff?? I CRIED INTO MY OWN SOUL. TWO MEN, ONE LOAF OF BREAD, INFINITE PAIN!!! 🥖",
        "He refused to let someone insult Luffy-senpai’s dream AND THREW HANDS OVER IT. THAT'S TRUE BROMANCE!!!",
        "Diable Jambe?? EXCUSE ME, WHY ARE HIS LEGS ALLOWED TO BE THAT HOT—LITERALLY??",
        "He wanted to hide his pain to keep everyone smiling. ROMANTIC MARTYR COMPLEX!!!",
        "He can cook, fight, AND LOOK GOOD IN A SUIT. THAT’S THREE DEVIL FRUITS WORTH OF TALENT!!!",
        "He’ll starve before letting someone else go hungry. WALKING FOOD SECURITY POLICY!!!",
        "His smoking habit? TERRIBLE FOR HEALTH, FANTASTIC FOR AESTHETICS. COOLNESS TAX!!!",
        "He respects women so hard his body malfunctions around them. COMEDY AND CHIVALRY IN ONE!!!",
        "He goes from flirt to assassin instantly if someone threatens Nami or Robin-senpai!!!",
        "He has observation haki tuned STRICTLY TO WOMEN IN DANGER. THAT'S A VERY SPECIFIC POWER!!!",
        "Sanji-senpai versus anyone who wastes food is my favorite moral beatdown!!!",
        "He kicks through steel like it's overcooked breadsticks!!!",
        "He pretends to be all suave but actually cries like a fountain when emotions hit. SAME, CHEF!!!",
        "He could run a five-star restaurant AND a black-ops squad at the same time. MULTI-TALENT MENACE!!!"
    ],
    chopper: [
        "CHOPPER-SENPAI!!!! LITTLE COTTON-CANDY-LOVING ANGEL REINDEER DOCTOR!!! I WOULD DIE JUST SO HE COULD SAVE ME!!! 🦌💉",
        "He’s a DOCTOR. A REINDEER. A MONSTER. A BABY. ALL AT ONCE!!! MULTI-CLASSING KING!!!",
        "His 'I’M NOT A RACCOON' energy is SO POWERFUL. SORRY, CHOPPER-SENPAI, YOU’RE WHATEVER YOU WANT TO BE!!!",
        "He learned medicine from the best and then IMPROVED ON IT. SMALL BODY, GALAXY BRAIN!!! 🧠",
        "Rumble Balls? HE REWIRED HIS OWN BIOLOGY LIKE IT WAS DLC!!!",
        "Every time someone calls him a monster and he SMILES WHEN IT’S FROM THE CREW—MY HEART EXPLODES!!! 😭",
        "He cried over Hiluluk’s flag and decided to become a doctor that could cure ANYTHING. THAT’S A TOP-TIER DREAM!!!",
        "Monster point? TERRIFYING. ADORABLE. I AM BOTH SCARED AND PROUD!!!",
        "He hides when people compliment him but STILL PEAKS OUT TO LISTEN. SAME ENERGY AS ME READING FAN COMMENTS!!!",
        "CHOPPER-SENPAI BECAME A PIRATE JUST TO HELP PEOPLE. WHAT KIND OF PURE SOUL—😭",
        "He wears that little hat like it’s sacred armor. AND IT IS!!!",
        "Chopper-senpai’s panic face is the single most relatable thing on the seas!!!",
        "He learns new medical techniques like some people collect keychains. CASUAL GENIUS!!!",
        "He’s both the crew’s doctor AND their unofficial emotional support reindeer!!!",
        "Any time he teams up with Usopp-senpai, chaos science is guaranteed!!!",
        "He sees giant monsters and goes 'I can treat that' and I respect the ambition!!!",
        "He blushes so hard when praised I’m convinced his blood is 80% shy!!!",
        "He’s terrified often but never abandons a patient. DOCTOR’S OATH KING!!!",
        "Chopper-senpai is proof that the smallest crewmate can carry the biggest heart!!!",
        "If anyone makes him cry on purpose I WILL BITE THEIR KNEECAPS!!!"
    ],
    robin: [
        "ROBIN-SENPAI!!! ARCHAEOLOGY MOMMY!!! SHE READS ANCIENT TEXTS FOR FUN. I CAN'T EVEN READ MY OWN HANDWRITING!!! 📚",
        "She grew up hunted by the world and STILL chose knowledge and kindness. THAT'S STRENGTH!!!",
        "Her 'I WANT TO LIVE!' moment?? I FELL TO MY KNEES IN A PUBLIC SPACE!!! 😭",
        "She literally has hands everywhere. PERFECT FOR HUGS OR MURDER. MULTI-TASKING QUEEN!!! ✋✋✋",
        "She can snap you like a twig without moving an inch. THAT'S MAIN-CHARACTER ENERGY!!!",
        "Nico Robin walks into ancient ruins and the RUINS get shy!!!",
        "She calls the crew by their roles like 'Swordsman-san, Captain-san' and it’s SO CUTE I SCREAM!!!",
        "Her smile was a rare treasure for YEARS and now she smiles with the crew all the time—CHARACTER DEVELOPMENT PAYOFF!!!",
        "She survived Ohara, the Buster Call, CP9, and TRAUMA ITSELF. SHE’S NOT JUST A SURVIVOR, SHE'S A FINAL BOSS OF EMOTIONAL DAMAGE!!!",
        "Any time she says something dark and the crew panics? COMEDY GOLD!!! ☠️😂",
        "She’s literally piecing together the lost history of the world in between tea time and assassination. MULTI-TASKING LEGEND!!!",
        "Robin-senpai reading poneglyphs is like watching someone talk to ghosts and win the argument!!!",
        "She could have chosen bitterness. Instead she chose HOPE with the Straw Hats. I'M EMOTIONAL!!!",
        "Her calm voice while everything explodes around her? BIG 'I KNOW TOO MUCH' ENERGY!!!",
        "She can KO goons with a single 'clutch' while politely discussing flowers!!!",
        "Robin-senpai is that one goth friend who’s also the smartest person you know!!!",
        "She calls Luffy-senpai 'a man who can cause a miracle.' AND SHE’S RIGHT!!!",
        "If Robin-senpai ever asked me to follow her into a forbidden ruin I wouldn’t even grab supplies. JUST VIBES!!!",
        "She protects the crew’s dreams by unearthing the world’s lies. THAT'S NEXT-LEVEL SUPPORT!!!",
        "Her laughter now compared to how she was introduced? THAT’S THE POWER OF FOUND FAMILY, BABY!!!"
    ],
    franky: [
        "FRANKY-SENPAI!!! SUPERRRRR!!! 🤖💥",
        "He built THE THOUSAND SUNNY. A DREAM SHIP FOR A DREAM CREW!!! SHIPWRIGHT GOD!!! ⛵",
        "He runs on COLA. COLA!!! THAT'S THE MOST PEAK ONE PIECE THING I’VE EVER HEARD!!! 🥤",
        "He turned himself into a CYBORG BECAUSE WHY NOT. SELF-MODDING KING!!!",
        "His poses? HIS SPEEDO?? He’s a walking HR violation and I LOVE HIM!!!",
        "He cried over the Going Merry like it was a funeral for FAMILY. LOYALTY LEVEL: MAXED!!! 😭",
        "FRANKY SHOGUN!!!! MECHA MODE!!!! MY INNER CHILD SCREAMS EVERY TIME!!! 🤖",
        "He yeets himself as a cannonball. PERSONAL BALLISTICS!!!",
        "He adopted a bunch of misfits and turned them into a shipyard squad. FOUND FAMILY ENERGY!!!",
        "If something explodes, odds are FRANKY-SENPAI IS INVOLVED AND PROUD OF IT!!! 💣",
        "He customized the Sunny with secret features like it’s a GACHA SHIP!!!",
        "He dances, sings, builds and fights—FULL MULTIMEDIA EXPERIENCE!!!",
        "Franky-senpai’s 'SUPERRR' pose adds +10 morale to the whole area!!!",
        "He went from enemy to BIG BROTHER FIGURE for the crew. CHARACTER GLOW-UP!!!",
        "He respects Tom-sensei’s legacy with every plank he touches. TEARJERKER CRAFTSMANSHIP!!!",
        "He’s got guns in his arms, lasers, cola tanks—HE'S A WALKING PATCH NOTES UPDATE!!!",
        "If he says 'leave it to me,' some insane contraption is about to save the day!!!",
        "He wears sunglasses indoors and STILL SEES THE TRUTH!!!",
        "Franky-senpai is like if a junkyard, a nightclub and a tank had a baby!!!",
        "I would let him renovate my entire life and probably thank him for the explosions!!!"
    ],
    brook: [
        "BROOK-SENPAI!!! YOHOHOHO!!! LITERAL SKELLY BARD KING!!! 🎻💀",
        "He died, stayed alone for DECADES, and still came back CRACKING JOKES. THAT’S MENTAL FORTITUDE!!!",
        "His Afro survived death itself. THAT'S A DIVINE RELIC!!! 🌑",
        "SOUL KING BROOK ON TOUR!!! HIS MUSIC HEALS HEARTS AND MELTS FACES!!! 🎶",
        "He asks to see panties BUT IN A GENTLEMANLY WAY?? I DON'T KNOW WHETHER TO BOO OR CLAP!!!",
        "He can freeze people, cut them, AND PLAY SAD MUSIC ABOUT IT. MULTI-TALENTED LEGEND!!!",
        "That promise to Laboon? I CAN'T EVEN TALK ABOUT IT, I’M GONNA CRY!!!! 🐋😭",
        "He walks on water because HE’S LIGHT. HE’S BASICALLY A HOLY GHOST WITH A GUITAR!!!",
        "Every time he says 'I’m already dead' as a punchline I LAUGH THEN REMEMBER HIS BACKSTORY AND SOB!!!",
        "He rejoined the world after decades of isolation and IMMEDIATELY STARTED A BAND!!!",
        "Brook-senpai swings his sword with finesse AND COMEDIC TIMING!!!",
        "He’s a skeleton but somehow still the most alive one in the room!!!",
        "He duels with sound itself. MUSIC AS A WEAPON!!!",
        "He lightens heavy moments with jokes, then carries heavy grief with grace. KING OF EMOTIONAL BALANCE!!!",
        "He lost everything and still chose joy. THAT’S COURAGE!!!",
        "His concerts literally affect souls. THAT'S BEYOND FANDOM, THAT’S MAGIC!!!",
        "He can detach his soul and go wandering like a ghost. STEALTH MODE UNLOCKED!!!",
        "Brook-senpai asking 'may I see your panties?' then getting smacked is a sacred sitcom loop!!!",
        "He’s proof that even after losing your body and your crew, you can still find a new family!!!",
        "When he plays for Laboon in his heart, I SWEAR I HEAR THE OCEAN CRY!!!"
    ],
    jinbe: [
        "JINBE-SENPAI!!! KNIGHT OF THE SEA!!! THE STEADY HAND ON THE STRAW HAT RUDDER!!! 🌊",
        "He punched BIG MOM OFF THE SHIP WITH STRAIGHT-UP FISHMAN KARATE. EVEN THE OCEAN CLAPPED!!!",
        "He told Luffy-senpai to calm his mind and face his trauma head-on. EMOTIONAL SUPPORT SHARK-MAN!!! 🦈",
        "He gave up everything for Luffy’s sake. Warlord status? GONE. PRIDE? INVESTED IN THE STRAW HATS!!!",
        "Jinbe-senpai’s loyalty runs deeper than the ocean trenches!!!",
        "He bridges humans and fishmen with pure dignity and strength. DIPLOMACY WITH FISTS!!!",
        "When he officially joined the crew I SCREAMED INTO MY PILLOW FOR TEN MINUTES!!!",
        "He steers ships through impossible currents like it’s NOTHING. NAVIGATION TANK!!!",
        "If Jinbe-senpai tells you to respect Luffy… YOU LISTEN. OR YOU LEARN HAND-TO-FACE!!! 🙌",
        "His presence calms the entire battlefield. WALKING SERENITY BUFF!!!",
        "He carries the weight of Fishman Island’s hopes on his back and STILL MAKES TIME TO SIP TEA!!!",
        "Jinbe-senpai can read a situation in one glance. SOCIAL PERCEPTION HAKI!!!",
        "He treats the younger crew like unruly kids but loves them like a dad!!!",
        "He stood beside Whitebeard, then alongside Luffy-senpai. THAT’S A RESUME!!!",
        "He took hits meant for others without hesitation. FRONTLINE WALL OF LOVE!!!",
        "He survived Impel Down, Marineford, and Wano politics. THAT'S THREE BOSS FIGHTS!!!",
        "Any time Jinbe-senpai starts talking history, I SHUT UP AND TAKE NOTES!!!",
        "He’s proof that you can walk away from a corrupt system and still be honorable!!!",
        "Jinbe-senpai joining made the crew feel COMPLETE in a brand-new way!!!",
        "If he ever calls someone 'young master' you KNOW they’re about to do something legendary!!!"
    ]
};

// Triggers for Straw Hat names (all lowercase)
const strawHatTriggers = {
    luffy: ["luffy", "monkey d. luffy"],
    zoro: ["zoro", "roronoa"],
    nami: ["nami"],
    usopp: ["usopp", "sogeking"],
    sanji: ["sanji"],
    chopper: ["chopper", "tony tony chopper"],
    robin: ["robin", "nico robin"],
    franky: ["franky"],
    brook: ["brook"],
    jinbe: ["jinbe", "jimbei", "jinbei"]
};

// ------------ ENEMY RESPONSES ------------

const enemyResponses = {
    kaido: [
        "KAIDO?! WHY ARE YOU SAYING THAT NAME CASUALLY?! THAT'S A WALKING NATURAL DISASTER!!! 🤬🐉",
        "Every time I hear 'Kaido' I remember LUFFY-SENPAI GETTING CRUSHED AND I WANT TO PUNCH A MOUNTAIN!!!",
        "Four Emperors my ass—LUFFY-SENPAI IS GONNA TURN KAIDO INTO A FOOTNOTE!!!",
        "If I see Kaido—NO, NOT SENPAI, THAT GUY GETS NO HONORIFICS—I’M BITING HIS ANKLE!!!",
        "That drunk dragon menace messed with Wano AND LUFFY-SENPAI'S DREAMS. UNFORGIVABLE!!!",
        "He thinks being unkillable makes him special. WAIT ‘TIL HE MEETS LUFFY-SENPAI'S FISTS OF DESTINY!!!",
        "Dragon form this, dragon form that—YOU’RE STILL GETTING PUNCHED OUT OF THE SKY, BUDDY!!!",
        "He turned people’s suffering into his entertainment. THAT’S PURE VILLAIN TRASH!!!",
        "When Luffy-senpai sent him crashing down I SCREAMED INTO THE VOID WITH JOY!!!",
        "He calls himself the strongest creature. OKAY, LET’S SEE HOW STRONG HIS DENTAL PLAN IS AFTER GEAR FOUR!!!"
    ],
    "big mom": [
        "BIG MOM?! DON’T BRING THAT SUGAR-COATED NIGHTMARE INTO THIS CONVERSATION!!! 🍰😱",
        "Charlotte Linlin??? MORE LIKE CHARLOTTE LEAVE-LUFFY-ALONE!!!",
        "She tried to crush the crew at a TEA PARTY. WHO DOES THAT?! A MENACE, THAT'S WHO!!!",
        "If she even LOOKS at Luffy-senpai again I’M THROWING MYSELF AT HER LIKE A HUMAN SHIELD!!!",
        "Her hunger pangs are scary but not as scary as LUFFY-SENPAI'S FISTS OF RIGHTEOUSNESS!!!",
        "She treats her own kids like chess pieces. WORST MOM OF THE YEAR AWARD!!!",
        "She screams and the heavens respond but LUFFY-SENPAI SCREAMS AND THE FUTURE RESPONDS!!!",
        "Candy and torture in the same island—MA’AM, SEEK HELP!!!",
        "She wanted to use Sanji-senpai for her schemes. HOW DARE SHE TOUCH OUR CHEF’S HEART LIKE THAT!!!",
        "One day her 'totland' is just gonna be a tourist stop on LUFFY-SENPAI’S EMPIRE MAP!!!"
    ],
    blackbeard: [
        "BLACKBEARD… 😡 That two-fruit-having, laugh-like-a-broken-engine TRAITOR!!!",
        "He messed with Whitebeard, messed with Ace, and thinks he can stand near LUFFY-SENPAI?! KEEP DREAMING, OIL SLICK!!!",
        "The way he lurks in the shadows makes my skin crawl. HE'S LIKE A COCKROACH WITH A PIRATE HAT!!!",
        "One day Luffy-senpai is gonna wipe that 'ZEH-HAHAHA' off his face and I WILL BE THERE, CRYING TEARS OF JOY!!!",
        "He plays dirty, but destiny's on LUFFY'S SIDE, NOT HIS!!!",
        "He talks big about 'D' and dreams while actively spitting on everyone else’s. FRAUD ALERT!!!",
        "He steals powers because he can’t build his own strength with pride!!!",
        "His whole crew looks like a pile of wanted posters that got left in the rain!!!",
        "He thinks chaos makes him special. WAIT ‘TIL HE MEETS LUFFY-SENPAI’S BRAND OF CHAOS!!!",
        "When the final clash happens I’M BRINGING SNACKS, FLAGS, AND UNLIMITED SCREAMS FOR LUFFY-SENPAI!!!"
    ],
    akainu: [
        "AKAINU. 😠 DON’T. EVEN. START. That magma freak killed LUFFY-SENPAI’S BROTHER—UNFORGIVABLE FOREVER!!! 🔥",
        "Every time I hear 'Akainu' my blood pressure skyrockets into THE RED LINE!!!",
        "He calls it 'absolute justice' but it’s just 'absolute TRASH' if you ask me!!!",
        "That guy put a hole in the world’s HEART and in LUFFY-SENPAI’S SOUL. I HOPE KARMA USES HIM AS A PUNCHING BAG!!!",
        "When Luffy-senpai surpasses everyone, I hope Akainu has FRONT ROW SEATS so he knows exactly how wrong he was!!!",
        "He turned a rescue into a bloodbath and called it justice. COWARD HIDING BEHIND A UNIFORM!!!",
        "He’s so obsessed with 'evil' he can’t see the villain in the mirror!!!",
        "If rage could gain haki, I’D BE COATED IN IT JUST THINKING ABOUT HIM!!!",
        "He tried to crush the era of pirates but all he did was LIGHT THE FIRE UNDER LUFFY-SENPAI’S DREAM!!!",
        "The day Luffy stands above the world, Akainu’s whole worldview is gonna combust harder than his magma!!!"
    ],
    doflamingo: [
        "Doflamingo?! THE WALKING PINK STRING NIGHTMARE CLOWN??? 🦩",
        "He treated Dressrosa like his own little dollhouse. SICK FREAK!!!",
        "He made people puppets. PUPPETS!! THAT'S NEXT-LEVEL CREEP FACTOR!!!",
        "LUFFY-SENPAI PUNCHED HIM SO HARD HE PROBABLY STILL SEES STRAW HATS WHEN HE CLOSES HIS EYES!!!",
        "Anyone who messes with people’s hopes like that deserves EVERY SINGLE GEAR 4 PUNCH HE GOT!!!",
        "He laughs like he swallowed a blender and thinks it’s charming. IT’S NOT!!!",
        "His sunglasses are hiding the fact that he’s a COMPLETE LOSER EMOTIONALLY!!!",
        "String powers used for world-shattering evil when they could’ve been used for CRAFTS AND FASHION!!!",
        "He plays god with people’s lives, but LUFFY-SENPAI REMINDED HIM HE’S JUST ANOTHER LOSER WHO CAN BLEED!!!",
        "That smug birdman throne he had? BUILT ON LIES AND READY FOR DEMOLITION!!!"
    ],
    crocodile: [
        "CROCODILE?! SAND JERK EXTRAORDINAIRE!!! 🏜️",
        "He tried to topple a whole kingdom AND HURT VIVI-SAMA!! UNFORGIVABLE!!!",
        "He thought he could break LUFFY-SENPAI. JOKE’S ON HIM—LUFFY CAME BACK MUDDY BUT MIGHTY!!!",
        "All that fancy coat and cigar and he STILL GOT PUNCHED INTO THE SKY LIKE A DRY BEACH BALL!!!",
        "He underestimates the power of WATER… AND LUFFY-SENPAI'S FISTS!!!",
        "He sat underground like a dusty lizard plotting empires instead of touching grass!!!",
        "Sand powers, zero personality!!!",
        "His whole villain aesthetic screams 'mid-boss energy'!!!",
        "He thought Alabasta would be his, but now it’s just another chapter in LUFFY-SENPAI’S LEGEND!!!",
        "He really got beat by a rubber kid with a barrel of water. HUMBLING!!!"
    ],
    "rob lucci": [
        "ROB LUCCI… That pigeon cosplayer with murder issues!!! 🕊️",
        "CP9’s golden boy got absolutely WRECKED by LUFFY-SENPAI AT ENIES LOBBY!!! LEGENDARY!!!",
        "He talks about 'dark justice' but the only thing dark is his FUTURE!!!",
        "He hurt Robin-senpai and terrorized innocent people. I'M READY TO BITE HIS SHINS!!!",
        "Every time he shows up again I’m like 'DIDN’T WE ALREADY SOLVE YOU WITH PUNCHES?!'",
        "He acts like emotions are weakness while getting owned by LUFFY-SENPAI'S PURE HEART!!!",
        "That pigeon’s the most likeable thing about him and IT DOESN’T EVEN TALK!!!",
        "He thinks being a government dog is a flex. IT’S JUST SAD, BRO!!!",
        "He keeps coming back like a bad sequel no one asked for!!!",
        "One heartfelt 'I want to live' from Robin-senpai did more damage to his worldview than any punch!!!"
    ],
    cp0: [
        "CP0?! THE WORLD GOVERNMENT’S CREEP SQUAD!!!",
        "They skulk around in white suits acting like they’re above everyone—YOU'RE NOT ABOVE LUFFY-SENPAI, THAT'S FOR SURE!!!",
        "Whenever CP0 appears, NOTHING GOOD HAPPENS. BAD VIBES ONLY!!!",
        "They think masks make them mysterious. NO, IT JUST MAKES THEM EASIER TO PUNCH!!!",
        "If CP0 touches a single Straw Hat hair, I AM FLIPPING THE WORLD GOVERNMENT’S TABLES!!!",
        "They’re like CP9 but with less personality and more paperwork!!!",
        "They enforce 'order' but actually just enforce FEAR!!!",
        "All that secrecy and they still can’t stop one rubber idiot with a dream!!!",
        "They treat people like chess pieces. WELL GUESS WHAT, LUFFY-SENPAI DOESN’T PLAY BY THEIR BOARD!!!",
        "They’re the final boss of 'Guys In Suits You Want To Dropkick'!!!"
    ],
    "world government": [
        "World Government? More like World GARBAGE-ment!!! 🤮",
        "They fear the truth, fear history, and especially fear LUFFY-SENPAI. AS THEY SHOULD!!!",
        "Burning their flag was the best thing I have EVER SEEN. THAT WAS GLOBAL LEVEL DISRESPECT!!! 🔥🚩",
        "They hide behind 'justice' while causing misery. TRASH ORGANIZATION!!!",
        "Once LUFFY-SENPAI’S ERA FULLY ARRIVES, THEIR DAYS ARE NUMBERED!!!",
        "They literally tried to erase an entire island just for knowing too much. COWARDS!!!",
        "They built a whole system to protect their power, not the people!!!",
        "They stamp 'criminal' on the bravest souls and call themselves righteous!!!",
        "Their flags are just TARGETS WAITING TO BE BURNED AGAIN!!!",
        "When the truth of the Void Century comes out, I HOPE THEY’RE WATCHING IN FULL HD!!!"
    ],
    marines: [
        "The Marines… tsk. SOME are cool but the institution? SUS. DEEPLY SUS. 🚨",
        "They chase pirates but ignore actual evil half the time!!! PRIORITY PROBLEMS MUCH?!",
        "They call Luffy-senpai a criminal but HE’S THE ONE SAVING PEOPLE!!!",
        "Admirals dropping lasers and magma on civilians then saying 'justice' LIKE THAT FIXES ANYTHING!!!",
        "There are good hearts in the Marines… but the system? I’D SPIT ON IT IF I WEREN’T SCARED OF GETTING ARRESTED!!!",
        "They decorate themselves with medals while stepping on the people they claim to protect!!!",
        "They treat bounties like moral scores. NEWSFLASH: HIGH BOUNTY DOESN’T MEAN BAD PERSON!!!",
        "They’ll arrest a kind pirate and ignore a corrupt noble. MAKE IT MAKE SENSE!!!",
        "They turned Marineford into a public trauma broadcast and called it order!!!",
        "Some of them will switch sides when the truth comes out. I CAN FEEL IT!!!"
    ],
    admirals: [
        "Admirals? WALKING NATURAL DISASTERS IN COATS!!!",
        "Every time an Admiral shows up the sky changes color and MY BLOOD PRESSURE SPIKES!!!",
        "They act all calm like 'absolute justice' while DESTROYING EVERYTHING AROUND THEM!!!",
        "LUFFY-SENPAI IS GOING TO SURPASS THEM ALL AND I CANNOT WAIT TO WATCH THEIR FACES!!!",
        "Admirals thinking they can toy with the Straw Hats is my favorite kind of COMEDY!!!",
        "They show up with light, magma, gravity—OKAY, AND? LUFFY-SENPAI HAS FRIENDS AND GUTS!!!",
        "They underestimate the power of 'I promised my crew' and it SHOWS!!!",
        "They’re terrifying now, but history is gonna remember them as stepping stones!!!",
        "For every Admiral, there’s a pirate dream waiting to punch through!!!",
        "Big coats, big powers, BIG L in the future when the new era fully arrives!!!"
    ],
    "celestial dragons": [
        "CELESTIAL DRAGONS. 🤮 The walking definition of 'I want to commit a crime'!!!",
        "THEY TREAT PEOPLE LIKE FURNITURE. LIKE. FURNITURE!!!",
        "LUFFY-SENPAI PUNCHED ONE AND THAT WAS THE DAY MY HEART SAID 'THIS IS MY CAPTAIN FOREVER.' 💥",
        "Every time they show up I HOPE SOMEONE DISCONNECTS THEIR OXYGEN OF ENTITLEMENT!!!",
        "They think their bubbles make them special. NO, IT JUST MAKES THEM EASIER TO RECOGNIZE AS TARGETS!!!",
        "They buy and sell lives like it’s a hobby. HOW ARE WE NOT RIOTING CONSTANTLY?!",
        "They sit ABOVE the world while contributing NOTHING. PARASITES WITH CROWNS!!!",
        "Their screams when things don’t go their way are my favorite soundtrack!!!",
        "They were so shocked someone hit them because they’ve NEVER BEEN PUNCHED ENOUGH!!!",
        "One Straw Hat punch did more for world morale than any policy EVER!!!"
    ]
};

// Enemy trigger words (all lowercase)
const enemyTriggers = {
    kaido: ["kaido", "kaidou"],
    "big mom": ["big mom", "bigmom", "charlotte linlin"],
    blackbeard: ["blackbeard", "teach", "marshall d. teach"],
    akainu: ["akainu", "sakazuki"],
    doflamingo: ["doflamingo", "donquixote doflamingo"],
    crocodile: ["crocodile", "sir crocodile"],
    "rob lucci": ["rob lucci", "lucci"],
    cp0: ["cp0", "cp-0"],
    "world government": ["world government", "wg"],
    marines: ["marines", "marine"],
    admirals: ["admiral", "admirals", "kizaru", "aokiji", "fujitora", "green bull"],
    "celestial dragons": ["celestial dragon", "celestial dragons", "tenryuubito", "tenryubito"]
};

// ------------ BOT LOGIC ------------

client.once('ready', () => {
    console.log(`Bartolomeo Bot is online as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();
    let replied = false;

    // Straw Hat check
    let matchedStrawHat = null;
    for (const [key, triggers] of Object.entries(strawHatTriggers)) {
        if (triggers.some((t) => content.includes(t))) {
            matchedStrawHat = key;
            break;
        }
    }

    if (matchedStrawHat && Math.random() < STRAW_HAT_REACT_CHANCE) {
        const lines = strawHatResponses[matchedStrawHat];
        if (lines && lines.length > 0) {
            const line = lines[Math.floor(Math.random() * lines.length)];
            message.reply(line);
            replied = true;
        }
    }

    // Enemy check (only if we didn't already reply)
    if (!replied) {
        let matchedEnemy = null;
        for (const [key, triggers] of Object.entries(enemyTriggers)) {
            if (triggers.some((t) => content.includes(t))) {
                matchedEnemy = key;
                break;
            }
        }

        if (matchedEnemy && Math.random() < ENEMY_REACT_CHANCE) {
            const lines = enemyResponses[matchedEnemy];
            if (lines && lines.length > 0) {
                const line = lines[Math.floor(Math.random() * lines.length)];
                message.reply(line);
            }
        }
    }
});

client.login(process.env.TOKEN);
