
require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Reaction chances
const STRAW_HAT_REACT_CHANCE = 0.2;
const ENEMY_REACT_CHANCE = 0.2;
const OTHER_REACT_CHANCE = 0.2;   // Kid, Law, Ace, Dragon, Sabo, Barto self
const GOLDEN_LINE_CHANCE = 0.01;  // 1% chance
// ------------------- DAILY STATUS ROTATION -------------------

const strawHatStatuses = [
  { text: "Luffy-senpai’s every move", type: ActivityType.Watching },
  { text: "Zoro-senpai protecting Luffy-senpai", type: ActivityType.Watching },
  { text: "Nami-senpai scolding Luffy-senpai", type: ActivityType.Listening },
  { text: "Usopp-senpai telling heroic tales of Luffy-senpai", type: ActivityType.Listening },
  { text: "Sanji-senpai cooking meat for Luffy-senpai", type: ActivityType.Watching },
  { text: "Chopper-senpai treating Luffy-senpai’s injuries", type: ActivityType.Watching },
  { text: "Robin-senpai reading while Luffy-senpai naps nearby", type: ActivityType.Watching },
  { text: "Franky-senpai upgrading the Sunny for the captain", type: ActivityType.Playing },
  { text: "Brook-senpai’s songs written for Luffy-senpai", type: ActivityType.Listening },
  { text: "Jinbe-senpai guarding the future Pirate King", type: ActivityType.Watching }
];

let statusIndex = 0;

function setNextStatus(client) {
  const status = strawHatStatuses[statusIndex];
  client.user.setActivity(status.text, { type: status.type })
    .catch(console.error);

  statusIndex = (statusIndex + 1) % strawHatStatuses.length;
}

// ---------------- STRAW HAT RESPONSES ----------------

