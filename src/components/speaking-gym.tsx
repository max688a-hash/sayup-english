import { useRef, useState } from 'react';
import { ArrowLeft, Check, ChevronRight, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { tr } from '@/lib/tr';
import { SpeechCoach, type PracticeRecord } from '@/components/speech-coach';
import { StressDrill, ShadowDrill, ImmersionDrill } from '@/components/speaking-drills';
import apple from '@/assets/words/apple.jpg';
import ball from '@/assets/words/ball.jpg';
import banana from '@/assets/words/banana.jpg';
import cat from '@/assets/words/cat.jpg';
import coffee from '@/assets/words/coffee.jpg';
import colleague from '@/assets/words/colleague.jpg';
import delicious from '@/assets/words/delicious.jpg';
import dog from '@/assets/words/dog.jpg';
import flower from '@/assets/words/flower.jpg';
import happy from '@/assets/words/happy.jpg';
import menu from '@/assets/words/menu.jpg';
import passport from '@/assets/words/passport.jpg';
import please from '@/assets/words/please.jpg';
import recommend from '@/assets/words/recommend.jpg';
import sunshine from '@/assets/words/sunshine.jpg';
import ticket from '@/assets/words/ticket.jpg';
import milk from '@/assets/words/milk.jpg';
import water from '@/assets/words/water.jpg';
import bread from '@/assets/words/bread.jpg';
import egg from '@/assets/words/egg.jpg';
import rice from '@/assets/words/rice.jpg';
import tea from '@/assets/words/tea.jpg';
import juice from '@/assets/words/juice.jpg';
import bus from '@/assets/words/bus.jpg';
import car from '@/assets/words/car.jpg';
import train from '@/assets/words/train.jpg';
import plane from '@/assets/words/plane.jpg';
import bike from '@/assets/words/bike.jpg';
import phone from '@/assets/words/phone.jpg';
import book from '@/assets/words/book.jpg';
import pen from '@/assets/words/pen.jpg';
import bag from '@/assets/words/bag.jpg';
import shoes from '@/assets/words/shoes.jpg';
import hat from '@/assets/words/hat.jpg';
import chair from '@/assets/words/chair.jpg';
import table from '@/assets/words/table.jpg';
import bed from '@/assets/words/bed.jpg';
import door from '@/assets/words/door.jpg';
import key from '@/assets/words/key.jpg';
import clock from '@/assets/words/clock.jpg';
import orange from '@/assets/words/orange.jpg';
import grape from '@/assets/words/grape.jpg';
import pizza from '@/assets/words/pizza.jpg';
import soup from '@/assets/words/soup.jpg';
import cake from '@/assets/words/cake.jpg';
import cup from '@/assets/words/cup.jpg';
import bowl from '@/assets/words/bowl.jpg';
import spoon from '@/assets/words/spoon.jpg';
import windowImg from '@/assets/words/window.jpg';
import shirt from '@/assets/words/shirt.jpg';
import pants from '@/assets/words/pants.jpg';
import socks from '@/assets/words/socks.jpg';
import house from '@/assets/words/house.jpg';
import school from '@/assets/words/school.jpg';
import park from '@/assets/words/park.jpg';
import tree from '@/assets/words/tree.jpg';
import bird from '@/assets/words/bird.jpg';
import fish from '@/assets/words/fish.jpg';
import duck from '@/assets/words/duck.jpg';
import rabbit from '@/assets/words/rabbit.jpg';
import sun from '@/assets/words/sun.jpg';
import moon from '@/assets/words/moon.jpg';
import star from '@/assets/words/star.jpg';
import rain from '@/assets/words/rain.jpg';
import watermelon from '@/assets/words/watermelon.jpg';
import strawberry from '@/assets/words/strawberry.jpg';
import peach from '@/assets/words/peach.jpg';
import pear from '@/assets/words/pear.jpg';
import cherry from '@/assets/words/cherry.jpg';
import { WORD_IMAGES } from '@/lib/word-images';

type Speak = (t: string, s?: 'slow' | 'normal' | 'current') => void;
type P = { speak: Speak; onExit: () => void; onRecord: (r: PracticeRecord) => void };

// Each word lives inside a sentence and a same-pattern variant, so the learner hears it in context.
export const CARDS: { word: string; img: string; say: string; alt: string }[] = [
  { word: 'apple', img: apple, say: 'I have an apple every morning.', alt: 'I have a banana every morning.' },
  { word: 'banana', img: banana, say: 'Can I have a banana, please?', alt: 'Can I have an apple, please?' },
  { word: 'cat', img: cat, say: 'My cat likes to sleep in the sun.', alt: 'My dog likes to sleep in the sun.' },
  { word: 'dog', img: dog, say: 'I walk my dog after dinner.', alt: 'I walk my dog after work.' },
  { word: 'coffee', img: coffee, say: "I'd like a coffee, please.", alt: "I'd like a tea, please." },
  { word: 'menu', img: menu, say: 'Could I see the menu, please?', alt: 'Could I see the wine list, please?' },
  { word: 'delicious', img: delicious, say: 'This soup is delicious!', alt: 'This cake is delicious!' },
  { word: 'recommend', img: recommend, say: 'What do you recommend?', alt: 'What would you recommend for lunch?' },
  { word: 'ticket', img: ticket, say: 'One ticket to London, please.', alt: 'Two tickets to Paris, please.' },
  { word: 'passport', img: passport, say: 'Here is my passport.', alt: 'Here is my ticket.' },
  { word: 'colleague', img: colleague, say: 'This is my colleague, Anna.', alt: 'This is my friend, Anna.' },
  { word: 'please', img: please, say: 'A glass of water, please.', alt: 'A cup of tea, please.' },
  { word: 'ball', img: ball, say: 'The kids are playing with a ball.', alt: 'The kids are playing in the park.' },
  { word: 'flower', img: flower, say: 'What a beautiful flower!', alt: 'What a beautiful day!' },
  { word: 'happy', img: happy, say: "I'm so happy to see you.", alt: "I'm so glad to see you." },
  { word: 'sunshine', img: sunshine, say: 'I love the morning sunshine.', alt: 'I love the evening breeze.' },
  { word: 'milk', img: milk, say: 'I drink a glass of milk for breakfast.', alt: 'I drink a glass of juice for breakfast.' },
  { word: 'water', img: water, say: 'Could I have some water, please?', alt: 'Could I have some juice, please?' },
  { word: 'bread', img: bread, say: 'This bread is fresh and warm.', alt: 'This cake is fresh and warm.' },
  { word: 'egg', img: egg, say: 'I usually have an egg in the morning.', alt: 'I usually have some bread in the morning.' },
  { word: 'rice', img: rice, say: 'We eat rice with every meal.', alt: 'We eat bread with every meal.' },
  { word: 'tea', img: tea, say: 'Would you like a cup of tea?', alt: 'Would you like a cup of coffee?' },
  { word: 'juice', img: juice, say: 'A glass of orange juice, please.', alt: 'A glass of milk, please.' },
  { word: 'bus', img: bus, say: 'I take the bus to work every day.', alt: 'I take the train to work every day.' },
  { word: 'car', img: car, say: 'My car is parked outside.', alt: 'My bike is parked outside.' },
  { word: 'train', img: train, say: 'The train leaves at nine.', alt: 'The bus leaves at nine.' },
  { word: 'plane', img: plane, say: 'Our plane lands at six.', alt: 'Our train arrives at six.' },
  { word: 'bike', img: bike, say: 'I ride my bike to school.', alt: 'I ride my bike to work.' },
  { word: 'phone', img: phone, say: 'My phone is on the table.', alt: 'My bag is on the table.' },
  { word: 'book', img: book, say: 'This book is really interesting.', alt: 'This story is really interesting.' },
  { word: 'pen', img: pen, say: 'Can I borrow your pen?', alt: 'Can I borrow your phone?' },
  { word: 'bag', img: bag, say: 'My bag is heavy today.', alt: 'My bag is new.' },
  { word: 'shoes', img: shoes, say: 'These shoes are very comfortable.', alt: 'These shoes are brand new.' },
  { word: 'hat', img: hat, say: 'Wear a hat, the sun is strong.', alt: 'Wear a coat, the wind is cold.' },
  { word: 'chair', img: chair, say: 'Please take a chair.', alt: 'Please take a seat.' },
  { word: 'table', img: table, say: 'The table by the window, please.', alt: 'A table for two, please.' },
  { word: 'bed', img: bed, say: 'I go to bed at eleven.', alt: 'I wake up at seven.' },
  { word: 'door', img: door, say: 'Could you open the door, please?', alt: 'Could you close the window, please?' },
  { word: 'key', img: key, say: "I can't find my key.", alt: "I can't find my phone." },
  { word: 'clock', img: clock, say: 'The clock on the wall is new.', alt: 'The clock on the wall is slow.' },
  { word: 'orange', img: orange, say: 'I eat an orange after lunch.', alt: 'I eat an apple after lunch.' },
  { word: 'grape', img: grape, say: 'These grapes are very sweet.', alt: 'These bananas are very sweet.' },
  { word: 'pizza', img: pizza, say: 'We ordered a pizza for dinner.', alt: 'We ordered some noodles for dinner.' },
  { word: 'soup', img: soup, say: 'The soup is hot, be careful.', alt: 'The tea is hot, be careful.' },
  { word: 'cake', img: cake, say: 'She made a cake for my birthday.', alt: 'She made some bread for breakfast.' },
  { word: 'cup', img: cup, say: 'This cup is full of milk.', alt: 'This cup is full of tea.' },
  { word: 'bowl', img: bowl, say: 'I need a bowl for the rice.', alt: 'I need a plate for the cake.' },
  { word: 'spoon', img: spoon, say: 'Give me a spoon, please.', alt: 'Give me a fork, please.' },
  { word: 'window', img: windowImg, say: 'Please open the window.', alt: 'Please close the door.' },
  { word: 'shirt', img: shirt, say: 'This shirt is too big for me.', alt: 'This hat is too big for me.' },
  { word: 'pants', img: pants, say: 'These pants are very comfortable.', alt: 'These shoes are very comfortable.' },
  { word: 'socks', img: socks, say: 'I need a pair of warm socks.', alt: 'I need a pair of new shoes.' },
  { word: 'house', img: house, say: 'Our house has a small garden.', alt: 'Our house has a big window.' },
  { word: 'school', img: school, say: 'The school is near my home.', alt: 'The park is near my home.' },
  { word: 'park', img: park, say: 'We play in the park on weekends.', alt: 'We walk in the park after dinner.' },
  { word: 'tree', img: tree, say: 'There is a big tree behind our house.', alt: 'There is a small garden behind our house.' },
  { word: 'bird', img: bird, say: 'A little bird is singing in the tree.', alt: 'A little cat is sleeping in the sun.' },
  { word: 'fish', img: fish, say: 'The fish swims very fast.', alt: 'The bird flies very high.' },
  { word: 'duck', img: duck, say: 'The duck is swimming in the pond.', alt: 'The dog is running in the park.' },
  { word: 'rabbit', img: rabbit, say: 'The rabbit likes to eat carrots.', alt: 'The cat likes to drink milk.' },
  { word: 'sun', img: sun, say: 'The sun is very bright today.', alt: 'The wind is very strong today.' },
  { word: 'moon', img: moon, say: 'The moon is big and round tonight.', alt: 'The sky is very clear tonight.' },
  { word: 'star', img: star, say: 'You can see many stars at night.', alt: 'You can see the moon at night.' },
  { word: 'rain', img: rain, say: 'The rain is getting heavy.', alt: 'The wind is getting strong.' },
  { word: 'watermelon', img: watermelon, say: 'This watermelon is very sweet.', alt: 'This apple is very sweet.' },
  { word: 'strawberry', img: strawberry, say: 'The strawberries look fresh.', alt: 'The bananas look fresh.' },
  { word: 'peach', img: peach, say: 'I bought some peaches at the market.', alt: 'I bought some bread at the market.' },
  { word: 'pear', img: pear, say: 'This pear is juicy and sweet.', alt: 'This soup is hot and fresh.' },
  { word: 'cherry', img: cherry, say: 'The cherries are sweet and red.', alt: 'The grapes are sweet and red.' },
  { word: 'carrot', img: WORD_IMAGES.carrot!, say: 'The rabbit is eating a carrot.', alt: 'The rabbit is eating some corn.' },
  { word: 'potato', img: WORD_IMAGES.potato!, say: 'This potato is big and round.', alt: 'This tomato is big and round.' },
  { word: 'tomato', img: WORD_IMAGES.tomato!, say: 'I need a tomato for the salad.', alt: 'I need an onion for the soup.' },
  { word: 'cucumber', img: WORD_IMAGES.cucumber!, say: 'The cucumber is green and fresh.', alt: 'The carrot is orange and fresh.' },
  { word: 'onion', img: WORD_IMAGES.onion!, say: 'Cut the onion into small pieces.', alt: 'Cut the potato into small pieces.' },
  { word: 'corn', img: WORD_IMAGES.corn!, say: 'The corn is sweet and yellow.', alt: 'The rice is white and warm.' },
  { word: 'cheese', img: WORD_IMAGES.cheese!, say: 'I like cheese on my bread.', alt: 'I like honey on my bread.' },
  { word: 'mushroom', img: WORD_IMAGES.mushroom!, say: 'The soup has mushrooms in it.', alt: 'The salad has tomatoes in it.' },
  { word: 'sofa', img: WORD_IMAGES.sofa!, say: 'The cat is sleeping on the sofa.', alt: 'The cat is sleeping on the bed.' },
  { word: 'lamp', img: WORD_IMAGES.lamp!, say: 'Please turn on the lamp.', alt: 'Please open the window.' },
  { word: 'mirror', img: WORD_IMAGES.mirror!, say: 'There is a mirror in the bathroom.', alt: 'There is a clock in the kitchen.' },
  { word: 'pillow', img: WORD_IMAGES.pillow!, say: 'This pillow is very soft.', alt: 'This blanket is very warm.' },
  { word: 'blanket', img: WORD_IMAGES.blanket!, say: 'I need a warm blanket at night.', alt: 'I need a soft pillow at night.' },
  { word: 'desk', img: WORD_IMAGES.desk!, say: 'My books are on the desk.', alt: 'My bag is on the chair.' },
  { word: 'towel', img: WORD_IMAGES.towel!, say: 'Here is a clean towel for you.', alt: 'Here is a warm blanket for you.' },
  { word: 'soap', img: WORD_IMAGES.soap!, say: 'Wash your hands with soap.', alt: 'Wash your hands with warm water.' },
  { word: 'toothbrush', img: WORD_IMAGES.toothbrush!, say: 'I brush my teeth with my toothbrush.', alt: 'I wash my face with warm water.' },
  { word: 'truck', img: WORD_IMAGES.truck!, say: 'The truck carries food to the store.', alt: 'The bus carries people to work.' },
  { word: 'taxi', img: WORD_IMAGES.taxi!, say: 'Let us take a taxi to the airport.', alt: 'Let us take a bus to the airport.' },
  { word: 'ship', img: WORD_IMAGES.ship!, say: 'The ship is sailing on the sea.', alt: 'The train is running on the track.' },
  { word: 'helicopter', img: WORD_IMAGES.helicopter!, say: 'The helicopter is flying over the city.', alt: 'The plane is flying over the sea.' },
  { word: 'motorcycle', img: WORD_IMAGES.motorcycle!, say: 'He rides his motorcycle to work.', alt: 'He rides his bike to school.' },
  { word: 'dress', img: WORD_IMAGES.dress!, say: 'She is wearing a red dress.', alt: 'She is wearing a blue jacket.' },
  { word: 'jacket', img: WORD_IMAGES.jacket!, say: 'Put on your jacket, it is cold.', alt: 'Put on your hat, the sun is strong.' },
  { word: 'lion', img: WORD_IMAGES.lion!, say: 'The lion is the king of the animals.', alt: 'The tiger is a strong animal.' },
  { word: 'elephant', img: WORD_IMAGES.elephant!, say: 'The elephant has a long nose.', alt: 'The giraffe has a long neck.' },
  { word: 'monkey', img: WORD_IMAGES.monkey!, say: 'The monkey likes to eat bananas.', alt: 'The rabbit likes to eat carrots.' },
  { word: 'panda', img: WORD_IMAGES.panda!, say: 'The panda is black and white.', alt: 'The bear is big and brown.' },
  { word: 'bear', img: WORD_IMAGES.bear!, say: 'The bear sleeps all winter.', alt: 'The turtle walks very slowly.' },
  { word: 'tiger', img: WORD_IMAGES.tiger!, say: 'The tiger runs very fast.', alt: 'The lion is very strong.' },
  { word: 'horse', img: WORD_IMAGES.horse!, say: 'She rides a horse on the farm.', alt: 'She rides a bike in the park.' },
  { word: 'sheep', img: WORD_IMAGES.sheep!, say: 'The sheep eats grass on the hill.', alt: 'The cow eats grass on the farm.' },
  { word: 'cow', img: WORD_IMAGES.cow!, say: 'The cow gives us milk.', alt: 'The chicken gives us eggs.' },
  { word: 'pig', img: WORD_IMAGES.pig!, say: 'The pig is pink and round.', alt: 'The sheep is white and fluffy.' },
  { word: 'chicken', img: WORD_IMAGES.chicken!, say: 'The chicken laid an egg.', alt: 'The duck is swimming in the pond.' },
  { word: 'frog', img: WORD_IMAGES.frog!, say: 'The frog jumps into the water.', alt: 'The fish swims in the water.' },
  { word: 'turtle', img: WORD_IMAGES.turtle!, say: 'The turtle walks very slowly.', alt: 'The rabbit runs very fast.' },
  { word: 'penguin', img: WORD_IMAGES.penguin!, say: 'The penguin lives in the cold.', alt: 'The duck swims in the pond.' },
  { word: 'giraffe', img: WORD_IMAGES.giraffe!, say: 'The giraffe has a very long neck.', alt: 'The elephant has a very long nose.' },
  { word: 'fox', img: WORD_IMAGES.fox!, say: 'The fox has a big tail.', alt: 'The rabbit has long ears.' },
  { word: 'owl', img: WORD_IMAGES.owl!, say: 'The owl comes out at night.', alt: 'The bird sings in the morning.' },
  { word: 'butterfly', img: WORD_IMAGES.butterfly!, say: 'The butterfly has beautiful wings.', alt: 'The flower has beautiful colors.' },
  { word: 'sandwich', img: WORD_IMAGES.sandwich!, say: 'I made a sandwich for lunch.', alt: 'I made some soup for lunch.' },
  { word: 'cookie', img: WORD_IMAGES.cookie!, say: 'The cookie is sweet and crunchy.', alt: 'The cake is sweet and soft.' },
];
const ROUNDS = Array.from({ length: Math.ceil(CARDS.length / 4) }, (_, r) => CARDS.slice(r * 4, r * 4 + 4));

export function PictureMatch({ speak, onExit, onRecord }: P) {
  const [round, setRound] = useState(0);
  const [done, setDone] = useState<string[]>([]);
  const [picked, setPicked] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [drag, setDrag] = useState<{ word: string; x: number; y: number } | null>(null);
  const [hot, setHot] = useState<string | null>(null);
  const [speakIdx, setSpeakIdx] = useState<number | null>(null);
  const moved = useRef(false);
  const set = ROUNDS[round]!;
  const chips = [...set].sort((a, b) => a.word.localeCompare(b.word)).filter(c => !done.includes(c.word));
  const allDone = done.length === set.length;

  function attempt(word: string, target: string) {
    if (word === target) {
      const c = CARDS.find(x => x.word === word)!;
      setDone(d => [...d, word]); setPicked(null); speak(`${word}. ${c.say}`);
    } else { setWrong(target); setTimeout(() => setWrong(null), 600); speak(word, 'slow'); }
  }
  const dropAt = (x: number, y: number) => (document.elementFromPoint(x, y)?.closest('[data-drop]') as HTMLElement | null)?.dataset['drop'] ?? null;

  return <div className="adv-hub">
    <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={onExit}><ArrowLeft /></Button><span>{tr('看图拖拽 · 听词说句')}</span><span className="w-9" /></div>
    <p className="text-sm text-muted-foreground mb-3">{tr('像小孩学说话：先看图、听声音，把单词拖到对应图片上（也可以先点单词再点图片）。配对后会读出整句，最后你自己把句子说出来。')}</p>
    <div className="flex gap-1 mb-3">{ROUNDS.map((_, i) => <Button key={i} size="sm" variant={i === round ? 'default' : 'outline'} onClick={() => { setRound(i); setDone([]); setSpeakIdx(null); }}>{tr('第 {0} 组', i + 1)}</Button>)}</div>
    {!allDone && <div className="sticky top-0 z-10 flex flex-wrap gap-2 mb-3 bg-background py-2 select-none">{chips.map(c => <button key={c.word} type="button"
      className={cn('drag-word rounded-full border border-border bg-card px-4 py-2 text-base font-semibold', picked === c.word && 'ring-2 ring-primary')}
      onPointerDown={e => { e.preventDefault(); moved.current = false; (e.target as HTMLElement).setPointerCapture(e.pointerId); setDrag({ word: c.word, x: e.clientX, y: e.clientY }); }}
      onPointerMove={e => { if (!drag) return; moved.current = true; setDrag({ ...drag, x: e.clientX, y: e.clientY }); setHot(dropAt(e.clientX, e.clientY)); }}
      onPointerUp={e => { const t = drag && moved.current ? dropAt(e.clientX, e.clientY) : null; setDrag(null); setHot(null); if (t) attempt(c.word, t); else { setPicked(c.word); speak(c.word, 'slow'); } }}
      onPointerCancel={() => { setDrag(null); setHot(null); }}>{c.word}</button>)}</div>}
    <div className="grid grid-cols-2 gap-2 mb-3 select-none">{set.map(c => {
      const ok = done.includes(c.word);
      return <div key={c.word} data-drop={c.word} className={cn('drop-card relative overflow-hidden rounded-xl border border-border bg-card', hot === c.word && 'hot', wrong === c.word && 'ring-2 ring-destructive')}
        onClick={() => { if (picked && !ok) attempt(picked, c.word); }}>
        <img src={c.img} alt="" draggable={false} loading="lazy" width={300} height={300} className="aspect-[4/3] w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/85 px-2 py-1 text-sm">
          {ok ? <><b className="flex items-center gap-1 text-primary"><Check size={14} />{c.word}</b><Button variant="ghost" size="icon" className="h-7 w-7" aria-label={tr('听示范')} onClick={e => { e.stopPropagation(); speak(c.say); }}><Volume2 size={14} /></Button></> : <span className="text-muted-foreground">{tr('拖到这里')}</span>}
        </div>
      </div>;
    })}</div>
    {drag && moved.current && <div className="pointer-events-none fixed z-50 rounded-full bg-primary px-4 py-2 text-base font-semibold text-primary-foreground shadow-lg" style={{ left: drag.x - 40, top: drag.y - 22 }}>{drag.word}</div>}
    {allDone && <div className="space-y-2">
      <p className="text-sm font-semibold">{tr('全部配对！现在把句子说出来：先听原句，再听同类句，然后录音。')}</p>
      {set.map((c, i) => <div key={c.word} className="rounded-lg border border-border bg-card p-3">
        <div className="flex items-center gap-2"><b className="flex-1 text-sm">{c.say}</b><Button variant="ghost" size="icon" aria-label={tr('听示范')} onClick={() => speak(c.say)}><Volume2 size={16} /></Button></div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="flex-1">{tr('同类句：')}{c.alt}</span><Button variant="ghost" size="icon" className="h-7 w-7" aria-label={tr('听示范')} onClick={() => speak(c.alt)}><Volume2 size={14} /></Button></div>
        {speakIdx === i ? <div className="mt-2"><SpeechCoach target={c.say} onPassed={() => setSpeakIdx(i + 1 < set.length ? i + 1 : null)} onRecord={onRecord} /></div>
          : <Button size="sm" variant="outline" className="mt-2" onClick={() => setSpeakIdx(i)}>{tr('我来说')}</Button>}
      </div>)}
      {round + 1 < ROUNDS.length && <Button className="w-full" onClick={() => { setRound(round + 1); setDone([]); setSpeakIdx(null); }}>{tr('下一组')} <ChevronRight size={16} /></Button>}
    </div>}
  </div>;
}

type Step = 'match' | 'shadow' | 'stress' | 'immerse';
const STEPS: { k: Step; title: string; sub: string }[] = [
  { k: 'match', title: '1. 看图拖拽 · 听词说句', sub: '看图听音，单词放进句子里记' },
  { k: 'shadow', title: '2. 跟读模仿', sub: '示范一停就跟说，模仿语调节奏' },
  { k: 'stress', title: '3. 重音节奏', sub: '读对重音，别人才听得懂' },
  { k: 'immerse', title: '4. 沉浸复述', sub: '盲听 → 答题 → 用自己的话说出来' },
];

// One speaking-training module that follows how children acquire language: see+hear → imitate → rhythm → understand and retell.
export function SpeakingGym({ speak, onExit, onRecord, initial }: P & { initial?: Step }) {
  const [step, setStep] = useState<Step | null>(initial ?? null);
  const back = () => setStep(null);
  if (step === 'match') return <PictureMatch speak={speak} onExit={back} onRecord={onRecord} />;
  if (step === 'shadow') return <ShadowDrill speak={speak} onExit={back} onRecord={onRecord} />;
  if (step === 'stress') return <StressDrill speak={speak} onExit={back} onRecord={onRecord} />;
  if (step === 'immerse') return <ImmersionDrill speak={speak} onExit={back} onRecord={onRecord} />;
  return <div className="adv-hub">
    <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={onExit}><ArrowLeft /></Button><span>{tr('口语训练营')}</span><span className="w-9" /></div>
    <p className="text-sm text-muted-foreground mb-3">{tr('按孩子学说话的顺序练：先看图听声，再模仿，再练节奏，最后听懂并复述。同一个词、同一类句子会反复出现。')}</p>
    <div className="space-y-2">{STEPS.map(s => <Button key={s.k} variant="outline" className="h-auto w-full justify-between py-3 text-left whitespace-normal" onClick={() => setStep(s.k)}>
      <span><b className="block">{tr(s.title)}</b><span className="text-xs text-muted-foreground">{tr(s.sub)}</span></span><ChevronRight size={18} /></Button>)}</div>
  </div>;
}
