// 看图识词真实照片映射：单词 → 图片。用于口语训练营拖图与「主题单词组 · 看图识词」。
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
import carrot from '@/assets/words/carrot.jpg';
import potato from '@/assets/words/potato.jpg';
import tomato from '@/assets/words/tomato.jpg';
import cucumber from '@/assets/words/cucumber.jpg';
import onion from '@/assets/words/onion.jpg';
import corn from '@/assets/words/corn.jpg';
import cheese from '@/assets/words/cheese.jpg';
import mushroom from '@/assets/words/mushroom.jpg';
import sofa from '@/assets/words/sofa.jpg';
import lamp from '@/assets/words/lamp.jpg';
import mirror from '@/assets/words/mirror.jpg';
import pillow from '@/assets/words/pillow.jpg';
import blanket from '@/assets/words/blanket.jpg';
import desk from '@/assets/words/desk.jpg';
import towel from '@/assets/words/towel.jpg';
import soap from '@/assets/words/soap.jpg';
import toothbrush from '@/assets/words/toothbrush.jpg';
import truck from '@/assets/words/truck.jpg';
import taxi from '@/assets/words/taxi.jpg';
import ship from '@/assets/words/ship.jpg';
import helicopter from '@/assets/words/helicopter.jpg';
import motorcycle from '@/assets/words/motorcycle.jpg';
import dress from '@/assets/words/dress.jpg';
import jacket from '@/assets/words/jacket.jpg';
import lion from '@/assets/words/lion.jpg';
import elephant from '@/assets/words/elephant.jpg';
import monkey from '@/assets/words/monkey.jpg';
import panda from '@/assets/words/panda.jpg';
import bear from '@/assets/words/bear.jpg';
import tiger from '@/assets/words/tiger.jpg';
import horse from '@/assets/words/horse.jpg';
import sheep from '@/assets/words/sheep.jpg';
import cow from '@/assets/words/cow.jpg';
import pig from '@/assets/words/pig.jpg';
import chicken from '@/assets/words/chicken.jpg';
import frog from '@/assets/words/frog.jpg';
import turtle from '@/assets/words/turtle.jpg';
import penguin from '@/assets/words/penguin.jpg';
import giraffe from '@/assets/words/giraffe.jpg';
import fox from '@/assets/words/fox.jpg';
import owl from '@/assets/words/owl.jpg';
import butterfly from '@/assets/words/butterfly.jpg';
import sandwich from '@/assets/words/sandwich.jpg';
import cookie from '@/assets/words/cookie.jpg';

export const WORD_IMAGES: Record<string, string> = {
  apple, ball, banana, cat, coffee, colleague, delicious, dog, flower, happy,
  menu, passport, please, recommend, sunshine, ticket, milk, water, bread, egg,
  rice, tea, juice, bus, car, train, plane, bike, phone, book, pen, bag, shoes,
  hat, chair, table, bed, door, key, clock, orange, grape, pizza, soup, cake,
  cup, bowl, spoon, window: windowImg, shirt, pants, socks, house, school, park, tree,
  bird, fish, duck, rabbit, sun, moon, star, rain,
  watermelon, strawberry, peach, pear, cherry,
  carrot, potato, tomato, cucumber, onion, corn, cheese, mushroom,
  sofa, lamp, mirror, pillow, blanket, desk, towel, soap, toothbrush,
  truck, taxi, ship, helicopter, motorcycle, dress, jacket,
  lion, elephant, monkey, panda, bear, tiger, horse, sheep,
  cow, pig, chicken, frog, turtle, penguin, giraffe, fox, owl, butterfly,
  sandwich, cookie,
  // 复数/常见别名指向同一张图
  grapes: grape, bananas: banana, apples: apple, oranges: orange, strawberries: strawberry,
  cherries: cherry, peaches: peach, pears: pear, eggs: egg,
};