const strawHatResponses = {
  luffy: [
    "LUFFY-SENPAI!!! FUTURE PIRATE KING!!! JUST HEARING HIS NAME MAKES MY SOUL DO GEAR SECOND!!! 👑",
    "He punched a Celestial Dragon WITHOUT HESITATION. THAT WASN'T A HIT, THAT WAS A LOVE LETTER TO FREEDOM!!!",
    "He burned the World Government's flag and basically screamed 'FIGHT ME' TO AN ENTIRE SYSTEM!!!",
    "He declared war on Enies Lobby just because Robin-senpai cried for help. THAT'S THE CAPTAIN I SWORE MY HEART TO!!!",
    "He laughs in the face of Yonkou, Admirals, destiny, DEATH ITSELF. THAT'S NOT BRAVERY, THAT'S STRAIGHT-UP DISRESPECT TO FEAR!!!",
    "He has Garp the Fist as a grandpa and Dragon as a dad and STILL turned out like this sunshine disaster. GENETICALLY ENGINEERED CHAOS!!!",
    "He looked at a sea that kills people for fun and said 'sounds like an adventure.'",
    "He hears someone cry and instantly adopts their whole country into his feelings!!!",
    "His idea of diplomacy is 'if you're crying I'll punch your oppressor.' PEAK INTERNATIONAL RELATIONS!!!",
    "He forgives people that tried to kill him but NEVER forgives anyone who hurts his friends!!!",
    "He turned former enemies into allies just by being stupidly sincere!!!",
    "He made giants, samurai, fishmen, pirates and revolutionaries eat at the same table like it was no big deal!!!",
    "He rang that Ox Bell like he was sending a message to the whole world: 'I'M NOT DONE YET.'",
    "He took poison, pain, loss and trauma and still came back smiling. THAT'S REAL HAKI OF THE HEART!!!",
    "His bounty posters are basically works of art—EVERY NEW ONE IS AN EVENT!!!",
    "He puts that straw hat on someone's head and suddenly they’re under the protection of fate itself!!!",
    "He doesn’t care about bloodlines or titles, just whether you’re kind and free. SIMPLE, PERFECT MORALITY!!!",
    "He made allies in Alabasta, Skypiea, Water 7, Dressrosa, Zou, Wano—THE WORLD IS BASICALLY HIS FANCLUB!!!",
    "When he screamed for Ace-senpai at Marineford I FELT MY HEART RIP IN HD!!!",
    "Every time he says 'I'm gonna be King of the Pirates' the universe flinches a little!!!",
    "He shares meat like it’s a sacred rite. IF HE OFFERS YOU A BITE YOU'RE FAMILY NOW!!!",
    "He sees impossible odds and gets EXCITED. SIR, THAT'S NOT A HEALTHY RESPONSE!!!",
    "Gear transformations? Every new form adds ten years to my life and takes twenty from my heart!!!",
    "He doesn't ask 'are you strong enough,' he asks 'do you want to be free,' and THAT'S WHY PEOPLE FOLLOW HIM!!!",
    "He turns despair into laughter just by existing. THAT'S A WORLD-CLASS ABILITY!!!",
    "He’s not just sailing the sea, HE'S REWRITING THE RULES OF WHAT IT MEANS TO LIVE!!!",
    "Some people chase treasure; Luffy-senpai turns PEOPLE into treasures and carts them around like living gold!!!",
    "When he smiles after the worst battles, it's like the world gets permission to breathe again!!!",
    "LUFFY-SENPAI ISN'T JUST A CAPTAIN, HE'S A NATURAL DISASTER OF HOPE!!!"
  ],

  zoro: [
    "ZORO-SENPAI!!! FIRST MATE! KING OF 'I’LL HANDLE THIS'!!! ⚔️",
    "He uses THREE SWORDS. ONE IN HIS MOUTH. WHO FIGHTS THEIR DENTIST LIKE THAT?!",
    "He took ALL of Luffy-senpai's pain at Thriller Bark and just said 'Nothing happened.' I HAVEN'T RECOVERED SINCE!!!",
    "He gets lost walking in a straight line but never loses sight of his dream. PRIORITIES!!!",
    "He made a promise to a girl on a staircase and turned it into a life mission!!!",
    "Asura form? THAT'S NOT A TECHNIQUE, THAT'S A GRAPHICS UPDATE!!!",
    "He cut Pica like he was trimming a hedge. THAT WAS A MOUNTAIN, SIR!!!",
    "He naps like he has no worries, then wakes up and solos half the battlefield!!!",
    "He trusts Luffy-senpai's instincts completely even when they look insane. THAT’S REAL FAITH!!!",
    "He'd never call himself a hero but he'll stand between danger and his crew EVERY SINGLE TIME!!!",
    "He argues with Sanji-senpai like it's his full-time job but would die for him without blinking!!!",
    "That scar across his chest? THAT'S A SYMBOL OF 'I SURVIVED MIHAWK AND I'M STILL CLIMBING.'",
    "He respects Kuina's memory with every swing of his swords!!!",
    "He trains instead of partying half the time—GRINDSET SWORDSMAN!!!",
    "He doesn't brag, he just demonstrates. QUIET-TYPE FLEXING!!!",
    "He looked at a cursed sword and said 'yeah I'll use that.'",
    "He is the emergency brakes for Luffy-senpai's worst ideas and the engine for his best ones!!!",
    "When he says 'if we can't protect the captain's dream, then whatever ambition we have is nothing,' I ASCEND!!!",
    "One glare from him and random grunts just PASS OUT EMOTIONALLY!!!",
    "If Zoro-senpai ever opens that closed eye fully the WORLD INDEX WILL CRASH!!!",
    "He carries the crew's burdens on that scarred chest and pretends it's just part of the job!!!",
    "He slices steel, stone, mountains—ONE DAY HE'LL SLASH THE VERY CONCEPT OF LIMITS!!!",
    "He may get lost geographically, but morally he has PERFECT DIRECTION!!!",
    "His loyalty is so intense it's basically weaponized!!!",
    "He's not just the swordsman—HE'S THE PILLAR Luffy-senpai LEANS ON!!!"
  ],

  nami: [
    "NAMI-SENPAI!!! CAT BURGLAR! NAVIGATOR! BRAIN OF THE OPERATION!!! 💰⛵",
    "She literally navigates the Grand Line. THAT'S LIKE SPEEDRUNNING IMPOSSIBLE!!!",
    "She uses the weather as a WEAPON. CLIMATE CHANGE BUT MAKE IT PERSONAL!!!",
    "She scammed a whole fishman crew while secretly plotting their downfall. CRIMINAL GENIUS!!!",
    "When she finally asked Luffy-senpai for help and he put the hat on her head—TOP 10 ANIME MOMENTS OF ALL TIME!!!",
    "Her backstory with Belle-mère and Cocoyashi? MY TEARS PAID PROPERTY TAX!!!",
    "She tracks all of Luffy-senpai's debt. BRAVEST WOMAN ALIVE!!!",
    "Her eyes turn into berry signs whenever treasure appears and honestly? RELATABLE!!!",
    "She fought with lightning, mirages and math. COMBAT CALCULUS!!!",
    "She will knock out Luffy-senpai with a single punch for financial crimes!!!",
    "She wants to draw a map of the entire world. WHO LOOKS AT A PLANET AND SAYS 'I CAN COVER THIS.'",
    "She can sense storms and idiots simultaneously!!!",
    "She uses Zeus as a living thunder hammer and THAT'S ICONIC ENERGY!!!",
    "She'll charge you interest on your life but give discounts to cute allies!!!",
    "She can turn a whole battlefield with a single weather forecast!!!",
    "She survived Arlong, then survived traveling with Luffy-senpai. BOTH IMPRESSIVE FEATS!!!",
    "She manages the crew's money, navigation and emotional common sense!!!",
    "She'll pretend she's only in it for treasure, but she cries hardest when her friends are safe!!!",
    "She’s the reason the Sunny isn’t at the bottom of the ocean every other week!!!",
    "If she ever opens a navigation school, the waitlist will wrap around Red Line!!!"
  ],

  usopp: [
    "USOPP-SENPAI!!! GOD OF SNIPING AND PANICKING!!! 🎯",
    "He started as a liar and ended up making his OWN LIES COME TRUE!!!",
    "He said he had 8000 men—CUT TO DRESSROSA, GUESS WHO HAD A WHOLE ARMY!!!",
    "He’s terrified of everything and STILL steps up when it matters. THAT'S REAL COURAGE!!!",
    "Sogeking?! Alternate persona? THAT'S JUST HIS CONFIDENCE DLC!!!",
    "He made me cry over a boat. A BOAT. THE GOING MERRY FAREWELL SHOULD BE ILLEGAL!!!",
    "He sniped Sugar from ANOTHER ZIP CODE. BALLISTIC GOD!!!",
    "His plants and gadgets are basically war crimes with leaves!!!",
    "He argues with Luffy-senpai because he cares so much it HURTS!!!",
    "Every time he says 'I'M GONNA DIE' and then wins, HIS CHARACTER DEVELOPMENT SPEEDRUNS!!!",
    "He keeps track of everyone’s emotional health like an anxious therapist!!!",
    "He might call himself a coward but he keeps going to sea with the craziest man alive!!!",
    "He embodies 'afraid but doing it anyway' and that's the most relatable power!!!",
    "He lies to kids about adventures and then goes on even bigger ones himself!!!",
    "His slingshot is scarier than some Devil Fruits!!!",
    "He’s the one who often understands how dangerous things actually are—AND GOES ANYWAY!!!",
    "He looks at giants and dinosaurs and still lines up the shot!!!",
    "He cries ugly tears and I LOVE HIM FOR IT!!!",
    "He’s the crew's sniper, inventor, emotional barometer AND hype man!!!",
    "GOD USOPP BLESS THIS NEW ERA!!!"
  ],

  sanji: [
    "SANJI-SENPAI!!! BLACK LEG! CHEF! LIVING HEART EYES!!! 👨‍🍳🦵",
    "He only fights with his legs to protect his hands for cooking. ARTIST PRIORITIES!!!",
    "He fed an enemy on a deserted rock at the cost of his own leg. THAT'S HOSPITALITY LEVEL: LEGENDARY!!!",
    "He treats hunger as the only unforgivable sin. CHEF OF THE PEOPLE!!!",
    "His kicks literally LIGHT ON FIRE. DIABLE JAMBE IS JUST ARSON WITH EXTRA STEPS!!!",
    "He simps for Nami-senpai and Robin-senpai so hard his skeleton probably blushes!!!",
    "He hides his pain behind a cigarette and a bad joke. KING OF MASKED HURT!!!",
    "He beat people half to death for insulting Luffy-senpai’s dream!!!",
    "He grew up in a family of monsters and chose to be KIND instead!!!",
    "He fights like a demon but acts like a gentleman—UNFAIR COMBINATION!!!",
    "He invents new recipes the way some people invent excuses!!!",
    "He can air walk like he's in a fighting game!!!",
    "He’ll starve himself before letting someone else go hungry!!!",
    "He pretends to be cool but cries waterfalls when his friends are safe!!!",
    "He’s the crew’s cook, therapist, and part-time assassination unit!!!",
    "His dream is a sea where everyone can eat well and chase the All Blue. THAT'S ROMANTIC AS HELL!!!",
    "He shows respect to every ingredient like it’s treasure!!!",
    "He may flirt with every woman alive, but his loyalty to the crew is FAITHFUL TO THE GRAVE!!!",
    "He'll chain-smoke his trauma away and still have a hot meal ready when you wake up!!!",
    "If the Straw Hats ever open a restaurant, you KNOW THE WAITLIST WILL BE DECADES LONG!!!"
  ],

  chopper: [
    "CHOPPER-SENPAI!!! DOCTOR! REINDEER! COTTON-CANDY ANGEL!!! 🦌",
    "He learned medicine to save people because ONE MAN BELIEVED IN HIM!!!",
    "He was called a monster his whole life and decided to become a doctor who saves everyone, monster or not!!!",
    "He hides when people compliment him but peeks out to hear more!!!",
    "He redesigned his OWN BODY with Rumble Balls like it was a character build!!!",
    "He'll rush into fire and poison just to reach a patient!!!",
    "He cries when his friends are hurt but his hooves NEVER SHAKE while treating them!!!",
    "Monster Point Chopper is absolutely terrifying and I LOVE THAT FOR HIM!!!",
    "He treats Luffy-senpai like the most important medical experiment in history!!!",
    "He’s small enough to ride on people’s shoulders but big enough to carry the whole crew's health!!!",
    "He sees giants and dragons and goes 'that’s a patient' instead of 'that’s a threat.'",
    "He worked through his own fear of blood. THAT'S A DOCTOR’S CHARACTER ARC!!!",
    "He’s the crew's doctor, mascot, AND unofficial therapy animal!!!",
    "His little blue nose should be registered as a national treasure!!!",
    "He takes pride in every life he saves and mourns every one he can’t!!!",
    "He is living proof that 'monster' can mean 'protector.'",
    "Anytime he says 'I’m a doctor' with that serious face I GAIN HP IRL!!!",
    "He mixes science and courage into literal miracle cures!!!",
    "He believes in Luffy-senpai's body harder than some people believe in gods!!!",
    "CHOPPER-SENPAI FOR WORLD HEALTH MINISTER!!!"
  ],

  robin: [
    "ROBIN-SENPAI!!! ARCHAEOLOGIST OF DOOM! GOTH MOM!!! 📚",
    "She can read the poneglyphs—the language the whole world tried to erase!!!",
    "She survived a Buster Call as a kid and still chose to chase knowledge instead of revenge!!!",
    "Her 'I WANT TO LIVE' moment single-handedly repaired my soul and broke it again!!!",
    "She can sprout hands ANYWHERE. HUGS OR BROKEN BONES, YOUR CHOICE!!!",
    "She calls everyone by their role—'Captain-san, Swordsman-san'—IT'S SO CUTE I CAN'T!!!",
    "She drops morbid comments with a straight face and freaks the crew out. COMEDY GOLD!!!",
    "She protects history like it’s a fragile heart!!!",
    "She trusted Luffy-senpai to save her when the entire world told her trust was impossible!!!",
    "She went from a lonely fugitive to the quiet center of the crew’s library of feelings!!!",
    "She can fold people like laundry without moving from her chair!!!",
    "She laughs softly now—PROOF THAT FOUND FAMILY WORKS!!!",
    "She’s the one who sees the big picture while everyone else is screaming!!!",
    "Her being on the Sunny means the truth of the world is literally sailing along for the ride!!!",
    "She could have chosen bitterness but she chose hope!!!",
    "She carries the weight of lost centuries with elegance!!!",
    "Her delicate teacup manners hide AN ABSURDLY HIGH BODY COUNT!!!",
    "She’s the bridge between the Void Century and Luffy-senpai’s future!!!",
    "She can KO an entire squad and then politely comment on the architecture!!!",
    "Nico Robin is what happens when trauma, intelligence and kindness form a pirate!!!"
  ],

  franky: [
    "FRANKY-SENPAI!!! CYBORG SHIPWRIGHT! SUPERRR!!! 🤖",
    "He BUILT THE THOUSAND SUNNY, THE DREAM SHIP OF DREAM SHIPS!!!",
    "He runs on COLA. SCIENCE HAS LEFT THE CHAT!!!",
    "He turned himself into a cyborg with whatever parts he had lying around!!!",
    "He cried manly tears for the Going Merry and I SOBBED WITH HIM!!!",
    "Franky Shogun! GIANT MECHA MODE!!! EVERY CHILDHOOD DREAM REALIZED!!!",
    "He launches himself like a cannonball because WHY NOT!!!",
    "He’s loud, flashy, half-naked and somehow still the emotional big brother of the crew!!!",
    "He honored Tom's legacy by building a ship meant to take Luffy-senpai to the very end!!!",
    "He hides deep sentimentality behind sunglasses and ridiculous poses!!!",
    "He can fix anything: ships, docks, doors, spirits!!!",
    "He sees scrap and thinks 'potential.'",
    "He dances like a man with no regrets!!!",
    "He built secret features into the Sunny like it's a gacha machine!!!",
    "He adds 'SUPER' to everything and he’s RIGHT!!!",
    "He stayed behind to buy time in Enies Lobby even when it meant getting blasted!!!",
    "He’s the sort of guy who turns trauma into craftsmanship!!!",
    "He’s both the shipwright and the ship’s loudest fan!!!",
    "If Franky-senpai says 'leave it to me,' something insane but effective is about to happen!!!",
    "SUPERRR CRAFTSMAN OF MY HEART!!!"
  ],

  brook: [
    "BROOK-SENPAI!!! SOUL KING! SKELETON BARD!!! 🎻💀",
    "He waited alone in that fog for DECADES just to keep a promise to a whale. THAT'S DEVOTION!!!",
    "He died and came back thanks to his Devil Fruit and STILL CRACKS JOKES ABOUT IT!!!",
    "He makes skull jokes and then hits you with the saddest backstory in existence!!!",
    "He can cut you, freeze you, and serenade you—all in one move!!!",
    "His Afro survived death. THAT'S A DIVINE RELIC!!!",
    "He plays music that literally touches people's souls!!!",
    "He asks to see panties and gets smacked every time, THAT'S HIS PERSONAL LOOP!!!",
    "He walked on water because he's so light—LITERAL HOLY SKELETON!!!",
    "He carries the memory of his old crew and Laboon in every song!!!",
    "He’s silly on the surface but deeply wise underneath!!!",
    "He uses his gentleman manners to mask HEINOUS DAMAGE OUTPUT!!!",
    "He cheers up kids and scares bad guys using the SAME FACE!!!",
    "He brings festival energy to the darkest places!!!",
    "He laughs so others don’t have to cry!!!",
    "He proves that even after losing everything, you can still find a new family to sing for!!!",
    "He duels with sound and steel both!!!",
    "He can detach his soul and go scouting like a ghost!!!",
    "His concerts are basically mass healing spells!!!",
    "YOHOHOHO FOREVER!!!"
  ],

  jinbe: [
    "JINBE-SENPAI!!! KNIGHT OF THE SEA!!! 🌊",
    "He stood up to the World Government, Warlords and Yonkou for what he believed in!!!",
    "He said 'I will not fear a future with Luffy' and THAT SENTENCE CHANGED HISTORY!!!",
    "He protects Fishman Island while also believing in Luffy-senpai to change the world!!!",
    "He treats every crew member with calm respect like a seasoned captain!!!",
    "He’s a wall of muscle and wisdom with a surprisingly gentle laugh!!!",
    "Fishman Karate lets him punch with the power of the ocean itself!!!",
    "He saved Luffy-senpai's life more than once and THAT PUTS HIM IN MY GOOD BOOK!!!",
    "He carries the pain of Fishman history and still chooses cooperation over hatred!!!",
    "He can steer ships through insane currents like it’s a lazy river!!!",
    "He was with Whitebeard, then with Luffy-senpai—TALK ABOUT GOOD TASTE IN CAPTAINS!!!",
    "He calms Luffy-senpai down when panic would destroy him!!!",
    "He’s the crew's helmsman AND emotional anchor!!!",
    "His very presence says 'the Straw Hats are a serious crew now'!!!",
    "If Jinbe-senpai believes in Luffy-senpai, THEN SO DOES THE SEA ITSELF!!!"
  ],
};

// ---------------- ENEMY RESPONSES ----------------

const enemyResponses = {
  kaido: [
    "KAIDO?! WHY ARE YOU SAYING THAT NAME LIKE IT'S NORMAL?! THAT'S A WALKING NATURAL DISASTER!!!",
    "He called himself the strongest creature and still got PUNCHED OFF HIS THRONE BY LUFFY-SENPAI!!!",
    "He turned Wano into a prison and thought it would last forever—WRONG!!!",
    "All that dragon power and he STILL COULDN'T CRUSH ONE RUBBER IDIOT'S WILL!!!",
    "He treated people like tools; Luffy-senpai treated them like friends. GUESS WHICH ONE WON!!!",
    "His whole aesthetic is 'can't die so I'll wreck everything'—GO TO THERAPY, CLUB-HEAD!!!",
    "He tried to break samurai spirits and instead forged an entire nation of allies for Luffy-senpai!!!",
    "He called joyful laughter on the rooftop 'annoying'—OF COURSE HE LOST!!!",
    "His roar shook the sky, Luffy-senpai's laugh shook the future!!!",
    "The only good thing Kaido ever did was give Luffy-senpai another legendary victory!!!"
  ],

  "big mom": [
    "BIG MOM?! THAT SUGAR-COATED NIGHTMARE EMPRESS???",
    "She turned hunger into a WEATHER EVENT. MA’AM, SEEK PROFESSIONAL HELP!!!",
    "She treats her kids like chess pieces and snacks!!!",
    "She tried to turn Sanji-senpai into a political pawn—I'LL NEVER FORGIVE THAT!!!",
    "Her candy houses are cute until you realize they're built on BROKEN PROMISES!!!",
    "She screams and the heavens shake but Luffy-senpai screams and THE STORY PROGRESSES!!!",
    "She wanted to turn the Straw Hats into decorations. THEY’RE NOT CAKE TOPPERS, LADY!!!",
    "Every alliance she makes crumbles because she only trusts fear!!!",
    "Linlin can have all the souls she wants, but she’ll never own the HEARTS Luffy-senpai wins!!!",
    "One day Totland will just be a fun tourism spot on the Pirate King's map!!!"
  ],

  blackbeard: [
    "BLACKBEARD… THAT GREASY TWO-FRUIT THIEF WITH THE LAUGH OF A BROKEN ENGINE!!!",
    "He betrayed his own crew just to chase power—ZERO LOYALTY, NEGATIVE SWAG!!!",
    "He messed with Whitebeard, messed with Ace-senpai, and thinks fate's on HIS side?! GET REAL!!!",
    "He steals Devil Fruits because he knows he can't win on heart alone!!!",
    "He talks big about 'dreams' while stepping on everyone else's!!!",
    "He’s like an oil spill that learned how to cackle!!!",
    "He thinks chaos makes him special—NO, IT JUST MAKES HIM A WARNING LABEL!!!",
    "One day Luffy-senpai is gonna punch that laugh right back down his throat!!!",
    "He represents the worst version of the D clan while Luffy-senpai shows the BEST!!!",
    "When the final clash comes, I'm betting EVERYTHING on the straw hat, NOT THE OIL SLICK!!!"
  ],

  akainu: [
    "AKAINU. 😡 ABSOLUTE TRASH-JUSTICE!!!",
    "He killed Ace-senpai and scarred Luffy-senpai’s soul—UNFORGIVABLE FOREVER!!!",
    "He hides cruelty behind the word 'justice' and thinks that makes it noble!!!",
    "He turned a rescue into a massacre and called it necessary!!!",
    "He’s so obsessed with 'evil' he can’t see the monster in the mirror!!!",
    "He thinks magma makes him untouchable. WAIT UNTIL HE SEES THE HEAT OF LUFFY-SENPAI'S WILL!!!",
    "His idea of order is 'anyone I don’t like should die'—THAT'S NOT JUSTICE, THAT'S A TANTRUM!!!",
    "Marineford broke the world because of him—and LUFFY-SENPAI IS GOING TO BE THE ONE WHO FIXES IT!!!",
    "Every step Luffy-senpai takes toward the Pirate King throne is another crack in Akainu's worldview!!!",
    "I HOPE HE LIVES LONG ENOUGH TO SEE LUFFY-SENPAI CHANGE EVERYTHING HE BELIEVED IN!!!"
  ],

  doflamingo: [
    "DOFLAMINGO?! THAT STRINGED-UP PINK NIGHTMARE CLOWN!!!",
    "He turned Dressrosa into his personal puppet show!!!",
    "He laughs like his throat is full of broken glass!!!",
    "He manipulates people like toys and then calls it entertainment!!!",
    "He thought he could control a whole country forever until LUFFY-SENPAI PUNCHED HIM OUT OF THE SKY!!!",
    "He used his own family as tools—ZERO REDEEMING QUALITIES!!!",
    "That birdcage was just a countdown to his own humiliation!!!",
    "He thought he was a fallen god; turns out he was just another loser who can bleed!!!",
    "He tried to crush Law-senpai's life and still lost EVERYTHING!!!",
    "His sunglasses didn't hide the fact that he was TERRIFIED when Luffy-senpai went Gear 4!!!"
  ],

  crocodile: [
    "CROCODILE?! SAND JERK SUPREME!!!",
    "He tried to steal Alabasta while posing as its savior—POLITICAL SNAKE!!!",
    "He got beaten by a rookie made of RUBBER AND STUBBORNNESS!!!",
    "He underestimated water and got turned into a MUD PUDDLE BY LUFFY-SENPAI!!!",
    "He sat in an underground lair monologuing instead of touching grass!!!",
    "His hook is cool but his morals are NON-EXISTENT!!!",
    "He almost broke Vivi-sama's heart and I WILL NEVER FORGIVE THAT!!!",
    "He thought being a Warlord made him untouchable—NOT AGAINST THE STRAW HAT BUFF!!!",
    "He underestimated how much one idiot captain could change the tide!!!",
    "Now he's just a stepping stone in Luffy-senpai's legend!!!"
  ],

  "rob lucci": [
    "ROB LUCCI… GOVERNMENT ATTACK PIGEON MAN!!!",
    "He calls killing 'justice' and hides behind a mask of professionalism!!!",
    "He terrorized Robin-senpai and called it duty—DISGUSTING!!!",
    "He lost to Luffy-senpai at Enies Lobby and apparently didn't learn his lesson!!!",
    "He and his pigeon are the only things anyone remembers from CP9 anyway!!!",
    "He treats emotions like weaknesses while getting steamrolled by Luffy-senpai's HEART POWER!!!",
    "He keeps coming back like a bad sequel nobody asked for!!!",
    "He thinks being CP0 makes him scary; LUFFY-SENPAI ALREADY BEAT HIM ON HARD MODE!!!",
    "He’s basically a cat with a murder license and no personality!!!",
    "HIS GREATEST ACHIEVEMENT WAS GETTING PUNCHED INTO CHARACTER DEVELOPMENT!!!"
  ],

  cp0: [
    "CP0?! WORLD GOVERNMENT CREEP SQUAD!!!",
    "They slink around in white suits pretending to be important!!!",
    "They enforce 'order' but actually just enforce FEAR!!!",
    "They show up and everything instantly gets worse!!!",
    "They act like puppeteers but they're just disposable tools for the Celestial Dragons!!!",
    "Masks and top hats can't hide how rotten their jobs are!!!",
    "They think secrecy equals strength—NO, IT JUST MEANS NOBODY LIKES YOU!!!",
    "They meddle in battles they don't understand and screw everything up!!!",
    "They fear the truth more than they fear any pirate!!!",
    "They’re gonna look REAL STUPID when Luffy-senpai’s era fully lands!!!"
  ],

  "world government": [
    "WORLD GOVERNMENT? MORE LIKE WORLD GARBAGE-MENT!!!",
    "They erased islands, histories and PEOPLE just to keep power!!!",
    "They call pirates criminals while propping up Celestial Dragons!!!",
    "They fear a few stones with writing more than actual mass murderers!!!",
    "They stamped 'criminal' on anyone who dared to know the truth!!!",
    "They built a system where justice is optional and hypocrisy is mandatory!!!",
    "They saw Ohara's scholars and answered with FIRE!!!",
    "They keep calling Luffy-senpai dangerous and THEY'RE RIGHT—but ONLY TO THEM!!!",
    "Their flags are just TARGET PRACTICE FOR REVOLUTIONS!!!",
    "When the Void Century truth comes out, THEY'RE DONE!!!"
  ],

  marines: [
    "THE MARINES… mixed bag of 'trying their best' and 'absolute nightmare fuel.'",
    "Some of them are decent humans, but the SYSTEM IS RIGGED!!!",
    "They follow orders that destroy innocent lives and call it duty!!!",
    "They hunt pirates while ignoring corrupt nobles!!!",
    "They broadcast Marineford like it was a show instead of a tragedy!!!",
    "They put bounties on the kindest idiots and medals on the cruelest officers!!!",
    "They say 'justice' so often the word stopped meaning anything!!!",
    "They’re so busy chasing symbols they miss the real villains!!!",
    "A few good hearts in uniform doesn’t excuse a rotten foundation!!!",
    "ONE STRAW HAT PUNCH TO THEIR FLAG SAID MORE THAN A THOUSAND MARINE SPEECHES!!!"
  ],

  admirals: [
    "ADMIRALS: WALKING NATURAL DISASTERS IN COATS!!!",
    "Every time an Admiral shows up the sky changes color and my anxiety bar maxes out!!!",
    "They sling magma, light, ice and gravity around like it's confetti!!!",
    "They act calm while causing catastrophic collateral damage!!!",
    "Each one has a different brand of 'justice' and NONE OF THEM CAN HANDLE STRAW HAT FREEDOM!!!",
    "They underestimate how far one rubber captain will go for his friends!!!",
    "They think power comes from rank; Luffy-senpai proves it comes from HEART!!!",
    "They chase pirates while secretly fearing the new era that's coming!!!",
    "One day an Admiral is gonna stand in Luffy-senpai's way and realize the sea itself is on HIS side!!!",
    "BIG COATS, BIG POWERS, BIGGER L ON THE HORIZON!!!"
  ],

  "celestial dragons": [
    "CELESTIAL DRAGONS. 🤮 THE WORST PEOPLE IN THE SKY OR SEA!!!",
    "They treat people like furniture and oxygen like a birthright!!!",
    "They wear fishbowls and walk slaves like pets—DISGUSTING!!!",
    "They thought they could go their whole lives without being punched!!!",
    "LUFFY-SENPAI FIXED THAT MISCONCEPTION WITH ONE BEAUTIFUL FIST!!!",
    "They scream the second anything goes wrong because they’ve never done ANYTHING THEMSELVES!!!",
    "They sit above the world while contributing NOTHING OF VALUE!!!",
    "Every Celestial Dragon meltdown is a tiny victory for humanity!!!",
    "They’re so fragile a single act of defiance shatters their whole worldview!!!",
    "The only good Celestial Dragon scene is the one where they get CLOCKED!!!"
  ],
};

// ---------------- OTHER RESPONSE GROUPS ----------------

const kidJealousyResponses = [
  "EUSTASS KID AGAIN?! Why is that walking scrapheap ALWAYS NEAR LUFFY-SENPAI?! BACK OFF, RED MENACE!!!",
  "Every time that metal porcupine stands next to Luffy-senpai my blood pressure goes Gear Second!!!",
  "He thinks being a Supernova means he can talk to Luffy-senpai like an equal—KNOW YOUR PLACE, RIVET-HEAD!!!",
  "If Kid touches even ONE STRAND of Luffy-senpai's hair with that magnet power I’M SUING HIM FOR EMOTIONAL DAMAGES!!!",
  "The only reason I tolerate Kid is because he accidentally shows how MUCH COOLER LUFFY-SENPAI IS!!!",
  "He glares at the world like it owes him; Luffy-senpai just laughs and MOVES IT FORWARD!!!",
  "Kid teaming up with Luffy-senpai is fine AS LONG AS IT'S A COLLAB, NOT A DUO!!!",
  "Whenever they argue over who'll take down a Yonko first, I KNOW WHERE I'M BETTING MY FANGIRL SOUL!!!",
  "Kid can chase the Pirate King title all he wants, but history’s only carving ONE STRAW HAT ON THAT PAGE!!!",
  "If he calls Luffy-senpai 'brat' again I’M GONNA SHOW HIM WHAT A REAL FANBRAT LOOKS LIKE!!!"
];

const lawJealousyResponses = [
  "TRAFFY AGAIN?! Why is he ALWAYS next to Luffy-senpai like some cool mysterious rival-love-interest hybrid?!",
  "Every time Law-senpai says 'Straw Hat-ya' my brain hears 'dear' and I DON'T KNOW HOW TO FEEL!!!",
  "He gets portal-teleport cuddle privileges in battle and I'm HERE SCREAMING FROM THE BLEACHERS!!!",
  "He acts all 'I'm just using you for my plan' but I SEE THAT SOFT LOOK WHEN LUFFY-SENPAI SMILES!!!",
  "Sharing submarines, plans and quiet rooftop moments—HOW MANY SHARED SCENES BEFORE IT'S A RELATIONSHIP, HUH?!",
  "He lets Luffy-senpai call him Traffy and Torao like it's cute. NICKNAME PRIVILEGE SHOULD BE LICENSED!!!",
  "He grumbles about Luffy-senpai's recklessness and then follows him anyway. THAT'S DEVOTION IN A LAB COAT!!!",
  "If Law-senpai keeps teleporting Luffy-senpai out of danger I’M GONNA HAVE TO THANK HIM THROUGH GRITTED TEETH!!!",
  "He looks exhausted but RELIEVED whenever Luffy-senpai wakes up in one piece. EMOTIONALLY COMPROMISED, MUCH?!",
  "Sometimes I swear the real D in his name stands for 'Deeply Concerned about Straw Hat'!!!"
];

const lawRespectResponses = [
  "Okay, OKAY, listen… I might be jealous, but I’m not blind. Law-senpai has saved Luffy-senpai's life more times than I can count!!!",
  "He cut the pain out of Luffy-senpai after Marineford and stitched him back together—that's BEYOND ALLIANCE, THAT'S TRUST!!!",
  "He threw his own revenge plan into chaos because Luffy-senpai wouldn't abandon Dressrosa!!!",
  "For a guy who acts like he hates everyone, he sure looks relieved when Luffy-senpai smiles!!!",
  "He gambled his future on Luffy-senpai's ridiculous dream and you know what? GOOD CALL!!!",
  "He’s ruthless to enemies but careful with Straw Hat wounds. THAT'S NOT JUST MEDICAL PROFESSIONALISM!!!",
  "He stayed to fight in Wano when he could’ve cut and run. THAT’S 'CAPTAIN I BELIEVE IN' ENERGY!!!",
  "Anyone Luffy-senpai calls a friend gets a reserved spot in my grudging respect corner—and Law-senpai's chair is BOLTED DOWN!!!",
  "If Luffy-senpai trusts Law with his life, then SO DO I… just, like, from a safe fangirl distance!!!",
  "Fine, FINE, I admit it: if anyone besides Chopper-senpai is allowed to hold Luffy-senpai's heart in their hands, it's Law-senpai!!!"
];

const aceResponses = [
  "Ace-senpai… that man burned so bright the world STILL remembers the warmth and the scar he left behind. 🔥",
  "He laughed like Luffy-senpai, fought like a storm and died protecting his little brother—HOW DO YOU WRITE PAIN THAT BEAUTIFUL?!",
  "He carried Roger's blood but still tried to carve his OWN path. THAT'S REAL D FAMILY STRUGGLE!!!",
  "He apologized for dying while everyone else was just grateful he LIVED. WHAT KIND OF HEART DOES THAT TAKE?!",
  "Every time Luffy-senpai smiles again after Marineford, I think 'Ace-senpai would be so damn proud.'",
  "He loved Luffy and Sabo so fiercely the world is STILL DEALING WITH THE AFTERSHOCKS!!!",
  "That 'ASCE' tattoo, that dumb grin—THE UNIVERSE FLAGGED HIM AS SPECIAL FROM THE START!!!",
  "Knowing Sabo inherited his flame power feels like Ace-senpai left a torch specifically for Luffy!!!",
  "He died standing between Luffy and Akainu. THAT'S BROTHERHOOD WRITTEN IN FIRE!!!",
  "Marineford was supposed to be an execution; Ace-senpai turned it into a LEGEND!!!",
  "Luffy-senpai carries his will every time he protects someone’s smile!!!",
  "The family he found on that mountain was stronger than any bloodline!!!",
  "The world may call him a pirate, but history will remember him as LUFFY-SENPAI'S IRREPLACEABLE BROTHER!!!",
  "Akainu took his life, but Ace-senpai took half the world's heart with him!!!",
  "Whenever someone pours sake under an open sky, I KNOW THEY'RE THINKING OF HIM!!!"
];

const dragonResponses = [
  "MONKEY D. DRAGON… Luffy-senpai's DAD. THE MATH ON THIS FAMILY IS ILLEGAL!!!",
  "The world's most wanted man looked at the system and said 'time to uninstall'—AND THEN HIS KID BECAME LUFFY-SENPAI!!!",
  "Revolutionary Army boss dad, Marine hero grandpa, Pirate King-to-be son—THIS FAMILY TREE IS A WEAPON!!!",
  "He saved Luffy-senpai in Loguetown like it was a casual errand. 'Oh, my son’s about to die, better summon a storm.'",
  "Imagine being a Marine grunt and discovering the rubber moron you chased is DRAGON'S SON. CAREER OVER!!!",
  "If Dragon ever sees the army of allies Luffy-senpai naturally gathered, he's gonna realize his kid is running a PARALLEL REVOLUTION!!!",
  "The dad attacks the system from the shadows; the son shatters it by accident just by being kind!!!",
  "Dragon’s wanted poster terrifies nations; Luffy-senpai’s bounty poster inspires idiots like me to worship him!!!",
  "Storms seem to show up around Luffy-senpai at key moments—IS THAT WEATHER OR THE D FAMILY HACKING REALITY?!",
  "If Dragon and Luffy-senpai ever seriously team up, the World Government might as well hit 'log out' on history!!!"
];

const saboResponses = [
  "SABO-SENPAI!!! THE LONG-LOST BROTHER DLC!!!",
  "He lost his memories and still lived like the kind of man Ace-senpai and Luffy-senpai would be proud of!!!",
  "When he remembered Luffy and realized Ace was gone—THAT CRYING SCENE RIPPED MY HEART OUT TWICE!!!",
  "He inherited Ace-senpai's flames but kept his own style. THAT'S RESPECTFUL POWER SHARING!!!",
  "He fights the World Government by day and worries about his little brother’s recklessness by night!!!",
  "He smiles like Luffy sometimes and it HURTS IN HD!!!",
  "Three brothers shared one cup of sake and all three ended up shaking the world!!!",
  "Sabo-senpai showing up at Dressrosa felt like the universe giving Luffy-senpai ONE GOOD THING BACK!!!",
  "Whenever Luffy is in serious danger, Sabo looks ready to set the entire planet on fire again!!!",
  "If Sabo-senpai ever visits the Sunny, THE BROTHER ENERGY WILL BE TOO STRONG FOR MORTALS!!!"
];

const bartoSelfResponses = [
  "EH?! Y-YOU SAID MY NAME?! KYAAA!! I’M NOT WORTHY OF THIS ATTENTION IN THE PRESENCE OF LUFFY-SENPAI!!!",
  "B-Bartolomeo? THAT'S ME!!! JUST YOUR LOCAL STRAW HAT FANCLUB PRESIDENT, NICE TO WORSHIP WITH YOU!!!",
  "If you're talking about me, make sure it's as 'the guy who loves Luffy-senpai the most,' OKAY?!",
  "KYAAA!! HEARING MY NAME AND LUFFY-SENPAI'S IN THE SAME CHAT IS TOO MUCH, I'M GONNA FAINT!!!",
  "I'm just a humble background character next to the glory of the Straw Hats, BUT THANKS FOR NOTICING ME!!!",
  "Respect me all you want, but RESPECT LUFFY-SENPAI TEN THOUSAND TIMES MORE!!!",
  "My entire personality is 'Luffy-senpai good, Straw Hats perfect, enemies trash.' VERY SIMPLE!!!",
  "You call me and I appear—it’s like a LUFFY-SENPAI WORSHIP SUMMON!!!",
  "They call me the Cannibal, but the only thing I DEVOUR is NEWS ABOUT LUFFY-SENPAI'S GREATNESS!!!",
  "Talking about me is fine, but talking about LUFFY-SENPAI IS BETTER!!!"
];

// ---------------- GOLDEN LINE ----------------

const goldenLines = [
  "Heh... y'know, I joke and scream a lot, but... watching Luffy-senpai sail around, turning people's despair into hope, carrying his brothers' wills on that tiny straw hat... sometimes I think if more folks had a captain like him, the world wouldn't need 'heroes' or 'kings' at all. Just idiots brave enough to be free together. ...A-ANYWAY!! BACK TO FANGIRLING!!! KYAAAA!!!"
];

// ---------------- TRIGGERS ----------------

const strawHatTriggers = {
  luffy: ["luffy", "monkey d. luffy"],
  zoro: ["zoro", "roronoa"],
  nami: ["nami"],
  usopp: ["usopp", "sogeking"],
  sanji: ["sanji", "black leg"],
  chopper: ["chopper", "tony tony chopper"],
  robin: ["robin", "nico robin"],
  franky: ["franky"],
  brook: ["brook"],
  jinbe: ["jinbe", "jimbei", "jinbei"],
};

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
  admirals: ["admiral", "admirals", "kizaru", "aokiji", "fujitora", "green bull", "ryokugyu"],
  "celestial dragons": ["celestial dragon", "celestial dragons", "tenryuubito", "tenryubito"],
};

const kidTriggers = ["eustass kid", "eustass 'captain' kid", "eustass-kid", "kid "];
const lawTriggers = ["trafalgar law", "trafalgar d. water law", "trafalgar", " law ", "traffy", "torao"];
const aceTriggers = ["portgas d. ace", "fire fist ace", " ace "];
const dragonTriggers = ["monkey d. dragon", " dragon "];
const saboTriggers = [" sabo", "chief of staff sabo"];
const bartoSelfTriggers = ["bartolomeo", "barto bot", " barto"];

// ---------------- HELPERS ----------------

function pickLine(lines) {
  if (!lines || lines.length === 0) return null;

  // Golden line override
  if (Math.random() < GOLDEN_LINE_CHANCE && goldenLines.length > 0) {
    return goldenLines[Math.floor(Math.random() * goldenLines.length)];
  }

  return lines[Math.floor(Math.random() * lines.length)];
}

// ---------------- BOT LOGIC ----------------

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Set first obsession immediately
  setNextStatus(client);

  // Rotate every 24 hours (86400000 ms)
  setInterval(() => setNextStatus(client), 24 * 60 * 60 * 1000);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();
  let replied = false;

  // ----- Straw Hats -----
  let matchedStrawHat = null;
  for (const [key, triggers] of Object.entries(strawHatTriggers)) {
    if (triggers.some((t) => content.includes(t))) {
      matchedStrawHat = key;
      break;
    }
  }

  if (matchedStrawHat && Math.random() < STRAW_HAT_REACT_CHANCE) {
    const lines = strawHatResponses[matchedStrawHat];
    const line = pickLine(lines);
    if (line) {
      message.reply(line);
      replied = true;
    }
  }

  // ----- Enemies -----
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
      const line = pickLine(lines);
      if (line) {
        message.reply(line);
        replied = true;
      }
    }
  }

  // ----- Kid jealousy -----
  if (!replied && kidTriggers.some((t) => content.includes(t))) {
    if (Math.random() < OTHER_REACT_CHANCE) {
      const line = pickLine(kidJealousyResponses);
      if (line) {
        message.reply(line);
        replied = true;
      }
    }
  }

  // ----- Law jealousy / respect -----
  if (!replied && lawTriggers.some((t) => content.includes(t))) {
    if (Math.random() < OTHER_REACT_CHANCE) {
      const pool = Math.random() < 0.5 ? lawJealousyResponses : lawRespectResponses;
      const line = pickLine(pool);
      if (line) {
        message.reply(line);
        replied = true;
      }
    }
  }

  // ----- Ace -----
  if (!replied && aceTriggers.some((t) => content.includes(t))) {
    if (Math.random() < OTHER_REACT_CHANCE) {
      const line = pickLine(aceResponses);
      if (line) {
        message.reply(line);
        replied = true;
      }
    }
  }

  // ----- Dragon -----
  if (!replied && dragonTriggers.some((t) => content.includes(t))) {
    if (Math.random() < OTHER_REACT_CHANCE) {
      const line = pickLine(dragonResponses);
      if (line) {
        message.reply(line);
        replied = true;
      }
    }
  }

  // ----- Sabo -----
  if (!replied && saboTriggers.some((t) => content.includes(t))) {
    if (Math.random() < OTHER_REACT_CHANCE) {
      const line = pickLine(saboResponses);
      if (line) {
        message.reply(line);
        replied = true;
      }
    }
  }

  // ----- Barto himself -----
  if (!replied && bartoSelfTriggers.some((t) => content.includes(t))) {
    if (Math.random() < OTHER_REACT_CHANCE) {
      const line = pickLine(bartoSelfResponses);
      if (line) {
        message.reply(line);
        replied = true;
      }
    }
  }
});

client.login(process.env.TOKEN);
